import { echartSetOption } from '../echarts-utils';

const basicLineChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-line-chart-example');
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const data = [
    1000, 1500, 1250, 1010, 1045, 2000, 1200, 1330, 1000, 1200, 1410, 1200
  ];

  const tooltipFormatter = params => {
    return `
    <div>
        <h6 class="fs-9 text-body-tertiary mb-0">
          <span class="fas fa-circle me-1" style='color:${params[0].borderColor}'></span>
          ${params[0].name} : ${params[0].value}
        </h6>
    </div>
    `;
  };

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
        formatter: tooltipFormatter,
        axisPointer: {
          type: 'none'
        }
      },
      xAxis: {
        type: 'category',
        data: months,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('quaternary-color'),
          formatter: value => value.substring(0, 3),
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
            type: 'dashed',
            color: getColor('secondary-bg')
          }
        },
        boundaryGap: false,
        axisLabel: {
          show: true,
          color: getColor('quaternary-color'),
          margin: 15
        },
        axisTick: { show: false },
        axisLine: { show: false },
        min: 600
      },
      series: [
        {
          type: 'line',
          data,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('primary'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('primary')
          },
          showSymbol: false,
          symbol: 'circle',
          symbolSize: 10,
          smooth: false,
          hoverAnimation: true
        }
      ],
      grid: { right: '3%', left: '10%', bottom: '10%', top: '5%' }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default basicLineChartInit;
