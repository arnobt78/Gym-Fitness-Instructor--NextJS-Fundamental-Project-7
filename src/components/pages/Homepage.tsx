'use client';

import { WorkoutProvider } from '@/context/WorkoutContext';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { EducationalSection } from '@/components/EducationalSection';
import { Generator } from '@/components/Generator';
import { Workout } from '@/components/Workout';
import { Footer } from '@/components/Footer';

/**
 * Client-side root for the home page. WorkoutProvider wraps the tree so Nav, Generator, and Workout
 * can read/update workout state via useWorkout(). Section order: Nav (sticky) → Hero → Learn →
 * Generator (form) → Workout (results) → Footer.
 */
export function Homepage() {
  return (
    <WorkoutProvider>
      <Nav />
      <Hero />
      <EducationalSection />
      <Generator />
      <Workout />
      <Footer />
    </WorkoutProvider>
  );
}
