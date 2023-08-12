import { components } from '@/customTypes/apiTypes';
export type Props = {
  game: components['schemas']['Game'];
};

export type GamePlatforms = components['schemas']['Game']['platforms'];
