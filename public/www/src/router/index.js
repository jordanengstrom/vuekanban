import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Board from '@/components/Board'
import List from '@/components/Lists'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/board/:boardId',
      name: 'Board',
      props: true,
      component: Board
    },
    {
      path: '/board/:boardId/lists/:listId',
      name: 'List',
      props: true,
      component: List
    }

  ]
})
