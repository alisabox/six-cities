import Card from '../card/card';
import {OffersType} from '../../types/types';

type OffersProps = {
  cardsNumber: number;
  offers: OffersType[];
  onListItemHover: (id: number) => void;
}

function OffersList({cardsNumber, offers, onListItemHover}:OffersProps):JSX.Element {

  const listItemHoverHandler = (id: number) => {
    onListItemHover(id);
  };

  return (
    <>
      {offers.slice(0,cardsNumber).map((offer:OffersType) =>
        <Card key={offer.id} offer={offer} onHover={listItemHoverHandler} />,
      )}
    </>
  );
}

export default OffersList;
