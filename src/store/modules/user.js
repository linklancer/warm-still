import { login, Vercode } from '@/api/user'
import { getToken, setToken, removeToken, setUserInfo } from '@/utils/auth'
// import { resetRouter, anyRoutes, constantRoutes, asyncRoutes } from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    // name: '',
    // avatar: '',
    success: '', // 验证标识符
    userinfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // SET_NAME: (state, name) => {
  //   state.name = name
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar
  // },
  // 验证验证码
  VERCODE: (state, success) => {
    state.success = success
    // console.log('验证成功', state.success)
  },
  // 设置用户信息
  SETUSERINFO(state, userinfo) {
    state.userinfo = userinfo
  }
}
// 定义一个函数：两个数组进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  // 过滤出当前用户【超级管理|普通员工】需要展示的异步路由
  return asyncRoutes.filter(item => {
    // 数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1
    if (routes.indexOf(item.name) != -1) {
      // 递归:别忘记还有2、3、4、5、6级路由
      if (item.children && item.children.length) {
        item.children = computedAsyncRoutes(item.children, routes)
      }
      return true
    }
  })
}
const actions = {
  // 校验验证码
  async VerCode(context, codeinfo) {
    try {
      const { code, uuid } = codeinfo
      const result = await Vercode(code, uuid)
      if (result.status == 200) {
        context.commit('VERCODE', result.data.success)
      }
    } catch (error) {
      alert(error)
    }
  },
  // 登录操作
  async Login(context, userInfo) {
    try {
      const { phone, password, code, uuid } = userInfo
      const codeinfo = { code, uuid }
      // 派发验证请求
      context.dispatch('VerCode', codeinfo)
      const res = await login(code, password, phone, uuid)
      if (res.status == 200) {
        const newres = res.data.result
        // 保存用户信息
        context.commit('SETUSERINFO', newres)
        setUserInfo(newres)
        // 保存token
        context.commit('SET_TOKEN', newres.accessToken)
        setToken(newres.accessToken)
      }
      return 'ok'
    } catch (error) {
      alert(error)
    }
  },

  // 得到用户信息
  // async getInfo({ commit, state }) {
  //   let result = await getInfo(state.token)
  //   const { data } = result
  //   if (!data) {
  //     return Promise.reject(new Error('Verification failed, please Login again.'))
  //   }
  //   const { name, avatar } = data
  //   commit('SET_NAME', name)
  //   commit('SET_AVATAR', avatar)
  // },

  // 退出操作
  // async logout({ commit, state }) {
  //   let result = await logout(state.token)
  //   console.log(result)
  //   if (result.code === 20000) {
  //     removeToken()
  //     resetRouter()
  //     commit('RESET_STATE')
  //   }
  // },

  // 退出登录时，要清除cooike
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

