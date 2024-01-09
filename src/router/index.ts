import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import Page404Layout from '../layouts/Page404Layout.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'
import UIRoute from '../pages/admin/ui/route'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'dashboard' },
  },


  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    beforeEnter: auth,
    children: [

      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/dashboard/Dashboard.vue'),
      },
      {
        name: 'chate',
        path: 'chate',
        component: () => import('../pages/admin/chate/index.vue'),
      },
      {
        name: 'ticket',
        path: 'ticket',
        component: () => import('../pages/admin/ticket/index.vue'),
      },
      {
        name: 'ticket-show',
        path: 'ticket-show/:id',
        component: () => import('../pages/admin/ticket/show.vue'),
      },
      {
        name: 'ticket-create',
        path: 'create',
        component: () => import('../pages/admin/ticket/create.vue'),
      },
      {
        name: 'tour',
        path: 'tour',
        component: () => import('../pages/admin/tour/create.vue'),
      },
      {
        name: 'Permissions',
        path: 'Permissions',
        component: () => import('../pages/admin/Permissions/index.vue'),
      },
      {
        name: 'statistics',
        path: 'users_management',
        // component: RouteViewComponent,
        children: [
          {
            name: 'users',
            path: 'users',
            component: () => import('../pages/admin/users.vue'),
          },
          {
            name: 'guides',
            path: 'guides',
            component: () => import('../pages/admin/guides/index.vue'),
          },
          {
            name: 'guides-show',
            path: 'guides-show/:id',
            component: () => import('../pages/admin/guides/show.vue'),
          },
          {
            name: 'drivers-show',
            path: 'drivers-show/:id',
            component: () => import('../pages/admin/guides/show.vue'),
          },
          {
            name: 'guide',
            path: 'guide',
            component: () => import('../pages/admin/guide/index.vue'),
          },
          {
            name: 'tourist',
            path: 'tourist',
            component: () => import('../pages/admin/torist/index.vue'),
          },
          {
            name: 'tourist-show',
            path: 'tourist-show/:id',
            component: () => import('../pages/admin/torist/show.vue'),
          },
        ],
      },


      UIRoute,
    ],
  },

  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    path: '/404',
    component: Page404Layout,
    children: [
      {
        name: 'not-found-advanced',
        path: 'not-found-advanced',
        component: () => import('../pages/404-pages/VaPageNotFoundSearch.vue'),
      },
      {
        name: 'not-found-simple',
        path: 'not-found-simple',
        component: () => import('../pages/404-pages/VaPageNotFoundSimple.vue'),
      },
      {
        name: 'not-found-custom',
        path: 'not-found-custom',
        component: () => import('../pages/404-pages/VaPageNotFoundCustom.vue'),
      },
      {
        name: 'not-found-large-text',
        path: '/pages/not-found-large-text',
        component: () => import('../pages/404-pages/VaPageNotFoundLargeText.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      document.querySelector('.app-layout__page')?.scrollTo(0, 0)
    }
  },
  routes,
})

function auth(to: any, from: any, next: any) {
  if (!localStorage.getItem('token')) {
    return next({ name: 'login' })
  }

  next()
}

export default router
