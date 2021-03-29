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
    mapboxgl.accessToken = 'pk.eyJ1Ijoicm9jaW9uYWRhbCIsImEiOiJja211ZzVodzMwNHpqMm9rNWdpdm01dnliIn0.bpvbUZzOlSTxhPPSzoCuig';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: coordinates, 
      zoom: 12 
    });
    map.addControl(new mapboxgl.NavigationControl());
    const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);
  }
}