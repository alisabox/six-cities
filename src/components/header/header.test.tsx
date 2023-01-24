import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Header from './header';

describe('Component: Header', () => {
  it('should render correctly on page without user navigation', () => {
    const history = createMemoryHistory();
    const {queryByText} = render(
      <Router history={history}>
        <Header />
      </Router>,
    );

    expect(queryByText('Sign in')).toBeNull();
    expect(queryByText('Sign out')).toBeNull();
  });
});
