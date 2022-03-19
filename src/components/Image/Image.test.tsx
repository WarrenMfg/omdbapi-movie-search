import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import Image from './Image';

describe('Image', () => {
  const src = 'https://plchldr.co/i/300x300';
  const alt = 'Placeholder';
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(<Image {...{ src, alt }} />).container;
    expect(screen.getByAltText(alt)).toBeVisible();
  });

  it('should add a default image on error', () => {
    container = render(<Image src='' alt={alt} />).container;
    const img = screen.getByAltText(alt);
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', expect.stringMatching('plchldr.co'));
  });
});
