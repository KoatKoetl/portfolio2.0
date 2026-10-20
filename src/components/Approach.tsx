'use client';

import React from 'react';
import { useTranslation } from '../i18n/I18nProvider';
import { CanvasRevealEffectDemo } from './ui/RevealEffect';

const Approach = () => {
  const t = useTranslation();

  return (
    <div className="w-full py-20" id="approach">
      <h2 className="heading lg:mb-4 text-black-100">
        {t.approach.headingLead} <span className="text-purple-500">{t.approach.headingAccent}</span>
      </h2>
      <div className="w-full mt-12">
        <CanvasRevealEffectDemo />
      </div>
    </div>
  );
};

export default Approach;
