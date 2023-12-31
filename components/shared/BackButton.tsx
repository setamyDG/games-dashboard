'use client';

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      className='text-white'
      variant='shadow'
      color='warning'
      isIconOnly
      onClick={() => router.back()}
      startContent={<ArrowLeftOutlined />}
    />
  );
};
