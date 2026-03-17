'use client';

import { RippleButton } from '@/components/ui/RippleButton';

/**
 * Reusable primary button with MUI-style ripple. Styles via Tailwind.
 */
interface ButtonProps {
  text: string;
  func: () => void;
  icon?: React.ReactNode;
}

export function Button({ text, func, icon }: ButtonProps) {
  return (
    <RippleButton
      type="button"
      onClick={func}
      className="flex items-center justify-center gap-2 px-8 mx-auto py-4 rounded-md border-2 bg-slate-950 border-blue-400 border-solid shadow-[3px_3px_0_0_#60a5fa] hover:shadow-[6px_6px_0_0_#60a5fa] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-200"
    >
      {icon}
      <p>{text}</p>
    </RippleButton>
  );
}
