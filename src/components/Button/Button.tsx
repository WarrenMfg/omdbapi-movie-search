import { ReactNode, SyntheticEvent } from 'react';

interface ButtonProps {
  handleOnClick: (e: SyntheticEvent) => void;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const Button = ({
  handleOnClick,
  className,
  ariaLabel,
  children,
}: ButtonProps) => {
  return (
    <button
      {...(className && { className })}
      {...(ariaLabel && { 'aria-label': ariaLabel })}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
