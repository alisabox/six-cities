import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import ReviewsList from './reviews-list';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { makeFakeReviews } from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
history.push(AppRoute.FAVORITE);

const reviews = [makeFakeReviews()];

const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth},
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render (
      <Provider store={store}>
        <Router history={history}>
          <ReviewsList reviews={reviews}/>
        </Router>
      </Provider>,
    );

    const date = new Date(reviews[0].date);
    const monthYear = date.toLocaleString('default', { month: 'long' , year: 'numeric'});

    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(reviews.length)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].user.name)).toBeInTheDocument();
    expect(screen.getByText(reviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(monthYear)).toBeInTheDocument();
  });
});
