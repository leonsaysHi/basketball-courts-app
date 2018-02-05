import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
// import * as actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    [types.SET_USER] (state, { user }) {
      console.log('store, SET_USER', user)
      state.user = user
    }
  },
  getters: {
    user: state => {
      return state.user
    }
  },
  actions: {
    setUser ({ commit }, { user }) {
      return new Promise((resolve) => {
        commit(types.SET_USER, user)
        resolve()
      })
    }
  }
})
