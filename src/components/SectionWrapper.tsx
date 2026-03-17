'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

/**
 * Section layout: optional icon, header line + title (middle word highlighted) + children.
 */
interface SectionWrapperProps {
  id: string;
  header: string;
  title: [string, string, string];
  children: React.ReactNode;
  icon?: LucideIcon;
}

export function SectionWrapper({ children, header, title, id, icon: Icon }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      className="min-h-screen flex flex-col gap-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="bg-slate-950 py-10 flex flex-col gap-2 justify-center items-center p-4">
        {Icon && (
          <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-blue-400 mb-1" aria-hidden />
        )}
        <p className="uppercase font-medium">{header}</p>
        <h2 className="font-heading font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          {title[0]} <span className="uppercase text-blue-400">{title[1]}</span> {title[2]}
        </h2>
      </div>
      <div className="w-full max-w-9xl mx-auto flex flex-col gap-10 p-4">{children}</div>
    </motion.section>
  );
}
