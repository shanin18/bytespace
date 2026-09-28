import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { Header, Footer } from '@/components/ui';
import './globals.css';
import './controls.css';
const satoshi = localFont({
  src: './fonts/satoshi-variable.woff2',
  weight: '300 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-satoshi',
});
const clashDisplay = localFont({
  src: './fonts/clash-display-variable.woff2',
  weight: '200 700',
  style: 'normal',
  display: 'swap',
  variable: '--font-clash-display',
});
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
      <body className={`${satoshi.variable} ${clashDisplay.variable} ${poppins.variable}`}>
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
