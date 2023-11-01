import { GamesResult } from '@/customTypes/general';

export type Props = {
  games: GamesResult;
  isSearch?: boolean;
  withoutOrdering?: boolean;
  withoutPlatforms?: boolean;
};
