import { BUTTON_STYLE } from '../../utils/constants';

interface ErrorProps {
  errorMessage: string;
}

const Error = ({ errorMessage }: ErrorProps) => {
  return (
    <section className='pt-4 text-center text-cyan-700'>
      <h1 className='mb-8 text-4xl'>🚨 Oops!</h1>
      <p className='mx-auto mb-8 max-w-lg rounded-lg bg-cyan-700 p-8 font-mono text-cyan-100 shadow-2xl'>
        {errorMessage}
      </p>
      <button onClick={() => window.location.reload()} className={BUTTON_STYLE}>
        Refresh
      </button>
    </section>
  );
};

export default Error;
