/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @next/next/no-img-element */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */
/* eslint-disable  jsx-a11y/alt-text */
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import gsap from "gsap";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import useIsMobile from "@/hooks/useIsMobile";

import Button from "@/components/buttons/Button";
import { Countdown } from "@/components/Hero/Countdown";
import { Modal } from "@/components/Modal";
import { Poll } from "@/components/Poll";

import {
  connectLive,
  getPoll,
  GetPollResponse,
  onStreamLoad,
  votePoll,
} from "@/utils/apiCalls";
import { getFirebaseToken, onMessageListener } from "@/utils/firebase";

export const Hero = ({
  scrollTo,
  prize,
}: {
  scrollTo: (section: string) => void;
  prize: number;
}) => {
  const heroContainer = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(hero);
  const tl = useRef<gsap.core.Timeline>();
  const isMobile = useIsMobile();

  useEffect(() => {
    //==== Handling breakpoints
    const bp = () => {
      const ww = window.innerWidth;
      return {
        isMedium: ww >= 1024 && ww <= 1280,
        isLarge: ww >= 1281 && ww <= 1440,
        isXL: ww >= 1441 && ww <= 1600,
        is2XL: ww >= 1601 && ww <= 1800,
      };
    };

    let intro = {
      scale: 3,
      init: {
        x: "118%",
        y: "122%",
      },
      end: {
        x: "158%",
        y: "162%",
      },
    };

    if (bp().isLarge) {
      intro = {
        scale: 2.5,
        init: {
          x: "90%",
          y: "92%",
        },
        end: {
          x: "158%",
          y: "162%",
        },
      };
    } else if (bp().isMedium) {
      intro = {
        scale: 2.2,
        init: {
          x: "80%",
          y: "80%",
        },
        end: {
          x: "158%",
          y: "162%",
        },
      };
    }

    if (!isMobile) {
      if (tl.current) {
        return;
      }

      document.fonts.ready.then(() => {
        tl.current = gsap
          .timeline()
          .set(q(".logo img"), {
            translateY: "100%",
          })
          .set(hero.current, {
            opacity: 0,
          })
          .set(hero.current, {
            x: intro.end.x,
            y: intro.end.y,
            scale: intro.scale,
            borderRadius: 24,
          })
          .set("html, body", {
            overflow: "hidden",
          })
          .set(q(".description"), {
            opacity: 0,
          })
          .set(q(".kart"), {
            opacity: 0,
          })
          .to(hero.current, {
            opacity: 1,
            x: intro.init.x,
            y: intro.init.y,

            duration: 1.7,
            ease: "power2.inOut",
          })
          .to(hero.current, {
            borderRadius: 0,
            scale: 1,
            x: "0%",
            y: "0%",

            duration: 1.3,
            ease: "expo.inOut",
          })
          .to(
            q(".logo img"),
            {
              translateY: "0%",
              stagger: 0.09,
              ease: "expo.inOut",
              duration: 1.2,
            },
            "-=0.9",
          )
          .to("html, body", {
            overflow: "auto",
          })
          .to(
            q(".kart"),
            {
              opacity: 1,
              duration: 1.4,
              ease: "power4.out",
            },
            "-=0.5",
          )
          .to(
            q(".description"),
            {
              opacity: 1,
              duration: 1.4,
              ease: "power4.out",
            },
            "-=0.6",
          );
      });
    } else {
      tl.current?.progress(100).kill();
    }
  }, [isMobile, q]);
  const { publicKey, connected } = useWallet();
  const [notification, setNotification] = useState({
    title: "",
    body: "",
    image: "",
  });
  const handleConnect = async (publicKey: string) => {
    const token = await getFirebaseToken();
    await connectLive({ wallet: publicKey, token: token ? token : "" });
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

  const [
    streamViewerNFTRewardTransaction,
    setStreamViewerNFTRewardTransaction,
  ] = useState<string | null>(null);
  useEffect(() => {
    if (connected && publicKey) {
      onStreamLoad({ wallet: publicKey.toBase58() }).then((_streamLoad) => {
        // do something
        if (_streamLoad.signature) {
          setStreamViewerNFTRewardTransaction(_streamLoad.signature);
        }
      }).catch((_e) => {
        setStreamViewerNFTRewardTransaction(null);
      });
    }
  }, [connected, publicKey]);

  const [poll, setPoll] = useState<GetPollResponse["poll"] | null>(null);
  const [pollChoice, setPollChoice] = useState<number | null>(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (connected && publicKey) {
        getPoll({ wallet: publicKey.toBase58() }).then((_poll) => {
          if (_poll.status !== "error" && _poll.poll) {
            setPoll((_p) => {
              if (_p && _poll.poll && _p.id !== _poll.poll.id) {
                setPollChoice(null);
                return _poll.poll;
              } else if (!_p && _poll.poll) {
                setPollChoice(null);
                return _poll.poll;
              } else {
                return _p;
              }
            });
          } else {
            setPoll(null);
            setPollChoice(null);
          }
        }).catch((_e) => {
          setPoll(null);
          setPollChoice(null);
        });
      }
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, [connected, publicKey]);

  const onPollExit = useCallback(() => {
    setPoll(null);
    setPollChoice(null);
  }, []);

  const onPollSubmit = useCallback(() => {
    if (publicKey && poll && pollChoice) {
      votePoll({
        wallet: publicKey.toBase58(),
        pollId: poll.id,
        choiceId: pollChoice,
      });
    }
  }, [poll, pollChoice, publicKey]);

  const onNFTRewardExit = useCallback(() => {
    setStreamViewerNFTRewardTransaction(null);
  }, []);

  return (
    <div className="w-full bg-white no-scrollbar overflow-hidden">
      <Modal
        width="w-[40%]"
        title="Enjoy"
        action="Close"
        showing={!!streamViewerNFTRewardTransaction}
        onClose={onNFTRewardExit}
        onSubmit={onNFTRewardExit}
        actionable={true}
      >
        <div className="relative p-6 pb-9 flex-auto justify-center">
          <div className="text-xl font-light">
            You have received an NFT for watching!
          </div>
        </div>
      </Modal>
      <Modal
        height="h-[500px]"
        width="w-[40%]"
        title="Poll"
        description={poll ? poll.description : ""}
        action="Cast vote"
        showing={!!poll && !streamViewerNFTRewardTransaction}
        onClose={onPollExit}
        onSubmit={onPollSubmit}
        actionable={!!pollChoice}
      >
        {!!poll && (
          <Poll
            poll={poll}
            choice={pollChoice}
            setChoice={(checked: number) => {
              setPollChoice((_choice) => {
                if (_choice === checked) {
                  return null;
                } else {
                  return checked;
                }
              });
            }}
          />
        )}
      </Modal>
      <div className="h-screen md:block" ref={heroContainer}>
        <div className="relative relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#015EFF] to-[#4AC3FF] bg-cover bg-no-repeat">
          {!connected
            ? (
              <div className="z-10 hidden sm:block">
                <WalletMultiButton className="bg-transparent hover:!bg-white hover:!text-black">
                  {" "}
                  Connect your wallet to watch the stream
                </WalletMultiButton>
              </div>
            )
            : (
              <iframe
                width="100%"
                height="100%"
                src={`https://player.twitch.tv/?channel=buildwithnation&parent=${window.location.hostname}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="hidden sm:block"
              >
              </iframe>
            )}
          {!connected && (
            <div className="absolute h-full w-full p-5">
              <div className="logo right absolute right-[0px] my-10 flex max-w-[100vw] flex-col justify-start self-end md:max-w-[40vw] lg:my-0 lg:pr-7">
                <div className="overflow-hidden">
                  <Image
                    src="/images/logo-white-1.svg"
                    alt="The 2022 Bear Market Rally Logo"
                    width={679}
                    height={150}
                    quality={10}
                  />
                </div>
                <div className="overflow-hidden">
                  <Image
                    src="/images/logo-white-2.svg"
                    alt="The 2022 Bear Market Rally Logo"
                    width={679}
                    height={150}
                    quality={10}
                  />
                </div>
                <div className="overflow-hidden">
                  <Image
                    src="/images/logo-white-3.svg"
                    alt="The 2022 Bear Market Rally Logo"
                    width={679}
                    height={150}
                    quality={10}
                  />
                </div>
              </div>
              <div className="description absolute bottom-8 flex w-fit flex-col justify-between gap-10 pl-0 pb-8 pr-4 xl:bottom-0">
                <p
                  style={{ textShadow: "0px 4px 64px rgba(0, 0, 0, 0.25)" }}
                  className="text-2xl font-medium !leading-9 tracking-tight text-white lg:text-4xl"
                >
                  A go-kart race for the
                  <br className="hidden sm:block" /> Solana ecosystem.{" "}
                  <br className="hidden sm:block" />
                  The most competitive
                  <br className="hidden sm:block" /> event of the year.
                </p>
                <div className="flex flex-col justify-between gap-10">
                  <p
                    style={{ textShadow: "0px 4px 44px rgba(0, 0, 0, 0.25)" }}
                    className="text-xl font-normal leading-5 tracking-normal text-white"
                  >
                    ${Math.round(prize).toLocaleString()} Prize Pool <br />{" "}
                    50 participants <br /> 100% Ridiculous
                  </p>

                  <p
                    style={{ textShadow: "0px 4px 44px rgba(0, 0, 0, 0.25)" }}
                    className="text-xl font-normal leading-5 tracking-normal text-white"
                  >
                    Lisbon, Portugal <br /> November 6, 2022 <br />{" "}
                    All-day event
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="block min-h-screen w-full md:hidden">
        <div className="relative flex w-full flex-col bg-gradient-to-b from-[#015EFF] to-[#4AC3FF] bg-cover bg-no-repeat py-10 px-7 text-white lg:opacity-0">
          <div className="relative top-0 z-10 w-full">
            <Countdown />
            <div className="mt-10 w-full">
              <Image
                src="/images/logo-white-mobile.svg"
                alt="The Bear Market Rally"
                width={285}
                height={187}
                priority
              />
            </div>
            <div className="space-y-8 py-12">
              <h4 className="text-3xl font-medium">
                A go-kart race for <br />
                the Solana ecosystem.
                <br />
                The most competitive <br />
                event of the year.
              </h4>
              <p className="leading-2 text-xl">
                ${Math.round(prize).toLocaleString()} Pool <br />
                25 cars, 50 participants
                <br />
                100% Ridiculous
              </p>
              <p className="leading-2 text-xl">
                Lisbon, Portugal
                <br />
                November 6, 2022
                <br />
                All-day event
              </p>
              <Button
                onClick={() => scrollTo("buy-tickets")}
                variant="dark"
                className="self-start"
              >
                Buy tickets
              </Button>
            </div>
          </div>
          <div
            className='absolute top-0 left-0 z-0 h-full w-full bg-[url("/images/hero-bg.png")] bg-no-repeat'
            style={{ backgroundPosition: "80% 140px", backgroundSize: "290%" }}
          >
          </div>
        </div>
      </div>
    </div>
  );
};
