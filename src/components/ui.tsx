'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Menu,
  Search,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { avatars, type Course } from '@/lib/courses';
import logo from '../../public/images/logo.png';

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      className={[
        'touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]',
        `logo max-[900px]:text-[21px] max-[540px]:text-[20px] ${dark ? 'logo-dark' : ''}`,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="ByteSpace home"
    >
      <Image
        src={logo}
        alt=""
        width={29}
        height={32}
        className="block max-w-full object-cover shrink-0"
      />
      ByteSpace
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);
  useEffect(() => {
    setOpen(false);
    fetch('/api/account')
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, [path]);
  return (
    <header className="site-header bg-blue text-white [border-bottom:1px_solid_#ffffff10] relative z-30 [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70]">
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] nav-inner h-22 flex items-center justify-between max-[900px]:h-19 max-[540px]:h-17.5">
        <Logo />
        <nav
          className={
            open
              ? "nav-links flex items-center gap-8.5 [&_a]:flex [&_a]:items-center [&_a]:gap-1.5 [&_a]:text-[11px] [&_a]:text-[#ffffffba] [&_a:hover]:text-white [&_a.active]:text-white [&_a.active::before]:content-[''] [&_a.active::before]:h-1 [&_a.active::before]:w-1 [&_a.active::before]:bg-lime [&_a.active::before]:rounded-[50%] max-[1100px]:gap-[23px] max-[900px]:gap-4.5 max-[900px]:[&_a]:text-[10px] max-[700px]:gap-[13px] max-[700px]:[&_a]:text-[9px] max-[540px]:p-[25px] max-[540px]:hidden max-[540px]:absolute max-[540px]:left-0 max-[540px]:right-0 max-[540px]:top-17.5 max-[540px]:bg-[#0035cc] max-[540px]:shadow-[0_15px_20px_#00248433] max-[540px]:[&.is-open]:flex max-[540px]:[&.is-open]:flex-col max-[540px]:[&.is-open]:items-start max-[540px]:[&.is-open]:gap-[25px] max-[540px]:[&_a]:text-[13px] is-open"
              : "nav-links flex items-center gap-8.5 [&_a]:flex [&_a]:items-center [&_a]:gap-1.5 [&_a]:text-[11px] [&_a]:text-[#ffffffba] [&_a:hover]:text-white [&_a.active]:text-white [&_a.active::before]:content-[''] [&_a.active::before]:h-1 [&_a.active::before]:w-1 [&_a.active::before]:bg-lime [&_a.active::before]:rounded-[50%] max-[1100px]:gap-[23px] max-[900px]:gap-4.5 max-[900px]:[&_a]:text-[10px] max-[700px]:gap-[13px] max-[700px]:[&_a]:text-[9px] max-[540px]:p-[25px] max-[540px]:hidden max-[540px]:absolute max-[540px]:left-0 max-[540px]:right-0 max-[540px]:top-17.5 max-[540px]:bg-[#0035cc] max-[540px]:shadow-[0_15px_20px_#00248433] max-[540px]:[&.is-open]:flex max-[540px]:[&.is-open]:flex-col max-[540px]:[&.is-open]:items-start max-[540px]:[&.is-open]:gap-[25px] max-[540px]:[&_a]:text-[13px]"
          }
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className={[
              'touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]',
              path === '/' ? 'active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            Home
          </Link>
          <Link
            href="/courses"
            className={[
              'touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]',
              path.startsWith('/courses') ? 'active' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            Explore courses <ChevronDown size={13} />
          </Link>
          <Link
            className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
            href="/creator"
          >
            Become a creator <ArrowUpRight size={13} />
          </Link>
        </nav>
        <div className="nav-actions flex items-center gap-6 max-[1100px]:gap-4 max-[900px]:gap-[15px] max-[900px]:[&_.button]:px-[13px] max-[900px]:[&_.button]:text-[10px] max-[540px]:gap-2.5 max-[540px]:[&_.button]:px-3 max-[540px]:[&_.button]:py-2 max-[540px]:[&_.button]:min-h-8 max-[540px]:[&_.button]:text-[9px] max-[540px]:[&_.button]:gap-[9px]">
          {user ? (
            <Link
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] nav-login text-[11px] [&:hover]:text-lime max-[700px]:hidden"
              href="/dashboard"
            >
              Hi, {user.name.split(' ')[0]}
            </Link>
          ) : (
            <Link
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] nav-login text-[11px] [&:hover]:text-lime max-[700px]:hidden"
              href="/login"
            >
              Log in
            </Link>
          )}
          <Button
            size="pill-sm"
            className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] button button-lime small h-9"
            asChild
            variant="lime"
          >
            <Link href={user ? '/dashboard' : '/register'}>
              {user ? 'My learning' : 'Get started'}
              <ArrowUpRight size={15} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="unstyled"
            className="mobile-toggle p-[5px] hidden text-white bg-transparent max-[540px]:block"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const form = e.currentTarget;
    try {
      const r = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: new FormData(form).get('email') }),
      });
      const d = await r.json();
      setStatus(d.message);
      if (r.ok) form.reset();
    } catch {
      setStatus('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <footer className="footer bg-white pt-15 [&_.logo]:text-[20px] [&_.logo-symbol]:[scale:0.85] [&_.logo-symbol]:[transform-origin:left_center] [&_.logo-symbol]:mr-[-3px] max-[700px]:pt-10">
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
        <div className="footer-top flex justify-between gap-20 pb-[45px] max-[1100px]:gap-12.5 max-[900px]:gap-7.5 max-[700px]:flex-col max-[700px]:gap-[35px] max-[700px]:pb-7.5">
          <div className="footer-news max-w-85 flex-1 [&>p]:mx-0 [&>p]:my-4 [&>p]:text-[10px] [&>p]:text-[#8b8d98] [&>p]:leading-[1.9] max-[900px]:max-w-72.5 max-[700px]:max-w-95 max-[700px]:[&>p]:text-[11px] max-[540px]:max-w-full">
            <Logo dark />
            <p>
              A little curiosity can take you a long way.
              <br />
              Let’s see where yours leads.
            </p>
            <form
              onSubmit={subscribe}
              className="newsletter flex items-center pb-2 [border-bottom:1px_solid_var(--color-line)] gap-2 [&_input]:px-0 [&_input]:py-[5px] [&_input]:border-0 [&_input]:[outline:0] [&_input]:flex-1 [&_input]:w-25 [&_input]:text-[10px] [&_.button]:px-3 [&_.button]:py-2 [&_.button]:text-[9px] [&_.button]:min-h-7.5 [&_.button]:gap-2 max-[540px]:[&_input]:text-[11px] max-[540px]:[&_.button]:text-[9px] [&_[data-slot='input']]:shadow-none [&_[data-slot='input']]:rounded-none"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <Input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="Your email address"
                maxLength={254}
              />
              <Button
                variant="lime"
                size="pill-sm"
                disabled={busy}
                className="button button-lime small"
              >
                {busy ? 'Joining…' : 'Stay curious'}
                <ArrowUpRight size={15} />
              </Button>
            </form>
            <span
              className="form-message block text-[9px] text-blue mt-2 leading-[1.5]"
              role="status"
            >
              {status}
            </span>
          </div>
          <div className="footer-links grid grid-cols-3 gap-15 [&_h4]:mx-0 [&_h4]:text-[10px] [&_h4]:font-medium [&_h4]:mt-1.5 [&_h4]:mb-4.5 [&_a]:mx-0 [&_a]:my-3 [&_a]:text-[9px] [&_a]:text-[#888c97] [&_a]:flex [&_a]:items-center [&_a]:gap-[5px] [&_a:hover]:text-blue max-[1100px]:gap-[35px] max-[900px]:gap-7.5 max-[900px]:[&_a]:text-[8px] max-[900px]:[&_h4]:text-[9px] max-[700px]:gap-7.5 max-[700px]:w-full max-[700px]:[&_a]:text-[10px] max-[700px]:[&_h4]:text-[11px] max-[540px]:gap-[13px] max-[540px]:[&_a]:text-[9px] max-[540px]:[&_h4]:text-[10px]">
            <div>
              <h4 className="font-heading">Explore</h4>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/courses"
              >
                All courses
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/courses?category=Design"
              >
                Design
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/courses?category=Development"
              >
                Development
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/courses?category=Business"
              >
                Business
              </Link>
            </div>
            <div>
              <h4 className="font-heading">ByteSpace</h4>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/#about"
              >
                Our story
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/creator"
              >
                Our creators
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/#testimonials"
              >
                Community
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/register?role=creator"
              >
                Teach with us
              </Link>
            </div>
            <div>
              <h4 className="font-heading">Let’s connect</h4>
              <a
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="mailto:hello@bytespace.example"
              >
                Get in touch <ArrowUpRight size={12} />
              </a>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/help"
              >
                Help center
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/privacy"
              >
                Privacy policy
              </Link>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/terms"
              >
                Terms of service
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom px-0 py-5.5 [border-top:1px_solid_var(--color-line)] flex items-center justify-between text-[8px] text-[#989ca5] [&>span:last-child]:flex [&>span:last-child]:gap-[7px] [&>span:last-child]:items-center max-[540px]:gap-3 max-[540px]:items-start max-[540px]:text-[7px] max-[540px]:leading-[1.7] max-[540px]:[&>span:last-child]:max-w-[145px] max-[540px]:[&>span:last-child]:justify-end max-[540px]:[&>span:last-child]:text-right max-[540px]:[&_svg]:hidden">
          <span>© {new Date().getFullYear()} ByteSpace. All rights reserved.</span>
          <span>
            Made for the endlessly curious. <Sparkles size={13} />
          </span>
        </div>
      </div>
    </footer>
  );
}

export function SearchBox({ large = false, initial = '' }: { large?: boolean; initial?: string }) {
  const router = useRouter();
  return (
    <form
      className={`search-box py-1.5 mx-auto flex items-center gap-3 bg-white pr-[7px] pl-4.5 rounded-[40px] max-w-[510px] mt-6.5 mb-0 text-muted-foreground shadow-[0_8px_25px_#00175415] [&_input]:flex-1 [&_input]:[border:none] [&_input]:[outline:none] [&_input]:bg-transparent [&_input]:text-foreground [&_input]:text-[11px] [&_input]:w-full [&_input]:h-10 [&_input:focus]:[outline:none] [&:focus-within]:shadow-[0_0_0_3px_#ffffff55] [&_.button]:px-4.5 [&_.button]:py-2.5 [&_.button]:min-h-10 [&_.button]:text-[10px] [&_.button]:gap-4 max-[540px]:py-[5px] max-[540px]:gap-2 max-[540px]:pr-[5px] max-[540px]:pl-[13px] max-[540px]:mt-5.5 max-[540px]:[&_input]:text-[9px] max-[540px]:[&_input]:h-9 max-[540px]:[&>svg]:w-[15px] max-[540px]:[&>svg]:shrink-0 max-[540px]:[&_.button]:px-[13px] max-[540px]:[&_.button]:py-2.5 max-[540px]:[&_.button]:text-[9px] max-[540px]:[&_.button]:gap-[7px] max-[540px]:[&_.button]:min-h-9 max-[540px]:[&_.button_svg]:w-[13px] [&_[data-slot='input']]:shadow-none [&_[data-slot='input']]:rounded-none ${large ? 'search-large' : ''}`}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(
          '/courses?q=' + encodeURIComponent(String(new FormData(e.currentTarget).get('q') || '')),
        );
      }}
    >
      <Search size={19} />
      <Input
        aria-label="Search courses"
        name="q"
        placeholder="What do you want to learn?"
        defaultValue={initial}
      />
      <Button
        variant="lime"
        size="pill"
        className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime"
        type="submit"
      >
        Find a course
        <ArrowUpRight size={16} />
      </Button>
    </form>
  );
}

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          node.dataset.reveal = 'visible';
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    node.dataset.reveal = 'waiting';
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${className} transition-[opacity,transform] duration-750 ease-[cubic-bezier(.2,.7,.3,1)] data-[reveal=waiting]:translate-y-6 data-[reveal=waiting]:opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100`}
    >
      {children}
    </div>
  );
}

export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let start = 0;
        const tick = (time: number) => {
          if (!start) start = time;
          const p = Math.min((time - start) / 1600, 1);
          setCount(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.8 },
    );
    setCount(0);
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Avatars() {
  return (
    <div className="avatar-stack flex items-center pl-[7px] [&_img]:h-7 [&_img]:w-7 [&_img]:[border:2px_solid_#fff] [&_img]:rounded-[50%] [&_img]:ml-[-7px]">
      {avatars.map((a, i) => (
        <Image
          className="block max-w-full object-cover"
          key={a}
          src={a}
          alt={['Alex', 'Emily', 'James', 'Sophia'][i]}
          width={30}
          height={30}
        />
      ))}
    </div>
  );
}
export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="course-card p-[9px] [border:1px_solid_var(--color-line)] rounded-[11px] h-full bg-white [transition:box-shadow_0.3s,_transform_0.3s,_border-color_0.3s] [&:hover]:[transform:translateY(-5px)] [&:hover]:border-[#d1d8ed] [&:hover]:shadow-[0_15px_34px_#17224d0a] [&:hover_.course-cover>img]:[transform:scale(1.045)] [&:hover_.course-arrow]:opacity-100 [&:hover_.course-arrow]:[transform:translate(0,_0)] [&:focus-within_.course-arrow]:opacity-100 [&:focus-within_.course-arrow]:[transform:translate(0,_0)] max-[540px]:p-[9px] max-[540px]:rounded-[10px]">
      <Link
        className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] course-cover block relative [aspect-ratio:1.67] rounded-[6px] overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:[transition:transform_0.6s]"
        href={`/courses/${course.id}`}
        style={{ background: course.color }}
      >
        <Image
          className="block max-w-full object-cover"
          src={course.image}
          alt={course.title}
          width={640}
          height={400}
          sizes="(max-width: 640px) 90vw, (max-width: 900px) 45vw, 360px"
        />
        <span className="course-category px-2.5 py-[5px] absolute bottom-2.5 left-2.5 rounded-[20px] bg-white text-[8px] shadow-[0_2px_10px_#00000010] max-[540px]:text-[9px]">
          {course.category}
        </span>
        <span className="course-arrow absolute right-2.5 top-2.5 w-[31px] h-[31px] rounded-[50%] bg-white grid place-items-center opacity-0 [transform:translate(-5px,_5px)] [transition:0.25s] max-[540px]:opacity-100 max-[540px]:[transform:none]">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="course-card-body px-[9px] pt-[13px] pb-[5px] max-[540px]:px-2.5 max-[540px]:pt-3.5 max-[540px]:pb-2">
        <div className="course-meta flex justify-between text-[9px] text-[#767b88] gap-2 [&>span]:flex [&>span]:items-center [&>span]:gap-1 [&_.lucide-star]:text-[#adc90f] max-[540px]:text-[10px]">
          <span>
            <BookOpen size={12} />
            {course.lessons} lessons
          </span>
          <span>
            <Star size={12} fill="currentColor" />
            {course.rating} <span className="muted text-muted-foreground">({course.students})</span>
          </span>
        </div>
        <Link
          href={`/courses/${course.id}`}
          className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] course-title font-heading block text-[15px] leading-[1.5] font-semibold tracking-[-0.35px] mt-2.5 min-h-[45px] [&:hover]:text-blue max-[1100px]:text-[14px] max-[540px]:text-[17px] max-[540px]:min-h-0 max-[540px]:mt-[11px]"
        >
          {course.title}
        </Link>
        <div className="course-teacher flex items-center gap-[7px] text-[9px] text-[#7c808a] mt-3 [&_img]:rounded-[50%] [&_img]:h-5.5 [&_img]:w-5.5 max-[540px]:text-[10px]">
          <Image
            className="block max-w-full object-cover"
            src={course.avatar}
            alt=""
            width={22}
            height={22}
          />
          {course.teacher}
        </div>
        <div className="course-card-bottom mt-[15px] pt-[13px] [border-top:1px_solid_#f0f0f4] flex items-center justify-between max-[540px]:mt-[17px] max-[540px]:pt-3.5">
          <span className="course-price text-[15px] font-semibold text-blue tracking-[-0.5px] [&_del]:text-[9px] [&_del]:text-[#9ca0aa] [&_del]:font-normal [&_del]:tracking-[0] [&_del]:ml-[5px] max-[540px]:text-[17px] max-[540px]:[&_del]:text-[10px]">
            ${course.price.toFixed(2)} <del>${(course.price + 30).toFixed(2)}</del>
          </span>
          <span className="student-mini flex items-center [&_.avatar-stack_img]:w-[23px] [&_.avatar-stack_img]:h-[23px] [&_.avatar-stack_img]:[border-width:1.5px]">
            <Avatars />
            <span className="student-plus w-[21px] h-[21px] grid place-items-center bg-lime rounded-[50%] text-[11px] [border:1px_solid_#fff] ml-[-6px] z-1">
              +
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

export function Spring({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`spring absolute w-[105px] h-[115px] text-lime [transform:rotate(24deg)] [&_i]:absolute [&_i]:w-[95px] [&_i]:h-[27px] [&_i]:left-0 [&_i]:[border:10px_solid_currentColor] [&_i]:rounded-[50%] [&_i]:shadow-[inset_0_2px_1px_#00000009]  floating animate-float ${className}`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <i
          key={i}
          style={{ top: i * 17, transform: `rotate(-22deg) translateX(${i % 2 ? 5 : 0}px)` }}
        />
      ))}
    </div>
  );
}
export function Decorations() {
  return (
    <div
      className="decorations absolute top-0 right-0 bottom-0 left-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <Spring className="spring-one left-[-32px] top-42.5 [transform:rotate(25deg)]" />
      <Spring className="spring-two right-12 bottom-7.5 [transform:rotate(25deg)_scale(0.9)] [animation-delay:-2s] text-white" />
      <div className="donut absolute w-[125px] h-21 [border:24px_solid_#fff] rounded-[50%] left-[4%] bottom-7.5 [transform:rotate(-35deg)] shadow-[4px_7px_0_#dce2f0] [animation-delay:-4s] floating animate-float" />
      <div className="triangle absolute right-[17%] top-[385px] w-0 h-0 [border-left:28px_solid_transparent] [border-right:28px_solid_transparent] [border-bottom:67px_solid_#fff] [transform:rotate(18deg)] [filter:drop-shadow(3px_4px_0_#d3dcf5)] [animation-delay:-3s] floating animate-float" />
      <div className="pill-shape absolute right-[-24px] top-40 h-[175px] w-25 rounded-[27px] [transform:rotate(-22deg)] bg-lime shadow-[inset_-12px_0_0_#c3e81d] floating animate-float" />
      <Spring className="spring-three left-[16%] top-[365px] [transform:rotate(35deg)_scale(0.48)] text-white" />
    </div>
  );
}

