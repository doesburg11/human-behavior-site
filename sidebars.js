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
          label: 'Predicting',
          link: { type: 'doc', id: 'human-behavior-patterns/predicting/overview-marl' },
          items: [
            { type: 'doc', id: 'human-behavior-patterns/predicting/overview-marl', label: 'Values' },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Multi Agent Reinforcement Learning',
      link: { type: 'doc', id: 'marl/overview-marl' },  
      items: [],
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
        {
          type: 'category',
          label: 'MARL used in PPG',
          link: { type: 'doc', id: 'pred-prey-grass/marl-ppg/overview-marl-ppg' },  
          items: [

            {
              type: 'category',
              label: 'Rewards in PPG',
              link: { type: 'doc', id: 'pred-prey-grass/marl-ppg/rewards' },
              items: [
                { type: 'doc', id: 'pred-prey-grass/marl-ppg/rewards-ppg/scaling' },
              ],
            },
            {
              type: 'category',
              label: 'Sequence in PPG',
              link: { type: 'doc', id: 'pred-prey-grass/marl-ppg/sequence-ppg' },
              items: [],
            },


          ],
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
