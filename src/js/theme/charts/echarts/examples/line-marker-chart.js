import { echartSetOption, tooltipFormatter } from '../echarts-utils';

const lineMarkerChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-line-marker-chart-example');
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
        getColor('primary'),
        getColor('warning')
        // getColor('danger')
      ],
      legend: {
        data: [
          {
            name: 'Max',
            textStyle: {
              color: getColor('quaternary-color')
            }
          },
          {
            name: 'Min',
            textStyle: {
              color: getColor('quaternary-color')
            }
          }
        ]
      },
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
        },
        formatter: tooltipFormatter
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
          name: 'Max',
          type: 'line',
          data: [10, 11, 13, 11, 12, 9, 12],
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
          markPoint: {
            itemStyle: {
              color: getColor('primary')
            },
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            lineStyle: {
              color: getColor('primary')
            },
            label: {
              color: getColor('quaternary-color')
            },
            data: [{ type: 'average', name: 'average' }]
          }
        },
        {
          name: 'Min',
          type: 'line',
          data: [1, -2, 2, 5, 3, 2, 0],
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
          markPoint: {
            itemStyle: {
              color: getColor('danger')
            },
            label: {
              color: '#fff'
            },
            data: [{ name: 'Weekly lowest', value: -2, xAxis: 1, yAxis: -1.5 }]
          },
          markLine: {
            lineStyle: {
              color: getColor('danger')
            },
            label: {
              color: getColor('quaternary-color')
            },
            data: [
              { type: 'average', name: 'average' },
              [
                {
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Max'
                  },
                  type: 'max',
                  name: 'Highest point'
                }
              ]
            ]
          }
        }
      ],
      grid: { right: '5%', left: '5%', bottom: '10%', top: '15%' }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default lineMarkerChartInit;
