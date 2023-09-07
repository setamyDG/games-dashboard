import { Props } from './Background.types';

const Background = ({ src }: Props) => (
  <div style={{ zIndex: 100 }}>
    <div className='absolute top-0 left-0 w-full h-full' style={{ zIndex: 99 }}>
      <div style={{ height: 500 }}>
        <div
          style={{
            height: 500,
            zIndex: 200,
            backgroundColor: 'transparent',
            backgroundSize: 'cover',
            backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0), rgb(21, 21, 21)),linear-gradient(to bottom, rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),url(${src})`,
          }}
        />
      </div>
    </div>
  </div>
);

export default Background;
