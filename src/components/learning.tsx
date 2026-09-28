'use client';
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
      <button
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
      </button>
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
    <div className="container learner-layout">
      <div className="lesson-main">
        <video
          key={active}
          controls
          playsInline
          preload="metadata"
          poster={course.image}
          className="lesson-player"
          src="/video/course-preview.mp4"
        />
        <span className="demo-note">
          Demonstration video. Replace with your own course content before launch.
        </span>
        <h1>{all[active]}</h1>
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
        <div className="lesson-actions">
          <button disabled={busy || completed} className="button button-lime" onClick={complete}>
            {busy ? (
              <LoaderCircle size={16} className="spin" />
            ) : completed ? (
              <CheckCircle2 size={16} />
            ) : null}
            {completed ? 'Lesson completed' : 'Mark as complete'}
          </button>
          {active < all.length - 1 ? (
            <button className="button button-outline" onClick={() => select(active + 1)}>
              Next lesson
              <ArrowRight size={16} />
            </button>
          ) : (
            <Link className="button button-outline" href={`/courses/${course.id}?tab=reviews`}>
              Share your experience
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}
        <a className="resource-link" href={`/api/resource?courseId=${course.id}`} download>
          <Download size={15} />
          Download your practice worksheet
        </a>
        {progress.length === all.length && (
          <div className="empty-state">
            <CheckCircle2 size={40} />
            <h2>Look how far you’ve come!</h2>
            <p>You’ve completed every lesson. Keep the momentum going with your next course.</p>
            <Link href="/courses" className="button button-lime">
              Explore your next step
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
      <aside className="lesson-sidebar">
        <h2>Your learning journey</h2>
        <div
          className="progress-bar"
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
            <h3>
              {String(i + 1).padStart(2, '0')} · {g.title}
            </h3>
            {g.lessons.map((l) => {
              const index = all.indexOf(l);
              return (
                <button
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
                </button>
              );
            })}
          </div>
        ))}
      </aside>
    </div>
  );
}
