import { title } from 'process';
import React from 'react';

function MagicButton({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) {
  return (
    <button className="p-[3px] relative ">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
      <div
        className={`px-8 py-3 bg-black-100 flex-nowrap flex rounded-[6px] items-center justify-center gap-0.5 relative group transition duration-200 text-white hover:bg-transparent ${otherClasses}`}
      >
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </div>
    </button>
  );
}

export default MagicButton;
