import { SyntheticEvent } from 'react';
import Button from '../Button/Button';
import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';

interface CardProps {
  handleOpenCard: (e: SyntheticEvent) => void;
  title: string;
  isFavorite: boolean;
  year: string;
  image: string;
  id: string;
}

const Card = ({
  handleOpenCard,
  title,
  isFavorite,
  year,
  image,
  id,
}: CardProps) => {
  return (
    <li className='h-full w-full max-w-xs rounded-lg shadow-lg tl:max-w-none'>
      <Button
        className='h-full w-full rounded-lg bg-white p-4 text-left font-bold text-cyan-700'
        handleOnClick={handleOpenCard}
        ariaLabel={`Open modal for ${title}`}
        id={id}
      >
        <div className='relative'>
          <h3 className='text-md mr-6 line-clamp-1'>{title}</h3>
          <div className='absolute right-0 top-0.5'>
            <FavoriteIcon isFavorite={isFavorite} />
          </div>
        </div>
        <p className='mb-4 text-xs'>{year}</p>
        <div className='relative overflow-hidden rounded-lg border bg-cyan-100 after:block after:pb-[100%] after:content-[""]'>
          <img
            src={image}
            className='absolute h-full w-full object-cover object-center'
            alt={`Movie poster for "${title}"`}
          />
        </div>
      </Button>
    </li>
  );
};

export default Card;
