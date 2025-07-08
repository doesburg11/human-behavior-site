import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '2c2'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'c6b'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'd04'),
            routes: [
              {
                path: '/brain',
                component: ComponentCreator('/brain', '978'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fundamentals',
                component: ComponentCreator('/fundamentals', '8fd'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/fundamentals/domains',
                component: ComponentCreator('/fundamentals/domains', 'c3e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/human-behavior-patterns-overview',
                component: ComponentCreator('/human-behavior-patterns-overview', '3e1'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pred-prey-grass-project',
                component: ComponentCreator('/pred-prey-grass-project', '580'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'efb'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
