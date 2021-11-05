import ReviewForm from '../review-form/review-form';
import {ReviewsType, State} from '../../types/types';
import {AuthorizationStatus, MAX_RATING} from '../../const/const';
import { connect, ConnectedProps } from 'react-redux';

type ReviewsListProps = {
  reviews: ReviewsType[];
}

const mapStateToProps = ({authorizationStatus}: State) => ({
  authorizationStatus,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector> & ReviewsListProps;

function ReviewsList({reviews, authorizationStatus}: PropsFromRedux):JSX.Element {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews?.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review) => {
            const date = new Date(review.date);
            const dateTime = date.toISOString().substring(0,10);
            const monthYear = date.toLocaleString('default', { month: 'long' , year: 'numeric'});

            return (
              <li key={review.id} className="reviews__item">
                <div className="reviews__user user">
                  <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
                  </div>
                  <span className="reviews__user-name">
                    {review.user.name}
                  </span>
                </div>
                <div className="reviews__info">
                  <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                      <span style={{width: `${review.rating / MAX_RATING * 100}%`}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <p className="reviews__text">
                    {review.comment}
                  </p>
                  <time className="reviews__time" dateTime={dateTime}>{monthYear}</time>
                </div>
              </li>
            );
          })
        }
      </ul>
      {
        authorizationStatus === AuthorizationStatus.Auth
          ? <ReviewForm />
          : ''
      }
    </section>
  );
}

export {ReviewsList};
export default connector(ReviewsList);
