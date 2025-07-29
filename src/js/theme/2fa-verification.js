const twoFAVerificarionInit = () => {
  const verificationForm = document.querySelector('[data-2fa-form]');
  const inputFields = verificationForm?.querySelectorAll('input[type=number]');
  const varificationBtn = verificationForm?.querySelector(
    'button[type=submit]'
  );

  if (verificationForm) {
    window.addEventListener('load', () => inputFields[0].focus());
    const totalInputLength = 6;
    inputFields.forEach((input, index) => {
      input.addEventListener('keyup', e => {
        const { value } = e.target;
        if (value) {
          [...value].slice(0, totalInputLength).forEach((char, charIndex) => {
            if (inputFields && inputFields[index + charIndex]) {
              inputFields[index + charIndex].value = char;
              inputFields[index + charIndex + 1]?.focus();
            }
          });
        } else {
          inputFields[index].value = '';
          inputFields[index - 1]?.focus();
        }
        const inputs = [...inputFields];
        const updatedOtp = inputs.reduce(
          (acc, inputData) => acc + (inputData?.value || ''),
          ''
        );
        if (totalInputLength === updatedOtp.length) {
          varificationBtn.removeAttribute('disabled');
        } else {
          varificationBtn.setAttribute('disabled', true);
        }
      });
    });
  }
};

export default twoFAVerificarionInit;
