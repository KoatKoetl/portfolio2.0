'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  isLocale,
  LOCALE_STORAGE_KEY,
  Locale,
  matchLocale,
} from './config';
import { Dictionary, getDictionary } from './dictionaries';

type I18nContextValue = {
  locale: Locale;
  /** False until the stored/browser locale has been applied on the client. */
  ready: boolean;
  t: Dictionary;
  setLocale: (next: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const readStoredLocale = (): Locale | null => {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(stored) ? stored : null;
  } catch {
    return null;
  }
};

const detectBrowserLocale = (): Locale | null => {
  const candidates = [...(window.navigator.languages ?? []), window.navigator.language];
  for (const candidate of candidates) {
    const match = matchLocale(candidate);
    if (match) return match;
  }
  return null;
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Always start with the default locale so server and first client render match.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = readStoredLocale() ?? detectBrowserLocale() ?? DEFAULT_LOCALE;
    setLocaleState(initial);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    if (!isLocale(next)) return;
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode / blocked cookies): locale still applies for the session.
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, ready, t: getDictionary(locale), setLocale }),
    [locale, ready, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>');
  return context;
};

export const useTranslation = (): Dictionary => useI18n().t;

/** Replaces `{key}` placeholders, e.g. `format('Show more ({count})', { count: 4 })`. */
export const format = (template: string, values: Record<string, string | number>): string =>
  template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
