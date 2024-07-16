import { createRouter, createWebHistory } from 'vue-router'
import Pedidos from '../views/Pedidos.vue'
import Vendas from '../views/Vendas.vue'
import Clientes from '../views/Clientes.vue'

const routes = [
  {
    path: '/',
    name: 'vendas',
    component: Vendas
  },
  {
    path: '/estoque',
    name: 'estoque',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Estoque.vue')
  },
  {
    path: '/clientes',
    name: 'Clientes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Clientes.vue')
  },
  {
    path: '/pedidos',
    name: 'pedidos',
    component: Pedidos
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})





export default router
