import cn from 'classnames';
import { useEffect, useRef } from 'react';
import { MovieDetails } from '../../state/movies/moviesReducer';
import { BUTTON_STYLE } from '../../utils/constants';
import Button from '../Button/Button';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import Spinner from '../Spinner/Spinner';

interface MovieModalContentProps {
  movie: MovieDetails;
  closeModal: () => void;
}

const MovieModalContent = ({ movie, closeModal }: MovieModalContentProps) => {
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (
      buttonContainerRef.current?.firstElementChild as HTMLButtonElement
    )?.focus();
  }, []);

  if (!movie?.hasDetails)
    return (
      <>
        <Spinner />
        <Button
          handleOnClick={closeModal}
          ariaLabel='Close modal'
          className={cn(BUTTON_STYLE, 'mt-auto')}
        >
          Close
        </Button>
      </>
    );

  const favoriteStatus = movie.isFavorite ? 'Unfavorite' : 'Favorite';
  return (
    <>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-lg font-bold' id='movie-details'>
          Movie Details
        </h2>
        <FavoriteIcon isFavorite={movie.isFavorite} />
      </div>
      <h3 className='text-md mb-2 font-bold'>{movie.Title}</h3>
      <div className='mb-4 overflow-y-scroll'>
        <MovieModalDetails movie={movie} />
        <p className='mb-4'>{movie.Plot}</p>
        <img
          className='m-auto rounded-lg'
          src={movie.Poster}
          alt={`Movie poster for ${movie.Title}`}
        />
      </div>

      <div className='mt-auto flex space-x-4' ref={buttonContainerRef}>
        <Button
          handleOnClick={closeModal}
          ariaLabel={`${favoriteStatus} ${movie.Title}`}
          className={cn(BUTTON_STYLE, 'grow')}
        >
          {favoriteStatus}
        </Button>
        <Button
          handleOnClick={closeModal}
          ariaLabel={`Close modal for ${movie.Title}`}
          className={cn(BUTTON_STYLE, 'grow')}
        >
          Close
        </Button>
      </div>
    </>
  );
};

interface MovieModalDetailsProps {
  movie: MovieDetails;
}

const MovieModalDetails = ({ movie }: MovieModalDetailsProps) => (
  <div className='mb-4 columns-2 gap-8 text-xs'>
    <p>
      <span className='font-bold'>Genre:</span> {movie.Genre}
    </p>
    <p>
      <span className='font-bold'>Year:</span> {movie.Year} ({movie.Released})
    </p>
    <p>
      <span className='font-bold'>Rated:</span> {movie.Rated}
    </p>
    <p>
      <span className='font-bold'>Length:</span> {movie.Runtime}
    </p>
    <p>
      <span className='font-bold'>Director:</span> {movie.Director}
    </p>
    <p>
      <span className='font-bold'>Writer:</span> {movie.Writer}
    </p>
    <p>
      <span className='font-bold'>Actors:</span> {movie.Actors}
    </p>
    <p>
      <span className='font-bold'>Language:</span> {movie.Language}
    </p>
    <p>
      <span className='font-bold'>Country:</span> {movie.Country}
    </p>
  </div>
);

export default MovieModalContent;
