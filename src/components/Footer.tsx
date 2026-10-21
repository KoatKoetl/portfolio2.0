'use client';

import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { socialMedia } from '../data';
import { useTranslation } from '../i18n/I18nProvider';
import MagicButton from './ui/MagicButton';

const Footer = () => {
  const t = useTranslation();

  return (
    <footer className="w-full pt-10 pb-6 md:pt-20 md:pb-10" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img src="/footer-grid.svg" alt="grid" className="w-full h-full opacity-50" />
      </div>

      <div className="flex flex-col items-center">
                <h2 className="heading lg:max-w-[45vw] text-black-100">
          {t.footer.heading.before}
          <span className="text-purple-500">{t.footer.heading.emphasis}</span>
          {t.footer.heading.after}
        </h2>
        <p className="text-black-100 md:mt-10 my-4 md:my-5 text-center">{t.footer.text}</p>

        <a href="mailto:stanislavsushevici@gmail.com">
          <MagicButton title={t.footer.cta} icon={<FaLocationArrow />} position="right" />
        </a>
      </div>

      <div className="flex mt-8 md:mt-16 md:flex-row flex-col justify-between items-center gap-5">
        <p className="md:text-base text-sm md:font-normal font-light">{t.footer.copyright}</p>

        <div className="flex items-center md:gap-3 gap-6 mb-2 md:mb-0">
          {socialMedia.map(({ id, img, link }) => {
            return (
              <a href={link} target="blank" key={id}>
                <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-150 bg-opacity-75 bg-white rounded-lg border hover:border-purple-200">
                  <img src={img} alt={img} width={20} height={20} />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
