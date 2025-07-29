import { echartSetOption } from './echarts-utils';

const forecastOfRevenueChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-forecast-of-revenue-chart');
  const months = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const data = [159, 185, 170, 190, 205, 220, 235];

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
        type: 'value',
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        },
        axisTick: { show: true },
        axisLabel: {
          color: getColor('tertiary-color'),
          formatter: value => `${value}B`
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        },
        min: 100,
        max: 260,
        interval: 20
      },
      yAxis: {
        type: 'category',
        data: months,
        boundaryGap: true,
        axisLabel: {
          show: true,
          color: getColor('body-color'),
          margin: 20
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        },
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        }
      },
      series: [
        {
          type: 'bar',
          name: 'Total',
          data,
          barWidth: 20,
          lineStyle: { color: getColor('info-lighter') },
          itemStyle: {
            color: getColor('info-lighter'),
            barBorderRadius: [0, 3, 3, 0]
          },
          showSymbol: false,
          symbol: 'circle',
          smooth: false,
          hoverAnimation: true
        }
      ],
      grid: { right: 15, left: 5, bottom: 5, top: 24, containLabel: true }
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

export default forecastOfRevenueChartInit;
