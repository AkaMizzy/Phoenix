import { echartSetOption } from '../echarts-utils';

const heatmapSingleSeriesChartInit = () => {
  const { getColor, getData, rgbaColor, getRandomNumber } =
    window.phoenix.utils;
  const $chartEl = document.querySelector(
    '.echart-heatmap-single-series-chart-example'
  );

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
      data.push([j, i, getRandomNumber(1, 12)]);
    }
  }

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      gradientColor: [
        rgbaColor(getColor('info'), 1),
        rgbaColor(getColor('primary'), 1)
      ],

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
        bottom: 5,
        containLabel: true
      },
      xAxis: {
        axisTick: { show: false },
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
        axisTick: { show: false },
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
        show: false,
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '0%',
        textStyle: {
          color: getColor('quaternary-color'),
          fontWeight: 500
        }
      },

      series: [
        {
          type: 'heatmap',
          data,
          label: {
            show: true
          },
          itemStyle: {
            borderColor: getColor('body-highlight-bg'),
            borderWidth: 3
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

export default heatmapSingleSeriesChartInit;
