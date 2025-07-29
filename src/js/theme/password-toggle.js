const passwordToggleInit = () => {
  const passwords = document.querySelectorAll('[data-password]');
  if (passwords) {
    passwords.forEach(password => {
      const passwordInput = password.querySelector('[data-password-input]');
      const passwordToggler = password.querySelector('[data-password-toggle]');
      passwordToggler.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
          passwordInput.setAttribute('type', 'text');
          passwordToggler.classList.add('show-password');
        } else {
          passwordInput.setAttribute('type', 'password');
          passwordToggler.classList.remove('show-password');
        }
      });
    });
  }
};

export default passwordToggleInit;
