import { echartSetOption, tooltipFormatter } from './echarts-utils';
import { watchlistReportChartData } from '../../../data/stock-data';

const watchlistReportChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;

  const formatXAxisLabel = (range, value) => {
    switch (range) {
      case '1d':
        return value;
      case '5d':
      case '1m':
      case '3m':
        return window.dayjs(value).format('MMM DD');
      case 'all':
        return window.dayjs(value).format('YYYY');
      default:
        return window.dayjs(value).format('MMM');
    }
  };

  const getDefaultOptions = (data, range) => () => ({
    dataZoom: {
      type: 'inside',
      start: 30,
      end: 100,
      minValueSpan: 10,
      disabled: data.length < 25
    },
    tooltip: {
      trigger: 'axis',
      padding: [7, 10],
      backgroundColor: getColor('body-highlight-bg'),
      borderColor: getColor('border-color'),
      textStyle: { color: getColor('light-text-emphasis') },
      borderWidth: 1,
      formatter: params => tooltipFormatter(params),
      transitionDuration: 0,
      axisPointer: {
        type: 'none'
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item[0]),
      axisLine: {
        lineStyle: {
          color: getColor('border-color-translucent'),
          type: 'solid'
        }
      },
      axisTick: { show: false },
      axisLabel: {
        color: getColor('tertiary-color'),
        formatter: value => formatXAxisLabel(range, value),
        margin: 15
      },
      splitLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: true,
      position: 'right',
      axisLabel: {
        show: true,
        color: getColor('body-color'),
        margin: 15,
        formatter: value => `$${value}`
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: getColor('secondary-bg')
        }
      },
      axisTick: { show: false },
      axisLine: { show: false },
      min: 0,
      interval: 80,
      max: 400
    },
    series: [
      {
        type: 'bar',
        name: 'Total',
        data: data.map(item => item[1]),
        lineStyle: { color: getColor('primary-light') },
        itemStyle: {
          color: getColor('primary-light'),
          barBorderRadius: [3, 3, 0, 0]
        },
        showSymbol: false,
        symbol: 'circle',
        smooth: false,
        hoverAnimation: true,
        barWidth: 16
      }
    ],
    grid: {
      right: 5,
      left: 8,
      bottom: 5,
      top: 10,
      containLabel: true
    }
  });

  const initChart = (el, options) => {
    const userOptions = getData(el, 'options');
    const chart = window.echarts.init(el);

    echartSetOption(chart, userOptions, options);
  };

  initChart(
    document.querySelector('.echart-watchlist-report-chart'),
    getDefaultOptions(watchlistReportChartData['1y'], '1y')
  );
  const buttons = document.querySelectorAll('[data-bar-filter]');

  if (buttons.length) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const $chartEl = document.querySelector(
          '.echart-watchlist-report-chart'
        );

        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const range = getData(button, 'value');
        const chartData = watchlistReportChartData[range];

        initChart($chartEl, getDefaultOptions(chartData, range));
      });
    });
  }
};

export default watchlistReportChartInit;
