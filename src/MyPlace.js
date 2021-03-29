import { Map } from './UI/Map';

class LoadedPlace {
  constructor(coordinates) {
    new Map(coordinates);
  }
}

const url = new URL(location.href);
const queryParams = url.searchParams;
const coords = {
  lat: +queryParams.get('lat'),
  lng: +queryParams.get('lng'),
};

new LoadedPlace(coords);