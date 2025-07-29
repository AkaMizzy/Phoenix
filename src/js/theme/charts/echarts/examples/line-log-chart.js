import { echartSetOption, tooltipFormatter } from '../echarts-utils';

const lineLogChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-line-log-chart-example');

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        },
        formatter: params => tooltipFormatter(params)
      },
      xAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        },
        axisLabel: {
          color: getColor('quaternary-color')
        },
        splitLine: { show: false },
        data: Array.from(Array(10).keys()).map(item => item + 1)
      },
      yAxis: {
        type: 'log',
        axisLabel: {
          color: getColor('quaternary-color')
        },
        splitLine: {
          lineStyle: {
            color: getColor('secondary-bg')
          }
        }
      },
      series: [
        {
          name: 'Index Of 3',
          type: 'line',
          data: [1, 3, 9, 27, 81, 247, 741, 2223, 6669],
          symbolSize: 7,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('danger'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('danger')
          },
          symbol: 'circle'
        },
        {
          name: 'Index of 2',
          type: 'line',
          data: [1, 2, 4, 8, 16, 32, 64, 128, 256],
          symbolSize: 7,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('success'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('success')
          },
          symbol: 'circle'
        },
        {
          name: 'Index of 1/2',
          type: 'line',
          data: [
            1 / 2,
            1 / 4,
            1 / 8,
            1 / 16,
            1 / 32,
            1 / 64,
            1 / 128,
            1 / 256,
            1 / 512
          ],
          symbolSize: 7,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('info'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('info')
          },
          symbol: 'circle'
        }
      ],
      grid: {
        right: 10,
        left: 5,
        bottom: 5,
        top: 10,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default lineLogChartInit;
