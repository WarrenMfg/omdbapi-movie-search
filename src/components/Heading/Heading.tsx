import { Query } from '../../state/types';
import { FAVORITES } from '../../utils/constants';

interface HeadingProps {
  query: Query;
  isViewingFavorites: boolean;
}

/**
 * Dynamic heading for movie list routes and favorites
 */
const Heading = ({ query, isViewingFavorites }: HeadingProps) => (
  <h2
    id='app-heading'
    className='m-auto mt-2 mb-6 max-w-xs text-lg font-bold text-cyan-700 tl:max-w-none'
  >
    {isViewingFavorites ? (
      <span className='capitalize'>{FAVORITES}</span>
    ) : (
      <span>
        Movie List<span className='capitalize tl:hidden'> for "{query}"</span>
      </span>
    )}
  </h2>
);

export default Heading;
