'use client';
import { Button } from '@/components/ui/button';

import { ArrowRight } from 'lucide-react';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="empty-state px-5 py-[65px] text-center text-muted-foreground [&>svg]:m-auto [&>svg]:text-[#a2b1d5] [&_h2]:mx-0 [&_h2]:text-[22px] [&_h2]:text-foreground [&_h2]:mt-5 [&_h2]:mb-2.5 [&_p]:text-[12px] [&_p]:leading-[1.8] [&_.button]:mt-5.5 site-container mx-auto w-[min(1120px,_calc(100%_-_80px))] max-[1100px]:w-[calc(100%_-_60px)] max-[900px]:w-[calc(100%_-_48px)] max-[540px]:w-[calc(100%_-_36px)]">
      <h1 className="font-heading">Let’s try that again.</h1>
      <p>Something didn’t load as expected. Give it another go.</p>
      <Button
        variant="lime"
        size="pill"
        onClick={reset}
        className="button [&.small]:px-[17px] [&.small]:py-[9px] [&.small]:min-h-9 [&.small]:gap-3.5 [&.small]:text-[11px] button-lime"
      >
        Try again
        <ArrowRight size={16} />
      </Button>
    </section>
  );
}
