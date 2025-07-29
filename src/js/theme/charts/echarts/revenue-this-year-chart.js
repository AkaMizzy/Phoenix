import { echartSetOption } from './echarts-utils';

const revenueThisYearChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-revenue-this-year-chart');

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      series: [
        {
          type: 'pie',
          radius: ['100%', '70%'],
          avoidLabelOverlap: false,
          hoverAnimation: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: [
            {
              value: 1200,
              name: 'This Year',
              itemStyle: {
                color: getColor('info-light')
              }
            },
            {
              value: 1000,
              name: 'Previous Year',
              itemStyle: {
                color: getColor('info-lighter')
              }
            }
          ]
        }
      ],
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
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

export default revenueThisYearChartInit;
