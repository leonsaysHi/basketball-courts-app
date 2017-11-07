<template>
  <div class="map-utils">
    <div class="card">
      <div class="card-body">
        <a v-on:click="closeCallback" class="close">&times;</a>
        <h4 class="card-title">{{ court.title }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ court.descr }}</h6>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Data 1</li>
            <li class="list-group-item">Data 2</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'mapUtils',

    props: ['court', 'closeCallback'],

    data () {
      return {
        isAuth: null
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
