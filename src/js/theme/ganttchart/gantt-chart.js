/* -------------------------------------------------------------------------- */
/*                             Gantt Chart                               */
/* -------------------------------------------------------------------------- */
import { ganttData } from './gantt-data';
import {
  formatDate,
  ganttConfigColumnsData,
  taskTextHandler
} from './layout-config';

const { gantt } = window;

const Selectors = {
  DATA_GANTT_SEARCH: '[data-gantt-search]',
  DATA_GANTT_SEARCH_DISMISS: '[data-gantt-search-dismiss]',
  DATA_GANTT_VIEW: '[data-gantt-view]',
  DATA_DELETE_LINK_MODAL: '#dataDeleteLinkModal',
  DATA_GANTT_ZOOM: 'data-gantt-zoom',
  DATA_GANTT_ADD_TASK: '[data-gantt-add-task]',
  DATA_GANTT_ADD_SUBTASK: '[data-gantt-add-subtask]',
  TASK_DETAILS_OFFCANVAS: '#taskDetailsOffcanvas',
  TASK_DETAILS_NAME: '#taskDetailsName',
  TASK_DETAILS_START_DATE: '#taskDetailsStartDate',
  TASK_DETAILS_END_DATE: '#taskDetailsEndDate',
  TASK_DETAILS_DURATION: '#taskDetailsDuration',
  GANTT_ADD_TASK_MODAL: '#ganttAddTaskModal',
  CREATE_TASK_NAME: 'createTaskName',
  CREATE_TASK_START_DATE: 'createTaskStartDate',
  CREATE_TASK_DURATION: 'createTaskDuration',
  CREATE_NEW_TASK: '#createNewTask',
  GANTT_UPDATE_TASK: 'ganttUpdateTask',
  GANTT_DELETE_TASK: '#ganttDeleteTask',
  GANTT_CONFIRM_DELETE_TASK: '#ganttConfirmDeleteTask',
  GANTT_DELETE_TASK_MODAL: '#ganttDeleteTaskModal',
  GANTT_DELETE_LINK_MODAL: '#ganttDeleteLinkModal',
  GANTT_DELETE_LINK_BTN: '#ganttDeleteLinkBtn',
  GANTT_ZOOM_TO_FIT: '#ganttZoomToFit'
};

const Views = {
  DAYS: 'days',
  WEEKS: 'weeks',
  MONTHS: 'months',
  YEARS: 'years'
};
const Events = {
  CLICK: 'click',
  INPUT: 'input',
  ON_TASK_DBL_CLICK: 'onTaskDblClick',
  ON_TASK_CREATED: 'onTaskCreated',
  ON_LINK_DBL_CLICK: 'onLinkDblClick',
  SHOWN_BS_MODAL: 'shown.bs.modal',
  HIDDEN_BS_OFFCANVAS: 'hidden.bs.offcanvas',
  ON_BEFORE_TASK_DISPLAY: 'onBeforeTaskDisplay'
};

const weekScaleTemplate = date => {
  const dateToStr = gantt.date.date_to_str('%M %d');
  const endDate = gantt.date.add(date, 7 - date.getDay(), 'day');
  return `${dateToStr(date)} - ${dateToStr(endDate)}`;
};

const scales = {
  days: [
    { unit: 'week', step: 1, format: '%W' },
    { unit: 'day', step: 1, format: '%d %M' }
  ],
  weeks: [
    { unit: 'month', step: 1, format: '%F' },
    { unit: 'week', step: 1, format: weekScaleTemplate }
  ],
  months: [
    { unit: 'year', step: 1, format: '%Y' },
    { unit: 'month', step: 1, format: '%F' }
  ],
  years: [
    {
      unit: 'year',
      step: 3,
      format(date) {
        const dateToStr = gantt.date.date_to_str('%Y');
        const endDate = gantt.date.add(date, 3, 'year');
        return `${dateToStr(date)} - ${dateToStr(endDate)}`;
      }
    },
    { unit: 'year', step: 1, format: '%Y' }
  ]
};

