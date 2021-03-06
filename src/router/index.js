import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: '/index',
  component: () => import('../views/home/index.vue'),
},
{
  path: '/home',
  name: 'Home',
  component: () => import('../views/home/index.vue'),
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router