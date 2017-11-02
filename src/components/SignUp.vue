<template>
  <div class="form-signup">
    <h3>Sign up</h3>    
    <label for="inputEmail" class="sr-only">Email address</label>
    <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
    <label for="inputPassword" class="sr-only">Password</label>
    <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
    <button class="btn btn-lg btn-primary btn-block" v-on:click="signUp">Sign in</button>
    <p class="text-muted text-small">or <router-link to="/login">go back login</router-link></p>
  </div>
</template>

<script>
  import firebase from '../modules/firebase'

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