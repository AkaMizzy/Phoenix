import {
  echartSetOption,
  handleTooltipPosition,
  stockShareReportTooltipFormatter
} from './echarts-utils';

const stockShareReportChartInit = () => {
  const { getColor, getData } = window.phoenix.utils;
  const $chartEl = document.querySelector(
    '.echart-stock-share-candlestick-chart'
  );

  const data = [
    ['2024/09/20', 216.89, 280.94, 201.89, 292.68, 84.3, 250],
    ['2024/09/21', 293.21, 313.91, 275.83, 322.4, 74.3, 400],
    ['2024/09/22', 317.03, 355.29, 294.39, 357.54, 58.3, 700],
    ['2024/09/23', 356.66, 360.29, 337.17, 370.79, 68.4, 500],
    ['2024/09/24', 346.46, 416.45, 342.44, 420.0, 75.8, 1300],
    ['2024/09/25', 422.67, 426.58, 408.72, 433.62, 87.4, 1200],
    ['2024/09/26', 400.56, 437.78, 382.02, 441.94, 90.0, 433.3],
    ['2024/09/27', 437.16, 440.04, 424.89, 444.83, 87.3, 544],
    ['2024/09/28', 433.2, 412.32, 364.63, 438.08, 70.4, 600],
    ['2024/09/29', 410.68, 436.6, 406.31, 445.77, 67.4, 604],
    ['2024/09/30', 444.5, 419.22, 405.02, 449.36, 94.5, 878],
    ['2024/10/01', 418.47, 356.66, 342.16, 427.71, 65.6, 556.4],
    ['2024/10/02', 357.54, 385.47, 340.19, 387.1, 76.6, 445],
    ['2024/10/03', 371.38, 289.35, 259.88, 371.38, 87.5, 655.4],
    ['2024/10/04', 286.52, 272.72, 259.24, 297.9, 88.6, 234],
    ['2024/10/05', 289.94, 297.53, 274.75, 312.91, 95.5, 543],
    ['2024/10/06', 271.72, 237.73, 230.5, 315.23, 44.3, 550],
    ['2024/10/07', 243.12, 271.26, 231.75, 292.15, 43.6, 440],
    ['2024/10/08', 287.84, 368.95, 257.93, 369.79, 78.4, 640],
    ['2024/10/09', 365.77, 358.73, 298.96, 371.5, 89.5, 554],
    ['2024/10/10', 302.75, 200.46, 178.87, 304.78, 77.3, 953],
    ['2024/10/11', 203.52, 289.47, 197.49, 292.82, 56.8, 433],
    ['2024/10/12', 304.97, 331.53, 279.81, 338.71, 55.4, 768],
    ['2024/10/13', 328.3, 295.04, 248.97, 339.93, 75.7, 906],
    ['2024/10/14', 291.17, 278.57, 270.72, 305.03, 87.4, 871],
    ['2024/10/15', 270.84, 263.32, 239.64, 280.88, 89.5, 672],
    ['2024/10/16', 259.23, 225.02, 184.5, 304.42, 90.5, 445],
    ['2024/10/17', 219.52, 183.86, 166.86, 224.88, 95.5, 423],
    ['2024/10/18', 225.0, 245.5, 210.0, 230.0, 85.0, 500],
    ['2024/10/19', 231.0, 250.8, 220.5, 240.2, 78.5, 600],
    ['2024/10/20', 242.0, 260.0, 230.0, 255.0, 92.0, 700],
    ['2024/10/21', 256.0, 275.0, 245.0, 270.0, 88.0, 800],
    ['2024/10/22', 271.0, 290.0, 260.0, 285.0, 95.0, 900],
    ['2024/10/23', 286.0, 305.0, 275.0, 300.0, 82.0, 1000],
    ['2024/10/24', 301.0, 320.0, 290.0, 315.0, 89.0, 1100],
    ['2024/10/25', 316.0, 335.0, 305.0, 330.0, 93.0, 1200],
    ['2024/10/26', 334.25, 348.72, 329.84, 352.46, 87.5, 980],
    ['2024/10/27', 349.18, 361.53, 342.67, 366.25, 82.3, 1050],
    ['2024/10/28', 360.75, 375.42, 356.28, 378.93, 85.1, 1150],
    ['2024/10/29', 376.24, 388.96, 369.57, 393.25, 89.7, 1320],
    ['2024/10/30', 387.52, 375.34, 368.29, 394.58, 76.4, 890],
    ['2024/10/31', 374.85, 362.19, 358.76, 380.43, 68.2, 820],
    ['2024/11/01', 361.43, 348.92, 342.18, 365.29, 62.5, 750],
    ['2024/11/02', 347.58, 356.43, 339.74, 361.25, 71.8, 830],
    ['2024/11/03', 357.24, 372.85, 352.67, 377.34, 80.3, 920],
    ['2024/11/04', 373.42, 384.19, 368.93, 389.57, 86.2, 1050],
    ['2024/11/05', 385.27, 397.56, 380.45, 402.38, 91.5, 1180],
    ['2024/11/06', 398.34, 415.72, 392.48, 419.67, 94.2, 1320],
    ['2024/11/07', 416.25, 428.93, 410.76, 432.58, 90.7, 1250],
    ['2024/11/08', 429.67, 441.25, 422.83, 445.92, 88.3, 1150],
    ['2024/11/09', 440.73, 427.58, 419.42, 446.37, 79.6, 980],
    ['2024/11/10', 426.92, 412.36, 405.75, 431.24, 72.4, 860],
    ['2024/11/11', 411.84, 398.25, 392.46, 416.57, 65.8, 790],
    ['2024/11/12', 397.56, 408.72, 391.23, 413.85, 73.5, 850],
    ['2024/11/13', 409.35, 423.78, 404.56, 428.93, 82.1, 920],
    ['2024/11/14', 424.52, 437.96, 418.73, 442.58, 87.9, 1050],
    ['2024/11/15', 438.47, 452.83, 432.95, 457.26, 92.4, 1180],
    ['2024/11/16', 453.26, 467.54, 447.85, 472.19, 95.3, 1320],
    ['2024/11/17', 468.32, 480.17, 462.75, 485.43, 93.7, 1420],
    ['2024/11/18', 481.25, 493.68, 475.92, 498.35, 91.2, 1350],
    ['2024/11/19', 492.87, 479.35, 471.24, 497.62, 82.5, 1150],
    ['2024/11/20', 478.93, 462.48, 456.72, 484.37, 75.8, 980],
    ['2024/11/21', 461.75, 445.29, 437.56, 466.83, 68.3, 870],
    ['2024/11/22', 444.86, 457.92, 439.25, 463.17, 76.2, 940],
    ['2024/11/23', 458.43, 472.36, 453.68, 477.25, 83.9, 1050],
    ['2024/11/24', 473.18, 487.92, 468.37, 493.24, 89.5, 1180],
    ['2024/11/25', 488.35, 502.76, 482.94, 507.58, 94.2, 1350]
  ];

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
        transitionDuration: 0,
        formatter: params => stockShareReportTooltipFormatter(params),
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: getColor('secondary')
          }
        },
        position: (...params) => handleTooltipPosition(params)
      },
      dataZoom: [
        {
          type: 'slider',
          top: '95%',
          left: '5%',
          right: 5,
          start: 0,
          end: 20,
          height: 12
        }
      ],
      xAxis: {
        type: 'category',
        data: data.map(item => item[0]),
        scale: true,
        splitLine: {
          show: true,
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        },
        min: 'dataMin',
        boundaryGap: false,
        axisPointer: {
          show: true,
          lineStyle: {
            color: getColor('secondary-color'),
            type: 'solid'
          },
          label: { show: false }
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: getColor('border-color-translucent'),
            type: 'solid',
            z: 10
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('body-color'),
          formatter: value =>
            window.dayjs(value, 'YYYY-MM-DD').format('MMM DD'),
          margin: 15
        }
      },
      yAxis: {
        scale: true,
        axisPointer: {
          show: true,
          lineStyle: {
            color: getColor('secondary-color'),
            type: 'solid'
          },
          label: {
            precision: '0',
            show: true,
            backgroundColor: getColor('secondary'),
            textStyle: {
              fontWeight: 'semibold',
              fontSize: '10.24px'
            },
            padding: [6, 13, 6, 10],
            borderRadius: [4, 24, 24, 4]
          }
        },
        splitLine: {
          lineStyle: {
            color: getColor('border-color-translucent')
          }
        },
        boundaryGap: true,
        axisLabel: {
          show: true,
          color: getColor('body-color'),
          margin: 25,
          fontWeight: 700
        },
        axisTick: { show: false },
        axisLine: { show: false },
        interval: 50,
        min: 0
      },
      series: [
        {
          type: 'candlestick',
          name: 'price',
          data: data.map(item => item.slice(1)),
          itemStyle: {
            color:
              window.config.config.phoenixTheme === 'dark'
                ? getColor('primary')
                : getColor('primary-light'),
            color0:
              window.config.config.phoenixTheme === 'dark'
                ? getColor('info')
                : getColor('info-light'),
            borderColor:
              window.config.config.phoenixTheme === 'dark'
                ? getColor('primary')
                : getColor('primary-light'),
            borderColor0:
              window.config.config.phoenixTheme === 'dark'
                ? getColor('info')
                : getColor('info-light')
          },
          clipOverflow: true
        }
      ],
      grid: {
        right: 5,
        left: 5,
        bottom: '7%',
        top: 5,
        containLabel: true
      }
    });
    echartSetOption(chart, userOptions, getDefaultOptions);

    document.querySelectorAll('[data-bs-toggle="tab"]').forEach(tab => {
      tab.addEventListener('shown.bs.tab', () => {
        setTimeout(() => {
          chart.resize();
        }, 100);
      });
    });
  }
};

export default stockShareReportChartInit;
