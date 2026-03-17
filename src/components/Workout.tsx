'use client';

import { useCallback, useState } from 'react';
import { Copy, RotateCcw, Flame, Check } from 'lucide-react';
import { useWorkout } from '@/context/WorkoutContext';
import { SectionWrapper } from '@/components/SectionWrapper';
import { ExerciseCard } from '@/components/ExerciseCard';
import { RippleButton } from '@/components/ui/RippleButton';

/**
 * Workout section: only rendered when workout is non-null. Lists generated exercises.
 * Copy to clipboard and Reset workout actions.
 */
export function Workout() {
  const { workout, resetWorkout } = useWorkout();
  const [copied, setCopied] = useState(false);

  const copyWorkout = useCallback(() => {
    if (!workout || workout.length === 0) return;
    const text = workout
      .map(
        (ex, i) =>
          `${i + 1}. ${ex.name.replaceAll('_', ' ')} – ${ex.unit}: ${ex.reps}${ex.unit === 'duration' ? 's' : ''} | rest: ${ex.rest}s | tempo: ${ex.tempo}`
      )
      .join('\n');
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [workout]);

  if (!workout || workout.length === 0) return null;

  return (
    <SectionWrapper id="workout" header="welcome to" title={['The', 'DANGER', 'zone']} icon={Flame}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 mb-4">
        <RippleButton
          type="button"
          onClick={copyWorkout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 hover:border-blue-500 text-sm font-medium transition-colors"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied ? 'Copied!' : 'Copy workout'}
        </RippleButton>
        <RippleButton
          type="button"
          onClick={resetWorkout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 border border-slate-600 hover:border-blue-500 text-sm font-medium transition-colors"
        >
          <RotateCcw className="h-4 w-4" />
          New workout
        </RippleButton>
      </div>
      <div className="flex flex-col gap-4">
        {workout.map((exercise, i) => (
          <ExerciseCard key={i} i={i} exercise={exercise} />
        ))}
      </div>
    </SectionWrapper>
  );
}
