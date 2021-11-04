import {useState, ChangeEvent, SyntheticEvent, useEffect} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { clearPostReviewStatus } from '../../store/action';
import { postReview } from '../../store/api-actions';
import { PostReviewType, State } from '../../types/types';

type OfferParams = {
  id: string;
};

const mapStateToProps = ({isPostSuccessfull}: State) => ({
  isPostSuccessfull,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  onReviewPost: (id, review) => postReview(id, review),
  clearPostStatus: clearPostReviewStatus,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function ReviewForm({onReviewPost, isPostSuccessfull, clearPostStatus}: PropsFromRedux):JSX.Element {
  const params = useParams<OfferParams>();
  const id = parseInt(params.id, 10);

  const [review, setReview] = useState<PostReviewType>({
    comment: '',
    rating: 0,
  });

  const {comment, rating} = review;
  const isSubmitDisabled = comment.length < 50 || rating === 0;

  const handleStarClick = (evt: ChangeEvent<HTMLInputElement>) => {
    setReview({
      comment,
      rating: parseInt(evt.target.value, 10),
    });
  };

  const handleTextareaChange = (evt: ChangeEvent<HTMLTextAreaElement>) =>  {
    setReview({
      comment: evt.target.value,
      rating,
    });
  };

  const handleSubmit = (evt: SyntheticEvent) => {
    evt.preventDefault();
    onReviewPost(id, review);
  };

  useEffect(() => {
    if (isPostSuccessfull) {
      setReview({
        comment: '',
        rating: 0,
      });
      clearPostStatus();
    }
  }, [clearPostStatus, isPostSuccessfull]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" >
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleStarClick} checked={review.rating === 5}/>
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleStarClick} checked={review.rating === 4}/>
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleStarClick} checked={review.rating === 3}/>
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleStarClick} checked={review.rating === 2}/>
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleStarClick} checked={review.rating === 1}/>
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextareaChange}
        value={comment}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
      </div>
    </form>
  );
}

export {ReviewForm};
export default connector(ReviewForm);
