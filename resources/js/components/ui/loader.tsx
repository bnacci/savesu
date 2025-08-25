'use client';

import React, { ComponentProps } from 'react';
import { Transition, motion } from 'motion/react';

import { cn } from '@lib/utils';

export default function Loader({
  className,
  containerStyle,
}: ComponentProps<'div'> & { containerStyle?: string }) {
  const transition = (x: number): Transition => {
    return {
      duration: 1,
      repeat: Infinity,
      repeatType: 'loop' as const,
      delay: x * 0.2,
      ease: 'easeInOut',
    };
  };

  const loaderStyle = cn('h-2 w-2 rounded-full bg-primary-500', className);

  return (
    <div className={cn('flex items-center gap-2', containerStyle)}>
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(0)}
        className={loaderStyle}
      />
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(1)}
        className={loaderStyle}
      />
      <motion.div
        initial={{
          y: 0,
        }}
        animate={{
          y: [0, 10, 0],
        }}
        transition={transition(2)}
        className={loaderStyle}
      />
    </div>
  );
}
