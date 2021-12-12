import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    gameInfo: { "player1": { "socketId": "M0MIY18oaBz6qW0DAAAF", "name": "test1", "id": 1639315766059 }, "player2": { "socketId": "qSilQypzdZcz4LFcAAAE", "name": "test2", "id": 1639315767999 }, "roomId": 1639315768002 },
    userInfo: { id: null, name: '' }
  }
};

const state = getDefaultState()

const mutations = {
  updateGameInfo(state, payload) {
    state.gameInfo = payload;
  },
  updateUserInfo(state, payload) {
    state.userInfo = payload
  }
};

const actions = {
  handleUpdateGameInfo(context, payload) {
    context.commit('updateGameInfo', payload)
  },
  handleUpdateUserInfo(context, payload) {
    context.commit('updateUserInfo', payload)
  }
};

const getters = {
  getGameInfo: state => {
    return state.gameInfo
  },
  getUserInfo: state => {
    return state.userInfo
  },
};



export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})
