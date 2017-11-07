<template>
  <div class="container dashboard">  
    <h1>Dashboard</h1>
    <div class="row">

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">          
            <h4 class="card-title">Added by you</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(c, index) in courtsaddedbyuser">{{ c.title }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">        
        <div class="card">
          <div class="card-body">          
            <h4 class="card-title">Added in your area</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(c, index) in courtsarounduser">{{ c.title }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">        
        <div class="card">
          <div class="card-body">          
            <h4 class="card-title">Favorited</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(c, index) in courtsfavorited">{{ c.title }}</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import firebase from '../modules/firebase'

  let dbCourts = firebase.database().ref('courts')

  export default {
    name: 'dashboard',
    data () {
      return {
        user: null,
        courtsaddedbyuser: [],
        courtsarounduser: [],
        courtsfavorited: []
      }
    },
    created () {
      firebase.auth().onAuthStateChanged(user => {
        this.user = user
        this.$bindAsArray('courtsaddedbyuser', dbCourts.orderByChild('creator').equalTo(this.user.uid))
        this.$bindAsArray('courtsarounduser', dbCourts.limitToLast(1))
        this.$bindAsArray('courtsfavorited', dbCourts)
      })
    }
  }
</script>
