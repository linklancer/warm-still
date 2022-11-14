import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/MyLogin/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/manange',
    component: Layout,
    redirect: '/manage/register',
    name: 'Manage',
    meta: { title: '管理平台', icon: 'manage' },
    children: [
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/manage/register'),
        meta: { title: '学生注册审批', icon: 'register' }
      },
      {
        path: 'sinformation',
        name: 'Sinformation',
        component: () => import('@/views/manage/sinformation'),
        meta: { title: '学生信息管理', icon: 'sinformation' }
      },
      {
        path: 'phydata',
        name: 'Phydata',
        component: () => import('@/views/manage/phydata'),
        meta: { title: '心理数据管理', icon: 'phydata' }
      },
      {
        path: 'activity',
        name: 'Tree',
        component: () => import('@/views/manage/activity'),
        meta: { title: '特色活动管理', icon: 'activity' }
      }

    ]
  },
  {
    path: '/role',
    component: Layout,
    redirect: '/role/charactar',
    name: 'Role',
    meta: { title: '权限管理', icon: 'card' },
    children: [
      {
        path: 'charactar',
        component: () => import('@/views/role/charactar'),
        name: 'Charactar',
        meta: { title: '用户管理', icon: 'approve' }
      },
      {
        path: 'myrole',
        component: () => import('@/views/role/myRole'),
        name: 'myRole',
        meta: { title: '角色管理', icon: 'approve' }
      },
      {
        path: 'menu',
        component: () => import('@/views/role/menu'),
        name: 'Menu',
        meta: { title: '菜单管理', icon: 'approve' }
      },
      {
        path: 'resource',
        component: () => import('@/views/role/resource'),
        name: 'Resource',
        meta: { title: '资源管理', icon: 'approve' }
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    redirect: '/card/approve',
    name: 'Example',
    meta: { title: '身份认证管理', icon: 'card' },
    children: [
      {
        path: 'approve',
        component: () => import('@/views/card/approve/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '身份认证', icon: 'approve' }
      },
      {
        path: 'accredit',
        component: () => import('@/views/card/accredict/index'),
        name: 'Menu2',
        meta: { title: '身份授权', icon: 'accredit' }
      }
    ]
  },

  {
    path: '/show',
    component: Layout,
    redirect: '/show/menu1',
    name: 'Show',
    meta: {
      title: '展示平台',
      icon: 'show'
    },
    children: [
      {
        path: 'datavis',
        component: () => import('@/views/show/datavis/index'), // Parent router-view
        name: 'Datavis',
        meta: { title: '统计数据可视化', icon: 'datavis' }
      },
      {
        path: 'issue',
        component: () => import('@/views/show/issue/index'),
        name: 'issue',
        meta: { title: '心理活动与发布', icon: 'issue' }
      },
      {
        path: 'warn',
        component: () => import('@/views/show/warn/index'),
        name: 'Warn',
        meta: { title: '心理异常预警与研判', icon: 'warn' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
// 任意路由
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
