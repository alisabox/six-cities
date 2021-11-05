import Card from '../card/card';
import {OffersType} from '../../types/types';
import Map from '../map/map';
import { useCallback, useEffect, useState } from 'react';
import SortVariants from '../sort-variants/sort-variants';
import { sortOffers } from '../../const/const';

type OffersProps = {
  selectedCity:  string;
  offers: OffersType[];
}

function OffersList({selectedCity, offers}:OffersProps):JSX.Element {

  const listItemHoverHandler = useCallback((id?: number) => {
    onListItemHover(id);
  }, []);

  const [selectedPoint, setSelectedPoint] = useState<number | undefined>(undefined);

  const onListItemHover = (id?: number) => {
    setSelectedPoint(id);
  };

  const [sortedOffers, setSortedOffers] = useState(offers);
  const onSortModeChange = useCallback((sort: string | null) => {
    setSortedOffers(sortOffers(offers, sort));
  }, [offers]);

  useEffect(() => {
    setSortedOffers(offers);
    window.scrollTo(0,0);
  }, [offers]);

  useEffect(() => {
    setSelectedPoint(undefined);
  }, [selectedCity]);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{offers.length === 1 ? '1 place' : `${offers.length} places`} to stay in {selectedCity}</b>
          <SortVariants onSortModeChange={onSortModeChange} selectedCity={selectedCity}/>
          <div className="cities__places-list places__list tabs__content">
            {sortedOffers.slice().map((offer:OffersType) =>
              <Card key={offer.id} offer={offer} onHover={listItemHoverHandler} isMainScreen />,
            )}
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offers={offers} selectedPoint={selectedPoint} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default OffersList;
