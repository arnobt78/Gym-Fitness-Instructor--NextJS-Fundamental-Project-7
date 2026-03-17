import { Homepage } from '@/components/pages/Homepage';

/**
 * App Router page for "/" (home). This is a Server Component: no hooks or event handlers.
 * The main tag provides max-width and padding; all interactivity lives inside the client Homepage.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col text-sm sm:text-base w-full max-w-9xl mx-auto px-4 sm:px-6">
      <Homepage />
    </main>
  );
}
