import { createRouter, createWebHistory } from 'vue-router'
import Pedidos from '../views/Pedidos.vue'

const routes = [
  {
    path: '/',
    name: 'Pedidos',
    component: Pedidos
  },
  {
    path: '/estoque',
    name: 'estoque',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Estoque.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