/* --------------Search Handler start ------------------*/
const searchHandler = () => {
  let filterValue = '';
  const filterEl = document.querySelector(Selectors.DATA_GANTT_SEARCH);
  const searchDismissBtn = document.querySelector(
    Selectors.DATA_GANTT_SEARCH_DISMISS
  );
  searchDismissBtn?.addEventListener(Events.CLICK, () => {
    filterValue = '';
    filterEl.value = '';
    searchDismissBtn?.classList.remove('d-block');
    gantt.render();
  });
  filterEl?.addEventListener(Events.INPUT, () => {
    if (filterEl.value.length > 0) {
      searchDismissBtn?.classList.add('d-block');
    } else {
      searchDismissBtn?.classList.remove('d-block');
    }
    filterValue = filterEl.value;
    gantt.render();
  });
  const filterLogic = (task, match = false) => {
    gantt.eachTask(child => {
      if (filterLogic(child)) {
        match = true;
      }
    }, task.id);

    if (task.text.toLowerCase().includes(filterValue.toLowerCase())) {
      match = true;
    }

    return match;
  };

  gantt.attachEvent(Events.ON_BEFORE_TASK_DISPLAY, (id, task) => {
    if (!filterValue) {
      return true; // Show all tasks if no filter is applied
    }
    return filterLogic(task); // Filter tasks
  });
};
/* --------------Search Handler End ------------------*/

/* -------------- Link Delete Handler Start   ---------------*/
const linkDeleteHandler = () => {
  let currentLinkId;
  const linkDeleteModalEl = document.querySelector(
    Selectors.GANTT_DELETE_LINK_MODAL
  );
  const linkDeleteModal = new window.bootstrap.Modal(linkDeleteModalEl);
  gantt.attachEvent(Events.ON_LINK_DBL_CLICK, id => {
    currentLinkId = id;
    linkDeleteModal.show();
    return false;
  });

  // Confirm deletion of the link
  const deleteLinkBtn = document.querySelector(Selectors.GANTT_DELETE_LINK_BTN);
  deleteLinkBtn.addEventListener(Events.CLICK, () => {
    if (currentLinkId) {
      gantt.deleteLink(currentLinkId);
    }
    linkDeleteModal.hide();
  });
};
/* ---------- Link Delete Handler End -------------------------------*/

/* ---------- Task Double-Click Handler Start ------------------------*/
let currentTaskId;
const taskDoubleClickHandler = () => {
  gantt.attachEvent(Events.ON_TASK_DBL_CLICK, id => {
    const task = gantt.getTask(id);
    currentTaskId = id;

    const offcanvasEl = document.querySelector(
      Selectors.TASK_DETAILS_OFFCANVAS
    );
    if (offcanvasEl) {
      const offcanvas = new window.bootstrap.Offcanvas(offcanvasEl);
      offcanvas.show();

      // update offcanvas taskname
      const taskNameEl = offcanvasEl.querySelector(Selectors.TASK_DETAILS_NAME);
      if (taskNameEl) taskNameEl.value = task.text;

      // update dates with flatpickr
      const ganttTaskStartPicker = window.flatpickr(
        Selectors.TASK_DETAILS_START_DATE,
        {
          dateFormat: 'M j, Y',
          disableMobile: true,
          defaultDate: 'Mar 1, 2022'
        }
      );
      const ganttTaskEndPicker = window.flatpickr(
        Selectors.TASK_DETAILS_END_DATE,
        {
          dateFormat: 'M j, Y',
          disableMobile: true,
          defaultDate: 'Mar 1, 2022'
        }
      );
      const taskStartDate = formatDate(task.start_date);
      const taskEndDate = formatDate(task.end_date);
      ganttTaskStartPicker.setDate(taskStartDate, true);
      ganttTaskEndPicker.setDate(taskEndDate, true);
      document.querySelector(Selectors.TASK_DETAILS_DURATION).value =
        task.duration;
    }

    return false; // Prevent default lightbox
  });
};
/* ---------- Task Double-Click Handler End ------------------------*/

/* -------------Task Update Handler Start  ------------------*/
const taskUpdateHandler = () => {
  document
    .getElementById(Selectors.GANTT_UPDATE_TASK)
    ?.addEventListener(Events.CLICK, () => {
      const offcanvasEl = document.querySelector(
        Selectors.TASK_DETAILS_OFFCANVAS
      );
      const updatedTaskName = offcanvasEl.querySelector(
        Selectors.TASK_DETAILS_NAME
      ).value;
      const task = gantt.getTask(currentTaskId);

      const updatedStartDate = new Date(
        document.querySelector(Selectors.TASK_DETAILS_START_DATE).value
      );

      const updatedDuration = document.querySelector(
        Selectors.TASK_DETAILS_DURATION
      ).value;

      const updatedEndDate = gantt.calculateEndDate({
        start_date: updatedStartDate,
        duration: updatedDuration,
        task: {}
      });

      if (
        updatedTaskName &&
        updatedStartDate &&
        updatedEndDate &&
        updatedDuration
      ) {
        task.text = updatedTaskName;
        task.start_date = updatedStartDate;
        task.duration = updatedDuration;
        task.end_date = updatedEndDate;
        gantt.updateTask(task.id, task);
        const offcanvasInstance =
          window.bootstrap.Offcanvas.getInstance(offcanvasEl);
        offcanvasInstance.hide();
      }
    });
};
/* -------------Task Update Handler End  ------------------*/

