'use client';

import { RippleButton } from './RippleButton';

/**
 * Reusable primary CTA button (ripple + branded styles). Use for main actions.
 */
interface ButtonProps {
  text: string;
  func: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export function Button({ text, func, icon, disabled = false }: ButtonProps) {
  return (
    <RippleButton
      type="button"
      onClick={() => {
        if (disabled) return;
        func();
      }}
      disabled={disabled}
      className={
        'flex items-center justify-center gap-2 px-8 mx-auto py-4 rounded-md border-2 border-solid transition-all duration-200 ' +
        (disabled
          ? 'bg-slate-900 border-slate-600 text-slate-500 cursor-not-allowed opacity-70'
          : 'bg-slate-950 border-blue-400 shadow-[3px_3px_0_0_#60a5fa] hover:shadow-[6px_6px_0_0_#60a5fa] hover:-translate-x-0.5 hover:-translate-y-0.5')
      }
    >
      {icon}
      <p>{text}</p>
    </RippleButton>
  );
}
