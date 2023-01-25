import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import LoadingScreen from './loading-screen';
import { CustomRouter } from '../..';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <CustomRouter history={history}>
        <LoadingScreen />
      </CustomRouter>,
    );

    expect(screen.getByText(/The page is loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).toBeNull();
    expect(screen.queryByText(/Sign out/i)).toBeNull();
  });
});
