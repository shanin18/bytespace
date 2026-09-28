'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  Download,
  Globe,
  GraduationCap,
  LockKeyhole,
  Play,
  Share2,
  Star,
  Users,
  X,
  LoaderCircle,
} from 'lucide-react';
import { type Course, lessonGroups, avatars, photo } from '@/lib/courses';

type Review = { id: string; name: string; rating: number; text: string; date: string };
const sampleReviews: Review[] = [
  {
    id: 'sample-1',
    name: 'Sarah Mitchell',
    rating: 5,
    text: 'A thoughtful, practical introduction. I loved being able to follow along with each project and put the ideas into practice immediately.',
    date: '2026-06-10',
  },
  {
    id: 'sample-2',
    name: 'Alex Rivera',
    rating: 5,
    text: 'The lessons are clear and easy to follow. This gave me the confidence to finally start my own project. Looking forward to learning more!',
    date: '2026-06-08',
  },
  {
    id: 'sample-3',
    name: 'Emily Wilson',
    rating: 4,
    text: 'A really useful foundation with plenty of practical examples. I especially enjoyed the project at the end of the course.',
    date: '2026-06-02',
  },
];
export function CourseDetail({
  course,
  initialTab = 'overview',
}: {
  course: Course;
  initialTab?: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState(initialTab);
  const [open, setOpen] = useState<number[]>([0]);
  const [preview, setPreview] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(false);
  const [share, setShare] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState('');
  useEffect(() => {
    fetch('/api/account')
      .then((r) => r.json())
      .then((d) => setEnrolled(d.user?.enrolled.includes(course.id) || false))
      .catch(() => {});
    fetch('/api/reviews?courseId=' + course.id)
      .then((r) => r.json())
      .then((d) => setReviews(d.reviews))
      .catch(() => {});
  }, [course.id]);
  useEffect(() => {
    if (preview) dialog.current?.showModal();
    else dialog.current?.close();
  }, [preview]);
  async function enroll() {
    setBusy(true);
    setError('');
    try {
      const r = await fetch('/api/learning', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id }),
      });
      if (r.status === 401) {
        router.push('/login?next=' + encodeURIComponent(`/courses/${course.id}`));
        return;
      }
      const d = await r.json();
      if (!r.ok) {
        setError(d.error);
        return;
      }
      setEnrolled(true);
      router.push(`/courses/${course.id}/learn`);
    } catch {
      setError('Unable to enroll. Please try again.');
    } finally {
      setBusy(false);
    }
  }
  function changeTab(value: string) {
    setTab(value);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', value);
    window.history.replaceState(null, '', url);
  }
  async function submitReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setReviewMessage('Saving your review…');
    try {
      const r = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseId: course.id,
          rating,
          text: new FormData(form).get('review'),
        }),
      });
      const d = await r.json();
      if (!r.ok) {
        setReviewMessage(d.error);
        return;
      }
      const list = await fetch('/api/reviews?courseId=' + course.id).then((r) => r.json());
      setReviews(list.reviews);
      setReviewMessage('Thank you! Your review has been published.');
      form.reset();
    } catch {
      setReviewMessage('Unable to save your review. Please try again.');
    }
  }
  return (
    <>
      <section className="course-banner grid-blue">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/courses">All courses</Link>
            <span>/</span>
            <Link href={`/courses?category=${course.category}`}>{course.category}</Link>
            <span>/</span>
            <span>Course details</span>
          </nav>
          <div className="detail-heading">
            <span className="tag lime-tag">{course.category}</span>
            <h1>{course.title}</h1>
            <p>{course.description.split('. ')[0]}.</p>
            <div className="detail-rating">
              <span>
                <Star size={14} fill="currentColor" /> {course.rating}{' '}
                <span>({course.students} learners)</span>
              </span>
              <span>
                <Globe size={14} />
                English
              </span>
              <span>
                <GraduationCap size={15} />
                {course.level}
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="container detail-layout">
        <div className="detail-main">
          <button
            className="course-video"
            onClick={() => setPreview(true)}
            aria-label="Play course preview"
          >
            <Image
              src={photo('photo-1573496359142-b8d87734a5a2', 1200)}
              alt={`${course.teacher} introducing the course`}
              fill
              sizes="(max-width: 800px) 90vw, 750px"
              priority
            />
            <span className="video-shade" />
            <span className="play-button">
              <Play size={27} fill="currentColor" />
            </span>
            <span className="video-caption">
              A LITTLE PREVIEW OF WHAT’S POSSIBLE <span>01:00</span>
            </span>
          </button>
          <div className="detail-tabs" role="tablist" aria-label="Course information">
            {['overview', 'lessons', 'reviews'].map((t) => (
              <button
                role="tab"
                aria-selected={tab === t}
                className={tab === t ? 'selected' : ''}
                key={t}
                onClick={() => changeTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
          <section className="tab-content" role="tabpanel">
            {tab === 'overview' ? (
              <>
                <h2>About this course</h2>
                <p>{course.description}</p>
                <p>
                  This course brings together clear explanations, creative exercises, and a hands-on
                  project. Work at your own pace, revisit your favorite lessons, and start putting
                  your new skills to use from day one.
                </p>
                <h2>What you’ll learn</h2>
                <div className="learning-outcomes">
                  {[
                    'Build a confident foundation in the essentials',
                    'Turn your ideas into a practical project',
                    'Find a creative process that works for you',
                    'Use industry tools with greater confidence',
                    'Create work you’ll be proud to share',
                    'Take your next step with a clear direction',
                  ].map((t) => (
                    <div key={t}>
                      <CheckCircle2 size={17} />
                      {t}
                    </div>
                  ))}
                </div>
                <h2>A little inspiration</h2>
                <div className="project-strip">
                  {[
                    'photo-1558655146-d09347e92766',
                    'photo-1626785774573-4b799315345d',
                    'photo-1559028012-481c04fa702d',
                  ].map((p, i) => (
                    <Image
                      key={p}
                      src={photo(p, 300)}
                      alt={`Creative project inspiration ${i + 1}`}
                      width={220}
                      height={150}
                    />
                  ))}
                </div>
                <h2>Who this course is for</h2>
                <p>
                  Curious beginners, ambitious creatives, and anyone ready to explore a new skill.
                  Bring an open mind, a computer, and a little time to practice. No previous
                  experience is required for the introductory lessons.
                </p>
                <h2>Your instructor</h2>
                <Link href="/creator" className="instructor-inline">
                  <Image src={course.avatar} alt={course.teacher} width={64} height={64} />
                  <div>
                    <h3>{course.teacher}</h3>
                    <span>Designer, maker & lifelong learner</span>
                    <p>
                      Sharing practical skills and a fresh perspective to help you create your next
                      big thing.
                    </p>
                  </div>
                  <ArrowUpRight size={22} />
                </Link>
              </>
            ) : tab === 'lessons' ? (
              <>
                <div className="content-heading">
                  <h2>Your learning journey</h2>
                  <span>
                    {lessonGroups.length} chapters · {lessonGroups.flatMap((g) => g.lessons).length}{' '}
                    demo lessons
                  </span>
                </div>
                <p>
                  A step-by-step path from curious beginner to confident creator. Open a chapter to
                  explore what’s inside.
                </p>
                <div className="lesson-accordion">
                  {lessonGroups.map((g, i) => (
                    <div className="lesson-group" key={g.title}>
                      <button
                        aria-expanded={open.includes(i)}
                        onClick={() =>
                          setOpen((o) => (o.includes(i) ? o.filter((n) => n !== i) : [...o, i]))
                        }
                      >
                        <span className="chapter-number">0{i + 1}</span>
                        <span>
                          {g.title}
                          <small>{g.lessons.length} lessons</small>
                        </span>
                        <ChevronDown size={18} className={open.includes(i) ? 'rotate' : ''} />
                      </button>
                      {open.includes(i) && (
                        <div className="lesson-items">
                          {g.lessons.map((l, j) => (
                            <button
                              key={l}
                              onClick={() =>
                                enrolled
                                  ? router.push(
                                      `/courses/${course.id}/learn?lesson=${lessonGroups.slice(0, i).reduce((n, x) => n + x.lessons.length, 0) + j}`,
                                    )
                                  : i === 0 && j === 0
                                    ? setPreview(true)
                                    : enroll()
                              }
                            >
                              <Play size={14} />
                              <span>{l}</span>
                              <small>{4 + j * 2}:00</small>
                              {!enrolled && (i !== 0 || j !== 0) ? (
                                <LockKeyhole size={13} />
                              ) : (
                                <span className="free-label">{enrolled ? 'Watch' : 'Preview'}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2>Our learners say it best</h2>
                <div className="rating-summary">
                  <div className="rating-score">
                    <strong>{course.rating}</strong>
                    <span className="stars">★★★★★</span>
                    <span>Course rating</span>
                  </div>
                  <div className="rating-bars">
                    {[5, 4, 3, 2, 1].map((n, i) => (
                      <div key={n}>
                        <span>{n}</span>
                        <Star size={11} />
                        <i>
                          <span style={{ width: [78, 15, 5, 1, 1][i] + '%' }} />
                        </i>
                        <small>{[78, 15, 5, 1, 1][i]}%</small>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="demo-note">
                  The initial course ratings and testimonials are illustrative. New reviews below
                  are saved from this demo.
                </p>
                <div className="review-list">
                  {[...reviews, ...sampleReviews].map((r, i) => (
                    <article className="written-review" key={r.id}>
                      <div className="review-person">
                        <Image src={avatars[i % avatars.length]} alt="" width={38} height={38} />
                        <div>
                          <h3>{r.name}</h3>
                          <span className="stars">
                            {'★'.repeat(r.rating)}
                            {'☆'.repeat(5 - r.rating)}
                          </span>
                        </div>
                        <time>
                          {new Date(r.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </time>
                      </div>
                      <p>{r.text}</p>
                    </article>
                  ))}
                </div>
                <form className="review-form" onSubmit={submitReview}>
                  <h3>Share your experience</h3>
                  <p>Your perspective could inspire someone’s next step.</p>
                  <div className="review-rating" aria-label="Your rating">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        type="button"
                        key={n}
                        aria-label={`Rate ${n} stars`}
                        aria-pressed={rating === n}
                        onClick={() => setRating(n)}
                      >
                        <Star fill={n <= rating ? 'currentColor' : 'none'} />
                      </button>
                    ))}
                  </div>
                  <label className="sr-only" htmlFor="review-text">
                    Your review
                  </label>
                  <textarea
                    id="review-text"
                    name="review"
                    required
                    minLength={10}
                    maxLength={2000}
                    placeholder="What did you enjoy about this course?"
                    rows={4}
                  />
                  <button className="button button-lime">
                    Publish review
                    <ArrowUpRight size={16} />
                  </button>
                  <p role="status">{reviewMessage}</p>
                </form>
              </>
            )}
          </section>
        </div>
        <aside className="enrollment-card">
          <div className="enroll-price">
            <strong>${course.price.toFixed(2)}</strong>
            <del>${(course.price + 30).toFixed(2)}</del>
            <span className="tag lime-tag">BEST VALUE</span>
          </div>
          <p>A small step. A lasting investment in you.</p>
          <button className="button button-lime" disabled={busy} onClick={enroll}>
            {busy ? (
              <LoaderCircle size={17} className="spin" />
            ) : enrolled ? (
              'Continue learning'
            ) : (
              'Start learning'
            )}
            <ArrowUpRight size={17} />
          </button>
          <span className="demo-note">Demo access is free. No payment is collected.</span>
          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
          <h3>What’s waiting for you</h3>
          <ul className="course-includes">
            <li>
              <BookOpen size={17} />
              Engaging lessons<span>{course.lessons}</span>
            </li>
            <li>
              <Clock3 size={17} />
              On-demand learning<span>{course.hours}</span>
            </li>
            <li>
              <GraduationCap size={17} />
              Experience level<span>{course.level}</span>
            </li>
            <li>
              <Globe size={17} />
              Course language<span>English</span>
            </li>
            <li>
              <Download size={17} />
              Practice resources
              <Check size={16} />
            </li>
            <li>
              <Users size={17} />A curious community
              <Check size={16} />
            </li>
          </ul>
          <div className="sidebar-instructor">
            <Image src={course.avatar} alt="" width={40} height={40} />
            <div>
              <span>Learn with</span>
              <Link href="/creator">
                {course.teacher}
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
          <button
            className="share-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  window.location.origin + `/courses/${course.id}`,
                );
                setShare(true);
                setTimeout(() => setShare(false), 2500);
              } catch {
                setError('Copy this page’s address from your browser to share it.');
              }
            }}
          >
            <Share2 size={15} />
            {share ? 'Link copied!' : 'Good things are worth sharing'}
          </button>
        </aside>
      </div>
      <dialog
        ref={dialog}
        className="preview-dialog"
        onCancel={() => setPreview(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPreview(false);
        }}
      >
        <button
          className="dialog-close"
          aria-label="Close preview"
          onClick={() => setPreview(false)}
        >
          <X />
        </button>
        {preview && (
          <>
            <video
              controls
              autoPlay
              playsInline
              poster={course.image}
              src="/video/course-preview.mp4"
            />
            <div className="preview-description">
              <h3>{course.title}</h3>
              <p>
                Sample video for this demo. Final course videos can be connected to your own video
                provider.
              </p>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
