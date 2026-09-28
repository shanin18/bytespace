import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, Star, Users, BookOpen, ArrowUpRight } from 'lucide-react';
import { courses, avatars } from '@/lib/courses';
import { CourseCatalog } from '@/components/catalog';
export const metadata = { title: 'Meet your creators' };
export default function Creator() {
  return (
    <>
      <section className="page-banner grid-blue creator-banner">
        <div className="container">
          <div className="creator-profile">
            <Image src={avatars[0]} alt="Alex Morgan" width={90} height={90} />
            <div>
              <span className="eyebrow">PASSIONATE PEOPLE. PRACTICAL KNOWLEDGE.</span>
              <h1>
                PixelPerfect Studio <BadgeCheck size={22} className="inline text-lime" />
              </h1>
              <p>
                We’re a small team of designers, makers, and lifelong learners. Sharing what we
                know, so you can make what’s next.
              </p>
              <div className="detail-rating">
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
      <div className="container profile-about">
        <h2>A little about us</h2>
        <p>
          Good design starts with curiosity. Our courses bring real-world experience, a hands-on
          approach, and a healthy dose of creative exploration. Whether you’re making your first
          project or finding your own style, there’s a place for you here.
        </p>
        <Link href="/register?role=creator" className="text-link whitespace-nowrap">
          Teach with us
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="creator-catalog">
        <CourseCatalog />
      </div>
    </>
  );
}
