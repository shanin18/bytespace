'use client';
import { useEffect, useState, useCallback, type CSSProperties } from 'react';
import Image from 'next/image';
import { Check, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { avatars } from '@/lib/courses';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'UI/UX Designer',
    quote:
      'ByteSpace made learning feel exciting again. The lessons are practical, the creators really care, and I finally have a portfolio I’m proud to share.',
    avatar: avatars[1],
  },
  {
    name: 'Alex Rivera',
    role: 'Freelance Developer',
    quote:
      'I went from watching tutorials to actually building things. Every course gives you something real to work on. Easily the best investment in myself.',
    avatar: avatars[0],
  },
  {
    name: 'Emma Wilson',
    role: 'Creative Entrepreneur',
    quote:
      'The freedom to learn at my own pace changed everything. I picked up new skills, found my confidence, and launched my own creative business.',
    avatar: avatars[3],
  },
  {
    name: 'James Parker',
    role: 'Digital Marketer',
    quote:
      'Clear lessons, thoughtful projects, and a community that gets it. I’m using what I learned every single day in my work.',
    avatar: avatars[2],
  },
  {
    name: 'Olivia Chen',
    role: 'Product Designer',
    quote:
      'There’s always something new to explore. ByteSpace has become my go-to place whenever curiosity strikes and I want to take the next step.',
    avatar: avatars[1],
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [transition, setTransition] = useState(true);
  const [visible, setVisible] = useState(3);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const resize = () => setVisible(innerWidth <= 540 ? 1 : innerWidth <= 900 ? 2 : 3);
    const preference = () => setReducedMotion(media.matches);
    resize();
    preference();
    window.addEventListener('resize', resize);
    media.addEventListener('change', preference);
    return () => {
      window.removeEventListener('resize', resize);
      media.removeEventListener('change', preference);
    };
  }, []);
  const finish = useCallback(() => {
    if (index < testimonials.length) return;
    setTransition(false);
    setIndex(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setTransition(true)));
  }, [index]);
  useEffect(() => {
    if (index < testimonials.length || !transition) return;
    const timer = setTimeout(finish, reducedMotion ? 0 : 760);
    return () => clearTimeout(timer);
  }, [index, transition, reducedMotion, finish]);
  useEffect(() => {
    if (paused || hovered || focused || reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => Math.min(i + 1, testimonials.length)), 4200);
    return () => clearInterval(timer);
  }, [paused, hovered, focused, reducedMotion]);
  function move(direction: number) {
    if (index === 0 && direction < 0) {
      if (reducedMotion) {
        setIndex(testimonials.length - 1);
        return;
      }
      setTransition(false);
      setIndex(testimonials.length);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setTransition(true);
          setIndex(testimonials.length - 1);
        }),
      );
    } else if (index < testimonials.length) setIndex((i) => i + direction);
  }
  return (
    <section id="testimonials" className="testimonials section-space">
      <div className="container">
        <div className="section-heading split-heading">
          <div>
            <span className="eyebrow">REAL PEOPLE. REAL POSSIBILITIES.</span>
            <h2>
              Discover what our
              <br />
              community is saying<span className="blue-dot">.</span>
            </h2>
          </div>
          <p>
            Big ambitions start with small steps. Here’s how our learners are turning their
            curiosity into something extraordinary.
          </p>
        </div>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
          }}
        >
          <div
            className="testimonial-window"
            aria-roledescription="carousel"
            aria-label="Learner testimonials"
          >
            <div
              className="testimonial-track"
              style={
                {
                  '--visible': visible,
                  transform: `translateX(-${(index * 100) / visible}%)`,
                  transition:
                    transition && !reducedMotion
                      ? 'transform 700ms cubic-bezier(.22,.61,.36,1)'
                      : 'none',
                } as CSSProperties
              }
              onTransitionEnd={finish}
            >
              {[...testimonials, ...testimonials.slice(0, 3)].map((t, i) => (
                <div
                  className="testimonial-slide"
                  style={{ flexBasis: `${100 / visible}%` }}
                  key={i}
                  aria-hidden={i < index || i >= index + visible}
                >
                  <article className="testimonial-card">
                    <div className="review-person">
                      <Image src={t.avatar} alt="" width={44} height={44} />
                      <div>
                        <h3>{t.name}</h3>
                        <span>{t.role}</span>
                      </div>
                      <span className="quote-mark">“</span>
                    </div>
                    <div className="stars" aria-label="5 out of 5 stars">
                      ★★★★★
                    </div>
                    <p>“{t.quote}”</p>
                    <span className="verified">
                      <Check size={12} /> Community story
                    </span>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            <div className="carousel-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={index % testimonials.length === i}
                  className={index % testimonials.length === i ? 'current' : ''}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <div className="carousel-buttons">
              <button
                aria-label={paused ? 'Resume testimonials' : 'Pause testimonials'}
                onClick={() => setPaused((p) => !p)}
              >
                {paused ? <Play size={15} /> : <Pause size={15} />}
              </button>
              <button aria-label="Previous testimonial" onClick={() => move(-1)}>
                <ChevronLeft size={18} />
              </button>
              <button aria-label="Next testimonial" onClick={() => move(1)}>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
