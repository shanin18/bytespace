import { notFound } from 'next/navigation';
import { courses } from '@/lib/courses';
import { CourseDetail } from '@/components/course-detail';
export function generateStaticParams() {
  return courses.map((c) => ({ id: c.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: courses.find((c) => c.id === id)?.title || 'Course not found' };
}
export default async function Detail({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const [{ id }, { tab }] = await Promise.all([params, searchParams]);
  const course = courses.find((c) => c.id === id);
  if (!course) notFound();
  return (
    <CourseDetail
      course={course}
      initialTab={['overview', 'lessons', 'reviews'].includes(tab || '') ? tab : 'overview'}
    />
  );
}
