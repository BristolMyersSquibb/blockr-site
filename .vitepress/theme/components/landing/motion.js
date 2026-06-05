// Tiny, dependency-free motion primitives for the landing page.
// - `reveal` directive: adds `.is-visible` when an element scrolls into view.
// - `useScrollProgress`: maps an element's scroll position to a 0..1 value.
// Everything is a no-op friendly with `prefers-reduced-motion`.

import { ref, onMounted, onBeforeUnmount } from 'vue'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// v-reveal / v-reveal="{ delay: 120 }"
export const reveal = {
  mounted(el, binding) {
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      el.classList.add('is-visible')
      return
    }
    const delay = (binding.value && binding.value.delay) || 0
    el.style.setProperty('--reveal-delay', `${delay}ms`)
    el.classList.add('reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(el)
    el.__revealObserver = io
  },
  unmounted(el) {
    if (el.__revealObserver) el.__revealObserver.disconnect()
  }
}

// Returns a reactive 0..1 progress for how far `target` has travelled through
// the viewport while it (or its tall parent) is pinned. Used by the sticky
// step sequence. rAF-throttled, cleaned up on unmount.
export function useScrollProgress(target) {
  const progress = ref(0)
  let ticking = false
  const reduced = prefersReducedMotion()

  const compute = () => {
    ticking = false
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight || document.documentElement.clientHeight
    // Distance scrolled through the element's scrollable travel.
    const total = rect.height - vh
    if (total <= 0) {
      progress.value = 0
      return
    }
    const scrolled = Math.min(Math.max(-rect.top, 0), total)
    progress.value = scrolled / total
  }

  const onScroll = () => {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(compute)
  }

  onMounted(() => {
    if (reduced) {
      progress.value = 1
      return
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    compute()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return { progress }
}

// Lazily flips to true the first time an element enters the viewport.
// Used to defer mounting heavy iframes.
export function useInView(target, { once = true } = {}) {
  const inView = ref(false)
  let io
  onMounted(() => {
    const el = target.value
    if (!el || typeof IntersectionObserver === 'undefined') {
      inView.value = true
      return
    }
    io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inView.value = true
            if (once) io.unobserve(el)
          } else if (!once) {
            inView.value = false
          }
        })
      },
      { rootMargin: '200px 0px' }
    )
    io.observe(el)
  })
  onBeforeUnmount(() => io && io.disconnect())
  return { inView }
}
