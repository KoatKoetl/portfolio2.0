import { title } from 'process';
import React from 'react';

function ShimmerButton({
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
    <button
      onClick={handleClick}
      className={`inline-flex gap-2 text-xs md:text-base h-10 md:h-12 animate-shimmer items-center justify-center rounded-md border  bg-[linear-gradient(110deg,#490a91,45%,#804472,55%,#490a91)] bg-[length:200%_100%] px-4 md:px-6 font-bold tracking-wider hover:bg-[#804472] text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${otherClasses}`}
    >
      {position === 'left' && icon}
      {title}
      {position === 'right' && icon}
    </button>
  );
}

export default ShimmerButton;
