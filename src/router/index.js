import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateRoom from '../views/CreateRoom'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/room/create'
  },
  {
    path: '/room/create',
    name: 'CreateRoom',
    component: CreateRoom
  },
  {
    path: '/room/:id',
    name: 'Room',
    component: Room
  }
]

const router = new VueRouter({
  routes
})

export default router
