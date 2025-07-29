/* -------------------------------------------------------------------------- */
/*                               price tier form                                   */
/* -------------------------------------------------------------------------- */

const priceTierFormInit = () => {
  const priceTierForms = document.querySelectorAll('[data-form-price-tier]');
  if (priceTierForms) {
    priceTierForms.forEach(priceTierForm => {
      const priceToggler = priceTierForm.querySelector('[data-price-toggle]');
      const pricings = priceTierForm.querySelectorAll('[data-pricing]');
      const bottomOption = priceTierForm.querySelector(
        '[data-pricing-collapse]'
      );

      const pricingCollapse = new window.bootstrap.Collapse(bottomOption, {
        toggle: false
      });

      priceToggler.addEventListener('change', e => {
        pricings[0].checked = true;
        if (e.target.checked) {
          priceTierForm.classList.add('active');
        } else {
          priceTierForm.classList.remove('active');
          pricingCollapse.hide();
        }
      });
      pricings.forEach(pricing => {
        pricing.addEventListener('change', e => {
          if (e.target.value === 'paid') {
            pricingCollapse.show();
          } else {
            pricingCollapse.hide();
          }
        });
      });
    });
  }
};

export default priceTierFormInit;
