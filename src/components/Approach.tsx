import React from 'react';
import { CanvasRevealEffectDemo } from './ui/RevealEffect';

const Approach = () => {
  return (
    <div className="w-full py-20" id="approach">
      <h2 className="heading lg:mb-4">
        My <span className="text-purple-500">approach</span>
      </h2>
      <div className="w-full mt-12">
        <CanvasRevealEffectDemo />
      </div>
    </div>
  );
};

export default Approach;
