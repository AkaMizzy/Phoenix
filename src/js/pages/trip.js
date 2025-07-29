import mapboxClusterInit from '../theme/mapbox-cluster';
import tripReviewChartInit from '../theme/charts/echarts/trip-review-chart';

const { docReady } = window.phoenix.utils;

docReady(tripReviewChartInit);
docReady(mapboxClusterInit);
