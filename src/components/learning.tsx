'use client';
import { Button } from '@/components/ui/button';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Download,
  LoaderCircle,
  LogOut,
  Play,
} from 'lucide-react';
import { type Course, lessonGroups } from '@/lib/courses';

export function Logout() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  return (
    <div>
      <Button
        variant="outline"
        size="pill-sm"
        className="button button-outline small"
        disabled={busy}
        onClick={async () => {
          setBusy(true);
          try {
            const r = await fetch('/api/account', { method: 'DELETE' });
            if (!r.ok) throw new Error();
            router.push('/');
            router.refresh();
          } catch {
            setError('Please try again.');
            setBusy(false);
          }
        }}
      >
        {busy ? 'Signing out…' : 'Sign out'}
        <LogOut size={14} />
      </Button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}

export function LessonPlayer({
  course,
  initialProgress,
  initialLesson = 0,
}: {
  course: Course;
  initialProgress: number[];
  initialLesson?: number;
}) {
  const all = lessonGroups.flatMap((g) => g.lessons);
  const [active, setActive] = useState(Math.min(Math.max(initialLesson, 0), all.length - 1));
  const [progress, setProgress] = useState(initialProgress);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const completed = progress.includes(active);
  async function complete() {
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id, lesson: active }),
      });
      const d = await r.json();
      if (!r.ok) {
        setError(d.error);
        return;
      }
      setProgress(d.progress);
    } catch {
      setError('Unable to save your progress. Please try again.');
    } finally {
      setBusy(false);
    }
  }
  function select(index: number) {
    setActive(index);
    const url = new URL(window.location.href);
    url.searchParams.set('lesson', String(index));
    window.history.replaceState(null, '', url);
  }
  return (
    <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] learner-layout grid grid-cols-[minmax(0,_1fr)_290px] gap-7.5 pt-10 pb-17.5 max-[900px]:grid-cols-[minmax(0,_1fr)_240px] max-[900px]:gap-5 max-[700px]:grid-cols-[1fr]">
      <div className="lesson-main [&_h1]:mx-0 [&_h1]:text-[24px] [&_h1]:tracking-[-0.7px] [&_h1]:mt-[25px] [&_h1]:mb-3.5 [&>p]:text-[12px] [&>p]:text-[#838b98] [&>p]:leading-[1.9] [&>p]:mb-4 [&_.button]:mt-2.5 max-[540px]:[&_h1]:text-[23px] max-[540px]:[&>p]:text-[11px]">
        <video
          key={active}
          controls
          playsInline
          preload="metadata"
          poster={course.image}
          className="lesson-player w-full bg-[#111] rounded-[10px] [aspect-ratio:16/9]"
          src="/video/course-preview.mp4"
        />
        <span className="demo-note mx-0 block text-[8px] text-[#9399a5] leading-[1.7] mt-2.5 mb-0">
          Demonstration video. Replace with your own course content before launch.
        </span>
        <h1 className="font-heading">{all[active]}</h1>
        <p>
          {active === 0
            ? `Welcome to ${course.title}. This is your space to explore, try new things, and build skills at your own pace. Start by thinking about what you’d like to create by the end of the course.`
            : `In this lesson, we explore ${all[active].toLowerCase()}. Take a moment to connect these ideas to a project you care about, and make a few notes as you go.`}
        </p>
        <p>
          <strong>Your practice prompt:</strong> Choose one idea from this lesson and put it into
          practice. Write down what you tried, what you learned, and one thing you’d like to explore
          next.
        </p>
        <div className="lesson-actions flex gap-3 items-center flex-wrap">
          <Button
            variant="lime"
            size="pill"
            disabled={busy || completed}
            className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime"
            onClick={complete}
          >
            {busy ? (
              <LoaderCircle size={16} className="spin animate-spin" />
            ) : completed ? (
              <CheckCircle2 size={16} />
            ) : null}
            {completed ? 'Lesson completed' : 'Mark as complete'}
          </Button>
          {active < all.length - 1 ? (
            <Button
              variant="outline"
              size="pill"
              className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-outline"
              onClick={() => select(active + 1)}
            >
              Next lesson
              <ArrowRight size={16} />
            </Button>
          ) : (
            <Button
              size="pill"
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] button button-outline"
              asChild
              variant="outline"
            >
              <Link href={`/courses/${course.id}?tab=reviews`}>
                Share your experience
                <ArrowRight size={16} />
              </Link>
            </Button>
          )}
        </div>
        {error && (
          <p
            role="alert"
            className="error-message mx-0! my-3! text-[#c72e40]! text-[11px]! leading-[1.6]"
          >
            {error}
          </p>
        )}
        <a
          className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] resource-link inline-flex items-center gap-[7px] text-blue text-[11px] mt-[15px]"
          href={`/api/resource?courseId=${course.id}`}
          download
        >
          <Download size={15} />
          Download your practice worksheet
        </a>
        {progress.length === all.length && (
          <div className="empty-state px-5 py-[65px] text-center text-muted-foreground [&>svg]:m-auto [&>svg]:text-[#a2b1d5] [&_h2]:mx-0 [&_h2]:text-[22px] [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2.5 [&_p]:text-[12px] [&_p]:leading-[1.8] [&_.button]:mt-5.5">
            <CheckCircle2 size={40} />
            <h2 className="font-heading">Look how far you’ve come!</h2>
            <p>You’ve completed every lesson. Keep the momentum going with your next course.</p>
            <Button
              size="pill"
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] button button-lime"
              asChild
              variant="lime"
            >
              <Link href="/courses">
                Explore your next step
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        )}
      </div>
      <aside className="lesson-sidebar p-5 [border:1px_solid_var(--color-line)] rounded-[10px] self-start [&>h2]:text-[15px] [&>h2]:mb-3 [&>.progress-bar]:mb-2.5 [&>p]:text-[9px] [&>p]:text-muted-foreground [&>p]:mb-5 [&_h3]:mx-0 [&_h3]:text-[11px] [&_h3]:mt-5 [&_h3]:mb-2.5 [&_button]:px-2 [&_button]:py-3 [&_button]:w-full [&_button]:flex [&_button]:items-center [&_button]:gap-2 [&_button]:text-left [&_button]:bg-white [&_button]:text-[9px] [&_button]:text-[#858c99] [&_button]:rounded-[5px] [&_button.active]:text-blue [&_button.active]:bg-[#f0f4ff] [&_button_svg]:shrink-0 [&_button_.complete]:text-[#7e9b00] max-[700px]:[grid-row:2] max-[700px]:[&_button]:text-[11px] max-[700px]:[&_h3]:text-[13px]">
        <h2 className="font-heading">Your learning journey</h2>
        <div
          className="progress-bar h-[5px] bg-[#e7eadd] flex-1 rounded-[3px] overflow-hidden [&_span]:block [&_span]:h-full [&_span]:bg-blue [&_span]:[transition:width_0.5s]"
          role="progressbar"
          aria-label="Course progress"
          aria-valuemin={0}
          aria-valuemax={all.length}
          aria-valuenow={progress.length}
        >
          <span style={{ width: (progress.length / all.length) * 100 + '%' }} />
        </div>
        <p>
          {progress.length} of {all.length} lessons completed
        </p>
        {lessonGroups.map((g, i) => (
          <div key={g.title}>
            <h3 className="font-heading">
              {String(i + 1).padStart(2, '0')} · {g.title}
            </h3>
            {g.lessons.map((l) => {
              const index = all.indexOf(l);
              return (
                <Button
                  variant="ghost"
                  size="unstyled"
                  key={l}
                  className={active === index ? 'active' : ''}
                  aria-current={active === index ? 'step' : undefined}
                  onClick={() => select(index)}
                >
                  {progress.includes(index) ? (
                    <CheckCircle2 className="complete" size={15} />
                  ) : active === index ? (
                    <Play size={15} />
                  ) : (
                    <Circle size={15} />
                  )}
                  <span>{l}</span>
                </Button>
              );
            })}
          </div>
        ))}
      </aside>
    </div>
  );
}
