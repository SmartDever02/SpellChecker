import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='h-full w-full flex flex-col justify-center items-center text-black'>
      <h1 className='text-[80px] font-extrabold'>404</h1>
      <p>Oops, It seems like you don't have right path.</p>
      <Link
        className='mt-[40px] px-[50px] py-[20px] bg-[#73c581] hover:bg-[#53925e] transition-all duration-300 hover:text-white'
        to='/'
      >
        Return Home
      </Link>
    </div>
  );
};

export default Page404;
