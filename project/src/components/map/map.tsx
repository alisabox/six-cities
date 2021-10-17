import {useRef, useEffect} from 'react';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {CityType, LocationType} from '../../types/types';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const/const';
import 'leaflet/dist/leaflet.css';

type MapPointsType = {
  location: LocationType;
  id: number;
}

type MapProps = {
  city: CityType;
  points: MapPointsType[];
  selectedPoint?: number | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map(props: MapProps):JSX.Element {
  const {city, points, selectedPoint} = props;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
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
          )
          .addTo(map);
      });
    }
  }, [map, points, selectedPoint]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
