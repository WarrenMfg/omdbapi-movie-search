import { ReactNode } from 'react';
import cn from 'classnames';
import useSelector from '../../hooks/useSelector';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import useMediaQueryList from '../../hooks/useMediaQueryList';
import { CLOSED, setMobileNav } from '../../state/mobileNav/mobileNavActions';
import useDispatch from '../../hooks/useDispatch';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobileNavOpen = useSelector(state => state.mobileNav.isOpen);
  const dispatch = useDispatch();
  useMediaQueryList('(min-width: 600px)', () => dispatch(setMobileNav(CLOSED)));

  return (
    <div className='bg-white'>
      <div className='m-auto flex min-h-screen max-w-7xl flex-col'>
        <Header />
        <div className='relative flex grow tl:flex-row'>
          {/* mobile */}
          <Navigation
            classNames={cn(
              'absolute h-full w-full transition-transform tl:hidden',
              {
                '-translate-x-full': !isMobileNavOpen,
                'translate-x-0': isMobileNavOpen,
              }
            )}
          />
          {/* desktop */}
          <Navigation classNames='hidden tl:block tl:w-[25%] tl:max-w-[250px]' />
          <main className='flex grow flex-col bg-gray-100'>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
