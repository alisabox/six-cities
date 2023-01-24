import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {queryByText} = render(
      <Router history={history}>
        <LoadingScreen />
      </Router>,
    );

    expect(queryByText(/The page is loading/i)).toBeInTheDocument();
    expect(queryByText(/Sign in/i)).toBeNull();
    expect(queryByText(/Sign out/i)).toBeNull();
  });
});
