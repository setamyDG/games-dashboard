'use server';
export const getGames = async (queryParams?: string) => {
  const key = process.env.API_KEY;
  const defaultQueryParams = `&page=1`;
  const response = await fetch(`https://api.rawg.io/api/games?key=${key}${queryParams || defaultQueryParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getGame = async (id: string) => {
  const key = process.env.API_KEY;
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${key}`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};

export const getGameScreenShots = async (id: string) => {
  const key = process.env.API_KEY;
  const response = await fetch(`https://api.rawg.io/api/games/${id}/screenshots?key=${key}&page=1&page_size=8`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
