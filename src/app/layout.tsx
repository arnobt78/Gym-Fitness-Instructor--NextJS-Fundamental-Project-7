/**
 * Root layout (App Router): wraps every page. Loads fonts, global CSS, and SEO metadata.
 * This file is a Server Component by default; no "use client" here.
 */
import type { Metadata } from 'next';
import { Poppins, Outfit } from 'next/font/google';
import './globals.css';

/* Google Fonts: Poppins for body text, loaded at build time and exposed as CSS variable. */
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

/* Outfit for headings; used via font-heading in Tailwind (see tailwind.config.js). */
const outfit = Outfit({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const siteUrl = 'https://swoley-fitness.vercel.app';

/* SEO: title, description, keywords, author, Open Graph, Twitter card, robots, canonical URL. */
export const metadata: Metadata = {
  title: {
    default: 'Gym Instructor | Swoley Fit – Next.js Workout Generator & Tutorial',
    template: '%s | Gym Instructor | Swoley Fit',
  },
  description:
    'Dynamic gym and fitness training app: generate personalized workouts by choosing your split, muscle groups, and goal. Built with Next.js, React, TypeScript, and Tailwind. Learn React fundamentals—state, context, reusable components—with a real workout generator.',
  keywords: [
    'gym workouts',
    'fitness training',
    'workout generator',
    'Next.js',
    'React',
    'TypeScript',
    'TailwindCSS',
    'personalized routines',
    'exercise algorithms',
    'open source fitness',
    'Swoley Fit',
    'gym instructor app',
  ],
  authors: [
    { name: 'Arnob Mahmud', url: 'https://www.arnobmahmud.com' },
  ],
  creator: 'Arnob Mahmud',
  publisher: 'Arnob Mahmud',
  other: {
    'contact': 'contact@arnobmahmud.com',
  },
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'Gym Instructor | Swoley Fit – Next.js Workout Generator & Tutorial',
    description:
      'Generate personalized gym workouts with Next.js and React. Pick your split, muscles, and goal—get a ready-to-follow plan. Learn React fundamentals with a real app.',
    siteName: 'Gym Instructor | Swoley Fit',
    images: [{ url: '/favicon.ico', width: 32, height: 32, alt: 'Swoley Fit' }],
  },
  twitter: {
    card: 'summary',
    title: 'Gym Instructor | Swoley Fit – Next.js Workout Generator',
    description: 'Generate personalized gym workouts. Next.js, React, TypeScript. By Arnob Mahmud.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

/* Root layout component: html/body with font variables and smooth scroll. children = current page. */
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
