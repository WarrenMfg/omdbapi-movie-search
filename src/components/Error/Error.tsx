import { BUTTON_STYLE } from '../../utils/constants';
import Button from '../Button/Button';

interface ErrorProps {
  errorMessage: string;
}

/**
 * Error component to display error message
 */
const Error = ({ errorMessage }: ErrorProps) => {
  return (
    <section className='pt-4 text-center text-cyan-700' role='alert'>
      <h1 className='mb-8 text-4xl'>🚨 Oops!</h1>
      <p className='mx-auto mb-8 max-w-lg rounded-lg bg-cyan-700 p-8 font-mono text-cyan-100 shadow-2xl'>
        {errorMessage}
      </p>
      <Button
        handleOnClick={() => window.location.reload()}
        className={BUTTON_STYLE}
      >
        Refresh
      </Button>
    </section>
  );
};

export default Error;
