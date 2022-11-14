// import Cookies from 'js-cookie'

// 得到token
// export function getToken() {
//   return localStorage.getItem('userKey')
// }
// 通过tokenkey设置token
// export function setToken(username) {
//   // alert(token)
//   return localStorage.setItem('userKey', username)
// }
// 移除token
// export function removeToken() {
//   return localStorage.removeItem('userKey')
// }
// 设置userinfo
export const setUserInfo = (userinfo) => {
  return localStorage.setItem('userinfo', JSON.stringify(userinfo))
}
// 取出userinfo
export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem('userinfo'))
}
// 移除userinfo
export const removeuserinfo = () => {
  return localStorage.removeItem('userinfo')
}
export const setImg = (imgurl)=>{
  return localStorage.setItem('IMG',imgurl)
}
export const getimg = ()=>{
  return localStorage.getItem('IMG')
}
