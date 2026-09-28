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
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] prose-page max-w-[760px] pt-15 pb-20 [&_h2]:mx-0 [&_h2]:text-[21px] [&_h2]:mt-7.5 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_p]:text-[12px] [&_p]:text-[#77808f] [&_p]:leading-[2] [&_p]:mb-[15px] [&_li]:text-[12px] [&_li]:text-[#77808f] [&_li]:leading-[2] [&_a]:text-blue max-[540px]:pt-10 max-[540px]:pb-[55px]">
        {faqs.map(([q, a]) => (
          <details
            className="help-item px-0 py-5 [border-bottom:1px_solid_var(--color-line)] [&_summary]:text-[14px] [&_summary]:font-medium [&_summary]:cursor-pointer [&_p]:pt-3.5"
            key={q}
          >
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
        <p className="mt-8">
          Ready to explore?{' '}
          <Link
            className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px]"
            href="/courses"
          >
            Find your next course →
          </Link>
        </p>
      </div>
    </>
  );
}
