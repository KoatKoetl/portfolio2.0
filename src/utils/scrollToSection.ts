import type { MouseEvent } from 'react';

/** Vertical space reserved for the fixed floating navbar (matches `scroll-mt-24`). */
export const SECTION_SCROLL_OFFSET = 96;

/** The hero section id, used as the "home" target. */
export const HOME_SECTION_ID = 'home';

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Scrolls to a section, or to the very top of the document for the hero.
 *
 * The URL fragment is removed *before* scrolling: a lingering hash keeps the
 * browser's native scroll anchor alive, so manual scrolling back up settles on
 * the anchored offset instead of `y = 0` and the hero ends up shifted to the top.
 */
export function scrollToSection(id?: string | null): void {
  if (typeof window === 'undefined') return;

  const { pathname, search, hash } = window.location;
  if (hash) {
    window.history.replaceState(null, '', `${pathname}${search}`);
  }

  const behavior: ScrollBehavior = prefersReducedMotion() ? 'auto' : 'smooth';

  if (!id || id === HOME_SECTION_ID) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(id);
  if (!target) return;

  const top = target.getBoundingClientRect().top + window.scrollY - SECTION_SCROLL_OFFSET;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

/**
 * Click handler for in-page anchors. Prevents the native fragment jump (and the
 * hash it leaves behind) while keeping modified clicks (new tab/window) native.
 */
export function handleSectionLink(id: string) {
  return (event: MouseEvent<HTMLAnchorElement>): void => {
    if (event.defaultPrevented) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    event.preventDefault();
    scrollToSection(id);
  };
}
