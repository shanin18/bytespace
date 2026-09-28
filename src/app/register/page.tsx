import { AuthForm } from '@/components/auth';
export const metadata = { title: 'Start your journey' };
export default async function Register({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; role?: string }>;
}) {
  const p = await searchParams;
  return <AuthForm mode="register" next={p.next} role={p.role} />;
}
