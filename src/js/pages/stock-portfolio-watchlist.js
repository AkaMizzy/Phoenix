import portfolioLineChartInit from '../theme/charts/echarts/portfolio-line-chart';
import watchlistReportChartInit from '../theme/charts/echarts/watchlist-chart-report';
import stockOverviewChartInit from '../theme/charts/echarts/stock-overview-chart';
import stockOverviewInvertedChartInit from '../theme/charts/echarts/stock-overview-inverted-chart';
import stockOverviewMixedChartInit from '../theme/charts/echarts/stock-overview-mixed-chart';

const { docReady } = window.phoenix.utils;

docReady(portfolioLineChartInit);
docReady(watchlistReportChartInit);

docReady(stockOverviewChartInit);
docReady(stockOverviewInvertedChartInit);
docReady(stockOverviewMixedChartInit);
