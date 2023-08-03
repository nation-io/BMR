import { motion } from 'framer-motion';
import React, { FunctionComponent, ReactNode } from 'react';
import CountUp from 'react-countup';

import useMediaQuery from '@/hooks/useMediaQuery';

import NextImage from '@/components/NextImage';
const Place = ({
  aspectRatioStyle,
  prize,
  position,
  children,
  rewards,
  iconSize,
  className,
}: {
  aspectRatioStyle: string;
  prize: number;
  position: string;
  children?: ReactNode;
  rewards: ReactNode;
  iconSize: number;
  className?: string;
}) => {
  const isFirstPos = position === '1st';

  return (
    <Wrapper
      className={`relative mx-3 flex flex-col justify-between overflow-hidden rounded-2xl p-5 pb-2 text-white shadow-lg md:w-[30vw] ${
        aspectRatioStyle || ''
      } ${className ? className : ''} ${
        isFirstPos
          ? 'bg-[url("/images/trophy.png"),linear-gradient(to_bottom,#1175ff,#48c1ff)] bg-[length:200%] bg-center md:bg-[length:250%] md:bg-[position:40%_50%]'
          : 'bg-gradient-to-b from-[#1175FF] to-[#48C1FF]'
      }`}
    >
      <h1 className='z-10 mt-[-0.5rem] font-screamer text-6xl font-normal lg:text-8xl'>
        <CountUp prefix='$' separator=',' end={prize} duration={3} />
      </h1>
      {children}
      <div className='relative z-10'>
        <div className='mb-5'>
          {isFirstPos ? (
            <NextImage
              src='/icons/trophy-filled.svg'
              height={iconSize}
              width={iconSize}
              alt='Sun symbol'
            />
          ) : (
            <NextImage
              src='/icons/trophy.svg'
              height={iconSize}
              width={iconSize}
              alt='Sun symbol'
            />
          )}
        </div>
        <div className='z-10 flex items-center border-t-[1px] border-dashed border-white py-5 md:h-[6rem] md:justify-between 2xl:h-[8rem]'>
          <h1 className='mt-[-8px] font-screamer text-4xl font-normal tracking-wide text-white lg:text-[5rem] lg:tracking-normal'>
            {position}
          </h1>
          <div className='ml-4 leading-4 tracking-wide text-white md:ml-0 md:leading-tight'>
            {rewards}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper: FunctionComponent<{
  className?: string;
  children: React.ReactNode;
}> = ({ className, children }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return typeof window === 'undefined' || isMobile ? (
    <div {...{ className }}>{children}</div>
  ) : (
    <motion.div
      transition={{ duration: 1 }}
      initial={{ height: 100 }}
      whileInView={{ height: 'auto' }}
      viewport={{ once: true }}
      {...{ className }}
    >
      {children}
    </motion.div>
  );
};

export default Place;
