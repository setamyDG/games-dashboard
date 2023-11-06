import { User } from '@/actions/user.actions';
import { GamesResult } from '@/customTypes/general';

export type Props = {
  games: GamesResult;
  user: User;
};
