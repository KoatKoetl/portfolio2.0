'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { format, useTranslation } from '../i18n/I18nProvider';
import { useProjects } from '../i18n/useProjects';
import { RARITY, Rarity, WitcherCard } from './ui/WitcherCard';

// Difficulty scale, easiest to hardest
const LEVELS: Rarity[] = ['blue', 'green', 'orange', 'red'];

type Sort = 'default' | 'easiest' | 'hardest';
const SORT_ORDER: Sort[] = ['default', 'easiest', 'hardest'];

const PAGE_DESKTOP = 6;
const PAGE_MOBILE = 3;
// How close (px) to the slider's right edge triggers loading the next batch on mobile
const AUTO_LOAD_THRESHOLD = 120;


// Add above RecentProjects
const RarityHint = () => {
  const t = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const pointer = useRef<string>('mouse');

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline-flex"
      onPointerEnter={(e) => {
        pointer.current = e.pointerType;
        if (e.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}
    >
                  <button
        type="button"
        aria-expanded={open}
        aria-describedby="rarity-hint"
        onClick={() => setOpen((o) => (pointer.current === 'mouse' ? true : !o))}
        onFocus={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm text-black-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
      >
        {t.projects.filterLabel}
        <span
          aria-hidden
          className="flex h-4 w-4 items-center justify-center rounded-full border border-black/30 text-[10px] font-bold leading-none"
        >
          i
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.span
            id="rarity-hint"
            role="tooltip"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-20 mt-2 w-64 -translate-x-1/2 rounded-lg bg-black-100 px-3 py-2 text-center text-xs leading-snug text-white shadow-lg"
                    >
            {t.projects.rarityTooltip.before}
            <b>{t.projects.rarityTooltip.emphasis}</b>
            {t.projects.rarityTooltip.after}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

const RecentProjects = () => {
  const t = useTranslation();
  const projects = useProjects();
  const [sort, setSort] = useState<Sort>('default');
  const [selected, setSelected] = useState<Rarity[]>([]); // empty = show all
    const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0); // current slide on mobile
  const sliderRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoLoadLock = useRef(false); // one auto-load per rendered batch
  const restoreScroll = useRef(false);
  const isMobile = useIsMobile();
  const pageSize = isMobile ? PAGE_MOBILE : PAGE_DESKTOP;

  // Re-arm the auto-loader whenever the rendered batch changes.
  useEffect(() => {
    autoLoadLock.current = false;
  }, [pages, pageSize]);

  // Collapsing the list shrinks the page and pushes the section away: bring it back.
  useEffect(() => {
    if (!restoreScroll.current) return;
    restoreScroll.current = false;
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, [pages]);

  const toggle = (l: Rarity) => {
    setSelected((cur) => (cur.includes(l) ? cur.filter((x) => x !== l) : [...cur, l]));
    setPages(1);
  };
  const clear = () => {
    setSelected([]);
    setPages(1);
  };

  const list = useMemo(() => {
    // Default order comes from `order` in the data (lower = first, missing = last)
    const all = [...projects].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
    const items = selected.length ? all.filter((p) => selected.includes(p.rarity ?? 'blue')) : all;
    if (sort === 'default') return items;
    const dir = sort === 'easiest' ? 1 : -1;
    // stable sort: projects with the same color keep their `order`
    return [...items].sort(
      (a, b) => dir * (LEVELS.indexOf(a.rarity ?? 'blue') - LEVELS.indexOf(b.rarity ?? 'blue')),
    );
  }, [sort, selected, projects]);

  const visible = list.slice(0, pages * pageSize);
  const remaining = list.length - visible.length;

    const onSlide = () => {
    const el = sliderRef.current;
    if (!el || visible.length === 0) return;
    setActive(Math.round(el.scrollLeft / (el.scrollWidth / visible.length)));

    // Auto-load the next batch instead of making the user press "Show more".
    if (autoLoadLock.current || remaining <= 0) return;
    const distanceToEnd = el.scrollWidth - el.clientWidth - el.scrollLeft;
    if (distanceToEnd > AUTO_LOAD_THRESHOLD) return;
    autoLoadLock.current = true;
    setPages((n) => n + 1);
  };

    const collapse = () => {
    restoreScroll.current = true;
    setPages(1);
  };

  /** Centre the slider on the card at `index` (mobile dots). */
  const goToSlide = (index: number) => {
    const el = sliderRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (!el || !card) return;
    const trackLeft = el.getBoundingClientRect().left;
    const left =
      el.scrollLeft +
      (card.getBoundingClientRect().left - trackLeft) -
      (el.clientWidth - card.clientWidth) / 2;
    el.scrollTo({ left, behavior: 'smooth' });
    setActive(index);
  };

  const cards = visible.map((p, i) => (
    <motion.div
      key={p.id}
      layout={!isMobile}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className={isMobile ? 'shrink-0 snap-center' : undefined}
    >
      <WitcherCard project={p} flipDirection={i % 2 === 0 ? 'right' : 'left'} />
    </motion.div>
  ));

      // Pager is desktop-only: on mobile the slider auto-loads as you swipe.
  const hasPager = !isMobile && (remaining > 0 || pages > 1);

  return (
    <div ref={sectionRef} className="py-10 md:py-20 bg-white scroll-mt-24" id="projects">
      <h2 className="heading text-black-100">
        {t.projects.headingLead} <span className="text-purple-500">{t.projects.headingAccent}</span>
      </h2>

      {/* Filter + sort by difficulty */}
      <div className="mt-6 md:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        <div className="flex items-center gap-3">
          <RarityHint />
          <div role="group" aria-label={t.projects.filterAria} className="flex items-center gap-2">
            {LEVELS.map((l) => {
              const on = selected.includes(l);
              return (
                <button
                  key={l}
                  type="button"
                  aria-pressed={on}
                  aria-label={t.projects.rarity[l]}
                  title={t.projects.rarity[l]}
                  onClick={() => toggle(l)}
                  className={
                    'h-6 w-6 rounded-full border-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ' +
                    (on ? 'scale-110 border-black-100' : selected.length ? 'border-black/10 opacity-40' : 'border-black/10')
                  }
                  style={{ backgroundColor: RARITY[l] }}
                />
              );
            })}
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="ms-1 text-sm text-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet-600"
                            >
                {t.projects.showAll}
              </button>
            )}
          </div>
        </div>

        <div role="group" aria-label={t.projects.sortAria} className="flex gap-2">
          {SORT_ORDER.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={sort === value}
              onClick={() => setSort(value)}
              className={
                'rounded-full border px-4 py-1.5 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 ' +
                (sort === value
                  ? 'border-violet-600 bg-violet-600 text-white'
                  : 'border-black/10 bg-white text-black-100 hover:border-purple-500')
              }
            >
              {t.projects.sort[value]}
            </button>
          ))}
        </div>
      </div>

      {/* Cards: swipeable slider on mobile, wrapping grid on desktop */}
      {isMobile ? (
        <>
          <div
            ref={sliderRef}
            onScroll={onSlide}
            className="mt-4 md:mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-4 md:py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <AnimatePresence mode="popLayout">{cards}</AnimatePresence>
          </div>
                    {visible.length > 1 && (
            <div className="flex items-center justify-center gap-1.5">
              {visible.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goToSlide(i)}
                  aria-label={format(t.projects.slideTo, { index: i + 1 })}
                  aria-current={i === active}
                  className="flex h-6 items-center rounded-full px-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
                >
                  <span
                    className={
                      'h-2 rounded-full transition-all ' +
                      (i === active ? 'w-5 bg-violet-600' : 'w-2 bg-black/10 hover:bg-black/30')
                    }
                  />
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-24 gap-y-12 p-4">
          <AnimatePresence mode="popLayout">{cards}</AnimatePresence>
        </div>
      )}

      {list.length === 0 && (
        <p className="mt-10 text-center text-black-100">{t.projects.empty}</p>
      )}

            {/* Show more / less: desktop only */}
      {hasPager && (
        <div className="mt-8 flex justify-center gap-3">
          {remaining > 0 && (
            <button
              type="button"
              onClick={() => setPages((n) => n + 1)}
              className="rounded-full bg-violet-600 px-6 py-2 text-sm font-bold text-white transition hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              {format(t.projects.showMore, { count: remaining })}
            </button>
          )}
          {pages > 1 && (
            <button
              type="button"
              onClick={collapse}
              className="rounded-full border border-purple-500 bg-white px-6 py-2 text-sm font-bold text-purple-500 transition hover:bg-purple-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              {t.projects.showLess}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentProjects;