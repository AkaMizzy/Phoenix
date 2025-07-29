import { echartSetOption } from './echarts-utils';
import { portfolioLineChartData } from '../../../data/stock-data';

const portfolioLineChartInit = () => {
  const { getColor, rgbaColor, getData, breakpoints } = window.phoenix.utils;

  const formatXAxisLabel = (range, value) => {
    switch (range) {
      case '1d':
        return value;
      case '6m':
      case '1y':
        return window.dayjs(value).format('MMM');
      case 'all':
        return window.dayjs(value).format('YYYY');
      default:
        return window.dayjs(value).format('MMM DD');
    }
  };

  const formatInterval = (range, width) => {
    switch (range) {
      case '1y':
        return width <= breakpoints.sm ? 'auto' : 5;
      case 'all':
        return width <= breakpoints.sm ? 'auto' : 10;
      default:
        return 'auto';
    }
  };

  const getDefaultOptions = (data, range, screenWidth) => () => ({
    tooltip: {
      trigger: 'axis',
      padding: [7, 10],
      backgroundColor: getColor('body-highlight-bg'),
      borderColor: getColor('border-color'),
      textStyle: { color: getColor('light-text-emphasis') },
      borderWidth: 1,
      transitionDuration: 0,
      axisPointer: {
        type: 'none'
      }
    },
    dataZoom: {
      type: 'inside',
      start: 0,
      end: 100,
      minValueSpan: 17,
      disabled: data.length < 25
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item[0]),
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: getColor('border-color-translucent')
        }
      },
      axisTick: { show: false },
      axisLabel: {
        hideOverlap: data.length > 31,
        showMinLabel: true,
        color: getColor('tertiary-color'),
        formatter: value => formatXAxisLabel(range, value),
        margin: 15,
        interval: formatInterval(range, screenWidth)
      },
      splitLine: {
        show: false
      },
      animationDuration: 200,
      animationEasing: 'cubicOut'
    },
    yAxis: {
      type: 'value',
      position: 'right',
      splitLine: {
        lineStyle: {
          type: 'line',
          color: getColor('border-color-translucent')
        }
      },
      boundaryGap: false,
      axisLabel: {
        show: true,
        color: getColor('body-color'),
        margin: 15,
        formatter: value => `${value}K`,
        interval: 20
      },
      axisTick: { show: false },
      axisLine: { show: false },
      max: 100
    },
    series: [
      {
        type: 'line',
        name: 'Growth',
        data: data.map(item => item[1]),
        itemStyle: {
          color: getColor('body-highlight-bg'),
          borderColor: getColor('primary'),
          borderWidth: 1
        },
        lineStyle: {
          color: getColor('primary'),
          width: 1
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: rgbaColor(getColor('primary'), 0.5)
              },
              {
                offset: 1,
                color: rgbaColor(getColor('primary'), 0)
              }
            ]
          }
        },
        showSymbol: false,
        symbol: 'circle',
        symbolSize: 10,
        hoverAnimation: true
      }
    ],
    grid: {
      right: 3,
      left: 20,
      bottom: 10,
      top: 5,
      containLabel: true
    },
    animationDurationUpdate: 200,
    animationEasingUpdate: 'cubicOut'
  });

  const initChart = (el, range) => {
    if (!el) return;

    const $chart = window.echarts.init(el);

    const updateChart = () => {
      const screenWidth = window.innerWidth;
      const userOptions = getData(el, 'options');
      const chartData = portfolioLineChartData[range];
      const chartOptions = getDefaultOptions(chartData, range, screenWidth);
      echartSetOption($chart, userOptions, chartOptions);
    };

    updateChart();

    window.addEventListener('resize', () => {
      updateChart();
    });
  };
  const $chartEl = document.querySelector('.echart-portfolio-line-chart');

  initChart($chartEl, '1y');
  const buttons = document.querySelectorAll('[data-line-filter]');
  if (buttons.length) {
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const range = getData(button, 'value');
        initChart($chartEl, range);
      });
    });
  }
};

export default portfolioLineChartInit;
