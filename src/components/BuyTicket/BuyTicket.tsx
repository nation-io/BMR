import { CandyMachine } from '@metaplex-foundation/js';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import Image from 'next/image';
import { useMemo, useState } from 'react';

interface ItemProps {
  title: string;
  description: string;
  icon: string;
}

interface BuyTicketProps {
  title: string;
  items: ItemProps[];
  mintCm: (cm: CandyMachine | null, number: number) => void;
  candyMachine: CandyMachine | null;
  isMailto?: boolean;
}

export const BuyTicket = ({
  title,
  items,
  mintCm,
  candyMachine,
  isMailto = false,
}: BuyTicketProps) => {
  const [number, setNumber] = useState(1);
  const { connected } = useWallet();
  const realValue = useMemo(() => {
    if (candyMachine) {
      return (
        (candyMachine.price.basisPoints.toNumber() / LAMPORTS_PER_SOL) * number
      );
    } else {
      return 0;
    }
  }, [candyMachine, number]);

  const innerPaddingStyle = 'px-5 md:px-8 xl:px-10';

  return (
    <div className='z-10 flex w-[33vw] min-w-[360px] flex-col rounded-xl border border-[#CCC] bg-white shadow-lg md:min-w-[380px] md:border-none xl:w-[35vw] 2xl:w-[26vw]'>
      <div className={innerPaddingStyle}>
        <div className='flex items-center justify-between border-b-[2px] border-dotted py-6 2xl:py-10'>
          <div className='flex flex-row items-center'>
            <h2 className='text-2xl font-medium 2xl:text-3xl'>{title}</h2>
          </div>
          <div className='flex h-6'>
            <div
              className='flex cursor-pointer items-center rounded-l border p-2 hover:bg-neutral-300 2xl:p-4'
              onClick={() => {
                number > 1 ? setNumber(number - 1) : null;
              }}
            >
              -
            </div>
            <div className='flex items-center border-y p-2 2xl:p-4'>
              {number}
            </div>
            <div
              className='flex cursor-pointer items-center rounded-r border p-2 hover:bg-neutral-300 2xl:p-4'
              onClick={() => {
                setNumber(number + 1);
              }}
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div className='py-4 md:h-auto'>
        {items.map((item, index) => {
          return (
            <div
              key={index}
              className='flex items-center px-5 pb-5 lg:px-8 2xl:px-10 2xl:pb-10'
            >
              <Image
                width={24}
                height={24}
                src={`/icons/${item.icon}`}
                alt={item.icon}
              ></Image>
              <div className='ml-5 2xl:ml-10'>
                <p className='font-medium'>{item.title}</p>
                <p className='text-sm opacity-50 xl:text-base'>
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {!isMailto && (
        <div className={innerPaddingStyle}>
          <div className='flex justify-between border-t-[2px] border-dotted py-4 text-2xl md:py-3 lg:py-4'>
            <p className='text-base font-medium'>Total</p>
            <p className='text-base font-medium'>
              {realValue.toFixed(1)} SOL{' '}
              {/* <Image
              src='/icons/tag-blue.svg'
              alt='tag'
              width='16px'
              height='16px'
            ></Image> */}
            </p>
          </div>
        </div>
      )}
      <div
        onClick={() => mintCm(candyMachine, number)}
        className='flex cursor-pointer items-center justify-center rounded-b-lg bg-black py-3 hover:bg-[#1a1f2e]'
      >
        {isMailto ? (
          <div>
            <a
              href='mailto:sponsor@nation.io'
              className='font-medium text-white 2xl:text-3xl'
            >
              Get in Touch
            </a>
          </div>
        ) : connected ? (
          <p className='font-medium text-white 2xl:text-3xl'>Go to payment</p>
        ) : (
          <WalletMultiButton className='bg-transparent' />
        )}
      </div>
    </div>
  );
};
