'use client';

import { Props } from './PlatformsList.types';
import { PlatformCard } from '@/components';

export const PlatformsList = ({ platforms }: Props): JSX.Element => {
  const filteredPlatforms = platforms?.results.filter(
    (platform) =>
      platform.name === 'PC' ||
      platform.name === 'PlayStation 5' ||
      platform.name === 'PlayStation 4' ||
      platform.name === 'Xbox One',
  );
  return (
    <>
      {platforms && platforms?.results.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:aut-fit gap-8 py-4'>
            {filteredPlatforms?.map((platform) => <PlatformCard key={platform.id} platform={platform} />)}
          </div>
        </>
      ) : (
        <p>No platforms found</p>
      )}
    </>
  );
};
