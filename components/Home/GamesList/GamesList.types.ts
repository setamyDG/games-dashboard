import { components } from '@/customTypes/apiTypes';

export type Props = {
  games: components['schemas']['Game'][];
};

export type Game = components['schemas']['Game'];
