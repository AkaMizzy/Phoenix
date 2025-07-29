import {
  echartSetOption,
  tooltipFormatter,
  handleTooltipPosition
} from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                     Echart Bar booking                                 */
/* -------------------------------------------------------------------------- */
const { echarts } = window;

const bookingsChartInit = () => {
  const { getColor, getData, getPastDates, getItemFromStore, rgbaColor } =
    window.phoenix.utils;
  const $bookingsChart = document.querySelector('.echart-bookings');

  const fullfilledData = [
    [3500, 2500, 2600, 3400, 2300, 3200, 2800, 2800],
    [2736, 3874, 4192, 1948, 3567, 4821, 2315, 3986],
    [2789, 3895, 2147, 4658, 1723, 3210, 4386, 1974]
  ];

  const cencelledData = [
    [-1500, -2700, -1100, -1400, -1600, -1400, -1100, -2700],
    [-3874, -2631, -4422, -1765, -3198, -4910, -2087, -4675],
    [-2789, -3895, -2147, -4658, -1723, -3210, -4386, -1974]
  ];

  if ($bookingsChart) {
    const userOptions = getData($bookingsChart, 'echarts');
    const chart = echarts.init($bookingsChart);
    const getDefaultOptions = () => ({
      color: getColor('body-highlight-bg'),
      legend: {
        data: ['Fulfilled', 'Cancelled'],
        itemWidth: 16,
        itemHeight: 16,
        icon: 'circle',
        itemGap: 32,
        left: 0,
        inactiveColor: getColor('quaternary-color'),
        textStyle: {
          color: getColor('secondary-color'),
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
        position: (...params) => handleTooltipPosition(params),
        formatter: params => tooltipFormatter(params),
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'category',
        axisLabel: {
          color: getColor('secondary-text-emphasis'),
          formatter: value => window.dayjs(value).format('MMM DD'),
          fontFamily: 'Nunito Sans',
          fontWeight: 600,
          fontSize: 12.8
        },
        data: getPastDates(8),
        axisLine: {
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        },
        axisTick: false
      },
      yAxis: {
        axisLabel: {
          color: getColor('body-color'),
          formatter: value => `${Math.abs(Math.round(value / 1000))}K`,
          fontWeight: 700,
          fontFamily: 'Nunito Sans'
        },
        splitLine: {
          interval: 10,
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        }
      },
      series: [
        {
          name: 'Fulfilled',
          type: 'bar',
          stack: 'one',
          data: fullfilledData[0],
          barWidth: '27%',
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? getColor('info')
                : getColor('info-light')
          }
        },
        {
          name: 'Cancelled',
          type: 'bar',
          stack: 'one',
          barWidth: '27%',
          data: cencelledData[0],
          itemStyle: {
            borderRadius: [0, 0, 4, 4],
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('info'), 0.5)
                : getColor('info-lighter')
          }
        }
      ],
      grid: { left: 0, right: 8, top: 52, bottom: 0, containLabel: true }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    const bookingSelect = document.querySelector('[data-booking-options]');
    if (bookingSelect) {
      bookingSelect.addEventListener('change', e => {
        const { value } = e.currentTarget;
        const data1 = fullfilledData[value];
        const data2 = cencelledData[value];
        chart.setOption({
          series: [
            {
              data: data1
            },
            {
              data: data2
            }
          ]
        });
      });
    }
  }
};

export default bookingsChartInit;
