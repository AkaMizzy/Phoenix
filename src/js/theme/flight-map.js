import { getColor, getItemFromStore } from '../utils';

const flightMapInit = () => {
  const flightMap = document.querySelector('#flightMap');
  if (flightMap) {
    window.mapboxgl.accessToken =
      'pk.eyJ1IjoidGhlbWV3YWdvbiIsImEiOiJjbGhmNW5ybzkxcmoxM2RvN2RmbW1nZW90In0.hGIvQ890TYkZ948MVrsMIQ';

    const zoomIn = document.querySelector('.zoomIn');
    const zoomOut = document.querySelector('.zoomOut');
    const fullScreen = document.querySelector('.fullScreen');

    const styles = {
      default: 'mapbox://styles/mapbox/light-v11',
      light: 'mapbox://styles/themewagon/clj57pads001701qo25756jtw',
      dark: 'mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew'
    };

    const map = new window.mapboxgl.Map({
      container: 'flightMap',
      style: styles[window.config.config.phoenixTheme],
      center: [-73.102712, 7.102257],
      zoom: 5,
      pitch: 40,
      attributionControl: false
    });

    zoomIn.addEventListener('click', () => map.zoomIn());
    zoomOut.addEventListener('click', () => map.zoomOut());
    fullScreen.addEventListener('click', () =>
      map.getContainer().requestFullscreen()
    );

    const origin = [-61.100583, 5.044713];
    const currentPosition = [-74.2139449434892, 8.136553550752552];
    const destination = [-84.913785, 10.325774];

    const originToCurrentRoute = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [origin, currentPosition]
          }
        }
      ]
    };
    const currentToDestinationRoute = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [currentPosition, destination]
          }
        }
      ]
    };

    const points = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: origin
          }
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: currentPosition
          }
        },
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: destination
          }
        }
      ]
    };

    let count = 1;
    points.features.forEach(feature => {
      const el = document.createElement('div');
      el.className = `marker-${count}`;
      new window.mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .addTo(map);
      count += 1;
    });

    const lineDistance = window.turf.length(originToCurrentRoute.features[0]);
    const lineDistance2 = window.turf.length(originToCurrentRoute.features[0]);

    const arc = [];
    const arc2 = [];

    const steps = 500;

    for (let i = 0; i < lineDistance; i += lineDistance / steps) {
      const segment = window.turf.along(originToCurrentRoute.features[0], i);
      arc.push(segment.geometry.coordinates);
    }
    for (let i = 0; i < lineDistance2; i += lineDistance2 / steps) {
      const segment = window.turf.along(
        currentToDestinationRoute.features[0],
        i
      );
      arc2.push(segment.geometry.coordinates);
    }

    originToCurrentRoute.features[0].geometry.coordinates = arc;
    currentToDestinationRoute.features[0].geometry.coordinates = arc2;

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: originToCurrentRoute.features[0]
      });
      map.addSource('route2', {
        type: 'geojson',
        data: currentToDestinationRoute.features[0]
      });

      map.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: {
          'line-width': 2,
          'line-color':
            getItemFromStore('phoenixTheme') === 'dark'
              ? getColor('primary')
              : getColor('primary-light')
        }
      });
      map.addLayer({
        id: 'route2',
        source: 'route2',
        type: 'line',
        paint: {
          'line-width': 1,
          'line-color': getColor('warning')
        }
      });
    });
  }
};

const themeController = document.body;
if (themeController) {
  themeController.addEventListener('clickControl', () => {
    flightMapInit();
  });
}

export default flightMapInit;
