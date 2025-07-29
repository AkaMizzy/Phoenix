/* -------------------------------------------------------------------------- */
/*                               noUiSlider                                   */
/* -------------------------------------------------------------------------- */
const nouisliderInit = () => {
  const { getData } = window.phoenix.utils;
  if (window.noUiSlider) {
    const elements = document.querySelectorAll('[data-nouislider]');
    elements.forEach(item => {
      const userOptions = getData(item, 'nouislider');
      const sliderValues = getData(item, 'nouislider-values');
      let defaultOptions;
      if (sliderValues && sliderValues.length) {
        defaultOptions = {
          connect: true,
          step: 1,
          range: { min: 0, max: sliderValues.length - 1 },
          tooltips: true,
          format: {
            to(value) {
              return sliderValues[Math.round(value)];
            },
            from(value) {
              return sliderValues.indexOf(value);
            }
          }
        };
      } else {
        defaultOptions = {
          start: [10],
          connect: [true, false],
          step: 1,
          range: { min: [0], max: [100] },
          tooltips: true
        };
      }
      const options = window._.merge(defaultOptions, userOptions);
      window.noUiSlider.create(item, { ...options });
    });
  }
};

export default nouisliderInit;
