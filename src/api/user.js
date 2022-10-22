
import request from '@/utils/request'
// 登录接口
export function login(code, password, phone, uuid) {
  return request({
    url: '/warmstill/user/user-tokens',
    method: 'post',
    data: { code: code, password: password, phone: phone, uuid: uuid }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
// 图片验证接口
export const getImgCode = (uuid) => request({
  url: '/warmstill/user/getLoginImageCode',
  method: 'get',
  responseType: 'blob',
  params: { uuid: uuid }

})
// 校验验证码
export const Vercode = (code, uuid) => request({
  url: '/warmstill/user/verifyLoginImageCode',
  method: 'post',
  data: { code: code, uuid: uuid }
})
