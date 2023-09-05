import { operations } from '@/customTypes/apiTypes';

export type Props = {
  achievement: operations['games_achievements_read']['responses']['200']['content']['application/json'];
};
