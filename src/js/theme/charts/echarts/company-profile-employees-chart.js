import { echartSetOption } from './echarts-utils';

const companyProfileEmployeesChartInit = () => {
  const { getColor, getData, rgbaColor } = window.phoenix.utils;
  const $chartEl = document.querySelector(
    '.echart-company-profile-employees-chart'
  );

  function generateYears(startYear, endYear) {
    return Array.from(
      { length: endYear - startYear + 1 },
      (_, i) => startYear + i
    );
  }
  const year = generateYears(1998, 2024);

  const data = [
    {
      value: -15,
      lineStyle: { color: getColor('info-light') },
      itemStyle: {
        color: getColor('info-light'),
        barBorderRadius: [0, 0, 3, 3]
      }
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
      value: -8,
      lineStyle: { color: getColor('info-light') },
      itemStyle: {
        color: getColor('info-light'),
        barBorderRadius: [0, 0, 3, 3]
      }
    },
    {
      value: 10
    },
    {
      value: 20
    },
    {
      value: 8
    },
    {
      value: -9,
      lineStyle: { color: getColor('info-light') },
      itemStyle: {
        color: getColor('info-light'),
        barBorderRadius: [0, 0, 3, 3]
      }
    },
    {
      value: 8
    },
    {
      value: 10
    },
    {
      value: 16
    },
    {
      value: 40
    },
    {
      value: 5
    },
    {
      value: -5,
      lineStyle: { color: getColor('info-light') },
      itemStyle: {
        color: getColor('info-light'),
        barBorderRadius: [0, 0, 3, 3]
      }
    },
    {
      value: 20
    },
    {
      value: 30
    },
    {
      value: 65
    },
    {
      value: 45
    },
    {
      value: 40
    },
    {
      value: 30
    },
    {
      value: 18
    },
    {
      value: 24
    },
    {
      value: 30
    },
    {
      value: 24
    },
    {
      value: 18
    },
    {
      value: 35
    },
    {
      value: 42
    },
    {
      value: 20
    },
    {
      value: 28
    },
    {
      value: 12
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
      color: [
        getColor('primary'),
        getColor('info'),
        getColor('warning'),
        getColor('danger')
      ],
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
        data: year,
        splitLine: { show: false },
        splitArea: { show: false },

        axisLabel: {
          color: getColor('tertiary-color'),
          rotate: 45
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
          color: getColor('body-color'),
          formatter: value => `${value}%`
        }
      },
      series: [
        {
          type: 'bar',
          name: 'Total',
          data,
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
        top: '8%',
        bottom: 10,
        left: 15,
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

export default companyProfileEmployeesChartInit;
