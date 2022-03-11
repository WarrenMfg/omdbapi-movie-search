import useDispatch from '../../hooks/useDispatch';
import useSelector from '../../hooks/useSelector';
import {
  CLOSED,
  OPEN,
  setMobileNav,
} from '../../state/mobileNav/mobileNavActions';
import Button from '../Button/Button';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

const Header = () => {
  const dispatch = useDispatch();
  const isMobileNavOpen = useSelector<boolean>(state => state.mobileNav.isOpen);

  const handleOnClick = () =>
    dispatch(setMobileNav(isMobileNavOpen ? CLOSED : OPEN));

  return (
    <header className='relative flex items-center text-center tl:text-left'>
      <div className='absolute left-4 flex items-center tl:hidden'>
        <Button
          handleOnClick={handleOnClick}
          ariaLabel={`${isMobileNavOpen ? 'Close' : 'Open'} mobile navigation`}
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
