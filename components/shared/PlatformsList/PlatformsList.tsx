'use client';

import { Props } from './PlatformsList.types';
import PlatformCard from '@/components/PlatformCard/PlatformCard';

const PlatformsList = ({ platforms }: Props): JSX.Element => {
  return (
    <>
      {platforms && platforms?.results.length > 0 ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:aut-fit gap-8 py-4'>
            {platforms?.results.map((platform) => <PlatformCard key={platform.id} platform={platform} />)}
          </div>
        </>
      ) : (
        <p>No platforms found</p>
      )}
    </>
  );
};

export default PlatformsList;
