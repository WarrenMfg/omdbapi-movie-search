import cn from 'classnames';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../../state/types';

interface NavigationProps {
  id?: string;
  classNames?: string;
  handleOnNavigate?: () => void;
  tabIndex?: number;
  dataAttr?: Record<string, string>;
  ariaLabelledBy?: string;
}

/**
 * Mobile and desktop navigation component
 */
const Navigation = ({
  id,
  classNames,
  handleOnNavigate,
  tabIndex,
  dataAttr,
  ariaLabelledBy,
}: NavigationProps) => {
  const location = useLocation();

  // Close mobile nav, if viewing on a mobile screen
  useEffect(() => {
    handleOnNavigate?.();
  }, [handleOnNavigate, location]);

  return (
    <nav
      className={cn('z-10 h-full bg-sky-900 text-cyan-100', classNames)}
      {...(id && { id })}
      {...(ariaLabelledBy && { 'aria-labelledby': ariaLabelledBy })}
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
