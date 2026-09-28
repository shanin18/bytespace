import { PageBanner } from '@/components/ui';
export const metadata = { title: 'Terms of service' };
export default function Terms() {
  return (
    <>
      <PageBanner title="A shared space for learning." eyebrow="A FEW THINGS TO KNOW" />
      <article className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] prose-page max-w-[760px] pt-15 pb-20 [&_h2]:mx-0 [&_h2]:text-[21px] [&_h2]:mt-7.5 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_p]:text-[12px] [&_p]:text-[#77808f] [&_p]:leading-[2] [&_p]:mb-[15px] [&_li]:text-[12px] [&_li]:text-[#77808f] [&_li]:leading-[2] [&_a]:text-blue max-[540px]:pt-10 max-[540px]:pb-[55px]">
        <h2 className="font-heading">Demonstration use</h2>
        <p>
          This ByteSpace build is a website demonstration. Course listings, prices, creator
          profiles, initial reviews, and learning materials are sample content. Enrollment is free
          and no payment is collected. These terms are draft demo copy, not a finalized agreement
          for a live business.
        </p>
        <h2 className="font-heading">Your account</h2>
        <p>
          Keep your login details private, use test information, and choose a password you do not
          use elsewhere. You are responsible for the content you submit through your account.
        </p>
        <h2 className="font-heading">A thoughtful community</h2>
        <p>
          Reviews should be relevant, respectful, and based on your experience. Do not submit
          abusive content, someone else’s personal information, or work you do not have permission
          to share.
        </p>
        <h2 className="font-heading">Course access</h2>
        <p>
          Demo access includes sample video playback, a practice worksheet, and saved progress. It
          does not include accredited certification, purchased content, guaranteed availability, or
          live instructor support.
        </p>
        <h2 className="font-heading">Before public release</h2>
        <p>
          Actual course ownership, payment and refund terms, intellectual property rights, support
          channels, and service policies must be finalized before accepting paying learners.
        </p>
      </article>
    </>
  );
}
