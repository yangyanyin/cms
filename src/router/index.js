// import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from "vue-router"

// const home = () => import('../page/home')
// const about = () => import('../page/about')

const home = () =>import('../page/home')
const about = () =>import('../page/about')


const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/about',
    name: 'about',
    component: about
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})