# Ripple / “Stone in Water” Button Click Effect

This guide documents the **wave circle** click effect (like a stone dropped in water) used on the **Download Reports** button in the header, and how to reuse it in other projects—with **MUI** or with **plain React + CSS + Tailwind**.

---

## What You See

- On click, a **circular wave** expands from the click position inside the button.
- The wave is a semi-transparent “blup” that grows and fades within the button background.
- The effect is smooth and stays contained inside the button.

---

## Option 1: Using Material-UI (MUI) — Current Project

The current **Download Reports** button uses MUI’s `Button`, which has a **built-in ripple** (TouchRipple). No extra code is needed for the wave.

### 1.1 Ensure ripple is enabled

MUI `Button` has `disableRipple={false}` by default. Do **not** set `disableRipple={true}` if you want the effect.

### 1.2 Button code (same as Header)

```tsx
import { Button } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

<Button
  sx={{
    bgcolor: "var(--token-blueAccent-700)",
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: 700,
    py: 1.25,
    px: 2,
    "&:hover": {
      bgcolor: "var(--token-blueAccent-600)",
      color: "rgba(255,255,255,0.9)",
    },
  }}
>
  <DownloadOutlinedIcon sx={{ mr: 1.25, fontSize: 20, color: "rgba(255,255,255,0.8)" }} />
  Download Reports
</Button>
```

### 1.3 Optional: Tailwind-style layout around the button

If you wrap the button in a flex container and want the same spacing as the header:

```tsx
<div className="mb-[30px] flex justify-between items-start">
  <div>
    <h2 className="text-token-grey-100 font-bold mb-[5px]">Dashboard</h2>
    <h5 className="text-token-greenAccent-400">Welcome to your dashboard</h5>
  </div>
  <Button sx={{ /* ... same as above */ }}>
    ...
  </Button>
</div>
```

### 1.4 Customizing the ripple color (MUI)

To change the ripple color (e.g. to match your button), use the theme or `sx`:

```tsx
<Button
  sx={{
    // ... your button styles ...
    "& .MuiTouchRipple-root": {
      color: "rgba(255, 255, 255, 0.4)", // ripple color
    },
  }}
>
  ...
</Button>
```

---

## Option 2: Without MUI — Reusable Ripple in Any Project (React + CSS + Tailwind)

Use this when you **don’t** use MUI and want the same “stone in water” effect with **Tailwind** for the button style.

### 2.1 Ripple component (copy as-is)

Create a small component that renders a circle at the click position and animates it (scale + fade). The button must be `position: relative` and `overflow: hidden` so the circle stays inside.

**File: `components/RippleButton.tsx` (or `RippleButton.jsx`)**

```tsx
"use client";

import { useRef, useState, useCallback, type MouseEvent, type ReactNode } from "react";

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function RippleButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const idRef = useRef(0);

  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button || disabled) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++idRef.current;
      setRipples((prev) => [...prev, { x, y, id }]);

      // Remove ripple after animation (match CSS animation duration)
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);

      onClick?.(e);
    },
    [onClick, disabled]
  );

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
      {ripples.map(({ x, y, id }) => (
        <span
          key={id}
          className="ripple-circle absolute rounded-full bg-white/40 pointer-events-none animate-ripple"
          style={{
            left: x,
            top: y,
            width: 0,
            height: 0,
            transform: "translate(-50%, -50%)",
          }}
          aria-hidden
        />
      ))}
    </button>
  );
}
```

### 2.2 CSS for the ripple animation

The wave is a circle that scales up and fades out. Add this to your global CSS (e.g. `globals.css` or `app/globals.css`).

**In `globals.css` (or your main stylesheet):**

```css
/* Ripple: stone-in-water wave effect. Button must have position: relative; overflow: hidden; */
@keyframes ripple {
  0% {
    width: 0;
    height: 0;
    opacity: 0.5;
  }
  100% {
    width: 400px;
    height: 400px;
    opacity: 0;
  }
}

.animate-ripple {
  animation: ripple 0.6s ease-out forwards;
}
```

The circle is centered at the click via `left: x`, `top: y` and `transform: translate(-50%, -50%)` in the component.

### 2.3 Tailwind config (optional): register the animation

If you prefer defining the animation in Tailwind:

**In `tailwind.config.js` (or `tailwind.config.ts`):**

```js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        ripple: {
          "0%": { width: "0", height: "0", opacity: "0.5" },
          "100%": { width: "400px", height: "400px", opacity: "0" },
        },
      },
      animation: {
        ripple: "ripple 0.6s ease-out forwards",
      },
    },
  },
};
```

Then the component can use `animate-ripple` from Tailwind and you can remove the `@keyframes ripple` from global CSS if you want.

### 2.4 Same look as Download Reports (Tailwind classes)

Use the same spacing and colors as the MUI button. Ensure your design tokens exist in Tailwind (or replace with your own).

**Tailwind + CSS variables (tokens):**

```tsx
<RippleButton
  className="
    bg-[var(--token-blueAccent-700)] text-white/80
    text-xs font-bold
    py-5 px-8
    hover:bg-[var(--token-blueAccent-600)] hover:text-white/90
    transition-colors
    rounded
  "
  onClick={() => {}}
>
  <DownloadIcon className="mr-2.5 w-5 h-5 text-white/80 inline" />
  Download Reports
</RippleButton>
```

**If you don’t use design tokens**, use fixed colors:

```tsx
<RippleButton
  className="
    bg-blue-700 text-white/80
    text-xs font-bold
    py-5 px-8
    hover:bg-blue-600 hover:text-white/90
    transition-colors
    rounded
  "
>
  ...
</RippleButton>
```

### 2.5 Mapping from current MUI `sx` to Tailwind

| MUI `sx` | Tailwind equivalent |
|----------|----------------------|
| `bgcolor: "var(--token-blueAccent-700)"` | `bg-[var(--token-blueAccent-700)]` or `bg-blue-700` |
| `color: "rgba(255,255,255,0.8)"` | `text-white/80` |
| `fontSize: 12` | `text-xs` |
| `fontWeight: 700` | `font-bold` |
| `py: 1.25` | `py-5` (1.25 × 4 = 5) |
| `px: 2` | `px-8` (2 × 4 = 8) |
| `"&:hover": { bgcolor: "...", color: "..." }` | `hover:bg-... hover:text-...` |

---

## Summary

- **With MUI**: Use `Button`; the wave is the default ripple. Style with `sx` (and optional Tailwind on the wrapper). Optionally tune ripple with `"& .MuiTouchRipple-root"`.
- **Without MUI**: Use the `RippleButton` component plus the ripple CSS (or Tailwind keyframes). Style the button with the same Tailwind classes as in the table above.

Copy the **Option 1** block if you stay on MUI; copy **Option 2** (component + CSS + Tailwind usage) for a non-MUI project to get the same visible “stone in water” effect.
