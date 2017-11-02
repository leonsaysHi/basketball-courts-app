<template>
  <div class="map-utils">
    <div class="card" style="width: 20rem;">
        <div class="card-body">
            <h4 class="card-title">Court infos</h4>
            <h6 class="card-subtitle mb-2 text-muted">location...</h6>
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
