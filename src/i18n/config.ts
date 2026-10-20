export const LOCALES = ['en', 'ru', 'ro'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

/** Persisted in localStorage so the choice survives reloads. */
export const LOCALE_STORAGE_KEY = 'portfolio.locale';

/** Value written to <html lang>. */
export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  ru: 'ru',
  ro: 'ro',
} as const;

/** Native names: never translated. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  ro: 'Română',
} as const;

/** Two letter badge shown in the compact switcher button. */
export const LOCALE_SHORT: Record<Locale, string> = {
  en: 'EN',
  ru: 'RU',
  ro: 'RO',
} as const;

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);

/** Best-effort match of a browser language tag ("ru-RU", "ro-MD") to a supported locale. */
export const matchLocale = (tag: string | undefined | null): Locale | null => {
  if (!tag) return null;
  const base = tag.toLowerCase().split('-')[0];
  return isLocale(base) ? base : null;
};
