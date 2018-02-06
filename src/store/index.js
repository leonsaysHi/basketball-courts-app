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
    getUser: store => {
      return new Promise((resolve, reject) => {
        let userId = store.state.auth.uid
        let dbUsers = firebase.database().ref('users/' + userId)
        dbUsers.once('value').then((snapshot) => {
          if (snapshot.val()) {
            store.commit(types.SET_USER, { user: snapshot.val() })
          } else {
            store.commit(types.SET_USER, { user: { error: true } })
          }
          resolve(store.state.user)
        })
      })
    },
    getDashboardCourts: store => {
      let dbCourts = firebase.database().ref('courts')
      dbCourts.orderByChild('creator').equalTo(store.state.auth.uid).ref.on('value', ref => {
        store.commit(types.SET_COURTSADDEDBYUSER, { list: ref.val() })
      })
      /* return new Promise((resolve) => {
        this.$bindAsArray('courtsaddedbyuser', dbCourts.orderByChild('creator').equalTo(this.auth.uid))
        this.$bindAsArray('courtsarounduser', dbCourts.limitToLast(1))
        this.$bindAsArray('courtsfavorited', dbCourts)
      }) */
    }
  }
})
