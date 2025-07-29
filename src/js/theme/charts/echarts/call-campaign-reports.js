import { echartSetOption } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const callCampaignChartInit = () => {
  const { getColor, getData, getPastDates, rgbaColor } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-call-campaign');

  const tooltipFormatter = params => {
    let tooltipItem = ``;
    params.forEach(el => {
      tooltipItem += `<div class='ms-1'>
          <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10 text-primary"></span>
            ${el.seriesName} : ${
        typeof el.value === 'object' ? el.value[1] : el.value
      }
          </h6>
        </div>`;
    });
    return `<div>
              <p class='mb-2 text-body-tertiary'>
                ${
                  window.dayjs(params[0].axisValue).isValid()
                    ? window.dayjs(params[0].axisValue).format('DD MMM, YYYY')
                    : params[0].axisValue
                }
              </p>
              ${tooltipItem}
            </div>`;
  };

  const dates = getPastDates(7);

  const data1 = [8000, 7700, 5900, 10100, 5100, 6000, 4300];

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);

    const getDefaultOptions = () => ({
      color: [getColor('primary-lighter'), getColor('info-light')],
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
      xAxis: [
        {
          type: 'category',
          data: dates,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: getColor('secondary-bg')
            }
          },
          axisLabel: {
            color: getColor('body-color'),
            // interval: 1,
            showMaxLabel: false,
            showMinLabel: true,
            align: 'left',
            formatter: value => window.dayjs(value).format('ddd'),
            fontFamily: 'Nunito Sans',
            fontWeight: 400,
            fontSize: 12.8,
            margin: 16
          },
          axisLine: {
            lineStyle: {
              color: getColor('secondary-bg')
            }
          },
          axisTick: false
        },
        {
          type: 'category',
          data: dates,
          boundaryGap: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: getColor('secondary-bg')
            }
          },
          axisLabel: {
            color: getColor('body-color'),
            interval: 130,
            showMaxLabel: true,
            showMinLabel: false,
            align: 'right',
            formatter: value => window.dayjs(value).format('ddd'),
            fontFamily: 'Nunito Sans',
            fontWeight: 400,
            fontSize: 12.8,
            margin: 16
          },
          position: 'bottom',
          axisLine: {
            lineStyle: {
              color: getColor('secondary-bg')
            }
          },
          axisTick: false
        }
      ],
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
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
          margin: 16,
          formatter: value => `${value / 1000}k`
        }
        // interval: 150,
      },
      series: [
        {
          name: 'Campaign',
          type: 'line',
          smooth: 0.4,
          symbolSize: 11,
          itemStyle: {
            color: getColor('body-highlight-bg'),
            borderColor: getColor('primary'),
            borderWidth: 2
          },
          lineStyle: {
            color: getColor('primary')
          },
          symbol: 'circle',
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
                  color: rgbaColor(getColor('primary-light'), 0.2)
                },
                {
                  offset: 1,
                  color: rgbaColor(getColor('primary-light'), 0.2)
                }
              ]
            }
          },
          data: data1
        }
      ],
      grid: {
        right: '8',
        left: 6,
        bottom: '-10',
        top: 10,
        containLabel: true
      },
      animation: false
    });

    const responsiveOptions = {
      xs: {
        xAxis: [
          {},
          {
            axisLabel: {
              showMaxLabel: false
            }
          }
        ]
      },
      sm: {
        xAxis: [
          {},
          {
            axisLabel: {
              showMaxLabel: true
            }
          }
        ]
      }
    };

    echartSetOption(chart, userOptions, getDefaultOptions, responsiveOptions);
  }
};

export default callCampaignChartInit;
