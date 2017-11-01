// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

Vue.config.productionTip = false

// Initialize Firebase
let app
var config = {
  apiKey: 'AIzaSyD9lGzSD3NXJ1rSOdFrc8EqPQ6ogLOib2o',
  authDomain: 'basketball-courts-89a11.firebaseapp.com',
  databaseURL: 'https://basketball-courts-89a11.firebaseio.com',
  projectId: 'basketball-courts-89a11',
  storageBucket: '',
  messagingSenderId: '556878898036'
}
firebase.initializeApp(config)
firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})
