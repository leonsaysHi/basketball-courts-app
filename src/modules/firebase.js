import * as firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyD9lGzSD3NXJ1rSOdFrc8EqPQ6ogLOib2o',
  authDomain: 'basketball-courts-89a11.firebaseapp.com',
  databaseURL: 'https://basketball-courts-89a11.firebaseio.com',
  projectId: 'basketball-courts-89a11',
  storageBucket: '',
  messagingSenderId: '556878898036'
}

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app()
