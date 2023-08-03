/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @next/next/no-img-element */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
/* eslint-disable  jsx-a11y/alt-text */
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "firebase/messaging";

import Button from "@/components/buttons/Button";
import Layout from "@/components/layout/Layout";

import { connectLive } from "@/utils/apiCalls";
import { getFirebaseToken, onMessageListener } from "@/utils/firebase";

const Live = () => {
  const { publicKey, connected, disconnect } = useWallet();
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    image: "",
  });
  const handleConnect = async (publicKey: string) => {
    const token = await getFirebaseToken();
    if (token) {
      await connectLive({ wallet: publicKey, token: token });
    }
  };

  const ToastDisplay = useCallback(() => {
    return (
      <div className="flex">
        <div>
          <p>
            <b>{notification?.title}</b>
          </p>
          <p>{notification?.body}</p>
        </div>
        <img className="ml-3 mr-3 h-10 w-10" src={notification?.image} />
      </div>
    );
  }, [notification]);
  useEffect(() => {
    if (connected && publicKey) {
      handleConnect(publicKey.toString());
    }
  }, [connected, publicKey]);

  useEffect(() => {
    if (notification.title) {
      toast(<ToastDisplay />);
    }
  }, [notification, ToastDisplay]);
  onMessageListener()
    .then((payload) => {
      setNotification(payload as any);
    })
    .catch((err) => err);
  return (
    <Layout>
      <main className="relative flex w-full flex-col items-center antialiased">
        {!connected
          ? (
            <div className="flex h-[550px] w-full items-center justify-center border border-dark bg-gray-900">
              <div>
                <WalletMultiButton className="bg-transparent">
                  {" "}
                  Connect your wallet to watch the stream
                </WalletMultiButton>
              </div>
            </div>
          )
          : (
            <iframe
              width="100%"
              height="800px"
              src={`https://player.twitch.tv/?channel=buildwithnation&parent=${window.location.hostname}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            >
            </iframe>
          )}
        {connected && (
          <div>
            {publicKey!.toString()}
            <Button
              onClick={() => {
                disconnect();
              }}
            >
              Disconnect
            </Button>
          </div>
        )}
      </main>
    </Layout>
  );
};

export default Live;
