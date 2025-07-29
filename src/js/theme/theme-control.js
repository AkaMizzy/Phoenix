import DomNode from './node';

/* -------------------------------------------------------------------------- */
/*                                Theme Control                               */
/* -------------------------------------------------------------------------- */
/* eslint-disable no-param-reassign */
/* eslint-disable */
const { config } = window.config;

const initialDomSetup = element => {
  const { getData, getItemFromStore, getSystemTheme } = window.phoenix.utils;
  if (!element) return;

  element.querySelectorAll('[data-theme-control]').forEach(el => {
    const inputDataAttributeValue = getData(el, 'theme-control');
    const localStorageValue = getItemFromStore(inputDataAttributeValue);

    // diable horizontal navbar shape for dual nav
    if (
      inputDataAttributeValue === 'phoenixNavbarTopShape' &&
      getItemFromStore('phoenixNavbarPosition') === 'dual-nav'
    ) {
      el.setAttribute('disabled', true);
    }

    // diable navbar vertical style for horizontal & dual navbar
    const currentNavbarPosition = getItemFromStore('phoenixNavbarPosition');
    const isHorizontalOrDualNav =
      currentNavbarPosition === 'horizontal' ||
      currentNavbarPosition === 'dual-nav';
    if (
      inputDataAttributeValue === 'phoenixNavbarVerticalStyle' &&
      isHorizontalOrDualNav
    ) {
      el.setAttribute('disabled', true);
    }

    if (el.type === 'checkbox') {
      if (inputDataAttributeValue === 'phoenixTheme') {
        if (
          localStorageValue === 'auto'
            ? getSystemTheme() === 'dark'
            : localStorageValue === 'dark'
        ) {
          el.setAttribute('checked', true);
        }
      } else {
        localStorageValue && el.setAttribute('checked', true);
      }
    } else if (
      el.type === 'radio' &&
      inputDataAttributeValue === 'phoenixNavbarVerticalStyle'
    ) {
      localStorageValue === 'darker' &&
        el.value === 'darker' &&
        el.setAttribute('checked', true);
      localStorageValue === 'default' &&
        el.value === 'default' &&
        el.setAttribute('checked', true);
    } else if (
      el.type === 'radio' &&
      inputDataAttributeValue === 'phoenixNavbarTopShape'
    ) {
      localStorageValue === 'slim' &&
        el.value === 'slim' &&
        el.setAttribute('checked', true);
      localStorageValue === 'default' &&
        el.value === 'default' &&
        el.setAttribute('checked', true);
    } else if (
      el.type === 'radio' &&
      inputDataAttributeValue === 'phoenixNavbarTopStyle'
    ) {
      localStorageValue === 'darker' &&
        el.value === 'darker' &&
        el.setAttribute('checked', true);
      localStorageValue === 'default' &&
        el.value === 'default' &&
        el.setAttribute('checked', true);
    } else if (
      el.type === 'radio' &&
      inputDataAttributeValue === 'phoenixTheme'
    ) {
      const isChecked = localStorageValue === el.value;
      isChecked && el.setAttribute('checked', true);
    } else if (
      el.type === 'radio' &&
      inputDataAttributeValue === 'phoenixNavbarPosition'
    ) {
      const isChecked = localStorageValue === el.value;
      isChecked && el.setAttribute('checked', true);
    } else {
      const isActive = localStorageValue === el.value;
      isActive && el.classList.add('active');
    }
  });
};

const changeTheme = element => {
  const { getData, getItemFromStore, getSystemTheme } = window.phoenix.utils;

  element
    .querySelectorAll('[data-theme-control = "phoenixTheme"]')
    .forEach(el => {
      const inputDataAttributeValue = getData(el, 'theme-control');
      const localStorageValue = getItemFromStore(inputDataAttributeValue);

      if (el.type === 'checkbox') {
        if (localStorageValue === 'auto') {
          getSystemTheme() === 'dark'
            ? (el.checked = true)
            : (el.checked = false);
        } else {
          localStorageValue === 'dark'
            ? (el.checked = true)
            : (el.checked = false);
        }
      } else if (el.type === 'radio') {
        localStorageValue === el.value
          ? (el.checked = true)
          : (el.checked = false);
      } else {
        localStorageValue === el.value
          ? el.classList.add('active')
          : el.classList.remove('active');
      }
    });
};

