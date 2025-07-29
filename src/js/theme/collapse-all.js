const collapseAllInit = () => {
  const collapseParent = document.querySelector('[data-collapse-all]');
  const collapseBtn = document.querySelector('[data-btn-collapse-all]');
  if (collapseParent) {
    const collapseElements = collapseParent.querySelectorAll('.collapse');
    collapseElements.forEach(ele => {
      const collapse = window.bootstrap.Collapse.getOrCreateInstance(ele, {
        toggle: false
      });
      collapseBtn.addEventListener('click', () => {
        collapse.hide();
      });
    });
  }
};

export default collapseAllInit;
