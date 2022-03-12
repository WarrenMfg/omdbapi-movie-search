import { Link, useLocation } from 'react-router-dom';

interface ErrorProps {
  errorMessage: string;
}

const Error = ({ errorMessage }: ErrorProps) => {
  const location = useLocation();
  return (
    <section className='pt-4 text-center text-cyan-700'>
      <h1 className='mb-8 text-4xl'>🚨 Oops!</h1>
      <p className='mx-auto mb-8 max-w-lg rounded-lg bg-cyan-700 p-8 font-mono text-cyan-100 shadow-2xl'>
        {errorMessage}
      </p>
      <Link
        to={location.pathname}
        reloadDocument={true}
        className='inline-block rounded-lg bg-sky-900 py-4 px-8 text-cyan-100 transition-colors hover:bg-cyan-700'
      >
        Refresh
      </Link>
    </section>
  );
};

export default Error;
