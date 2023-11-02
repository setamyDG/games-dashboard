'use client';

import { Button } from '@nextui-org/button';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  return (
    <div className='flex flex-col items-center justify-center py-24'>
      <div className='text-center'>
        <h1 className='headingText mb-4'>Oops! Something went wrong.</h1>
        <Button onClick={() => router.push('/')} color='danger' variant='shadow'>
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Error;
