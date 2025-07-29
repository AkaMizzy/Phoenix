import { echartSetOption } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const emailCampaignReportsChartInit = () => {
  const { getColor, getData, toggleColor } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-email-campaign-report');

  const tooltipFormatter = params => {
    const el = params[1];

    const tooltipItem = `<div class='ms-1'>
          <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${
            el.borderColor ? el.borderColor : el.color
          }"></span>
            ${el.axisValue} : ${
      typeof el.value === 'object' ? el.value[1] : el.value
    }
          </h6>
        </div>`;

    return `<div>
              <p class='mb-2 text-body-tertiary'>
                ${el.seriesName}
              </p>
              ${tooltipItem}
            </div>`;
  };

  const data1 = [0, 1466, 966, 0];

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);

    const getDefaultOptions = () => ({
      color: [getColor('primary'), getColor('tertiary-bg')],
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
        formatter: tooltipFormatter,
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'category',
        data: ['Total Emails', 'Sent', 'Bounce', 'Delivered'],
        splitLine: { show: false },
        axisLabel: {
          color: getColor('body-color'),
          fontFamily: 'Nunito Sans',
          fontWeight: 400,
          fontSize: 12.8,
          margin: 24,
          rotate: 30
          // formatter: value => `${value.slice(0, 5)}...`,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        },
        axisTick: false
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        axisLabel: {
          color: getColor('body-color'),
          fontFamily: 'Nunito Sans',
          fontWeight: 700,
          fontSize: 12.8,
          margin: 24
          // formatter: value => value / 1000,
        },
        interval: 500
      },
      series: [
        {
          name: 'Placeholder',
          type: 'bar',
          barWidth: '64px',
          stack: 'Total',
          // backgroundColor: getColor('success'),
          label: {
            show: false
          },
          itemStyle: {
            borderColor: 'transparent',
            color: 'transparent'
          },
          emphasis: {
            itemStyle: {
              borderColor: 'transparent',
              color: 'transparent'
            }
          },
          data: data1
        },
        {
          name: 'Email Campaign',
          type: 'bar',
          stack: 'Total',
          itemStyle: {
            // color: getColor('primary-lighter')
            color: toggleColor(
              getColor('primary-lighter'),
              getColor('primary-darker')
            )
          },
          data: [
            {
              value: 2832,
              itemStyle: {
                color: toggleColor(
                  getColor('primary-light'),
                  getColor('primary-dark')
                )
              }
            },
            1366,
            500,
            966
          ],
          label: {
            show: true,
            position: 'inside',
            color: getColor('dark'),
            fontWeight: 'normal',
            fontSize: '12.8px',
            formatter: value => `${value.value.toLocaleString()}`
          }
        }
      ],
      grid: {
        right: '0',
        left: 6,
        bottom: 10,
        top: '5%',
        containLabel: true
      },
      animation: false
    });

    const responsiveOptions = {
      xs: {
        series: [
          {
            barWidth: '48px'
          }
        ],
        xAxis: {
          axisLabel: {
            show: true,
            formatter: value => `${value.slice(0, 5)}...`
          }
        }
      },
      sm: {
        series: [
          {
            barWidth: '64px'
          }
        ],
        xAxis: {
          axisLabel: {
            show: true,
            formatter: value => `${value.slice(0, 11)}`,
            rotate: 0
          }
        }
      },
      md: {
        series: [
          {
            barWidth: '56px'
          }
        ],
        xAxis: {
          axisLabel: {
            show: false
          }
        }
      },
      lg: {
        series: [
          {
            barWidth: '64px'
          }
        ],
        xAxis: {
          axisLabel: {
            show: true,
            formatter: value => `${value.slice(0, 11)}`
          }
        }
      }
    };

    echartSetOption(chart, userOptions, getDefaultOptions, responsiveOptions);
  }
};

export default emailCampaignReportsChartInit;
