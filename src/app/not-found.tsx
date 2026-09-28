import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound() {
  return (
    <section className="not-found px-0 text-center pt-[45px] pb-17.5 overflow-hidden relative [&_h1]:text-[32px] [&_h1]:font-medium [&_h1]:leading-[1.3] [&_h1]:tracking-[-1px] [&_p]:mx-0 [&_p]:text-[11px] [&_p]:text-[#c0d1fc] [&_p]:mt-[17px] [&_p]:mb-[25px] [&_.site-container]:relative [&_.site-container]:z-2 max-[540px]:[&_h1]:text-[27px] max-[540px]:[&_p]:text-[10px] grid-blue bg-blue [background-image:linear-gradient(#ffffff0b_1px,_transparent_1px),_linear-gradient(90deg,_#ffffff0b_1px,_transparent_1px)] [background-size:80px_80px] text-white [&_[data-slot='button']:focus-visible]:shadow-[0_0_0_3px_#ffffff70]">
      <div className="site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
        <div
          className="not-found-number text-[190px] leading-[1.15] tracking-[-15px] font-bold text-lime [text-shadow:4px_8px_0_#002aad] max-[540px]:text-[135px] max-[540px]:tracking-[-10px]"
          aria-hidden="true"
        >
          404
        </div>
        <h1 className="font-heading">
          The page you are looking
          <br />
          for doesn’t exist<span className="lime-text text-lime">.</span>
        </h1>
        <p>A little detour? Let’s get you back to discovering something great.</p>
        <Button
          size="pill"
          className="touch-manipulation [-webkit-tap-highlight-color:transparent] focus-visible:outline-[3px_solid_#87a6ff] focus-visible:outline-offset-[5px] button button-lime"
          asChild
          variant="lime"
        >
          <Link href="/">
            Back to home
            <ArrowUpRight size={16} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
