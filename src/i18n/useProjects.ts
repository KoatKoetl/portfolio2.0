'use client';

import { useMemo } from 'react';
import type { Project } from '../components/ui/WitcherCard';
import { projects } from '../data';
import { useI18n } from './I18nProvider';
import { getProjectCopy } from './projects';

/**
 * Base project data (order, images, tech icons, links) merged with the copy for
 * the active locale. Titles are brand names and stay in English everywhere.
 */
export const useProjects = (): Project[] => {
  const { locale } = useI18n();

  return useMemo(
    () =>
      projects.map((project) => {
        const copy = getProjectCopy(project.title, locale);
        return copy ? { ...project, ...copy } : project;
      }),
    [locale],
  );
};
