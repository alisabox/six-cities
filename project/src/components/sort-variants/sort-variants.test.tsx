import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import SortVariants from './sort-variants';
import { AppRoute, SortMode } from '../../const/const';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.ROOT);

describe('Component: SortVariants', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  it('should render correctly', async () => {
    const onSortModeChange = jest.fn();
    const selectedCity = 'Paris';
    render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <SortVariants onSortModeChange={onSortModeChange} selectedCity={selectedCity} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('selectSort')).toHaveTextContent(SortMode.POPULAR);

    userEvent.click(screen.getByText(SortMode.PRICE_UP));
    expect(screen.getByTestId('selectSort')).toHaveTextContent(SortMode.PRICE_UP);
  });
});
