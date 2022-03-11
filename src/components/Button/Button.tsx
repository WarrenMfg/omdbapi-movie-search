import { ReactNode, SyntheticEvent } from 'react';

interface ButtonProps {
  handleOnClick: (e: SyntheticEvent) => void;
  classNames?: string;
  ariaLabel?: string;
  children: ReactNode;
}

const Button = ({
  handleOnClick,
  classNames,
  ariaLabel,
  children,
}: ButtonProps) => {
  return (
    <button
      {...(classNames && { classNames })}
      {...(ariaLabel && { 'aria-label': ariaLabel })}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
