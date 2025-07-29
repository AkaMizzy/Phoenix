// import dayjs from 'dayjs';
// import * as echarts from 'echarts';
import { echartSetOption } from './echarts-utils';
/* -------------------------------------------------------------------------- */
/*                     Echart Bar Member info                                 */
/* -------------------------------------------------------------------------- */

const basicEchartsInit = () => {
  const { getColor, getData, getDates } = window.phoenix.utils;

  const $echartBasicCharts = document.querySelectorAll('[data-echarts]');
  $echartBasicCharts.forEach($echartBasicChart => {
    const userOptions = getData($echartBasicChart, 'echarts');
    const chart = window.echarts.init($echartBasicChart);
    const getDefaultOptions = () => ({
      color: getColor('primary'),
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'category',
        data: getDates(
          new Date('5/1/2022'),
          new Date('5/7/2022'),
          1000 * 60 * 60 * 24
        ),
        show: true,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: { color: getColor('secondary-bg') }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          formatter: value => window.dayjs(value).format('DD MMM'),
          interval: 6,
          showMinLabel: true,
          showMaxLabel: true,
          color: getColor('secondary-color')
        }
      },
      yAxis: {
        show: false,
        type: 'value',
        boundaryGap: false
      },
      series: [
        {
          type: 'bar',
          symbol: 'none'
        }
      ],
      grid: { left: 22, right: 22, top: 0, bottom: 20 }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  });
};

export default basicEchartsInit;