const handleThemeDropdownIcon = value => {
  document.querySelectorAll('[data-theme-dropdown-toggle-icon]').forEach(el => {
    el.classList.toggle(
      'd-none',
      value !== el.getAttribute('data-theme-dropdown-toggle-icon')
      // value !== getData(el, 'theme-dropdown-toggle-icon')
    );
  });
};

handleThemeDropdownIcon(localStorage.getItem('phoenixTheme'));

const themeControl = () => {
  const { getData, getItemFromStore, getSystemTheme } = window.phoenix.utils;
  // handleThemeDropdownIcon(
  //   window.phoenix.utils.getItemFromStore('phoenixTheme'),
  //   getData
  // );

  const handlePageUrl = el => {
    const pageUrl = getData(el, 'page-url');
    if (pageUrl) {
      window.location.replace(pageUrl);
    } else {
      window.location.reload();
    }
  };

  const themeController = new DomNode(document.body);

  const navbarVertical = document.querySelector('.navbar-vertical');
  const navbarTop = document.querySelector('.navbar-top');
  const supportChat = document.querySelector('.support-chat-container');
  initialDomSetup(themeController.node);

  themeController.on('click', e => {
    const target = new DomNode(e.target);

    if (target.data('theme-control')) {
      const control = target.data('theme-control');

      let value = e.target[e.target.type === 'checkbox' ? 'checked' : 'value'];

      if (control === 'phoenixTheme') {
        typeof value === 'boolean' && (value = value ? 'dark' : 'light');
      }

      // config.hasOwnProperty(control) && setItemToStore(control, value);
      config.hasOwnProperty(control) &&
        window.config.set({
          [control]: value
        });

      const params = new URLSearchParams(window.location.search);
      const isThemeControlTrue = params.get('theme-control') === 'true';
      if (isThemeControlTrue) {
        window.history.replaceState(null, null, window.location.pathname);
      }

      switch (control) {
        case 'phoenixTheme': {
          document.documentElement.setAttribute(
            'data-bs-theme',
            value === 'auto' ? getSystemTheme() : value
          );
          // document.documentElement.classList[
          //   value === 'dark' ? 'add' : 'remove'
          // ]('dark');
          const clickControl = new CustomEvent('clickControl', {
            detail: { control, value }
          });
          e.currentTarget.dispatchEvent(clickControl);
          changeTheme(themeController.node);
          break;
        }
        case 'phoenixNavbarVerticalStyle': {
          navbarVertical.setAttribute('data-navbar-appearance', 'default');
          if (value !== 'default') {
            navbarVertical.setAttribute('data-navbar-appearance', 'darker');
          }
          break;
        }
        case 'phoenixNavbarTopStyle': {
          navbarTop.setAttribute('data-navbar-appearance', 'default');
          if (value !== 'default') {
            navbarTop.setAttribute('data-navbar-appearance', 'darker');
          }
          break;
        }
        case 'phoenixNavbarTopShape':
          {
            if (getItemFromStore('phoenixNavbarPosition') === 'dual-nav') {
              el.setAttribute('disabled', true);
              // document.documentElement.setAttribute("data-bs-theme", value);
            } else handlePageUrl(target.node);
          }
          break;
        case 'phoenixNavbarPosition':
          {
            handlePageUrl(target.node);
          }

          break;
        case 'phoenixIsRTL':
          {
            // localStorage.setItem('phoenixIsRTL', target.node.checked);
            window.config.set({
              phoenixIsRTL: target.node.checked
            });
            window.location.reload();
          }
          break;

        case 'phoenixSupportChat': {
          supportChat?.classList.remove('show');
          if (value) {
            supportChat?.classList.add('show');
          }
          break;
        }

        case 'reset': {
          window.config.reset();
          window.location.reload();
          break;
        }

        default: {
          window.location.reload();
        }
      }
    }
  });

  themeController.on('clickControl', ({ detail: { control, value } }) => {
    if (control === 'phoenixTheme') {
      handleThemeDropdownIcon(value);
    }
  });
};

export default themeControl;
