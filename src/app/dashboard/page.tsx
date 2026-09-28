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
      <section className="grid-blue dashboard-banner">
        <div className="container dashboard-heading">
          <div>
            <span className="eyebrow">YOUR VERY OWN SPACE TO GROW</span>
            <h1>
              Hello, {user.name.split(' ')[0]}
              <span className="lime-text">.</span>
            </h1>
            <p>Big things happen one small step at a time. Ready for yours?</p>
          </div>
          <Logout />
        </div>
      </section>
      <section className="dashboard-section">
        <div className="container">
          <h2>Your learning journey</h2>
          {enrolled.length ? (
            <div className="course-grid">
              {enrolled.map((c) => {
                const completed = (user.progress[c.id] || []).length;
                return (
                  <article className="progress-course" key={c.id}>
                    <CourseCard course={c} />
                    <div className="course-progress">
                      <span>{Math.round((completed / count) * 100)}%</span>
                      <div className="progress-bar">
                        <span style={{ width: (completed / count) * 100 + '%' }} />
                      </div>
                      <Link href={`/courses/${c.id}/learn`}>Continue learning ↗</Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <BookOpen size={40} />
              <h2>A blank page. Endless possibilities.</h2>
              <p>
                Your first course is waiting. Follow your curiosity and find something you love.
              </p>
              <Button asChild variant="default">
                <Link href="/courses" className="button button-lime">
                  Find your first course
                  <ArrowUpRight size={17} />
                </Link>
              </Button>
            </div>
          )}
          {user.role === 'creator' && (
            <div className="prose-page">
              <h2>Your creator journey starts here</h2>
              <p>
                Your creator account is ready. Course publishing and creator payouts need a
                connected content and payment service before launch. You can explore the learner
                experience and course layouts now.
              </p>
              <Link href="/creator" className="text-link">
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
