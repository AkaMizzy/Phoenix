import { echartSetOption, handleTooltipPosition } from './echarts-utils';

// dayjs.extend(advancedFormat);

/* -------------------------------------------------------------------------- */
/*                             Echarts cancel booking                            */
/* -------------------------------------------------------------------------- */

const countryWiseVisitorsChartInit = () => {
  const { getColor, getData, getRandomNumber, getItemFromStore } =
    window.phoenix.utils;
  const countryWiseVisitorsChartEl = document.querySelector(
    '.echart-country-wise-visitors'
  );

  const data = [
    127, 156, 183, 110, 195, 129, 176, 147, 163, 199, 158, 115, 191, 105, 143,
    179, 120, 168, 137, 185, 154, 122, 197, 112, 144, 170, 193, 118, 166, 151,
    187, 134, 162, 107, 192, 152, 114, 198
  ];
  const axisData = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38
  ];

  const tooltipFormatter = params => `
    <div>
        <h6 class="fs-9 text-700 mb-0"><span class="fas fa-circle me-1 text-primary-light"></span>
          Users : <span class="fw-normal">${params[0].value}</span>
        </h6>
    </div>
    `;

  if (countryWiseVisitorsChartEl) {
    const userOptions = getData(countryWiseVisitorsChartEl, 'echarts');
    const chart = window.echarts.init(countryWiseVisitorsChartEl);

    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        axisPointer: {
          type: 'none'
        },
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        position(pos, params, dom, rect, size) {
          return handleTooltipPosition(pos, params, dom, rect, size);
        },
        formatter: tooltipFormatter,
        extraCssText: 'z-index: 1000'
      },
      xAxis: {
        type: 'category',

        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        boundaryGap: [0.2, 0.2],
        data: axisData
      },
      yAxis: {
        type: 'value',
        scale: true,
        boundaryGap: false,
        axisLabel: {
          show: false
        },
        splitLine: {
          show: false
        },
        min: 100,
        max: 200
      },
      series: [
        {
          type: 'bar',
          barMaxWidth: 8,
          barGap: 5,
          data,
          itemStyle: {
            color:
              getItemFromStore('phoenixTheme') === 'dark'
                ? getColor('primary')
                : getColor('primary-light'),
            borderRadius: [2, 2, 0, 0]
          }
        }
      ],
      grid: {
        right: 0,
        left: 0,
        bottom: 0,
        top: 0
      }
    });

    echartSetOption(chart, userOptions, getDefaultOptions);

    const userCounterDom = document.querySelector('.real-time-user');

    setInterval(() => {
      const rndData = getRandomNumber(130, 200);
      data.shift();
      data.push(rndData);
      axisData.shift();
      axisData.push(getRandomNumber(37, 100));
      userCounterDom.innerHTML = rndData;

      chart.setOption({
        xAxis: {
          data: axisData
        },
        series: [
          {
            data
          }
        ]
      });
    }, 2000);
  }
};

export default countryWiseVisitorsChartInit;
