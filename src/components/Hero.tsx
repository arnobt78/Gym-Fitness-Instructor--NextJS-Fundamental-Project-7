'use client';

import { motion } from 'framer-motion';
import { Dumbbell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/Button';

/**
 * Hero section: headline and CTA. Scrolls to #generate on "Accept & Begin".
 */
export function Hero() {
  return (
    <motion.div
      className="min-h-screen flex flex-col gap-10 items-center justify-center text-center max-w-[800px] w-full mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
      >
        <Dumbbell className="h-12 w-12 sm:h-14 sm:w-14 text-blue-400 mx-auto" aria-hidden />
        <p>IT&apos;S TIME TO GET</p>
        <h1 className="font-heading uppercase font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          Swole<span className="text-blue-400">normous</span>
        </h1>
      </motion.div>
      <motion.p
        className="text-sm md:text-base font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        I hereby acknowledgement that I may become{' '}
        <span className="text-blue-400 font-medium">unbelievably swolenormous</span> and accept all
        risks of becoming the local{' '}
        <span className="text-blue-400 font-medium">mass montrosity</span>, afflicted with severe
        body dismorphia, unable to fit through doors.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
      >
        <Button
          func={() => {
            if (typeof window !== 'undefined') window.location.href = '#generate';
          }}
          text="Accept & Begin"
          icon={<ArrowRight className="h-5 w-5" aria-hidden />}
        />
      </motion.div>
    </motion.div>
  );
}
