'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { useTranslation } from '../../i18n/I18nProvider';
import { cn } from '../../utils/cn';
import { HOME_SECTION_ID, handleSectionLink } from '../../utils/scrollToSection';

/** Section anchors are language independent; only the visible labels are translated. */
const NAV_LINKS = [
  { key: 'projects', link: '#projects' },
  { key: 'contact', link: '#contact' },
] as const;

const FloatingNav = ({ className }: { className?: string }) => {
  const t = useTranslation();
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          'flex max-w-fit fixed top-3 sm:top-10 inset-x-0 mx-auto border rounded-xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] py-2 px-4 sm:px-10 sm:py-5 items-center justify-center space-x-4 border-white/[0.2] bg-white',
          className
        )}
      >
        <a
          href={`#${HOME_SECTION_ID}`}
          aria-label={t.nav.home}
          onClick={handleSectionLink(HOME_SECTION_ID)}
          className="px-8 sm:px-2 py-1 flex justify-center items-center text-neutral-600 dark:text-black dark:hover:text-purple-500 hover:text-black"
        >
          <FaHome />
        </a>
        {NAV_LINKS.map((navItem) => (
          <Link
            key={navItem.link}
            href={navItem.link}
            onClick={handleSectionLink(navItem.link.slice(1))}
            className={cn(
              'relative dark:text-black items-center space-x-1 text-text-black dark:hover:text-purple-500 hover:text-black hidden sm:flex'
            )}
          >
            <span className="block text-sm">{t.nav[navItem.key]}</span>
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default FloatingNav;
