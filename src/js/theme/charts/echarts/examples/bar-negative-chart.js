import { echartSetOption, tooltipFormatter } from '../echarts-utils';

const barNegativeChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-bar-negative-chart-example');

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => tooltipFormatter(params)
      },
      grid: {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
      },
      xAxis: {
        type: 'value',
        position: 'top',
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: getColor('secondary-bg')
          }
        }
      },
      yAxis: {
        type: 'category',
        axisLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        data: [
          'Ten',
          'Nine',
          'Eight',
          'Seven',
          'Six',
          'Five',
          'Four',
          'Three',
          'Two',
          'One'
        ]
      },
      series: [
        {
          name: 'Cost',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            formatter: '{b}',
            color: '#fff'
          },
          itemStyle: {
            color: getColor('primary')
          },
          data: [-0.15, -0.45, 0.3, 0.55, -0.23, 0.09, -0.56, 0.47, -0.36, 0.32]
        }
      ]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default barNegativeChartInit;
