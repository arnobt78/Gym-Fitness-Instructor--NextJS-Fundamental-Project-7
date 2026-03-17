"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useWorkout } from "@/context/WorkoutContext";
import { SCHEMES, WORKOUTS } from "@/data/swoldier";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { RippleButton } from "@/components/ui/RippleButton";
import { Tooltip } from "@/components/ui/Tooltip";
import {
  Dumbbell,
  Crosshair,
  Trophy,
  ChevronDown,
  FlaskConical,
} from "lucide-react";
import type { GoalType, WorkoutTypeKey } from "@/types";

/* Framer Motion config: each block (01, 02, 03) animates in from bottom when it enters viewport. */
const scrollReveal = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px", amount: 0.2 },
  transition: { type: "tween" as const, ease: [0.25, 0.46, 0.45, 0.94], duration: 0.55 },
};

/* Reusable header for each step: number + icon + title + description. */
interface SectionHeaderProps {
  index: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

function SectionHeader({
  index,
  title,
  description,
  icon: Icon,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400" aria-hidden />
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">
          {index}
        </p>
        <h4 className="font-heading text-xl sm:text-2xl md:text-3xl">
          {title}
        </h4>
      </div>
      <p className="text-sm sm:text-base mx-auto">{description}</p>
    </div>
  );
}

/**
 * Generator section (id="generate"): three steps—workout type, muscle groups, goal—plus Formulate button.
 * Reads/writes poison, muscles, goal via useWorkout(); updateWorkout() runs lib/workout and sets workout in context.
 */
export function Generator() {
  const {
    muscles,
    setMuscles,
    poison,
    setPoison,
    goal,
    setGoal,
    updateWorkout,
  } = useWorkout();
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((prev) => !prev);
  }

  /* Toggle muscle in list; for non-individual splits only one muscle (day) is allowed; individual allows 1–2. */
  function updateMuscles(muscleGroup: string) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }
    if (muscles.length >= 2) return;
    if (poison !== "individual") {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }
    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 1) setShowModal(false);
  }

  const workoutKeys = Object.keys(WORKOUTS) as WorkoutTypeKey[];
  const schemeKeys = Object.keys(SCHEMES) as GoalType[];
  /* For individual: list of muscle names; for splits: keys of the chosen split (e.g. push, pull, legs). */
  const muscleOptions =
    poison === "individual"
      ? (WORKOUTS.individual as readonly string[])
      : Object.keys(WORKOUTS[poison] ?? {});

  return (
    <SectionWrapper
      id="generate"
      header="generate your workout"
      title={["It's", "Huge", "o'clock"]}
      icon={Dumbbell}
    >
      <motion.div
        className="flex flex-col gap-4"
        initial={scrollReveal.initial}
        whileInView={scrollReveal.whileInView}
        viewport={scrollReveal.viewport}
        transition={scrollReveal.transition}
      >
        <SectionHeader
          index="01"
          title="Pick your poison"
          description="Choose how you want to split your training: Individual (pick 1–2 muscle groups per session), Bro Split, Bodybuilder Split, or Upper/Lower. This sets how many exercises and which muscles appear in your plan."
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
                "border duration-200 px-4 hover:border-blue-600 py-3 rounded-lg " +
                (type === poison
                  ? " border-blue-600 bg-blue-950/60"
                  : " border-blue-400 bg-slate-950")
              }
            >
              <p className="capitalize">{type.replaceAll("_", " ")}</p>
            </RippleButton>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-4"
        initial={scrollReveal.initial}
        whileInView={scrollReveal.whileInView}
        viewport={scrollReveal.viewport}
        transition={scrollReveal.transition}
      >
        <SectionHeader
          index="02"
          title="Lock on targets"
        description="Pick which muscle groups to hit in this workout. For Individual you can select one or two; for splits you pick the day’s focus (e.g. Chest, Back). You’ll get exercises and sets tailored to your choices."
        icon={Crosshair}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col overflow-hidden">
        <RippleButton
          type="button"
          onClick={toggleModal}
          className="relative p-3 flex items-center justify-center w-full"
        >
          <p className="capitalize">
            {muscles.length === 0 ? "Select muscle groups" : muscles.join(" ")}
          </p>
          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
            aria-hidden
          />
        </RippleButton>
        {showModal && (
          <div className="flex flex-col px-0 pb-3">
            {muscleOptions.map((muscleGroup, idx) => (
              <div key={muscleGroup}>
                {idx > 0 && (
                  <div className="h-px w-full bg-slate-700" aria-hidden />
                )}
                <RippleButton
                  type="button"
                  onClick={() => updateMuscles(muscleGroup)}
                  className={
                    "w-full text-left px-4 py-3 rounded-none hover:bg-slate-800 hover:text-blue-400 duration-200 " +
                    (muscles.includes(muscleGroup)
                      ? " text-blue-400 bg-slate-800/50"
                      : "")
                  }
                >
                  <p className="uppercase">
                    {muscleGroup.replaceAll("_", " ")}
                  </p>
                </RippleButton>
              </div>
            ))}
          </div>
        )}
        </div>
      </motion.div>
      <motion.div
        className="flex flex-col gap-4"
        initial={scrollReveal.initial}
        whileInView={scrollReveal.whileInView}
        viewport={scrollReveal.viewport}
        transition={scrollReveal.transition}
      >
        <SectionHeader
        index="03"
        title="Become Juggernaut"
        description="Set your goal: Strength & Power (heavier, fewer reps), Growth & Hypertrophy (moderate reps for size), or Cardiovascular Endurance (higher reps, shorter rest). Rep ranges, rest, and tempo are tuned to this objective."
        icon={Trophy}
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {schemeKeys.map((scheme) => (
          <RippleButton
            type="button"
            key={scheme}
            onClick={() => setGoal(scheme)}
            className={
              "border duration-200 hover:border-blue-600 py-3 rounded-lg px-4 " +
              (scheme === goal
                ? " border-blue-600 bg-blue-950/60"
                : " border-blue-400 bg-slate-950")
            }
          >
            <p className="capitalize">{scheme.replaceAll("_", " ")}</p>
          </RippleButton>
        ))}
      </div>
      </motion.div>
      {/* Formulate disabled until all three steps are set; when disabled, hover shows tooltip. Scroll runs after 2 rAFs so #workout section exists in DOM. */}
      {(() => {
        const canFormulate = poison && muscles.length >= 1 && goal;
        const tooltipText = !poison
          ? "Select a workout type (Pick your poison) first."
          : muscles.length < 1
            ? "Select at least one muscle group (Lock on targets)."
            : !goal
              ? "Select your goal (Become Juggernaut) to generate."
              : "";
        const FormulateBtn = (
          <Button
            func={() => {
              if (!canFormulate) return;
              updateWorkout();
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  const el = document.getElementById("workout");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", "#workout");
                  }
                });
              });
            }}
            text="Formulate & Get Sweaty"
            icon={<FlaskConical className="h-5 w-5" aria-hidden />}
            disabled={!canFormulate}
          />
        );
        return canFormulate ? (
          FormulateBtn
        ) : (
          <Tooltip content={tooltipText} disabled>
            {FormulateBtn}
          </Tooltip>
        );
      })()}
    </SectionWrapper>
  );
}
