// import { defineAsyncComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const home = () =>import('../views/Home')
const Danyangdan = () =>import('../views/Danyangdan')
const DanyangdanList = () =>import('../views/DanyangdanList')
const UserCenter = () =>import('../views/UserCenter')

const routes = [
  {
    path: '/',
    name: '首页',
    component: home
  },
  {
    path: '/danyangdan',
    name: '打样单',
    component: Danyangdan
  },
  {
    path: '/danyangdan-list',
    name: '打样单列表',
    component: DanyangdanList
  },
  {
    path: '/user-center',
    name: '个人中心',
    component: UserCenter
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})