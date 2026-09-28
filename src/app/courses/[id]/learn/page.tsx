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
      <section className="grid-blue dashboard-banner">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/dashboard">My learning</Link>
            <span>/</span>
            <Link href={`/courses/${id}`}>{course.category}</Link>
          </nav>
          <div className="dashboard-heading">
            <div>
              <span className="eyebrow">ONE STEP CLOSER TO YOUR NEXT BIG THING</span>
              <h1>{course.title}</h1>
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
