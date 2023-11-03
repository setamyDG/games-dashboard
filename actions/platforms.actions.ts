import { PlatformResult } from '@/customTypes/general';

export const getPlatforms = async (): Promise<PlatformResult> => {
  const key = process.env.API_KEY;
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${key}&page=1&page_size=50`);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
