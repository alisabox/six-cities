import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from './header';
import { CustomRouter } from '../..';

describe('Component: Header', () => {
  it('should render correctly on page without user navigation', () => {
    const history = createMemoryHistory();
    render(
      <CustomRouter history={history}>
        <Header />
      </CustomRouter>,
    );

    expect(screen.queryByText('Sign in')).toBeNull();
    expect(screen.queryByText('Sign out')).toBeNull();
  });
});
