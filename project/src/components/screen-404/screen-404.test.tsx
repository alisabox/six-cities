import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Screen404 from './screen-404';

describe('Component: Screen404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByText} = render(
      <Router history={history}>
        <Screen404 />
      </Router>,
    );

    expect(getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
