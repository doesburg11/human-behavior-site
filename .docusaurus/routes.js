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
    component: ComponentCreator('/', 'a93'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'c1d'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '80a'),
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
