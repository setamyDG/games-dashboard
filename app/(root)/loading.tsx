import { Card, Skeleton } from '@nextui-org/react';
import React from 'react';
const Loading = () => (
  <>
    <Card className='space-y-5 p-4' radius='lg'>
      <div className='space-y-3'>
        <Skeleton className='w-3/5 rounded-lg'>
          <div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
        </Skeleton>
        <Skeleton className='w-4/5 rounded-lg'>
          <div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
        </Skeleton>
        <Skeleton className='w-2/5 rounded-lg'>
          <div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
        </Skeleton>
      </div>
    </Card>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:aut-fit gap-8 py-4 my-8'>
      {Array.from({ length: 10 }).map((_, i) => (
        <Card key={i} className='space-y-5 p-4' radius='lg'>
          <div className='space-y-3'>
            <Skeleton className='rounded-lg'>
              <div className='h-24 rounded-lg bg-default-300'></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  </>
);

export default Loading;
