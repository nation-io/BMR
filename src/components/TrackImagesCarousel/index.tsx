import Image from 'next/image';
import { FunctionComponent, useEffect, useRef } from 'react';

import 'flickity/dist/flickity.min.css';

const TrackImagesCarousel: FunctionComponent = () => {
  const carousel = useRef<HTMLDivElement>(null);
  const flickity = useRef<Flickity>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('flickity').then(({ default: Flickity }) => {
        if (carousel.current) {
          flickity.current = new Flickity(carousel.current, {
            autoPlay: true,
            wrapAround: true,
            pageDots: false,
          });
        }
      });

      return () => flickity.current?.destroy();
    }
  }, []);

  return (
    <>
      <div
        className='main-carousel mt-10 [&_.flickity-prev-next-button]:h-8 [&_.flickity-prev-next-button]:w-8'
        ref={carousel}
      >
        {new Array(5).fill(0).map((_, index) => (
          <div key={'slide-' + index} className='carousel-cell'>
            <div className='mx-2 aspect-video w-[90vw] md:w-[70vw]'>
              <Image
                width={1164}
                height={656}
                layout='responsive'
                src={`/images/track/slide-${index + 1}.png`}
                alt={`Track Image ${index + 1}`}
                className='rounded-2xl object-cover'
              />
            </div>
          </div>
        ))}
      </div>
      <p className='py-2 pl-[10vw] text-neutral-500 lg:pl-[15vw] '>
        Current 3D Renderings
      </p>
    </>
  );
};

export default TrackImagesCarousel;
