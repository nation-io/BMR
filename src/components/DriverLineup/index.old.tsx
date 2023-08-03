/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';

import useIsMobile from '@/hooks/useIsMobile';

const drivers = [
  {
    img: '/icons/drivers/ape-academy.png',
    name: 'Degenerate Ape Academy',
    tag: '@DegenApeAcademy',
    color: 'linear-gradient(90deg, #FC92AC 0.05%, #FE5690 99.95%) ',
    image: {
      src: '/icons/drivers/bg-wheel.png',
      style: [
        '[--racer-image-position:280%] md:[--racer-image-position:right_30%]',
        '[--racer-image-size:90%] md:[--racer-image-size:50%]',
      ].join(' '),
    },
  },
  {
    img: '/icons/drivers/kyle.png',
    name: 'Composability Kyle',
    tag: '@KyleSamani',
    color: 'linear-gradient(90deg, #FFC148 0.05%, #FF7100 99.95%) ',
    image: {
      src: '/icons/drivers/bg-cup.png',
      style: [
        '[--racer-image-position:-10%_40%] md:[--racer-image-position:25vw_45%] lg:[--racer-image-position:25vw_40%] xl:[--racer-image-position:140%_40%]',
        '[--racer-image-size:150%] md:[--racer-image-size:cover] xl:[--racer-image-size:70%]',
      ].join(' '),
    },
  },
  {
    img: '/icons/drivers/toly.png',
    name: 'toly 🇺🇸',
    tag: '@aeyakovenko',
    color: 'linear-gradient(90deg, #86F0FF 0.05%, #1C70FF 99.95%) ',
    image: {
      src: '"/icons/drivers/bg-kart.png"',
      style: [
        '[--racer-image-position:-130%_45%] md:[--racer-image-position:300%_29%]',
        '[--racer-image-size:135%] md:[--racer-image-size:90%]',
      ].join(' '),
    },
  },
  {
    img: '/icons/drivers/raj.png',
    name: 'Draj 🖤🇺🇸🇮🇳🇰🇷',
    tag: '@rajgokal',
    color: 'linear-gradient(90deg, #B5F880 0.05%, #4ED8E1 99.95%) ',
    image: {
      src: '/icons/drivers/bg-wheel-rot.png',
      style: [
        '[--racer-image-position:170%] md:[--racer-image-position:90%]',
        '[--racer-image-size:80%] md:[--racer-image-size:40%]',
      ].join(' '),
    },
  },
];

export const DriverLineup = () => {
  const isMobile = useIsMobile();

  return (
    <div className='rounded-xl bg-black p-5'>
      <div className='mb-14 flex w-full flex-row'>
        <h1 className='mr-auto text-3xl font-medium leading-none text-white lg:text-4xl'>
          Driver <br className='block md:hidden' />
          Lineup
        </h1>
        {/* <Countdown /> */}
      </div>
      <div className='flex flex-col gap-4'>
        {drivers.map((driver) => (
          <div
            key={driver.name}
            className={`flex w-full flex-row items-center rounded-xl bg-[length:var(--racer-image-size),contain] bg-[position:var(--racer-image-position),right] ${driver.image.style} bg-no-repeat p-4 pb-2`}
            style={{
              backgroundImage: `url(${driver.image.src}), ${driver.color}`,
            }}
          >
            <div className='flex-shrink-0'>
              <Image
                src={driver.img}
                alt={driver.name.concat(' Photo')}
                quality={100}
                height={isMobile ? 60 : 85}
                width={isMobile ? 60 : 85}
              />
            </div>
            <div className='ml-5 '>
              <p className='text-base font-medium text-black md:text-xl'>
                {driver.name}
              </p>
              <a
                className='break-words text-base font-medium text-black opacity-70 md:text-xl'
                href={`https://twitter.com/${driver.tag.slice(1)}`}
                target='_blank'
                rel='noreferrer'
              >
                {driver.tag}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
