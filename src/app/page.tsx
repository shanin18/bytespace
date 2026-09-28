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
      <section className="hero relative overflow-hidden min-h-[800px] [&_h1]:text-[58px] [&_h1]:leading-[1.17] [&_h1]:tracking-[-2.5px] [&_h1]:font-semibold min-[1500px]:min-h-[850px] min-[1500px]:[&_h1]:text-[64px] max-[1100px]:[&_h1]:text-[52px] max-[1100px]:min-h-[770px] max-[1100px]:[&_.triangle]:right-[12%] max-[1100px]:[&_.triangle]:[scale:0.75] max-[900px]:min-h-[740px] max-[900px]:[&_h1]:text-[46px] max-[900px]:[&_.donut]:left-[-25px] max-[900px]:[&_.donut]:[scale:0.75] max-[900px]:[&_.spring-one]:left-[-48px] max-[900px]:[&_.spring-one]:[scale:0.85] max-[900px]:[&_.spring-two]:right-[-30px] max-[900px]:[&_.spring-two]:[scale:0.65] max-[900px]:[&_.spring-three]:left-[5%] max-[900px]:[&_.triangle]:right-[5%] max-[900px]:[&_.pill-shape]:[scale:0.7] max-[900px]:[&_.pill-shape]:right-[-42px] max-[700px]:[&_h1]:text-[40px] max-[700px]:[&_.triangle]:hidden max-[700px]:[&_.spring-three]:top-[295px] max-[700px]:[&_.spring-three]:left-[-25px] max-[700px]:[&_.spring-three]:[scale:0.7] max-[700px]:[&_.spring-two]:hidden max-[540px]:min-h-[690px] max-[540px]:[&_h1]:text-[34px] max-[540px]:[&_h1]:tracking-[-1.5px] max-[540px]:[&_h1]:leading-[1.2] max-[540px]:[&_.spring-one]:left-[-58px] max-[540px]:[&_.spring-one]:top-[135px] max-[540px]:[&_.spring-one]:[scale:0.6] max-[540px]:[&_.spring-three]:hidden max-[540px]:[&_.pill-shape]:right-[-68px] max-[540px]:[&_.pill-shape]:top-[123px] max-[540px]:[&_.pill-shape]:[scale:0.55] max-[540px]:[&_.donut]:left-[-54px] max-[540px]:[&_.donut]:bottom-[19px] max-[540px]:[&_.donut]:[scale:0.55] grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70]">
        <Decorations />
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] hero-content relative z-2 pt-13.5 min-[1500px]:pt-16 max-[900px]:pt-[45px] max-[540px]:pt-[35px]">
          <div className="hero-heading text-center relative z-4 [&>p]:text-[12px] [&>p]:leading-[1.9] [&>p]:mt-[23px] [&>p]:text-[#ffffffbb] max-[700px]:[&>p]:text-[11px] max-[540px]:[&>p]:text-[10px] max-[540px]:[&>p]:mt-5.5 max-[540px]:[&>p]:leading-[1.8]">
            <span className="hero-kicker inline-flex items-center gap-[7px] text-[10px] tracking-[1px] text-[#ffffffd6] mb-5 [&>span]:w-1.5 [&>span]:h-1.5 [&>span]:bg-lime [&>span]:rounded-[50%] max-[700px]:text-[9px] max-[540px]:text-[8px] max-[540px]:mb-4.5 max-[540px]:tracking-[0.45px]">
              <span /> A little curiosity. Endless possibilities.
            </span>
            <h1 className="font-heading">
              Get access to hundreds
              <br />
              of courses{' '}
              <span className="hero-highlight relative [&_svg]:absolute [&_svg]:left-0 [&_svg]:bottom-[-8px] [&_svg]:w-full [&_svg]:h-[15px] [&_svg]:[fill:none] [&_svg]:[stroke:var(--color-lime)] [&_svg]:[stroke-width:4] [&_svg]:[stroke-linecap:round] max-[540px]:[&_svg]:bottom-[-10px] max-[540px]:[&_svg]:[stroke-width:3]">
                available
                <svg viewBox="0 0 310 15" aria-hidden="true">
                  <path d="M3 10Q155 -5 306 9" />
                </svg>
              </span>
            </h1>
            <p>
              Big dreams start with a little learning. Discover your passion,
              <br className="desktop-break max-[540px]:hidden" /> build real skills, and make your
              next move with ByteSpace.
            </p>
            <SearchBox large />
            <div className="hero-popular flex items-center justify-center gap-[13px] mt-[13px] text-[9px] text-[#ffffff9e] [&_a]:text-white [&_a:hover]:text-lime max-[540px]:text-[8px] max-[540px]:gap-2.5">
              Popular:{' '}
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/courses?category=Design"
              >
                Design
              </Link>
              <span>·</span>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/courses?category=Development"
              >
                Development
              </Link>
              <span>·</span>
              <Link
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                href="/courses?category=Marketing"
              >
                Marketing
              </Link>
            </div>
          </div>
          <div className="hero-visual mx-auto relative w-[720px] max-w-full h-[355px] mt-[29px] mb-0 min-[1500px]:mt-[35px] min-[1500px]:h-[375px] max-[1100px]:h-85 max-[900px]:w-[620px] max-[700px]:w-[550px] max-[540px]:mt-[31px] max-[540px]:h-[313px]">
            <div className="hero-orbit w-[490px] h-[490px] bg-lime rounded-[50%] absolute left-1/2 top-[57px] [transform:translateX(-50%)] shadow-[0_0_90px_#d4fb2015] max-[900px]:w-[440px] max-[900px]:h-[440px] max-[700px]:w-100 max-[700px]:h-100 max-[540px]:w-82.5 max-[540px]:h-82.5 max-[540px]:top-12.5" />
            <div className="hero-portrait absolute w-87.5 h-95 left-1/2 bottom-0 [transform:translateX(-50%)] overflow-visible rounded-none shadow-none [&_img]:[object-position:center_bottom] [&_img]:object-contain [&_img]:[filter:drop-shadow(0_15px_15px_#00103b25)] min-[1500px]:h-[365px] min-[1500px]:w-[325px] max-[1100px]:h-82.5 max-[900px]:w-70 max-[700px]:w-62.5 max-[700px]:h-[315px] max-[540px]:h-71 max-[540px]:w-[215px]">
              <Image
                className="block max-w-full object-cover"
                src={portrait}
                alt="Creative learner ready to explore new possibilities"
                fill
                priority
                sizes="(max-width: 600px) 75vw, 430px"
              />
            </div>
            <div className="floating-card absolute bg-white text-foreground rounded-[10px] shadow-[0_14px_45px_#071c4220] z-3 hero-card-left p-[19px] w-47 left-[3%] top-9.5 [transform:rotate(-7deg)] animate-card-bob [&_strong]:block [&_strong]:text-[20px] [&_strong]:tracking-[-0.7px] [&_strong]:leading-[1.3] [&_strong]:mt-3 max-[900px]:p-[15px] max-[900px]:left-[4%] max-[900px]:w-40 max-[900px]:[&_strong]:text-[17px] max-[700px]:left-0 max-[700px]:w-[147px] max-[540px]:p-3 max-[540px]:left-[-4px] max-[540px]:top-[41px] max-[540px]:w-[115px] max-[540px]:rounded-[7px] max-[540px]:[&_strong]:text-[14px] max-[540px]:[&_strong]:mt-2.5">
              <span className="mini-label text-[7px] flex items-center gap-[5px] tracking-[0.4px] max-[540px]:text-[5px] max-[540px]:tracking-[0] max-[540px]:gap-[3px]">
                <span className="green-dot h-[5px] w-[5px] bg-[#b9e414] rounded-[50%] max-[540px]:w-1 max-[540px]:h-1" />{' '}
                YOUR NEXT CHAPTER
              </span>
              <strong>
                Small steps.
                <br />
                Big possibilities.
              </strong>
              <div className="card-scribble absolute right-[13px] top-[65px] text-[50px] leading-[1] text-blue [transform:rotate(10deg)] max-[540px]:text-[35px] max-[540px]:right-[7px] max-[540px]:top-13">
                ↗
              </div>
              <div className="mini-progress mx-0 h-[5px] rounded-[5px] bg-[#f0f1e8] mt-4 mb-[5px] overflow-hidden [&_span]:h-full [&_span]:w-[74%] [&_span]:block [&_span]:bg-lime max-[540px]:mx-0 max-[540px]:mt-3 max-[540px]:mb-[3px] max-[540px]:h-1">
                <span />
              </div>
              <span className="tiny text-[7px] text-muted-foreground max-[540px]:text-[5px]">
                Keep going. You’ve got this.
              </span>
            </div>
            <div className="floating-card absolute bg-white text-foreground rounded-[10px] shadow-[0_14px_45px_#071c4220] z-3 hero-card-right p-[17px] right-[1%] top-18.5 w-38.5 [transform:rotate(7deg)] animate-card-bob-reverse [&_strong]:block [&_strong]:text-[42px] [&_strong]:leading-[1.2] [&_strong]:tracking-[-2px] [&_strong]:mt-2.5 [&>span:last-child]:text-[9px] [&>span:last-child]:leading-[1.7] [&>span:last-child]:block [&>span:last-child]:text-muted-foreground [&>span:last-child]:mt-[5px] max-[900px]:right-[3%] max-[900px]:w-35 max-[700px]:p-[13px] max-[700px]:right-0 max-[700px]:w-31.5 max-[700px]:[&_strong]:text-[35px] max-[700px]:[&>span:last-child]:text-[8px] max-[540px]:p-3 max-[540px]:right-[-4px] max-[540px]:top-[79px] max-[540px]:w-26 max-[540px]:rounded-[7px] max-[540px]:[&_.mini-icon]:h-7 max-[540px]:[&_.mini-icon]:w-7 max-[540px]:[&_.mini-icon_svg]:w-4.5 max-[540px]:[&_strong]:text-[29px] max-[540px]:[&_strong]:tracking-[-1px] max-[540px]:[&_strong]:mt-[7px] max-[540px]:[&>span:last-child]:text-[6px]">
              <span className="mini-icon flex w-[37px] h-[37px] items-center justify-center bg-lime rounded-[50%] text-foreground">
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
            <div className="floating-card absolute bg-white text-foreground rounded-[10px] shadow-[0_14px_45px_#071c4220] z-3 hero-card-bottom px-4 py-[13px] left-[3%] bottom-[35px] flex items-center gap-2.5 [transform:rotate(3deg)] [&_strong]:block [&_strong]:text-[9px] [&_strong]:font-medium [&_strong]:mb-1 [&>div>span]:text-[7px] [&>div>span]:text-muted-foreground [&_.stars]:text-[#9dbc07] [&_.stars]:mr-[5px] max-[900px]:p-[11px] max-[900px]:left-[5%] max-[700px]:left-0 max-[700px]:bottom-6.5 max-[540px]:px-[11px] max-[540px]:py-2.5 max-[540px]:bottom-[23px] max-[540px]:left-0.5 max-[540px]:gap-[7px] max-[540px]:max-w-56 max-[540px]:rounded-[7px] max-[540px]:[&_strong]:text-[7px] max-[540px]:[&>div>span]:text-[5px] max-[540px]:[&_.avatar-stack_img]:w-6 max-[540px]:[&_.avatar-stack_img]:h-6">
              <Avatars />
              <div>
                <strong>Join 15,000+ curious minds</strong>
                <span>
                  <span className="stars text-blue tracking-[1px]">★★★★★</span> 4.9/5 from our
                  community
                </span>
              </div>
            </div>
            <div className="hand-note absolute right-0 bottom-[15px] [font-family:cursive] text-[16px] [transform:rotate(-8deg)] text-white [&_span]:text-[44px] [&_span]:block [&_span]:[transform:rotate(55deg)] [&_span]:ml-[15px] [&_span]:mt-[-10px] max-[900px]:right-[3%] max-[900px]:text-[12px] max-[700px]:right-0 max-[700px]:bottom-5 max-[700px]:text-[11px] max-[540px]:text-[9px] max-[540px]:bottom-1.5 max-[540px]:right-[-4px] max-[540px]:max-w-22.5 max-[540px]:[&_span]:text-[32px] max-[540px]:[&_span]:mt-0">
              Your future looks bright!<span>⤵</span>
            </div>
          </div>
        </div>
      </section>
      <PartnerMarquee />
      <section
        id="courses"
        className="section-space py-22.5 max-[900px]:py-[65px] max-[540px]:py-13 course-section max-[900px]:[&_.course-grid>div:nth-child(n_+_5)]:hidden max-[540px]:[&_.course-grid>div:nth-child(n_+_4)]:hidden max-[540px]:[&_.center-button]:mt-[27px]"
      >
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <Reveal className="section-heading mb-8.5 [&_h2]:text-[36px] [&_h2]:leading-[1.28] [&_h2]:tracking-[-1.4px] [&_h2]:font-semibold [&_p]:mt-4 [&_p]:text-muted-foreground [&_p]:text-[12px] [&_p]:leading-[1.9] max-[900px]:[&_h2]:text-[32px] max-[540px]:[&_h2]:text-[29px] max-[540px]:[&_h2]:tracking-[-1px] max-[540px]:[&_.eyebrow]:text-[8px] max-[540px]:[&_.eyebrow]:mb-3 max-[540px]:[&_p]:text-[10px] max-[540px]:[&_p]:mt-[13px] max-[540px]:mb-[25px] centered text-center">
            <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
              FOLLOW YOUR CURIOSITY
            </span>
            <h2 className="font-heading">
              Discover your passion.
              <br />
              Build your skills<span className="blue-dot text-blue">.</span>
            </h2>
            <p>
              Whether you’re finding your feet or taking a leap, there’s a course for you.
              <br className="desktop-break max-[540px]:hidden" /> Learn something you love. Create
              something that matters.
            </p>
          </Reveal>
          <HomeCourses />
        </div>
      </section>
      <section className="learning-paths px-0 pt-2.5 pb-20 [&_.section-heading_h2]:text-[26px] [&_.section-heading_h2]:tracking-[-0.8px] [&_.section-heading_p]:mt-[9px] max-[540px]:px-0 max-[540px]:pt-[5px] max-[540px]:pb-12.5 max-[540px]:[&_.section-heading_h2]:m-auto max-[540px]:[&_.section-heading_h2]:text-[23px] max-[540px]:[&_.section-heading_h2]:leading-[1.35] max-[540px]:[&_.section-heading_h2]:max-w-75">
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <Reveal className="section-heading mb-8.5 [&_h2]:text-[36px] [&_h2]:leading-[1.28] [&_h2]:tracking-[-1.4px] [&_h2]:font-semibold [&_p]:mt-4 [&_p]:text-muted-foreground [&_p]:text-[12px] [&_p]:leading-[1.9] max-[900px]:[&_h2]:text-[32px] max-[540px]:[&_h2]:text-[29px] max-[540px]:[&_h2]:tracking-[-1px] max-[540px]:[&_.eyebrow]:text-[8px] max-[540px]:[&_.eyebrow]:mb-3 max-[540px]:[&_p]:text-[10px] max-[540px]:[&_p]:mt-[13px] max-[540px]:mb-[25px] centered text-center">
            <h2 className="font-heading">Explore diverse learning paths at ByteSpace</h2>
            <p>One curious mind. So many directions to go.</p>
          </Reveal>
          <div className="path-grid grid grid-cols-6 gap-[15px] max-[900px]:gap-2.5 max-[700px]:grid-cols-3 max-[700px]:gap-3 max-[540px]:gap-[9px]">
            {[
              { name: 'Design', icon: Palette },
              { name: 'Development', icon: Code2 },
              { name: 'Marketing', icon: Megaphone },
              { name: 'Business', icon: BriefcaseBusiness },
              { name: 'Photography', icon: Camera },
              { name: 'Lifestyle', icon: Heart },
            ].map(({ name, icon: Icon }) => (
              <Link
                key={name}
                href={`/courses?category=${name}`}
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] path-card px-2.5 [border:1px_solid_var(--color-line)] rounded-[10px] pt-[23px] pb-[17px] text-center relative [&>span]:mx-auto [&>span]:grid [&>span]:place-items-center [&>span]:w-[45px] [&>span]:h-[45px] [&>span]:mt-0 [&>span]:mb-[13px] [&>span]:bg-[#eefdba] [&>span]:rounded-[50%] [&_h3]:text-[11px] [&_h3]:font-medium [&>svg]:absolute [&>svg]:right-[9px] [&>svg]:top-[9px] [&>svg]:opacity-0 [&>svg]:text-blue [&:hover]:border-[#c4dd77] [&:hover]:[transform:translateY(-4px)] [&:hover]:bg-[#fdfff6] [&:hover>svg]:opacity-100 max-[900px]:px-1.5 max-[900px]:pt-4.5 max-[900px]:pb-3.5 max-[900px]:[&_h3]:text-[9px] max-[900px]:[&>span]:w-[37px] max-[900px]:[&>span]:h-[37px] max-[700px]:px-2.5 max-[700px]:py-5 max-[700px]:[&_h3]:text-[11px] max-[540px]:[&_h3]:text-[9px] max-[540px]:px-[5px] max-[540px]:pt-4.5 max-[540px]:pb-[15px] max-[540px]:[&>span]:w-9.5 max-[540px]:[&>span]:h-9.5 max-[540px]:[&>span]:mb-2.5 max-[540px]:[&>span_svg]:w-5"
              >
                <span>
                  <Icon size={23} strokeWidth={1.6} />
                </span>
                <h3 className="font-heading">{name}</h3>
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="about"
        className="about-section px-0 pt-15 pb-[55px] [background:radial-gradient(ellipse_at_4%_5%,_#eeff9b88,_transparent_38%),_radial-gradient(ellipse_at_99%_90%,_#ccd8ff80,_transparent_38%),_#fafbfc] max-[700px]:py-[35px]"
      >
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <div className="feature-row py-7.5 grid grid-cols-[1fr_1fr] gap-[85px] items-center [&>*]:min-w-0 max-[700px]:[&.feature-row]:grid-cols-1 max-[1100px]:gap-10 max-[900px]:gap-[25px] max-[900px]:[&.reversed]:grid-cols-[0.9fr_1.1fr] max-[900px]:[&.reversed_.feature-art]:ml-[-60px] max-[700px]:px-0 max-[700px]:py-5 max-[700px]:grid-cols-1 max-[700px]:gap-2.5 max-[700px]:[&.reversed]:px-0 max-[700px]:[&.reversed]:py-5 max-[700px]:[&.reversed]:grid-cols-1 max-[700px]:[&.reversed]:gap-2.5 max-[700px]:[&.reversed]:mt-[25px] max-[700px]:[&.reversed_.feature-art]:mx-auto max-[700px]:[&.reversed_.feature-art]:my-0 max-[700px]:[&.reversed_.feature-art]:w-full max-[700px]:[&.reversed_.feature-art]:max-w-[420px] max-[700px]:[&.reversed_.feature-art]:h-90 max-[700px]:[&.reversed_.feature-art]:[scale:0.95] max-[700px]:[&.reversed_.feature-art]:order-2 max-[700px]:[&.reversed_.feature-copy]:order-1 max-[540px]:[&.reversed_.feature-art]:my-[-15px] max-[540px]:[&.reversed_.feature-art]:[scale:0.87]">
            <Reveal className="feature-copy [&_h2]:text-[33px] [&_h2]:leading-[1.28] [&_h2]:tracking-[-1.2px] [&_h2]:font-semibold [&>p]:mx-0 [&>p]:my-[19px] [&>p]:text-[12px] [&>p]:leading-[1.95] [&>p]:text-[#757b88] [&>p]:max-w-[430px] [&_.eyebrow]:text-[9px] [&_.eyebrow]:text-[#7a805f] max-[700px]:[&.feature-copy]:max-w-full max-[1100px]:[&_h2]:text-[29px] max-[900px]:[&_h2]:text-[26px] max-[900px]:[&>p]:text-[10px] max-[900px]:[&_.eyebrow]:text-[7px] max-[900px]:[&_.text-link]:text-[10px] max-[700px]:m-auto max-[700px]:max-w-[500px] max-[700px]:w-full max-[700px]:[&_h2]:text-[32px] max-[700px]:[&>p]:text-[12px] max-[700px]:[&_.eyebrow]:text-[9px] max-[700px]:[&_.text-link]:text-[12px] max-[540px]:[&_h2]:text-[29px] max-[540px]:[&>p]:text-[11px] max-[540px]:[&_.eyebrow]:text-[8px]">
              <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
                A FUTURE FULL OF POSSIBILITIES
              </span>
              <h2 className="font-heading">
                Your path to professional
                <br />
                growth starts here<span className="blue-dot text-blue">!</span>
              </h2>
              <p>
                Great things happen when you invest in yourself. Learn from people who love what
                they do, build skills that open doors, and take that next step with confidence.
              </p>
              <Link
                href="/courses"
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] text-link inline-flex items-center gap-[15px] text-blue text-[12px] font-medium bg-transparent [&:hover]:gap-[21px]"
              >
                Find your next step <ArrowUpRight size={18} />
              </Link>
              <div className="stats flex gap-[37px] mt-[35px] [&>div]:flex [&>div]:flex-col [&>div]:gap-[5px] [&_strong]:text-[30px] [&_strong]:leading-[1.3] [&_strong]:tracking-[-1px] [&_strong]:text-blue [&_strong]:font-medium [&>div>span]:text-[8px] [&>div>span]:text-[#818694] max-[1100px]:gap-[25px] max-[900px]:gap-5 max-[900px]:[&_strong]:text-[25px] max-[900px]:[&>div>span]:text-[7px] max-[700px]:[&_strong]:text-[30px] max-[700px]:[&>div>span]:text-[9px] max-[700px]:gap-[35px] max-[540px]:justify-between max-[540px]:gap-2.5 max-[540px]:mt-7 max-[540px]:[&_strong]:text-[28px] max-[540px]:[&>div>span]:text-[8px]">
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
            <Reveal className="feature-art relative h-90 [&>.spring]:right-[-20px] [&>.spring]:top-15 [&>.spring]:[scale:0.7] max-[700px]:[&.feature-art]:w-full max-[700px]:[&.feature-art]:max-w-[420px] max-[1100px]:[scale:0.9] max-[1100px]:[transform-origin:center] max-[900px]:mx-[-25px] max-[900px]:[scale:0.82] max-[900px]:h-87.5 max-[700px]:mx-auto max-[700px]:my-0 max-[700px]:w-full max-[700px]:max-w-[420px] max-[700px]:h-90 max-[700px]:[scale:0.95] max-[700px]:order-2 max-[540px]:my-[-15px] max-[540px]:[scale:0.87] max-[540px]:[&>.spring]:right-[-20px]">
              <div className="feature-circle absolute w-[285px] h-[285px] rounded-[50%] bg-[#e2f686] bottom-[7px] left-[65px] max-[540px]:left-10" />
              <div className="feature-person absolute w-[245px] h-87.5 left-[95px] bottom-0 overflow-visible rounded-none shadow-none [&_img]:[object-position:center_bottom] [&_img]:object-contain [&_img]:[filter:drop-shadow(0_16px_12px_#17232930)] max-[540px]:left-[75px]">
                <Image
                  className="block max-w-full object-cover"
                  src={portrait}
                  alt="A confident creative professional"
                  fill
                  sizes="(max-width: 700px) 80vw, 360px"
                />
              </div>
              <div className="floating-card absolute bg-white text-foreground rounded-[10px] shadow-[0_14px_45px_#071c4220] z-3 mini-course p-[7px] w-[155px] top-0 left-[7px] [transform:rotate(-6deg)] [&_img]:rounded-[5px] [&_img]:h-22.5 [&_strong]:mx-1 [&_strong]:text-[9px] [&_strong]:block [&_strong]:mt-2 [&_strong]:mb-[3px] [&>span]:mx-1 [&>span]:text-[8px] [&>span]:text-[#7c808b] [&>span]:block [&>span]:mt-0 [&>span]:mb-[5px]">
                <Image
                  className="block max-w-full object-cover"
                  src={photo('photo-1558655146-9f40138edfeb', 300)}
                  alt="Colorful design project"
                  width={180}
                  height={110}
                />
                <strong>Make your ideas happen.</strong>
                <span>Learn. Create. Grow.</span>
              </div>
              <div className="floating-card absolute bg-white text-foreground rounded-[10px] shadow-[0_14px_45px_#071c4220] z-3 confidence-card p-[15px] right-2 bottom-[61px] w-40 [transform:rotate(6deg)] [&_.mini-icon]:w-7.5 [&_.mini-icon]:h-7.5 [&_.mini-icon]:mb-2 [&_strong]:text-[10px] [&_strong]:block [&>span:last-child]:text-[9px] [&>span:last-child]:text-muted-foreground max-[540px]:right-[-15px]">
                <span className="mini-icon flex w-[37px] h-[37px] items-center justify-center bg-lime rounded-[50%] text-foreground">
                  <Star size={18} />
                </span>
                <strong>Big on possibilities.</strong>
                <span>Built around you.</span>
              </div>
              <Spring />
            </Reveal>
          </div>
          <div className="feature-row py-7.5 grid grid-cols-[1fr_1fr] gap-[85px] items-center [&>*]:min-w-0 max-[700px]:[&.feature-row]:grid-cols-1 max-[1100px]:gap-10 max-[900px]:gap-[25px] max-[900px]:[&.reversed]:grid-cols-[0.9fr_1.1fr] max-[900px]:[&.reversed_.feature-art]:ml-[-60px] max-[700px]:px-0 max-[700px]:py-5 max-[700px]:grid-cols-1 max-[700px]:gap-2.5 max-[700px]:[&.reversed]:px-0 max-[700px]:[&.reversed]:py-5 max-[700px]:[&.reversed]:grid-cols-1 max-[700px]:[&.reversed]:gap-2.5 max-[700px]:[&.reversed]:mt-[25px] max-[700px]:[&.reversed_.feature-art]:mx-auto max-[700px]:[&.reversed_.feature-art]:my-0 max-[700px]:[&.reversed_.feature-art]:w-full max-[700px]:[&.reversed_.feature-art]:max-w-[420px] max-[700px]:[&.reversed_.feature-art]:h-90 max-[700px]:[&.reversed_.feature-art]:[scale:0.95] max-[700px]:[&.reversed_.feature-art]:order-2 max-[700px]:[&.reversed_.feature-copy]:order-1 max-[540px]:[&.reversed_.feature-art]:my-[-15px] max-[540px]:[&.reversed_.feature-art]:[scale:0.87] reversed">
            <Reveal className="feature-art relative h-90 [&>.spring]:right-[-20px] [&>.spring]:top-15 [&>.spring]:[scale:0.7] max-[700px]:[&.feature-art]:w-full max-[700px]:[&.feature-art]:max-w-[420px] max-[1100px]:[scale:0.9] max-[1100px]:[transform-origin:center] max-[900px]:mx-[-25px] max-[900px]:[scale:0.82] max-[900px]:h-87.5 max-[700px]:mx-auto max-[700px]:my-0 max-[700px]:w-full max-[700px]:max-w-[420px] max-[700px]:h-90 max-[700px]:[scale:0.95] max-[700px]:order-2 max-[540px]:my-[-15px] max-[540px]:[scale:0.87] max-[540px]:[&>.spring]:right-[-20px] creator-art [&_.feature-circle]:bg-[#e2ebff] [&_.feature-person]:left-25 [&_.feature-person]:w-[245px] [&_.feature-person]:h-87.5 [&>.spring]:right-6.5 [&>.spring]:top-9 max-[540px]:[&_.feature-person]:left-[75px] max-[540px]:[&>.spring]:right-0">
              <div className="feature-circle absolute w-[285px] h-[285px] rounded-[50%] bg-[#e2f686] bottom-[7px] left-[65px] max-[540px]:left-10" />
              <div className="feature-person absolute w-[245px] h-87.5 left-[95px] bottom-0 overflow-visible rounded-none shadow-none [&_img]:[object-position:center_bottom] [&_img]:object-contain [&_img]:[filter:drop-shadow(0_16px_12px_#17232930)] max-[540px]:left-[75px]">
                <Image
                  className="block max-w-full object-cover"
                  src={portrait}
                  alt="ByteSpace course creator"
                  fill
                  sizes="(max-width: 700px) 80vw, 360px"
                />
              </div>
              <div className="creator-label p-4.5 absolute top-7.5 left-[5px] w-35.5 bg-blue text-white rounded-[6px] [transform:rotate(-6deg)] z-2 [&>span]:text-[7px] [&>span]:block [&>span]:opacity-70 [&>span]:mb-2 [&_strong]:text-[14px] [&_strong]:leading-[1.5] [&_strong]:block [&_svg]:mt-2.5 [&_svg]:text-lime">
                <span>Share what you know</span>
                <strong>
                  Your ideas.
                  <br />
                  Their inspiration.
                </strong>
                <ArrowUpRight size={23} />
              </div>
              <div className="floating-card absolute bg-white text-foreground rounded-[10px] shadow-[0_14px_45px_#071c4220] z-3 creator-community p-3 right-5 bottom-5.5 [transform:rotate(5deg)] [&_strong]:block [&_strong]:text-[8px] [&_strong]:font-medium [&_strong]:mt-2 max-[540px]:right-[-12px]">
                <Avatars />
                <strong>A community that grows with you.</strong>
              </div>
              <Spring />
            </Reveal>
            <Reveal className="feature-copy [&_h2]:text-[33px] [&_h2]:leading-[1.28] [&_h2]:tracking-[-1.2px] [&_h2]:font-semibold [&>p]:mx-0 [&>p]:my-[19px] [&>p]:text-[12px] [&>p]:leading-[1.95] [&>p]:text-[#757b88] [&>p]:max-w-[430px] [&_.eyebrow]:text-[9px] [&_.eyebrow]:text-[#7a805f] max-[700px]:[&.feature-copy]:max-w-full max-[1100px]:[&_h2]:text-[29px] max-[900px]:[&_h2]:text-[26px] max-[900px]:[&>p]:text-[10px] max-[900px]:[&_.eyebrow]:text-[7px] max-[900px]:[&_.text-link]:text-[10px] max-[700px]:m-auto max-[700px]:max-w-[500px] max-[700px]:w-full max-[700px]:[&_h2]:text-[32px] max-[700px]:[&>p]:text-[12px] max-[700px]:[&_.eyebrow]:text-[9px] max-[700px]:[&_.text-link]:text-[12px] max-[540px]:[&_h2]:text-[29px] max-[540px]:[&>p]:text-[11px] max-[540px]:[&_.eyebrow]:text-[8px]">
              <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
                MADE FOR THE KNOWLEDGE SHARERS
              </span>
              <h2 className="font-heading">
                Create & manage
                <br />
                courses easily<span className="blue-dot text-blue">.</span>
              </h2>
              <p>
                Your experience could be someone’s breakthrough. We make it simple to turn what you
                know into a course the world can learn from.
              </p>
              <ul className="check-list p-0 mx-0 list-none mt-5 mb-6 grid gap-2.5 [&_li]:flex [&_li]:gap-2 [&_li]:text-[10px] [&_li]:text-[#6a7283] [&_li]:items-center [&_svg]:text-blue [&_svg]:shrink-0 max-[900px]:[&_li]:text-[9px] max-[700px]:[&_li]:text-[11px] max-[540px]:[&_li]:text-[10px]">
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
              <Link
                href="/register?role=creator"
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] text-link inline-flex items-center gap-[15px] text-blue text-[12px] font-medium bg-transparent [&:hover]:gap-[21px]"
              >
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
