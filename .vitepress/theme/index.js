import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import VideoEmbed from './components/VideoEmbed.vue'
import DemoPlayer from './components/DemoPlayer.vue'

export default {
  extends: DefaultTheme,
  // the home page's demo loop sits between the hero and the features
  Layout: () => h(DefaultTheme.Layout, null, {
    'home-hero-after': () => h(DemoPlayer)
  }),
  enhanceApp({ app }) {
    app.component('VideoEmbed', VideoEmbed)
  }
}
