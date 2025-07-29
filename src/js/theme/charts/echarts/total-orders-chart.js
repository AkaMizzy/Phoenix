import { echartSetOption, handleTooltipPosition } from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const totalOrdersChartInit = () => {
  const { getColor, getData, getDates } = window.phoenix.utils;
  const totalOrdersChartEl = document.querySelector('.echart-total-orders');

  if (totalOrdersChartEl) {
    const userOptions = getData(totalOrdersChartEl, 'echarts');
    const chart = window.echarts.init(totalOrdersChartEl);

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
          barWidth: '5px',
          data: [120, 200, 150, 80, 70, 110, 120],
          showBackground: true,
          symbol: 'none',
          itemStyle: {
            borderRadius: 10
          },
          backgroundStyle: {
            borderRadius: 10,
            color: getColor('primary-bg-subtle')
          }
        }
      ],
      grid: { right: 10, left: 10, bottom: 0, top: 0 }
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default totalOrdersChartInit;
