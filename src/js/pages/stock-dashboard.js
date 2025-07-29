import stockOverviewChartInit from '../theme/charts/echarts/stock-overview-chart';
import stockOverviewInvertedChartInit from '../theme/charts/echarts/stock-overview-inverted-chart';
import stockOverviewMixedChartInit from '../theme/charts/echarts/stock-overview-mixed-chart';
import topStockChartInit from '../theme/charts/chartjs/top-stock-chart';

const { docReady } = window.phoenix.utils;

docReady(stockOverviewChartInit);
docReady(stockOverviewInvertedChartInit);
docReady(stockOverviewMixedChartInit);
docReady(topStockChartInit);
