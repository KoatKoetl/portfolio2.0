import React from 'react';
import { FaLocationArrow } from 'react-icons/fa';
import { socialMedia } from '../data';
import MagicButton from './ui/MagicButton';

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10" id="contact">
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img src="/footer-grid.svg" alt="grid" className="w-full h-full opacity-50" />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple-500">your</span> digital presence to the next level?
        </h1>
        <p className="text-gray-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>

        <a href="mailto:stanislavsushevici@gmail.com">
          <MagicButton title="Let's get in touch" icon={<FaLocationArrow />} position="right" />
        </a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center gap-5">
        <p className="md:text-base text-sm md:font-normal font-light">Copyright © 2024 Stanislav</p>

        <div className="flex items-center md:gap-3 gap-6 mb-8">
          {socialMedia.map(({ id, img, link }) => {
            return (
              <a href={link} target="blank" key={id}>
                <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-150 bg-opacity-75 bg-gray-900 rounded-lg border border-gray-800 hover:bg-gray-800">
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
