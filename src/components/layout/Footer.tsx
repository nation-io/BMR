import Image from 'next/image';
import { useEffect, useState } from 'react';

import { Countdown } from '@/components/Hero/Countdown';

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 750) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return (
    <div className='flex h-[580px] w-full flex-col bg-black p-8 lg:p-10 2xl:items-center'>
      <div className='lg:min-w-[800px]'>
        <div className='flex w-full items-start justify-between'>
          {isMobile ? (
            <Image
              src='/images/logo-white.svg'
              alt='The 2022 Bear Market Rally Logo'
              width={129}
              height={85}
              quality={10}
            />
          ) : (
            <Image
              src='/images/logo-white-mobile.svg'
              alt='The 2022 Bear Market Rally Logo'
              width={203}
              height={134}
              quality={10}
            />
          )}
          <div className='origin-top-right scale-[0.8] md:scale-[1]'>
            <Countdown />
          </div>
        </div>
        <div className='pl-10 lg:pl-20'>
          <div className='mt-10 flex flex-row transition-all'>
            <a
              href='https://twitter.com/buildwithnation'
              className='mr-5 opacity-50 hover:opacity-100'
              target='blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/icons/twitter.svg'
                width='19px'
                height='15px'
                alt=''
              />
            </a>
            <a
              href='https://www.instagram.com/nation.io/'
              className='opacity-50 hover:opacity-100'
              target='blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/icons/instagram.svg'
                width='19px'
                height='19px'
                alt=''
              />
            </a>
          </div>
          <p className='mt-10 w-[180px] text-xs text-white opacity-50 lg:w-[300px]'>
            The Bear Market Rally is hosted by NATION, a platform for gathering
            community resources to make great things happen. This event’s
            infrastructure is powered by our technology.
            <br /> <br />
            Learn more at nation.io.
          </p>
          <div className='mt-10'>
            <a
              href='https://nation.io/'
              className='opacity-50 hover:opacity-100'
              target='blank'
              rel='noopener noreferrer'
            >
              <Image src='/svg/NATION.svg' alt='' width='80px' height='33px' />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
