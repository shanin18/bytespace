import 'server-only';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  enrolled: string[];
  progress: Record<string, number[]>;
};
type Session = { token: string; userId: string; expires: number };
type Review = {
  id: string;
  courseId: string;
  userId: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};
type Store = {
  users: User[];
  sessions: Session[];
  subscribers: string[];
  reviews: Review[];
};
const file = path.join(process.cwd(), '.data', 'store.json');
let queue: Promise<unknown> = Promise.resolve();
async function read(): Promise<Store> {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code !== 'ENOENT') throw e;
    return { users: [], sessions: [], subscribers: [], reviews: [] };
  }
}
export async function transact<T>(fn: (data: Store) => T | Promise<T>): Promise<T> {
  const task = queue.then(async () => {
    const data = await read();
    const result = await fn(data);
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.writeFile(file + '.tmp', JSON.stringify(data));
    await fs.rename(file + '.tmp', file);
    return result;
  });
  queue = task.catch(() => {});
  return task;
}
export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  return salt + ':' + scryptSync(password, salt, 64).toString('hex');
}
export function validPassword(password: string, hash: string) {
  const [salt, key] = hash.split(':');
  return timingSafeEqual(Buffer.from(key, 'hex'), scryptSync(password, salt, 64));
}
export async function currentUser() {
  const token = (await cookies()).get('bytespace_session')?.value;
  if (!token) return null;
  await queue;
  const data = await read();
  const session = data.sessions.find((s) => s.token === token && s.expires > Date.now());
  return session ? data.users.find((u) => u.id === session.userId) || null : null;
}
export function publicUser(user: User) {
  const { password, ...rest } = user;
  void password;
  return rest;
}
export async function createSession(userId: string) {
  const token = randomBytes(32).toString('hex');
  await transact((d) => {
    d.sessions = d.sessions.filter((s) => s.expires > Date.now());
    d.sessions.push({ token, userId, expires: Date.now() + 7 * 86400000 });
  });
  (await cookies()).set('bytespace_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 86400,
  });
}
export async function getReviews(courseId: string) {
  await queue;
  return (await read()).reviews.filter((r) => r.courseId === courseId);
}
const attempts = new Map<string, { count: number; until: number }>();
export function rateLimit(key: string, max = 12) {
  const now = Date.now();
  if (attempts.size > 10000) for (const [k, v] of attempts) if (v.until < now) attempts.delete(k);
  const item = attempts.get(key);
  if (item && item.until > now) {
    item.count++;
    return item.count > max;
  }
  attempts.set(key, { count: 1, until: now + 60000 });
  return false;
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}
