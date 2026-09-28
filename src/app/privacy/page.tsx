import { PageBanner } from '@/components/ui';
export const metadata = { title: 'Privacy' };
export default function Privacy() {
  return (
    <>
      <PageBanner title="Your privacy matters." eyebrow="CLEAR AND SIMPLE" />
      <article className="container prose-page">
        <h2>About this demo</h2>
        <p>
          ByteSpace is a demonstration learning platform. Use test information rather than sensitive
          personal details. This page describes the demo’s data handling and is not a finalized
          production privacy policy.
        </p>
        <h2>Information you provide</h2>
        <p>
          Account names, email addresses, password hashes, enrollment records, lesson progress,
          newsletter signups, and reviews are stored in a local data file on the application server.
          Passwords are salted and hashed. Your original password is not stored.
        </p>
        <h2>Cookies and sessions</h2>
        <p>
          A necessary, HTTP-only session cookie keeps you signed in for up to seven days. Signing
          out removes your active session. The application does not include advertising cookies or
          analytics scripts.
        </p>
        <h2>Images and video</h2>
        <p>
          Demo photographs were sourced from Unsplash, the learner portrait was generated, and the
          sample video is MDN’s CC0 flower video. These assets are served locally by this
          application; loading them does not request their original providers.
        </p>
        <h2>Before launch</h2>
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
