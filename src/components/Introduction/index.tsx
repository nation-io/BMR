import Image from 'next/image';
import { Link } from 'react-scroll';

import Button from '@/components/buttons/Button';
import { DriverLineup } from '@/components/DriverLineup';
import UnstyledLink from '@/components/links/UnstyledLink';

export const Introduction = () => {
  return (
    <div className='mt-10 flex w-full justify-center lg:mt-[10rem]'>
      <div className='md:min-w-[90%] xl:min-w-[1280px] 2xl:min-w-[800px]'>
        <div className='flex w-full flex-col px-5 2xl:px-40'>
          <div className='mx-auto'>
            <h2 className='mb-8 w-full text-5xl font-medium leading-none tracking-tight text-black lg:mb-12 lg:text-7xl xl:text-8xl'>
              The Bear Market <br className='hidden sm:block' />
              Rally is a go-kart <br className='hidden sm:block' />
              grand prix with <br className='hidden sm:block' />
              the best builders <br className='hidden sm:block' />
              in web3.
            </h2>
            <p className='max-w-xs text-xl leading-6 text-[#474747]'>
              <span className='font-medium text-black'>
                These karts go fast — Solana fast.
              </span>{' '}
              You’ll be racing at 40 km/h against friends, foes, and fellow
              founders in a double elimination tournament in the center of
              Lisbon.{' '}
            </p>
          </div>
        </div>

        {/* <TrackImagesCarousel /> */}

        <DriverLineup />

        <div className='flex w-full flex-col px-5 2xl:px-40'>
          {/* Location Block */}
          <div className='flex flex-col pb-[5rem] lg:pb-[5rem] xl:pb-[10rem]'>
            <div className='mx-auto space-y-10 lg:translate-x-[6rem] xl:translate-x-[8rem]'>
              <div>
                <Image
                  src='/images/lisbon-flag.svg'
                  width={95}
                  height={64}
                  alt='Lisbon'
                />
              </div>
              <h2 className='w-full text-5xl font-medium leading-none tracking-tight text-black lg:text-7xl xl:text-8xl'>
                Parque <br className='block md:hidden' />
                Eduardo VII <br />
                Lisbon, Portugal
                <br className='hidden sm:block' />
              </h2>
              <div className='space-y-5'>
                <p className='max-w-sm text-xl leading-6 text-[#474747]'>
                  The Bear Market Rally is a three minute walk from the center
                  of <strong className='font-medium'>Breakpoint</strong>. It
                  will also be livestreamed on{' '}
                  <strong className='font-medium'>Twitch</strong> for the
                  broader Solana community to see at home.
                </p>
                <p className='max-w-sm text-xl leading-6 text-[#474747]'>
                  To see your company featured in the event space or on the
                  livestream, see our{' '}
                  <Link
                    to='sponsor'
                    duration={500}
                    delay={100}
                    smooth
                    className='cursor-pointer border-b font-medium transition-colors hover:border-b-[#ccc]'
                  >
                    sponsorship
                  </Link>{' '}
                  section.
                </p>
              </div>
              {/* Open this link: https://goo.gl/maps/q2mLJkujC7eGart97 */}
              <div className='pt-2'>
                <UnstyledLink href='https://lu.ma/bearmarketrally'>
                  <Button variant='dark'>Visit the Race</Button>
                </UnstyledLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
