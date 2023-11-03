'use server';

import { GamesResult } from '@/customTypes/general';

const key = process.env.API_KEY;
export const getGames = async (queryParams?: string): Promise<GamesResult> => {
  const response = await fetch(`https://api.rawg.io/api/games?key=${key}&page_size=20${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getGame = async (id: string) => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getGameScreenShots = async (id: string): Promise<GamesResult> => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${key}&page=1&page_size=8`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getGameSeries = async (id: string): Promise<GamesResult> => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}/game-series?key=${key}&page=1&page_size=8`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getGameAchievements = async (id: string): Promise<GamesResult> => {
  const response = await fetch(`https://api.rawg.io/api/games/${id}/achievements?key=${key}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getLast30daysGames = async (queryParams: string): Promise<GamesResult> => {
  const currentDate = new Date();

  const thirtyDaysAgo = new Date(currentDate);
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  const todayFormatted = currentDate.toISOString().split('T')[0];
  const thirtyDaysAgoFormatted = thirtyDaysAgo.toISOString().split('T')[0];

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${key}${queryParams}&dates=${thirtyDaysAgoFormatted},${todayFormatted}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getThisWeekGames = async (queryParams: string): Promise<GamesResult> => {
  const key = process.env.API_KEY;
  const currentDate = new Date();

  const sevenDaysAgo = new Date(currentDate);
  sevenDaysAgo.setDate(currentDate.getDate() - 7);

  const todayFormatted = currentDate.toISOString().split('T')[0];
  const sevenDaysAgoFormatted = sevenDaysAgo.toISOString().split('T')[0];

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${key}${queryParams}&dates=${sevenDaysAgoFormatted},${todayFormatted}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getNextWeekGames = async (queryParams: string): Promise<GamesResult> => {
  const currentDate = new Date();

  const nextWeek = new Date(currentDate);
  nextWeek.setDate(currentDate.getDate() + 7);

  const todayFormatted = currentDate.toISOString().split('T')[0];
  const nextWeekFormatted = nextWeek.toISOString().split('T')[0];

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${key}${queryParams}&dates=${todayFormatted},${nextWeekFormatted}`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getReleaseMothsCalendarGames = async (queryParams: string): Promise<GamesResult> => {
  const response = await fetch(`https://api.rawg.io/api/games?key=${key}&${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getBestOfTheYearGames = async (queryParams: string): Promise<GamesResult> => {
  const beginOfYear = new Date(new Date().getFullYear(), 0, 1);
  const currentDate = new Date();
  const todayFormatted = currentDate.toISOString().split('T')[0];
  const beginOfYearFormatted = beginOfYear.toISOString().split('T')[0];

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${key}&${queryParams}&dates=${beginOfYearFormatted},${todayFormatted}&ordering=-rating`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getPopular2022Games = async (queryParams: string): Promise<GamesResult> => {
  const beginOfYear2022 = new Date(2022, 0, 1);
  const endOfYear2022 = new Date(2022, 11, 31);
  const beginOfYearFormatted = beginOfYear2022.toISOString().split('T')[0];
  const endOfYearFormatted = endOfYear2022.toISOString().split('T')[0];

  const response = await fetch(
    `https://api.rawg.io/api/games?key=${key}&${queryParams}&dates=${beginOfYearFormatted},${endOfYearFormatted}&ordering=-added`,
  );

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getAllTime250Games = async (queryParams: string): Promise<GamesResult> => {
  const response = await fetch(`https://api.rawg.io/api/games?key=${key}&${queryParams}&ordering=-rating`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getGameTrailer = async (gameSlug: string): Promise<GamesResult> => {
  const response = await fetch(`https://api.rawg.io/api/games/${gameSlug}/movies?key=${key}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
