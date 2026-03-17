'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ListOrdered, Target, Timer, CheckCircle } from 'lucide-react';
import { RippleButton } from '@/components/ui/RippleButton';
import type { GeneratedExercise } from '@/types';

interface ExerciseCardProps {
  exercise: GeneratedExercise;
  i: number;
}

/**
 * One exercise in the generated list: number, name, type, muscles, description (split by ___),
 * reps/rest/tempo boxes, and a "Sets completed" button (local state 0–5, cycles on click).
 */
export function ExerciseCard({ exercise, i }: ExerciseCardProps) {
  const [setsCompleted, setSetsComplete] = useState(0);

  /* Cycle 0 → 1 → … → 5 → 0 for demo/tracking; does not persist. */
  function handleSetIncrement() {
    setSetsComplete((prev) => (prev + 1) % 6);
  }

  const repsLabel = exercise.unit === 'reps' ? exercise.unit : 'duration';

  /* Staggered entrance: delay by index so cards appear in order. */
  return (
    <motion.div
      className="p-4 rounded-md flex flex-col gap-4 bg-slate-950 sm:flex-wrap"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: i * 0.05 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-4">
        <div className="flex items-center gap-2">
          <ListOrdered className="h-5 w-5 text-blue-400 shrink-0" aria-hidden />
          <h4 className="text-3xl hidden sm:inline sm:text-4xl md:text-5xl font-semibold text-slate-400">
            0{i + 1}
          </h4>
        </div>
        <h2 className="font-heading capitalize whitespace-nowrap truncate max-w-full text-lg sm:text-xl md:text-2xl flex-1 sm:text-center">
          {exercise.name.replaceAll('_', ' ')}
        </h2>
        <p className="text-sm text-slate-400 capitalize">{exercise.type}</p>
      </div>
      <div className="flex flex-col">
        <h3 className="flex items-center gap-1.5 text-slate-400 text-sm">
          <Target className="h-4 w-4" aria-hidden />
          Muscle Groups
        </h3>
        <p className="capitalize">{exercise.muscles.join(' & ')}</p>
      </div>
      {/* Description may contain ___ as separator (from data variants); each part on its own line. */}
      <div className="flex flex-col bg-slate-950 rounded gap-2">
        {exercise.description.split('___').map((val, idx) => (
          <div key={idx} className="text-sm">
            {val}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 sm:place-items-center gap-2">
        <div className="flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full">
          <h3 className="flex items-center gap-1 capitalize text-slate-400 text-sm">
            <Timer className="h-4 w-4" aria-hidden />
            {repsLabel}
          </h3>
          <p className="font-medium">{String(exercise.reps)}</p>
        </div>
        <div className="flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full">
          <h3 className="flex items-center gap-1 capitalize text-slate-400 text-sm">
            <Timer className="h-4 w-4" aria-hidden />
            rest
          </h3>
          <p className="font-medium">{exercise.rest}</p>
        </div>
        <div className="flex flex-col p-2 rounded border-[1.5px] border-solid border-slate-900 w-full">
          <h3 className="flex items-center gap-1 capitalize text-slate-400 text-sm">
            <Timer className="h-4 w-4" aria-hidden />
            tempo
          </h3>
          <p className="font-medium">{exercise.tempo}</p>
        </div>
        <RippleButton
          type="button"
          onClick={handleSetIncrement}
          className="flex flex-col items-center p-2 rounded border-[1.5px] duration-200 border-solid border-blue-900 hover:border-blue-600 w-full"
        >
          <h3 className="flex items-center gap-1 text-slate-400 text-sm capitalize">
            <CheckCircle className="h-4 w-4" aria-hidden />
            Sets completed
          </h3>
          <p className="font-medium">{setsCompleted} / 5</p>
        </RippleButton>
      </div>
    </motion.div>
  );
}
