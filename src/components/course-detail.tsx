'use client';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

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
      <section className="course-banner px-0 pt-7 pb-28 max-[540px]:pt-5 max-[540px]:pb-22.5 grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70]">
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <nav
            className="breadcrumb flex gap-2.5 items-center text-[9px] text-[#b9cafa] mb-[25px] flex-wrap [&_a:hover]:text-lime max-[540px]:text-[8px] max-[540px]:gap-[7px]"
            aria-label="Breadcrumb"
          >
            <Link
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
              href="/courses"
            >
              All courses
            </Link>
            <span>/</span>
            <Link
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
              href={`/courses?category=${course.category}`}
            >
              {course.category}
            </Link>
            <span>/</span>
            <span>Course details</span>
          </nav>
          <div className="detail-heading max-w-[730px] [&>.tag]:mb-3.5 [&>.tag]:text-[8px] [&_h1]:text-[30px] [&_h1]:font-medium [&_h1]:leading-[1.35] [&_h1]:tracking-[-1px] [&>p]:text-[11px] [&>p]:leading-[1.8] [&>p]:text-[#c2d0f7] [&>p]:mt-3 max-[900px]:max-w-[570px] max-[900px]:[&_h1]:text-[26px] max-[540px]:[&_h1]:text-[26px] max-[540px]:[&>p]:text-[10px]">
            <span className="tag px-2.5 py-[5px] inline-flex rounded-[20px] text-[9px] font-medium lime-tag bg-lime text-foreground">
              {course.category}
            </span>
            <h1 className="font-heading">{course.title}</h1>
            <p>{course.description.split('. ')[0]}.</p>
            <div className="detail-rating flex gap-5 mt-[17px] text-[9px] [&>span]:flex [&>span]:items-center [&>span]:gap-[5px] [&>span:first-child_svg]:text-lime [&>span>span]:text-[#c3d1f8] max-[540px]:gap-[11px] max-[540px]:flex-wrap max-[540px]:text-[8px] max-[540px]:[&_svg]:w-3">
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
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] detail-layout grid grid-cols-[minmax(0,_1fr)_290px] gap-7.5 relative items-start mt-[-78px] pb-[65px] max-[1100px]:grid-cols-[minmax(0,_1fr)_270px] max-[1100px]:gap-6 max-[900px]:grid-cols-[minmax(0,_1fr)_240px] max-[900px]:gap-5 max-[700px]:grid-cols-[1fr] max-[700px]:mt-[-65px] max-[700px]:gap-[25px] max-[540px]:mt-[-60px] max-[540px]:pb-[45px]">
        <div className="detail-main min-w-0 max-[700px]:contents">
          <Button
            variant="ghost"
            size="unstyled"
            className="course-video relative block [aspect-ratio:1.8] w-full rounded-[12px] overflow-hidden bg-[#dce1e6] [&>img]:[object-position:center_30%] [&>img]:[transition:transform_0.7s] [&:hover>img]:[transform:scale(1.03)] [&:hover_.play-button]:[scale:1.1] max-[700px]:[grid-row:1] max-[540px]:[aspect-ratio:1.6]"
            onClick={() => setPreview(true)}
            aria-label="Play course preview"
          >
            <Image
              className="block max-w-full object-cover"
              src={photo('photo-1573496359142-b8d87734a5a2', 1200)}
              alt={`${course.teacher} introducing the course`}
              fill
              sizes="(max-width: 800px) 90vw, 750px"
              priority
            />
            <span className="video-shade absolute top-0 right-0 bottom-0 left-0 [background:linear-gradient(transparent_50%,_#15213488)]" />
            <span className="play-button absolute left-1/2 top-1/2 [transform:translate(-50%,_-50%)] w-16.5 h-16.5 rounded-[50%] grid place-items-center bg-[#ffffffde] text-blue shadow-[0_0_0_13px_#ffffff22] [transition:scale_0.3s] [&_svg]:ml-[3px] max-[540px]:w-13 max-[540px]:h-13 max-[540px]:[&_svg]:w-5.5">
              <Play size={27} fill="currentColor" />
            </span>
            <span className="video-caption absolute bottom-5.5 left-5.5 right-5.5 flex justify-between text-white text-[8px] tracking-[0.8px] [&>span]:tracking-[0] max-[540px]:text-[6px] max-[540px]:left-[15px] max-[540px]:right-[15px] max-[540px]:bottom-4">
              A LITTLE PREVIEW OF WHAT’S POSSIBLE <span>01:00</span>
            </span>
          </Button>
          <div
            className="detail-tabs px-0 flex gap-1.5 [border-bottom:1px_solid_var(--color-line)] pt-[23px] pb-[17px] mb-[25px] [&_button]:px-[17px] [&_button]:py-2 [&_button]:bg-transparent [&_button]:text-[10px] [&_button]:rounded-[20px] [&_button]:text-[#888c97] [&_button.selected]:bg-lime [&_button.selected]:text-foreground max-[700px]:px-0 max-[700px]:m-0 max-[700px]:[grid-row:3] max-[700px]:pt-0 max-[700px]:pb-[15px]"
            role="tablist"
            aria-label="Course information"
          >
            {['overview', 'lessons', 'reviews'].map((t) => (
              <Button
                variant="ghost"
                size="unstyled"
                role="tab"
                aria-selected={tab === t}
                className={tab === t ? 'selected' : ''}
                key={t}
                onClick={() => changeTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </div>
          <section
            className="tab-content [&_h2]:mx-0 [&_h2]:text-[17px] [&_h2]:font-semibold [&_h2]:tracking-[-0.4px] [&_h2]:mt-7 [&_h2]:mb-[13px] [&_h2:first-child]:mt-0 [&>p]:text-[11px] [&>p]:text-[#838894] [&>p]:leading-[1.95] [&>p]:mb-[13px] max-[700px]:[grid-row:4] max-[540px]:[&_h2]:text-[18px] max-[540px]:[&>p]:text-[11px]"
            role="tabpanel"
          >
            {tab === 'overview' ? (
              <>
                <h2 className="font-heading">About this course</h2>
                <p>{course.description}</p>
                <p>
                  This course brings together clear explanations, creative exercises, and a hands-on
                  project. Work at your own pace, revisit your favorite lessons, and start putting
                  your new skills to use from day one.
                </p>
                <h2 className="font-heading">What you’ll learn</h2>
                <div className="learning-outcomes grid grid-cols-[1fr_1fr] gap-[13px] [&>div]:flex [&>div]:gap-2 [&>div]:text-[10px] [&>div]:text-[#7e8491] [&>div]:leading-[1.7] [&_svg]:text-blue [&_svg]:shrink-0 max-[900px]:grid-cols-[1fr] max-[700px]:grid-cols-[1fr_1fr] max-[540px]:grid-cols-[1fr] max-[540px]:[&>div]:text-[11px]">
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
                <h2 className="font-heading">A little inspiration</h2>
                <div className="project-strip grid grid-cols-3 gap-3 [&_img]:w-full [&_img]:h-32.5 [&_img]:rounded-[7px] max-[540px]:gap-2 max-[540px]:[&_img]:h-22.5">
                  {[
                    'photo-1558655146-d09347e92766',
                    'photo-1626785774573-4b799315345d',
                    'photo-1559028012-481c04fa702d',
                  ].map((p, i) => (
                    <Image
                      className="block max-w-full object-cover"
                      key={p}
                      src={photo(p, 300)}
                      alt={`Creative project inspiration ${i + 1}`}
                      width={220}
                      height={150}
                    />
                  ))}
                </div>
                <h2 className="font-heading">Who this course is for</h2>
                <p>
                  Curious beginners, ambitious creatives, and anyone ready to explore a new skill.
                  Bring an open mind, a computer, and a little time to practice. No previous
                  experience is required for the introductory lessons.
                </p>
                <h2 className="font-heading">Your instructor</h2>
                <Link
                  href="/creator"
                  className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] instructor-inline p-4.5 flex items-center gap-3.5 [border:1px_solid_var(--color-line)] rounded-[9px] [&>img]:h-16 [&>img]:w-16 [&>img]:rounded-[50%] [&_h3]:text-[12px] [&_span]:text-[9px] [&_span]:text-blue [&_p]:text-[9px] [&_p]:text-muted-foreground [&_p]:leading-[1.8] [&_p]:mt-[7px] [&>svg]:shrink-0 [&>svg]:ml-auto [&>svg]:text-blue max-[540px]:p-[13px] max-[540px]:gap-2.5 max-[540px]:[&>img]:h-[45px] max-[540px]:[&>img]:w-[45px]"
                >
                  <Image
                    className="block max-w-full object-cover"
                    src={course.avatar}
                    alt={course.teacher}
                    width={64}
                    height={64}
                  />
                  <div>
                    <h3 className="font-heading">{course.teacher}</h3>
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
                <div className="content-heading flex justify-between gap-[15px] items-center [&>span]:text-[9px] [&>span]:text-[#9096a3] [&_h2]:mx-0 [&_h2]:mt-0 [&_h2]:mb-[13px] max-[900px]:block max-[900px]:[&>span]:block max-[900px]:[&>span]:mb-[15px]">
                  <h2 className="font-heading">Your learning journey</h2>
                  <span>
                    {lessonGroups.length} chapters · {lessonGroups.flatMap((g) => g.lessons).length}{' '}
                    demo lessons
                  </span>
                </div>
                <p>
                  A step-by-step path from curious beginner to confident creator. Open a chapter to
                  explore what’s inside.
                </p>
                <div className="lesson-accordion grid gap-3 mt-5.5">
                  {lessonGroups.map((g, i) => (
                    <div
                      className="lesson-group [border:1px_solid_var(--color-line)] rounded-[8px] overflow-hidden [&>button]:p-[15px] [&>button]:flex [&>button]:items-center [&>button]:w-full [&>button]:gap-[13px] [&>button]:bg-[#fafbfc] [&>button]:text-left [&>button]:text-[11px] [&>button]:font-medium [&_small]:block [&_small]:text-[8px] [&_small]:font-normal [&_small]:text-[#959ba7] [&_small]:mt-[3px] [&>button>svg]:ml-auto [&>button>svg]:text-[#8c93a1] [&>button>svg]:[transition:transform_0.2s]"
                      key={g.title}
                    >
                      <Button
                        variant="ghost"
                        size="unstyled"
                        aria-expanded={open.includes(i)}
                        onClick={() =>
                          setOpen((o) => (o.includes(i) ? o.filter((n) => n !== i) : [...o, i]))
                        }
                      >
                        <span className="chapter-number bg-lime w-[31px] h-[31px] grid place-items-center rounded-[7px] text-[11px] shrink-0">
                          0{i + 1}
                        </span>
                        <span>
                          {g.title}
                          <small>{g.lessons.length} lessons</small>
                        </span>
                        <ChevronDown
                          size={18}
                          className={open.includes(i) ? 'rotate [transform:rotate(180deg)]' : ''}
                        />
                      </Button>
                      {open.includes(i) && (
                        <div className="lesson-items px-[15px] py-[5px] [&_button]:px-0 [&_button]:py-[13px] [&_button]:flex [&_button]:gap-2.5 [&_button]:items-center [&_button]:text-left [&_button]:w-full [&_button]:[border-bottom:1px_solid_#f2f3f7] [&_button]:bg-white [&_button]:text-[#8b93a2] [&_button]:text-[9px] [&_button:last-child]:border-0 [&_button:hover]:text-blue [&_button>span:first-of-type]:flex-1 [&_button_small]:m-0">
                          {g.lessons.map((l, j) => (
                            <Button
                              variant="ghost"
                              size="unstyled"
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
                                <span className="free-label text-[7px] text-blue">
                                  {enrolled ? 'Watch' : 'Preview'}
                                </span>
                              )}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="font-heading">Our learners say it best</h2>
                <div className="rating-summary p-4.5 flex items-center gap-7.5 [border:1px_solid_var(--color-line)] rounded-[8px] max-[540px]:p-[15px] max-[540px]:gap-[17px]">
                  <div className="rating-score px-3 py-4 bg-[#e7fc85] flex flex-col items-center justify-center rounded-[5px] w-[105px] shrink-0 [&_strong]:text-[39px] [&_strong]:leading-[1.2] [&_strong]:text-blue [&_strong]:font-semibold [&_strong]:tracking-[-1.5px] [&_.stars]:text-[10px] [&_.stars]:mt-[3px] [&>span:last-child]:text-[7px] [&>span:last-child]:mt-[5px] max-[540px]:w-[95px]">
                    <strong>{course.rating}</strong>
                    <span className="stars text-blue tracking-[1px]">★★★★★</span>
                    <span>Course rating</span>
                  </div>
                  <div className="rating-bars flex-1 grid gap-[7px] [&>div]:flex [&>div]:items-center [&>div]:gap-[5px] [&>div]:text-[9px] [&>div]:text-[#9299a5] [&_i]:mx-1.5 [&_i]:h-[5px] [&_i]:flex-1 [&_i]:bg-[#f0f2e9] [&_i]:rounded-[3px] [&_i]:overflow-hidden [&_i_span]:block [&_i_span]:h-full [&_i_span]:bg-lime [&_i_span]:rounded-[3px] [&_small]:w-[25px] [&_small]:text-right [&_small]:text-[8px]">
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
                <p className="demo-note mx-0 block text-[8px] text-[#9399a5] leading-[1.7] mt-2.5 mb-0">
                  The initial course ratings and testimonials are illustrative. New reviews below
                  are saved from this demo.
                </p>
                <div className="review-list mt-[23px] grid gap-3.5">
                  {[...reviews, ...sampleReviews].map((r, i) => (
                    <article
                      className="written-review p-4.5 [border:1px_solid_var(--color-line)] rounded-[8px] [&_.review-person_img]:w-[35px] [&_.review-person_img]:h-[35px] [&_h3]:text-[10px] [&_.review-person>div>.stars]:text-blue [&_.review-person>div>.stars]:text-[8px] [&_p]:text-[10px] [&_p]:leading-[1.9] [&_p]:text-[#8a919d] [&_p]:mt-[13px] max-[540px]:[&_p]:text-[11px]"
                      key={r.id}
                    >
                      <div className="review-person flex items-center gap-[11px] [&_img]:rounded-[50%] [&_img]:shrink-0 [&_img]:h-11 [&_img]:w-11 [&_h3]:text-[11px] [&_h3]:font-semibold [&>div>span]:text-[8px] [&>div>span]:text-muted-foreground [&_time]:ml-auto [&_time]:text-[7px] [&_time]:text-[#a1a7b2] max-[540px]:[&_h3]:text-[12px] max-[540px]:[&>div>span]:text-[9px] max-[540px]:[&_time]:text-[6px]">
                        <Image
                          className="block max-w-full object-cover"
                          src={avatars[i % avatars.length]}
                          alt=""
                          width={38}
                          height={38}
                        />
                        <div>
                          <h3 className="font-heading">{r.name}</h3>
                          <span className="stars text-blue tracking-[1px]">
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
                <form
                  className="review-form [border-top:1px_solid_var(--color-line)] mt-7.5 pt-[25px] [&_h3]:text-[15px] [&_p]:mx-0 [&_p]:my-2.5 [&_p]:text-[10px] [&_p]:text-[#8c93a1] [&_textarea]:p-[13px] [&_textarea]:w-full [&_textarea]:[border:1px_solid_var(--color-line)] [&_textarea]:rounded-[7px] [&_textarea]:text-[11px] [&_textarea]:resize-y [&_textarea]:mb-3 [&_[data-slot='textarea']]:rounded-[9px] [&_[data-slot='textarea']]:border-[#e0e5ed] [&_[data-slot='textarea']]:[transition:border-color_0.2s,_box-shadow_0.2s] [&_[data-slot='textarea']:focus]:[outline:none] [&_[data-slot='textarea']:focus]:border-blue [&_[data-slot='textarea']:focus]:shadow-[0_0_0_3px_#003be212]"
                  onSubmit={submitReview}
                >
                  <h3 className="font-heading">Share your experience</h3>
                  <p>Your perspective could inspire someone’s next step.</p>
                  <div
                    className="review-rating mx-0 my-[15px] flex gap-1 [&_button]:p-[3px] [&_button]:bg-transparent [&_button]:text-[#a0bd00] [&_svg]:w-5"
                    aria-label="Your rating"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Button
                        variant="ghost"
                        size="unstyled"
                        type="button"
                        key={n}
                        aria-label={`Rate ${n} stars`}
                        aria-pressed={rating === n}
                        onClick={() => setRating(n)}
                      >
                        <Star fill={n <= rating ? 'currentColor' : 'none'} />
                      </Button>
                    ))}
                  </div>
                  <label className="sr-only" htmlFor="review-text">
                    Your review
                  </label>
                  <Textarea
                    id="review-text"
                    name="review"
                    required
                    minLength={10}
                    maxLength={2000}
                    placeholder="What did you enjoy about this course?"
                    rows={4}
                  />
                  <Button
                    variant="lime"
                    size="pill"
                    className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime"
                  >
                    Publish review
                    <ArrowUpRight size={16} />
                  </Button>
                  <p role="status">{reviewMessage}</p>
                </form>
              </>
            )}
          </section>
        </div>
        <aside className="enrollment-card px-[21px] py-[23px] bg-white [border:1px_solid_var(--color-line)] rounded-[11px] sticky top-6 shadow-[0_7px_20px_#09152804] [&>p]:mx-0 [&>p]:text-[8px] [&>p]:text-[#8a8f9c] [&>p]:leading-[1.8] [&>p]:mt-2 [&>p]:mb-4 [&>.button]:px-[17px] [&>.button]:py-2.5 [&>.button]:w-full [&>.button]:text-[11px] [&>.button]:justify-between [&>.button]:min-h-[41px] [&>h3]:mx-0 [&>h3]:text-[11px] [&>h3]:font-medium [&>h3]:mt-6.5 [&>h3]:mb-4 max-[900px]:px-[15px] max-[900px]:py-[19px] max-[700px]:p-6 max-[700px]:static max-[700px]:[grid-row:2] max-[700px]:[&_.course-includes]:grid-cols-[1fr_1fr] max-[700px]:[&_.course-includes]:gap-x-5 max-[700px]:[&_.course-includes_li]:text-[9px] max-[700px]:[&_.course-includes_li>span]:text-[8px] max-[700px]:[&>.button]:text-[12px] max-[700px]:[&>p]:text-[10px] max-[700px]:[&_.demo-note]:text-[9px] max-[700px]:[&>h3]:text-[12px] max-[700px]:[&>h3]:mt-5 max-[540px]:px-4.5 max-[540px]:py-5.5 max-[540px]:[&_.course-includes]:grid-cols-[1fr] max-[540px]:[&_.course-includes_li]:text-[10px] max-[540px]:[&_.course-includes_li>span]:text-[9px]">
          <div className="enroll-price flex items-center gap-2.5 flex-wrap [&_strong]:text-blue [&_strong]:text-[29px] [&_strong]:tracking-[-1px] [&_strong]:font-semibold [&_del]:text-[12px] [&_del]:text-[#a4a9b3] [&_.tag]:px-1.5 [&_.tag]:py-1 [&_.tag]:text-[6px] [&_.tag]:ml-auto max-[900px]:[&_strong]:text-[25px] max-[900px]:[&_.tag]:hidden max-[700px]:[&_strong]:text-[32px] max-[700px]:[&_.tag]:inline-flex max-[700px]:[&_.tag]:text-[8px]">
            <strong>${course.price.toFixed(2)}</strong>
            <del>${(course.price + 30).toFixed(2)}</del>
            <span className="tag px-2.5 py-[5px] inline-flex rounded-[20px] text-[9px] font-medium lime-tag bg-lime text-foreground">
              BEST VALUE
            </span>
          </div>
          <p>A small step. A lasting investment in you.</p>
          <Button
            variant="lime"
            size="pill"
            className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime"
            disabled={busy}
            onClick={enroll}
          >
            {busy ? (
              <LoaderCircle size={17} className="spin animate-spin" />
            ) : enrolled ? (
              'Continue learning'
            ) : (
              'Start learning'
            )}
            <ArrowUpRight size={17} />
          </Button>
          <span className="demo-note mx-0 block text-[8px] text-[#9399a5] leading-[1.7] mt-2.5 mb-0">
            Demo access is free. No payment is collected.
          </span>
          {error && (
            <p
              className="error-message mx-0! my-3! text-[#c72e40]! text-[11px]! leading-[1.6]"
              role="alert"
            >
              {error}
            </p>
          )}
          <h3 className="font-heading">What’s waiting for you</h3>
          <ul className="course-includes p-0 m-0 list-none grid gap-4 [&_li]:flex [&_li]:items-center [&_li]:gap-2 [&_li]:text-[8px] [&_li]:text-[#858b99] [&_li>svg:first-child]:text-[#667087] [&_li>svg:first-child]:shrink-0 [&_li>span]:ml-auto [&_li>span]:text-[8px] [&_li>span]:text-blue [&_li>svg:last-child:not(:first-child)]:ml-auto [&_li>svg:last-child:not(:first-child)]:text-[8px] [&_li>svg:last-child:not(:first-child)]:text-blue max-[900px]:[&_li]:text-[7px] max-[900px]:[&_li]:gap-1.5 max-[900px]:[&_li>span]:text-[7px]">
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
          <div className="sidebar-instructor px-0 py-[17px] [border-top:1px_solid_var(--color-line)] [border-bottom:1px_solid_var(--color-line)] mt-[25px] flex items-center gap-[9px] [&>img]:rounded-[50%] [&>img]:w-10 [&>img]:h-10 [&_span]:text-[8px] [&_span]:block [&_span]:text-muted-foreground [&_a]:flex [&_a]:items-center [&_a]:gap-2.5 [&_a]:text-[10px] [&_a]:mt-[3px] max-[700px]:mt-5">
            <Image
              className="block max-w-full object-cover"
              src={course.avatar}
              alt=""
              width={40}
              height={40}
            />
            <div>
              <span>Learn with</span>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/creator"
              >
                {course.teacher}
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
          <Button
            variant="ghost"
            size="unstyled"
            className="share-button flex items-center justify-center gap-[7px] bg-transparent w-full text-[8px] text-[#818999] mt-[17px] [&:hover]:text-blue max-[700px]:text-[10px]"
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
          </Button>
        </aside>
      </div>
      <dialog
        ref={dialog}
        className="preview-dialog p-0 w-[min(850px,_90vw)] border-0 rounded-[12px] overflow-visible bg-white shadow-[0_20px_80px_#0004] [&::backdrop]:bg-[#061133c9] [&::backdrop]:[backdrop-filter:blur(7px)] [&_video]:w-full [&_video]:rounded-[12px_12px_0_0] [&_video]:bg-black [&_video]:[aspect-ratio:16/9]"
        onCancel={() => setPreview(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPreview(false);
        }}
      >
        <Button
          variant="ghost"
          size="unstyled"
          className="dialog-close p-[5px] absolute right-0 top-[-40px] bg-white text-[#333] rounded-[50%] z-2"
          aria-label="Close preview"
          onClick={() => setPreview(false)}
        >
          <X />
        </Button>
        {preview && (
          <>
            <video
              controls
              autoPlay
              playsInline
              poster={course.image}
              src="/video/course-preview.mp4"
            />
            <div className="preview-description p-5 [&_h3]:text-[16px] [&_p]:text-[10px] [&_p]:text-muted-foreground [&_p]:mt-2">
              <h3 className="font-heading">{course.title}</h3>
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
