// 通过统一配置的getter得到数据
// 同级目录modules是为了区分不同模块的store仓库
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userinfo: state => state.user.userinfo
}
export default getters
