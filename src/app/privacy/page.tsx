import { PageBanner } from '@/components/ui';
export const metadata = { title: 'Privacy' };
export default function Privacy() {
  return (
    <>
      <PageBanner title="Your privacy matters." eyebrow="CLEAR AND SIMPLE" />
      <article className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)] prose-page max-w-[760px] pt-15 pb-20 [&_h2]:mx-0 [&_h2]:text-[21px] [&_h2]:mt-7.5 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_p]:text-[12px] [&_p]:text-[#77808f] [&_p]:leading-[2] [&_p]:mb-[15px] [&_li]:text-[12px] [&_li]:text-[#77808f] [&_li]:leading-[2] [&_a]:text-blue max-[540px]:pt-10 max-[540px]:pb-[55px]">
        <h2 className="font-heading">About this demo</h2>
        <p>
          ByteSpace is a demonstration learning platform. Use test information rather than sensitive
          personal details. This page describes the demo’s data handling and is not a finalized
          production privacy policy.
        </p>
        <h2 className="font-heading">Information you provide</h2>
        <p>
          Account names, email addresses, password hashes, enrollment records, lesson progress,
          newsletter signups, and reviews are stored in a local data file on the application server.
          Passwords are salted and hashed. Your original password is not stored.
        </p>
        <h2 className="font-heading">Cookies and sessions</h2>
        <p>
          A necessary, HTTP-only session cookie keeps you signed in for up to seven days. Signing
          out removes your active session. The application does not include advertising cookies or
          analytics scripts.
        </p>
        <h2 className="font-heading">Images and video</h2>
        <p>
          Demo photographs were sourced from Unsplash, the learner portrait was generated, and the
          sample video is MDN’s CC0 flower video. These assets are served locally by this
          application; loading them does not request their original providers.
        </p>
        <h2 className="font-heading">Before launch</h2>
        <p>
          A public launch requires a production database, an account deletion process, a verified
          contact address, and a privacy policy reviewed for the actual business and its operating
          regions. Newsletter addresses are saved locally; no marketing emails are sent by this
          demo.
        </p>
      </article>
    </>
  );
}
