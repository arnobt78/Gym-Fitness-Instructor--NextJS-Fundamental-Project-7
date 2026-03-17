import type { Metadata } from 'next';
import { Poppins, Outfit } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

const outfit = Outfit({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Swoley Fit – React & Next.js Workout Tutorial',
  description:
    'Learn React fundamentals: state, context, and reusable components. Generate gym workouts and explore TypeScript + Next.js.',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: 'Swoley Fit – React & Next.js Workout Tutorial',
    description: 'Learn React fundamentals with a workout generator.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${outfit.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased bg-gradient-to-r from-slate-800 to-slate-950 text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
