import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  {
    path: '/:id',
    name: 'Home',
    component: Home,
    props: true, // Permite que o parâmetro seja passado como uma prop para o componente
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