/* ----------- Task delete Handler start --------------------*/
const taskDeleteHandler = () => {
  const ganttDeleteTask = document.querySelector(Selectors.GANTT_DELETE_TASK);

  if (ganttDeleteTask) {
    let triggerDeleteModal = false; // Flag to determine whether to show the modal

    ganttDeleteTask.addEventListener('click', () => {
      triggerDeleteModal = true;
      const offcanvasEl = document.querySelector(
        Selectors.TASK_DETAILS_OFFCANVAS
      );

      const offcanvasInstance =
        window.bootstrap.Offcanvas.getInstance(offcanvasEl);

      offcanvasInstance.hide();
      const modalEl = document.querySelector(Selectors.GANTT_DELETE_TASK_MODAL);
      console.log(modalEl);

      const modal = new window.bootstrap.Modal(modalEl);
      offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        if (triggerDeleteModal) {
          if (modalEl) {
            modal.show();
          }
          triggerDeleteModal = false;
        }
      });
      modalEl.addEventListener(Events.SHOWN_BS_MODAL, () => {
        const confirmDeleteTaskBtn = document.querySelector(
          Selectors.GANTT_CONFIRM_DELETE_TASK
        );
        if (confirmDeleteTaskBtn) {
          confirmDeleteTaskBtn.addEventListener(Events.CLICK, () => {
            if (currentTaskId) {
              gantt.deleteTask(currentTaskId);
              modal.hide();
            }
          });
        }
      });
    });
  }
};
/* ------------- Task delete Handler End --------------------*/

/* ------------Task Create Handler Start ----------------------*/
const taskCreateHandler = () => {
  gantt.attachEvent(Events.ON_TASK_CREATED, task => {
    const modalEl = document.querySelector(Selectors.GANTT_ADD_TASK_MODAL);
    const modal = new window.bootstrap.Modal(modalEl);
    modal.show();
    document.getElementById(Selectors.CREATE_TASK_NAME).value = task.text || '';
    document.querySelector(Selectors.CREATE_NEW_TASK).onclick = () => {
      const taskName = document.getElementById(
        Selectors.CREATE_TASK_NAME
      ).value;
      const taskStart = new Date(
        document.getElementById(Selectors.CREATE_TASK_START_DATE).value
      );
      const duration =
        document.getElementById(Selectors.CREATE_TASK_DURATION).value || 2;
      const taskEnd = gantt.calculateEndDate({
        start_date: taskStart,
        duration,
        task: {}
      });
      if (taskName && taskStart && taskEnd) {
        task.text = taskName;
        task.start_date = taskStart;
        task.end_date = taskEnd;
        gantt.addTask(task);
        modal.hide();
      }
    };
    return false; // Prevent default task creation
  });
};
/* ------------Task Create Handler End ----------------------*/

