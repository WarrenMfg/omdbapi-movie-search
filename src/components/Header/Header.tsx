import Button from '../Button/Button';
import HamburgerIcon from '../HamburgerIcon/HamburgerIcon';

interface HeaderProps {
  handleOnClick: () => void;
  isMobileNavOpen: boolean;
}

/**
 * Top bar sticky header
 */
const Header = ({ handleOnClick, isMobileNavOpen }: HeaderProps) => (
  <header className='sticky top-0 z-20 flex items-center text-center tl:text-left'>
    <div className='absolute left-4 flex items-center tl:hidden'>
      <Button
        handleOnClick={handleOnClick}
        ariaLabel={`${isMobileNavOpen ? 'Close' : 'Open'} mobile navigation`}
        ariaControls='mobile-nav'
        ariaExpanded={isMobileNavOpen}
        id='mobile-nav-button'
      >
        <HamburgerIcon isMobileNavOpen={isMobileNavOpen} />
      </Button>
    </div>
    <h1 className='grow bg-cyan-700 py-2 pl-4 text-xl uppercase text-cyan-100'>
      Movie Search
    </h1>
  </header>
);

export default Header;
