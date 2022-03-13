import cn from 'classnames';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../utils/constants';

interface NavigationProps {
  classNames?: string;
  handleOnNavigate?: () => void;
  tabIndex?: number;
  dataAttr?: Record<string, string>;
}

const Navigation = ({
  classNames,
  handleOnNavigate,
  tabIndex,
  dataAttr,
}: NavigationProps) => {
  const location = useLocation();

  useEffect(() => {
    handleOnNavigate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <nav
      className={cn('z-10 h-full bg-sky-900 text-cyan-100', classNames)}
      {...(dataAttr && { [dataAttr.key]: dataAttr.value })}
    >
      <ul className='sticky top-11'>
        {NAV_ITEMS.map(navItem => (
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
