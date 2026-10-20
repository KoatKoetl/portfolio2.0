import { Locale } from '../config';
import { Dictionary, en } from './en';
import { ro } from './ro';
import { ru } from './ru';

export type { Dictionary } from './en';
export { en };

export const DICTIONARIES: Record<Locale, Dictionary> = {
  en,
  ru,
  ro,
};

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Merges a locale dictionary over the English fallback so a missing or empty
 * string never renders as `undefined`. Arrays are taken from the locale as a whole.
 */
const mergeDeep = <T>(fallback: T, override: unknown): T => {
  if (override === undefined || override === null) return fallback;
  if (isPlainObject(fallback) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...fallback };
    for (const key of Object.keys(fallback)) {
      result[key] = mergeDeep(fallback[key], override[key]);
    }
    return result as T;
  }
  if (Array.isArray(override)) {
    return (override.length > 0 ? override : fallback) as T;
  }
  if (typeof override === 'string' && override.trim() === '') return fallback;
  return override as T;
};

export const getDictionary = (locale: Locale): Dictionary =>
  locale === 'en' ? en : mergeDeep(en, DICTIONARIES[locale] ?? en);
