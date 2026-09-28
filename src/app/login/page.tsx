import { AuthForm } from '@/components/auth';
export const metadata = { title: 'Welcome back' };
export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const p = await searchParams;
  return <AuthForm mode="login" next={p.next} />;
}
