import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import {
  CLOSE_MOBILE_NAV,
  OPEN_MOBILE_NAV,
  setMobileNav,
} from '../../state/mobileNav/mobileNavActions';
import Button from '../Button/Button';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

/**
 * Top bar sticky header
 */
const Header = () => {
  const dispatch = useDispatch();
  const isMobileNavOpen = useSelector<boolean>(state => state.mobileNav.isOpen);

  // Mobile nav button click handler
  const handleOnClick = () =>
    dispatch(
      setMobileNav(isMobileNavOpen ? CLOSE_MOBILE_NAV : OPEN_MOBILE_NAV)
    );

  return (
    <header className='sticky top-0 z-20 flex items-center text-center tl:text-left'>
      <div className='absolute left-4 flex items-center tl:hidden'>
        <Button
          handleOnClick={handleOnClick}
          ariaLabel={`${isMobileNavOpen ? 'Close' : 'Open'} mobile navigation`}
          ariaControls='main-menu'
          ariaExpanded={isMobileNavOpen}
        >
          <HamburgerIcon isMobileNavOpen={isMobileNavOpen} />
        </Button>
      </div>
      <h1 className='grow bg-cyan-700 py-2 pl-4 text-xl uppercase text-cyan-100'>
        Movie Search
      </h1>
    </header>
  );
};

export default Header;
