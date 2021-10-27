import {useRef, useEffect} from 'react';
import {Icon, Marker, LayerGroup} from 'leaflet';
import useMap from '../../hooks/useMap';
import {OffersType} from '../../types/types';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const/const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: OffersType[];
  selectedPoint?: number;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [28, 40],
  iconAnchor: [14, 40],
});

function Map(props: MapProps):JSX.Element {
  const {offers, selectedPoint} = props;
  const city = offers[0].city;
  const points = offers.map((offer) => ({location: offer.location, id: offer.id}));

  const mapRef = useRef(null);

  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {

      const markers: Marker[] = [];
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint
              ? currentCustomIcon
              : defaultCustomIcon,
          );
        markers.push(marker);
      });

      const layer = new LayerGroup(markers).addTo(map);
      return () => {
        layer.clearLayers();
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
