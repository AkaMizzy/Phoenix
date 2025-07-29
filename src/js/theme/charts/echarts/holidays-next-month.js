import { echartSetOption } from './echarts-utils';

const holidaysNextMonthChartInit = () => {
  const { getColor, getData, getItemFromStore, rgbaColor } =
    window.phoenix.utils;
  const $holidaysNextMonthchartEl = document.querySelector(
    '.echart-holidays-next-month'
  );
  const { echarts } = window;
  const numbers = [
    84, 572, 193, 427, 649, 318, 765, 112, 490, 231, 674, 815, 447, 56, 903,
    178, 629, 394, 742, 295, 518, 67, 936, 129, 681, 862, 410, 553, 268, 719,
    42, 589, 334, 786, 155, 607, 878, 525, 449, 206, 659, 99, 472, 724, 261,
    834, 389, 613, 157, 702, 451, 82, 545, 293, 736, 870, 104, 681, 321, 574,
    136, 689, 840, 470, 127, 598, 354, 807, 215, 767, 498, 51, 904, 176, 629,
    389, 731, 268, 611, 155, 702, 453, 82, 537, 294, 747, 881, 109, 662, 405,
    858, 515, 47, 936, 189, 641, 312, 764, 236, 579, 135, 688, 429, 71, 624,
    370, 822, 173, 725, 476, 29, 880, 125, 677, 338, 791, 216, 568, 115, 666,
    409, 861, 502, 44, 907, 160, 612, 374, 826, 279, 731, 182, 735, 478, 27,
    879, 120, 672, 335, 788, 227, 580, 123, 676, 421, 74, 627, 381, 834, 185,
    738, 489, 32, 885, 128, 681, 342, 794, 245, 598, 137, 690, 433, 76, 629,
    380, 832, 194, 747, 498, 41, 894, 142, 695, 346, 799, 250, 603, 108, 661,
    414, 867, 508, 59, 912, 165, 616, 369, 821, 282, 735, 179, 732, 474, 26,
    879, 124, 676, 329, 782, 233, 586, 118, 671, 414, 867, 299, 651, 156, 708,
    453, 100, 553, 304, 757, 901, 145, 697, 448, 96, 549, 300, 753, 896, 149,
    701, 452, 105, 558, 309, 762, 907, 161, 713, 464, 73, 526, 277, 730, 875,
    122, 575, 326, 779, 924, 171, 724, 475, 28, 831, 184, 737, 882, 129, 582,
    333, 786, 930, 176, 729, 480, 35, 838, 191, 744, 889, 136, 589, 340, 793,
    936, 183, 736, 487, 42, 845, 198, 751, 896, 143, 596, 347, 800, 945, 190,
    743, 498, 49, 852, 205, 758, 903, 150, 603, 354, 807, 952, 197, 750, 505,
    56, 859, 212, 765, 910, 157, 610, 361, 814, 959, 204, 757, 512, 63, 866,
    219, 772, 917, 164, 617, 368, 821, 966, 211, 764, 519, 70, 873, 226, 779,
    924, 171, 724, 475, 28, 831, 184, 737, 882, 129, 582, 333, 786, 930, 176,
    729, 480, 35, 838, 191, 744, 889, 136, 589, 340, 793, 936, 183, 736, 487,
    42, 845, 198, 751, 896, 143, 596, 347, 800, 945, 190, 743, 498, 49, 852,
    205, 758, 903, 150, 603, 354, 807, 952, 197, 750, 505, 56, 859, 212, 765,
    910, 157, 610, 361, 814, 959, 204, 757, 512, 63, 866, 219, 772, 917, 164,
    617, 368, 821, 966, 211, 764, 519, 70, 873, 226, 779, 924, 171, 724, 475,
    28, 831, 184, 737, 882, 129, 582, 333, 786, 930, 176, 729, 480, 35, 838,
    191, 744, 889, 136, 589, 340, 793, 936, 183, 736, 487, 42, 845, 198, 751,
    896, 143, 596, 347, 800, 945, 190, 743, 498, 49, 852, 205, 758, 903, 150,
    603, 354, 807, 952, 197, 750, 505, 56, 859, 212, 765, 910, 157, 610, 361,
    814, 959, 204, 757, 512, 63, 866, 219, 772, 917, 164, 617, 368, 821, 966,
    211, 764, 519, 70, 873, 226, 779, 924, 171, 724, 475, 28, 831
  ];
  function getVirtualData(year) {
    const date = +echarts.time.parse(`${year}-01-01`);
    const end = +echarts.time.parse(`${+year + 1}-01-01`);
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    let index = 0;
    for (let time = date; time < end; time += dayTime) {
      data.push([
        echarts.time.format(time, '{yyyy}-{MM}-{dd}', false),
        numbers[index]
      ]);
      index += 1;
    }
    return data;
  }

  if ($holidaysNextMonthchartEl) {
    const userOptions = getData($holidaysNextMonthchartEl, 'echarts');
    const chart = window.echarts.init($holidaysNextMonthchartEl);
    const getDefaultOptions = () => ({
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'none'
        },
        padding: [7, 10],
        backgroundColor: getColor('body-highlight-bg'),
        borderColor: getColor('border-color'),
        textStyle: { color: getColor('light-text-emphasis') },
        borderWidth: 1,
        transitionDuration: 0,
        extraCssText: 'z-index: 1000'
      },
      visualMap: {
        min: 0,
        max: 1000,
        calculable: true,
        show: false,
        color: [
          getColor('warning'),
          // getColor('warning-light'),
          getItemFromStore('phoenixTheme') === 'dark'
            ? rgbaColor(getColor('warning'), 0.5)
            : getColor('warning-light'),
          // getColor('warning-lighter')
          getItemFromStore('phoenixTheme') === 'dark'
            ? rgbaColor(getColor('warning'), 0.75)
            : getColor('warning-light')
        ]
      },
      calendar: {
        orient: 'vertical',
        range: '2017-03',
        width: '99%',
        height: '85.5%',
        left: '2',
        right: 'auto',
        top: 42,
        yearLabel: {
          show: false
        },
        monthLabel: {
          show: false
        },
        dayLabel: {
          firstDay: 0,
          nameMap: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
          margin: 24,
          color: getColor('secondary-text-emphasis'),
          fontFamily: 'Nunito Sans',
          fontWeight: 700
        },
        splitLine: {
          show: false
        },
        itemStyle: {
          color: getColor('dark-text-emphasis'),
          borderColor: getColor('border-color')
        }
      },
      series: {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize(val) {
          return val[1] / 35;
        },
        data: getVirtualData('2017'),
        itemStyle: {
          color: getColor('warning'),
          opacity: 0.8
        }
      }
    });

    const responsiveOptions = {
      xl: {
        calendar: {
          height: '83%'
        }
      },
      xxl: {
        calendar: {
          height: '85.5%'
        }
      }
    };

    echartSetOption(chart, userOptions, getDefaultOptions, responsiveOptions);
  }
};

export default holidaysNextMonthChartInit;
