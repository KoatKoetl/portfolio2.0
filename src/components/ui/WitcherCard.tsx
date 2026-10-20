'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { cn } from '../../utils/cn';

export type Rarity = 'blue' | 'green' | 'orange' | 'red';
export const RARITY: Record<Rarity, string> = {
  blue: '#3b82f6',
  green: '#22c55e',
  orange: '#f97316',
  red: '#ef4444',
};

export type Project = {
  id: number;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  website?: string; // live site: front image links here
  github?: string; // repo: "Check GitHub" on the back links here
  link?: string; // legacy: used as the GitHub link if `github` is missing
  rarity?: Rarity; // colour of the glow behind the card on hover
  category?: string; // rank banner on the front, e.g. "Fullstack"
  details?: string[]; // "What I did" list on the back of the card
  period?: string; // time worked on it, shown bottom-left of the image as plain text
  order?: number; // default sort position (lower = earlier), used by the list
};

const NAMES: Record<string, string> = {
  re: 'React', ts: 'TypeScript', mongodb: 'MongoDB', redux: 'Redux', tail: 'Tailwind',
  nodejs: 'Node.js', vite: 'Vite', html: 'HTML', css: 'CSS', js: 'JavaScript',
  openai: 'OpenAI', rapidapi: 'RapidAPI', bitrix: 'Bitrix CMS', php: 'Php', vue: 'Vue'
};
const techName = (p: string) => NAMES[p.split('/').pop()!.replace(/\.(svg|png)$/i, '').toLowerCase()] ?? p;
const src = (p: string) => (p.startsWith('/') ? p : `/${p}`);

// Chamfered corners: the carved-plate silhouette
const PLATE =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const HEX = 'polygon(12px 0,calc(100% - 12px) 0,100% 50%,calc(100% - 12px) 100%,12px 100%,0 50%)';

const Divider = () => (
  <div className="flex items-center gap-2" aria-hidden>
    <span className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-500" />
    <span className="h-2 w-2 rotate-45 bg-purple-500" />
    <span className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-500" />
  </div>
);

const Plate = ({ children, tint }: { children: React.ReactNode; tint?: boolean }) => (
  <div className="h-full w-full drop-shadow-[0_8px_16px_rgb(0_0_0/0.25)]">
    <div
      className="h-full w-full bg-gradient-to-b from-purple-500 via-violet-600 to-purple-500 p-[3px]"
      style={{ clipPath: PLATE }}
    >
      <div
        className={cn('relative h-full w-full p-3', tint ? 'bg-purple-50' : 'bg-white')}
        style={{ clipPath: PLATE }}
      >
        <div
          className="pointer-events-none absolute inset-1.5 border border-black/10"
          style={{ clipPath: PLATE }}
        />
        {children}
      </div>
    </div>
  </div>
);

