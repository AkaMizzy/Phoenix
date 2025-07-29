const { gantt } = window;

export const formatDate = date =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

export const ganttConfigColumnsData = [
  {
    name: 'text',
    label: 'PROJECT NAME',
    tree: true,
    width: 410,
    min_width: 80,
    template(task) {
      const subTasks = gantt.getChildren(task.id).length;
      return `<div class='gantt-task-title-wrapper'> 
          <span class='gantt-task-title'>${task.text} </span>
          ${
            subTasks
              ? `<span class="badge text-bg-primary">${subTasks}</span>`
              : ''
          }
          <button data-gantt-add-subtask id=${
            task.id
          } class='btn btn-subtle-info  gantt-task-title-btn'><span class='fa-solid fa-plus'/></button>
        </div>`;
    }
  },

  {
    name: 'assignee',
    label: 'ASSIGNEE',
    width: 160,
    template(task) {
      if (task.type === gantt.config.types.project) {
        return '';
      }
      const path = '../assets/img/';
      const owners = task.assignee || [];

      if (!owners.length) {
        return 'Unassigned';
      }

      const items = owners
        .map((assignee, idx) => {
          if (owners.length > 4 && idx === 3) {
            return `
                <a href='#!' data-bs-toggle='dropdown' aria-expanded='false' data-bs-auto-close='outside'
                  class='dropdown-toggle dropdown-caret-none avatar avatar-s'>
                  <div class='avatar-name rounded-circle border border-translucent'>
                    <span>+${owners.length - 3}</span>
                  </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end py-2">
                  ${owners
                    .map(
                      owner =>
                        `<div class='dropdown-item py-2 px-3 d-flex gap-2 align-items-center'>
                          <div class='avatar avatar-s'>
                            <img class="rounded-circle" src="${path}${
                          owner.img
                        }" alt="${owner.name || 'assignee'}"
                              />
                          </div>
                          <a href="#" class='fw-bold text-body text-decoration-none lh-1'>${
                            owner.name
                          }</a>
                        </div>`
                    )
                    .join('')}
                </ul>   
              `;
          }

          if (idx <= 3) {
            return `
                 <div data-bs-toggle='dropdown' data-bs-auto-close='outside' class='avatar avatar-s dropdown-toggle dropdown-caret-none'>
                      <img class="rounded-circle" src="${path}${
              assignee.img
            }" alt="${assignee.name || 'assignee'}"
                        />
                </div>
                <ul class="dropdown-menu dropdown-menu-end py-0">
                  <div class='dropdown-item py-0 px-3 d-flex gap-3 align-items-center'>
                          <div class='avatar avatar-s'>
                            <img class="rounded-circle" src="${path}${
              assignee.img
            }" alt="${assignee.name || 'assignee'}"
                              />
                          </div>
                          <a href="#" class='fw-bold text-body text-decoration-none lh-1 py-3'>${
                            assignee.name
                          }</a>
                        </div>
                </ul>
              `;
          }
          return '';
        })
        .join('');
      const template = `<div class="d-flex align-items-center avatar-group">${items}</div>`;
      return template;
    },
    sort: false
  },
  {
    name: 'Priority',
    label: 'PRIORITY',
    width: 160,
    min_width: 50,
    template(task) {
      const label = task.priority?.toLowerCase();
      let color;
      switch (label) {
        case 'urgent':
          color = 'danger';
          break;
        case 'high':
          color = 'warning';
          break;
        case 'medium':
          color = 'success';
          break;
        default:
          color = 'info';
          break;
      }
      return `<div class='text-body'><span class='fa-solid fa-circle text-${color} me-1 fs-10'></span>${
        task.priority || 'Low'
      }</div>`;
    },
    sort(a, b) {
      const priorityA = a.priority.toLowerCase();
      const priorityB = b.priority.toLowerCase();

      if (priorityA < priorityB) return -1;
      if (priorityA > priorityB) return 1;
      return 0;
    }
  },
  {
    name: 'start_date',
    label: 'START DATE',
    align: 'start',
    width: 160,
    template(task) {
      return `
         <span class='uil uil-calendar-alt text-body-quaternary fs-8 me-1'></span> ${formatDate(
           task.start_date
         )} 
      `;
    }
  },
  {
    name: 'end_date',
    label: 'END DATE',
    align: 'start',
    width: 160,
    template(task) {
      return `
       <span class='uil uil-calendar-alt text-body-quaternary fs-8 me-1'></span> ${formatDate(
         task.end_date
       )} 
    `;
    }
  },
  {
    name: 'duration',
    label: 'DURATION',
    align: 'start',
    width: 160,
    template(task) {
      return `
        <span class='uil uil-clock me-1 fs-8 text-quaternary'></span>
        ${task.duration} days 
    `;
    }
  }
];

export const taskTextHandler = isRtl => {
  gantt.config.font_width_ratio = 7;

  const getTaskFitValue = task => {
    const position1 = gantt.posFromDate(task.start_date);
    const position2 = gantt.posFromDate(task.end_date);
    const taskStartPos = isRtl ? position2 : position1;
    const taskEndPos = isRtl ? position1 : position2;
    const width = taskEndPos - taskStartPos;
    const textWidth = (task.text || '').length * gantt.config.font_width_ratio;

    if (width < textWidth) {
      const ganttLastDate = gantt.getState().max_date;
      const ganttEndPos = gantt.posFromDate(ganttLastDate);
      if (ganttEndPos - taskEndPos < textWidth) {
        return 'left';
      }
      return 'right';
    }
    return 'center';
  };

  gantt.templates.leftside_text = (start, end, task) =>
    getTaskFitValue(task) === 'left' ? task.text : '';

  gantt.templates.rightside_text = (start, end, task) =>
    getTaskFitValue(task) === 'right' ? task.text : '';

  gantt.templates.task_text = (start, end, task) =>
    getTaskFitValue(task) === 'center' ? task.text : '';
};
