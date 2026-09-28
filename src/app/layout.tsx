import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import { Header, Footer } from '@/components/ui';
import './globals.css';
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
    <html className="scroll-smooth scroll-pt-[30px] motion-reduce:scroll-auto" lang="en">
      <body
        className={[
          'm-0 bg-white text-foreground font-sans text-sm leading-normal antialiased selection:bg-lime selection:text-foreground motion-reduce:[&_*]:animate-none! motion-reduce:[&_*]:transition-none! motion-reduce:[&_*]:scroll-auto!',
          `${satoshi.variable} ${clashDisplay.variable} ${poppins.variable}`,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <a
          className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] skip-link p-[15px] fixed top-[-80px] left-5 z-1000 bg-lime rounded-[8px] [&:focus]:top-2.5"
          href="#main"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
