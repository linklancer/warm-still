import {GetAllStudentData,AddStudentData} from '@/api/user'
const state = {
    studentinfo:[]
}
const mutations = {
    // 存取学生数据
    GETSTUDENTINFO(state,stuinfo){
        state.studentinfo = stuinfo
    }
}
const actions = {
    //得到学生数据
   async getStudentData(context,suInfo){
    const {current,keyword,size} = suInfo
        let res = await GetAllStudentData(current,keyword,size)
        // console.log(res)
        if(res.status === 200){
              context.commit('GETSTUDENTINFO',res.data.result.list)
             return 'ok'
        }  
    },
    // 插入学生数据
    async InsertStudentData(context,studentinfo){
        const { birthday, classes, college, emoStatus, gender, name, number, phone, profession, school} = studentinfo
        let res = await AddStudentData({ birthday, classes, college, emoStatus, gender, name, number, phone, profession, school})
        console.log(res)
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