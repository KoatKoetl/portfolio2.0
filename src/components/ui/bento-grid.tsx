'use client';

import { useState } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import { cn } from '../../utils/cn';
import { BackgroundGradientAnimation } from '../ui/Background-gradient-animation';
import { GlobeDemo } from './GridGlobe';
import ShimmerButton from './ShimmerButton';

const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('stanislavsuschevici@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 10000);
  };

  return (
    <div
      className={cn(
        'row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4',
        className
      )}
      style={{
        background: 'rgb(4,7,29)',
        backgroundColor: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
      }}
    >
      {id === 6 && (
        <div className="absolute">
          <BackgroundGradientAnimation />
        </div>
      )}
      <div
        className={`group-hover/bento:scale-101 transition duration-200 p-4 z-50 max-h-fit min-h-48 ${
          id === 3 && 'flex items-center md:block'
        } ${id === 6 && 'flex flex-col justify-center items-center'}`}
      >
        <div>{img && <img src={img} alt={img} className={cn(imgClassName, 'rounded-lg')} />}</div>
        <div>
          {spareImg && <img src={spareImg} alt={spareImg} className={`absolute ${id === 4 && 'bottom-12 md:bottom-12 md:left-0'}`} />}
        </div>
        <div
          className={`font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 text-base sm:text-2xl md:text-lg lg:text-xl ${
            id === 2 && 'text-xl'
          } 
          ${id === 3 && 'text-xl text-wrap max-w-24 sm:max-w-max md:text-2xl lg:text-4xl mb-0 mt-0 absolute z-10 md:top-24 lg:top-32'} ${
            id === 6 && 'text-xl md:text-3xl text-center md:mb-10'
          }`}
        >
          {title}
        </div>
        {id === 6 && (
          <ShimmerButton
            title={copied ? 'E-mail copied' : 'Copy e-mail address'}
            icon={<IoCopyOutline />}
            position="left"
            handleClick={handleCopy}
          />
        )}

        {id === 2 && <GlobeDemo />}

        {id === 3 && (
          <div className="flex gap-1 lg:gap-4 w-fit absolute right-3 lg:right-2">
            <div className="flex flex-col gap-3 md:gap-3 lg:gap-6">
              {['HTML', 'CSS', 'JavaScript', 'SCSS'].map((item, i) => (
                <span
                  key={i}
                  className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                >
                  {item}
                </span>
              ))}
              <span className="lg:py-7 lg:px-3 py-4 px-3 rounded-lg text-center bg-[#10132E]"></span>
            </div>
            <div className="flex flex-col gap-3 md:gap-3 lg:gap-4">
              <span className="lg:py-7 lg:px-3 py-4 px-3  rounded-lg text-center bg-[#10132E]"></span>
              {['React', 'TypeScript', 'Tailwind', 'Vite/Webpack'].map((item, i) => (
                <span
                  key={i}
                  className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base opacity-50 
                    lg:opacity-100 rounded-lg text-center bg-[#10132E]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">{description}</div>
      </div>
    </div>
  );
};

export default BentoGridItem;
