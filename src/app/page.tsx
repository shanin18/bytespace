import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUpRight,
  Check,
  BadgeCheck,
  Palette,
  Code2,
  Megaphone,
  BriefcaseBusiness,
  Camera,
  Heart,
  Star,
  Play,
} from 'lucide-react';
import {
  Avatars,
  Counter,
  CTA,
  Decorations,
  PartnerMarquee,
  Reveal,
  SearchBox,
  Spring,
  Testimonials,
} from '@/components/ui';
import { HomeCourses } from '@/components/catalog';
import { portrait, photo } from '@/lib/courses';

export default function Home() {
  return (
    <>
      <section className="hero grid-blue">
        <Decorations />
        <div className="container hero-content">
          <div className="hero-heading">
            <span className="hero-kicker">
              <span /> A little curiosity. Endless possibilities.
            </span>
            <h1>
              Get access to hundreds
              <br />
              of courses{' '}
              <span className="hero-highlight">
                available
                <svg viewBox="0 0 310 15" aria-hidden="true">
                  <path d="M3 10Q155 -5 306 9" />
                </svg>
              </span>
            </h1>
            <p>
              Big dreams start with a little learning. Discover your passion,
              <br className="desktop-break" /> build real skills, and make your next move with
              ByteSpace.
            </p>
            <SearchBox large />
            <div className="hero-popular">
              Popular: <Link href="/courses?category=Design">Design</Link>
              <span>·</span>
              <Link href="/courses?category=Development">Development</Link>
              <span>·</span>
              <Link href="/courses?category=Marketing">Marketing</Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit" />
            <div className="hero-portrait">
              <Image
                src={portrait}
                alt="Creative learner ready to explore new possibilities"
                fill
                priority
                sizes="(max-width: 600px) 75vw, 430px"
              />
            </div>
            <div className="floating-card hero-card-left">
              <span className="mini-label">
                <span className="green-dot" /> YOUR NEXT CHAPTER
              </span>
              <strong>
                Small steps.
                <br />
                Big possibilities.
              </strong>
              <div className="card-scribble">↗</div>
              <div className="mini-progress">
                <span />
              </div>
              <span className="tiny">Keep going. You’ve got this.</span>
            </div>
            <div className="floating-card hero-card-right">
              <span className="mini-icon">
                <BadgeCheck size={23} />
              </span>
              <strong>
                <Counter value={55} suffix="%" />
              </strong>
              <span>
                more confident.
                <br />
                Ready for what’s next.
              </span>
            </div>
            <div className="floating-card hero-card-bottom">
              <Avatars />
              <div>
                <strong>Join 15,000+ curious minds</strong>
                <span>
                  <span className="stars">★★★★★</span> 4.9/5 from our community
                </span>
              </div>
            </div>
            <div className="hand-note">
              Your future looks bright!<span>⤵</span>
            </div>
          </div>
        </div>
      </section>
      <PartnerMarquee />
      <section id="courses" className="section-space course-section">
        <div className="container">
          <Reveal className="section-heading centered">
            <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
            <h2>
              Discover your passion.
              <br />
              Build your skills<span className="blue-dot">.</span>
            </h2>
            <p>
              Whether you’re finding your feet or taking a leap, there’s a course for you.
              <br className="desktop-break" /> Learn something you love. Create something that
              matters.
            </p>
          </Reveal>
          <HomeCourses />
        </div>
      </section>
      <section className="learning-paths">
        <div className="container">
          <Reveal className="section-heading centered">
            <h2>Explore diverse learning paths at ByteSpace</h2>
            <p>One curious mind. So many directions to go.</p>
          </Reveal>
          <div className="path-grid">
            {[
              { name: 'Design', icon: Palette },
              { name: 'Development', icon: Code2 },
              { name: 'Marketing', icon: Megaphone },
              { name: 'Business', icon: BriefcaseBusiness },
              { name: 'Photography', icon: Camera },
              { name: 'Lifestyle', icon: Heart },
            ].map(({ name, icon: Icon }) => (
              <Link key={name} href={`/courses?category=${name}`} className="path-card">
                <span>
                  <Icon size={23} strokeWidth={1.6} />
                </span>
                <h3>{name}</h3>
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section id="about" className="about-section">
        <div className="container">
          <div className="feature-row">
            <Reveal className="feature-copy">
              <span className="eyebrow">A FUTURE FULL OF POSSIBILITIES</span>
              <h2>
                Your path to professional
                <br />
                growth starts here<span className="blue-dot">!</span>
              </h2>
              <p>
                Great things happen when you invest in yourself. Learn from people who love what
                they do, build skills that open doors, and take that next step with confidence.
              </p>
              <Link href="/courses" className="text-link">
                Find your next step <ArrowUpRight size={18} />
              </Link>
              <div className="stats">
                <div>
                  <strong>
                    <Counter value={15} suffix="K+" />
                  </strong>
                  <span>Happy learners</span>
                </div>
                <div>
                  <strong>
                    <Counter value={700} suffix="+" />
                  </strong>
                  <span>Inspiring courses</span>
                </div>
                <div>
                  <strong>
                    <Counter value={98} suffix="%" />
                  </strong>
                  <span>Learner satisfaction</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="feature-art">
              <div className="feature-circle" />
              <div className="feature-person">
                <Image
                  src={portrait}
                  alt="A confident creative professional"
                  fill
                  sizes="(max-width: 700px) 80vw, 360px"
                />
              </div>
              <div className="floating-card mini-course">
                <Image
                  src={photo('photo-1558655146-9f40138edfeb', 300)}
                  alt="Colorful design project"
                  width={180}
                  height={110}
                />
                <strong>Make your ideas happen.</strong>
                <span>Learn. Create. Grow.</span>
              </div>
              <div className="floating-card confidence-card">
                <span className="mini-icon">
                  <Star size={18} />
                </span>
                <strong>Big on possibilities.</strong>
                <span>Built around you.</span>
              </div>
              <Spring />
            </Reveal>
          </div>
          <div className="feature-row reversed">
            <Reveal className="feature-art creator-art">
              <div className="feature-circle" />
              <div className="feature-person">
                <Image
                  src={portrait}
                  alt="ByteSpace course creator"
                  fill
                  sizes="(max-width: 700px) 80vw, 360px"
                />
              </div>
              <div className="creator-label">
                <span>Share what you know</span>
                <strong>
                  Your ideas.
                  <br />
                  Their inspiration.
                </strong>
                <ArrowUpRight size={23} />
              </div>
              <div className="floating-card creator-community">
                <Avatars />
                <strong>A community that grows with you.</strong>
              </div>
              <Spring />
            </Reveal>
            <Reveal className="feature-copy">
              <span className="eyebrow">MADE FOR THE KNOWLEDGE SHARERS</span>
              <h2>
                Create & manage
                <br />
                courses easily<span className="blue-dot">.</span>
              </h2>
              <p>
                Your experience could be someone’s breakthrough. We make it simple to turn what you
                know into a course the world can learn from.
              </p>
              <ul className="check-list">
                {[
                  'Simple tools. More room for your ideas.',
                  'Teach your way, on your schedule.',
                  'Connect with a curious global community.',
                  'Build something that makes a difference.',
                ].map((t) => (
                  <li key={t}>
                    <Check size={15} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/register?role=creator" className="text-link">
                Start your creator journey
                <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
      <CTA />
      <Testimonials />
    </>
  );
}
