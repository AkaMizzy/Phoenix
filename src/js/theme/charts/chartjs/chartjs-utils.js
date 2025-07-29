/* eslint-disable no-new */

/* -------------------------------------------------------------------------- */
/*                            ChartJs Initialization                          */
/* -------------------------------------------------------------------------- */

export const chartJsInit = (chartEl, config) => {
  if (!chartEl) return;

  const ctx = chartEl.getContext('2d');
  if (ctx) {
    let chart = new window.Chart(ctx, config());

    const themeController = document.body;
    themeController.addEventListener(
      'clickControl',
      ({ detail: { control } }) => {
        if (control === 'phoenixTheme') {
          chart.destroy();
          chart = new window.Chart(ctx, config());
        }
        return null;
      }
    );
  }
};

const getOrCreateTooltip = chart => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.classList.add('custom-tooltip');
    tooltipEl.classList.add('bg-body');
    tooltipEl.classList.add('border');
    tooltipEl.style.borderRadius = '4px';
    tooltipEl.style.opacity = 1;
    tooltipEl.style.pointerEvents = 'none';
    tooltipEl.style.position = 'absolute';
    tooltipEl.style.transform = 'translate(-50%, 0)';
    tooltipEl.style.transition = 'all .1s ease';
    tooltipEl.style.padding = '14px';
    tooltipEl.style.fontSize = '12px';
    tooltipEl.style.minWidth = '170px';
    tooltipEl.style.zIndex = '9999';

    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context, data) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  if (tooltip.body) {
    const params = tooltip.dataPoints;

    tooltipEl.innerHTML = `
      <div class="fs-9 text-body-secondary">
        <table class="mb-2">
          <tbody>
            <tr>
              <th class="fw-bold" style="width: 72px">Price</th>
              <th class="text-center px-2 fw-semibold">:</th>
              <th class="fw-semibold">${params[0].formattedValue} USD</th>
            </tr>
          </tbody>
        </table>
        <div class="border-top pt-2">
          <table>
            <tbody>
              <tr>
                <th class="fw-bold" style="width: 72px">Date</th>
                <th class="text-center px-2 fw-semibold">:</th>
                <th class="fw-semibold">${window
                  .dayjs(data.date, 'YYYY-MM-DD')
                  .format('D MMM')}</th>
              </tr>
              <tr>
                <th class="fw-bold" style="width: 72px">Time</th>
                <th class="text-center px-2 fw-semibold">:</th>
                <th class="fw-semibold">${params[0].label}</th>
              </tr>
              <tr>
                <th class="fw-bold" style="width: 72px">Time Zone</th>
                <th class="text-center px-2 fw-semibold">:</th>
                <th class="fw-semibold">UTC 4</th>
              </tr>
              <tr>
                <th class="fw-bold" style="width: 72px">Volume</th>
                <th class="text-center px-2 fw-semibold">:</th>
                <th class="fw-semibold">${data.volume}k</th>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    `;
  }

  const {
    offsetLeft: positionX,
    offsetTop: positionY,
    clientWidth
  } = chart.canvas;
  const tooltipWidth = tooltipEl.clientWidth;
  const tooltipX = tooltip.caretX;
  let leftPosition = positionX + tooltipX;
  if (leftPosition + tooltipWidth > clientWidth) {
    leftPosition -= tooltipWidth;
    tooltipEl.style.transform = 'translate(0, 0)';
  } else if (leftPosition < positionX + 100) {
    leftPosition = positionX + 10;
    tooltipEl.style.transform = 'translate(0, 0)';
  } else {
    tooltipEl.style.transform = 'translate(-50%, 0)';
  }

  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = `${leftPosition}px`;
  tooltipEl.style.top = `${positionY + tooltip.caretY}px`;
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = `${tooltip.options.padding}px ${tooltip.options.padding}px`;
};

export const verticalLinePlugin = {
  id: 'verticalDottedLine',
  beforeDraw: chart => {
    const { getItemFromStore } = window.phoenix.utils;
    if (
      chart.tooltip &&
      // eslint-disable-next-line no-underscore-dangle
      chart.tooltip._active &&
      // eslint-disable-next-line no-underscore-dangle
      chart.tooltip._active.length
    ) {
      const { ctx } = chart;
      // eslint-disable-next-line no-underscore-dangle
      const activePoint = chart.tooltip._active[0];
      const { x } = activePoint.element;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle =
        getItemFromStore('phoenixTheme') === 'dark' ? '#31374a' : '#CBD0DD';
      ctx.stroke();
      ctx.restore();
    }
  }
};

export const borderXPlugin = {
  id: 'borderEndLine',
  beforeDraw: chart => {
    const { getItemFromStore } = window.phoenix.utils;

    const {
      ctx,
      chartArea: { top, bottom, left, right }
    } = chart;

    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle =
      getItemFromStore('phoenixTheme') === 'dark'
        ? 'rgba(55, 62, 83, 0.78)'
        : '#E3E6ED';
    ctx.beginPath();

    ctx.moveTo(left, top);
    ctx.lineTo(right, top);
    ctx.lineTo(right, bottom);
    ctx.lineTo(left, bottom);
    ctx.closePath();
    ctx.stroke();
  }
};
