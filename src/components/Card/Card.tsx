import { SyntheticEvent } from 'react';
import Button from '../Button/Button';

interface CardProps {
  handleOpenCard: (e: SyntheticEvent) => void;
  title: string;
  year: string;
  image: string;
}

const Card = ({ handleOpenCard, title, year, image }: CardProps) => {
  return (
    <li className='h-full w-full max-w-xs tl:max-w-none'>
      <Button
        className='h-full w-full rounded-lg bg-white p-4 text-left font-bold text-cyan-700'
        handleOnClick={handleOpenCard}
        ariaLabel={`Open modal for ${title}`}
      >
        <h3 className='text-md line-clamp-1'>{title}</h3>
        <p className='mb-4 text-xs'>{year}</p>
        <div className='relative grid place-items-center overflow-hidden rounded-lg bg-cyan-100 after:block after:pb-[100%] after:content-[""]'>
          <img
            src={image}
            className='absolute h-full w-full object-cover object-center'
            alt={`Movie poster for '${title}'`}
          />
        </div>
      </Button>
    </li>
  );
};

export default Card;
