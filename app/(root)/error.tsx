'use client';

import { Button } from '@nextui-org/react';
import { redirect } from 'next/navigation';

const Error = () => {
  const handleButtonClick = () => {
    redirect('/');
  };

  return (
    <div className='flex flex-col items-center justify-center py-24'>
      <div className='text-center'>
        <h1 className='headingText mb-4'>Oops! Something went wrong.</h1>
        <Button onClick={handleButtonClick}>Back to Home</Button>
      </div>
    </div>
  );
};

export default Error;
