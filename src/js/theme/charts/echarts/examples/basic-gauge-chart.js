import { echartSetOption } from '../echarts-utils';

const basicGaugeChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector('.echart-basic-gauge-chart-example');

  const tooltipFormatter = params => {
    return `
    <div>
        <h6 class="fs-9 text-body-tertiary mb-0">
          <span class="fas fa-circle me-1" style='color:${params[0].color}'></span>
          ${params[0].name} : ${params[0].value}
        </h6>
    </div>
    `;
  };

  if ($chartEl) {
    const userOptions = getData($chartEl, 'echarts');
    const chart = window.echarts.init($chartEl);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'axis',
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        formatter: params => tooltipFormatter(params),
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        }
      },
      radius: '100%',
      series: [
        {
          name: 'Pressure',
          type: 'gauge',
          splitLine: {
            lineStyle: {
              color: getColor('tertiary-color')
            }
          },
          axisLabel: {
            color: getColor('tertiary-color')
          },
          detail: {
            formatter: '{value}'
          },
          title: {
            color: getColor('tertiary-color')
          },
          data: [
            {
              value: 50,
              name: 'SCORE',
              detail: {
                color: getColor('tertiary-color')
              }
            }
          ]
        }
      ]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default basicGaugeChartInit;
