import Image from 'next/image';
import { Element } from 'react-scroll';

export const Sponsor = () => {
  return (
    <Element
      name='sponsor'
      className='relative flex flex-col items-center bg-[#DBEAEE] bg-[url("/images/bluer-wheel-bg.png")] bg-cover bg-no-repeat py-[10rem] px-14 md:py-[25rem]'
    >
      <div className='lg:min-w-[800px]'>
        <div className='space-y-12'>
          <div>
            <h2 className='mb-8 w-full text-5xl font-medium leading-none tracking-tight text-black lg:mb-6 lg:text-7xl xl:text-8xl'>
              Sponsor <br className='block md:hidden' />
              the race.
            </h2>
            <p className='text-xl leading-6 text-[#474747]'>
              <span className='font-medium text-black'>
                Want to do more than compete? Support the race as a sponsor.
              </span>
              <br />
              Get in touch with our team and see what’s possible.
            </p>
          </div>
          <div className='space-y-6'>
            <div className='flex flex-col items-start gap-4 md:flex-row md:items-center'>
              <Image
                width={90}
                height={90}
                src='/images/sponsor-icon-1.svg'
                alt='video'
              />
              <p className='text-xl tracking-normal'>
                Your logo or video
                <br />
                on the livestream.
              </p>
            </div>
            <div className='flex flex-col items-start gap-4 md:flex-row md:items-center'>
              <Image
                width={90}
                height={90}
                src='/images/sponsor-icon-2.svg'
                alt='car'
              />
              <p className='text-xl tracking-normal'>
                Your logo printed on <br />
                the side of our karts.
              </p>
            </div>
            <div className='flex flex-col items-start gap-4 md:flex-row md:items-center'>
              <Image
                width={90}
                height={90}
                src='/images/sponsor-icon-3.svg'
                alt='world'
              />
              <p className='text-xl tracking-normal'>
                On-site branding to promote you,{' '}
                <br className='hidden md:block' />
                your brand, or your project.
              </p>
            </div>
          </div>
          <div>
            <a
              href='mailto:sponsor@nation.io'
              className='rounded-lg border border-black bg-black py-4 px-6 font-medium text-white hover:bg-transparent hover:text-black'
            >
              Get in Touch
            </a>
          </div>
          {/* <div className='flex flex-col items-start gap-14 pt-20 md:flex-row'>
            <Image
              src='/svg/NATION-black.svg'
              width={80}
              height={33}
              alt='nation'
            ></Image>
          </div> */}
        </div>
      </div>
    </Element>
  );
};
