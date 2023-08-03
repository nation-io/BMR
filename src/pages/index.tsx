import mailgo from 'mailgo';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Element, scroller as scroll } from 'react-scroll';

import { BuyTicket } from '@/components/BuyTicket/BuyTicket';
import { Hero } from '@/components/Hero';
import { Introduction } from '@/components/Introduction';
import { Footer } from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import { Prizes } from '@/components/Prizes/Prizes';
import RaceEntrySection from '@/components/Sections/RaceEntrySection';
import { Sponsor } from '@/components/Sections/Sponsor';
import { SubscribeEmail } from '@/components/SubscribeEmail';

import CMProvider, { CMContext } from '@/providers/CMProvider';

// const ENTRANT_TICKET_LIST = [
//   {
//     title: 'Race Participation',
//     description: 'Double elimination: two races no matter what',
//     icon: 'car.svg',
//   },
//   {
//     title: 'Branded racing suit',
//     description: 'Includes jumpsuit and helmet customization',
//     icon: 'person.svg',
//   },
//   {
//     title: 'Livestream logo placement',
//     description: 'Your team or company’s logo on the livestream',
//     icon: 'library.svg',
//   },
//   {
//     title: 'Exclusive entrant merch',
//     description: 'Exclusive gifts for all racers',
//     icon: 'gift.svg',
//   },
//   {
//     title: 'Special photo and video content',
//     description: 'Content from the day and commemorative media',
//     icon: 'circle-packing.svg',
//   },
// ];

const BACKSEAT_TICKET_LIST = [
  {
    title: 'Vote on power-ups and debuffs',
    description: 'Boost your favorite racers and impact your foes',
    icon: 'road-weather.svg',
  },
  {
    title: 'Moments, Minted',
    description: 'Rare highlights from the race gifted into your wallet',
    icon: 'image.svg',
  },
  {
    title: 'Custom stickers',
    description: 'The most classy of stickers for your sticking desire',
    icon: 'diamond.svg',
  },
  {
    title: 'Bonus Content',
    description: 'Add a song to the race playlist and access bonus features',
    icon: 'gift.svg',
  },
];

const HomePage = () => {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prizeDivRef = useRef<HTMLDivElement | null>(null);

  // const handleOpenMenu = () => {
  //   setMobileMenuOpen(!mobileMenuOpen);
  // };

  const scrollTo = (section: string) => {
    scroll.scrollTo(section, {
      duration: 500,
      delay: 100,
      smooth: true,
      offset: -50, // Scrolls to element + 50 pixels down the page
    });
  };

  useEffect(() => {
    mailgo();
  }, []);

  return (
    <CMProvider onMintCm={() => prizeDivRef.current?.scrollIntoView()}>
      <CMContext.Consumer>
        {({ cmCompanion, mintCm, firstPlace, secondPlace, thirdPlace }) => (
          <Layout>
            <main className='relative flex w-full flex-col items-center antialiased'>
              <Hero
                scrollTo={scrollTo}
                prize={firstPlace + secondPlace + thirdPlace}
              />
              <div className='flex w-full flex-col justify-center'>
                <Introduction />
                <Element
                  name='prizes'
                  className='flex w-full flex-col items-center border-t-[1px] border-[#CCC]'
                >
                  <div className='flex w-full justify-center'>
                    <div className='w-full md:px-10 lg:px-20 2xl:px-12'>
                      <div
                        ref={prizeDivRef}
                        className='flex py-14 px-14 md:py-[5rem] md:px-0'
                      >
                        <div className='mx-auto flex flex-col gap-8'>
                          <h2 className='text-4xl font-medium md:text-start lg:text-7xl xl:text-8xl'>
                            Real stakes. <br />
                            Real prizes.
                          </h2>
                          <p className='text-sm opacity-70 md:text-start md:text-base'>
                            <b>20%</b> of your ticket goes to the prize and{' '}
                            <br className='hidden md:block' />
                            charity pool of the race. The pools will adjust
                            live.
                          </p>
                          <div className='hidden md:flex'>
                            <div className='flex h-20 items-center rounded-xl border p-3 px-5'>
                              <Image
                                src='/images/lisbon-flag.svg'
                                width={48}
                                height={32}
                                alt='Lisbon'
                              />
                              <p className='ml-3'>
                                $20,000 will be donated to{' '}
                                <br className='hidden md:block' /> local
                                Portuguese charities.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Prizes
                    firstPlace={firstPlace}
                    secondPlace={secondPlace}
                    thirdPlace={thirdPlace}
                  />
                  <div className='w-full px-4 md:hidden'>
                    <div className='mt-14 flex w-full flex-col items-center justify-center gap-5 rounded-xl border p-5'>
                      <Image
                        src='/images/lisbon-flag.svg'
                        alt='portugal'
                        width={48}
                        height={32}
                      />
                      <p className='ml-3 text-xl'>
                        $20,000 will be donated to <br /> local Portuguese
                        charities.
                      </p>
                    </div>
                  </div>
                </Element>
                <Element name='buy-tickets' className='pb-10'>
                  {/* <RaceEntrySection
                    raceEntryTicketImage='/images/ticket-race-entry.png'
                    buyTicketForm={
                      <BuyTicket
                        title='Race Entry'
                        items={ENTRANT_TICKET_LIST}
                        candyMachine={cmTicket}
                        mintCm={mintCm}
                        isMailto={true}
                      />
                    }
                  >
                    <RaceEntrySection.Heading>
                      Register to <br className='hidden lg:block' /> compete.
                    </RaceEntrySection.Heading>
                    <RaceEntrySection.Description>
                      Your entrant ticket grants you access to participation in
                      the race, <br className='hidden lg:block' />a chance at
                      the prize pool, and all the perks listed on the right.
                    </RaceEntrySection.Description>
                  </RaceEntrySection> */}
                  <RaceEntrySection
                    raceEntryTicketImage='/images/ticket-backseat-driver.png'
                    buyTicketForm={
                      <BuyTicket
                        title='The Backseat Driver Pass'
                        items={BACKSEAT_TICKET_LIST}
                        candyMachine={cmCompanion}
                        mintCm={mintCm}
                      />
                    }
                  >
                    <RaceEntrySection.Heading>
                      Impact the <br className='hidden sm:block' />
                      race from <br className='hidden lg:block' />
                      home.
                    </RaceEntrySection.Heading>
                    <RaceEntrySection.Description className='max-w-md'>
                      Not making it to Lisbon?
                      <br /> <br />
                      Pass holders vote on power ups and debuffs{' '}
                      <br className='hidden sm:block' />
                      for racers in real-time, and get special moments{' '}
                      <br className='hidden sm:block' />
                      from the race minted as NFTs. <br className='md:hidden' />
                      <br className='md:hidden' />
                      Get special bonus <br className='hidden md:block' />
                      content, <br className='sm:hidden' />
                      and some stickers, too.
                    </RaceEntrySection.Description>
                  </RaceEntrySection>
                </Element>

                <Sponsor />

                <SubscribeEmail />
              </div>
              <Footer />
            </main>
          </Layout>
        )}
      </CMContext.Consumer>
    </CMProvider>
  );
};

export default HomePage;
