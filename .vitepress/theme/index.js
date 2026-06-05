import DefaultTheme from 'vitepress/theme'
import './custom.css'
import VideoEmbed from './components/VideoEmbed.vue'
import CodeStepper from './components/CodeStepper.vue'
import Landing from './components/landing/Landing.vue'
import { reveal } from './components/landing/motion.js'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('VideoEmbed', VideoEmbed)
    app.component('CodeStepper', CodeStepper)
    app.component('Landing', Landing)
    app.directive('reveal', reveal)
  }
}
