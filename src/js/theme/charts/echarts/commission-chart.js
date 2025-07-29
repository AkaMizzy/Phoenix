import { echartSetOption, handleTooltipPosition } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                             Echarts commission                            */
/* -------------------------------------------------------------------------- */

const { echarts } = window;

const commissionChartInit = () => {
  const { getData, getColor } = window.phoenix.utils;
  const $echartCommission = document.querySelector('.echart-commission');

  if ($echartCommission) {
    const userOptions = getData($echartCommission, 'options');
    const chart = echarts.init($echartCommission);

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
            roundCap: true,
            clip: false,
            itemStyle: {
              color: getColor('primary')
            }
          },
          axisLine: {
            lineStyle: {
              width: 3,
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
          data: [
            {
              value: 70
            }
          ],
          detail: {
            show: false
          }
        }
      ]
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default commissionChartInit;
