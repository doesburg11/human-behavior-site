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
      link: { type: 'doc', id: 'human-behavior-patterns-overview' },  
      items: [
        {
          type: 'category',
          label: 'Fundamentals',
          link: { type: 'doc', id: 'fundamentals' }, // Summary page
          items: [
            { type: 'doc', id: 'fundamentals/domains', label: 'Domains' },
          ],
        },
        { type: 'doc', id: 'brain', label: 'The Workings' },
      ],
    },
  ],
};
