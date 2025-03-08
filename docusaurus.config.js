// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { description, keywords } = require("./meta.json");
const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "Binliu's Doodles",
    tagline:
        "Open-source enthusiast, interested in personal growth and tech trends.",
    url: "https://zhangbinliu.me/",
    baseUrl: "/",
    onBrokenLinks: "warn",
    onBrokenMarkdownLinks: "warn",
    favicon: "img/favicon.ico",

    organizationName: "cool4zbl",
    projectName: "doodle",

    i18n: {
        defaultLocale: "en",
        locales: ["en", "zh"],
        localeConfigs: {
            zh: {
                htmlLang: "zh-Hans",
            },
        },
    },

    plugins: [
        [
            "vercel-analytics",
            {
                debug: true,
                mode: "auto",
            },
        ],
        "docusaurus-plugin-sass",
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
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: require.resolve("./sidebars.js"),
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/cool4zbl/doodle/tree/main/",
                    showLastUpdateTime: true,
                },
                blog: {
                    showReadingTime: true,
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/cool4zbl/doodle/tree/main/",
                    blogSidebarCount: "ALL",
                    blogSidebarTitle: "Doodles",
                    feedOptions: {
                        type: "all",
                        copyright: `Copyright © 2014 - ${new Date().getFullYear()} Binliu Zhang`,
                    },
                    showLastUpdateTime: true,
                },
                theme: {
                    customCss: require.resolve("./src/css/custom.scss"),
                },
                gtag: {
                    trackingID: "G-4KXY97F1RE",
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            docs: {
                sidebar: {},
            },
            blog: {
                sidebar: {},
            },

            metadata: [
                {
                    name: "description",
                    content: description,
                },
                {
                    name: "keywords",
                    content: keywords.join(","),
                },
                {
                    name: "twitter:card",
                    content: "summary",
                },
            ],
            colorMode: {
                defaultMode: "dark",
                disableSwitch: false,
                respectPrefersColorScheme: false,
            },
            navbar: {
                title: "Binliu Zhang",
                // logo: {
                //   alt: 'My Site Logo',
                //   src: 'img/logo.png',
                //   href: '/'
                // },
                items: [
                    {
                        type: "docSidebar",
                        sidebarId: "docs",
                        position: "left",
                        label: "Learning",
                    },
                    {
                        to: "/blog",
                        label: "Blog",
                        position: "left",
                    },
                    // {
                    //     to: "/work",
                    //     docId: "Work",
                    //     position: "left",
                    //     label: "Work",
                    // },
                    {
                        to: "/bookshelf",
                        docId: "bookshelf",
                        position: "left",
                        label: "Bookshelf",
                    },
                    {
                        to: "/motivation",
                        docId: "motivation",
                        position: "left",
                        label: "Motivation",
                    },
                    {
                        to: "/about",
                        docId: "about",
                        position: "left",
                        label: "About",
                    },
                    // Right
                    {
                        type: "localeDropdown",
                        position: "right",
                    },
                    {
                        href: "https://github.com/cool4zbl/doodle",
                        position: "right",
                        className: "header-github-link",
                        "aria-label": "GitHub repository",
                    },
                ],
            },
            footer: {
                style: "light",
                links: [
                    {
                        title: "Discover",
                        items: [
                            {
                                label: "Learning",
                                to: "/docs",
                            },
                            {
                                label: "Blog",
                                to: "/blog",
                            },
                            {
                                label: "Bookshelf",
                                to: "/bookshelf",
                            },
                        ],
                    },
                    {
                        title: "Connect",
                        items: [
                            {
                                label: "LinkedIn",
                                href: "https://www.linkedin.com/in/binliu-zhang",
                            },
                            {
                                label: "GitHub",
                                href: "https://github.com/cool4zbl",
                            },
                            {
                                label: "Email me",
                                href: "mailto:binliu.zhang@gmail.com",
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
}

module.exports = config;
