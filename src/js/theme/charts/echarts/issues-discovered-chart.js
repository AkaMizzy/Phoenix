import { echartSetOption, handleTooltipPosition } from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts Total Sales                            */
/* -------------------------------------------------------------------------- */

const issuesDiscoveredChartInit = () => {
  const { getColor, getData, toggleColor } = window.phoenix.utils;
  const issuesDiscoveredChartEl = document.querySelector('.echart-issue-chart');

  const tooltipFormatter = params => {
    return `<div style="width: 160px;">
              <p class='mb-2 text-body-tertiary'>
                ${params.seriesName}
              </p>
              <div class='ms-1'>
                <h6 class="text-body-tertiary d-flex justify-content-between align-items-center">
                  <div>
                    <span class="fas fa-circle me-1 fs-10" style="color:${
                      params.borderColor ? params.borderColor : params.color
                    }"></span>
                  ${params.name}
                  </div>
                  ${params.value}
                </h6>
              </div>
            </div>
    `;
  };

  if (issuesDiscoveredChartEl) {
    const userOptions = getData(issuesDiscoveredChartEl, 'echarts');
    const chart = window.echarts.init(issuesDiscoveredChartEl);

    const getDefaultOptions = () => ({
      color: [
        toggleColor(getColor('info-light'), getColor('info-dark')),
        toggleColor(getColor('warning-light'), getColor('warning-dark')),
        toggleColor(getColor('danger-light'), getColor('danger-dark')),
        toggleColor(getColor('success-light'), getColor('success-dark')),
        getColor('primary')
      ],
      tooltip: {
        trigger: 'item',
        backgroundColor: getColor('body-bg'),
        borderColor: getColor('secondary-bg'),
        extraCssText: 'z-index: 1000',
        position: (...params) => handleTooltipPosition(params),
        formatter: params => tooltipFormatter(params)
      },
      responsive: true,
      maintainAspectRatio: false,

      series: [
        {
          name: 'Tasks assigned to me',
          type: 'pie',
          radius: ['48%', '90%'],
          startAngle: 30,
          avoidLabelOverlap: false,
          // label: {
          //   show: false,
          //   position: 'center'
          // },

          label: {
            show: false,
            position: 'center',
            formatter: '{x|{d}%} \n {y|{b}}',
            rich: {
              x: {
                fontSize: 31.25,
                fontWeight: 800,
                color: getColor('tertiary-color'),
                padding: [0, 0, 5, 15]
              },
              y: {
                fontSize: 12.8,
                color: getColor('tertiary-color'),
                fontWeight: 600
              }
            }
          },
          emphasis: {
            label: {
              show: true
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 78, name: 'Product design' },
            { value: 63, name: 'Development' },
            { value: 56, name: 'QA & Testing' },
            { value: 36, name: 'Customer queries' },
            { value: 24, name: 'R & D' }
          ]
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

export default issuesDiscoveredChartInit;
