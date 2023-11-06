import { User } from '@/actions/user.actions';
import { components } from '@/customTypes/apiTypes';

export type Props = {
  game: components['schemas']['Game'];
  user?: User;
};

export type GamePlatforms = components['schemas']['Game']['platforms'];
