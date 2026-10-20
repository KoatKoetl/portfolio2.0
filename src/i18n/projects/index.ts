import { Locale } from '../config';
import { roProjects } from './ro';
import { ruProjects } from './ru';
import type { ProjectCopy } from './types';

export type { ProjectCopy } from './types';

/** English copy lives in `src/data/index.ts`, so only `en` is empty here. */
const PROJECT_COPY: Record<Locale, Record<string, ProjectCopy>> = {
  en: {},
  ru: ruProjects,
  ro: roProjects,
};

/** Returns the localized copy for a project title, or `null` when the base data is already correct. */
export const getProjectCopy = (title: string, locale: Locale): ProjectCopy | null =>
  PROJECT_COPY[locale]?.[title] ?? null;
