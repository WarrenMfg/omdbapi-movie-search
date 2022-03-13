import { ReactNode, SyntheticEvent } from 'react';

interface ButtonProps {
  handleOnClick?: (e: SyntheticEvent) => void;
  id?: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

/**
 * Button component
 */
const Button = ({
  handleOnClick,
  className,
  ariaLabel,
  children,
  id,
}: ButtonProps) => {
  return (
    <button
      {...(handleOnClick && { onClick: handleOnClick })}
      {...(id && { id })}
      {...(className && { className })}
      {...(ariaLabel && { 'aria-label': ariaLabel })}
    >
      {children}
    </button>
  );
};

export default Button;
