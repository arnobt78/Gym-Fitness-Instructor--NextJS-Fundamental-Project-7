"use client";

import { Fragment } from "react";
import {
  BicepsFlexed,
  Home,
  BookOpen,
  FlaskConical,
  Dumbbell,
} from "lucide-react";
import { RippleButton } from "@/components/ui/RippleButton";
import { Tooltip } from "@/components/ui/Tooltip";
import { useWorkout } from "@/context/WorkoutContext";

/* Nav items: anchor hashes for in-page sections (no separate routes). */
const links = [
  { href: "#", label: "Home", icon: Home },
  { href: "#learn", label: "Learn", icon: BookOpen },
  { href: "#generate", label: "Generate", icon: FlaskConical },
  { href: "#workout", label: "Workout", icon: Dumbbell },
];

/**
 * Sticky top navigation: brand link + section links (Home, Learn, Generate, Workout).
 * "Workout" is disabled with tooltip until a workout exists (hasWorkout); then it scrolls to #workout.
 */
export function Nav() {
  const { workout } = useWorkout();
  const hasWorkout = Boolean(workout && workout.length > 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/50 backdrop-blur-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
          <a
            href="#"
            className="flex items-center gap-2 font-heading font-semibold text-lg text-white"
          >
            <BicepsFlexed className="h-6 w-6 text-blue-400" aria-hidden />
            Swoley Fit
          </a>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {links.map(({ href, label, icon: Icon }) => {
              /* Workout link is only clickable after user has generated a workout. */
              const isWorkoutLink = href === "#workout";
              const disabled = isWorkoutLink && !hasWorkout;
              const btn = (
                <RippleButton
                  key={href}
                  type="button"
                  onClick={() => {
                    if (disabled) return;
                    if (typeof window !== "undefined")
                      window.location.href = href;
                  }}
                  disabled={disabled}
                  className={
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors " +
                    (disabled
                      ? "cursor-not-allowed opacity-60 text-slate-500 hover:bg-slate-800/50"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50")
                  }
                >
                  <Icon className="h-4 w-4" aria-hidden />
                  {label}
                </RippleButton>
              );
              /* When Workout is disabled, wrap in Tooltip so user sees why it's not clickable. */
              return isWorkoutLink && disabled ? (
                <Tooltip
                  key={href}
                  content="Generate a workout first (click Formulate & Get Sweaty)"
                  disabled
                >
                  {btn}
                </Tooltip>
              ) : (
                <Fragment key={href}>{btn}</Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
