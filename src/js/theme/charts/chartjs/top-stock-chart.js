import {
  chartJsInit,
  externalTooltipHandler,
  verticalLinePlugin,
  borderXPlugin
} from './chartjs-utils';
import { topStockChartData } from '../../../data/stock-data';

const topStocksChartsInit = () => {
  const { getColor, rgbaColor, breakpoints } = window.phoenix.utils;

  const chartCanvasInit = ($chart, dataItem) => {
    const chartData = dataItem;
    const dataSets1 = chartData.data.map(item => item[2]);
    const labels = chartData.data.map(item => item[1]);

    const index = chartData.data.findIndex(item => item[1] === '11:45 PM');

    const areaLine = (ctx, idx, color) =>
      ctx.p0.parsed.x <= idx ? color : undefined;
    const transparentLine = (ctx, idx, color) =>
      ctx.p0.parsed.x > idx ? color : undefined;

    let chartGradient = null;

    const getGradient = ctx => {
      const { chartArea } = ctx.chart;
      if (!chartArea) return chartGradient;

      const gradient = ctx.chart.ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(0, rgbaColor(getColor(chartData.color), 0.0));
      gradient.addColorStop(1, rgbaColor(getColor(chartData.color), 0.5));

      chartGradient = gradient;
      return gradient;
    };

    const getOptions = () => {
      return {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Dataset 1',
              borderWidth: 1,
              fill: true,
              data: dataSets1,
              pointRadius: 0,
              segment: {
                backgroundColor: ctx =>
                  areaLine(ctx, index, getGradient(ctx)) ||
                  transparentLine(ctx, index, 'transparent'),
                borderColor: ctx =>
                  areaLine(ctx, index, getColor(chartData.color)) ||
                  transparentLine(ctx, index, getColor('border-color'))
              }
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            mode: 'index',
            intersect: false
          },
          animation: false,
          plugins: {
            legend: {
              display: false,
              labels: {
                color: getColor('body-color')
              }
            },
            tooltip: {
              enabled: false,
              position: 'nearest',
              external: context => {
                const { tooltip } = context;
                if (!tooltip || tooltip.dataPoints.length === 0) return;

                const tooltipItem = tooltip.dataPoints[0];
                const idx = tooltipItem.dataIndex;

                const hoveredData = chartData.data[idx];
                const [date, time, value, volume] = hoveredData;

                externalTooltipHandler(context, { date, time, value, volume });
              }
            },
            beforeDraw: () => {
              chartGradient = null;
            }
          },
          scales: {
            x: {
              type: 'category',
              offset: false,
              alignToPixels: true,
              title: {},
              ticks: {
                color: getColor('body-color'),
                maxTicksLimit: () => {
                  const width = window.innerWidth;

                  if (width < breakpoints.sm) {
                    return 4;
                  }
                  if (width < breakpoints.md) {
                    return 7;
                  }
                  return 12;
                }
              },
              grid: {
                color: 'transparent',
                drawBorder: false
              }
            },
            y: {
              beginAtZero: false,
              min: 170,
              max: 290,
              ticks: {
                stepSize: 10,
                color: getColor('body-color'),
                offset: true,
                callback: value => {
                  return `${value}     `;
                }
              },
              grid: {
                color: getColor('border-color-translucent'),
                drawBorder: true,
                drawTicks: false
              }
            }
          }
        },
        plugins: [verticalLinePlugin, borderXPlugin]
      };
    };

    chartJsInit($chart, getOptions);
  };

  const chartKeys = [
    'apple',
    'tesla',
    'nvidia',
    'alphabet',
    'amd',
    'microsoft',
    'intel'
  ];

  chartKeys.forEach(key => {
    const el = document.getElementById(`top-stock-${key}-chart`);
    const data = topStockChartData[key];
    if (el && data) {
      chartCanvasInit(el, data, key);
    }
  });
};

export default topStocksChartsInit;
