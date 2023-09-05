import Image from 'next/image';
import { Props } from './AchievementCard.types';

const AchievementCard = ({ achievement }: Props): JSX.Element => (
  <div className='flex flex-col mt-4 hover:scale-105 transition-all overflow-hidden' key={achievement?.name as string}>
    <Image
      src={achievement?.image || '/game.svg'}
      alt={achievement?.name as string}
      width={1920}
      height={1080}
      priority
      className='rounded-tr-lg rounded-tl-lg object-cover h-48'
    />
    <div className='flex flex-col p-4 bg-neutral-800 rounded-br-lg rounded-bl-lg h-32 text-sm'>
      <div className='flex items-center justify-between'>
        <span className='font-semibold'>{achievement?.name}</span>
        <span>{achievement?.percent} %</span>
      </div>
      <div>
        <p className='text-white text-xs mt-4'>{achievement?.description}</p>
      </div>
    </div>
  </div>
);

export default AchievementCard;
