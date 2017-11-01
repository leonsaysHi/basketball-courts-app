<template>
  <div class="sign-up">
    <h3>Sign up</h3>
    <input type="email" v-model="email" placeholder="Email">
    <br><input type="password" v-model="password" placeholder="Password">
    <br><button v-on:click="signUp">Sign up</button>
    <br><span>or <router-link to="/login">go back login</router-link></span>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function () {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function () {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
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