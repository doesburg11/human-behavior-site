import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
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
