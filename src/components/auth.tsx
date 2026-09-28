'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowUpRight, Eye, EyeOff, LoaderCircle, Check } from 'lucide-react';
import { Spring, Avatars } from './ui';
import { courses } from '@/lib/courses';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

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
    <section className="auth-page px-0 min-h-[740px] pt-[65px] pb-[85px] max-[700px]:px-0 max-[700px]:pt-[45px] max-[700px]:pb-15 max-[700px]:min-h-0 grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70]">
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] auth-layout grid grid-cols-[1fr_1fr] gap-25 items-center max-w-[1000px] max-[1100px]:gap-15 max-[900px]:gap-[35px] max-[700px]:grid-cols-[1fr] max-[700px]:max-w-[480px] max-[700px]:gap-7.5">
        <div className="auth-story [&_h1]:text-[35px] [&_h1]:leading-[1.3] [&_h1]:tracking-[-1.5px] [&_h1]:font-medium [&_.eyebrow]:text-[8px] [&_.eyebrow]:text-[#c0cfff] [&>p]:text-[11px] [&>p]:leading-[1.9] [&>p]:text-[#b4c6fc] [&>p]:mt-[17px] [&>p]:max-w-90 max-[900px]:[&_h1]:text-[29px] max-[900px]:[&>p]:text-[10px] max-[700px]:text-center max-[700px]:[&>p]:mx-auto max-[700px]:[&>p]:mt-[15px] max-[700px]:[&>p]:mb-0 max-[700px]:[&_h1]:text-[32px] max-[540px]:[&_h1]:text-[28px] max-[540px]:[&_.eyebrow]:text-[7px]">
          <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
            GOOD THINGS START WITH CURIOSITY
          </span>
          <h1 className="font-heading">
            {register ? (
              <>
                Your next chapter
                <br />
                starts right here<span className="lime-text text-lime">.</span>
              </>
            ) : (
              <>
                A little learning.
                <br />A world of possibility<span className="lime-text text-lime">.</span>
              </>
            )}
          </h1>
          <p>
            {role === 'creator'
              ? 'Share your knowledge and inspire the next generation of curious minds.'
              : 'Join a community of curious minds, inspiring creators, and people who never stop growing.'}
          </p>
          <div className="auth-art relative h-82.5 mt-7 [&>.spring]:right-10 [&>.spring]:bottom-7.5 [&>.spring]:[scale:0.6] max-[900px]:[scale:0.9] max-[900px]:[transform-origin:left_center] max-[700px]:hidden">
            <div className="auth-orbit absolute w-62.5 h-62.5 bg-lime rounded-[50%] left-10 top-[55px]" />
            <div className="auth-preview p-2.5 absolute left-17 top-[15px] w-57.5 rounded-[10px] bg-white text-foreground [transform:rotate(-5deg)] shadow-[0_10px_40px_#001b6c33] [&>img]:h-32 [&>img]:w-full [&>img]:rounded-[5px] [&_.tag]:text-[6px] [&_.tag]:mt-3 [&_.tag]:bg-[#f3f4ec] [&_h3]:mx-1 [&_h3]:text-[16px] [&_h3]:leading-[1.4] [&_h3]:mt-2 [&_h3]:mb-[9px] [&_h3]:tracking-[-0.5px] [&>.stars]:mx-1 [&>.stars]:my-0 [&>.stars]:text-[9px] [&_.stars_span]:text-muted-foreground [&_.stars_span]:text-[7px] [&_.stars_span]:tracking-[0]">
              <Image
                className="block max-w-full object-cover"
                src={courses[2].image}
                alt="Web design course preview"
                width={340}
                height={200}
              />
              <span className="tag px-2.5 py-[5px] inline-flex rounded-[20px] text-[9px] font-medium">
                FIND YOUR NEXT BIG THING
              </span>
              <h3 className="font-heading">
                The power of digital
                <br />
                web design.
              </h3>
              <div className="stars text-blue tracking-[1px]">
                ★★★★★ <span>4.9 (320 reviews)</span>
              </div>
              <div className="preview-bottom px-1 flex items-center justify-between [border-top:1px_solid_var(--color-line)] pt-3 pb-[3px] mt-2.5 [&_strong]:text-[14px] [&_strong]:text-blue">
                <strong>$35.00</strong>
                <Avatars />
              </div>
            </div>
            <Spring />
            <div className="auth-note px-3.5 py-2.5 absolute left-1 bottom-2 bg-lime text-foreground flex items-center gap-2 text-[8px] rounded-[5px] [transform:rotate(4deg)]">
              <Check size={18} /> Your future self will thank you.
            </div>
          </div>
        </div>
        <div className="auth-card px-[35px] py-10.5 bg-white rounded-[12px] text-foreground shadow-[0_20px_70px_#001c4a20] [&>.eyebrow]:text-[7px] [&>.eyebrow]:tracking-[1.1px] [&>.eyebrow]:text-[#8e94a2] [&>.eyebrow]:mb-3 [&_h2]:text-[30px] [&_h2]:leading-[1.25] [&_h2]:tracking-[-1px] [&_h2]:font-semibold [&>p]:mx-0 [&>p]:text-[9px] [&>p]:text-[#8d93a0] [&>p]:mt-[13px] [&>p]:mb-6.5 [&_form>label:not(.checkbox-label)]:block [&_form>label:not(.checkbox-label)]:text-[9px] [&_form>label:not(.checkbox-label)]:font-medium [&_form>label:not(.checkbox-label)]:mb-4.5 [&_input:not([type='checkbox'])]:px-3 [&_input:not([type='checkbox'])]:py-[11px] [&_input:not([type='checkbox'])]:w-full [&_input:not([type='checkbox'])]:h-[41px] [&_input:not([type='checkbox'])]:[border:1px_solid_#e6e8ee] [&_input:not([type='checkbox'])]:rounded-[5px] [&_input:not([type='checkbox'])]:text-[10px] [&_input:not([type='checkbox'])]:mt-[7px] [&_input:not([type='checkbox'])]:bg-[#fdfdfe] max-[1100px]:px-7 max-[1100px]:py-[35px] max-[900px]:[&_h2]:text-[27px] max-[900px]:px-6 max-[900px]:py-7.5 max-[700px]:p-[35px] max-[700px]:[&_h2]:text-[29px] max-[700px]:[&_form>label:not(.checkbox-label)]:text-[11px] max-[700px]:[&_input:not([type='checkbox'])]:h-[45px] max-[700px]:[&_input:not([type='checkbox'])]:text-[11px] max-[700px]:[&>p]:text-[10px] max-[700px]:[&>.eyebrow]:text-[8px] max-[540px]:px-6 max-[540px]:py-7.5 max-[540px]:[&_h2]:text-[30px] [&_[data-slot='input']]:rounded-[9px] [&_[data-slot='input']]:border-[#e0e5ed] [&_[data-slot='input']]:[transition:border-color_0.2s,_box-shadow_0.2s] [&_[data-slot='input']:focus]:[outline:none] [&_[data-slot='input']:focus]:border-blue [&_[data-slot='input']:focus]:shadow-[0_0_0_3px_#003be212]">
          <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
            {register ? 'LET’S MAKE IT HAPPEN' : 'PICK UP WHERE YOU LEFT OFF'}
          </span>
          <h2 className="font-heading">
            {register ? (
              <>
                Welcome to
                <br />
                ByteSpace<span className="blue-dot text-blue">.</span>
              </>
            ) : (
              <>
                Welcome back<span className="blue-dot text-blue">.</span>
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
                <Input
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
              <Input
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
              <div className="password-field relative [&_input]:pr-10! [&_button]:p-0 [&_button]:absolute [&_button]:right-3 [&_button]:top-4.5 [&_button]:bg-transparent [&_button]:text-[#929aaa] [&_[data-slot='button']]:h-6 [&_[data-slot='button']]:w-6 [&_[data-slot='button']]:grid [&_[data-slot='button']]:place-items-center">
                <Input
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
                <Button
                  variant="ghost"
                  size="unstyled"
                  type="button"
                  aria-label={show ? 'Hide password' : 'Show password'}
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </label>
            {register && (
              <Label
                className="checkbox-label mx-0 flex items-start gap-2 text-[8px] text-[#8e929b] leading-[1.8] mt-0.5 mb-5.5 [&_input]:[accent-color:var(--color-blue)] [&_input]:mt-0.5 [&_a]:text-blue max-[700px]:text-[9px] [&_[data-slot='checkbox']]:w-4 [&_[data-slot='checkbox']]:h-4 [&_[data-slot='checkbox']]:mt-[1px] [&_[data-slot='checkbox']]:[border:1px_solid_#cbd3e3] [&_[data-slot='checkbox']]:rounded-[4px] [&_[data-slot='checkbox']]:bg-white [&_[data-slot='checkbox'][data-state='checked']]:bg-blue [&_[data-slot='checkbox'][data-state='checked']]:border-blue [&_[data-slot='checkbox'][data-state='checked']]:text-white"
                htmlFor="accept-terms"
              >
                <Checkbox id="accept-terms" name="terms" required />
                <span>
                  I agree to the{' '}
                  <Link
                    className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                    href="/terms"
                  >
                    Terms of service
                  </Link>{' '}
                  and{' '}
                  <Link
                    className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                    href="/privacy"
                  >
                    Privacy policy
                  </Link>
                  .
                </span>
              </Label>
            )}
            {error && (
              <p
                className="error-message mx-0! my-3! text-[#c72e40]! text-[11px]! leading-[1.6]"
                role="alert"
              >
                {error}
              </p>
            )}
            <Button
              variant="lime"
              size="pill"
              disabled={busy}
              className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime auth-submit w-full justify-between min-h-[41px] text-[10px] mt-[3px] max-[700px]:min-h-[45px] max-[700px]:text-[11px]"
            >
              {busy ? (
                <LoaderCircle size={17} className="spin animate-spin" />
              ) : register ? (
                'Create your account'
              ) : (
                'Let’s get learning'
              )}
              <ArrowUpRight size={17} />
            </Button>
          </form>
          <p className="auth-switch mx-0! text-center text-[8px]! mt-6.5! mb-0! [&_a]:text-blue [&_a]:inline-flex [&_a]:items-center [&_a]:gap-[3px] max-[700px]:text-[9px]!">
            {register ? 'Already part of the community?' : 'New around here?'}{' '}
            <Link
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
              href={`${register ? '/login' : '/register'}?next=${encodeURIComponent(next)}`}
            >
              {register ? 'Log in' : 'Join ByteSpace'}
              <ArrowUpRight size={13} />
            </Link>
          </p>
          <span className="auth-footnote text-[7px] text-[#b0b4bd] block text-center mt-6.5">
            A little curiosity goes a long way.
          </span>
        </div>
      </div>
    </section>
  );
}
