import Image from 'next/image';
import { useState } from 'react';

interface AccordionProps {
  className?: string;
  title: string;
  description: string;
}

export const Accordion = ({
  className,
  title,
  description,
}: AccordionProps): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex
        w-full
        flex-col
        items-center
        ${className}`}
    >
      <button
        className={`tr flex w-11/12 items-center justify-between border-0 bg-white p-5 pr-7 text-left transition duration-200 ease-linear hover:bg-gray-100 dark:bg-black dark:text-white  
        ${!open && 'border-b border-dotted '}`}
        type='button'
        onClick={() => setOpen(!open)}
      >
        <div className='flex flex-col '>
          <div className='mb-3 text-xl font-medium'>{title}</div>
        </div>
        <div className='relative h-4 w-4'>
          <Image
            className={`${open && '-rotate-180'}`}
            src='/icons/arrow-up.svg'
            width='15px'
            height='8px'
            alt=''
          />
        </div>
      </button>
      <div
        className={`max-h-0 w-11/12 overflow-hidden bg-white py-0 px-5 duration-300 ease-linear dark:bg-black ${
          open && `max-h-[500px] pb-5`
        }`}
      >
        <p className='border-b border-dotted py-6 dark:text-white '>
          {description}
        </p>
      </div>
    </div>
  );
};
