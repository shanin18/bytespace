import { NextResponse } from 'next/server';
import { transact, rateLimit, sameOrigin } from '@/lib/store';
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ message: 'Invalid request.' }, { status: 403 });
  if (rateLimit('newsletter:' + (req.headers.get('x-forwarded-for') || 'local'), 5))
    return NextResponse.json({ message: 'Please try again in a minute.' }, { status: 429 });
  try {
    const { email } = await req.json();
    if (
      typeof email !== 'string' ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    )
      return NextResponse.json({ message: 'Please enter a valid email address.' }, { status: 400 });
    await transact((d) => {
      const value = email.trim().toLowerCase();
      if (!d.subscribers.includes(value)) d.subscribers.push(value);
    });
    return NextResponse.json({ message: 'You’re on the list! Thanks for staying curious.' });
  } catch {
    return NextResponse.json(
      { message: 'Unable to subscribe. Please try again.' },
      { status: 400 },
    );
  }
}
