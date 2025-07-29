import { getColor } from '../utils';

/* -------------------------------------------------------------------------- */
/*                                   mapbox cluster                                  */
/* -------------------------------------------------------------------------- */

const mapboxClusterInit = () => {
  const mapboxCluster = document.querySelectorAll('#mapbox-cluster');
  if (mapboxCluster) {
    mapboxCluster.forEach(() => {
      window.mapboxgl.accessToken =
        'pk.eyJ1IjoidGhlbWV3YWdvbiIsImEiOiJjbGhmNW5ybzkxcmoxM2RvN2RmbW1nZW90In0.hGIvQ890TYkZ948MVrsMIQ';

      const styles = {
        default: 'mapbox://styles/mapbox/light-v11',
        light: 'mapbox://styles/themewagon/clj57pads001701qo25756jtw',
        dark: 'mapbox://styles/themewagon/cljzg9juf007x01pk1bepfgew'
      };

      const map = new window.mapboxgl.Map({
        container: 'mapbox-cluster',
        style: styles[window.config.config.phoenixTheme],
        center: [-73.102712, 7.102257],
        zoom: 3.5,
        pitch: 40,
        attributionControl: false
      });

      map.on('load', () => {
        map.addSource('earthquakes', {
          type: 'geojson',
          data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        });

        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              getColor('secondary'),
              100,
              getColor('info'),
              750,
              getColor('warning')
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'earthquakes',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': ['get', 'point_count_abbreviated'],
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          },
          paint: {
            'text-color': getColor('white')
          }
        });

        map.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'earthquakes',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': getColor('primary-light'),
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': getColor('emphasis-bg')
          }
        });

        map.on('click', 'clusters', e => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          map
            .getSource('earthquakes')
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom
              });
            });
        });

        map.on('click', 'unclustered-point', e => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { mag } = e.features[0].properties;
          const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new window.mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(`magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`)
            .addTo(map);
        });

        map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer';
        });
        map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = '';
        });
      });
    });
  }
};

const themeController = document.body;
if (themeController) {
  themeController.addEventListener('clickControl', () => {
    mapboxClusterInit();
  });
}

export default mapboxClusterInit;
