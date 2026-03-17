"use client";

import { motion } from "framer-motion";
import { Database, Layers, Box, Type, BookOpen, Activity, Cpu } from "lucide-react";

const concepts = [
  {
    title: "How workouts are built",
    body: "You pick workout type (e.g. Individual or Bro Split), muscle groups, and a goal (Strength, Hypertrophy, or Endurance). The app filters exercises from a library, shuffles them, then assigns reps, rest, and tempo from preset schemes—so each plan is consistent but varied.",
    icon: Activity,
  },
  {
    title: "React state",
    body: "useState holds data that changes over time (e.g. selected muscles, workout type). When state updates, React re-renders the component.",
    icon: Database,
  },
  {
    title: "Context API",
    body: "WorkoutProvider wraps the app and shares workout state (poison, muscles, goal) with Hero, Generator, and Workout without prop drilling.",
    icon: Layers,
  },
  {
    title: "Reusable components",
    body: "Button, SectionWrapper, and ExerciseCard are used in multiple places. Props define their behavior and appearance.",
    icon: Box,
  },
  {
    title: "TypeScript types",
    body: "Types in @/types describe exercises, goals, and workout config. No any—safer refactors and better editor support.",
    icon: Type,
  },
  {
    title: "Web Workers",
    body: "A Web Worker runs JavaScript in a background thread so the main thread (and the UI) stays responsive. Use workers for heavy work like big data processing or crypto; this app keeps generation on the main thread since it's fast enough.",
    icon: Cpu,
  },
];

const viewportOpts = { once: true, margin: "-80px", amount: 0.2 };
const transitionSmooth = { type: "tween" as const, ease: [0.25, 0.46, 0.45, 0.94], duration: 0.6 };

/** Card entrance from one of four directions, alternating for parallax feel. */
function getCardVariants(index: number) {
  const dir = index % 4;
  const offset = 56;
  if (dir === 0) return { hidden: { opacity: 0, x: -offset }, show: { opacity: 1, x: 0 } };
  if (dir === 1) return { hidden: { opacity: 0, x: offset }, show: { opacity: 1, x: 0 } };
  if (dir === 2) return { hidden: { opacity: 0, y: offset }, show: { opacity: 1, y: 0 } };
  return { hidden: { opacity: 0, y: -offset }, show: { opacity: 1, y: 0 } };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/**
 * Educational section for beginners: React and TypeScript concepts used in this app.
 * Scroll-triggered entrances: header from top/left/bottom, cards from left/right/up/down.
 */
export function EducationalSection() {
  return (
    <motion.section
      id="learn"
      className="min-h-screen flex flex-col gap-10 items-center justify-center py-8 px-4 overflow-x-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOpts}
      transition={transitionSmooth}
    >
      <div className="max-w-9xl w-full mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOpts}
          transition={{ ...transitionSmooth, duration: 0.5 }}
        >
          <BookOpen
            className="h-10 w-10 text-blue-400 mx-auto mb-2"
            aria-hidden
          />
        </motion.div>
        <motion.h2
          className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-blue-400 mb-2"
          initial={{ opacity: 0, x: -48 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOpts}
          transition={{ ...transitionSmooth, delay: 0.08 }}
        >
          Learn the basics
        </motion.h2>
        <motion.p
          className="text-slate-400 text-sm sm:text-base mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOpts}
          transition={{ ...transitionSmooth, delay: 0.12, duration: 0.5 }}
        >
          This app builds your workout from your choices—no formulas or calorie
          math, just pick your split, muscles, and goal. Below are the React and
          TypeScript ideas used in the codebase.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
          transition={transitionSmooth}
        >
          {concepts.map((c, i) => {
            const Icon = c.icon;
            const cardVariants = getCardVariants(i);
            return (
              <motion.div
                key={c.title}
                variants={{
                  hidden: cardVariants.hidden,
                  show: {
                    ...cardVariants.show,
                    transition: { ...transitionSmooth, duration: 0.55 },
                  },
                }}
                className="p-4 sm:p-6 rounded-lg bg-slate-950 border border-slate-700 hover:border-blue-500/50 transition-colors duration-200"
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
