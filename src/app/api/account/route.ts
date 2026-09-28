import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'node:crypto';
import {
  currentUser,
  publicUser,
  transact,
  hashPassword,
  validPassword,
  createSession,
  rateLimit,
  sameOrigin,
} from '@/lib/store';
export const runtime = 'nodejs';
export async function GET() {
  const user = await currentUser();
  return NextResponse.json({ user: user ? publicUser(user) : null });
}
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  if (rateLimit('account:' + (req.headers.get('x-forwarded-for') || 'local')))
    return NextResponse.json(
      { error: 'Please wait a minute before trying again.' },
      { status: 429 },
    );
  try {
    const body = await req.json();
    const { action, password } = body;
    const email = String(body.email || '')
      .trim()
      .toLowerCase();
    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 254 ||
      typeof password !== 'string' ||
      password.length < 8 ||
      password.length > 128
    )
      return NextResponse.json(
        { error: 'Enter a valid email and a password with 8–128 characters.' },
        { status: 400 },
      );
    const result = await transact((d) => {
      if (action === 'register') {
        const name = String(body.name || '').trim();
        if (name.length < 2 || name.length > 80)
          return { error: 'Please enter your name (2–80 characters).' };
        if (d.users.some((u) => u.email === email))
          return { error: 'An account with this email already exists. Please log in.' };
        const user = {
          id: randomUUID(),
          name,
          email,
          password: hashPassword(password),
          role: body.role === 'creator' ? 'creator' : 'learner',
          enrolled: [],
          progress: {},
        };
        d.users.push(user);
        return { user };
      }
      if (action !== 'login') return { error: 'Invalid action.' };
      const user = d.users.find((u) => u.email === email);
      if (!user || !validPassword(password, user.password))
        return { error: 'Email or password is incorrect.' };
      return { user };
    });
    if (result.error || !result.user)
      return NextResponse.json({ error: result.error }, { status: 400 });
    await createSession(result.user.id);
    return NextResponse.json({ user: publicUser(result.user) });
  } catch {
    return NextResponse.json(
      { error: 'Unable to process your request. Please try again.' },
      { status: 400 },
    );
  }
}
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Invalid origin.' }, { status: 403 });
  const jar = await cookies();
  const token = jar.get('bytespace_session')?.value;
  await transact((d) => {
    d.sessions = d.sessions.filter((s) => s.token !== token);
  });
  jar.delete('bytespace_session');
  return NextResponse.json({ ok: true });
}
