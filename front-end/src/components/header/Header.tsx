import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='z-10 lg:absolute lg:top-0 w-full flex items-center justify-between bg-[#121212] h-16 lg:h-20 px-[50px] lg:px-[100px] drop-shadow-2xl overflow-hidden'>
      <div className='links flex justify-center items-center gap-10'>
        <Link to='/' className='text-white text-2xl uppercase font-bold'>
          Spell Check
        </Link>
        <Link
          to='/editor'
          className='text-gray-300 hover:text-white transition-all duration-200'
        >
          Editor
        </Link>
      </div>

      <span className='cursor-pointer w-8 h-8 p-5 border-2 border-gray-200 rounded-full bg-emerald-800 flex justify-center items-center text-white font-extrabold'>
        J
      </span>
    </header>
  );
};

export default Header;
