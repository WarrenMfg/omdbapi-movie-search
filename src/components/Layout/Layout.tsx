import { ReactNode } from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='bg-white'>
      <div className='m-auto flex min-h-screen max-w-7xl flex-col'>
        <Header />
        <div className='flex h-full grow flex-col tl:flex-row'>
          <div className='hidden w-[25%] max-w-[250px] tl:block'>
            <Navigation />
          </div>
          <main className='flex grow flex-col bg-gray-100'>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
