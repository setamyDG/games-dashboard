import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/react';
import { RocketIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';
import { Props } from './BuyButton.types';

export const BuyButton = ({ slug, game, placement = 'left' }: Props): JSX.Element | null => {
  const ps5Link = 'https://www.playstation.com/en-us/';
  const isButtonDisabled = game?.platforms?.find((platform) => platform?.platform?.name === 'PlayStation 5')
    ? false
    : true;

  if (isButtonDisabled) {
    return null;
  }
  return (
    <Tooltip content='Buy now at Playstation store' color='success' showArrow placement={placement}>
      <Link href={`${ps5Link}/${slug}`} rel='noopener noreferrer' target='_blank'>
        <Button
          disabled={isButtonDisabled}
          variant={isButtonDisabled ? 'faded' : 'shadow'}
          color='success'
          aria-label='GameSlug'
          endContent={<RocketIcon />}
        >
          BUY
        </Button>
      </Link>
    </Tooltip>
  );
};
