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
            <h4 class="card-title">Favorited</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(c, index) in courtsfavorited">{{ c.title }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">        
        <div class="card">
          <div class="card-body">          
            <h4 class="card-title">User</h4>
            <form v-if="!user.error">
              {{ user }}
            </form>
            <div v-if="user.error">
              User not found
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  // import firebase from '../modules/firebase'
  import { mapState } from 'vuex'
  // let dbCourts = firebase.database().ref('courts')
  
  export default {
    name: 'dashboard',
    computed: {
      ...mapState(['auth'])
    },
    data () {
      return {
        user: null
      }
    },
    created () {
      this.$store.dispatch('getUser').then(result => {
        debugger
        this.user = result
      })
    }
  }
</script>
