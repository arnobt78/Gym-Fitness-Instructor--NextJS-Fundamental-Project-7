'use client';

import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'bottom';
  disabled?: boolean;
}

/**
 * Hover tooltip. When disabled=true, wraps children in a div that shows content on mouseEnter
 * and hides on mouseLeave. When disabled=false, renders only children (no wrapper). Used e.g. for disabled Formulate button.
 */
export function Tooltip({ children, content, side = 'top', disabled = false }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Clean up mouseleave listener when visible toggles so tooltip hides when cursor leaves wrapper. */
  useEffect(() => {
    if (!visible) return;
    const el = wrapperRef.current;
    if (!el) return;
    const onLeave = () => setVisible(false);
    el.addEventListener('mouseleave', onLeave);
    return () => el.removeEventListener('mouseleave', onLeave);
  }, [visible]);

  /** When disabled=true, the child is disabled and we show tooltip on hover. */
  if (!disabled) return <>{children}</>;

  return (
    <div
      ref={wrapperRef}
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
    >
      {children}
      {visible && content && (
        <div
          role="tooltip"
          className="absolute z-50 px-3 py-2 text-sm text-slate-900 bg-slate-200 rounded-md shadow-lg whitespace-nowrap border border-slate-300"
          style={
            side === 'top'
              ? { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-6px)', marginBottom: 4 }
              : { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(6px)', marginTop: 4 }
          }
        >
          {content}
        </div>
      )}
    </div>
  );
}
