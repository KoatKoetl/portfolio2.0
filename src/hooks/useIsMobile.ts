'use client';

import { useSyncExternalStore } from 'react';

/** Below Tailwind's `md` breakpoint (768px). */
export const MOBILE_QUERY = '(max-width: 767px)';

const subscribe = (onChange: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
};

const getSnapshot = () => window.matchMedia(MOBILE_QUERY).matches;

// Server + first client render agree on `false`, so hydration never mismatches.
const getServerSnapshot = () => false;

/** True when the viewport is narrower than `md`. Hydration-safe. */
export const useIsMobile = (): boolean =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
