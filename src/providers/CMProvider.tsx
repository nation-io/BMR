import {
  CandyMachine,
  Metaplex,
  walletAdapterIdentity,
} from '@metaplex-foundation/js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useCallback,
  useEffect,
  // useMemo,
  useState,
} from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import Button from '@/components/buttons/Button';
import ClipboardIcon from '@/components/icons/Clipboard';

import { registerTransaction, updateUser } from '@/utils/apiCalls';

export const CMContext = createContext<{
  metaplex: Metaplex | null;
  cmTicket: CandyMachine | null;
  cmCompanion: CandyMachine | null;
  mintCm(cmMachine: CandyMachine | null, amount: number): Promise<void>;
  prize: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}>({
  metaplex: null,
  cmTicket: null,
  cmCompanion: null,
  async mintCm(_, __) {
    return;
  },
  prize: 0,
  firstPlace: 0,
  secondPlace: 0,
  thirdPlace: 0,
});

type CMProviderProps<C extends boolean = false> = {
  onMintCm?(): unknown;
  consumer?: C;
} & (C extends true
  ? Pick<React.ComponentProps<typeof CMContext.Consumer>, 'children'>
  : { children: React.ReactNode });

export default function CMProvider<C extends boolean = false>({
  onMintCm,
  consumer = false as C,
  children,
}: CMProviderProps<C>) {
  const connection = useConnection();
  const router = useRouter();
  const { wallet, publicKey, connected } = useWallet();
  const [email, setEmail] = useState<string>('');
  const [metaplex, setMetaplex] = useState<Metaplex | null>(null);
  const [cmTicket, setCmTicket] = useState<CandyMachine | null>(null);
  const [cmCompanion, setCmCompanion] = useState<CandyMachine | null>(null);
  const MySwal = withReactContent(Swal);

  const loadOnChainData = useCallback(async () => {
    const metaplex = Metaplex.make(connection.connection);
    const cmCompanion = await metaplex
      .candyMachines()
      .refresh(
        new PublicKey(process.env.NEXT_PUBLIC_CM_COMPANION_PASS as string)
      )
      .run();

    const cmTicket = await metaplex
      .candyMachines()
      .refresh(new PublicKey(process.env.NEXT_PUBLIC_CM_TICKET as string))
      .run();
    setMetaplex(metaplex);
    setCmTicket(cmTicket);
    setCmCompanion(cmCompanion);
  }, [connection]);

  const submitEmail = async () => {
    MySwal.close();
    MySwal.fire({
      title: (
        <h1 className='font-primary text-[24px] font-[500] text-black'>
          Waiting
        </h1>
      ),
      didOpen: () => {
        MySwal.showLoading();
      },
    });
    if (publicKey) {
      const response = await updateUser({
        wallet: publicKey.toString(),
        email: email,
      });
      const copyLink = () => {
        navigator.clipboard.writeText(
          `${window.location.protocol + '//' + window.location.hostname}
            ?referralCode=${response.id}`
        );
      };

      MySwal.fire({
        title: (
          <>
            <h1 className='font-primary text-[24px] font-[500] text-black'>
              You can referrer someone using this link
            </h1>
            <div
              onClick={copyLink}
              className='flex cursor-pointer flex-row items-center justify-center'
            >
              <b className='text-[14px] font-normal text-blue-600'>
                {window.location.protocol + '//' + window.location.hostname}
                ?referralCode={response.id}
              </b>{' '}
              &nbsp;
              <ClipboardIcon />
            </div>
          </>
        ),
      });
    }
  };
  useEffect(() => {
    if (connection) {
      loadOnChainData();
    }
  }, [connection, loadOnChainData]);

  const mintCm = async (cmMachine: CandyMachine | null, amount: number) => {
    if (connected && wallet && cmMachine) {
      try {
        MySwal.fire({
          title: (
            <h1 className='font-primary text-[24px] font-[500] text-black'>
              Waiting for payment confirmation...
            </h1>
          ),
          loaderHtml: `<div class="spinner-grow text-primary"></div>`,
          didOpen: () => {
            MySwal.showLoading();
          },
        });
        for (let i = 0; i < amount; i++) {
          const mintData = await metaplex
            ?.use(walletAdapterIdentity(wallet?.adapter))
            .candyMachines()
            .mint({
              candyMachine: cmMachine,
            })
            .run();
          if (mintData && publicKey) {
            await registerTransaction({
              mintData,
              candyMachineId: cmMachine.address.toString(),
              wallet: publicKey,
              referralCode: router.query.referralCode
                ? (router.query.referralCode as string)
                : '',
            });
          }
        }
        await loadOnChainData();
        MySwal.hideLoading();
        MySwal.fire({
          showConfirmButton: false,
          html: (
            <div className='flex flex-col items-center'>
              <h1 className='font-primary text-[24px] font-[500] text-black'>
                Thank you for your payment.
              </h1>
              <p className='p-3 font-medium opacity-50'>
                Enter your email to receive event updates before the big day!
              </p>
              <div className='mt-10 flex justify-between rounded-xl border border-[#CCCCCC] p-3'>
                <input
                  className='w-[500px] !border-0 focus:!ring-0'
                  type='email'
                  placeholder='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button onClick={submitEmail} variant='svg-dark'>
                  <span className='ml-1'>Enter</span>
                </Button>
              </div>
            </div>
          ),
        });
        onMintCm?.();
      } catch (e) {
        MySwal.fire({
          html: (
            <>
              <h1 className='font-primary text-[24px] font-[500] text-black'>
                Something went wrong
              </h1>
              <p>Accept the payment transaction or try again</p>
            </>
          ),
        });
      }
    }
  };
  const [prize, setPrize] = useState(0);

  const updatePrize = useCallback(async () => {
    let cmCompanionMinted = 0;
    let cmCompanionPrice = 0;
    let cmTicketMinted = 0;
    let cmTicketPrice = 0;
    if (cmCompanion) {
      cmCompanionMinted = cmCompanion.itemsMinted.toNumber();
      cmCompanionPrice = cmCompanion.price.basisPoints.toNumber();
    }
    if (cmTicket) {
      cmTicketMinted = cmTicket.itemsMinted.toNumber();
      cmTicketPrice = cmTicket.price.basisPoints.toNumber();
    }

    const sol =
      (cmCompanionMinted * cmCompanionPrice + cmTicketMinted * cmTicketPrice) /
      LAMPORTS_PER_SOL;

    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
    );
    const data = await response.json();
    setPrize(sol * data.solana.usd);
  }, [cmCompanion, cmTicket, setPrize]);

  useEffect(() => {
    updatePrize();
  }, [cmCompanion, cmTicket, updatePrize]);

  // const firstPlace = useMemo(() => {
  //   return 50000 + prize * 0.5;
  // }, [prize]);

  // const secondPlace = useMemo(() => {
  //   return 35000 + prize * 0.35;
  // }, [prize]);

  // const thirdPlace = useMemo(() => {
  //   return 15000 + prize * 0.15;
  // }, [prize]);

  const firstPlace = 50000;
  const secondPlace = 35000;
  const thirdPlace = 15000;

  const value = {
    mintCm,
    prize,
    cmTicket,
    cmCompanion,
    metaplex,
    firstPlace,
    secondPlace,
    thirdPlace,
  };

  return (
    <CMContext.Provider value={value}>
      {consumer ? (
        <CMContext.Consumer>
          {children as Exclude<typeof children, React.ReactNode>}
        </CMContext.Consumer>
      ) : (
        (children as React.ReactNode)
      )}
    </CMContext.Provider>
  );
}
