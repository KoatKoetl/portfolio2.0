'use client';
import { motion, stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import { cn } from '../../utils/cn';

const TextGenerateEffect = ({
  words,
  className,
  accentFrom = 4,
}: {
  words: string;
  className?: string;
  /** Words at or after this index render in purple. */
  accentFrom?: number;
}) => {
    const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');

  // Re-runs on locale change: the spans are re-created (their keys change), so they
  // start hidden again and must be animated by the new effect run.
  useEffect(() => {
    if (!scope.current) return;
    const controls = animate(
      'span',
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );

    return () => controls.stop();
  }, [animate, scope, words]);

    const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={`${idx}-${word}`}
              className={`${idx >= accentFrom ? 'text-purple-400' : 'dark:text-black text-black'} opacity-0`}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className="my-4">
        <div className=" dark:text-white text-black leading-snug tracking-wide">{renderWords()}</div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
