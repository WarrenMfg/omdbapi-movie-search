import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { BrowserRouter } from 'react-router-dom';
import GlobalStore from '../GlobalStore/GlobalStore';
import Layout from '../Layout/Layout';

import '../../index.css';

describe('Header', () => {
  const hello = /hello/i;
  let container: HTMLElement;

  afterEach(async () => {
    expect(await axe(container)).toHaveNoViolations();
  });

  it('should render', async () => {
    container = render(
      <GlobalStore>
        <BrowserRouter>
          <Layout>
            <p>Hello</p>
          </Layout>
        </BrowserRouter>
      </GlobalStore>
    ).container;

    expect(screen.getByRole('heading')).toBeVisible();
    expect(screen.getByTestId('mobile-nav')).toHaveClass('tl:hidden');
    expect(screen.getByTestId('desktop-nav')).toHaveClass('tl:block');
    expect(screen.getByRole('main')).toBeVisible();
    expect(screen.getByText(hello)).toBeVisible();
  });
});
