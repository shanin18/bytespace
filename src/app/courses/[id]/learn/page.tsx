import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { courses } from '@/lib/courses';
import { currentUser } from '@/lib/store';
import { LessonPlayer } from '@/components/learning';
export const metadata = { title: 'Your learning space' };
export default async function Learn({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lesson?: string }>;
}) {
  const { id } = await params;
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();
  const user = await currentUser();
  if (!user) redirect('/login?next=' + encodeURIComponent(`/courses/${id}/learn`));
  if (!user.enrolled.includes(id)) redirect(`/courses/${id}`);
  const { lesson } = await searchParams;
  return (
    <>
      <section className="grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70] dashboard-banner px-0 py-[45px]">
        <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
          <nav className="breadcrumb flex gap-2.5 items-center text-[9px] text-[#b9cafa] mb-[25px] flex-wrap [&_a:hover]:text-lime max-[540px]:text-[8px] max-[540px]:gap-[7px]">
            <Link
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
              href="/dashboard"
            >
              My learning
            </Link>
            <span>/</span>
            <Link
              className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
              href={`/courses/${id}`}
            >
              {course.category}
            </Link>
          </nav>
          <div className="dashboard-heading flex justify-between items-center gap-5 [&_h1]:text-[36px] [&_p]:text-[12px] [&_p]:text-[#c4d1f3] [&_p]:mt-3 max-[700px]:[&_h1]:text-[29px] max-[540px]:items-start max-[540px]:[&_h1]:text-[25px] max-[540px]:[&_p]:text-[10px] max-[540px]:[&_.button]:px-3.5 max-[540px]:[&_.button]:py-2.5 max-[540px]:[&_.button]:text-[9px] max-[540px]:[&_.button]:gap-[7px]">
            <div>
              <span className="eyebrow block text-[10px] tracking-[1.7px] font-semibold mb-4">
                ONE STEP CLOSER TO YOUR NEXT BIG THING
              </span>
              <h1 className="font-heading">{course.title}</h1>
            </div>
          </div>
        </div>
      </section>
      <LessonPlayer
        course={course}
        initialProgress={user.progress[id] || []}
        initialLesson={Number.isFinite(Number(lesson)) ? Number(lesson) : 0}
      />
    </>
  );
}
