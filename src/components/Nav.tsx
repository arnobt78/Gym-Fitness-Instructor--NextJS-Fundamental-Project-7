'use client';

import { Anchor, Home, BookOpen, FlaskConical, Dumbbell } from 'lucide-react';
import { RippleButton } from '@/components/ui/RippleButton';

const links = [
  { href: '#', label: 'Home', icon: Home },
  { href: '#learn', label: 'Learn', icon: BookOpen },
  { href: '#generate', label: 'Generate', icon: FlaskConical },
  { href: '#workout', label: 'Workout', icon: Dumbbell },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
      <div className="max-w-9xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3">
          <a href="#" className="flex items-center gap-2 font-heading font-semibold text-lg text-white">
            <Anchor className="h-5 w-5 text-blue-400" aria-hidden />
            Swoley Fit
          </a>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {links.map(({ href, label, icon: Icon }) => (
              <RippleButton
                key={href}
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') window.location.href = href;
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
              >
                <Icon className="h-4 w-4" aria-hidden />
                {label}
              </RippleButton>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
