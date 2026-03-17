'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { generateWorkout } from '../lib/workout';
import type { GeneratedExercise, GoalType, WorkoutTypeKey } from '@/types';

interface WorkoutState {
  workout: GeneratedExercise[] | null;
  poison: WorkoutTypeKey;
  muscles: string[];
  goal: GoalType;
}

interface WorkoutContextValue extends WorkoutState {
  setPoison: (v: WorkoutTypeKey) => void;
  setMuscles: (v: string[] | ((prev: string[]) => string[])) => void;
  setGoal: (v: GoalType) => void;
  setWorkout: (v: GeneratedExercise[] | null) => void;
  updateWorkout: () => void;
  resetWorkout: () => void;
}

const WorkoutContext = createContext<WorkoutContextValue | null>(null);

const initialState: WorkoutState = {
  workout: null,
  poison: 'individual',
  muscles: [],
  goal: 'strength_power',
};

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [workout, setWorkout] = useState<GeneratedExercise[] | null>(initialState.workout);
  const [poison, setPoison] = useState<WorkoutTypeKey>(initialState.poison);
  const [muscles, setMuscles] = useState<string[]>(initialState.muscles);
  const [goal, setGoal] = useState<GoalType>(initialState.goal);

  const updateWorkout = useCallback(() => {
    if (muscles.length < 1) return;
    const newWorkout = generateWorkout({ poison, muscles, goal });
    setWorkout(newWorkout);
    if (typeof window !== 'undefined') {
      window.location.href = '#workout';
    }
  }, [poison, muscles, goal]);

  const resetWorkout = useCallback(() => {
    setWorkout(null);
    setMuscles([]);
    setPoison('individual');
    setGoal('strength_power');
  }, []);

  const value: WorkoutContextValue = {
    workout,
    poison,
    muscles,
    goal,
    setPoison,
    setMuscles,
    setGoal,
    setWorkout,
    updateWorkout,
    resetWorkout,
  };

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>;
}

export function useWorkout(): WorkoutContextValue {
  const ctx = useContext(WorkoutContext);
  if (!ctx) throw new Error('useWorkout must be used within WorkoutProvider');
  return ctx;
}
