'use client';
import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../../i18n/I18nProvider';
import { CanvasRevealEffect } from '../../components/ui/RevealEffectCanvas';

/** Visual effect per approach phase, index aligned with the translated cards. */
const PHASE_EFFECTS: React.ReactNode[] = [
  <CanvasRevealEffect key="phase-1" animationSpeed={5.1} containerClassName="bg-emerald-900" />,
  <CanvasRevealEffect
    key="phase-2"
    animationSpeed={3}
    containerClassName="bg-black"
    colors={[
      [236, 72, 153],
      [232, 121, 249],
    ]}
    dotSize={2}
  />,
  <CanvasRevealEffect key="phase-3" animationSpeed={3} containerClassName="bg-sky-600" colors={[[125, 211, 252]]} />,
];

export function CanvasRevealEffectDemo() {
  const t = useTranslation();

  return (
    <>
      <div className="md:py-20 flex flex-col lg:flex-row items-center justify-center gap-4">
        {t.approach.cards.map((card, index) => (
          <Card
            key={card.title}
            title={card.title}
            icon={<AceternityIcon order={t.approach.phases[index] ?? ''} />}
            description={card.description}
          >
            {PHASE_EFFECTS[index] ?? PHASE_EFFECTS[0]}
          </Card>
        ))}
      </div>
    </>
  );
}

const Card = ({
  title,
  icon,
  children,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  description: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-purple-500/[0.2]  sm:max-w-2xl w-full mx-auto p-4 relative sm:h-[15rem] md:h-[25rem] lg:h-[35rem]"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-purple-500 text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-purple-500 text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-purple-500 text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-purple-500 text-black" />

      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full w-full absolute inset-0">
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 p-4">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {icon}
        </div>
        <h2 className="dark:text-white text-3xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center">
          {title}
        </h2>
        <p
          className="text-sm dark:text-white opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200 text-center"
          style={{ color: '#e4ecff' }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex h-12 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-5 py-1 text-2xl font-bold text-purple-500 backdrop-blur-3xl">
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
