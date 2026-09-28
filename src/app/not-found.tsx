import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
export default function NotFound() {
  return (
    <section className="not-found grid-blue">
      <div className="container">
        <div className="not-found-number" aria-hidden="true">
          404
        </div>
        <h1>
          The page you are looking
          <br />
          for doesn’t exist<span className="lime-text">.</span>
        </h1>
        <p>A little detour? Let’s get you back to discovering something great.</p>
        <Link href="/" className="button button-lime">
          Back to home
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </section>
  );
}
