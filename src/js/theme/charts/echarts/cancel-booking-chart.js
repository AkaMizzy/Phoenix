import { echartSetOption, handleTooltipPosition } from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts cancel booking                            */
/* -------------------------------------------------------------------------- */

const cancelBookingChartInit = () => {
  const { getColor, getData, getDates, getItemFromStore } =
    window.phoenix.utils;
  const cancelBookingChartEl = document.querySelector('.chart-cancel-booking');

  if (cancelBookingChartEl) {
    const userOptions = getData(cancelBookingChartEl, 'echarts');
    const chart = window.echarts.init(cancelBookingChartEl);

    const getDefaultOptions = () => ({
      color: getColor('primary'),
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        position: (...params) => handleTooltipPosition(params),
        borderWidth: 1,
        transitionDuration: 0,
        formatter: params => {
          return `<strong>${window
            .dayjs(params.name)
            .format('DD MMM')}:</strong> ${params.value}`;
        },
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'category',
        data: getDates(
          new Date('11/1/2023'),
          new Date('11/6/2023'),
          1000 * 60 * 60 * 24
        )
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          barWidth: 3,
          data: [120, 150, 100, 120, 110, 160],
          symbol: 'none',
          itemStyle: {
            borderRadius: [0.5, 0.5, 0, 0],
            colos:
              getItemFromStore('phoenixTheme') === 'dark'
                ? getColor('info')
                : getColor('info-light')
          }
        }
      ],
      grid: { right: 5, left: 0, bottom: 0, top: 0 }
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default cancelBookingChartInit;
