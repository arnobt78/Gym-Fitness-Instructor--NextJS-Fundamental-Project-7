import { Homepage } from '@/components/pages/Homepage';

/**
 * Home page (SSR): no client state or event handlers here.
 * All interactive UI lives in client components (Homepage, Generator, etc.).
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col text-sm sm:text-base w-full max-w-9xl mx-auto px-4 sm:px-6">
      <Homepage />
    </main>
  );
}
