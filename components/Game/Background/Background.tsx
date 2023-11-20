import Image from 'next/image';
import { Props } from './Background.types';

export const Background = ({ src }: Props) => (
  <div className='z-30'>
    <div className='absolute top-0 left-0 w-full h-[500px] z-20'>
      <div className='h-[600px]'>
        <div style={{ zIndex: 20, height: 600, backgroundColor: 'transparent' }}>
          <div className='relative h-full w-full'>
            <Image src={src} fill className='object-cover' alt='Background Image' priority />
            <div
              className='absolute top-0 left-0 w-full h-full'
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(23, 23, 23, 0), rgb(23, 23, 23)),linear-gradient(to bottom, rgba(23, 23, 23, 0.5), rgba(23, 23, 23, 0.5))`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
