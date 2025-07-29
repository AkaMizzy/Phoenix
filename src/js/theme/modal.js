/* ----------------------------------------------------------------- */
/*                               Modal                               */
/* ----------------------------------------------------------------- */

const modalInit = () => {
  const $modals = document.querySelectorAll('[data-phoenix-modal]');

  if ($modals) {
    const { getData, getCookie, setCookie } = window.phoenix.utils;
    $modals.forEach(modal => {
      const userOptions = getData(modal, 'phoenix-modal');
      const defaultOptions = {
        autoShow: false
      };
      const options = window._.merge(defaultOptions, userOptions);
      if (options.autoShow) {
        const autoShowModal = new window.bootstrap.Modal(modal);
        const disableModalBtn = modal.querySelector(
          '[data-disable-modal-auto-show]'
        );

        disableModalBtn.addEventListener('click', () => {
          const seconds = 24 * 60 * 60;
          setCookie('disableAutoShowModal', 'true', seconds);
        });

        const disableAutoShowModalCookie = getCookie('disableAutoShowModal');
        if (!disableAutoShowModalCookie) {
          autoShowModal.show();
        }
      } else {
        modal.addEventListener('shown.bs.modal', () => {
          const $autofocusEls = modal.querySelectorAll('[autofocus=autofocus]');
          $autofocusEls.forEach(el => {
            el.focus();
          });
        });
      }
    });
  }
};
export default modalInit;
