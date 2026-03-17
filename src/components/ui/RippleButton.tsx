'use client';

import {
  useRef,
  useState,
  useCallback,
  type MouseEvent,
  type ReactNode,
} from 'react';

interface RippleButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

/**
 * Button with ripple-on-click effect: on click, a circle expands from the click position (CSS animate-ripple).
 * Ripples are stored in state and removed after 600ms; disabled clicks do not trigger ripple or onClick.
 */
export function RippleButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
}: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const idRef = useRef(0);

  /* Compute click position relative to button, add ripple, remove after animation, then call onClick. */
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const button = buttonRef.current;
      if (!button || disabled) return;

      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = ++idRef.current;
      setRipples((prev) => [...prev, { x, y, id }]);

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
            transform: 'translate(-50%, -50%)',
          }}
          aria-hidden
        />
      ))}
    </button>
  );
}
