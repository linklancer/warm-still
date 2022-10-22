import { getImgCode } from '@/api/user'
import { SolveBlob } from '@/utils/blob'
const state = {
  codeurl: '' // 图形验证码
}
const mutations = {
  // 获取图形验证码
  GETIMGCODE(state, codeurl) {
    state.codeurl = codeurl
  }
}
const actions = {
  // 获取图形验证码
  async  GetImgCode(context, uuid) {
    try {
      const res = await getImgCode(uuid)
      if (res.status == 200) {
        // SolveBlob是封装后的函数
        const code = SolveBlob(res.data)
        // console.log(code)
        context.commit('GETIMGCODE', code)
      }
    } catch (error) {
      alert(error)
    }
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
