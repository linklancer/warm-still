import {GetCharacter,GetMenuList,GetALLRoleList,AddNewRole,disableRole ,GetUserInfo,GetMenuListData,AddNewUserRole,DisUserInfo, LogiDeleteUser,UpDateRole} from '@/api/user'


const state ={
    CharListInfo:[],
    menulistInfo:[],
    AllDataRole:{},
    UserInfo:[],
    MdataInfo:[]
}
const mutations = {
// 存取角色列表
  GETCHARACTER(state,listinfo){
    state.CharListInfo = listinfo
  },
  //存取用户列表
  GETUSERINFO(state,userinfo){
    state.UserInfo = userinfo
  },
  //存取菜单列表
  GETMENULIST(state,menuinfo){
    state.menulistInfo =  menuinfo
  },
  //获取所有数据字典的角色集合
  GETALLROLEDATA(state,RdataInfo){
    state.AllDataRole = RdataInfo
  },
  // 存取所有菜单数据字典
  GETALLMENUDATA(state,MdataInfo){
    state.MdataInfo = MdataInfo
  }
}
const actions = {
//  获取角色列表
  async getcharacter(context,charInfo){
    const {current,keyword,size} = charInfo
    let result = await GetCharacter(current,keyword,size) 
    if(result.status == 200){
        context.commit('GETCHARACTER',result.data.result.list)
        return 'ok'
    }
  },
  // 获取用户列表
  async getUserInfo(context,userinfo){
    const {current,keyword,size} = userinfo
    let result = await GetUserInfo(current,keyword,size) 
    // console.log(result)
    if(result.status == 200){
        context.commit('GETUSERINFO',result.data.result.list)
        return 'ok'
    }
  },
  // 获取菜单
  async getMenuList(context,menuInfo){
    const {current,keyword,size} = menuInfo
    let result = await GetMenuList(current,keyword,size)
    if(result.status == 200){
      context.commit('GETMENULIST',result.data.result)
      return 'ok'
    }
      
  },
  //获取菜单数据字典
  async GetMenuDataList(context){
    let res = await GetMenuListData()
      if(res.status === 200){
          context.commit('GETALLMENUDATA',res.data.result)
          return 'ok'
      }
  },
  // 获取角色数据字典
  async getALLroleList(context){
    let result = await GetALLRoleList()
     if(result.status === 200){
      context.commit('GETALLROLEDATA',result.data.result)
      return 'ok'
     }
  },
  // 新增用户
  async Addnewrole(context,fromdata){
    const {birth,username,phone,password,relName,roleList,nickName,sex} = fromdata
    // console.log(fromdata)
    let res = await AddNewRole(birth,username,phone,password,relName,roleList,nickName,sex)
     if(res.status === 200){
      return 'ok'
     }
  },
  //禁用角色
  async disableSelecRole(context,roleIds){
    try {
      // console.log("收到的id",roleIds)
      let res = await disableRole(parseInt( roleIds))
    if(res.status === 200){
       return 'ok'
    }
    } catch (error) {
       alert(error)
    }
  },
  // 新增角色
  async ADDNewUserRole(context,userinfo){
    const {id,menuList,roleLabel,roleName} = userinfo
    let res = await  AddNewUserRole(id,menuList,roleLabel,roleName)
      if(res.status === 200){
        return 'ok'
      }
  },
  // 禁用账户
  async DisUserRote(context,idinfo){
     const {id ,status} = idinfo
      let res = await  DisUserInfo(id,status)
      console.log(res)
  },
  // 逻辑删除用户
  async LogiDeleteUser(context,userId){
      let res = await  LogiDeleteUser(userId)
       if(res.status === 200){
        return 'ok'
       }
  },
  //修改角色
  async upDateRole(context,roleinfo){
    const {id,menuList,roleLabel,roleName} = roleinfo
    let res = await UpDateRole(id,menuList,roleLabel,roleName)
      if(res.status === 200){
        return 'ok'
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