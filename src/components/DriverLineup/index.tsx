import Image from 'next/image';
import Marquee from 'react-fast-marquee';

import useIsMobile from '@/hooks/useIsMobile';

const drivers = [
  {
    img: '/drivers/Degen Ape Academy Logo/DAA Mascot Logo - Standard BW.svg',
    name: 'Degenerate Ape Academy',
    tag: '@DegenApeAcademy',
  },
  {
    img: '/drivers/Degen Trash Panda Logo/DTP Mascot Logo - BW.svg',
    name: 'Degen Trash Pandas',
    tag: '@DegenTrashPanda',
  },
  {
    img: '/icons/drivers/kyle.png',
    name: 'Composability Kyle',
    tag: '@KyleSamani',
  },
  {
    img: '/icons/drivers/joe.png',
    name: 'Joe Mccann',
    tag: '@joemccann',
  },
  {
    img: '/drivers/Allbridge Logo/Allbridge logo.svg',
    name: 'Allbridge',
    tag: '@Allbridge_io',
  },
  {
    img: '/drivers/Asymmetric Logo/asymmetric-logo.svg',
    name: 'Asymmetric',
    tag: '@goasymmetric',
  },
  {
    img: '/drivers/Backpack Logo/backpack_logo__large--black.svg',
    name: 'Backpack',
    tag: '@xNFT_Backpack',
  },
  {
    img: '/drivers/Cardinal Logo/cardinal.svg',
    name: 'Cardinal',
    tag: '@cardinal_labs',
    class: 'bg-black',
  },
  {
    img: '/drivers/Clockwork Logo/clockwork-logo-black.svg',
    name: 'Clockwork',
    tag: '@clockwork_xyz',
  },
  {
    img: '/drivers/Defi Land Logo/defiland.png',
    name: 'DeFi Land',
    tag: '@DeFi_Land',
  },
  {
    img: '/drivers/Fractal Logo/Icon_White_Pink.svg',
    name: 'Fractal',
    tag: '@fractalwagmi',
  },
  {
    img: '/drivers/Hedge Logo/Hedge-Banner-Dark.png',
    name: 'Hedge',
    tag: '@HedgeLabs',
    class: 'bg-black',
  },
  {
    img: '/drivers/Hivemapper Logo/Blue/SVG/Hivemapper_Logomark_Blue.svg',
    name: 'Hivemapper',
    tag: '@Hivemapper',
  },
  {
    img: '/drivers/Holaplex Logo/enterprise.svg',
    name: 'Holaplex',
    tag: '@holaplex',
    class: 'bg-black',
  },
  {
    img: '/drivers/Hotline Logo/hotline_black@2x.svg',
    name: 'Hotline',
    tag: '@hotlinexyz',
  },
  {
    img: '/drivers/Jito Logo/Final Wordmark.png',
    name: 'Jito',
    tag: '@jito_labs',
    class: 'bg-black',
  },
  {
    img: '/drivers/m2six Logo/SVG/Layer 2.svg',
    name: 'mixmob',
    tag: '@MixMobOrigin',
  },
  {
    img: '/drivers/NATION Logo/NATION-Black-Racesuit-Patch.png',
    name: 'NATION',
    tag: '@buildwithnation',
  },
  {
    img: '/drivers/Neodyme Logo/neodyme-filled.svg',
    name: 'Neodyme',
    tag: '@Neodyme',
  },
  {
    img: '/drivers/Notifi Logo/Notifi_FullMark_FullColor.svg',
    name: 'Notifi',
    tag: '@NotifiNetwork',
  },
  {
    img: '/drivers/Otter Security Logo/logo-dark.png',
    name: 'OtterSec',
    tag: '@osec_io',
  },
  {
    img: '/drivers/Pyth Logo/pyth_logo_lockup_dark.png',
    name: 'Pyth',
    tag: '@PythNetwork',
  },
  {
    img: '/drivers/Race Capital Logo/RC-Logo01-ReverseWhite.png',
    name: 'Race Capital',
    tag: '@RaceCapital',
    class: 'bg-black',
  },
  {
    img: '/drivers/Samoyedcoin Logo/samoyedcoin_logo_color_96.svg',
    name: 'Samoyedcoin',
    tag: '@samoyedcoin',
  },
  {
    img: '/drivers/Solana Foundation Logo/logomark.svg',
    name: 'Solana Foundation',
    tag: '@SolanaFndn',
  },
  {
    img: '/drivers/Solana Spaces Logo/solanaspaces_logo_black.svg',
    name: 'Solana Spaces',
    tag: '@solanaspaces',
  },
  {
    img: '/drivers/Solend Logo/sendlend-logo-vector.svg',
    name: 'Solend',
    tag: '@solendprotocol',
  },
  {
    img: '/drivers/Somewhere Street Logo/Black_Icon Logo.png',
    name: 'Somewhere Street',
    tag: '@swsxyz',
  },
  {
    img: '/drivers/Switchboard Logo/light-icon-word.svg',
    name: 'Switchboard',
    tag: '@switchboardxyz',
  },
  {
    img: '/drivers/Symmetry Logo/LogoOnly.svg',
    name: 'Symmetry',
    tag: '@symmetry_fi',
  },
  {
    img: '/drivers/Teleport Logo/logo_neon_black_big TRANSPARENT.png',
    name: 'Teleport',
    tag: '@teleport',
  },
];

export const DriverLineup = () => {
  const isMobile = useIsMobile();

  return (
    <div className='overflow-hidden py-16'>
      <h1 className='text-center text-5xl font-medium leading-none tracking-tight lg:my-14 lg:text-7xl 2xl:my-0 2xl:mt-20 2xl:text-8xl'>
        Driver
        <br className='block md:hidden' /> Lineup
      </h1>

      <div className='w-screen md:-mt-16 2xl:-mt-10'>
        <Marquee
          gradient={false}
          speed={(isMobile ? 400 : 4000) / drivers.length}
          className=' pt-10 md:py-24 2xl:py-40 [&_.marquee:not(:hover)]:z-[0] [&_.marquee]:justify-around'
        >
          {drivers.map((driver) => (
            <DriverCard key={driver.tag} driver={driver} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

const DriverCard = ({
  driver,
}: React.PropsWithoutRef<{ driver: typeof drivers[number] }>) => {
  return (
    <div className='z-[1] mx-2 flex aspect-[1/1.2] w-64 flex-col items-center justify-center rounded-xl border bg-white py-20 px-2 shadow-[#0005] transition-all  duration-200 lg:w-[28vw] lg:cursor-pointer lg:py-0 lg:hover:z-10 lg:hover:scale-125 lg:hover:shadow-xl 2xl:w-[23vw]'>
      <div className='relative aspect-square w-32 rounded lg:w-[10vw]'>
        <Image
          className={`rounded-full ${driver.class}`}
          src={driver.img}
          width={200}
          height={200}
          layout='responsive'
          objectFit='scale-down'
          alt={driver.name}
        />
      </div>

      <h4 className='mt-5 font-medium md:text-xl 2xl:mt-12 2xl:text-3xl'>
        {driver.name}
      </h4>
      <p className='2xl:mt-5'>
        <a
          className='break-words text-base font-medium text-black opacity-70 md:text-lg 2xl:text-3xl'
          href={`https://twitter.com/${driver.tag.slice(1)}`}
          target='_blank'
          rel='noreferrer'
        >
          {driver.tag}
        </a>
      </p>
    </div>
  );
};
