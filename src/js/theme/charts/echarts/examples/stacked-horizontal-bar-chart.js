import {
  echartSetOption,
  handleTooltipPosition,
  tooltipFormatter
} from '../echarts-utils';

const stackedHorizontalBarChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector(
    '.echart-stacked-horizontal-bar-chart-example'
  );

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
      color: [
        getColor('info'),
        getColor('danger'),
        getColor('warning'),
        getColor('success'),
        getColor('primary')
      ],
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
        position: (...params) => handleTooltipPosition(params),
        formatter: tooltipFormatter
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          }
        },
        right: 0
      },
      legend: {
        data: [
          'Direct',
          'Mail Ad',
          'Affiliate Ad',
          'Video Ad',
          'Search Engine'
        ],
        textStyle: {
          color: getColor('tertiary-color')
        },
        left: 0
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('quaternary-color')
        },
        splitLine: {
          lineStyle: {
            show: true,
            color: getColor('secondary-bg')
          }
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        axisLine: {
          lineStyle: {
            show: true,
            color: getColor('tertiary-bg')
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('quaternary-color'),
          formatter: value => value.substring(0, 3)
        }
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: [400, 241, 451, 150, 321, 330, 142]
        },
        {
          name: 'Mail Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [250, 200, 222, 240, 230, 230, 211]
        },
        {
          name: 'Affiliate Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: [190, 182, 170, 195, 260, 333, 124]
        },
        {
          name: 'Video Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          emphasis: {
            focus: 'series'
          },
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [1000, 900, 700, 1100, 1200, 1300, 1350]
        }
      ],
      grid: {
        right: 15,
        left: 5,
        bottom: 5,
        top: '15%',
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default stackedHorizontalBarChartInit;
