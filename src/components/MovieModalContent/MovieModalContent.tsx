import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import useDispatch from '../../hooks/useDispatch';
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from '../../state/movies/moviesActions';
import { Movie, MovieDetails } from '../../state/movies/moviesReducer';
import {
  BUTTON_STYLE,
  FAVORITES,
  MOVIE_PROPERTIES,
} from '../../utils/constants';
import {
  addFavoriteToLocalStorage,
  removeFavoriteFromLocalStorage,
} from '../../utils/localStorage';
import reduceObject from '../../utils/reduceObject';
import Button from '../Button/Button';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import Spinner from '../Spinner/Spinner';
import Image from '../Image/Image';

interface MovieModalContentProps {
  movie: MovieDetails | undefined;
  closeModal: () => void;
}

/**
 * Content to display movie details
 */
const MovieModalContent = ({ movie, closeModal }: MovieModalContentProps) => {
  const location = useLocation();
  const dispatch = useDispatch();

  // If still fetching, show spinner
  if (!movie?.hasDetails) {
    return (
      <div data-cy='modal-spinner' className='flex h-full flex-col'>
        <Spinner />
        <Button
          handleOnClick={closeModal}
          ariaLabel='Close modal'
          className={cn(BUTTON_STYLE, 'mt-auto')}
        >
          Close
        </Button>
      </div>
    );
  }

  // Handler for adding and removing favorites
  const handleFavoriting = () => {
    if (movie.isFavorite) {
      dispatch(removeFavoriteMovie(movie));
      location.pathname.endsWith(FAVORITES) && closeModal();
      removeFavoriteFromLocalStorage(movie);
    } else {
      dispatch(addFavoriteMovie(movie));
      addFavoriteToLocalStorage(reduceObject(movie, MOVIE_PROPERTIES) as Movie);
    }
  };

  const favoriteStatus = movie.isFavorite ? 'Unfavorite' : 'Favorite';
  return (
    <>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-lg font-bold'>Movie Details</h2>
        <FavoriteIcon isFavorite={movie.isFavorite} />
      </div>
      <h3 className='text-md mb-2 font-bold'>{movie.Title}</h3>
      <div className='mb-4 overflow-y-scroll'>
        <MovieModalDetails movie={movie} />
        <p className='mb-4'>
          <span className='font-bold'>Plot: </span>
          {movie.Plot}
        </p>
        <Image
          src={movie.Poster}
          alt={`Movie poster for "${movie.Title}"`}
          className='m-auto rounded-lg'
        />
      </div>

      <div className='relative mt-auto flex space-x-4 before:absolute before:inset-x-0 before:-top-10 before:h-6 before:bg-gradient-to-t before:from-white before:to-white/0'>
        <Button
          handleOnClick={handleFavoriting}
          ariaLabel={`${favoriteStatus} ${movie.Title}`}
          className={cn(BUTTON_STYLE, 'w-1/2')}
        >
          <span>{favoriteStatus}</span>
        </Button>
        <Button
          handleOnClick={closeModal}
          ariaLabel={`Close modal for ${movie.Title}`}
          className={cn(BUTTON_STYLE, 'w-1/2')}
        >
          <span>Close</span>
        </Button>
      </div>
    </>
  );
};

interface MovieModalDetailsProps {
  movie: MovieDetails;
}

/**
 * Abstracted markup for movie details
 */
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
