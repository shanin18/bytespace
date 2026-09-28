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

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className={`logo ${dark ? 'logo-dark' : ''}`} aria-label="ByteSpace home">
      <span className="logo-symbol">
        <i />
        <i />
        <i />
      </span>
      ByteSpace<span className="logo-period">.</span>
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
    <header className="site-header">
      <div className="container nav-inner">
        <Logo />
        <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <Link href="/" className={path === '/' ? 'active' : ''}>
            Home
          </Link>
          <Link href="/courses" className={path.startsWith('/courses') ? 'active' : ''}>
            Explore courses <ChevronDown size={13} />
          </Link>
          <Link href="/creator">
            Become a creator <ArrowUpRight size={13} />
          </Link>
        </nav>
        <div className="nav-actions">
          {user ? (
            <Link className="nav-login" href="/dashboard">
              Hi, {user.name.split(' ')[0]}
            </Link>
          ) : (
            <Link className="nav-login" href="/login">
              Log in
            </Link>
          )}
          <Button asChild variant="default">
            <Link href={user ? '/dashboard' : '/register'} className="button button-lime small">
              {user ? 'My learning' : 'Get started'}
              <ArrowUpRight size={15} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="unstyled"
            className="mobile-toggle"
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
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-news">
            <Logo dark />
            <p>
              A little curiosity can take you a long way.
              <br />
              Let’s see where yours leads.
            </p>
            <form onSubmit={subscribe} className="newsletter">
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
                variant="ghost"
                size="unstyled"
                disabled={busy}
                className="button button-lime small"
              >
                {busy ? 'Joining…' : 'Stay curious'}
                <ArrowUpRight size={15} />
              </Button>
            </form>
            <span className="form-message" role="status">
              {status}
            </span>
          </div>
          <div className="footer-links">
            <div>
              <h4>Explore</h4>
              <Link href="/courses">All courses</Link>
              <Link href="/courses?category=Design">Design</Link>
              <Link href="/courses?category=Development">Development</Link>
              <Link href="/courses?category=Business">Business</Link>
            </div>
            <div>
              <h4>ByteSpace</h4>
              <Link href="/#about">Our story</Link>
              <Link href="/creator">Our creators</Link>
              <Link href="/#testimonials">Community</Link>
              <Link href="/register?role=creator">Teach with us</Link>
            </div>
            <div>
              <h4>Let’s connect</h4>
              <a href="mailto:hello@bytespace.example">
                Get in touch <ArrowUpRight size={12} />
              </a>
              <Link href="/help">Help center</Link>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/terms">Terms of service</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
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
      className={`search-box ${large ? 'search-large' : ''}`}
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
      <Button variant="ghost" size="unstyled" className="button button-lime" type="submit">
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
          node.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    node.classList.add('reveal-ready');
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
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
    <div className="avatar-stack">
      {avatars.map((a, i) => (
        <Image
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
    <article className="course-card">
      <Link
        className="course-cover"
        href={`/courses/${course.id}`}
        style={{ background: course.color }}
      >
        <Image
          src={course.image}
          alt={course.title}
          width={640}
          height={400}
          sizes="(max-width: 640px) 90vw, (max-width: 900px) 45vw, 360px"
        />
        <span className="course-category">{course.category}</span>
        <span className="course-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="course-card-body">
        <div className="course-meta">
          <span>
            <BookOpen size={12} />
            {course.lessons} lessons
          </span>
          <span>
            <Star size={12} fill="currentColor" />
            {course.rating} <span className="muted">({course.students})</span>
          </span>
        </div>
        <Link href={`/courses/${course.id}`} className="course-title">
          {course.title}
        </Link>
        <div className="course-teacher">
          <Image src={course.avatar} alt="" width={22} height={22} />
          {course.teacher}
        </div>
        <div className="course-card-bottom">
          <span className="course-price">
            ${course.price.toFixed(2)} <del>${(course.price + 30).toFixed(2)}</del>
          </span>
          <span className="student-mini">
            <Avatars />
            <span className="student-plus">+</span>
          </span>
        </div>
      </div>
    </article>
  );
}

export function Spring({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`spring floating ${className}`}>
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
    <div className="decorations" aria-hidden="true">
      <Spring className="spring-one" />
      <Spring className="spring-two white" />
      <div className="donut floating" />
      <div className="triangle floating" />
      <div className="pill-shape floating" />
      <Spring className="spring-three white" />
    </div>
  );
}

const partners = ['logolpsum', 'Layers', 'Quotient', 'Circooles', 'Sisyphus', 'Capsule'];
export function PartnerMarquee() {
  return (
    <section className="partners" aria-label="Our learning partners">
      <div className="container partners-inner">
        <p>BIG IDEAS. GREAT COMPANY.</p>
        <div className="marquee">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
                {partners.map((p, i) => (
                  <span key={p} className="partner-logo">
                    <span className={`partner-mark mark-${i}`}>
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
    <section className="page-banner grid-blue">
      <div className="container">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}

export function CTA() {
  return (
    <section className="creator-cta grid-blue">
      <Decorations />
      <Reveal className="container cta-content">
        <span className="eyebrow">YOUR KNOWLEDGE. THEIR NEXT CHAPTER.</span>
        <h2>
          Unlock your potential as a<br />
          creator with ByteSpace<span className="lime-text">.</span>
        </h2>
        <p>
          You have something worth sharing. Turn your expertise into inspiring
          <br className="desktop-break" /> courses and help a world of curious minds grow.
        </p>
        <Button asChild variant="default">
          <Link href="/register?role=creator" className="button button-lime">
            Become a creator
            <ArrowUpRight size={17} />
          </Link>
        </Button>
      </Reveal>
    </section>
  );
}
