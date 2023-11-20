import Image from 'next/image';
import React, { Fragment } from 'react';
import { Props } from './Platforms.types';

const availablePlatforms = ['PC', 'PlayStation 5', 'PlayStation 4', 'Xbox One'];
const mappedAvailablePlatformsToImages = {
  PC: '/pc.svg',
  'PlayStation 5': '/ps.svg',
  'PlayStation 4': '/ps.svg',
  'Xbox One': '/xbox.svg',
};

const mappedNamesToPlatforms = {
  PC: 'PC',
  'PlayStation 5': 'PS5',
  'PlayStation 4': 'PS4',
  'Xbox One': 'Xbox One',
};

export const Platforms = ({ platforms }: Props): JSX.Element => {
  const filteredPlatforms = platforms
    ?.filter((platform) => availablePlatforms.includes(platform?.platform?.name as string))
    .sort((a, b) => String(a?.platform?.name).localeCompare(String(b?.platform?.name)));

  return (
    <>
      {filteredPlatforms?.map((platform) => (
        <Fragment key={platform?.platform?.id}>
          <Image
            src={
              mappedAvailablePlatformsToImages[
                platform?.platform?.name as keyof typeof mappedAvailablePlatformsToImages
              ]
            }
            alt={platform?.platform?.name as string}
            width={20}
            height={20}
            priority
          />
          <p className='text-white text-xs hidden xl:block'>
            {mappedNamesToPlatforms[platform?.platform?.name as keyof typeof mappedNamesToPlatforms]}
          </p>
        </Fragment>
      ))}
    </>
  );
};
