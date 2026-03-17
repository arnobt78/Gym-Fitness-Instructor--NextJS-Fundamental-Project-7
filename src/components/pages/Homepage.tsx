'use client';

import { WorkoutProvider } from '@/context/WorkoutContext';
import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { EducationalSection } from '@/components/EducationalSection';
import { Generator } from '@/components/Generator';
import { Workout } from '@/components/Workout';
import { Footer } from '@/components/Footer';

/**
 * Client root: holds workout state via context and renders Nav, Hero, Learn, Generator, Workout, Footer.
 * All CSR (state, events) lives here and in child components.
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
