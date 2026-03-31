import DefaultTheme from 'vitepress/theme'
import './custom.css'
import VideoEmbed from './components/VideoEmbed.vue'
import CodeStepper from './components/CodeStepper.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VideoEmbed', VideoEmbed)
    app.component('CodeStepper', CodeStepper)
  }
}
