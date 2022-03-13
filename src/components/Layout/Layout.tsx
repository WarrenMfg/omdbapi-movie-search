import { ReactNode } from 'react';
import cn from 'classnames';
import useSelector from '../../hooks/useSelector';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import {
  CLOSE_MOBILE_NAV,
  setMobileNav,
} from '../../state/mobileNav/mobileNavActions';
import useDispatch from '../../hooks/useDispatch';
import useBodyLock from '../../hooks/useBodyLock';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobileNavOpen = useSelector(state => state.mobileNav.isOpen);
  useBodyLock(isMobileNavOpen);
  const dispatch = useDispatch();

  return (
    <div className='bg-white'>
      <div className='m-auto flex min-h-screen max-w-7xl flex-col drop-shadow-2xl'>
        <Header />
        <div className='relative grid grow grid-cols-12'>
          {/* mobile */}
          <Navigation
            tabIndex={isMobileNavOpen ? 0 : -1}
            handleOnNavigate={() => {
              dispatch(setMobileNav(CLOSE_MOBILE_NAV));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            classNames={cn(
              'absolute h-full w-full transition-transform tl:hidden',
              {
                '-translate-x-full': !isMobileNavOpen,
                'translate-x-0': isMobileNavOpen,
              }
            )}
            dataAttr={{ key: 'data-cy', value: 'mobile-nav' }}
          />
          {/* desktop */}
          <Navigation
            classNames='hidden tl:block col-span-3 lg:col-span-2'
            dataAttr={{ key: 'data-cy', value: 'desktop-nav' }}
          />
          <main className='col-span-12 grow bg-gray-100 p-4 tl:col-span-9 tl:col-start-4 lg:col-span-10 lg:col-start-3'>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
