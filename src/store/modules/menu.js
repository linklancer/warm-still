import {LogiDeleteMenu,InsertOneMenuData,UpDateMenu} from "@/api/menu"
const state ={}
const mutations = {}
const actions = {
//  逻辑删除菜单
async DeleteMenu(context,id){
    const res = await LogiDeleteMenu(id)
   if(res.status === 200){
    return 'ok'
   }
},
//插入菜单操作
async InserMenu(context,menuinfo){
    const {  name,parentId,path} = menuinfo
    const isHidden = 0,redirect='/login',title = name
    const res = await InsertOneMenuData({isHidden,name,parentId,redirect,path,title})
    if(res.status === 200){
        return 'ok'
    }
},
//修改菜单
async UpSeletMenu(context,menuList){
    const { name,parentId,path,id} = menuList
    const isHidden = 0,redirect='/login',title = name
    const res = await UpDateMenu({isHidden,name,parentId,redirect,path,title,id})
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