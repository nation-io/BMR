import Image from 'next/image';

import { Countdown } from '@/components/Hero/Countdown';

const RACERS = [
  {
    title: 'Degenerate Ape Academy',
    twitter: '@DegenApeAcademy',
    image: '/images/racer1.png',
    background: '/images/racers/bluer-wheel-1.png',
    gradient: 'bg-gradient-to-r from-[#FC92AC] to-[#FE5690]',
  },
  {
    title: 'Degenerate Ape Academy',
    twitter: '@DegenApeAcademy',
    image: '/images/racer1.png',
    background: '/images/racers/bluer-wheel-1.png',
    gradient: 'bg-gradient-to-r from-[#FFC148] to-[#FF7100]',
  },
  {
    title: 'Degenerate Ape Academy',
    twitter: '@DegenApeAcademy',
    image: '/images/racer1.png',
    background: '/images/racers/bluer-wheel-1.png',
    gradient: 'bg-gradient-to-r from-[#86F0FF] to-[#1C70FF]',
  },
  {
    title: 'Degenerate Ape Academy',
    twitter: '@DegenApeAcademy',
    image: '/images/racer1.png',
    background: '/images/racers/bluer-wheel-1.png',
    gradient: 'bg-gradient-to-r from-[#B5F880] to-[#4ED8E1]',
  },
];

export const RecentRacers = () => {
  return (
    <div className='my-14 flex w-full justify-center'>
      <div className='max-w-[1440px]'>
        <div className='flex w-[350px] flex-col rounded-xl bg-black p-5 lg:w-[1035px] '>
          <div className='mb-5 flex w-full justify-between'>
            <h2 className='text2:xl font-medium text-white lg:text-4xl'>
              Driver Lineup
            </h2>
            <Countdown />
          </div>
          {RACERS.map((item, index) => {
            return (
              <div
                key={index}
                className={`relative mt-5 flex items-center rounded-xl ${item.gradient}`}
              >
                <div>
                  {' '}
                  <Image
                    src={item.image}
                    width='97px'
                    height='84px'
                    alt={item.image}
                  ></Image>
                </div>
                <div className='z-20 flex flex-col'>
                  <p className='font-bold'>{item.title}</p>
                  <p className='font-bold opacity-50'>{item.twitter}</p>
                </div>
                <div className='bot-0 absolute -right-20 z-10'></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
