<template>
    <nav class="navbar navbar-dark fixed-top bg-dark">  
      <ul class="navbar-nav flex-row">
        <li class="nav-item mr-2" v-if="isAuth">
          <router-link class="btn btn-light" to="/dashboard">Dashboard</router-link>
        </li>
        <li class="nav-item mr-2">
          <router-link class="btn btn-light" to="/courts-map">Map</router-link>
        </li>
        <li class="nav-item mr-2" v-if="isAuth">
          <router-link class="btn btn-light" to="/add-court">Add court</router-link>
        </li>
        <li class="nav-item mr-2">
          <form class="form-inline">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search court</button>
          </form>
        </li>
        <li class="nav-item mr-2" v-if="!isAuth">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item mr-2" v-if="!isAuth">
          <router-link class="nav-link" to="/sign-up">Signup</router-link>
        </li>
        <li class="nav-item mr-2" v-if="isAuth">
          <button class="btn btn-outline-light" v-on:click="logout">Logout</button>
        </li>
      </ul>
    </nav>
</template>

<script>
  import firebase from '../modules/firebase'

  export default {
    name: 'Navbar',
    data () {
      return {
        isAuth: null
      }
    },
    methods: {
      logout: function () {
        firebase.auth().signOut().then(() => {
          this.$router.replace('login')
        })
      }
    },
    created () {
      this.isAuth = firebase.auth().currentUser
      firebase.auth().onAuthStateChanged(user => {
        this.isAuth = user
      })
    }
  }
</script>