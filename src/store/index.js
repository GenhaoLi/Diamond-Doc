import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      // user_id: 'default',
      // username: 'default',
      // password: 'default',
      // email: 'default',
      // sex: 'default',
      // image: 'default',
      // birthday: 'default',
      // user_info: 'default',
    },
    currentDoc: {

    }

  },
  getters: {
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setCurrentDoc(state, doc) {
      state.currentDoc = doc
    }
  },
  actions: {
  },
  modules: {
  }
})
