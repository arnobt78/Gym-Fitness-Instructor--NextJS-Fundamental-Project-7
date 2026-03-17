/**
 * Re-exports useWorkout from WorkoutContext so components can import from @/hooks/useWorkout
 * instead of reaching into context directly. Use wherever you need workout, poison, muscles, goal, or updateWorkout/resetWorkout.
 */
export { useWorkout } from '@/context/WorkoutContext';
