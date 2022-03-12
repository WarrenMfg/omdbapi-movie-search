import cn from 'classnames';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { navItems } from '../Routes/Routes';

interface NavigationProps {
  classNames?: string;
  handleOnNavigate?: () => void;
  tabIndex?: number;
}

const Navigation = ({
  classNames,
  handleOnNavigate,
  tabIndex,
}: NavigationProps) => {
  const location = useLocation();

  useEffect(() => {
    handleOnNavigate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <nav className={cn('z-10 h-full bg-sky-900 text-cyan-100', classNames)}>
      <ul className='sticky top-11'>
        {navItems.map(navItem => (
          <li key={navItem}>
            <Link
              tabIndex={tabIndex}
              to={`/${navItem}`}
              className={cn(
                'block py-2 px-4 capitalize transition-colors hover:bg-cyan-700',
                {
                  'bg-cyan-700': location.pathname.endsWith(navItem),
                }
              )}
              {...(location.pathname.endsWith(navItem) && {
                'aria-current': 'page',
              })}
            >
              {navItem}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
