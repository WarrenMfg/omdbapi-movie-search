import cn from 'classnames';

interface FavoriteIconProps {
  isFavorite: boolean;
}

/**
 * Heart icon
 */
const FavoriteIcon = ({ isFavorite }: FavoriteIconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={cn('h-5 w-5', { 'fill-current': isFavorite })}
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
      role='presentation'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
      />
    </svg>
  );
};

export default FavoriteIcon;
