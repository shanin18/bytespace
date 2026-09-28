import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import { currentUser } from '@/lib/store';
import { courses, lessonGroups } from '@/lib/courses';
import { CourseCard } from '@/components/ui';
import { Logout } from '@/components/learning';
export const metadata = { title: 'My learning' };
export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect('/login?next=/dashboard');
  const enrolled = courses.filter((c) => user.enrolled.includes(c.id));
  const count = lessonGroups.flatMap((g) => g.lessons).length;
  return (
    <>
      <section className="grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70] dashboard-banner px-0 py-[45px]">
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] dashboard-heading flex justify-between items-center gap-5 [&_h1]:text-[36px] [&_p]:text-[12px] [&_p]:text-[#c4d1f3] [&_p]:mt-3 max-[700px]:[&_h1]:text-[29px] max-[540px]:items-start max-[540px]:[&_h1]:text-[25px] max-[540px]:[&_p]:text-[10px] max-[540px]:[&_.button]:px-3.5 max-[540px]:[&_.button]:py-2.5 max-[540px]:[&_.button]:text-[9px] max-[540px]:[&_.button]:gap-[7px]">
          <div>
            <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
              YOUR VERY OWN SPACE TO GROW
            </span>
            <h1 className="font-heading">
              Hello, {user.name.split(' ')[0]}
              <span className="lime-text text-lime">.</span>
            </h1>
            <p>Big things happen one small step at a time. Ready for yours?</p>
          </div>
          <Logout />
        </div>
      </section>
      <section className="dashboard-section pt-[45px] pb-17.5 min-h-100 [&>.site-container>h2]:text-[24px] [&>.site-container>h2]:mb-[25px] max-[540px]:[&>.site-container>h2]:text-[22px]">
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <h2 className="font-heading">Your learning journey</h2>
          {enrolled.length ? (
            <div className="course-grid grid grid-cols-3 gap-[25px] [&>div]:h-full max-[900px]:grid-cols-2 max-[900px]:gap-5.5 max-[540px]:grid-cols-[1fr] max-[540px]:gap-5">
              {enrolled.map((c) => {
                const completed = (user.progress[c.id] || []).length;
                return (
                  <article
                    className="progress-course relative pb-[53px] [&_.course-card]:h-full"
                    key={c.id}
                  >
                    <CourseCard course={c} />
                    <div className="course-progress px-4.5 py-3 absolute bottom-0 left-0 right-0 [border:1px_solid_var(--color-line)] [border-top:0] rounded-[0_0_9px_9px] bg-[#f9fbf4] flex items-center gap-[15px] text-[9px] [&_a]:ml-auto [&_a]:text-blue [&_a]:font-medium">
                      <span>{Math.round((completed / count) * 100)}%</span>
                      <div className="progress-bar h-[5px] bg-[#e7eadd] flex-1 rounded-[3px] overflow-hidden [&_span]:block [&_span]:h-full [&_span]:bg-blue [&_span]:[transition:width_0.5s]">
                        <span style={{ width: (completed / count) * 100 + '%' }} />
                      </div>
                      <Link
                        className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
                        href={`/courses/${c.id}/learn`}
                      >
                        Continue learning ↗
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state px-5 py-[65px] text-center text-muted-foreground [&>svg]:m-auto [&>svg]:text-[#a2b1d5] [&_h2]:mx-0 [&_h2]:text-[22px] [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2.5 [&_p]:text-[12px] [&_p]:leading-[1.8] [&_.button]:mt-5.5">
              <BookOpen size={40} />
              <h2 className="font-heading">A blank page. Endless possibilities.</h2>
              <p>
                Your first course is waiting. Follow your curiosity and find something you love.
              </p>
              <Button
                size="pill"
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] button button-lime"
                asChild
                variant="lime"
              >
                <Link href="/courses">
                  Find your first course
                  <ArrowUpRight size={17} />
                </Link>
              </Button>
            </div>
          )}
          {user.role === 'creator' && (
            <div className="prose-page max-w-[760px] pt-15 pb-20 [&_h2]:mx-0 [&_h2]:text-[21px] [&_h2]:mt-7.5 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_p]:text-[12px] [&_p]:text-[#77808f] [&_p]:leading-[2] [&_p]:mb-[15px] [&_li]:text-[12px] [&_li]:text-[#77808f] [&_li]:leading-[2] [&_a]:text-blue max-[540px]:pt-10 max-[540px]:pb-[55px]">
              <h2 className="font-heading">Your creator journey starts here</h2>
              <p>
                Your creator account is ready. Course publishing and creator payouts need a
                connected content and payment service before launch. You can explore the learner
                experience and course layouts now.
              </p>
              <Link
                href="/creator"
                className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] text-link inline-flex items-center gap-[15px] text-blue text-[12px] font-medium bg-transparent [&:hover]:gap-[21px]"
              >
                Explore a creator profile
                <ArrowUpRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
