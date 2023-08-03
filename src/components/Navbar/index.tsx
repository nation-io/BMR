import Image from 'next/image';
import * as React from 'react';

import Button from '@/components/buttons/Button';

export const Index = ({
  scrollTo,
  mobileMenuOpen,
  handleOpenMenu,
}: {
  scrollTo: (section: string) => void;
  mobileMenuOpen: boolean;
  handleOpenMenu: () => void;
}) => {
  return (
    <>
      <div className='sticky top-0 z-50 hidden w-full justify-between bg-white p-3 lg:flex'>
        <div>
          <Button
            className='mr-[10px]'
            onClick={() => scrollTo('buy-tickets')}
            variant='light'
          >
            Compete
          </Button>
          <Button
            className='mr-[10px]'
            onClick={() => scrollTo('sponsor')}
            variant='light'
          >
            Sponsor
          </Button>
          <Button className='mr-[10px]' variant='light'>
            Attend
          </Button>
          <Button onClick={() => scrollTo('faq')} variant='light'>
            FAQ
          </Button>
        </div>
        <div>
          <Button
            onClick={() => scrollTo('subscribe')}
            className='mr-[10px]'
            variant='light'
          >
            <div className='mr-2'>
              <Image
                alt='notifaction icon'
                height='12px'
                width='12px'
                src='/images/icons/notification-black.png'
              />
            </div>
            Get event updates
          </Button>
          <Button
            onClick={() => scrollTo('buy-tickets')}
            className='mr-[10px]'
            variant='dark'
          >
            Enter the race
          </Button>
          <Button onClick={() => scrollTo('companion')} variant='dark'>
            Buy the digital companion
          </Button>
        </div>
      </div>
      <div className='sticky top-0 z-50 flex justify-between bg-white lg:hidden'>
        <div className='block w-full'>
          <div className='relative'>
            <div className='mt-5 ml-5'>
              <div className='h-12'></div>
            </div>
          </div>
          <div className='-mt-7 mb-6'>
            <div className='relative z-30 ml-5 flex justify-start'>
              <button onClick={() => handleOpenMenu()}>
                {mobileMenuOpen ? (
                  <Image
                    src='/icons/close.svg'
                    width='22px'
                    height='22px'
                    alt='nav'
                  />
                ) : (
                  <Image
                    src='/icons/nav.svg'
                    width='22px'
                    height='22px'
                    alt='nav'
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
