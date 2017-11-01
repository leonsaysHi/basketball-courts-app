<template>
  <div class="login">
    <h3>Sign in</h3>
    <input type="email" v-model="email" placeholder="Email">
    <br><input type="password" v-model="password" placeholder="Password">
    <br><button class="btn" v-on:click="signIn">Connection</button>
    <p>You don't have an account? You can <router-link to="/sign-up">create an account</router-link></p>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'login',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signIn: function () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('map')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      }
    }
  }
</script>