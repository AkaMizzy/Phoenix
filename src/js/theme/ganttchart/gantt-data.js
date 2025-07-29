export const ganttData = {
  tasks: [
    {
      id: 11,
      text: 'Travel agency landing page design',
      progress: 0.6,
      open: true,
      priority: 'Urgent',
      assignee: [
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Jerry Seinfield',
          img: '/team/9.webp'
        }
      ]
    },
    {
      id: 12,
      text: 'Research',
      start_date: '03-04-2023',
      duration: 55,
      parent: 11,
      progress: 1,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        }
      ]
    },
    {
      id: 13,
      text: 'Planning',
      parent: 11,
      progress: 0.6,
      open: true,
      priority: 'Medium',
      assignee: [
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        }
      ]
    },
    {
      id: 14,
      text: 'Design',
      start_date: '25-04-2023',
      duration: 40,
      parent: 11,
      progress: 0.8,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        }
      ]
    },
    {
      id: 15,
      text: 'Development',
      start_date: '10-05-2023',
      duration: 40,
      parent: 11,
      progress: 0.8,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        }
      ]
    },
    {
      id: 16,
      text: 'Testing',
      start_date: '05-06-2023',
      duration: 23,
      type: 'milestone',
      parent: 11,
      progress: 0,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Jerry Seinfield',
          img: '/team/9.webp'
        }
      ]
    },
    {
      id: 17,
      text: 'Deployment',
      start_date: '03-04-2023',
      duration: 52,
      parent: 13,
      progress: 1,
      open: true,
      priority: 'Low',
      assignee: [
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        }
      ]
    },
    {
      id: 24,
      text: 'Design finance app for phoenix',
      progress: 0.5,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Jerry Seinfield',
          img: '/team/9.webp'
        }
      ]
    },
    {
      id: 25,
      text: 'Update figma file for phoenix',
      start_date: '04-04-2023',
      duration: 55,
      progress: 0,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Jerry Seinfield',
          img: '/team/9.webp'
        }
      ]
    },
    {
      id: 26,
      text: 'Falcon figma file update',
      start_date: '10-04-2023',
      duration: 47,
      progress: 0,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Jerry Seinfield',
          img: '/team/9.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        }
      ]
    },
    {
      id: 27,
      text: 'Gantt chart design',
      start_date: '15-04-2023',
      duration: 45,
      progress: 0,
      open: true,
      priority: 'Medium',
      assignee: [
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        }
      ]
    },
    {
      id: 28,
      text: 'Design for new dashboard aurora',
      start_date: '25-06-2023',
      duration: 112,
      progress: 0,
      open: true,
      priority: 'High',
      assignee: [
        {
          name: 'Jerry Seinfield',
          img: '/team/9.webp'
        },
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        }
      ]
    },
    {
      id: 29,
      text: 'Research for new module',
      start_date: '28-04-2023',
      duration: 57,
      progress: 0,
      open: true,
      priority: 'Low',
      assignee: [
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        }
      ]
    },
    {
      id: 30,
      text: 'Research',
      start_date: '04-04-2023',
      duration: 60,
      progress: 0,
      open: true,
      priority: 'Low',
      parent: 24,
      assignee: [
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        }
      ]
    },
    {
      id: 31,
      text: 'Development',
      start_date: '16-04-2023',
      duration: 68,
      progress: 0,
      parent: 24,
      open: true,
      priority: 'Low',
      assignee: [
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        },
        {
          name: 'Emma Watson',
          img: '/team/4.webp'
        },
        {
          name: 'Igor Borvibson',
          img: '/team/1.webp'
        },
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        }
      ]
    },
    {
      id: 33,
      text: 'Deployment',
      start_date: '27-05-2023',
      duration: 32,
      progress: 0,
      parent: 24,
      open: true,
      priority: 'Low',
      assignee: [
        {
          name: 'Barbara Lucas',
          img: '/team/3.webp'
        },
        {
          name: 'Lina Burton',
          img: '/team/2.webp'
        }
      ]
    }
  ],
  links: [
    { id: 10, source: 11, target: 12, type: 1 },
    { id: 11, source: 11, target: 13, type: 1 },
    { id: 12, source: 11, target: 14, type: 1 },
    { id: 13, source: 11, target: 15, type: 1 },
    { id: 14, source: 23, target: 16, type: 0 },
    { id: 15, source: 13, target: 17, type: 1 },
    { id: 16, source: 17, target: 18, type: 0 },
    { id: 17, source: 18, target: 19, type: 0 },
    { id: 18, source: 19, target: 20, type: 0 },
    { id: 19, source: 15, target: 21, type: 2 },
    { id: 20, source: 15, target: 22, type: 2 },
    { id: 21, source: 15, target: 23, type: 0 },
    { id: 29, source: 24, target: 30, type: 1 },
    { id: 30, source: 24, target: 31, type: 1 },
    { id: 33, source: 24, target: 31, type: 1 }
  ]
};
