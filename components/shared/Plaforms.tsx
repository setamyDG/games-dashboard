import Image from 'next/image';
import React, { Fragment } from 'react';
import { availablePlatforms, mappedAvailablePlatformsToImages } from '../Home/const/platforms';
import { GamePlatforms } from '../Home/GameCard/GameCard.types';

type Props = {
  platforms: GamePlatforms;
};

const Platforms = ({ platforms }: Props) => {
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
          />
          <p className='text-white text-xs hidden xl:block'>{platform?.platform?.name}</p>
        </Fragment>
      ))}
    </>
  );
};

export default Platforms;
