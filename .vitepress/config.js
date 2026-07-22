const base = '/'

module.exports = {
  base,
  title: 'blockr',
  description: 'A visual, no-code framework for R',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logos/logo-e4-light.svg` }],
    ['script', { async: '', src: 'https://plausible.io/js/pa-nxk7_b0p2i9NaXsd3QXlJ.js' }],
    ['script', {}, `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`]
  ],
  themeConfig: {
    logo: { light: '/logos/logo-e4-light.svg', dark: '/logos/logo-e4-dark.svg' },
    siteTitle: 'blockr',
    nav: [
      { text: 'Examples', link: '/examples/' },
      { text: 'Install', link: '/install' },
      { text: 'Learn', link: '/learn/01-build-your-first-app' },
      { text: 'Docs', link: '/docs/concepts/01-reactivity' },
      { text: 'Packages', link: '/packages/' },
      { text: 'Playground', link: 'https://blockr.cloud/app/empty' }
    ],
    editLink: {
      pattern: 'https://github.com/BristolMyersSquibb/blockr-site/edit/main/:path',
      text: 'Edit this page on GitHub'
    },
    sidebar: {
      '/learn/': [{
        text: 'Learn',
        items: [
          { text: 'Build your first app', link: '/learn/01-build-your-first-app' },
          { text: 'Build a dashboard', link: '/learn/02-build-a-dashboard' },
          { text: 'Work with many tables', link: '/learn/03-many-tables' },
          { text: 'Custom code', link: '/learn/04-custom-code' },
          { text: 'Create a custom block', link: '/learn/05-create-a-block' }
        ]
      }],
      '/docs/': [
        {
          text: 'Concepts',
          items: [
            { text: 'User, Builder, Developer', link: '/docs/concepts/02-roles' },
            { text: 'Reactivity', link: '/docs/concepts/01-reactivity' }
          ]
        },
        {
          text: 'Block Reference',
          items: [
            { text: 'blockr.dplyr', link: '/docs/blocks/blockr.dplyr' },
            { text: 'blockr.ggplot', link: '/docs/blocks/blockr.ggplot' },
            { text: 'blockr.viz', link: '/docs/blocks/blockr.viz' },
            { text: 'blockr.dm', link: '/docs/blocks/blockr.dm' },
            { text: 'blockr.io', link: '/docs/blocks/blockr.io' },
            { text: 'blockr.extra', link: '/docs/blocks/blockr.extra' },
            { text: 'blockr.core', link: '/docs/blocks/blockr.core' }
          ]
        },
        {
          text: 'Developer',
          items: [
            { text: 'Create a block', link: '/docs/dev/create-block' },
            { text: 'Extend blockr', link: '/docs/dev/extend-blockr' },
            { text: 'Testing blocks', link: '/docs/dev/testing-blocks' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BristolMyersSquibb/blockr' }
    ],
    footer: {
      message: `Developed by <a href="https://cynkra.com" target="_blank"><img src="${base}logos/logo-cynkra.png" alt="cynkra" style="height:36px;vertical-align:middle"></a> and <a href="https://www.bms.com" target="_blank"><img src="${base}logos/logo-bms.png" alt="BMS" style="height:24px;vertical-align:middle"></a>`,
      copyright: `Free and open source, released under <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GPL-3.0</a>. <a href="https://github.com/BristolMyersSquibb/blockr" target="_blank">Source on GitHub</a>.`
    },
  }
}
