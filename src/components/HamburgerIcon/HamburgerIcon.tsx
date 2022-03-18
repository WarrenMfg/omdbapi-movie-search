import cn from 'classnames';

interface HamburgerIconProps {
  isMobileNavOpen: boolean;
}

const hamburgerBaseClasses = 'bg-cyan-100 h-0.5 transition-transform';

/**
 * Hambuger icon with animation to change to a close icon
 */
const HamburgerIcon = ({ isMobileNavOpen }: HamburgerIconProps) => {
  return (
    <div className='w-8 p-2' data-testid='hamburger-icon'>
      <div
        data-testid='hamburger-icon-top'
        className={cn(hamburgerBaseClasses, {
          'translate-y-1.5 rotate-45': isMobileNavOpen,
        })}
      ></div>
      <div
        data-testid='hamburger-icon-middle'
        className={cn(hamburgerBaseClasses, 'my-1 transition-opacity', {
          'opacity-0': isMobileNavOpen,
        })}
      ></div>
      <div
        data-testid='hamburger-icon-bottom'
        className={cn(hamburgerBaseClasses, {
          '-translate-y-1.5 -rotate-45': isMobileNavOpen,
        })}
      ></div>
    </div>
  );
};

export default HamburgerIcon;
