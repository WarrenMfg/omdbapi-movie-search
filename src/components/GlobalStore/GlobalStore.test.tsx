import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { useContext } from 'react';
import Store from '../../state/store';
import { RootState } from '../../state/types';
import GlobalStore from './GlobalStore';

describe('GlobalStore', () => {
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', () => {
    container = render(
      <GlobalStore>
        <h1>Hello</h1>
      </GlobalStore>
    ).container;
    expect(screen.getByRole('heading')).toBeVisible();
  });

  it('should provide the store to children', () => {
    let store: RootState | undefined = undefined;

    const Component = () => {
      store = useContext(Store);
      return null;
    };

    container = render(
      <GlobalStore>
        <Component />
      </GlobalStore>
    ).container;

    expect(store).toBeDefined();
  });
});
