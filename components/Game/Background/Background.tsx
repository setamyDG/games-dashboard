import { Props } from './Background.types';

export const Background = ({ src }: Props) => (
  <div style={{ zIndex: 100 }}>
    <div className='absolute top-0 left-0 w-full h-[500px]' style={{ zIndex: 99 }}>
      <div style={{ height: 500 }}>
        <div
          // className='h-[500px]'
          style={{
            zIndex: 200,
            height: 500,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0), rgb(21, 21, 21)),linear-gradient(to bottom, rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),url(${src})`,
          }}
        />
      </div>
    </div>
  </div>
);
