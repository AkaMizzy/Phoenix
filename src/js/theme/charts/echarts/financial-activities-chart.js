import {
  echartSetOption,
  handleTooltipPosition,
  tooltipFormatter
} from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts Financial Activities                            */
/* -------------------------------------------------------------------------- */

const financialActivitiesChartInit = () => {
  const { getColor, getData, getItemFromStore } = window.phoenix.utils;
  const $financialActivitiesChartEl = document.querySelector(
    '.echart-financial-Activities'
  );

  const profitData = [
    [350000, 390000, 410700, 450000, 390000, 410700],
    [245000, 310000, 420000, 480000, 530000, 580000],
    [278450, 513220, 359890, 444567, 201345, 589000]
  ];
  const revenueData = [
    [-810000, -640000, -630000, -590000, -620000, -780000],
    [-482310, -726590, -589120, -674832, -811245, -455678],
    [-432567, -688921, -517389, -759234, -601876, -485112]
  ];
  const expansesData = [
    [-450000, -250000, -200000, -120000, -230000, -270000],
    [-243567, -156789, -398234, -120456, -321890, -465678],
    [-235678, -142345, -398765, -287456, -173890, -451234]
  ];

  if ($financialActivitiesChartEl) {
    const userOptions = getData($financialActivitiesChartEl, 'options');
    const chart = window.echarts.init($financialActivitiesChartEl);
    const profitLagend = document.querySelector(`#${userOptions.optionOne}`);
    const revenueLagend = document.querySelector(`#${userOptions.optionTwo}`);
    const expansesLagend = document.querySelector(
      `#${userOptions.optionThree}`
    );

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
        position: (...params) => handleTooltipPosition(params),
        formatter: params => tooltipFormatter(params),
        extraCssText: 'z-index: 1000'
      },
      legend: {
        data: ['Profit', 'Revenue', 'Expanses'],
        show: false
      },
      xAxis: {
        axisLabel: {
          show: true,
          margin: 12,
          color: getColor('secondary-text-emphasis'),
          formatter: value =>
            `${Math.abs(Math.round((value / 1000) * 10) / 10)}k`,
          fontFamily: 'Nunito Sans',
          fontWeight: 700
        },
        splitLine: {
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        }
      },
      yAxis: {
        axisTick: {
          show: false
        },
        data: [
          'NOV-DEC',
          'SEP-OCT',
          'JUL-AUG',
          'MAY-JUN',
          'MAR-APR',
          'JAN-FEB'
        ],
        axisLabel: {
          color: getColor('secondary-text-emphasis'),
          margin: 8,
          fontFamily: 'Nunito Sans',
          fontWeight: 700
        },
        axisLine: {
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        }
      },
      series: [
        {
          name: 'Profit',
          stack: 'Total',
          type: 'bar',
          barWidth: 8,
          roundCap: true,
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            borderRadius: [0, 4, 4, 0],
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? getColor('primary')
                : getColor('primary-light')
          },
          data: profitData[0]
        },
        {
          name: 'Revenue',
          type: 'bar',
          barWidth: 8,
          barGap: '100%',
          stack: 'Total',
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            borderRadius: [4, 0, 0, 4],
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? getColor('success')
                : getColor('success-light')
          },
          data: revenueData[0]
        },
        {
          name: 'Expanses',
          type: 'bar',
          barWidth: 8,
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            borderRadius: [4, 0, 0, 4],
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? getColor('info')
                : getColor('info-light')
          },
          data: expansesData[0]
        }
      ],
      grid: {
        right: 20,
        left: 3,
        bottom: 0,
        top: 16,
        containLabel: true
      },
      animation: false
    });

    const responsiveOptions = {
      xs: {
        yAxis: {
          axisLabel: {
            show: false
          }
        },
        grid: {
          left: 15
        }
      },
      sm: {
        yAxis: {
          axisLabel: {
            margin: 32,
            show: true
          }
        },
        grid: {
          left: 3
        }
      },
      xl: {
        yAxis: {
          axisLabel: {
            show: false
          }
        },
        grid: {
          left: 15
        }
      },
      xxl: {
        yAxis: {
          axisLabel: {
            show: true
          }
        },
        grid: {
          left: 3
        }
      }
    };

    echartSetOption(chart, userOptions, getDefaultOptions, responsiveOptions);

    profitLagend.addEventListener('click', () => {
      profitLagend.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Profit'
      });
    });

    revenueLagend.addEventListener('click', () => {
      revenueLagend.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Revenue'
      });
    });

    expansesLagend.addEventListener('click', () => {
      expansesLagend.classList.toggle('opacity-50');
      chart.dispatchAction({
        type: 'legendToggleSelect',
        name: 'Expanses'
      });
    });

    const cetegorySelect = document.querySelector('[data-activities-options]');
    if (cetegorySelect) {
      cetegorySelect.addEventListener('change', e => {
        const { value } = e.currentTarget;
        const data1 = profitData[value];
        const data2 = revenueData[value];
        const data3 = expansesData[value];
        chart.setOption({
          series: [
            {
              data: data1
            },
            {
              data: data2
            },
            {
              data: data3
            }
          ]
        });
      });
    }
  }
};

export default financialActivitiesChartInit;
