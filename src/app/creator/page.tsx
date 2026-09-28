import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Star, Users, BookOpen, ArrowUpRight } from 'lucide-react';
import { courses, avatars } from '@/lib/courses';
import { CourseCatalog } from '@/components/catalog';
export const metadata = { title: 'Meet your creators' };
export default function Creator() {
  return (
    <>
      <section className="page-banner px-0 py-15 text-center [&_h1]:font-semibold [&_h1]:tracking-[-1.5px] [&_h1]:leading-[1.3] [&_p]:text-[#c3d1fa] [&_p]:mt-[15px] [&_.eyebrow]:text-[#bed0ff] max-[540px]:px-0 max-[540px]:py-10 max-[540px]:[&_.eyebrow]:tracking-[1px] grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70] creator-banner px-0 text-left pt-[45px] pb-12.5">
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <div className="creator-profile flex gap-[25px] items-center max-w-[780px] [&>img]:w-22.5 [&>img]:h-22.5 [&>img]:rounded-[15px] [&>img]:[border:4px_solid_#ffffff20] [&_h1]:text-[29px] [&_p]:text-[11px] [&_p]:leading-[1.9] [&_.eyebrow]:mb-[9px] [&_.detail-rating]:mt-3.5 max-[700px]:gap-5 max-[700px]:[&>img]:h-[75px] max-[700px]:[&>img]:w-[75px] max-[700px]:[&_h1]:text-[25px] max-[700px]:[&_.detail-rating]:gap-3 max-[700px]:[&_.detail-rating]:text-[8px] max-[540px]:items-start max-[540px]:gap-[15px] max-[540px]:[&>img]:h-15 max-[540px]:[&>img]:w-15 max-[540px]:[&>img]:rounded-[10px] max-[540px]:[&_h1]:text-[23px] max-[540px]:[&_.eyebrow]:text-[6px] max-[540px]:[&_.eyebrow]:tracking-[0.8px] max-[540px]:[&_p]:text-[9px] max-[540px]:[&_.detail-rating]:gap-[9px] max-[540px]:[&_.detail-rating]:text-[7px]">
            <Image
              className="block max-w-full object-cover"
              src={avatars[0]}
              alt="Alex Morgan"
              width={90}
              height={90}
            />
            <div>
              <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
                PASSIONATE PEOPLE. PRACTICAL KNOWLEDGE.
              </span>
              <h1 className="font-heading">
                PixelPerfect Studio <BadgeCheck size={22} className="inline text-lime" />
              </h1>
              <p>
                We’re a small team of designers, makers, and lifelong learners. Sharing what we
                know, so you can make what’s next.
              </p>
              <div className="detail-rating flex gap-5 mt-[17px] text-[9px] [&>span]:flex [&>span]:items-center [&>span]:gap-[5px] [&>span:first-child_svg]:text-lime [&>span>span]:text-[#c3d1f8] max-[540px]:gap-[11px] max-[540px]:flex-wrap max-[540px]:text-[8px] max-[540px]:[&_svg]:w-3">
                <span>
                  <Star size={14} fill="currentColor" />
                  4.9 instructor rating
                </span>
                <span>
                  <Users size={14} />
                  15k+ learners
                </span>
                <span>
                  <BookOpen size={14} />
                  {courses.length} courses
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] profile-about pt-[35px] pb-[5px] flex items-center gap-12.5 [&_h2]:text-[18px] [&_h2]:whitespace-nowrap [&_p]:text-muted-foreground [&_p]:text-[11px] [&_p]:leading-[1.9] max-[700px]:block max-[700px]:[&_h2]:mb-3">
        <h2 className="font-heading">A little about us</h2>
        <p>
          Good design starts with curiosity. Our courses bring real-world experience, a hands-on
          approach, and a healthy dose of creative exploration. Whether you’re making your first
          project or finding your own style, there’s a place for you here.
        </p>
        <Link
          href="/register?role=creator"
          className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] text-link inline-flex items-center gap-[15px] text-blue text-[12px] font-medium bg-transparent [&:hover]:gap-[21px] whitespace-nowrap"
        >
          Teach with us
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="creator-catalog [&_.search-banner]:hidden [&_.catalog]:pt-7.5">
        <CourseCatalog />
      </div>
    </>
  );
}
