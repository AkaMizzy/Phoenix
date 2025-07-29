import {
  echartSetOption,
  handleTooltipPosition,
  tooltipFormatter
} from './echarts-utils';

const dividendsGrowthChartInit = () => {
  const { getColor, getData, rgbaColor } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-dividend-growth-chart');
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const data = [40, 37, 28, 45, 26, 29, 23];

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
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        },
        position: (...params) => handleTooltipPosition(params),
        formatter: params => tooltipFormatter(params)
      },
      xAxis: {
        type: 'category',
        data: years,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: getColor('tertiary-bg'),
            type: 'solid'
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('body-color'),
          margin: 15
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: getColor('body-color'),
          fontWeight: 700,
          margin: 15,
          formatter: value => `${value}%`
        },
        axisTick: { show: false },
        axisLine: { show: false },
        max: 60
      },
      series: [
        {
          name: 'Matcha Latte',
          type: 'line',
          symbolSize: 10,
          stack: 'product',
          data,
          areaStyle: {
            color: rgbaColor(getColor('primary'), 0.1)
          },
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('primary'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('primary')
          },
          symbol: 'circle'
        }
      ],
      grid: { right: 15, left: 5, bottom: 5, top: 8, containLabel: true }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
      tab.addEventListener('shown.bs.tab', () => {
        setTimeout(() => {
          chart.resize();
        }, 300);
      });
    });
  }
};

export default dividendsGrowthChartInit;
