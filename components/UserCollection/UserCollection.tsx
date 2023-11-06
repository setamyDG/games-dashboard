import { GameCard } from '../Game/GameCard/GameCard';
import { User } from '@/actions/user.actions';

type Props = {
  user?: User;
};

export const UserCollection = ({ user }: Props) => {
  return (
    <div className='mt-24'>
      <h1 className='headingText'>Your collection</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 py-4'>
        {user?.favorites?.map((game) => <GameCard user={user} key={game.id} game={game} />)}
      </div>
    </div>
  );
};
