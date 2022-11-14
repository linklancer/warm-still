import request from '@/utils/request'
// 逻辑删除菜单
export const LogiDeleteMenu = (id)=>request({
    url:`/warmstill/menus/Logicdelete/${id}`,
    method:'delete'
})
// 插入一条菜单
export const InsertOneMenuData = (data)=>request({
    url:'/warmstill/menus/inserOne',
    method:'post',
    data
})
//修改菜单
export const UpDateMenu = (data)=>request({
    url:'/warmstill/menus/updateMenu',
    method:'post',
    data
})