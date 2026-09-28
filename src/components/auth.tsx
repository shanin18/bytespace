'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Eye, EyeOff, LoaderCircle, Check } from 'lucide-react';
import { Spring, Avatars } from './ui';
import { courses } from '@/lib/courses';

export function AuthForm({
  mode,
  role = 'learner',
  next = '/dashboard',
}: {
  mode: 'login' | 'register';
  role?: string;
  next?: string;
}) {
  const register = mode === 'register';
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch('/api/account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, action: mode, role }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error);
        return;
      }
      router.push(next.startsWith('/') && !next.startsWith('//') ? next : '/dashboard');
      router.refresh();
    } catch {
      setError('We couldn’t connect. Please try again.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="auth-page grid-blue">
      <div className="container auth-layout">
        <div className="auth-story">
          <span className="eyebrow">GOOD THINGS START WITH CURIOSITY</span>
          <h1>
            {register ? (
              <>
                Your next chapter
                <br />
                starts right here<span className="lime-text">.</span>
              </>
            ) : (
              <>
                A little learning.
                <br />A world of possibility<span className="lime-text">.</span>
              </>
            )}
          </h1>
          <p>
            {role === 'creator'
              ? 'Share your knowledge and inspire the next generation of curious minds.'
              : 'Join a community of curious minds, inspiring creators, and people who never stop growing.'}
          </p>
          <div className="auth-art">
            <div className="auth-orbit" />
            <div className="auth-preview">
              <Image
                src={courses[2].image}
                alt="Web design course preview"
                width={340}
                height={200}
              />
              <span className="tag">FIND YOUR NEXT BIG THING</span>
              <h3>
                The power of digital
                <br />
                web design.
              </h3>
              <div className="stars">
                ★★★★★ <span>4.9 (320 reviews)</span>
              </div>
              <div className="preview-bottom">
                <strong>$35.00</strong>
                <Avatars />
              </div>
            </div>
            <Spring />
            <div className="auth-note">
              <Check size={18} /> Your future self will thank you.
            </div>
          </div>
        </div>
        <div className="auth-card">
          <span className="eyebrow">
            {register ? 'LET’S MAKE IT HAPPEN' : 'PICK UP WHERE YOU LEFT OFF'}
          </span>
          <h2>
            {register ? (
              <>
                Welcome to
                <br />
                ByteSpace<span className="blue-dot">.</span>
              </>
            ) : (
              <>
                Welcome back<span className="blue-dot">.</span>
              </>
            )}
          </h2>
          <p>
            {register
              ? 'A fresh start. A new skill. Your next big thing.'
              : 'Your next learning adventure is waiting.'}
          </p>
          <form onSubmit={submit}>
            {register && (
              <label>
                Full name
                <input
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  minLength={2}
                  maxLength={80}
                />
              </label>
            )}
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                maxLength={254}
              />
            </label>
            <label>
              Password
              <div className="password-field">
                <input
                  name="password"
                  type={show ? 'text' : 'password'}
                  autoComplete={register ? 'new-password' : 'current-password'}
                  placeholder={
                    register ? 'Create a password (8+ characters)' : 'Enter your password'
                  }
                  required
                  minLength={8}
                  maxLength={128}
                />
                <button
                  type="button"
                  aria-label={show ? 'Hide password' : 'Show password'}
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>
            {register && (
              <label className="checkbox-label">
                <input type="checkbox" required />
                <span>
                  I agree to the <Link href="/terms">Terms of service</Link> and{' '}
                  <Link href="/privacy">Privacy policy</Link>.
                </span>
              </label>
            )}
            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}
            <button disabled={busy} className="button button-lime auth-submit">
              {busy ? (
                <LoaderCircle size={17} className="spin" />
              ) : register ? (
                'Create your account'
              ) : (
                'Let’s get learning'
              )}
              <ArrowUpRight size={17} />
            </button>
          </form>
          <p className="auth-switch">
            {register ? 'Already part of the community?' : 'New around here?'}{' '}
            <Link href={`${register ? '/login' : '/register'}?next=${encodeURIComponent(next)}`}>
              {register ? 'Log in' : 'Join ByteSpace'}
              <ArrowUpRight size={13} />
            </Link>
          </p>
          <span className="auth-footnote">A little curiosity goes a long way.</span>
        </div>
      </div>
    </section>
  );
}
