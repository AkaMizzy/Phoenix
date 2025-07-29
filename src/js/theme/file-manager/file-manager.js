import { getFileDetailsTemplate, skeletonTemplate } from './template';
import { myFiles } from './data';

const fileManagerInit = () => {
  const fileContainer = document.querySelector('[data-files-container]');
  const fileDetailsContainer = document.querySelector(
    '[data-details-container]'
  );
  const fileDetails = fileDetailsContainer.querySelector('[data-file-details]');
  const filesSelected = document.querySelector('[data-files-selected]');
  const fileManager = document.querySelector(
    '[data-collapse-filemanager-sidebar]'
  );
  const sidebarToggleBtn = document.querySelector('[data-toggle-sidebar]');
  const fileDetailsToggleBtns = document.querySelectorAll(
    '[data-toggle-file-details]'
  );
  const thumbnails = document.querySelectorAll('[data-file-thumbnail]');
  const removeBulkCheck = document.querySelector('[data-remove-bulk-check]');
  const bulkSelectReplaceEl = document.querySelector(
    '#file-manager-replace-element'
  );
  const bulkSelectActions = document.querySelector('#file-manager-actions');
  const bulkSelectEl = document.querySelector('[data-bulk-select]');
  const bulkSelectInstance =
    window.phoenix.BulkSelect.getInstance(bulkSelectEl);
  let count = 0;
  let selectedFiles = [];
  let clickTimer = null;
  const updateUI = () => {
    if (count > 0) {
      filesSelected.textContent = `${count} ${
        count === 1 ? 'item' : 'items'
      } selected`;
    }

    if (count === 1) {
      const template = getFileDetailsTemplate(selectedFiles[0]);
      fileDetails.innerHTML = template;
    } else {
      fileDetails.innerHTML = `
        <div class='text-center px-4'>
          ${count > 0 ? `<h5 class='mb-3'>${count} items selected</h5>` : ''}
          <img class='d-dark-none img-fluid' src='../../assets/img/spot-illustrations/46.png'>
          <img class='d-light-none img-fluid' src='../../assets/img/spot-illustrations/dark_46.png'>
          ${
            count === 0
              ? "<h5 class='mt-4'>Select an item to view more information</h5>"
              : ''
          }
        </div>
      `;
    }
  };

  const elements = [];
  thumbnails.forEach((thumbnail, index) => {
    const element = {};
    const src = thumbnail.getAttribute('data-file-thumbnail');
    element.href = `../../assets/${src}`;
    element.type = src.split('.')[1] === 'mp4' ? 'video' : 'image';
    elements.push(element);
    thumbnail.setAttribute('data-file-index', index);
  });

  fileContainer.addEventListener('click', e => {
    if (clickTimer !== null) {
      clearTimeout(clickTimer);
      clickTimer = null;
    }

    if (e.target.tagName === 'INPUT') {
      const checkBox = e.target;
      if (checkBox.hasAttribute('data-bulk-select')) {
        count = bulkSelectInstance.getSelectedRows().length;
        selectedFiles = [...myFiles.slice(0, count)];
      } else {
        const currentData = myFiles.find(
          file => file.id === parseInt(checkBox.getAttribute('data-file'), 10)
        );
        if (checkBox.checked) {
          count += 1;
          selectedFiles.push(currentData);
        } else {
          selectedFiles = selectedFiles.filter(
            file => file.id !== currentData.id
          );
          count -= 1;
        }
      }
      if (count === 1) {
        fileDetails.innerHTML = skeletonTemplate;
      } else if (count > 1) {
        fileDetails.innerHTML = `
          <div class='text-center px-4'>
            <span class="placeholder col-6 bg-body-secondary mb-3"></span>
            <img class='d-dark-none img-fluid' src='../../assets/img/spot-illustrations/46.png'>
            <img class='d-light-none img-fluid' src='../../assets/img/spot-illustrations/dark_46.png'>
          </div>
        `;
      }
      filesSelected.innerHTML = `
        <div class='text-center'>
          <span class="placeholder bg-body-secondary" style='width: 97px'></span>
        </div>
      `;
      if (count === 0) {
        bulkSelectActions.classList.add('d-none');
        bulkSelectReplaceEl.classList.add('d-block');
        bulkSelectReplaceEl.classList.remove('d-none');
      } else {
        bulkSelectReplaceEl.classList.add('d-none');
        bulkSelectActions.classList.add('d-block');
        bulkSelectActions.classList.remove('d-none');
      }
      clickTimer = setTimeout(() => {
        clickTimer = null;
        updateUI();
      }, 300);
    }
  });

  fileContainer.addEventListener('dblclick', e => {
    const checkBox = e.target;
    if (checkBox.hasAttribute('data-file')) {
      bulkSelectInstance.deselectAll(bulkSelectReplaceEl, bulkSelectActions);
      selectedFiles = [];
      count = 1;
      const currentData = myFiles.find(
        file => file.id === parseInt(checkBox.getAttribute('data-file'), 10)
      );
      selectedFiles.push(currentData);
      e.target.previousElementSibling.checked = true;
      bulkSelectReplaceEl.classList.add('d-none');
      bulkSelectActions.classList.add('d-block');
      bulkSelectActions.classList.remove('d-none');
      updateUI();
    }
    if (checkBox.hasAttribute('data-file-thumbnail')) {
      window
        .GLightbox({
          elements,
          autoplayVideos: true,
          startAt: parseInt(checkBox.getAttribute('data-file-index'), 10)
        })
        .open();
    }
  });

  const updateViewDetailsTooltip = () => {
    fileDetailsToggleBtns.forEach(fileDetailsToggleBtn => {
      if (window.innerWidth > 1539) {
        if (fileDetailsContainer.classList.contains('d-xxl-none')) {
          fileDetailsToggleBtn.setAttribute('data-bs-title', 'Show details');
        } else {
          fileDetailsToggleBtn.setAttribute('data-bs-title', 'Hide details');
        }
      } else {
        fileDetailsToggleBtn.setAttribute('data-bs-title', 'Show details');
      }
      const tooltip =
        window.bootstrap.Tooltip.getInstance(fileDetailsToggleBtn);
      if (tooltip) {
        tooltip.setContent({
          '.tooltip-inner': fileDetailsToggleBtn.getAttribute('data-bs-title')
        });
      } else {
        window.bootstrap.Tooltip(fileDetailsToggleBtn);
      }
    });
  };
  fileDetailsToggleBtns.forEach(fileDetailsToggleBtn => {
    fileDetailsToggleBtn.addEventListener('click', () => {
      if (window.innerWidth > 1539) {
        if (fileDetailsContainer.classList.contains('d-xxl-none')) {
          fileDetailsContainer.classList.remove('d-xxl-none');
        } else {
          fileDetailsContainer.classList.add('d-xxl-none');
        }

        if (
          fileDetailsContainer.previousElementSibling.classList.contains(
            'w-xxl-100'
          )
        ) {
          fileDetailsContainer.previousElementSibling.classList.remove(
            'w-xxl-100'
          );
        } else {
          fileDetailsContainer.previousElementSibling.classList.add(
            'w-xxl-100'
          );
        }
      }
      updateViewDetailsTooltip();
    });
  });

  window.addEventListener('load', () => updateViewDetailsTooltip());
  window.addEventListener('resize', () => updateViewDetailsTooltip());

  removeBulkCheck.addEventListener('click', () => {
    if (bulkSelectInstance) {
      bulkSelectInstance.deselectAll(bulkSelectReplaceEl, bulkSelectActions);
      selectedFiles = [];
      count = 0;
      updateUI();
    }
  });

  sidebarToggleBtn.addEventListener('click', () => {
    fileManager.classList.toggle('show-sidebar');
  });
};

export default fileManagerInit;
