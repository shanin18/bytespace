import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Header, Footer } from '@/components/ui';
import './globals.css';
import './controls.css';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});
export const metadata: Metadata = {
  title: {
    default: 'ByteSpace — A little curiosity. Endless possibilities.',
    template: '%s | ByteSpace',
  },
  description:
    'Discover creative courses, learn from passionate experts, and turn your curiosity into your next big thing. Your learning journey starts at ByteSpace.',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
