import { PlatformResult } from '@/customTypes/general';

export const getPlatforms = async (): Promise<PlatformResult> => {
  const key = process.env.API_KEY;
  const response = await fetch(`https://api.rawg.io/api/platforms?key=${key}&page=1&page_size=50`);

  if (!response.ok) {
    console.log('Error fetching data text: ', response.text());
    console.log('Error fetching data response', response);
    console.log('Error fetching data status: ', response.status);
    console.log('Error fetching data statusText: ', response.statusText);
    console.log('Error fetching data type: ', response.type);
    console.log('Error fetching data url: ', response.url);
    console.log('Error fetching data body: ', response.body);
    console.log('Error fetching data bodyUsed: ', response.bodyUsed);
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
