import { useState } from 'react';
import Card from '../card/card';
import {OffersType} from '../../types/offers';

type OffersProps = {
  cardsNumber: number;
  offers: OffersType[];
}

function OffersList({cardsNumber, offers}:OffersProps):JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState({});

  return (
    <>
      {offers.slice(0,cardsNumber).map((offer:OffersType) =>
        <Card key={offer.id} offer={offer} onHover={(data) => setActiveCard(data)} />,
      )}
    </>
  );
}

export default OffersList;
