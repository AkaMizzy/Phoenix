import { echartSetOption, tooltipFormatter } from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const contactsCreatedChartInit = () => {
  const { getColor, getData, getPastDates } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-contacts-created');

  const dates = getPastDates(9);

  const data1 = [24, 14, 30, 24, 32, 32, 18, 12, 32];

  const data2 = [36, 28, 36, 39, 54, 38, 22, 34, 52];

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);

    const getDefaultOptions = () => ({
      color: [getColor('primary'), getColor('tertiary-bg')],
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
        formatter: params => tooltipFormatter(params),
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'category',
        // boundaryGap: false,
        axisLabel: {
          color: getColor('secondary-color'),
          formatter: value => window.dayjs(value).format('D MMM, YY'),
          fontFamily: 'Nunito Sans',
          fontWeight: 600,
          fontSize: 10.24,
          padding: [0, 0, 0, 20]
        },
        splitLine: {
          show: true,
          interval: '10',
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        },
        show: true,
        interval: 10,
        data: dates,
        axisLine: {
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        },
        axisTick: false
      },
      yAxis: {
        axisPointer: { type: 'none' },
        position: 'right',
        axisTick: 'none',
        splitLine: {
          interval: 5,
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        axisLine: { show: false },
        axisLabel: {
          fontFamily: 'Nunito Sans',
          fontWeight: 700,
          fontSize: 12.8,
          color: getColor('body-color'),
          margin: 20,
          verticalAlign: 'top',
          formatter: value => `${value.toLocaleString()}`
        }
      },
      series: [
        {
          name: 'Actual revenue',
          type: 'bar',
          data: data1,
          barWidth: '4px',
          barGap: '3',
          label: {
            show: true,
            position: 'top',
            color: getColor('body-color'),
            fontWeight: 'bold',
            fontSize: '10.24px'
          },
          z: 10,
          itemStyle: {
            borderRadius: [2, 2, 0, 0],
            color: getColor('tertiary-bg')
          }
        },
        {
          name: 'Projected revenue',
          type: 'bar',
          barWidth: '4px',
          data: data2,
          label: {
            show: true,
            position: 'top',
            color: getColor('primary'),
            fontWeight: 'bold',
            fontSize: '10.24px'
          },
          itemStyle: {
            borderRadius: [2, 2, 0, 0],
            color: getColor('primary')
          }
        }
      ],
      grid: {
        right: 3,
        left: 6,
        bottom: 0,
        top: '5%',
        containLabel: true
      },
      animation: false
    });

    const responsiveOptions = {
      xs: {
        series: [
          {
            label: {
              show: false
            }
          },
          {
            label: {
              show: false
            }
          }
        ]
      }
    };

    echartSetOption(chart, userOptions, getDefaultOptions, responsiveOptions);
  }
};

export default contactsCreatedChartInit;
