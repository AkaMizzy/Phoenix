import { echartSetOption } from './echarts-utils';

const stockOverviewMixedChartInit = () => {
  const { getColor, getData, rgbaColor } = window.phoenix.utils;
  const $stockOverviewChart = document.querySelectorAll(
    '.echart-stock-overview-mixed-chart'
  );
  const generateXAxisLabels = (startDate, count) => {
    const labels = [];
    const start = new Date(startDate);
    Array.from({ length: count }).map((_, i) => {
      return labels.push(
        window
          .dayjs(start)
          .add(i + 1, 'day')
          .format('DD MMM')
      );
    });
    return labels;
  };

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

  if ($stockOverviewChart.length) {
    $stockOverviewChart.forEach($chart => {
      const userOptions = getData($chart, 'echarts');
      const { data } = userOptions;
      const chart = window.echarts.init($chart);

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
        xAxis: [
          {
            type: 'category',
            data: generateXAxisLabels('11/1/2023', userOptions.length),
            show: true,
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                width: 1.5,
                color: getColor('body-highlight-bg')
              }
            },
            axisTick: { show: false },
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
            data,
            showSymbol: false,
            symbolSize: 10,
            symbol: 'circle',
            smooth: false,
            hoverAnimation: true,
            itemStyle: {
              borderWidth: 2
            },
            lineStyle: {
              width: 1
            },
            areaStyle: {}
          }
        ],
        visualMap: {
          show: false,
          left: 'right',
          inRange: {
            color: [
              rgbaColor(getColor('danger'), 0.5),
              rgbaColor(getColor('success'), 0.4)
            ]
          },
          min: 0,
          max: 1,
          calculable: true
        },
        grid: { right: '3%', left: '10%', bottom: '10%', top: '5%' }
      });

      echartSetOption(chart, userOptions, getDefaultOptions);
    });
  }
};

export default stockOverviewMixedChartInit;
