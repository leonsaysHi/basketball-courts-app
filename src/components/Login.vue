<template>
  <div class="form-signin">
    <h3>Login</h3>    
    <label for="inputEmail" class="sr-only">Email address</label>
    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
    <label for="inputPassword" class="sr-only">Password</label>
    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
    <button class="btn btn-lg btn-primary btn-block" v-on:click="signIn" type="submit">Login</button>
    <p class="text-muted text-small">You don't have an account? You can <router-link to="/sign-up">create an account</router-link></p>
  </div>
</template>

<script>
  import firebase from '../modules/firebase'

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
            this.$router.replace('dashboard')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        )
      }
    }
  }
</script>