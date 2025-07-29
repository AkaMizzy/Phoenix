import { months } from '../../../data/data';
import { echartSetOption, tooltipFormatter } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                     Echart Bar Member info                                 */
/* -------------------------------------------------------------------------- */
const { echarts } = window;

const returningCustomerChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;

  const $returningCustomerChart = document.querySelector(
    '.echart-returning-customer'
  );

  if ($returningCustomerChart) {
    const userOptions = getData($returningCustomerChart, 'echarts');
    const chart = echarts.init($returningCustomerChart);
    const getDefaultOptions = () => ({
      color: getColor('body-highlight-bg'),
      legend: {
        data: [
          {
            name: 'Fourth time',
            icon: 'roundRect',
            itemStyle: {
              color: getColor('primary-light'),
              borderWidth: 0
            }
          },
          {
            name: 'Third time',
            icon: 'roundRect',
            itemStyle: { color: getColor('info-lighter'), borderWidth: 0 }
          },
          {
            name: 'Second time',
            icon: 'roundRect',
            itemStyle: { color: getColor('primary'), borderWidth: 0 }
          }
        ],

        right: 'right',
        width: '100%',
        itemWidth: 16,
        itemHeight: 8,
        itemGap: 20,
        top: 3,
        inactiveColor: getColor('quaternary-color'),
        inactiveBorderWidth: 0,
        textStyle: {
          color: getColor('body-color'),
          fontWeight: 600,
          fontFamily: 'Nunito Sans'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: tooltipFormatter,
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'category',
        data: months,
        show: true,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: { color: getColor('tertiary-bg') }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          // interval: 1,
          showMinLabel: false,
          showMaxLabel: false,
          color: getColor('secondary-color'),
          formatter: value => value.slice(0, 3),
          fontFamily: 'Nunito Sans',
          fontWeight: 600,
          fontSize: 12.8
        },
        splitLine: {
          show: true,
          lineStyle: { color: getColor('secondary-bg'), type: 'dashed' }
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        axisLabel: {
          showMinLabel: true,
          showMaxLabel: true,
          color: getColor('secondary-color'),
          formatter: value => `${value}%`,
          fontFamily: 'Nunito Sans',
          fontWeight: 600,
          fontSize: 12.8
        },
        splitLine: {
          show: true,
          lineStyle: { color: getColor('secondary-bg') }
        }
      },
      series: [
        {
          name: 'Fourth time',
          type: 'line',
          data: [62, 90, 90, 90, 78, 84, 17, 17, 17, 17, 82, 95],
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            lineStyle: {
              width: 1
            }
          },
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: getColor('primary-light')
          },
          itemStyle: {
            borderColor: getColor('primary-light'),
            borderWidth: 3
          },
          zlevel: 3
        },
        {
          name: 'Third time',
          type: 'line',
          data: [50, 50, 30, 62, 18, 70, 70, 22, 70, 70, 70, 70],
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            lineStyle: {
              width: 1
            }
          },
          lineStyle: {
            width: 1,
            color: getColor('info-lighter')
          },
          itemStyle: {
            borderColor: getColor('info-lighter'),
            borderWidth: 3
          },
          zlevel: 2
        },
        {
          name: 'Second time',
          type: 'line',
          data: [40, 78, 60, 78, 60, 20, 60, 40, 60, 40, 20, 78],
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 10,
          emphasis: {
            lineStyle: {
              width: 3
            }
          },
          lineStyle: {
            width: 3,
            color: getColor('primary')
          },
          itemStyle: {
            borderColor: getColor('primary'),
            borderWidth: 3
          },
          zlevel: 1
        }
      ],
      grid: { left: 0, right: 8, top: '14%', bottom: 0, containLabel: true }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default returningCustomerChartInit;
