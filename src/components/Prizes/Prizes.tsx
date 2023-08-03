import Place from '@/components/Place';

export const Prizes = ({
  firstPlace,
  secondPlace,
  thirdPlace,
}: {
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
}): JSX.Element => {
  return (
    <>
      <div className='flex w-full flex-col gap-5 md:flex-row md:items-end md:justify-center md:gap-0'>
        <Place
          className='order-2 md:order-1'
          iconSize={34}
          aspectRatioStyle='aspect-[1/1] md:aspect-[1/1.3]'
          position='2nd'
          prize={secondPlace}
          rewards={
            <div>
              Physical + NFT trophy <br />
            </div>
          }
        />
        <Place
          className='order-1 md:order-2'
          iconSize={34}
          aspectRatioStyle='aspect-[1/1.4] md:aspect-[1/1.9]'
          position='1st'
          prize={firstPlace}
          rewards={
            <div>
              Physical + NFT trophy <br />
              Bragging rights <br />
            </div>
          }
        />
        <Place
          className='order-3'
          iconSize={34}
          aspectRatioStyle='aspect-[1/0.7] md:aspect-[1/0.9]'
          position='3rd'
          prize={thirdPlace}
          rewards={
            <div>
              Physical + NFT trophy <br />
            </div>
          }
        />
      </div>
    </>
  );
};
