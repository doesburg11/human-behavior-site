// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Human Behavior Patterns',
  tagline: 'Exploring the roots of human actions',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://doesburg11.github.io',
  baseUrl: '/',

  organizationName: 'doesburg11', 
  projectName: 'doesburg11.github.io', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/doesburg11/doesburg11.github.io/edit/main/',
        },
        // BLOG REMOVED — no blog
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'Human Behavior Patterns',
      logo: {
        alt: 'Behavior Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Overview',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'About',
          items: [
            { 
              label: 'GitHub',
              href: 'https://github.com/doesburg11/PredPreyGrass',
            },
            { 
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/peter-van-doesburg/',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'RLlib: Industry-Grade, Scalable Reinforcement Learning',
              href: 'https://docs.ray.io/en/master/rllib/index.html#rllib-industry-grade-scalable-reinforcement-learning',
            },
            {
              label: 'Multi-Agent Reinforcement Learning: Foundations and Modern Approaches.',
              href: 'https://www.marl-book.com/download/marl-book.pdf',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Peter van Doesburg.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;