const partners = ['logolpsum', 'Layers', 'Quotient', 'Circooles', 'Sisyphus', 'Capsule'];
export function PartnerMarquee() {
  return (
    <section
      className="partners px-0 py-6 bg-[#fafafa] [border-bottom:1px_solid_#f1f1f4] max-[540px]:px-0 max-[540px]:py-5"
      aria-label="Our learning partners"
    >
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] partners-inner relative [&>p]:text-center [&>p]:text-[8px] [&>p]:tracking-[1.5px] [&>p]:text-[#9598a2] [&>p]:mb-[21px] max-[540px]:[&>p]:text-[7px] max-[540px]:[&>p]:mb-4">
        <p>BIG IDEAS. GREAT COMPANY.</p>
        <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,_transparent,_#000_7%,_#000_93%,_transparent)] [&:hover_.marquee-track]:[animation-play-state:paused]">
          <div className="marquee-track flex w-max animate-marquee">
            {[0, 1].map((copy) => (
              <div
                className="marquee-group flex items-center gap-17.5 pr-17.5 shrink-0 max-[540px]:gap-[45px] max-[540px]:pr-[45px]"
                key={copy}
                aria-hidden={copy === 1}
              >
                {partners.map((p, i) => (
                  <span
                    key={p}
                    className="partner-logo text-[19px] font-semibold tracking-[-0.9px] text-[#9397a3] flex gap-[7px] items-center whitespace-nowrap max-[540px]:text-[16px]"
                  >
                    <span
                      className={`partner-mark leading-[1] max-[540px]:text-[26px] ${i === 1 ? 'text-[38px]' : 'text-[31px]'}`}
                    >
                      {['◈', '▱', '◐', '◉', '◒', '⊙'][i]}
                    </span>
                    {p}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Testimonials } from './testimonials';

export function PageBanner({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-banner px-0 py-15 text-center [&_h1]:text-[42px] [&_h1]:font-semibold [&_h1]:tracking-[-1.5px] [&_h1]:leading-[1.3] [&_p]:text-[12px] [&_p]:text-[#c3d1fa] [&_p]:mt-[15px] [&_.eyebrow]:text-[#bed0ff] [&_.eyebrow]:text-[9px] max-[540px]:px-0 max-[540px]:py-10 max-[540px]:[&_h1]:text-[31px] max-[540px]:[&_p]:text-[10px] max-[540px]:[&_.eyebrow]:text-[8px] max-[540px]:[&_.eyebrow]:tracking-[1px] grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70]">
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
        {eyebrow && (
          <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
            {eyebrow}
          </span>
        )}
        <h1 className="font-heading">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="creator-cta px-0 py-17.5 relative overflow-hidden [&_.spring-one]:top-[-20px] [&_.spring-one]:left-0 [&_.spring-three]:top-2.5 [&_.spring-three]:left-[17%] [&_.spring-two]:text-lime [&_.spring-two]:bottom-[-27px] [&_.spring-two]:right-[5%] [&_.donut]:border-lime [&_.donut]:shadow-none [&_.donut]:bottom-[-24px] [&_.donut]:left-[9%] [&_.triangle]:[border-bottom-color:var(--color-lime)] [&_.triangle]:top-[35px] [&_.triangle]:right-[18%] [&_.triangle]:[scale:0.75] [&_.pill-shape]:bg-white [&_.pill-shape]:shadow-none [&_.pill-shape]:top-[15px] [&_.pill-shape]:right-[-17px] max-[700px]:[&_.spring-three]:left-[8%] max-[700px]:[&_.spring-three]:[scale:0.7] max-[700px]:[&_.triangle]:right-[8%] max-[700px]:[&_.triangle]:[scale:0.55] max-[700px]:[&_.pill-shape]:right-[-70px] max-[700px]:[&_.donut]:left-[-40px] max-[540px]:px-0 max-[540px]:py-[55px] max-[540px]:[&_.spring-one]:left-[-55px] max-[540px]:[&_.spring-one]:[scale:0.7] max-[540px]:[&_.spring-three]:hidden max-[540px]:[&_.triangle]:top-[7px] max-[540px]:[&_.triangle]:right-0 max-[540px]:[&_.triangle]:[scale:0.4] max-[540px]:[&_.spring-two]:right-[-44px] max-[540px]:[&_.spring-two]:[scale:0.65] max-[540px]:[&_.donut]:[scale:0.65] max-[540px]:[&_.pill-shape]:hidden grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70]">
      <Decorations />
      <Reveal className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] cta-content relative z-2 text-center [&_.eyebrow]:text-[9px] [&_.eyebrow]:text-[#d5e0ff] [&_h2]:text-[35px] [&_h2]:leading-[1.3] [&_h2]:tracking-[-1.2px] [&_h2]:font-medium [&_p]:mx-0 [&_p]:text-[11px] [&_p]:text-[#c1d0fc] [&_p]:leading-[1.9] [&_p]:mt-[17px] [&_p]:mb-6 max-[700px]:[&_h2]:text-[30px] max-[700px]:[&_p]:text-[10px] max-[540px]:[&_h2]:text-[26px] max-[540px]:[&_h2]:tracking-[-0.9px] max-[540px]:[&_.eyebrow]:text-[7px] max-[540px]:[&_.eyebrow]:tracking-[1px] max-[540px]:[&_p]:mx-auto max-[540px]:[&_p]:text-[10px] max-[540px]:[&_p]:max-w-[295px] max-[540px]:[&_p]:mt-4 max-[540px]:[&_p]:mb-5.5">
        <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
          YOUR KNOWLEDGE. THEIR NEXT CHAPTER.
        </span>
        <h2 className="font-heading">
          Unlock your potential as a<br />
          creator with ByteSpace<span className="lime-text text-lime">.</span>
        </h2>
        <p>
          You have something worth sharing. Turn your expertise into inspiring
          <br className="desktop-break max-[540px]:hidden" /> courses and help a world of curious
          minds grow.
        </p>
        <Button
          size="pill"
          className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] button button-lime"
          asChild
          variant="lime"
        >
          <Link href="/register?role=creator">
            Become a creator
            <ArrowUpRight size={17} />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
