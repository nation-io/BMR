import gsap from 'gsap';
import Image from 'next/image';
import React, { FunctionComponent, useCallback, useRef } from 'react';

import useMediaQuery from '@/hooks/useMediaQuery';

interface RaceEntrySectionProps {
  buyTicketForm: React.ReactNode;
  raceEntryTicketImage: string;
  className?: string;
}

const Heading: FunctionComponent<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <h2
    className={`leading-2 mt-14 text-center text-5xl font-medium tracking-tight md:leading-tight lg:text-start lg:text-7xl 2xl:text-8xl ${className}`}
  >
    {children}
  </h2>
);

const Description: FunctionComponent<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <p
    className={`mt-10 w-full max-w-sm text-center text-base opacity-75 lg:max-w-none lg:text-start ${className}`}
  >
    {children}
  </p>
);

type RaceEntrySectionComponent = FunctionComponent<
  RaceEntrySectionProps & { children: React.ReactNode }
> & {
  Heading: typeof Heading;
  Description: typeof Description;
};

const RaceEntrySection: RaceEntrySectionComponent = ({
  buyTicketForm,
  raceEntryTicketImage,
  children,
  className = '',
}) => {
  const container = useRef<HTMLDivElement | null>(null);

  const ticket = useRef<HTMLDivElement | null>(null);
  const description = useRef<HTMLDivElement | null>(null);
  const tl = useRef<gsap.core.Timeline>();
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const onHover = useCallback(
    function () {
      if (!isMobile) {
        tl.current?.progress(0).kill();

        tl.current = gsap
          .timeline()
          .to(description.current, {
            opacity: 0,
            ease: 'linear',
            duration: 0.05,
            delay: 1,
          })
          .to(
            ticket.current,
            {
              right: '45vw',
              y: '-7%',
              rotate: 0,
              width: '50vw',
              duration: 0.8,
              // ease: (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x)),
              ease: 'power4.inOut',
            },
            '<'
          );
      }
    },
    [isMobile]
  );

  const onMouseLeave = useCallback(
    function () {
      !isMobile && tl.current?.reverse();
    },
    [isMobile]
  );

  return (
    <div
      className={
        'relative flex min-h-screen flex-col overflow-hidden px-10 md:px-16 lg:flex-row lg:items-center lg:justify-between lg:gap-5 tall:min-h-[60vh] xl:px-24 ' +
        className
      }
      ref={container}
    >
      <div
        className='flex flex-col items-center justify-center py-16 pl-0 transition-opacity lg:items-start lg:pr-10 2xl:text-3xl'
        ref={description}
      >
        {children}
      </div>

      <div
        className='pointer-events-none absolute right-[28vw] bottom-2 -z-[1] hidden w-80 -rotate-6 lg:block lg:w-[22vw] xl:bottom-4 2xl:bottom-6 2xl:right-[20vw] 2xl:w-[20vw]'
        ref={ticket}
      >
        <Image
          height={3790}
          width={2116}
          src={raceEntryTicketImage}
          alt='race-entry'
        />
      </div>

      <div
        className='flex flex-col items-center justify-center'
        onMouseEnter={onHover}
        onMouseLeave={onMouseLeave}
      >
        {buyTicketForm}
      </div>
    </div>
  );
};

RaceEntrySection.Heading = Heading;
RaceEntrySection.Description = Description;

export default RaceEntrySection;
