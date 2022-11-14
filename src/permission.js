import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {  getUserInfo } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // 设置滚动条
  NProgress.start()

  // 设置路由标题
  document.title = getPageTitle(to.meta.title)

  // 取出用户信息
  const hasuserinfo = getUserInfo() 
  //如果本地用户名和用户id都存在，放行
  if ( hasuserinfo) {
    if (to.path === '/login') {
      // 如果存在用户姓名和id，则就跳转到首页,放行
      next({ path: '/' })
      NProgress.done()
    } else {
      //否则去vuex里面寻找id
      const hasGetUserId = store.getters.userinfo.userId
      if (hasGetUserId) {
        next()
      } else {
        //如果没有.则
        try {
          next()
        } catch (error) {
         //移除用户姓名与id
          await store.dispatch('user/resetUserName')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token的情况下*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
