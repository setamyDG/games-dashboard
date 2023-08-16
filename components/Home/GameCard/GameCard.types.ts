import { components } from '@/customTypes/apiTypes';
export type Props = {
  game: components['schemas']['Game'];
  isSeries?: boolean;
};

export type GamePlatforms = components['schemas']['Game']['platforms'];
