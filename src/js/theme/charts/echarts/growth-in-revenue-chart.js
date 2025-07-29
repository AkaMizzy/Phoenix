import { echartSetOption } from './echarts-utils';

const growthInRevenueChartInit = () => {
  const { getColor, getData, rgbaColor } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-growth-in-revenue-chart');

  const data = [
    {
      value: 4
    },
    {
      value: -12,
      lineStyle: { color: getColor('info-light') },
      itemStyle: {
        color: getColor('info-light'),
        barBorderRadius: [0, 0, 3, 3]
      }
    },
    {
      value: -15,
      lineStyle: { color: getColor('info-light') },
      itemStyle: {
        color: getColor('info-light'),
        barBorderRadius: [0, 0, 3, 3]
      }
    },
    {
      value: 15
    },
    {
      value: 22
    },
    {
      value: 15
    },
    {
      value: 20
    },
    {
      value: 18
    }
  ];

  const emphasisStyle = {
    itemStyle: {
      shadowBlur: 10,
      shadowColor: rgbaColor(getColor('light-text-emphasis'), 0.3)
    }
  };

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
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
        data: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        splitLine: { show: false },
        splitArea: { show: false },

        axisLabel: {
          color: getColor('body-color')
        },
        axisTick: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        }
      },
      yAxis: {
        position: 'right',
        splitLine: {
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        axisLabel: {
          color: getColor('tertiary-color'),
          formatter: value => `${value}%`
        }
      },
      series: [
        {
          type: 'bar',
          name: 'Total',
          data,
          barWidth: 24,
          lineStyle: { color: getColor('primary-light') },
          itemStyle: {
            color: getColor('primary-light'),
            barBorderRadius: [3, 3, 0, 0]
          },
          showSymbol: false,
          symbol: 'circle',
          smooth: false,
          hoverAnimation: true,
          emphasis: emphasisStyle
        }
      ],
      grid: {
        top: '10%',
        bottom: 10,
        left: 5,
        right: 7,
        containLabel: true
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

export default growthInRevenueChartInit;
