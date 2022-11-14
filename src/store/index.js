import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import code from './modules/code'
import role from './modules/role'
import student from './modules/student'
import menu from './modules/menu'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    code,
    role,
    student,
    menu
  },
  getters

})

export default store
