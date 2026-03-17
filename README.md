# Gym Instructor - Next.js, React, TypeScript, TailwindCSS, Web Worker, Training Logic, Personalized Routines, Open Source Fitness Fundamental Project 7

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

A dynamic, web-based gym and fitness training application built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS**. It provides intelligent workout generation, exercise guidance, and personalized training plans using in-browser logic—no backend or API required. The app is designed both as a practical fitness tool and as an **educational codebase** for learning React fundamentals (state, context, reusable components), Next.js App Router, and TypeScript in a real project.

**Live Demo:** [https://swoley-fitness.vercel.app/](https://swoley-fitness.vercel.app/)

![Image](https://github.com/user-attachments/assets/ea1e8691-e079-428b-b08d-a1b8f0858c62)
![Image](https://github.com/user-attachments/assets/06a391d5-37ad-48b7-9949-17f3270f165d)
![Image](https://github.com/user-attachments/assets/fc92c6c7-4cc8-4c90-888c-c7569f2d5624)
![Image](https://github.com/user-attachments/assets/c64830b2-d895-4433-8ac9-069700b9f612)

## Table of Contents

1. [Introduction](#introduction)
2. [Project Features](#project-features)
3. [Technology Stack](#technology-stack)
4. [Project Structure](#project-structure)
5. [Routes & Pages](#routes--pages)
6. [Components Overview](#components-overview)
7. [State Management & Data Flow](#state-management--data-flow)
8. [Libraries & Dependencies](#libraries--dependencies)
9. [Environment Variables](#environment-variables)
10. [Installation & Running Locally](#installation--running-locally)
11. [How the Workout Logic Works](#how-the-workout-logic-works)
12. [Usage Walkthrough](#usage-walkthrough)
13. [Reusing Components in Other Projects](#reusing-components-in-other-projects)
14. [Keywords](#keywords)
15. [Conclusion](#conclusion)
16. [License](#license)

---

## Introduction

**Gym Instructor | Swoley Fit** is a single-page Next.js application that lets users generate custom gym workouts by choosing a **workout type** (e.g. Individual, Bro Split, Bodybuilder Split, Upper/Lower), **muscle groups**, and a **goal** (Strength & Power, Growth & Hypertrophy, or Cardiovascular Endurance). The app uses a typed exercise library and deterministic-but-varied logic to build a ready-to-follow plan with reps, rest, tempo, and exercise descriptions. It also includes an educational “Learn the basics” section that explains how the app is built (React state, Context API, TypeScript, etc.), making it suitable for **instruction and learning** as well as daily use.

---

## Project Features

- **Automatic Workout Generator:** Composes workouts from user-selected split, muscle groups, and goal. Uses a built-in exercise library and scheme-based rep/rest/tempo.
- **Customizable Training Objectives:** Strength & Power (low reps, longer rest), Growth & Hypertrophy (moderate reps), Cardiovascular Endurance (higher reps, shorter rest).
- **Rich Exercise Library:** Typed exercise data with descriptions, variants, and substitutes (in `src/data/swoldier.ts`).
- **Responsive UI:** Mobile-friendly layout with Tailwind CSS; sections reveal on scroll with Framer Motion.
- **Modern UX:** Ripple buttons, Lucide icons, scroll-triggered animations, tooltips for disabled states.
- **Educational Content:** “Learn the basics” section and inline comments for beginners.
- **No Backend Required:** All logic runs in the browser; no API or server-side workout generation.
- **Open Source:** Transparent logic and structure for learning and reuse.

---

## Technology Stack

| Layer      | Technology                              |
| ---------- | --------------------------------------- |
| Framework  | Next.js 16 (App Router)                 |
| UI         | React 19                                |
| Language   | TypeScript 5.7                          |
| Styling    | Tailwind CSS 3.4, PostCSS, Autoprefixer |
| Animation  | Framer Motion 11                        |
| Icons      | Lucide React                            |
| Linting    | ESLint 9 (eslint-config-next)           |
| Deployment | Vercel (recommended)                    |

There is **no separate backend or database**. Workout generation runs entirely in the client via `src/lib/workout.ts` and data from `src/data/swoldier.ts`.

---

## Project Structure

```bash
fitness-instructor/
├── public/
│   ├── favicon.ico          # App icon (used in metadata)
│   ├── hero2.webp            # Hero section image (optional)
│   └── hero4.png             # Alternative hero asset
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout, fonts, SEO metadata
│   │   ├── page.tsx          # Single route: renders Homepage
│   │   └── globals.css       # Tailwind base + global styles
│   ├── components/
│   │   ├── pages/
│   │   │   └── Homepage.tsx  # Client root: Nav, Hero, Learn, Generator, Workout, Footer
│   │   ├── Hero.tsx          # Hero section + CTA
│   │   ├── Nav.tsx           # Sticky nav with anchor links
│   │   ├── EducationalSection.tsx  # "Learn the basics" cards
│   │   ├── Generator.tsx     # Workout type, muscles, goal + Formulate
│   │   ├── Workout.tsx       # Generated exercise list + Copy / New workout
│   │   ├── ExerciseCard.tsx  # Single exercise card (sets, reps, rest, tempo)
│   │   ├── SectionWrapper.tsx # Reusable section layout (icon, title, children)
│   │   ├── Footer.tsx        # Footer with copyright
│   │   └── ui/
│   │       ├── Button.tsx    # Primary CTA button (ripple + disabled support)
│   │       ├── RippleButton.tsx  # Base ripple click effect
│   │       └── Tooltip.tsx   # Simple hover tooltip (e.g. for disabled Formulate)
│   ├── context/
│   │   └── WorkoutContext.tsx  # Global state: workout, poison, muscles, goal + actions
│   ├── hooks/
│   │   └── useWorkout.ts     # Re-export of useWorkout from context
│   ├── lib/
│   │   └── workout.ts        # generateWorkout(), flattening, shuffle, scheme application
│   ├── data/
│   │   └── swoldier.ts      # TEMPOS, SCHEMES, WORKOUTS, EXERCISES (typed)
│   └── types/
│       └── index.ts         # ExerciseBase, GeneratedExercise, GoalType, WorkoutTypeKey, etc.
├── eslint.config.mjs
├── next.config.ts
├── tailwind.config.js
├── postcss.config.cjs
├── tsconfig.json
├── package.json
└── README.md
```

- **`app/`:** Next.js App Router. Only one page route (`/`). No API routes.
- **`components/`:** All React UI. `pages/Homepage` composes the full client experience.
- **`context/`:** Workout state and actions shared across Generator, Workout, etc.
- **`lib/`:** Pure workout generation logic (no React).
- **`data/`:** Static exercise and scheme data.
- **`types/`:** Shared TypeScript types used by data, lib, and components.

---

## Routes & Pages

| Route | File           | Description                                                                                                    |
| ----- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| `/`   | `app/page.tsx` | Single page. Server-renders a shell; client renders `Homepage` (Nav, Hero, Learn, Generator, Workout, Footer). |

There are **no API routes** (`/api/*`). All interaction is client-side. In-app “routes” are **hash anchors**: `#`, `#learn`, `#generate`, `#workout` for smooth scroll and deep-linking without a backend.

---

## Components Overview

| Component              | Role                                                                                                                                                                                        | Reusable?                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Homepage**           | Client root; wraps everything in `WorkoutProvider` and renders Nav, Hero, EducationalSection, Generator, Workout, Footer.                                                                   | Yes, as a full page.                  |
| **Nav**                | Sticky top bar with brand and links to `#`, `#learn`, `#generate`, `#workout`.                                                                                                              | Yes; swap links and styles.           |
| **Hero**               | Headline, short intro, disclaimer, “Accept & Begin” CTA scrolling to `#generate`.                                                                                                           | Yes; change copy and CTA.             |
| **EducationalSection** | “Learn the basics” section with scroll-in cards (workout logic, React state, Context, components, TypeScript, Web Workers).                                                                 | Yes; replace card content.            |
| **Generator**          | Three blocks: (1) Pick your poison = workout type, (2) Lock on targets = muscle dropdown, (3) Become Juggernaut = goal. Formulate button calls `updateWorkout()` and scrolls to `#workout`. | Yes; keep or replace steps.           |
| **Workout**            | Shows generated list of `ExerciseCard`s; “Copy workout” and “New workout” (reset).                                                                                                          | Yes; adapt to different data shapes.  |
| **ExerciseCard**       | One exercise: name, type, muscles, description, reps/rest/tempo, sets completed (local state).                                                                                              | Yes; props = exercise object + index. |
| **SectionWrapper**     | Section with optional icon, header line, three-part title (middle word highlighted), and children.                                                                                          | Yes; use for any section.             |
| **Button**             | Primary CTA with optional icon and disabled state; uses RippleButton.                                                                                                                       | Yes.                                  |
| **RippleButton**       | Button with ripple-on-click effect; supports `disabled`.                                                                                                                                    | Yes; use anywhere.                    |
| **Tooltip**            | Wraps children; when `disabled` is true, shows tooltip on hover.                                                                                                                            | Yes.                                  |

---

## State Management & Data Flow

- **Context:** `WorkoutProvider` in `context/WorkoutContext.tsx` holds:
  - `workout`, `poison`, `muscles`, `goal`
  - `setWorkout`, `setPoison`, `setMuscles`, `setGoal`
  - `updateWorkout()` — calls `generateWorkout({ poison, muscles, goal })` from `lib/workout.ts`, then `setWorkout(result)` and scrolls to `#workout`.
  - `resetWorkout()` — clears workout and resets poison/muscles/goal.

- **Data flow:** User selects options in `Generator` → clicks Formulate → `updateWorkout()` runs → `generateWorkout()` in `lib/workout.ts` reads `WORKOUTS`, `EXERCISES`, `SCHEMES` from `data/swoldier.ts` and returns `GeneratedExercise[]` → context updates `workout` → `Workout` and `ExerciseCard`s re-render.

- **Hooks:** `useWorkout()` (from `context/WorkoutContext` or `hooks/useWorkout`) is used in Generator and Workout. No Redux or other global store.

---

## Libraries & Dependencies

- **next** – React framework with App Router, SSR, and file-based routing. This project uses one page (`app/page.tsx`) and no API routes.
- **react / react-dom** – UI library. Components are function components with hooks.
- **framer-motion** – Declarative animations: `motion.div`, `initial`/`animate`/`whileInView`, viewport options. Used in Hero, EducationalSection, Generator, SectionWrapper, ExerciseCard.
- **lucide-react** – Icon set (Dumbbell, Crosshair, Trophy, etc.). Used in Nav, Hero, Generator, Workout, EducationalSection.
- **tailwindcss** – Utility-first CSS. Classes in `className`; theme extended in `tailwind.config.js` (e.g. `max-w-9xl`, `font-heading`, `animate-ripple`).
- **typescript** – Typed codebase; shared types in `src/types/index.ts`.

Example of using context and generating a workout in a component:

```tsx
import { useWorkout } from "@/hooks/useWorkout";

function MyComponent() {
  const { poison, muscles, goal, updateWorkout } = useWorkout();
  // use poison, muscles, goal for UI; call updateWorkout() to generate and show result
}
```

---

## Environment Variables

**You do not need any environment variables to run this project.** All configuration is in code; the exercise data and logic are static and client-side.

If you later add optional features (e.g. analytics, feature flags), you can use a `.env.local` file (Next.js loads it automatically). Example (optional, not required for current features):

```env
# Optional: only if you add services that need them
# NEXT_PUBLIC_ANALYTICS_ID=
# NEXT_PUBLIC_APP_URL=https://swoley-fitness.vercel.app
```

Do **not** commit secrets. For Vercel, set env vars in the project dashboard if you add them.

---

## Installation & Running Locally

**Prerequisites:** Node.js (LTS recommended) and npm.

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd fitness-instructor
   npm install
   ```

2. **Development**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). You should see the single page with Hero, Learn, Generate, and Workout sections.

3. **Lint**

   ```bash
   npm run lint
   ```

4. **Production build**

   ```bash
   npm run build
   npm start
   ```

   Then open [http://localhost:3000](http://localhost:3000) again.

No `.env` or environment variables are required for these steps.

---

## How the Workout Logic Works

1. **Data sources** (`src/data/swoldier.ts`):
   - **WORKOUTS** – Defines workout types: `individual` (list of muscle groups), `bro_split`, `bodybuilder_split`, `upper_lower` (each mapping day names to muscle groups).
   - **SCHEMES** – Goal-based config: `strength_power`, `growth_hypertrophy`, `cardiovascular_endurance`. Each has `repRanges`, `ratio` (compound vs accessory sets), and `rest` times.
   - **EXERCISES** – Map of exercise keys to typed objects: type (compound/accessory), meta (environment, level, equipment), unit, muscles, description, variants, substitutes.
   - **TEMPOS** – List of tempo strings used when building a workout.

2. **Generation** (`src/lib/workout.ts`):
   - **Flatten:** Exercise variants are expanded so each variant is a separate logical “exercise” for selection.
   - **Filter:** Only exercises whose `meta.environment` is not `'home'` are used (configurable).
   - **Muscle list:** For `individual`, the list is the selected muscles; for splits, it’s the muscles for the selected day from `WORKOUTS[poison][muscles[0]]`.
   - **Shuffle:** Muscle list is shuffled (Fisher–Yates) for variety.
   - **Sets:** The scheme’s `ratio` defines how many compound vs accessory sets; each set is assigned a muscle from the shuffled list.
   - **Exercise selection:** For each set, an exercise of the right type (compound/accessory) and matching muscle is chosen from the flattened list, with rep range, rest, and tempo from the scheme. No duplicate exercise in the same workout.

3. **Output:** Array of `GeneratedExercise` (name, type, muscles, description, reps, rest, tempo, etc.) rendered by `Workout` and `ExerciseCard`.

---

## Usage Walkthrough

1. **Open the app** – [Live Demo](https://swoley-fitness.vercel.app/) or run locally with `npm run dev`.
2. **Scroll or use Nav** – Use “Home”, “Learn”, “Generate”, “Workout” to jump to sections.
3. **Pick your poison** – Choose workout type: Individual, Bro Split, Bodybuilder Split, or Upper/Lower.
4. **Lock on targets** – Open the dropdown and select one (or two for Individual) muscle groups.
5. **Become Juggernaut** – Choose goal: Strength Power, Growth Hypertrophy, or Cardiovascular Endurance.
6. **Formulate** – Button becomes clickable when all three are set. Click to generate; the view scrolls to the workout section.
7. **Workout section** – See exercise cards with name, muscles, description, reps, rest, tempo. Use “Sets completed” on a card to track sets (local state). Use “Copy workout” to copy a text summary; “New workout” to clear and reset choices.

---

## Reusing Components in Other Projects

- **RippleButton / Button:** Copy `src/components/ui/RippleButton.tsx` and `Button.tsx`; ensure Tailwind has the `ripple` keyframes/animation if you use the ripple. Use `RippleButton` for any clickable that should have the effect.
- **SectionWrapper:** Copy `SectionWrapper.tsx`; it only needs Framer Motion and Lucide types. Pass `id`, `header`, `title` (three-part array), optional `icon`, and `children`.
- **Tooltip:** Copy `Tooltip.tsx`; wrap any element and pass `content` and `disabled` (when `disabled` is true, hover shows the tooltip).
- **Context pattern:** Use `WorkoutProvider` + `useWorkout` as a reference for a small global state (workout, options, actions) without Redux.
- **Types:** Copy `src/types/index.ts` and trim to what you need; use the same shapes for your data and lib so components stay typed.

---

## Keywords

Gym workouts, fitness training, workout generator, Next.js, React, TypeScript, Tailwind CSS, personalized routines, exercise algorithms, open source fitness, Swoley Fit, gym instructor app, React state, Context API, Framer Motion, Lucide icons, single-page app, educational project, Vercel.

---

## Conclusion

This repo is both a **usable workout generator** and an **educational codebase** for learning Next.js (App Router, metadata, one page), React (state, context, hooks), TypeScript (types for exercises and goals), and Tailwind + Framer Motion. The workout logic lives in `lib/workout.ts` and data in `data/swoldier.ts`; there is no backend or API. You can extend exercises, add goals, or plug in a Web Worker for heavy computation if needed. Contributions and feedback are welcome.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.

---

## Happy Coding! 🎉

This is an **open-source project** — feel free to use, enhance, and extend it further!

If you have any questions or want to share your work, reach out via GitHub or my portfolio at [https://www.arnobmahmud.com](https://www.arnobmahmud.com).

**Enjoy building and learning!** 🚀

Thank you! 😊

---
