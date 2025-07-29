import { echartSetOption } from './echarts-utils';

/* -------------------------------------------------------------------------- */
/*                     Echart Bar booking                                 */
/* -------------------------------------------------------------------------- */
const { echarts } = window;

const grossProfitInit = () => {
  const { getColor, getData, rgbaColor, getItemFromStore } =
    window.phoenix.utils;
  const $grossProfit = document.querySelector('.echart-gross-profit');

  const data = [
    {
      name: 'Flight',
      value: 30,
      itemStyle: {
        color:
          getItemFromStore('phoenixTheme') === 'dark'
            ? getColor('primary')
            : getColor('primary-light')
      },
      children: [
        {
          name: '1st class',
          value: 5,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('primary'), 0.8)
                : rgbaColor(getColor('primary-light'), 0.7)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: getColor('primary-dark')
              }
            }
          ]
        },
        {
          name: 'Business',
          value: 15,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('primary'), 0.7)
                : rgbaColor(getColor('primary-light'), 0.5)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('primary-dark'), 0.9)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('primary-dark'), 0.8)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('primary-dark'), 0.7)
              }
            }
          ]
        },
        {
          name: 'Economy',
          value: 10,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('primary'), 0.6)
                : rgbaColor(getColor('primary-light'), 0.3)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('primary-dark'), 0.6)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('primary-dark'), 0.5)
              }
            }
          ]
        }
      ]
    },
    {
      name: 'Package',
      value: 50,
      itemStyle: {
        color:
          getItemFromStore('phoenixTheme') === 'dark'
            ? getColor('info')
            : getColor('info-light')
      },
      children: [
        {
          name: 'Flight + Hotel',
          value: 5,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('info'), 0.4)
                : rgbaColor(getColor('info-light'), 0.3)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.2)
              }
            }
          ]
        },
        {
          name: 'Flight + Event',
          value: 20,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('info'), 0.5)
                : rgbaColor(getColor('info-light'), 0.4)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.3)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.4)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.5)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.6)
              }
            }
          ]
        },
        {
          name: 'Flight + Hotel + Event',
          value: 10,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('info'), 0.6)
                : rgbaColor(getColor('info-light'), 0.55)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.66)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.7)
              }
            }
          ]
        },
        {
          name: 'Hotel + Event',
          value: 5,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('info'), 0.7)
                : rgbaColor(getColor('info-light'), 0.75)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.8)
              }
            }
          ]
        },
        {
          name: 'Custom',
          value: 10,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('info'), 0.8)
                : rgbaColor(getColor('info-light'), 0.9)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('info-dark'), 0.9)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: getColor('info-dark')
              }
            }
          ]
        }
      ]
    },
    {
      name: 'Hotel',
      value: 25,
      itemStyle: {
        color:
          getItemFromStore('phoenixTheme') === 'dark'
            ? getColor('success')
            : getColor('success-light')
      },
      children: [
        {
          name: 'Rooms',
          value: 10,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('success'), 0.8)
                : rgbaColor(getColor('success-light'), 0.9)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: getColor('success-dark')
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('success-dark'), 0.88)
              }
            }
          ]
        },
        {
          name: 'Resorts',
          value: 15,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('success'), 0.7)
                : rgbaColor(getColor('success-light'), 0.5)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('success-dark'), 0.77)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('success-dark'), 0.66)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('success-dark'), 0.55)
              }
            }
          ]
        }
      ]
    },
    {
      name: 'Trip',
      value: 15,
      itemStyle: {
        color:
          getItemFromStore('phoenixTheme') === 'dark'
            ? getColor('warning')
            : getColor('warning-light')
      },
      children: [
        {
          name: 'Nature',
          value: 5,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('warning'), 0.8)
                : rgbaColor(getColor('warning-light'), 0.8)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: getColor('warning-dark')
              }
            }
          ]
        },
        {
          name: 'Events',
          value: 10,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? rgbaColor(getColor('warning'), 0.7)
                : rgbaColor(getColor('warning-light'), 0.5)
          },
          children: [
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('warning-dark'), 0.7)
              }
            },
            {
              name: 'label-3',
              value: 5,
              itemStyle: {
                color: rgbaColor(getColor('warning-dark'), 0.5)
              }
            }
          ]
        }
      ]
    }
  ];

  const colors = [
    getColor('primary-light'),
    getColor('info-light'),
    getColor('success-light'),
    getColor('warning-light')
  ];

  if ($grossProfit) {
    const userOptions = getData($grossProfit, 'echarts');
    const chart = echarts.init($grossProfit);
    const getDefaultOptions = () => ({
      color: colors,
      tooltip: {
        trigger: 'item',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        extraCssText: 'z-index: 1000'
      },
      series: [
        {
          type: 'sunburst',
          center: ['50%', '50%'],
          data,
          sort(a, b) {
            if (a.depth === 1) {
              return b.getValue() - a.getValue();
            }
            return a.dataIndex - b.dataIndex;
          },
          label: {
            show: false
          },
          levels: [
            {},
            {
              r0: 0,
              r: 53,
              itemStyle: {
                borderWidth: 2,
                borderColor: getColor('body-bg')
              },
              label: {
                show: false
              },
              blur: {
                itemStyle: {
                  borderWidth: 6.5
                }
              }
            },
            {
              r0: 65,
              r: 110,
              itemStyle: {
                borderWidth: 2,
                borderColor: getColor('body-bg')
              },
              label: {
                show: false
              }
            },
            {
              r0: 120,
              r: 125,
              itemStyle: {
                borderWidth: 2,
                borderColor: getColor('body-bg')
              },
              label: {
                show: false
              }
            }
          ]
        }
      ]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default grossProfitInit;
