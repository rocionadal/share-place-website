export class Map {
  constructor(coords) {
    // this.coordinates = coords;
    this.render(coords);
  }
  render(coordinates) {
    if (!mapboxgl) {
      alert('Could not load maps library - please try again later!');
      return;
    }
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jaW9uYWRhbCIsImEiOiJjazk4OW96N2MwNG0zM2hrNGs5NG5xbTJ1In0.IU-ZsXz3mAszyWyJetTSeA';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates, 
      zoom: 12 
    });

    const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
  }
}