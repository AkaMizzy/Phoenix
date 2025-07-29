const avatarTemplate = item => `
<a class="dropdown-toggle dropdown-caret-none d-inline-block" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
  <div class="avatar avatar-m rounded-circle border border-light-subtle">
    <img class="rounded-circle ${
      item.avatar === 'team/avatar.webp' ? 'avatar-placeholder' : ''
    }" src="../../assets/img/${item.avatar}" alt="" />
  </div>
</a>
<div class="dropdown-menu avatar-dropdown-menu p-0 overflow-hidden" style="width: 320px;">
  <div class="position-relative">
    <div class="bg-holder z-n1" style="background-image:url(../../assets/img/bg/bg-32.png);background-size: auto;">
    </div>
    <div class="p-3">
      <div class="text-end">
        <button class="btn p-0 me-2"><span class="fa-solid fa-user-plus text-white"></span></button>
        <button class="btn p-0"><span class="fa-solid fa-ellipsis text-white"></span></button>
      </div>
      <div class="text-center">
        <div class="avatar avatar-xl status-online position-relative me-2 me-sm-0 me-xl-2 mb-2"><img class="rounded-circle border border-light-subtle" src="../../assets/img/${
          item.avatar
        }" alt="" /></div>
        <h6 class="text-white">${item.name}</h6>
        <p class="text-light text-opacity-50 fw-semibold fs-10 mb-2">@tyrion222</p>
        <div class="d-flex flex-center mb-3">
          <h6 class="text-white mb-0">224 <span class="fw-normal text-light text-opacity-75">connections</span></h6><span class="fa-solid fa-circle text-body-tertiary mx-1" data-fa-transform="shrink-10 up-2"></span>
          <h6 class="text-white mb-0">23 <span class="fw-normal text-light text-opacity-75">mutual</span></h6>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-body-emphasis">
    <div class="p-3 border-bottom border-translucent">
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <button class="btn btn-phoenix-secondary btn-icon btn-icon-lg me-2"><span class="fa-solid fa-phone"></span></button>
          <button class="btn btn-phoenix-secondary btn-icon btn-icon-lg me-2"><span class="fa-solid fa-message"></span></button>
          <button class="btn btn-phoenix-secondary btn-icon btn-icon-lg"><span class="fa-solid fa-video"></span></button>
        </div>
        <button class="btn btn-phoenix-primary"><span class="fa-solid fa-envelope me-2"></span>Send Email</button>
      </div>
    </div>
    <ul class="nav d-flex flex-column py-3 border-bottom">
      <li class="nav-item"><a class="nav-link px-3 d-flex flex-between-center" href="#!"> <span class="me-2 text-body d-inline-block" data-feather="clipboard"></span><span class="text-body-highlight flex-1">Assigned Projects</span><span class="fa-solid fa-chevron-right fs-11"></span></a></li>
      <li class="nav-item"><a class="nav-link px-3 d-flex flex-between-center" href="#!"> <span class="me-2 text-body" data-feather="pie-chart"></span><span class="text-body-highlight flex-1">View activiy</span><span class="fa-solid fa-chevron-right fs-11"></span></a></li>
    </ul>
  </div>
  <div class="p-3 d-flex justify-content-between"><a class="btn btn-link p-0 text-decoration-none" href="#!">Details </a><a class="btn btn-link p-0 text-decoration-none text-danger" href="#!">Unassign </a></div>
</div>
`;

const timelineTemplate = (item, index, data) => `
<div class="timeline-item">
  <div class="row g-3">
    <div class="col-auto">
      <div class="timeline-item-bar position-relative">
        <div class="icon-item icon-item-md rounded-7 border border-translucent">
          <span class="${item.icon} text-${item.iconColor} fs-9"></span>
        </div>
          ${
            index !== data.activities.length - 1
              ? '<span class="timeline-bar border-end border-dashed"></span>'
              : ''
          }
      </div>
    </div>
    <div class="col mb-5">
      <div class="d-flex justify-content-between">
        <div class="d-flex mb-2">
          <h6 class="lh-sm mb-0 me-2 text-body-secondary timeline-item-title">${
            item.title
          }</h6>
        </div>
        <p class="text-body-quaternary fs-9 mb-0 text-nowrap timeline-time"><span class="fa-regular fa-clock me-1"></span>${
          item.time
        }</p>
      </div>
      <h6 class="fs-10 fw-normal mb-3">by <a class="fw-semibold" href="#!">${
        item.tasker
      }</a></h6>
      <div class="avatar-group avatar-group-dense">
        ${
          item.assignees
            ? item.assignees.map(member => avatarTemplate(member)).join('')
            : ''
        }
        ${
          item.more
            ? `
          <div class="avatar avatar-m  rounded-circle">
            <div class="avatar-name rounded-circle "><span>+1</span></div>
          </div>`
            : ''
        }
      </div>
    </div>
  </div>
</div>
`;

const detailsTemplate = item => `
<tr>
  <td class="py-1 align-middle">
    <h5 class="mb-0">${item.key}</h5>
  </td>
  <td class="py-1 align-middle">:</td>
  <td class="py-1 align-middle">
    ${item.value}
    ${
      item.modifiedBy
        ? 'by <a class="fs-9 fw-bolder" href="#!">John Doe</a></td>'
        : ''
    }
  </td>
</tr>
`;

