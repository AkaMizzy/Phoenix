import { echartSetOption } from './echarts-utils';

const dividendsBarChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-dividends-bar-chart');
  const years = [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const data = [48, 38, 30, 38, 32, 15, 20, 32, 42];

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
        }
      },
      xAxis: {
        type: 'category',
        data: years,
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
        },
        interval: 1
      },
      yAxis: {
        type: 'value',
        boundaryGap: true,
        axisLabel: {
          show: true,
          color: getColor('body-color'),
          fontWeight: 700,
          formatter: value => `0.${value}`,
          margin: 15
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        axisTick: { show: false },
        axisLine: { show: false },
        max: 60
      },
      series: [
        {
          type: 'bar',
          name: 'Total',
          data,
          lineStyle: { color: getColor('info-lighter') },
          itemStyle: {
            color: getColor('info-lighter'),
            barBorderRadius: [4, 4, 0, 0]
          },
          barMaxWidth: 24,
          showSymbol: false,
          symbol: 'circle',
          smooth: false,
          hoverAnimation: true
        }
      ],
      grid: { right: 10, left: 5, bottom: 5, top: 8, containLabel: true }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
      tab.addEventListener('shown.bs.tab', () => {
        setTimeout(() => {
          chart.resize();
        }, 200);
      });
    });
  }
};

export default dividendsBarChartInit;
