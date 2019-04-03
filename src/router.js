import Vue from 'vue'
import Router from 'vue-router'
import layout from './views/layout'
import index from './views'

Vue.use(Router)

export default new Router({
  // mode:"history",
  routes: [
    {
      path: '/',
      name: '/',
      component: layout,
      redirect: '/index',
      children:[
        {
          path: 'index',
          name: 'index',
          component: index
        },
        {
          path: 'listDetail/:classify/:id',
          name: 'listDetail',
          component: () => import('./views/listDetail.vue')
        },
        {
          path:'download',
          name:'download',
          component:() => import('./views/download.vue')
        },
      ]   
    },
    {
      path:'/login',
      name:'login',
      component:() => import('./views/member/login.vue')
    },
    {
      path: '/user',
      name: 'layoutMember',
      redirect: '/member/index',
      component: () => import('./views/layout/member'),
      children:[
        {
          path: 'index',
          name: 'memberWrap',
          component: () => import('./views/member'),
          meta: {notKeepAlive: true},
          children: [
            {
              path: 'publish',
              name: 'publish',
              component: () => import('./views/member/publish'),
            },
            {
              path: 'focus',
              name: 'focus',
              component: () => import('./views/member/focus'),
            },
            {
              path: 'history',
              name: 'history',
              component: () => import('./views/member/history'),
            },
          ]
        },
        {
          path: 'edit',
          name: 'edit',
          component: () => import('./views/member'),
          meta: {notKeepAlive: true}
        },
        {
          path:'identity',
          name:'identity',
          component:() => import('./views/member/identity.vue')
        },
        {
          path:'identityPerson',
          name:'identityPerson',
          component:() => import('./views/member/identityPerson.vue')
        },
        {
          path:'identityEenterprise',
          name:'identityEenterprise',
          component:() => import('./views/member/identityEenterprise.vue')
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
          path:'/about',
          name:'about',
          component:() => import('./views/about.vue')
        },
        {
          path:'/privacy',
          name:'privacy',
          component:() => import('./views/privacy.vue')
        },
        {
          path: '/answer',
          name: 'answer',
          component:() => import('./views/member/answer.vue')
        },
      ]
    },
    // 第三方登录回调页，路由不可更改
    {
      path: '/member',
      name: 'member',
      component:() => import('./views/member/member.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
