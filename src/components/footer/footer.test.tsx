import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Footer from './footer';
import { CustomRouter } from '../..';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <CustomRouter history={history}>
        <Footer />
      </CustomRouter>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
