<template>
  <div>
    <h1>{{ msg }}</h1>
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'Map',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    }
  }
</script>
