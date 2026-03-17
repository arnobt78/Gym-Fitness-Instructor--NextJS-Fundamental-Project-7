'use client';

import { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'bottom';
  disabled?: boolean;
}

/**
 * Simple tooltip that shows on hover. Used when element is disabled to show friendly message.
 */
export function Tooltip({ children, content, side = 'top', disabled = false }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
