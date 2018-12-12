import Vue from 'vue'
import Router from 'vue-router'
import baseTop from './components/baseTop.vue'
import index from './views/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '/',
      component: baseTop,
      redirect: '/index',
      children:[
        {
          path: 'index',
          name: 'index',
          component: index
        },
        {
          path: 'listDetail',
          name: 'listDetail',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('./views/listDetail.vue')
        }
      ]   
    },
    {
      path:'/login',
      name:'login',
      component:() => import('./views/member/login.vue')
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component:() => import('./views/member/userCenter.vue')
    },
    {
      path:'/search',
      name:'search',
      component:() => import('./views/search.vue')
    },
    {
      path:'/agreement',
      name:'agreement',
      component:() => import('./views/member/agreement.vue')
    },
    {
      path:'/release',
      name:'release',
      component:() => import('./views/member/release.vue')
    },
    {
      path:'/identity',
      name:'identity',
      component:() => import('./views/member/identity.vue')
    },
    {
      path:'/about',
      name:'about',
      component:() => import('./views/about.vue')
    }
  ]
})
