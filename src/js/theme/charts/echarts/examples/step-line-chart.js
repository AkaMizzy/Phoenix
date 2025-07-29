import { echartSetOption, tooltipFormatter } from '../echarts-utils';

const stepLineChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-step-line-chart-example');

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      color: [getColor('danger'), getColor('warning'), getColor('primary')],

      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => tooltipFormatter(params)
      },
      xAxis: {
        type: 'category',
        data: days,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: getColor('tertiary-bg'),
            type: 'solid'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          formatter: value => value.substring(0, 3),
          color: getColor('quaternary-color'),
          margin: 15
        },
        splitLine: {
          show: false
        },
        axisPointer: {
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: getColor('quaternary-color'),
          margin: 15
        },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [
        {
          name: 'Step Start',
          type: 'line',
          step: 'start',
          symbolSize: 10,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('primary'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('primary')
          },
          symbol: 'circle',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Step Middle',
          type: 'line',
          step: 'middle',
          symbolSize: 10,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('warning'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('warning')
          },
          symbol: 'circle',
          data: [220, 282, 201, 234, 290, 430, 410]
        },
        {
          name: 'Step End',
          type: 'line',
          step: 'end',
          symbolSize: 10,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('danger'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('danger')
          },
          symbol: 'circle',
          data: [450, 432, 401, 454, 590, 530, 510]
        }
      ],
      grid: { right: '3%', left: '8%', bottom: '10%', top: '5%' }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default stepLineChartInit;
