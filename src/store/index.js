import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameInfo: {}
  },
  mutations: {
    updateGameInfo(state, payload) {
      state.gameInfo = payload;
      console.log(payload)

    }
  },
  actions: {
    handleUpdateGameInfo(context, payload) {
      context.commit('updateGameInfo', payload)
    }
  },
  modules: {

  }
})
