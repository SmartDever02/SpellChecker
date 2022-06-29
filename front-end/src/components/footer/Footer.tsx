const Footer = () => {
  return (
    <div className='lg:absolute lg:bottom-0 w-full h-16 lg:h-20 bg-black text-white px-[50px] lg:px-[100px]  flex items-center justify-between'>
      <span>Copyright @{new Date().getFullYear()}</span>
      <span>By James Jin</span>
    </div>
  );
};

export default Footer;
