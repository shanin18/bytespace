import { PageBanner } from '@/components/ui';
export const metadata = { title: 'Terms of service' };
export default function Terms() {
  return (
    <>
      <PageBanner title="A shared space for learning." eyebrow="A FEW THINGS TO KNOW" />
      <article className="container prose-page">
        <h2>Demonstration use</h2>
        <p>
          This ByteSpace build is a website demonstration. Course listings, prices, creator
          profiles, initial reviews, and learning materials are sample content. Enrollment is free
          and no payment is collected. These terms are draft demo copy, not a finalized agreement
          for a live business.
        </p>
        <h2>Your account</h2>
        <p>
          Keep your login details private, use test information, and choose a password you do not
          use elsewhere. You are responsible for the content you submit through your account.
        </p>
        <h2>A thoughtful community</h2>
        <p>
          Reviews should be relevant, respectful, and based on your experience. Do not submit
          abusive content, someone else’s personal information, or work you do not have permission
          to share.
        </p>
        <h2>Course access</h2>
        <p>
          Demo access includes sample video playback, a practice worksheet, and saved progress. It
          does not include accredited certification, purchased content, guaranteed availability, or
          live instructor support.
        </p>
        <h2>Before public release</h2>
        <p>
          Actual course ownership, payment and refund terms, intellectual property rights, support
          channels, and service policies must be finalized before accepting paying learners.
        </p>
      </article>
    </>
  );
}
