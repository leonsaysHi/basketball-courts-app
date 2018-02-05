// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from './modules/firebase'
import store from './store/'

import Vuex from 'vuex'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(BootstrapVue)
require('../scss/index.scss')
Vue.config.productionTip = false

// Initialize Firebase
let app
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router,
      store,
      created () {
        const user = firebase.auth().currentUser
        if (user) {
          this.$store.commit('SET_USER', { user })
        } else {
          this.$store.commit('SET_USER', { user: null })
        }
      }
    })
  }
})
