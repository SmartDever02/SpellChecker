import { Link } from 'react-router-dom';

const Landing = () => (
  <div className='flex flex-col md:flex-row h-full bg-[url("/assets/welcome.png")] bg-cover'>
    <div className='bg-[#00000070] w-full h-full text-white select-none relative'>
      <div className='absolute h-full w-[60vw] bg-[#000000a0] transition-all duration-200 -right-[5vw] skew-x-[-7deg]'>
        <div className='h-full py-8 px-32 flex flex-col justify-around items-center skew-x-[7deg] -translate-x-[3vw]'>
          <div>
            <h1 className='text-[48px] uppercase text-center mt-16 p-4'>
              WELCOME
            </h1>
            <p className='w-full text-center'>
              This is a small application that checks words and shows the
              suggestions.
              <br />
              {
                'Tech used: React, Typescript, TailwindCSS for Front-end, Rocket(Rust), Express(Node.js) for Back-end'
              }
            </p>
          </div>
          <Link
            to='/editor'
            className='bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 w-fit p-[15px_30px] rounded-xl uppercase text-lg'
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Landing;
