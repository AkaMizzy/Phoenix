import { echartSetOption, tooltipFormatter } from './echarts-utils';

const revenueNextYearInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-revenue-next-year-chart');

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        formatter: params => tooltipFormatter(params),
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      xAxis: {
        type: 'category',
        data: [2024, 2025],
        axisLine: {
          show: false,
          lineStyle: {
            color: getColor('tertiary-bg'),
            type: 'solid'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        axisLabel: {
          show: false,
          color: getColor('quaternary-color')
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [
        {
          type: 'bar',
          name: 'This Year',
          data: [
            {
              value: 1200,
              lineStyle: { color: getColor('primary-lighter') },
              itemStyle: {
                color: getColor('primary-lighter'),
                barBorderRadius: [3, 3, 0, 0]
              }
            },
            {
              value: 2400,
              lineStyle: { color: getColor('primary-light') },
              itemStyle: {
                color: getColor('primary-light'),
                barBorderRadius: [3, 3, 0, 0]
              }
            }
          ],
          barWidth: 15,
          showSymbol: false,
          symbol: 'circle',
          smooth: false,
          hoverAnimation: true
        }
      ],
      grid: { right: 0, left: 0, bottom: 0, top: 0 }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
      tab.addEventListener('shown.bs.tab', () => {
        setTimeout(() => {
          chart.resize();
        }, 100);
      });
    });
  }
};

export default revenueNextYearInit;
