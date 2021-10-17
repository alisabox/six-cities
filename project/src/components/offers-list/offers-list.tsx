import Card from '../card/card';
import {OffersType} from '../../types/types';
import {Screen} from '../../const/const';

type OffersProps = {
  cardsNumber: number;
  offers: OffersType[];
  onListItemHover: (id: number) => void;
  screen: Screen;
}

function OffersList({cardsNumber, offers, onListItemHover, screen}:OffersProps):JSX.Element {

  const listItemHoverHandler = (id: number) => {
    onListItemHover(id);
  };

  return (
    <>
      {offers.slice(0,cardsNumber).map((offer:OffersType) =>
        <Card key={offer.id} offer={offer} onHover={listItemHoverHandler} screen={screen} />,
      )}
    </>
  );
}

export default OffersList;
