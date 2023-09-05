import { GamesResult } from '@/customTypes/general';

export type Props = {
  games: GamesResult;
  columns: string;
  isSearch?: boolean;
  withoutOrdering?: boolean;
  withoutPlatforms?: boolean;
};
