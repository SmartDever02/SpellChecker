import rustImage from '../../../resources/rust.png';
import nodeImage from '../../../resources/node.jpg';
import { memo } from 'react';

const ServerBadge = ({ name }: ServerProps) => {
  return (
    <span className='w-[100px] rounded-l-2xl flex items-center justify-center bg-[#04AA6Da0] '>
      <img
        src={name === 'NODE' ? nodeImage : rustImage}
        alt='server'
        width={50}
        height={50}
        draggable={false}
      />
    </span>
  );
};

interface ServerProps {
  name: String;
}

export default memo(ServerBadge);
