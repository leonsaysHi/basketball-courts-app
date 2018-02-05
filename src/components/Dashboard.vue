<template>
  <div class="container dashboard">  
    <h1>Dashboard <span v-if="user">{{ user.email }}</span></h1>
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
  import { mapState } from 'vuex'
  let dbCourts = firebase.database().ref('courts')
  
  export default {
    name: 'dashboard',
    computed: {
      ...mapState(['user'])
    },
    data () {
      return {
        courtsaddedbyuser: [],
        courtsarounduser: [],
        courtsfavorited: []
      }
    },
    created () {
      this.$bindAsArray('courtsaddedbyuser', dbCourts.orderByChild('creator').equalTo(this.user.uid))
      this.$bindAsArray('courtsarounduser', dbCourts.limitToLast(1))
      this.$bindAsArray('courtsfavorited', dbCourts)
    }
  }
</script>
