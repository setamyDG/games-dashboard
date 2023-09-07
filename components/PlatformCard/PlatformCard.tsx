import { Divider } from 'antd';
import { Props } from './PlatformCard.types';

const PlatformCard = ({ platform }: Props): JSX.Element => {
  return (
    <div className='flex flex-col mt-4 relative py-8 px-6 border-2'>
      <div className='flex items-center justify-center flex-col'>
        <span className='underline'>{platform?.name}</span>
        <span>{platform?.year_start}</span>
      </div>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between'>
          <span>Popular Items:</span>
          <span>{platform?.games_count}</span>
        </div>
        <Divider />
      </div>
    </div>
  );
};

export default PlatformCard;
