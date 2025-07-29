import { echartSetOption } from '../echarts-utils';

const gaugeMultiTitleChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector(
    '.echart-gauge-multi-title-chart-example'
  );

  const tooltipFormatter = params => {
    return `
    <div>
        <h6 class="fs-9 text-body-tertiary mb-0">
          <span class="fas fa-circle me-1" style='color:${params[0].color}'></span>
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
      series: [
        {
          type: 'gauge',
          radius: '100%',
          anchor: {
            show: true,
            showAbove: true,
            size: 18,
            itemStyle: {
              color: getColor('warning')
            }
          },

          progress: {
            show: true,
            overlap: true,
            roundCap: true
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              color: [[1, getColor('secondary-bg')]]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              width: 2,
              color: getColor('quaternary-color')
            }
          },
          axisLabel: {
            distance: 25,
            color: getColor('quaternary-color')
          },
          data: [
            {
              value: 20,
              name: 'Perfect',
              title: {
                offsetCenter: ['-40%', '80%']
              },
              detail: {
                offsetCenter: ['-40%', '95%']
              },
              itemStyle: {
                color: getColor('primary')
              }
            },
            {
              value: 40,
              name: 'Good',
              title: {
                offsetCenter: ['0%', '80%']
              },
              detail: {
                offsetCenter: ['0%', '95%']
              },

              itemStyle: {
                color: getColor('success')
              }
            },
            {
              value: 60,
              name: 'Commonly',
              title: {
                offsetCenter: ['40%', '80%']
              },
              detail: {
                offsetCenter: ['40%', '95%']
              },

              itemStyle: {
                color: getColor('warning')
              }
            }
          ],
          title: {
            fontSize: 14,
            color: getColor('tertiary-color')
          },
          detail: {
            width: 40,
            height: 14,
            fontSize: 14,
            color: '#fff',
            backgroundColor: 'auto',
            borderRadius: 3,
            formatter: '{value}%'
          }
        }
      ]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default gaugeMultiTitleChartInit;
