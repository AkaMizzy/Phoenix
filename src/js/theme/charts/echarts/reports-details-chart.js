import { echartSetOption } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const reportsDetailsChartInit = () => {
  const { getColor, getData, toggleColor } = window.phoenix.utils;
  // const phoenixTheme = window.config.config;
  const $chartEl = document.querySelector('.echart-reports-details');

  const tooltipFormatter = (params, dateFormatter = 'MMM DD') => {
    let tooltipItem = ``;
    params.forEach(el => {
      tooltipItem += `<div class='ms-1'>
          <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${
            el.color
          }"></span>
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

  // const dates = getPastDates(7);
  const data = [64, 40, 45, 62, 82];

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
      // legend: {
      //   left: '76%',
      //   top: 'auto',
      //   icon: 'circle',
      // },
      xAxis: {
        type: 'category',
        data: ['Analysis', 'Statement', 'Action', 'Offering', 'Interlocution'],
        axisLabel: {
          color: getColor('body-color'),
          fontFamily: 'Nunito Sans',
          fontWeight: 600,
          fontSize: 12.8,
          rotate: 30,
          formatter: value => `${value.slice(0, 5)}...`
        },
        axisLine: {
          lineStyle: {
            color: getColor('secondary-bg')
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
        // splitLine: {
        //   show: true,
        //   lineStyle: {
        //     color: "rgba(217, 21, 21, 1)"
        //   }
        // },
        axisLabel: {
          color: getColor('body-color'),
          fontFamily: 'Nunito Sans',
          fontWeight: 700,
          fontSize: 12.8,
          margin: 24,
          formatter: value => `${value}%`
        }
      },
      series: [
        {
          name: 'Revenue',
          type: 'bar',
          barWidth: '32px',
          barGap: '48%',
          showBackground: true,
          backgroundStyle: {
            color: toggleColor(
              getColor('primary-bg-subtle'),
              getColor('body-highlight-bg')
            )
          },
          label: {
            show: false
          },
          itemStyle: {
            color: toggleColor(getColor('primary-light'), getColor('primary'))
          },
          data
        }
      ],
      grid: {
        right: '0',
        left: '0',
        bottom: 0,
        top: 10,
        containLabel: true
      },
      animation: false
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default reportsDetailsChartInit;
