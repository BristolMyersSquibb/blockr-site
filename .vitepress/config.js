const base = '/'

module.exports = {
  base,
  title: 'blockr',
  description: 'A visual, no-code framework for R',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logos/logo-e4-light.svg` }]
  ],
  themeConfig: {
    logo: { light: '/logos/logo-e4-light.svg', dark: '/logos/logo-e4-dark.svg' },
    siteTitle: 'blockr',
    nav: [
      { text: 'Learn', link: '/learn/01-build-your-first-app' },
      { text: 'Docs', link: '/docs/concepts/01-reactivity' },
      { text: 'Videos', link: '/videos/getting-started' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Playground', link: 'https://blockr.cloud/app/empty' }
    ],
    sidebar: {
      '/learn/': [{
        text: 'Learn',
        items: [
          { text: 'Build your first app', link: '/learn/01-build-your-first-app' },
          { text: 'Build a dashboard', link: '/learn/02-build-a-dashboard' },
          { text: 'Create a custom block', link: '/learn/03-create-a-block' }
        ]
      }],
      '/docs/': [
        {
          text: 'Concepts',
          items: [
            { text: 'Reactivity', link: '/docs/concepts/01-reactivity' }
          ]
        },
        {
          text: 'Block Reference',
          items: [
            { text: 'Wrangling', link: '/docs/blocks/01-wrangling' },
            { text: 'Visualisation', link: '/docs/blocks/02-visualisation' },
            { text: 'I/O', link: '/docs/blocks/03-io' }
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
      ],
      '/videos/': [{
        text: 'Videos',
        items: [
          { text: 'Getting Started', link: '/videos/getting-started' },
          { text: 'Filtering and Selecting', link: '/videos/filtering-and-selecting' },
          { text: 'Transforming Data', link: '/videos/transforming-data' },
          { text: 'Joining Data', link: '/videos/joining-data' },
          { text: 'Visualising Data', link: '/videos/visualising-data' },
          { text: 'Exporting Data', link: '/videos/exporting-data' },
          { text: 'Creating Custom Blocks', link: '/videos/creating-blocks' },
          { text: 'Testing Blocks', link: '/videos/testing-blocks' }
        ]
      }]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/BristolMyersSquibb/blockr' }
    ],
    footer: {
      message: `Developed by <a href="https://cynkra.com" target="_blank"><img src="${base}logos/logo-cynkra.png" alt="cynkra" style="height:36px;vertical-align:middle"></a> and <a href="https://www.bms.com" target="_blank"><img src="${base}logos/logo-bms.png" alt="BMS" style="height:24px;vertical-align:middle"></a>`,
      copyright: ''
    },
  }
}
