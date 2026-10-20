'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaGlobe } from 'react-icons/fa';
import { LOCALES, LOCALE_LABELS, LOCALE_SHORT, type Locale } from '../../i18n/config';
import { useI18n } from '../../i18n/I18nProvider';
import { cn } from '../../utils/cn';

const OPTION_COUNT = LOCALES.length;

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const select = useCallback(
    (next: Locale) => {
      setLocale(next);
      close(true);
    },
    [close, setLocale],
  );

  // Close on outside pointer interaction and on Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close(true);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, close]);

  // Move focus to the active option as soon as the menu opens.
  useEffect(() => {
    if (!open) return;
    const index = Math.max(0, LOCALES.indexOf(locale));
    optionRefs.current[index]?.focus();
  }, [open, locale]);

  const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const current = optionRefs.current.findIndex((node) => node === document.activeElement);
    const step = event.key === 'ArrowDown' ? 1 : -1;
    const base = current === -1 ? 0 : current;
    const next = (base + step + OPTION_COUNT) % OPTION_COUNT;
    optionRefs.current[next]?.focus();
  };

  return (
    <div ref={containerRef} className={cn('fixed right-3 top-3 z-[5100] sm:right-6 sm:top-6', className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.language.change}: ${LOCALE_LABELS[locale]}`}
        className="flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-3 text-sm font-bold text-black-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_0px_0px_1px_rgba(25,28,33,0.08)] transition hover:border-purple-500 hover:text-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
      >
        <FaGlobe aria-hidden size={14} />
        <span aria-hidden>{LOCALE_SHORT[locale]}</span>
        <FaChevronDown
          aria-hidden
          size={10}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t.language.label}
            onKeyDown={onListKeyDown}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-black/10 bg-white p-1 shadow-lg"
          >
            {LOCALES.map((item, index) => {
              const active = item === locale;
              return (
                <li key={item} role="none">
                  <button
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => select(item)}
                    className={cn(
                      'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-violet-600',
                      active
                        ? 'bg-violet-600 font-bold text-white'
                        : 'text-black-100 hover:bg-purple-50',
                    )}
                  >
                    <span>{LOCALE_LABELS[item]}</span>
                    <span className={cn('text-xs', active ? 'text-white/80' : 'text-purple-500')}>
                      {LOCALE_SHORT[item]}
                    </span>
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
