import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';
import { DoubleArrowRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import { Props } from './NavigationButtonLink.types';

export const NavigationButtonLink = ({ slug, name }: Props): JSX.Element => (
  <Tooltip
    showArrow
    color='secondary'
    content={
      <div className='px-1 py-2'>
        <div className='text-small font-bold'>{name}</div>
        <div className='text-tiny'>Dive in and check the information you need</div>
      </div>
    }
  >
    <Link href={slug}>
      <Button isIconOnly variant='shadow' aria-label='GameSlug'>
        <DoubleArrowRightIcon />
      </Button>
    </Link>
  </Tooltip>
);