export const WitcherCard = ({
  project,
  flipDirection = 'right',
  className,
}: {
  project: Project;
  flipDirection?: 'right' | 'left';
  className?: string;
}) => {
  const { title, des, img, iconLists, website, category, details, period, rarity = 'blue' } = project;
  const github = project.github ?? project.link;
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();
  const angle = flipDirection === 'right' ? 180 : -180;
  const names = iconLists.map(techName);

  // Tilt toward the hovered corner: stronger on the front, softer on the back
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const max = flipped ? 5 : 10;
  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 2 * max);
    rx.set(-py * 2 * max);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn('group relative h-[34rem] w-[min(21rem,calc(100vw-2rem))] [perspective:1400px]', className)}
    >
      {/* Rarity glow: spreads out from behind the card on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-2 scale-90 opacity-0 blur-2xl transition duration-500 ease-out group-hover:scale-110 group-hover:opacity-80"
      >
        <div className="h-full w-full" style={{ clipPath: PLATE, backgroundColor: RARITY[rarity] }} />
      </div>
      <motion.div
        className="h-full w-full [transform-style:preserve-3d]"
        style={{ rotateX: rx, rotateY: ry }}
      >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? angle : 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.4, 0.1, 0.2, 1] }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden]" aria-hidden={flipped}>
          <Plate>
            <div className="flex h-full flex-col gap-3 px-1.5 pb-1.5 pt-1">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-bold leading-tight text-black-100 line-clamp-2">
                  {title}
                </h3>
              </div>

              {/* Art window: project image fills it; bg.png is only the fallback */}
              <div className="relative h-44 overflow-hidden border-2 border-purple-500 bg-purple-50">
                {website ? (
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${title} website`}
                    tabIndex={flipped ? -1 : 0}
                    className="group/img block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-violet-600"
                  >
                    <Image
                      src={img || '/bg.png'}
                      alt={img ? title : ''}
                      fill
                      unoptimized
                      sizes="336px"
                      className="object-cover transition duration-500 group-hover/img:scale-105"
                    />
                    <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white opacity-0 shadow transition group-hover/img:opacity-100">
                      <FaLocationArrow color="#7c3aed" size={12} />
                    </span>
                  </a>
                ) : (
                  <Image src={img || '/bg.png'} alt={img ? title : ''} fill unoptimized sizes="336px" className="object-cover" />
                )}
                {category && (
                  <span className="pointer-events-none absolute left-0 top-0 z-10 bg-purple-500 px-3 py-0.5 text-xs font-bold text-white">
                    {category}
                  </span>
                )}
                {period && (
                  <span className="pointer-events-none absolute bottom-0 left-0 z-10 bg-violet-600 px-3 py-0.5 text-xs font-bold text-white">
                    {period}
                  </span>
                )}
              </div>

              <Divider />

              <p className="line-clamp-4 text-sm leading-relaxed text-black-100">{des}</p>

              <div className="mt-auto flex items-center pl-1">
                {iconLists.map((icon, i) => (
                  <div
                    key={icon}
                    title={names[i]}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white"
                    style={{ transform: `translateX(-${5 * i * 2}px)` }}
                  >
                    <Image src={src(icon)} alt={names[i]} width={20} height={20} unoptimized />
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setFlipped(true)}
                tabIndex={flipped ? -1 : 0}
                className="bg-violet-600 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                style={{ clipPath: HEX }}
              >
                Show more
              </button>
            </div>
          </Plate>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 [backface-visibility:hidden]"
          style={{ transform: 'rotateY(180deg)' }}
          aria-hidden={!flipped}
        >
          <Plate tint>
            <div className="flex h-full flex-col gap-3 px-2 pb-1.5 pt-2">
              <h3 className="text-center text-lg font-bold text-black-100">{title}</h3>
              <Divider />

              <div className="flex-1 space-y-3 overflow-y-auto pr-2 text-sm leading-relaxed text-black-100 [scrollbar-width:thin] [scrollbar-color:#a855f7_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-purple-500">
                <section>
                  <h4 className="mb-1 text-xs font-bold text-purple-500">About the project</h4>
                  <p>{des}</p>
                </section>
                {details && details.length > 0 && (
                  <>
                    <Divider />
                    <section>
                      <h4 className="mb-1.5 text-xs font-bold text-purple-500">What I did</h4>
                      <ul className="space-y-1.5">
                        {details.map((d, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rotate-45 bg-purple-500" aria-hidden />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}
              </div>

              <Divider />

              <div>
                <p className="mb-1.5 text-center text-xs font-bold text-purple-500">Tech stack</p>
                <ul className="flex flex-wrap justify-center gap-1.5">
                  {names.map((n, i) => (
                    <li key={n + i} className="rounded-full border border-black/10 bg-white px-2.5 py-0.5 text-xs text-black-100">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setFlipped(false)}
                  tabIndex={flipped ? 0 : -1}
                  className="border border-purple-500 bg-white px-5 py-2 text-sm font-bold text-purple-500 transition hover:bg-purple-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
                  style={{ clipPath: HEX }}
                >
                  Back
                </button>
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={flipped ? 0 : -1}
                    className="flex items-center text-sm text-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
                  >
                    Check GitHub
                    <FaLocationArrow className="ms-3" color="#7c3aed" />
                  </a>
                )}
              </div>
            </div>
          </Plate>
        </div>
      </motion.div>
      </motion.div>
    </div>
  );
};