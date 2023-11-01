import { Game } from '@/customTypes/general';

export type Props = {
  slug: string;
  game: Game;
  placement?: 'left' | 'right' | 'top' | 'bottom';
};
