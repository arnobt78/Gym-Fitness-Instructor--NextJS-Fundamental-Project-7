/**
 * Shared TypeScript types for the fitness workout app.
 * Used by: src/data/swoldier.ts (EXERCISES, SCHEMES, WORKOUTS), src/lib/workout.ts (generateWorkout),
 * and components (Generator, Workout, ExerciseCard, context). Keeps data and UI contracts in sync.
 */

/** Exercise type: compound (multi-joint) or accessory (isolation). */
export type ExerciseType = 'compound' | 'accessory';

/** Environment where the exercise can be performed. */
export type ExerciseEnvironment = 'gym' | 'home' | 'gymhome';

/** Rep unit: reps (count) or duration (seconds). */
export type RepUnit = 'reps' | 'duration';

/** Metadata for an exercise (environment, level, equipment). */
export interface ExerciseMeta {
  environment: ExerciseEnvironment;
  level: [number, number, number];
  equipment: string[];
}

/** Base exercise definition from the data set (may include variants). */
export interface ExerciseBase {
  type: ExerciseType;
  meta: ExerciseMeta;
  unit: RepUnit;
  muscles: string[];
  description: string;
  substitutes: string[];
  variants?: Record<string, string>;
}

/** Flattened exercise (variant merged into description) used by the generator. */
export interface FlattenedExercise extends Omit<ExerciseBase, 'substitutes'> {
  description: string;
  substitutes: (string | string[])[];
}

/** Map of exercise key to base exercise (used for EXERCISES data). */
export type ExercisesMap = Record<string, ExerciseBase>;

/** Rest times in seconds: [compound, accessory]. */
export type RestTimes = [number, number];

/** Workout scheme (goal): rep ranges, ratio, rest. */
export interface WorkoutScheme {
  repRanges: [number, number];
  ratio: [number, number];
  rest: RestTimes;
}

/** Goal types for workout generation. */
export type GoalType = 'strength_power' | 'growth_hypertrophy' | 'cardiovascular_endurance';

/** Map of goal type to scheme. */
export type SchemesMap = Record<GoalType, WorkoutScheme>;

/** Workout type: individual muscles or a split. */
export type WorkoutTypeKey = 'individual' | 'bro_split' | 'bodybuilder_split' | 'upper_lower';

/** Individual workout: list of muscle groups. */
export type IndividualWorkout = readonly string[];

/** Split workout: map of split name to muscle groups. */
export type SplitWorkout = Record<string, string[]>;

/** Workouts config: individual array or split maps. */
export type WorkoutsMap = {
  individual: IndividualWorkout;
  bro_split: SplitWorkout;
  bodybuilder_split: SplitWorkout;
  upper_lower: SplitWorkout;
};

/** One generated exercise (with name, tempo, rest, reps). Spread from flattened exercise so substitutes may be (string | string)[]. */
export interface GeneratedExercise extends Omit<ExerciseBase, 'substitutes'> {
  name: string;
  tempo: string;
  rest: number;
  reps: number | string;
  substitutes: string[] | (string | string[])[];
}

/** Input for generateWorkout. */
export interface GenerateWorkoutInput {
  muscles: string[];
  poison: WorkoutTypeKey;
  goal: GoalType;
}
