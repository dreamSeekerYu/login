import pullNewHomePage from '../views/pull_news/index.vue'
import cashHomePage from '../views/cash/index.vue'

export default [
  {
    path: '/pullnew/home',
    name: 'pullnew',
    component: pullNewHomePage
  },
  {
    path: '/cash/home',
    name: 'cashHomePage',
    component: cashHomePage
  }
]
