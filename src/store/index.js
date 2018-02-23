import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './mutation-types'
import firebase from '../modules/firebase'
// import * as actions from './actions'
// import cart from './modules/cart'
// import products from './modules/products'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null,
    user: null,
    dashboardcourts: {
      courtaddedbyuser: []
    }
  },
  mutations: {
    [types.SET_AUTH] (state, { auth }) {
      state.auth = auth
    },
    [types.SET_USER] (state, { user }) {
      user = Object.assign({ userName: '', home: '', follows: [] }, user)
      state.user = user
    },
    [types.SET_COURTSADDEDBYUSER] (state, { list }) {
      state.dashboardcourts.courtaddedbyuser = list
    }
  },
  getters: {
    auth: state => {
      return state.auth
    },
    user: state => {
      return state.user
    }
  },
  actions: {
    saveUser: ({ state, commit }, user) => {
      return new Promise((resolve, reject) => {
        let dbUsers = firebase.database().ref('users')
        dbUsers.set({ [state.auth.uid]: user }, function (error) {
          if (error) {
            reject(new Error('error'))
          } else {
            resolve()
            commit(types.SET_USER, { user })
          }
        })
      })
    },
    getUser: ({ state, commit }) => {
      return state.user ? new Promise(resolve => resolve(state.user)) : new Promise((resolve, reject) => {
        let userId = state.auth.uid
        let dbUsers = firebase.database().ref('users/' + userId)
        dbUsers.once('value').then((snapshot) => {
          if (snapshot.val()) {
            commit(types.SET_USER, { user: snapshot.val() })
          } else {
            commit(types.SET_USER, { user: {} })
          }
          resolve(state.user)
        })
      })
    }
  }
})
