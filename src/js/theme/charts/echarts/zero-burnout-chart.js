import { echartSetOption, tooltipFormatter } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const zeroBurnOutChartInit = () => {
  const { getColor, getData, getPastDates } = window.phoenix.utils;
  const $zeroBurnOutChartEl = document.querySelector(
    '.echart-zero-burnout-chart'
  );

  if ($zeroBurnOutChartEl) {
    const userOptions = getData($zeroBurnOutChartEl, 'echarts');
    const chart = window.echarts.init($zeroBurnOutChartEl);

    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        backgroundColor: getColor('body-bg'),
        borderColor: getColor('secondary-bg'),
        formatter: params => tooltipFormatter(params, 'MMM DD, YYYY'),
        axisPointer: {
          shadowStyle: {
            color: 'red'
          }
        },
        extraCssText: 'z-index: 1000'
      },
      legend: {
        bottom: '10',
        data: [
          {
            name: 'Open',
            icon: 'roundRect'
          },
          {
            name: 'Issues found',
            icon: 'roundRect'
          },
          {
            name: 'In Progress',
            icon: 'roundRect'
          }
        ],
        itemWidth: 16,
        itemHeight: 8,
        itemGap: 10,
        inactiveColor: getColor('quaternary-color'),
        inactiveBorderWidth: 0,
        textStyle: {
          color: getColor('body-color'),
          fontWeight: 600,
          fontSize: 16,
          fontFamily: 'Nunito Sans'
        }
      },

      // grid: {
      //   left: '0%',
      //   right: '4%',
      //   bottom: '15%',
      //   top: '10%',
      //   containLabel: true,
      //   show: true
      // },

      xAxis: [
        {
          show: true,
          interval: 2,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: getColor('border-color')
            }
          },
          axisLabel: {
            color: getColor('body-color'),
            formatter: data => window.dayjs(data).format('D MMM'),
            interval: 5,
            align: 'left',
            margin: 20,
            fontSize: 12.8
          },
          axisTick: {
            show: true,
            length: 15
            // alignWithLabel: true
          },
          splitLine: {
            interval: 0,
            show: true,
            lineStyle: {
              color: getColor('border-color'),
              type: 'dashed'
            }
          },
          type: 'category',
          boundaryGap: false,
          data: getPastDates(15)
        },
        {
          show: true,
          interval: 2,
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            interval: 1,
            show: true,
            lineStyle: {
              color: getColor('border-color'),
              type: 'solid'
            }
          },
          boundaryGap: false,
          data: getPastDates(15)
        }
      ],
      yAxis: {
        show: true,
        type: 'value',
        axisLine: {
          lineStyle: {
            type: 'solid',
            color: getColor('border-color')
          }
        },
        axisLabel: {
          color: getColor('body-color'),
          margin: 20,
          fontSize: 12.8,
          interval: 0
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: getColor('border-color'),
            type: 'solid'
          }
        },
        axisTick: {
          show: true,
          length: 15,
          alignWithLabel: true,
          lineStyle: {
            color: getColor('border-color')
          }
        }
        // data: ['0', '10', '20']
      },
      series: [
        {
          name: 'Estimated',
          type: 'line',
          symbol: 'none',
          data: [20, 17.5, 15, 15, 15, 12.5, 10, 7.5, 5, 2.5, 2.5, 2.5, 0],
          lineStyle: {
            width: 0
          },
          areaStyle: {
            color: getColor('primary-light'),
            opacity: 0.075
          },
          tooltip: {
            show: false
          }
        },
        {
          name: 'Issues found',
          type: 'line',
          symbolSize: 6,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('success'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('success')
          },
          symbol: 'circle',
          data: [3, 1, 2, 4, 3, 1]
        },
        {
          name: 'Open',
          type: 'line',
          symbolSize: 6,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('info'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('info')
          },
          symbol: 'circle',
          data: [6, 5, 4, 6, 5, 5]
        },
        {
          name: 'In Progress',
          type: 'line',
          symbolSize: 6,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('warning'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('warning')
          },
          symbol: 'circle',
          data: [11, 12, 11, 9, 11, 6]
        },
        {
          name: 'Actual',
          type: 'line',
          symbolSize: 6,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('quaternary-color'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('quaternary-color'),
            type: 'dashed'
          },
          symbol: 'circle',
          data: [20, 19, 15, 14, 12, 8]
        }
      ],
      grid: {
        right: 5,
        left: 0,
        bottom: '15%',
        top: 20,
        containLabel: true
      }
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default zeroBurnOutChartInit;
