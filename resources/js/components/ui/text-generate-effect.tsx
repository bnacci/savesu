'use client';

import { motion, stagger, useAnimate } from 'motion/react';

import React from 'react';
import { cn } from '@lib/utils';
import { useEffect } from 'react';

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
  onComplete,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [scope, animate] = useAnimate();
  //   let wordsArray = words.split(' ');
  const wordsArray = typeof words === 'string' ? words.split(' ') : [];

  useEffect(() => {
    if (!scope.current || wordsArray.length === 0) return;

    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none',
      },
      {
        duration: duration ?? 1,
        delay: stagger(0.2, { startDelay: delay }),
      },
    ).then(() => {
      if (onComplete) onComplete(); // <- chama o callback após animação
    });
  }, [words]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? 'blur(10px)' : 'none',
              }}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return <div className={cn('font-bold', className)}>{renderWords()}</div>;
};
