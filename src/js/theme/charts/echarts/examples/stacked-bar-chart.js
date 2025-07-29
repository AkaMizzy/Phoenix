import { echartSetOption } from '../echarts-utils';

const stackedBarChartInit = () => {
  const { getColor, getData, rgbaColor } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-stacked-bar-chart-example');

  const xAxisData = [];
  const data1 = [];
  const data2 = [];
  const data3 = [];
  const data4 = [];

  for (let i = 0; i < 10; i += 1) {
    xAxisData.push('Class'.concat(i + 1));
    data1.push((Math.random() * 2).toFixed(2));
    data2.push((Math.random() * 5).toFixed(2));
    data3.push((Math.random() + 0.3).toFixed(2));
    data4.push(-Math.random().toFixed(2));
  }

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
      legend: {
        data: ['Bar1', 'Bar2', 'Bar3', 'Bar4'],
        textStyle: {
          color: getColor('tertiary-color')
        },
        left: 0
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          }
        },
        iconStyle: {
          borderColor: getColor('tertiary-color'),
          borderWidth: 1
        }
      },
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
        data: xAxisData,
        splitLine: { show: false },
        splitArea: { show: false },

        axisLabel: {
          color: getColor('quaternary-color')
        },

        axisLine: {
          lineStyle: {
            color: getColor('quaternary-color')
          }
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        axisLabel: {
          color: getColor('quaternary-color')
        }
      },
      series: [
        {
          name: 'Bar1',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data1
        },
        {
          name: 'Bar2',
          type: 'bar',
          stack: 'one',
          emphasis: emphasisStyle,
          data: data2
        },
        {
          name: 'Bar3',
          type: 'bar',
          stack: 'two',
          emphasis: emphasisStyle,
          data: data3
        },
        {
          name: 'Bar4',
          type: 'bar',
          stack: 'two',
          emphasis: emphasisStyle,
          data: data4
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
  }
};

export default stackedBarChartInit;
