import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import UserManagementPage from '@/views/user-management/User.vue'
import inventarisasiGrk from '@/router/inventarisasi-grk.js'
import MasterRouter from '@/router/master.js'
import LoginPage from '@/views/auth/login.vue'

const routes = [
  ...inventarisasiGrk,
  ...MasterRouter,
  {
    path: '/user-management',
    name: 'UserManagement',
    component: UserManagementPage,
    meta: {
      breadcrumb: ['User Management'],
      activeBreadcrumb: 'User Management',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {},
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
