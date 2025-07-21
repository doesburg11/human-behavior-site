export default {
  tutorialSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Human Behavior Patterns',
      link: { type: 'doc', id: 'human-behavior-patterns/overview-hbp' },  
      items: [
        {
          type: 'category',
          label: 'Fundamentals',
          link: { type: 'doc', id: 'human-behavior-patterns/fundamentals/overview-fundamentals' }, 
          items: [
            { type: 'doc', id: 'human-behavior-patterns/fundamentals/domains-fundamentals', label: 'Domains' },
          ],
        },
        {
          type: 'category',
          label: 'The Machinery',
          link: { type: 'doc', id: 'human-behavior-patterns/machinery/overview-machinery' }, 
          items: [
            { type: 'doc', id: 'human-behavior-patterns/machinery/values-machinery', label: 'Values' },
          ],
        },
        {
          type: 'category',
          label: 'MARL',
          link: { type: 'doc', id: 'human-behavior-patterns/marl/overview-marl' },
          items: [
            { type: 'doc', id: 'human-behavior-patterns/marl/values-marl', label: 'Values' },
          ],/home/doesburg/Projects/human-behavior-site/static/img/marl/display-1.jpg
        },
      ],
    },
    {
      type: 'category',
      label: 'Predator, Prey, Grass project',
      link: { type: 'doc', id: 'pred-prey-grass/overview-ppg' },  
      items: [
        {
          type: 'category',
          label: 'Ecosystem',
          link: { type: 'doc', id: 'pred-prey-grass/ecosystem-ppg' }, // Summary page
          items: [],
        },
      ],
    },
    {
      type: 'doc',
      id: 'to_do',
      label: 'To do',
    },

  ],
};
