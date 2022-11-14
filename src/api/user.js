
import request from '@/utils/request'
// 登录接口
export function login(code, password, phone, uuid) {
  return request({
    url: '/warmstill/user/user-tokens',
    method: 'post',
    data: { code: code, password: password, phone: phone, uuid: uuid }
  })
}
// 退出登录

export const logout = (userId) => request({
  url:`/warmstill/user/logoutUser/${userId}`,
  method:'get',
 
})
  
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
// 获取用户及角色列表
export const GetCharacter = (current,keyword,size)=>request({
  url:'/warmstill/roles/listRole',
  method:'get',
  params:{current: current,keyword: keyword,size: size}
})
//获取用户列表
export const GetUserInfo =(current,keyword,size)=>request({
  url:'/warmstill/user/listRoles',
  method:'get',
  params:{current: current,keyword: keyword,size: size}

})
// 获取菜单列表
export const GetMenuList = (current,keyword,size)=>request({
  url:'/warmstill/menus/listMenuOption',
  method:'get',
  params:{current: current,keyword: keyword,size: size}
})
// 新增用户
export const AddNewRole = (birth,username,phone,password,relName,roleList,nickName,sex)=>request({
  url:'/warmstill/user/insertUser',
  method:'post',
  data:{
    birth,
    username,
    phone,
    password,
    relName,
    roleList,
    nickName,
    sex,
    depId:1,
    id:1,
    infoId:1
  }
})
//获取所有角色列表数据字典
export const GetALLRoleList = ()=>request({
  url:'/roleMap',
  method:'get'
})
//获取菜单的数据字典
export const GetMenuListData = ()=>request({
  url:'/menuMap',
  method:'get'
})
// 禁用角色
export const disableRole = (roleId)=>request({
  url:'/warmstill/roles/deleteRole',
  method:'put',
  params:{roleId:roleId}
})
//得到所有的学生数据
export const GetAllStudentData = (current,keyword,size)=>request({
  url:'/warmstill/student/list',
  method:'post',
  data:{current:current,keyword:keyword,size:size}
})
// 新增角色
export const AddNewUserRole = (id,menuList,roleLabel,roleName)=>request({
  url:'/warmstill/roles/insertRole',
  method:'post',
  data:{id:id,menuList:menuList,roleLabel:roleLabel,roleName:roleName,resourceList:[]}
})
//禁用账户
export  const  DisUserInfo = (userId,status)=>request({
  url:`/warmstill/user/foribddenUser/${userId},${status}`,
  method:'get'
})
//  逻辑删除用户
export  const  LogiDeleteUser = (userId)=>request({
  url:`/warmstill/user/deleteUser/${userId}`,
  method:'put'
}) 
//插入学生数据
export  const AddStudentData = (data)=>request({
  url:'/warmstill/student/addOne',
  method:'post',
  data
})
//修改角色
export const UpDateRole = (id,menuList,roleLabel,roleName)=>request({
  url:'/warmstill/roles/updateRoleMenu',
  method:'post',
  data:{id:id,menuList:menuList,roleLabel:roleLabel,roleName:roleName,resourceList:[],isDisable:0}
})
//获取用户基本信息
export const GetALLDetailInfo =()=>request({
  url:'/warmstill/userInfos/getUserInfo',
  method:'get'
})
//修改头像
export const ChangeAttar =(file)=>request({
  url:'/warmstill/userInfos/updatePhoto',
  method:'post',
  data:file,
 
})
//用户修改自己的信息
export const UpdateUserInfo =(data)=>request({
  url:'/warmstill/userInfos/updateuserInfo',
  method:'post',
  data
})
