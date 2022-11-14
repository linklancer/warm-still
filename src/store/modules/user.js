import { login, Vercode, logout, GetALLDetailInfo, ChangeAttar, UpdateUserInfo } from '@/api/user'
import { getUserInfo, setUserInfo, removeuserinfo, setImg, getimg } from '@/utils/auth'
// import { resetRouter, anyRoutes, constantRoutes, asyncRoutes } from '@/router'
const getDefaultState = () => {
  return {
    // token: getToken(),
    name: '',
    // avatar: '',
    success: '', // 验证标识符
    userinfo: getUserInfo() || {},
    DetailUserInfo: {},
    imgurl: getimg() || require("@/assets/images/logo.gif")
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // // 验证验证码
  // VERCODE: (state, success) => {
  //   state.success = success
  //   // console.log('验证成功', state.success)
  // },
  // 设置用户信息
  SETUSERINFO(state, userinfo) {
    state.userinfo = userinfo
  },
  //设置用户所有信息
  GETALLUSERINFO(state, info) {
    state.DetailUserInfo = info
  },
  //保存头像
  ATTAINATTAR(state, imgurl) {
    state.imgurl = imgurl
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
  // async VerCode(context, codeinfo) {
  //   try {
  //     const { code, uuid } = codeinfo
  //     const result = await Vercode(code, uuid)
  //     if (result.status == 200) {
  //       context.commit('VERCODE', result.data.success)
  //     }
  //   } catch (error) {
  //     alert(error)
  //   }
  // },
  // 登录操作
  async Login(context, userInfo) {
    try {
      const { phone, password, code, uuid } = userInfo
      const codeinfo = { code, uuid }
      // 派发验证请求
      // context.dispatch('VerCode', codeinfo)
      const res = await login(code, password, phone, uuid)
      // console.log(res)
      if (res.status == 200) {
        const newres = res.data.result
        // 保存用户信息
        context.commit('SETUSERINFO', newres)
        setUserInfo(newres)
      }
      return 'ok'
    } catch (error) {
      alert(error)
    }
  },

  // 退出操作
  async logout({ commit, state }) {
    // 转化id类型为number
    const id = parseInt(state.userinfo.userId)
    let result = await logout(id)
    if (result.status === 200) {
      removeuserinfo()
      // resetRouter()
    }
  },

  // 退出登录时，要清除username
  resetUserName({ commit }) {
    return new Promise(resolve => {
      removeuserinfo()// must remove  token  first
      // commit('RESET_STATE')
      resolve()
    })
  },
  // 获取用户基本信息
  async GetAllUserInfo(context) {
    let res = await GetALLDetailInfo()
    if (res.status === 200) {
      context.commit('GETALLUSERINFO', res.data.result)
    }
  },
  //修改头像
  async updatAttr(context, file) {
    let res = await ChangeAttar(file)
    if (res.status === 200) {
      context.commit('ATTAINATTAR', res.data.result)
      setImg(res.data.result)
      return 'ok'
    }
  },
  //修改个人信息
  async UpDateUserinfo(context, uinfo) {
    const { birth, id, nickName, photoPath, sex, userId } = uinfo
    let res = await UpdateUserInfo({ birth, id, nickName, photoPath, sex, userId })
    if (res.status === 200) {
      return 'ok'
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

