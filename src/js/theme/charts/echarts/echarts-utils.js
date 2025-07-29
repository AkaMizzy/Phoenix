// import * as echarts from 'echarts';
const { merge } = window._;

// form config.js
export const echartSetOption = (
  chart,
  userOptions,
  getDefaultOptions,
  responsiveOptions
) => {
  const { breakpoints, resize } = window.phoenix.utils;
  const handleResize = options => {
    Object.keys(options).forEach(item => {
      if (window.innerWidth > breakpoints[item]) {
        chart.setOption(options[item]);
      }
    });
  };

  const themeController = document.body;
  // Merge user options with lodash
  chart.setOption(merge(getDefaultOptions(), userOptions));

  const navbarVerticalToggle = document.querySelector(
    '.navbar-vertical-toggle'
  );
  if (navbarVerticalToggle) {
    navbarVerticalToggle.addEventListener('navbar.vertical.toggle', () => {
      chart.resize();
      if (responsiveOptions) {
        handleResize(responsiveOptions);
      }
    });
  }

  resize(() => {
    chart.resize();
    if (responsiveOptions) {
      handleResize(responsiveOptions);
    }
  });
  if (responsiveOptions) {
    handleResize(responsiveOptions);
  }

  themeController.addEventListener(
    'clickControl',
    ({ detail: { control } }) => {
      if (control === 'phoenixTheme') {
        chart.setOption(window._.merge(getDefaultOptions(), userOptions));
      }
      if (responsiveOptions) {
        handleResize(responsiveOptions);
      }
    }
  );
};
// -------------------end config.js--------------------

const echartTabs = document.querySelectorAll('[data-tab-has-echarts]');
if (echartTabs) {
  echartTabs.forEach(tab => {
    tab.addEventListener('shown.bs.tab', e => {
      const el = e.target;
      const { hash } = el;
      const id = hash || el.dataset.bsTarget;
      const content = document.getElementById(id.substring(1));
      const chart = content?.querySelector('[data-echart-tab]');
      if (chart) {
        window.echarts.init(chart).resize();
      }
    });
  });
}

export const tooltipFormatter = (params, dateFormatter = 'MMM DD') => {
  let tooltipItem = ``;
  params.forEach(el => {
    tooltipItem += `<div class='ms-1'>
        <h6 class="text-body-tertiary"><span class="fas fa-circle me-1 fs-10" style="color:${
          el.borderColor ? el.borderColor : el.color
        }"></span>
          ${el.seriesName} : ${
      typeof el.value === 'object' ? el.value[1] : el.value
    }
        </h6>
      </div>`;
  });
  return `<div>
            <p class='mb-2 text-body-tertiary'>
              ${
                window.dayjs(params[0].axisValue).isValid()
                  ? window.dayjs(params[0].axisValue).format(dateFormatter)
                  : params[0].axisValue
              }
            </p>
            ${tooltipItem}
          </div>`;
};

export const handleTooltipPosition = ([pos, , dom, , size]) => {
  // only for mobile device
  if (window.innerWidth <= 540) {
    const tooltipHeight = dom.offsetHeight;
    const obj = { top: pos[1] - tooltipHeight - 20 };
    obj[pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'] = 5;
    return obj;
  }
  return null; // else default behaviour
};

export const stockShareReportTooltipFormatter = params => {
  return `<div class="fs-9 text-body-secondary">
          <table class="mb-2">
            <tbody>
              <tr>
                <th class="fw-bold" style="width: 72px">Price</th>
                <th class="text-center px-2 fw-semibold">:</th>
                <th class="fw-semibold">${params[0].value[6]} USD</th>
              </tr>
            </tbody>
          </table>
          <div class="border-top pt-2">
            <table>
              <tbody>
                <tr>
                  <th class="fw-bold" style="width: 72px">Open</th>
                  <th class="text-center px-2 fw-semibold">:</th>
                  <th class="fw-semibold">${params[0].value[1]} USD</th>
                </tr>
                <tr>
                  <th class="fw-bold" style="width: 72px">Close</th>
                  <th class="text-center px-2 fw-semibold">:</th>
                  <th class="fw-semibold">${params[0].value[2]} USD</th>
                </tr>
                <tr>
                  <th class="fw-bold" style="width: 72px">High</th>
                  <th class="text-center px-2 fw-semibold">:</th>
                  <th class="fw-semibold">${params[0].value[4]} USD</th>
                </tr>
                <tr>
                  <th class="fw-bold" style="width: 72px">Low</th>
                  <th class="text-center px-2 fw-semibold">:</th>
                  <th class="fw-semibold">${params[0].value[3]} USD</th>
                </tr>
                <tr>
                  <th class="fw-bold" style="width: 72px">Volume</th>
                  <th class="text-center px-2 fw-semibold">:</th>
                  <th class="fw-semibold">${params[0].value[5]}k</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
};
