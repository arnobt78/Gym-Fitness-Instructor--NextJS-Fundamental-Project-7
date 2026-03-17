/**
 * Workout generation: pure functions only (no React). exercisesFlattener expands EXERCISES
 * variants into separate entries; generateWorkout filters by muscles/goal, builds set list from
 * scheme ratio, picks random compound/accessory exercises per set, assigns reps/rest/tempo.
 */

import { EXERCISES, SCHEMES, TEMPOS, WORKOUTS } from '@/data/swoldier';
import type {
  ExerciseBase,
  ExercisesMap,
  FlattenedExercise,
  GeneratedExercise,
  GenerateWorkoutInput,
  GoalType,
} from '@/types';

/** Flatten EXERCISES so each variant is a separate entry (used once per generateWorkout). */
function exercisesFlattener(exercisesObj: ExercisesMap): Record<string, FlattenedExercise> {
  const flattenedObj: Record<string, FlattenedExercise> = {};

  for (const [key, val] of Object.entries(exercisesObj)) {
    if (!('variants' in val) || !val.variants) {
      flattenedObj[key] = { ...val, substitutes: [...val.substitutes] };
      continue;
    }
    const variants = val.variants;
    for (const variant of Object.keys(variants)) {
      const variantName = variant + '_' + key;
      const variantSubstitutes = Object.keys(variants)
        .map((element) => element + ' ' + key)
        .filter((element) => element.replaceAll(' ', '_') !== variantName);
      flattenedObj[variantName] = {
        ...val,
        description: val.description + '___' + variants[variant],
        substitutes: [...val.substitutes, variantSubstitutes].slice(0, 5),
      };
    }
  }
  return flattenedObj;
}

/** Fisher–Yates shuffle. */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Generate a workout from selected muscles, workout type, and goal.
 * Uses flattened exercises (variants expanded) and filters out home-only exercises.
 */
export function generateWorkout(args: GenerateWorkoutInput): GeneratedExercise[] {
  const { muscles, poison: workout, goal } = args;
  const exercises = exercisesFlattener(EXERCISES);
  const exerKeys = Object.keys(exercises).filter(
    (key) => exercises[key].meta.environment !== 'home'
  );
  const includedTracker: string[] = [];
  let listOfMuscles: string[];

  if (workout === 'individual') {
    listOfMuscles = [...muscles];
  } else {
    const first = muscles[0];
    if (!first) return [];
    listOfMuscles = [...(WORKOUTS[workout]?.[first] ?? [])];
  }

  const listSet = new Set(shuffleArray(listOfMuscles));
  const arrOfMuscles = Array.from(listSet);
  const scheme: GoalType = goal;
  const ratio = SCHEMES[scheme].ratio;

  /* Build list of sets: each has setType (compound/accessory) and muscleGroup from ratio. */
  type SetSpec = { setType: 'compound' | 'accessory'; muscleGroup: string };
  const setTypes = ratio.flatMap((curr, index) =>
    Array.from({ length: Number(curr) }, () =>
      index === 0 ? ('compound' as const) : ('accessory' as const)
    )
  );
  const sets: SetSpec[] = setTypes.map((setType, index) => ({
    setType,
    muscleGroup:
      arrOfMuscles[index % arrOfMuscles.length] ?? arrOfMuscles[0] ?? '',
  }));

  /* Split flattened exercises into compound vs accessory, keeping only those that target selected muscles. */
  type ExByType = Record<string, ExerciseBase>;
  const { compound: compoundExercises, accessory: accessoryExercises } = exerKeys.reduce<{
    compound: ExByType;
    accessory: ExByType;
  }>(
    (acc, curr) => {
      const ex = exercises[curr];
      let exerciseHasRequiredMuscle = false;
      for (const musc of ex.muscles) {
        if (listSet.has(musc)) {
          exerciseHasRequiredMuscle = true;
          break;
        }
      }
      if (!exerciseHasRequiredMuscle) return acc;
      const typeKey = ex.type as 'compound' | 'accessory';
      return {
        ...acc,
        [typeKey]: { ...acc[typeKey], [curr]: ex },
      };
    },
    { compound: {}, accessory: {} }
  );

  const genWOD: GeneratedExercise[] = [];

  /* For each set: pick a random exercise of the right type and muscle, assign reps/rest/tempo from scheme, track used. */
  for (const { setType, muscleGroup } of sets) {
    const data = setType === 'compound' ? compoundExercises : accessoryExercises;
    const filteredObj: ExByType = {};
    for (const curr of Object.keys(data)) {
      if (includedTracker.includes(curr) || !data[curr].muscles.includes(muscleGroup)) continue;
      filteredObj[curr] = data[curr];
    }
    const filteredDataList = Object.keys(filteredObj);
    const oppData = setType === 'compound' ? accessoryExercises : compoundExercises;
    const filteredOppList = Object.keys(oppData).filter((val) => !includedTracker.includes(val));

    const randomExercise =
      filteredDataList[Math.floor(Math.random() * filteredDataList.length)] ??
      filteredOppList[Math.floor(Math.random() * filteredOppList.length)];

    if (!randomExercise) continue;

    const ex = exercises[randomExercise];
    const repRanges = SCHEMES[scheme].repRanges;
    let repsOrDuration: number =
      ex.unit === 'reps'
        ? Math.min(...repRanges) +
          Math.floor(Math.random() * (Math.max(...repRanges) - Math.min(...repRanges))) +
          (setType === 'accessory' ? 4 : 0)
        : Math.floor(Math.random() * 40) + 20;
    const tempo = TEMPOS[Math.floor(Math.random() * TEMPOS.length)] ?? '3 0 2';

    if (ex.unit === 'reps') {
      const tempoSum = tempo.split(' ').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
      if (tempoSum * repsOrDuration > 85) {
        repsOrDuration = Math.floor(85 / tempoSum);
      }
    } else {
      repsOrDuration = Math.ceil(repsOrDuration / 5) * 5;
    }
    includedTracker.push(randomExercise);

    const rest = SCHEMES[scheme].rest[setType === 'compound' ? 0 : 1];
    genWOD.push({
      ...ex,
      name: randomExercise,
      tempo,
      rest,
      reps: repsOrDuration,
    });
  }

  return genWOD.filter((element) => Object.keys(element).length > 0);
}
