'use client';
import { Button } from '@/components/ui/button';

import { useEffect, useState, useCallback, type CSSProperties } from 'react';
import Image from 'next/image';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
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
    if (hovered || focused || reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => Math.min(i + 1, testimonials.length)), 4200);
    return () => clearInterval(timer);
  }, [hovered, focused, reducedMotion]);
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
    <section
      id="testimonials"
      className="testimonials [background:radial-gradient(ellipse_at_100%_0%,_#eefdba90,_transparent_50%),_#fafbf9] pb-[65px] section-space py-22.5 max-[900px]:py-[65px] max-[540px]:py-13"
    >
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
        <div className="section-heading mb-8.5  [&_h2]:leading-[1.28] [&_h2]:tracking-[-1.4px] [&_h2]:font-semibold [&_p]:mt-4 [&_p]:text-muted-foreground [&_p]:text-[12px] [&_p]:leading-[1.9]   max-[540px]:[&_h2]:tracking-[-1px] max-[540px]:[&_.eyebrow]:text-[8px] max-[540px]:[&_.eyebrow]:mb-3 max-[540px]:[&_p]:text-[10px] max-[540px]:[&_p]:mt-[13px] max-[540px]:mb-[25px] split-heading flex items-end justify-between gap-15 [&_h2]:text-[32px] [&>p]:max-w-97.5 [&>p]:mb-1 max-[900px]:gap-7.5 max-[900px]:[&_h2]:text-[27px] max-[900px]:[&>p]:text-[10px] max-[900px]:[&>p]:max-w-75 max-[700px]:items-start max-[700px]:gap-4.5 max-[700px]:[&_h2]:text-[25px] max-[700px]:[&_.eyebrow]:text-[8px] max-[700px]:[&>p]:max-w-57.5 max-[700px]:[&>p]:text-[9px] max-[540px]:block max-[540px]:[&_h2]:text-[28px] max-[540px]:[&>p]:max-w-full max-[540px]:[&>p]:text-[10px] max-[540px]:[&>p]:mt-3.5">
          <div>
            <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
              REAL PEOPLE. REAL POSSIBILITIES.
            </span>
            <h2 className="font-heading">
              Discover what our
              <br />
              community is saying<span className="blue-dot text-blue">.</span>
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
            className="testimonial-window mx-[-10px] overflow-hidden"
            aria-roledescription="carousel"
            aria-label="Learner testimonials"
          >
            <div
              className="testimonial-track flex"
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
                  className="testimonial-slide px-2.5 py-0 [flex:0_0_33.333333%] max-[900px]:[flex-basis:50%] max-[540px]:[flex-basis:100%]"
                  style={{ flexBasis: `${100 / visible}%` }}
                  key={i}
                  aria-hidden={i < index || i >= index + visible}
                >
                  <article className="testimonial-card px-[23px] py-[25px] bg-white [border:1px_solid_#f0f1ea] rounded-[10px] min-h-65 flex flex-col [&>.stars]:text-[12px] [&>.stars]:mt-[17px] [&>.stars]:tracking-[2px] [&>p]:text-[11px] [&>p]:leading-[1.85] [&>p]:text-[#70757f] [&>p]:mt-[11px] [&>p]:flex-1 max-[540px]:p-[23px] max-[540px]:min-h-[235px] max-[540px]:[&>p]:text-[12px]">
                    <div className="review-person flex items-center gap-[11px] [&_img]:rounded-[50%] [&_img]:shrink-0 [&_img]:h-11 [&_img]:w-11 [&_h3]:text-[11px] [&_h3]:font-semibold [&>div>span]:text-[8px] [&>div>span]:text-muted-foreground [&_time]:ml-auto [&_time]:text-[7px] [&_time]:text-[#a1a7b2] max-[540px]:[&_h3]:text-[12px] max-[540px]:[&>div>span]:text-[9px] max-[540px]:[&_time]:text-[6px]">
                      <Image
                        className="block max-w-full object-cover"
                        src={t.avatar}
                        alt=""
                        width={44}
                        height={44}
                      />
                      <div>
                        <h3 className="font-heading">{t.name}</h3>
                        <span>{t.role}</span>
                      </div>
                      <span className="quote-mark ml-auto [font-family:Georgia,_serif] text-[48px] text-[#d0ddab] leading-[0.7]">
                        “
                      </span>
                    </div>
                    <div className="stars text-blue tracking-[1px]" aria-label="5 out of 5 stars">
                      ★★★★★
                    </div>
                    <p>“{t.quote}”</p>
                    <span className="verified flex gap-[5px] text-[8px] items-center text-[#959b9a] mt-4 [&_svg]:text-[#829539] max-[540px]:text-[9px]">
                      <Check size={12} /> Community story
                    </span>
                  </article>
                </div>
              ))}
            </div>
          </div>
          <div className="carousel-controls flex justify-between items-center mt-[25px]">
            <div className="carousel-dots flex gap-1.5 [&_button]:p-0 [&_button]:w-1.5 [&_button]:h-1.5 [&_button]:bg-[#d7dbd1] [&_button]:rounded-[5px] [&_button.current]:w-5 [&_button.current]:bg-blue">
              {testimonials.map((_, i) => (
                <Button
                  variant="ghost"
                  size="unstyled"
                  key={i}
                  aria-label={`Show testimonial ${i + 1}`}
                  aria-current={index % testimonials.length === i}
                  className={index % testimonials.length === i ? 'current' : ''}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <div className="carousel-buttons flex gap-2 [&_button]:grid [&_button]:place-items-center [&_button]:[border:1px_solid_#e1e5dc] [&_button]:w-8 [&_button]:h-8 [&_button]:rounded-[50%] [&_button]:bg-white [&_button]:text-[#5d6750] [&_button:hover]:bg-lime [&_button:hover]:border-lime [&_[data-slot='button']]:p-0">
              <Button
                variant="ghost"
                size="unstyled"
                aria-label="Previous testimonial"
                onClick={() => move(-1)}
              >
                <ChevronLeft size={18} />
              </Button>
              <Button
                variant="ghost"
                size="unstyled"
                aria-label="Next testimonial"
                onClick={() => move(1)}
              >
                <ChevronRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
