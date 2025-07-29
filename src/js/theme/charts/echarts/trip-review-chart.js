import { echartSetOption, handleTooltipPosition } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                             Echarts trip review                            */
/* -------------------------------------------------------------------------- */

const { echarts } = window;

const tripReviewChartInit = () => {
  const { getData, getColor } = window.phoenix.utils;
  const $echartTripReviews = document.querySelectorAll('.echart-trip-review');

  if ($echartTripReviews) {
    $echartTripReviews.forEach($echartTripReview => {
      const userOptions = getData($echartTripReview, 'options');
      const chart = echarts.init($echartTripReview);

      const getDefaultOptions = () => ({
        tooltip: {
          trigger: 'item',
          padding: [7, 10],
          backgroundColor: getColor('body-highlight-bg'),
          borderColor: getColor('border-color'),
          textStyle: { color: getColor('light-text-emphasis') },
          borderWidth: 1,
          position: (...params) => handleTooltipPosition(params),
          transitionDuration: 0,
          formatter: params => {
            return `<strong>${params.seriesName}:</strong> ${params.value}%`;
          },
          extraCssText: 'z-index: 1000'
        },
        series: [
          {
            type: 'gauge',
            name: 'Commission',
            startAngle: 90,
            endAngle: -270,
            radius: '90%',
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              // roundCap: true,
              clip: false,
              itemStyle: {
                color: getColor('primary')
              }
            },
            axisLine: {
              lineStyle: {
                width: 4,
                color: [[1, getColor('secondary-bg')]]
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            detail: {
              fontSize: '20px',
              color: getColor('body-color'),
              offsetCenter: [0, '10%']
            }
          }
        ]
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    });
  }
};

export default tripReviewChartInit;
