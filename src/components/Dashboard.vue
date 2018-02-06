<template>
  <div class="container dashboard">  
    <h1>Dashboard</h1>
    <div class="row">
    
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">          
            <h4 class="card-title">Added by you</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(c, index) in []">{{ c.title }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">        
        <div class="card">
          <div class="card-body">          
            <h4 class="card-title">Favorited</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(c, index) in []">{{ c.title }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">        
        <div class="card">
          <div class="card-body">          
            <h4 class="card-title">User</h4>
            <div class="form-user" v-if="editUser">   
              <label for="inputEmail" class="sr-only">Username</label>
              <input v-model="user.userName" type="email" id="inputUserName" class="form-control" placeholder="Email address" required="" autofocus="">
              <button class="btn btn-lg btn-primary btn-block" v-on:click="saveUser" type="submit">Save</button>
            </div>
            <div v-if="!editUser">
              <div>User name: {{ user.userName }}</div>
              <button class="btn btn-lg btn-primary btn-block" v-on:click="editUser = !editUser" type="submit">Edit</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  
  export default {
    name: 'dashboard',
    computed: {
      ...mapState(['auth'])
    },
    data () {
      return {
        editUser: false,
        user: null
      }
    },
    created () {
      this.$store.dispatch('getUser').then(result => {
        this.user = result
      })
    },
    methods: {
      saveUser () {
        this.$store.dispatch('saveUser', { userName: this.user.userName }).then(result => {
          this.editUser = false
        })
      }
    }
  }
</script>
