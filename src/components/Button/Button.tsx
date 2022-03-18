import { ReactNode, SyntheticEvent } from 'react';

interface ButtonProps {
  handleOnClick?: (e: SyntheticEvent) => void;
  id?: string;
  className?: string;
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  children: ReactNode;
}

/**
 * Button component
 */
const Button = ({
  handleOnClick,
  className,
  ariaLabel,
  ariaControls,
  ariaExpanded,
  children,
  id,
}: ButtonProps) => {
  return (
    <button
      {...(handleOnClick && { onClick: handleOnClick })}
      {...(id && { id })}
      {...(className && { className })}
      {...(ariaLabel && { 'aria-label': ariaLabel })}
      {...(ariaControls && { 'aria-controls': ariaControls })}
      {...(ariaExpanded && { 'aria-expanded': ariaExpanded })}
    >
      {children}
    </button>
  );
};

export default Button;
