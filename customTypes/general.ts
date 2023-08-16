import { components, operations } from './apiTypes';

export type Game = components['schemas']['Game'];
export type GamesResult = operations['games_list']['responses']['200']['content']['application/json'];
