import { echartSetOption } from '../echarts-utils';

const gaugeProgressChartInit = () => {
  const { getColor, getData, rgbaColor } = window.phoenix.utils;
  const $chartEl = document.querySelector(
    '.echart-gauge-progress-chart-example'
  );

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
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          radius: '100%',
          startAngle: 180,
          endAngle: 0,
          progress: {
            show: true,
            width: 18,
            itemStyle: {
              color: getColor('info')
            }
          },
          itemStyle: {
            color: getColor('info'),
            shadowColor: rgbaColor(getColor('primary'), 0.5),
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2
          },
          axisLine: {
            lineStyle: {
              width: 18,
              color: [[1, getColor('secondary-bg')]]
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            lineStyle: {
              width: 2,
              color: getColor('quaternary-color')
            }
          },
          axisLabel: {
            distance: 25,
            color: getColor('quaternary-color')
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              color: getColor('info')
            }
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            fontSize: 80,
            offsetCenter: [0, '70%']
          },
          data: [
            {
              value: 70,
              detail: {
                fontSize: 30,
                color: getColor('quaternary-color'),
                offsetCenter: [0, '40%']
              }
            }
          ]
        }
      ]
    });
    echartSetOption(chart, userOptions, getDefaultOptions);
  }
};

export default gaugeProgressChartInit;