export const getFileDetailsTemplate = data => {
  return `
  <div>
    <h3>${data.name}</h3>
    <ul class="nav nav-underline file-details-tab fs-9 flex-nowrap gap-0 mt-4 mb-5" id="fileDetailsTab" role="tablist">
      <li class="nav-item text-nowrap w-50 text-center" role="presentation"><a class="nav-link active" id="details-tab" data-bs-toggle="tab" href="#tab-details" role="tab" aria-controls="tab-details" aria-selected="false" tabindex="-1">File Details</a></li>
      <li class="nav-item text-nowrap w-50 text-center me-2" role="presentation"><a class="nav-link" id="activity-tab" data-bs-toggle="tab" href="#tab-activity" role="tab" aria-controls="tab-activity" aria-selected="false" tabindex="-1">File Activity</a></li>
    </ul>
    <div class="tab-content" id="fileDetailsTab">
      <div class="tab-pane fade active show" id="tab-details" role="tabpanel" aria-labelledby="details-tab">
        ${
          data.type === 'folder'
            ? `<span class="fa-solid fa-folder fs-1 mb-3 ${
                data.id === 3 ? 'text-info-light' : ''
              }"></span>`
            : ''
        }
        ${
          data.type === 'doc'
            ? '<span class="fa-solid fa-file-word fs-1 mb-3"></span>'
            : ''
        }
        ${
          data.type === 'xls'
            ? '<span class="fa-solid fa-file-excel fs-1 mb-3"></span>'
            : ''
        }
        ${
          data.type === 'source-code'
            ? '<span class="fa-solid fa-file-invoice fs-1 mb-3"></span>'
            : ''
        }
        ${
          data.type === 'zip'
            ? '<span class="fa-solid fa-file-zipper fs-1 mb-3"></span>'
            : ''
        }
        ${
          data.type === 'html'
            ? '<span class="fa-solid fa-file-code fs-1 mb-3"></span>'
            : ''
        }
        ${
          data.type === 'pdf'
            ? '<span class="fa-solid fa-file-pdf fs-1 mb-3"></span>'
            : ''
        }
        ${
          data.type === 'image'
            ? `<img class="w-100 h-100 object-fit-cover rounded-2 mb-3" src="../../assets/${data.img}" alt="" style='aspect-ratio: 16/9' />`
            : ''
        }
        ${
          data.type === 'video'
            ? `
            <video class="d-block h-100 w-100 overflow-hidden rounded-2 object-fit-cover mb-3" muted="muted" controls poster="../../assets/${
              data.video.split('.')[0]
            }.png" style='aspect-ratio: 16/9'>
              <source src="../../assets/${data.video}" type="video/mp4" />
            </video>
            `
            : ''
        }
        <table class="table table-borderless">
          <tr>
            <th class="p-0" style="width: 110px"></th>
            <th class="p-0 text-center" style="width: 20px"></th>
            <th class="p-0"></th>
          </tr>
          ${data.details.map(item => detailsTemplate(item)).join('')}
        </table>
        <hr class="mb-4" />
        <h5 class="mb-3">Admin</h5>
        <div class="avatar avatar-m ">
          ${avatarTemplate(data.admin)}
        </div>
        <h5 class="mb-3 mt-5">Team members</h5>
        <div class="avatar-group avatar-group-dense">
        ${data.assignees.map(item => avatarTemplate(item)).join('')}
        </div>
        <a class="btn btn-link p-0" href="#!">Control Access<span class="fa-solid fa-chevron-right ms-2 mt-2"></span></a>
        <hr class="my-4" />
        <h5 class="mb-3 mb-3">File Link</h5>
        <h6 class="fw-normal text-body">${data.fileLink}</h6>
        <button class="btn btn-phoenix-primary mt-2"><span class="fa-solid fa-link me-2"></span>Copy link</button>
      </div>
      <div class="tab-pane fade" id="tab-activity" role="tabpanel" aria-labelledby="activity-tab">
        <h4 class="mb-3">Today</h4>
        <div class="timeline-basic">
          ${data.activities
            .map((item, index) => timelineTemplate(item, index, data))
            .join('')}
        </div>
      </div>
    </div>
  </div>
`;
};

export const skeletonTemplate = `
<div aria-hidden="true">
  <h5 class="placeholder-glow mb-2">
    <span class="placeholder col-8 bg-body-secondary py-3"></span>
  </h5>
  <div class='placeholder-glow mb-2 d-flex gap-2'>
    <span class="placeholder col-6 py-3 bg-body-secondary"></span>
    <span class="placeholder col-6 py-3 bg-body-secondary"></span>
  </div>
  <span class="placeholder col-12 bg-body-secondary mb-3" style='height: 150px'></span>
  <p class="card-text placeholder-glow">
    <span class="placeholder col-12 py-2 mb-2 bg-body-secondary"></span>
    <span class="placeholder col-8 py-2 mb-2 bg-body-secondary"></span>
    <span class="placeholder col-12 py-2 mb-2 bg-body-secondary"></span>
    <span class="placeholder col-10 py-2 mb-2 bg-body-secondary"></span>
  </p>
</div>
`;
