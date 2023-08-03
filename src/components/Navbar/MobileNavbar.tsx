import Image from 'next/image';
import * as React from 'react';

import Button from '@/components/buttons/Button';

export const MobileNavbar = ({
  scrollTo,
  mobileMenuOpen,
  handleOpenMenu,
}: {
  scrollTo: (section: string) => void;
  mobileMenuOpen: boolean;
  handleOpenMenu: () => void;
}) => {
  const handleClick = (section: string) => {
    handleOpenMenu();
    scrollTo(section);
  };

  return (
    <div className='fixed z-50 h-[100vh] w-[100vw] rounded-xl bg-white'>
      <div className='mt-5'>
        <div className='relative ml-5 flex justify-start'>
          <button onClick={() => handleOpenMenu()}>
            <Image
              src='/icons/close.svg'
              width='22px'
              height='22px'
              alt='nav'
            />
          </button>
        </div>
      </div>
      <div
        className={`default-transition absolute top-20 left-0 -mt-4 overflow-hidden bg-white duration-700 ${
          mobileMenuOpen ? 'h-screen w-full' : 'h-0'
        }`}
      >
        <div className='py-5'>
          <div className='mt-2 mb-4 flex w-full flex-col '>
            <div className='flex flex-col items-start gap-2'>
              <Button
                onClick={() => {
                  handleClick('buy-tickets');
                }}
                className='ml-[10px]'
                variant='gray'
              >
                COMPETE
              </Button>
              <Button
                onClick={() => handleClick('buy-tickets')}
                className='ml-[10px]'
                variant='gray'
              >
                ATTEND
              </Button>
              <Button
                onClick={() => handleClick('sponsor')}
                className='ml-[10px]'
                variant='gray'
              >
                SPONSOR
              </Button>
              <Button
                onClick={() => handleClick('subscribe')}
                className='ml-[10px]'
                variant='gray'
              >
                GET EVENT UPDATES
                <div className='mr-2 flex justify-center'>
                  <Image
                    alt='notification icon'
                    height='14px'
                    width='14px'
                    src='/icons/notification-black.svg'
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
