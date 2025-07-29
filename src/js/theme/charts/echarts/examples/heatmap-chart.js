import { echartSetOption } from '../echarts-utils';

const heatmapChartInit = () => {
  const { getColor, getData, rgbaColor, getRandomNumber } =
    window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-heatmap-chart-example');

  const hours = [
    '12a',
    '2a',
    '4a',
    '6a',
    '8a',
    '10a',
    '12p',
    '2p',
    '4p',
    '6p',
    '8p',
    '10p'
  ];
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  const data = [];
  for (let i = 0; i < 7; i += 1) {
    for (let j = 0; j < 12; j += 1) {
      data.push([j, i, getRandomNumber(5, 12)]);
    }
  }

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      tooltip: {
        position: 'top',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1
      },
      grid: {
        right: 5,
        left: 5,
        top: 5,
        bottom: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: hours,
        splitArea: {
          show: true
        },
        axisLabel: {
          color: getColor('quaternary-color')
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: getColor('quaternary-color')
          }
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        axisLabel: {
          formatter: value => value.substring(0, 3),
          color: getColor('quaternary-color')
        },
        splitArea: {
          show: true
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: getColor('quaternary-color')
          }
        }
      },
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        textStyle: {
          color: getColor('tertiary-color'),
          fontWeight: 500
        },
        inRange: {
          color: [
            rgbaColor(getColor('primary'), 1),
            rgbaColor(getColor('info'), 1),
            rgbaColor(getColor('success'), 1)
            // utils.rgbaColor(utils.getColors()['warning'], 1),
            // utils.rgbaColor(utils.getColors()['danger'], 1)
          ]
        }
      },
      series: [
        {
          type: 'heatmap',
          data,
          label: {
            show: true
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: rgbaColor(getColor('black'), 0.5)
            }
          }
        }
      ]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default heatmapChartInit;
