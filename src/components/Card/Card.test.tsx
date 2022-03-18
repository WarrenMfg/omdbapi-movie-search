import { render, screen } from '@testing-library/react';
import Card from './Card';

const cardProps = {
  handleOpenCard: jest.fn(),
  title: 'title',
  isFavorite: false,
  year: '1970',
  image: 'https://plchldr.co/i/300x300?bg=cffafe&fc=0e7490&text=Oops',
  id: 'id',
  ariaSetSize: 1,
  ariaPosInSet: 1,
};

describe('Card', () => {
  it('should render', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByTestId('card')).toBeVisible();
  });

  it('should contain a button and handle a click', () => {
    render(<Card {...cardProps} />);
    screen.getByText(cardProps.title).click();
    expect(cardProps.handleOpenCard).toHaveBeenCalled();
  });

  it('should display the title and year', () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(cardProps.title)).toBeVisible();
    expect(screen.getByText(cardProps.year)).toBeVisible();
  });

  it('should display an image', () => {
    render(<Card {...cardProps} />);
    const altRegEx = /.*title.*/i;
    expect(screen.getByAltText(altRegEx)).toHaveAttribute(
      'alt',
      expect.stringMatching(altRegEx)
    );
  });
});
