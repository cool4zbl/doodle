// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Binliu Zhang, Senior Software Engineer',
  tagline: 'Software engineer interested in personal growth and tech trends. Open-source enthusiast.',
  url: 'https://zhangbinliu.me/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'cool4zbl', // Usually your GitHub org/user name.
  projectName: 'doodles', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
  },
  plugins: [
    'docusaurus-plugin-sass',
     [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 85,
        max: 2000,
        min: 500,
        steps: 4,
        disableInDev: false,
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/cool4zbl/doodles/tree/main/',
        },
        blog: {
          showReadingTime: true,
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/cool4zbl/doodles/tree/main/',
          feedOptions: {
            type: 'all',
            copyright: `Copyright © 2014 - ${new Date().getFullYear()} Binliu Zhang`
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
       metadata: [
        {
          name: "description",
          content:
            "I am senior software developer interested in technology and gadgets. Go / JavaScript / open-source enthusiast.",
        },
        {
          name: "keywords",
          content:
            "fullstack,backend,developer,engineer,go,golang,javascript,node,grpc,rest,react,reactjs,cloud,cloud-native,open-source,gophers,distributed-systems,algorithms,data-structures",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Binliu Zhang',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
          href: '/'
        },
        items: [
          {
            type: 'doc',
            docId: 'dsa',
            position: 'left',
            label: 'DSA',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/cool4zbl/doodles',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Algorithms',
                to: '/docs/dsa',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: "Connect",
            items: [
              {
                label: "Email me",
                href: "mailto:binliu.zhang@gmail.com",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/binliu-zhang",
              },
              {
                label: 'GitHub',
                href: 'https://github.com/cool4zbl',
              },
            ],
          },
        ],
        copyright: `Copyright © 2014 - ${new Date().getFullYear()} Binliu Zhang`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
