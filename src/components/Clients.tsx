import { companies, testimonials } from '@/data';
import Image from 'next/image';
import React from 'react';
import { InfiniteMovingCards } from './ui/InfiniteMovingCards';

const Clients = () => {
  return (
    <div className="py-20" id="testimonials">
      <h2 className="heading lg:mb-4">
        Kind words from <span className="text-purple-500">satisfied clients</span>
      </h2>
      <div className="flex flex-col items-center max-lg:mt-10">
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 lg:mt-10">
          {companies.map(({ id, img, name, nameImg }) => {
            return (
              <div key={id} className="flex md:max-w-60 max-w-32 gap-2">
                <Image src={img} alt={name} className="md:w-12 w-8" width={32} height={32} />
                <Image src={nameImg} alt={name} className="md:w-24 w-20" width={80} height={80} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Clients;
