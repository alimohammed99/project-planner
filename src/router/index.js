import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddProject from '../views/AddProject.vue'
import EditProject from '../views/EditProject.vue'


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
  {
    path: '/Projects/:xy',
    // route parameter
    // This enables me to navigate to the specific Project I wanna edit using the Project id.
    // "xy" stands for the Project id.
    name: 'EditProject',
    component: EditProject,
    props: true
    // Now the EditProject page will be able to accept properties from anywhere.
    // This is because I want to send the route parameter(id) from the Projects page to this Edit page as props.
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
