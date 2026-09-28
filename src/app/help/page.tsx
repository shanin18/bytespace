import { PageBanner } from '@/components/ui';
import Link from 'next/link';
export const metadata = { title: 'A little help' };
const faqs = [
  [
    'How do I start a course?',
    'Create an account, explore the course catalog, and choose Start learning on any course. Demo access is free, and no payment details are needed.',
  ],
  [
    'Can I learn at my own pace?',
    'Absolutely. Choose a lesson from the course outline, watch the sample video, and mark it complete. Your progress is saved to your account, so you can pick up where you left off.',
  ],
  [
    'Where are my courses?',
    'Log in and select My learning in the navigation. All your enrolled courses and their progress appear on your dashboard.',
  ],
  [
    'Are these the final course materials?',
    'This is a working website demo. Course videos, ratings, and sample testimonials are illustrative. Original videos, images, and teaching materials need to be supplied before a public launch.',
  ],
  [
    'Can I become a creator?',
    'You can create a creator account now. Course publishing, moderation, and creator payouts will need connected production services before launch.',
  ],
  [
    'What if I forget my password?',
    'Password recovery email is not connected in this demo. Use a test email and a password you can remember; do not reuse a password from another service. A production email provider is needed for password reset delivery.',
  ],
];
export default function Help() {
  return (
    <>
      <PageBanner eyebrow="WE’RE HERE TO HELP" title="A little guidance goes a long way." />
      <div className="container prose-page">
        {faqs.map(([q, a]) => (
          <details className="help-item" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
        <p className="mt-8">
          Ready to explore? <Link href="/courses">Find your next course →</Link>
        </p>
      </div>
    </>
  );
}
