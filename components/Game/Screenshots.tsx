'use client';

import Image from 'next/image';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { operations } from '@/customTypes/apiTypes';

import 'react-photo-view/dist/react-photo-view.css';

type Props = {
  screenShots: operations['games_screenshots_list']['responses']['200']['content']['application/json'];
};

const Screenshots = ({ screenShots }: Props) => {
  return (
    <PhotoProvider>
      {screenShots.results.map((screenShot) => (
        <PhotoView key={screenShot.id} src={screenShot.image as string}>
          <Image
            src={screenShot.image as string}
            width={400}
            height={300}
            priority
            alt={String(screenShot?.id)}
            className='rounded-xl cursor-pointer'
          />
        </PhotoView>
      ))}
    </PhotoProvider>
  );
};

export default Screenshots;
