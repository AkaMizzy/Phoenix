import { echartSetOption, handleTooltipPosition } from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const contactsBySourceChartInit = () => {
  const { getColor, getData, toggleColor } = window.phoenix.utils;
  const chartElContainer = document.querySelector(
    '.echart-contact-by-source-container'
  );
  const chartEl = chartElContainer.querySelector('.echart-contact-by-source');
  const chartLabel = chartElContainer.querySelector('[data-label]');

  if (chartEl) {
    const userOptions = getData(chartEl, 'echarts');
    const chart = window.echarts.init(chartEl);
    const data = [
      { value: 80, name: 'Organic Search' },
      { value: 65, name: 'Paid Search' },
      { value: 40, name: 'Direct Traffic' },
      { value: 220, name: 'Social Media' },
      { value: 120, name: 'Referrals' },
      { value: 35, name: 'Others Campaigns' }
    ];
    const totalSource = data.reduce((acc, val) => val.value + acc, 0);
    if (chartLabel) {
      chartLabel.innerHTML = totalSource;
    }
    const getDefaultOptions = () => ({
      color: [
        getColor('primary'),
        getColor('success'),
        getColor('info'),
        getColor('info-light'),
        toggleColor(getColor('danger-lighter'), getColor('danger-darker')),
        toggleColor(getColor('warning-light'), getColor('warning-dark'))
      ],
      tooltip: {
        trigger: 'item',
        backgroundColor: getColor('body-bg'),
        borderColor: getColor('secondary-bg'),
        textStyle: {
          color: getColor('tertiary-color')
        },
        borderWidth: 0,
        position: (...params) => handleTooltipPosition(params),
        extraCssText: 'z-index: 1000'
      },
      responsive: true,
      maintainAspectRatio: false,

      series: [
        {
          name: 'Contacts by Source',
          type: 'pie',
          radius: ['55%', '90%'],
          startAngle: 90,
          avoidLabelOverlap: false,
          itemStyle: {
            borderColor: getColor('body-bg'),
            borderWidth: 3
          },

          label: {
            show: false
          },
          emphasis: {
            label: {
              show: false
            }
          },
          labelLine: {
            show: false
          },
          data
        }
      ],
      grid: {
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        containLabel: false
      }
    });

    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default contactsBySourceChartInit;
