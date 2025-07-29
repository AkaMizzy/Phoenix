import { echartSetOption } from './echarts-utils';
/* -------------------------------------------------------------------------- */
/*                     Echart booking value                                 */
/* -------------------------------------------------------------------------- */

const bookingValueChartInit = () => {
  const { getColor, getData, getDates } = window.phoenix.utils;
  const $echartBookingValue = document.querySelector('.echart-booking-value');
  const tooltipFormatter = params => {
    const currentDate = window.dayjs(params[0].axisValue);
    const prevDate = window.dayjs(params[0].axisValue).subtract(1, 'month');

    const result = params.map((param, index) => ({
      value: param.value,
      date: index > 0 ? prevDate : currentDate,
      color: param.color
    }));

    let tooltipItem = ``;
    result.forEach((el, index) => {
      tooltipItem += `<h6 class="fs-9 ${
        index > 0 && 'mb-0'
      }"><span class="fas fa-circle me-2" style="color:${el.color}"></span>
      ${el.date.format('MMM DD')} : <span class="fw-normal">${el.value}</span>
    </h6>`;
    });
    return `<div class='ms-1'>
              ${tooltipItem}
            </div>`;
  };

  if ($echartBookingValue) {
    const userOptions = getData($echartBookingValue, 'echarts');
    const chart = window.echarts.init($echartBookingValue);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: 10,
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
      xAxis: [
        {
          type: 'category',
          data: getDates(
            new Date('11/1/2023'),
            new Date('11/7/2023'),
            1000 * 60 * 60 * 24
          ),
          show: true,
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: { color: getColor('secondary-bg') }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: value => window.dayjs(value).format('DD MMM'),
            showMinLabel: true,
            showMaxLabel: false,
            color: getColor('secondary-color'),
            align: 'left',
            interval: 5,
            fontFamily: 'Nunito Sans',
            fontWeight: 600,
            fontSize: 12.8
          }
        }
      ],
      yAxis: {
        show: false,
        type: 'value',
        boundaryGap: false
      },
      series: [
        {
          type: 'line',
          data: [150, 100, 300, 200, 250, 180, 250],
          showSymbol: false,
          symbol: 'circle',
          lineStyle: {
            width: 2,
            color: getColor('warning')
          },
          emphasis: {
            lineStyle: {
              color: getColor('warning')
            }
          },
          itemStyle: {
            color: getColor('warning')
          },
          zlevel: 1
        }
      ],
      grid: { left: 5, right: 5, top: 5, bottom: 0 }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default bookingValueChartInit;
