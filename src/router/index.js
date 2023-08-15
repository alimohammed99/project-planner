import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


// This is to display the AddProject page. This is the Lazy loading approach.
function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    // Displaying the AddProject page using Lazy loading approach.
    path: '/add',
    name: 'AddProject',
    component: lazyLoad('AddProject')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
