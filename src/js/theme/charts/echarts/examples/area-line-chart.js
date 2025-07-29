import { echartSetOption } from '../echarts-utils';

const basicAreaLineChartInit = () => {
  const { getColor, getData, rgbaColor } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-area-line-chart-example');
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
    1020, 1160, 1300, 958, 1240, 1020, 1409, 1200, 1051, 1120, 1240, 1054
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
        formatter: params => tooltipFormatter(params),
        transitionDuration: 0,
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
            color: getColor('tertiary-bg'),
            type: 'solid'
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
          symbolSize: 10,
          symbol: 'circle',
          smooth: false,
          hoverAnimation: true,
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: rgbaColor(getColor('primary'), 0.5)
                },
                {
                  offset: 1,
                  color: rgbaColor(getColor('primary'), 0)
                }
              ]
            }
          }
        }
      ],
      grid: { right: '3%', left: '10%', bottom: '10%', top: '5%' }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default basicAreaLineChartInit;
