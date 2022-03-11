import { ReactNode, SyntheticEvent } from 'react';

interface ButtonProps {
  handleOnClick: (e: SyntheticEvent) => void;
  ariaLabel?: string;
  children: ReactNode;
}

const Button = ({ handleOnClick, ariaLabel, children }: ButtonProps) => {
  return (
    <button
      className=''
      {...(ariaLabel && { 'aria-label': ariaLabel })}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};

export default Button;
