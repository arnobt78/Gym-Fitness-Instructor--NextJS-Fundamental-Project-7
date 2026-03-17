'use client';

import { useState } from 'react';
import { useWorkout } from '@/context/WorkoutContext';
import { SCHEMES, WORKOUTS } from '@/data/swoldier';
import { SectionWrapper } from '@/components/SectionWrapper';
import { Button } from '@/components/Button';
import { RippleButton } from '@/components/ui/RippleButton';
import { Dumbbell, Crosshair, Trophy, ChevronDown, FlaskConical } from 'lucide-react';
import type { GoalType, WorkoutTypeKey } from '@/types';

interface SectionHeaderProps {
  index: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

function SectionHeader({ index, title, description, icon: Icon }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" aria-hidden />
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">{index}</p>
        <h4 className="font-heading text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

/**
 * Workout generator: workout type, muscle groups, goal. Uses WorkoutContext.
 */
export function Generator() {
  const { muscles, setMuscles, poison, setPoison, goal, setGoal, updateWorkout } = useWorkout();
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  function updateMuscles(muscleGroup: string) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }
    if (muscles.length >= 2) return;
    if (poison !== 'individual') {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }
    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 1) setShowModal(false);
  }

  const workoutKeys = Object.keys(WORKOUTS) as WorkoutTypeKey[];
  const schemeKeys = Object.keys(SCHEMES) as GoalType[];
  const muscleOptions =
    poison === 'individual'
      ? (WORKOUTS.individual as readonly string[])
      : Object.keys(WORKOUTS[poison] ?? {});

  return (
    <SectionWrapper
      id="generate"
      header="generate your workout"
      title={["It's", 'Huge', "o'clock"]}
      icon={Dumbbell}
    >
      <SectionHeader
        index="01"
        title="Pick your poison"
        description="Select the workout you wish to endure."
        icon={Dumbbell}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {workoutKeys.map((type) => (
          <RippleButton
            type="button"
            key={type}
            onClick={() => {
              setMuscles([]);
              setPoison(type);
            }}
            className={
              'bg-slate-950 border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg ' +
              (type === poison ? ' border-blue-600' : ' border-blue-400')
            }
          >
            <p className="capitalize">{type.replaceAll('_', ' ')}</p>
          </RippleButton>
        ))}
      </div>
      <SectionHeader
        index="02"
        title="Lock on targets"
        description="Select the muscles judged for annihilation."
        icon={Crosshair}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <RippleButton
          type="button"
          onClick={toggleModal}
          className="relative p-3 flex items-center justify-center w-full"
        >
          <p className="capitalize">
            {muscles.length === 0 ? 'Select muscle groups' : muscles.join(' ')}
          </p>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" aria-hidden />
        </RippleButton>
        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {muscleOptions.map((muscleGroup) => (
              <RippleButton
                type="button"
                key={muscleGroup}
                onClick={() => updateMuscles(muscleGroup)}
                className={
                  'hover:text-blue-400 duration-200 text-left ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : '')
                }
              >
                <p className="uppercase">{muscleGroup.replaceAll('_', ' ')}</p>
              </RippleButton>
            ))}
          </div>
        )}
      </div>
      <SectionHeader
        index="03"
        title="Become Juggernaut"
        description="Select your ultimate objective."
        icon={Trophy}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {schemeKeys.map((scheme) => (
          <RippleButton
            type="button"
            key={scheme}
            onClick={() => setGoal(scheme)}
            className={
              'bg-slate-950 border duration-200 hover:border-blue-600 py-3 rounded-lg px-4 ' +
              (scheme === goal ? ' border-blue-600' : ' border-blue-400')
            }
          >
            <p className="capitalize">{scheme.replaceAll('_', ' ')}</p>
          </RippleButton>
        ))}
      </div>
      <Button
        func={updateWorkout}
        text="Formulate"
        icon={<FlaskConical className="h-5 w-5" aria-hidden />}
      />
    </SectionWrapper>
  );
}
