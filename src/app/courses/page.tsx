import { CourseCatalog } from '@/components/catalog';
export const metadata = { title: 'Explore courses' };
export default async function Courses({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const p = await searchParams;
  return <CourseCatalog initialQuery={p.q} initialCategory={p.category} />;
}
