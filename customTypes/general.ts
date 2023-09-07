import { components, operations } from './apiTypes';

export type GamesResult = operations['games_list']['responses']['200']['content']['application/json'];
export type Game = GamesResult['results'][0];

export type Platform = components['schemas']['Platform'];
export type PlatformResult = operations['platforms_list']['responses']['200']['content']['application/json'];
