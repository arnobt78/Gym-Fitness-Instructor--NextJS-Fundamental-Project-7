"use client";

import { Heart } from "lucide-react";

/**
 * Site footer: copyright and year. suppressHydrationWarning avoids mismatch from new Date().getFullYear() between server and client.
 */
export function Footer() {
  return (
    <footer className="w-full border-t border-slate-700/50 bg-slate-950/80 py-6 mt-auto">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 text-center">
        <p className="flex items-center justify-center gap-1.5 text-sm text-slate-400" suppressHydrationWarning>
          <Heart className="h-4 w-4 text-blue-400" aria-hidden />
          Fitness Instructor &copy; {new Date().getFullYear()}. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
