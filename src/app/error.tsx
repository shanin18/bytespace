'use client';
import { ArrowRight } from 'lucide-react';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="empty-state container">
      <h1>Let’s try that again.</h1>
      <p>Something didn’t load as expected. Give it another go.</p>
      <button onClick={reset} className="button button-lime">
        Try again
        <ArrowRight size={16} />
      </button>
    </section>
  );
}
