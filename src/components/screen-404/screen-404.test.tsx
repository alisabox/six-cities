import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Screen404 from './screen-404';
import { CustomRouter } from '../..';

describe('Component: Screen404', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <CustomRouter history={history}>
        <Screen404 />
      </CustomRouter>,
    );

    expect(screen.getByText('404 Page Not Found')).toBeInTheDocument();
  });
});
