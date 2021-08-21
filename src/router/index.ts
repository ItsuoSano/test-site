import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Home from '../pages/Home.vue'
import MessageView from '../pages/MessageView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/messages',
    name: 'messages',
    component: MessageView
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
