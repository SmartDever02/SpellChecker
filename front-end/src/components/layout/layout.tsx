import Footer from '../footer/Footer';
import Header from '../header/Header';

const Layout = ({ children }: any) => {
  return (
    <div className='relative min-w-screen h-screen min-h-screen overflow-y-auto lg:overflow-hidden'>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
