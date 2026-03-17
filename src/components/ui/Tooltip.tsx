'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'bottom';
  disabled?: boolean;
}

/**
 * Portal-based tooltip (shadcn-style): renders content in document.body with position:fixed
 * so it is not clipped by nav overflow and does not cause layout shift or bounce.
 * When disabled=true, shows content on hover; when disabled=false, renders only children.
 */
export function Tooltip({ children, content, side = 'top', disabled = false }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const showTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setCoords({ left: rect.left, top: rect.top, width: rect.width, height: rect.height });
  }, []);

  const handleEnter = useCallback(() => {
    if (!disabled) return;
    showTimeoutRef.current = setTimeout(() => {
      updatePosition();
      setVisible(true);
    }, 150);
  }, [disabled, updatePosition]);

  const handleLeave = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
      showTimeoutRef.current = null;
    }
    setVisible(false);
    setCoords(null);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const el = wrapperRef.current;
    if (!el) return;
    const onLeave = () => handleLeave();
    el.addEventListener('mouseleave', onLeave);
    return () => el.removeEventListener('mouseleave', onLeave);
  }, [visible, handleLeave]);

  useEffect(() => {
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    };
  }, []);

  if (!disabled) return <>{children}</>;

  const tooltipContent =
    visible &&
    content &&
    coords &&
    typeof document !== 'undefined' &&
    createPortal(
      <div
        role="tooltip"
        className="fixed z-[9999] px-3 py-2 text-sm text-slate-900 bg-slate-200 rounded-md shadow-lg whitespace-nowrap border border-slate-300 pointer-events-none"
        style={{
          left: coords.left + coords.width / 2,
          top: side === 'top' ? coords.top : coords.top + coords.height,
          transform: side === 'top' ? 'translate(-50%, calc(-100% - 6px))' : 'translate(-50%, 6px)',
        }}
      >
        {content}
      </div>,
      document.body
    );

  return (
    <span
      ref={wrapperRef}
      className="inline-flex"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      {tooltipContent}
    </span>
  );
}
