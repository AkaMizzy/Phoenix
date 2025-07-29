import { echartSetOption } from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const echartsLeadConversiontInit = () => {
  const { getColor, getData, getPastDates, toggleColor } = window.phoenix.utils;
  const $leadConversionChartEl = document.querySelector(
    '.echart-lead-conversion'
  );

  const dates = getPastDates(4);

  const tooltipFormatter = params => {
    let tooltipItem = ``;
    params.forEach(el => {
      tooltipItem += `<h6 class="fs-9 text-body-tertiary mb-0"><span class="fas fa-circle me-2" style="color:${el.color}"></span>
      ${el.axisValue} : ${el.value}
    </h6>`;
    });
    return `<div class='ms-1'>
              ${tooltipItem}
            </div>`;
  };

  if ($leadConversionChartEl) {
    const userOptions = getData($leadConversionChartEl, 'echarts');
    const chart = window.echarts.init($leadConversionChartEl);

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
        formatter: params => tooltipFormatter(params),
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'value',
        inverse: true,
        axisLabel: {
          show: false
        },
        show: false,
        data: dates,
        axisLine: {
          lineStyle: {
            color: getColor('tertiary-bg')
          }
        },
        axisTick: false
      },
      yAxis: {
        data: ['Closed Won', 'Objection', 'Offer', 'Qualify Lead', 'Created'],
        type: 'category',
        axisPointer: { type: 'none' },
        axisTick: 'none',
        splitLine: {
          interval: 5,
          lineStyle: {
            color: getColor('secondary-bg')
          }
        },
        axisLine: { show: false },
        axisLabel: {
          show: true,
          align: 'left',
          margin: 100,
          color: getColor('body-color')
        }
      },
      series: {
        name: 'Lead Conversion',
        type: 'bar',
        barWidth: '20px',
        showBackground: true,
        backgroundStyle: {
          borderRadius: [4, 0, 0, 4]
        },
        data: [
          {
            value: 1060,
            itemStyle: {
              color: toggleColor(
                getColor('success-lighter'),
                getColor('success-dark')
              ),
              borderRadius: [4, 0, 0, 4]
            },
            emphasis: {
              itemStyle: {
                color: toggleColor(
                  getColor('success-light'),
                  getColor('success-dark')
                )
              },
              label: {
                formatter: () => `{b| 53% }`,
                rich: {
                  b: {
                    color: getColor('white')
                  }
                }
              }
            },
            label: {
              show: true,
              position: 'inside',
              formatter: () => `{b| 53%}`,
              rich: {
                b: {
                  color: toggleColor(
                    getColor('success-dark'),
                    getColor('success-subtle')
                  ),
                  fontWeight: 500,
                  padding: [0, 5, 0, 0]
                }
              }
            }
          },
          // --
          {
            value: 1200,
            itemStyle: {
              color: toggleColor(
                getColor('info-lighter'),
                getColor('info-dark')
              ),
              borderRadius: [4, 0, 0, 4]
            },
            emphasis: {
              itemStyle: {
                color: toggleColor(
                  getColor('info-light'),
                  getColor('info-dark')
                )
              },
              label: {
                formatter: () => `{b| 60% }`,
                rich: {
                  b: {
                    color: getColor('white')
                  }
                }
              }
            },
            label: {
              show: true,
              position: 'inside',
              formatter: () => `{b| 60%}`,
              rich: {
                b: {
                  color: toggleColor(
                    getColor('info-dark'),
                    getColor('info-bg-subtle')
                  ),
                  fontWeight: 500,
                  padding: [0, 5, 0, 0]
                }
              }
            }
          },
          {
            value: 1600,
            itemStyle: {
              color: toggleColor(
                getColor('primary-lighter'),
                getColor('primary-dark')
              ),
              borderRadius: [4, 0, 0, 4]
            },
            emphasis: {
              itemStyle: {
                color: toggleColor(
                  getColor('primary-light'),
                  getColor('primary-dark')
                )
              },
              label: {
                formatter: () => `{b| 80% }`,
                rich: {
                  b: {
                    color: getColor('white')
                  }
                }
              }
            },
            label: {
              show: true,
              position: 'inside',
              formatter: () => `{b| 80% }`,
              rich: {
                b: {
                  color: toggleColor(
                    getColor('primary-dark'),
                    getColor('primary-bg-subtle')
                  ),
                  fontWeight: 500,
                  padding: [0, 5, 0, 0]
                }
              }
            }
          },
          {
            value: 1800,
            itemStyle: {
              color: toggleColor(
                getColor('warning-lighter'),
                getColor('warning-dark')
              ),
              borderRadius: [4, 0, 0, 4]
            },
            emphasis: {
              itemStyle: {
                color: toggleColor(
                  getColor('warning-light'),
                  getColor('warning-dark')
                )
              },
              label: {
                formatter: () => `{b| 90% }`,
                rich: {
                  b: {
                    color: getColor('white')
                  }
                }
              }
            },
            label: {
              show: true,
              position: 'inside',
              formatter: () => `{b|90%}`,
              rich: {
                b: {
                  color: toggleColor(
                    getColor('warning-dark'),
                    getColor('warning-bg-subtle')
                  ),
                  fontWeight: 500,
                  padding: [0, 5, 0, 0]
                }
              }
            }
          },
          {
            value: 2000,
            itemStyle: {
              color: toggleColor(
                getColor('danger-lighter'),
                getColor('danger-dark')
              ),
              borderRadius: [4, 0, 0, 4]
            },
            emphasis: {
              itemStyle: {
                color: toggleColor(
                  getColor('danger-light'),
                  getColor('danger-dark')
                )
              },
              label: {
                formatter: () => `{a|100%}`,
                rich: {
                  a: {
                    color: getColor('white')
                  }
                }
              }
            },
            label: {
              show: true,
              position: 'inside',
              formatter: () => `{a|100%}`,
              rich: {
                a: {
                  color: toggleColor(
                    getColor('danger-dark'),
                    getColor('danger-bg-subtle')
                  ),
                  fontWeight: 500
                }
              }
            }
          }
        ],
        barGap: '50%'
      },
      grid: {
        right: 5,
        left: 100,
        bottom: 0,
        top: '5%',
        containLabel: false
      },
      animation: false
    });

    const responsiveOptions = {
      xs: {
        yAxis: {
          show: false
        },
        grid: {
          left: 0
        }
      },
      sm: {
        yAxis: {
          show: true
        },
        grid: {
          left: 100
        }
      }
    };

    echartSetOption(chart, userOptions, getDefaultOptions, responsiveOptions);
  }
};

export default echartsLeadConversiontInit;
