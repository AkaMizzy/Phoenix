import { echartSetOption } from './echarts-utils';

const epsThisYearChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-eps-this-year-chart');

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      color: [getColor('success-lighter'), getColor('success-light')],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      xAxis: {
        data: ['eps', 'eps1'],
        splitLine: { show: false },
        splitArea: { show: false },

        axisLabel: {
          show: false,
          color: getColor('quaternary-color')
        },

        axisLine: {
          show: false
        },
        axisTick: { show: false }
      },
      yAxis: {
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false,
          color: getColor('quaternary-color')
        },
        axisTick: { show: false },
        axisLine: { show: false }
      },
      series: [
        {
          name: 'Previous year',
          type: 'bar',
          stack: 'one',
          data: [2500],
          barWidth: 24,
          barGap: '-100%',
          lineStyle: { color: getColor('success-lighter') },
          itemStyle: {
            color: getColor('success-lighter')
          }
        },
        {
          name: 'This year',
          type: 'bar',
          stack: 'one',
          data: [3000],
          lineStyle: { color: getColor('success-light') },
          itemStyle: {
            color: getColor('success-light'),
            barBorderRadius: [3, 3, 0, 0]
          }
        }
      ],
      grid: {
        top: '10%',
        bottom: 0,
        left: 0,
        right: 0
      }
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

export default epsThisYearChartInit;
