/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @next/next/no-img-element */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
/* eslint-disable  jsx-a11y/alt-text */
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { SolletWalletAdapter } from '@solana/wallet-adapter-sollet';
import { clusterApiUrl } from '@solana/web3.js';
import { AppProps } from 'next/app';
import { useEffect, useMemo } from 'react';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */
require('@solana/wallet-adapter-react-ui/styles.css');

function MyApp({ Component, pageProps }: AppProps) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = process.env.NEXT_PUBLIC_RPC
    ? process.env.NEXT_PUBLIC_RPC
    : clusterApiUrl(network);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolletWalletAdapter()],
    []
  );
  useEffect(() => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js', {
      scope: '/',
    });
  }, []);
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
