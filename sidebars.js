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
        { type: 'doc', id: 'human-behavior-patterns/brain-hbp', label: 'The Workings' },
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
  ],
};