/* -------------- Gantt chart init start --------------*/
const ganttChartInit = () => {
  const { getItemFromStore, breakpoints } = window.phoenix.utils;
  const ganttElement = document.querySelector('#gantt-app');
  if (!ganttElement) return;

  gantt.plugins({});
  gantt.config.scales = scales.months;
  gantt.config.row_height = 48; // Adjust task row height
  gantt.config.scale_height = 70;
  gantt.config.bar_height = 16;
  gantt.config.sort = true;
  gantt.config.grid_resizer = true;
  gantt.config.min_column_width = 130; // Increase the minimum width of each cell
  gantt.config.columns = ganttConfigColumnsData;
  const gridWidth = 518;
  // --------- configure layout start ----------
  const gridConfig = {
    width: gridWidth,
    rows: [
      {
        view: 'grid',
        scrollX: 'gridScroll',
        scrollable: true,
        scrollY: 'scrollVer'
      },
      { view: 'scrollbar', id: 'gridScroll' }
    ]
  };

  const timelineConfig = {
    rows: [
      { view: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
      { view: 'scrollbar', id: 'scrollHor' }
    ]
  };

  const scrollbarConfig = { view: 'scrollbar', id: 'scrollVer' };
  const resizerConfig = { resizer: true, width: 1 };

  gantt.config.layout = {
    css: 'gantt_container',
    cols: [gridConfig, resizerConfig, timelineConfig, scrollbarConfig]
  };

  // ---- Rtl
  const isRtl = getItemFromStore('phoenixIsRTL');
  if (isRtl) {
    gantt.config.rtl = true;
    gantt.config.layout = {
      css: 'gantt_container',
      cols: [scrollbarConfig, timelineConfig, resizerConfig, gridConfig]
    };
  }
  // --------- configure layout end ----------
  taskTextHandler(isRtl);
  gantt.config.scroll_size = 7;

  gantt.init('gantt-app');
  gantt.parse(ganttData);

  // ---------- add a custom class to header ------------------
  gantt.templates.grid_header_class = columnName => {
    if (columnName === 'assignee') {
      return 'sort-btn-none';
    }
    return '';
  };

  /* -------------Gantt view handler Start----------------*/
  const updateGanttView = label => {
    switch (label) {
      case Views.DAYS:
        gantt.config.scales = scales.days;
        break;
      case Views.WEEKS:
        gantt.config.scales = scales.weeks;
        break;
      case Views.MONTHS:
        gantt.config.scales = scales.months;
        break;
      case Views.YEARS:
        gantt.config.scales = scales.years;
        break;
      default:
        gantt.config.scales = scales.months;
        break;
    }
    gantt.render();
  };
  let setCurrentView = Views.DAYS;

  const ganttViewEl = document.querySelector('[data-gantt-view]');
  ganttViewEl?.addEventListener('change', event => {
    if (document.querySelector(Selectors.GANTT_ZOOM_TO_FIT).checked) {
      document.querySelector(Selectors.GANTT_ZOOM_TO_FIT).checked = false;
    }
    setCurrentView = event.target.value;
    updateGanttView(event.target.value);
  });

  /*----------------------------------------------------------------------
                Click handler                                  
  ------------------------------------------------------------------------*/
  document.addEventListener(Events.CLICK, event => {
    const ganttZoomEl = event.target.hasAttribute(Selectors.DATA_GANTT_ZOOM)
      ? event.target
      : event.target.closest([Selectors.DATA_GANTT_ZOOM]);
    const ganttAddTaskEl = event.target.closest(Selectors.DATA_GANTT_ADD_TASK);
    const ganttAddSubtaskEl = event.target.closest(
      Selectors.DATA_GANTT_ADD_SUBTASK
    );

    if (ganttZoomEl) {
      let zoom;
      const isCheckBox = ganttZoomEl?.getAttribute('type') === 'checkbox';
      if (isCheckBox) {
        zoom = Views.MONTHS;
        const isChecked = ganttZoomEl.checked;
        updateGanttView(isChecked ? zoom : setCurrentView);
        document.querySelector(Selectors.DATA_GANTT_VIEW).value = isChecked
          ? zoom
          : setCurrentView;
      } else {
        if (document.querySelector(Selectors.GANTT_ZOOM_TO_FIT).checked) {
          document.querySelector(Selectors.GANTT_ZOOM_TO_FIT).checked = false;
        }
        // const zoomValue = ganttZoomEl.getAttribute(Selectors.DATA_GANTT_ZOOM);
        // zoom = zoomValue === 'zoomIn' ? Views.DAYS : Views.MONTHS;
        updateGanttView(zoom);
      }
    }
    // --------- crete a new task/subtask when click on add btn --------
    if (ganttAddTaskEl) {
      gantt.createTask({
        text: '',
        duration: 5
      });
    } else if (ganttAddSubtaskEl) {
      gantt.createTask({
        text: '',
        duration: 3,
        parent: ganttAddSubtaskEl.getAttribute('id')
      });
    }
  });

  // -------- gantt responsive start ---------
  const handleResize = () => {
    gantt.$root.style.width = '100%';
    const { cols } = gantt.config.layout;
    const gridBox = cols.find(item => item.rows?.[0]?.view === 'grid') || {};

    if (window.innerWidth <= breakpoints.sm) {
      gridBox.width = 200;
    } else if (window.innerWidth <= breakpoints.md) {
      gridBox.width = 280;
    } else if (window.innerWidth <= breakpoints.lg) {
      gridBox.width = 300;
    } else if (window.innerWidth <= breakpoints.xl) {
      gridBox.width = 420;
    } else {
      gridBox.width = gridWidth;
    }
    gantt.init('gantt-app');
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  // -------- gantt responsive End ---------

  // -------- Attach event handlers---------
  taskDoubleClickHandler();
  taskCreateHandler();
  taskUpdateHandler();
  taskDeleteHandler();
  linkDeleteHandler();
  searchHandler();
};

export default ganttChartInit;
