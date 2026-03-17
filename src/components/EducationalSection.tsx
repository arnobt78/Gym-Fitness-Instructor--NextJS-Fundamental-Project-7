'use client';

import { motion } from 'framer-motion';
import { Database, Layers, Box, Type, BookOpen } from 'lucide-react';

const concepts = [
  {
    title: 'React state',
    body: 'useState holds data that changes over time (e.g. selected muscles, workout type). When state updates, React re-renders the component.',
    icon: Database,
  },
  {
    title: 'Context API',
    body: 'WorkoutProvider wraps the app and shares workout state (poison, muscles, goal) with Hero, Generator, and Workout without prop drilling.',
    icon: Layers,
  },
  {
    title: 'Reusable components',
    body: 'Button, SectionWrapper, and ExerciseCard are used in multiple places. Props define their behavior and appearance.',
    icon: Box,
  },
  {
    title: 'TypeScript types',
    body: 'Types in @/types describe exercises, goals, and workout config. No any—safer refactors and better editor support.',
    icon: Type,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/**
 * Educational section for beginners: React and TypeScript concepts used in this app.
 */
export function EducationalSection() {
  return (
    <motion.section
      id="learn"
      className="min-h-screen flex flex-col gap-10 items-center justify-center py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-[800px] w-full mx-auto text-center">
        <BookOpen className="h-10 w-10 text-blue-400 mx-auto mb-2" aria-hidden />
        <motion.h2
          className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-blue-400 mb-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Learn the basics
        </motion.h2>
        <motion.p
          className="text-slate-400 text-sm sm:text-base mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          This app is built with React and Next.js. Here are the main ideas used in the codebase.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
        >
          {concepts.map((c) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                variants={item}
                className="p-4 rounded-lg bg-slate-950 border border-slate-700 hover:border-blue-500/50 transition-colors duration-200"
              >
                <Icon className="h-5 w-5 text-blue-400 mb-2" aria-hidden />
                <h3 className="font-medium text-white mb-1">{c.title}</h3>
                <p className="text-sm text-slate-400">{c.body}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
