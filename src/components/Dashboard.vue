<template>
  <div class="container dashboard">
    <h1>Dashboard</h1>
    <div class="row" v-if="user">

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Home court</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">{{ user.home }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Followed</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(c, index) in user.follows">{{ c }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">User</h4>
            <div class="form-user" v-if="editUser">
              <label for="inputUserName" class="sr-only">Username</label>
              <input v-model="user.userName" type="text" id="inputUserName" class="form-control" placeholder="User name" required="" autofocus="">
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
  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters(['user'])
    },
    data () {
      return {
        editUser: false
      }
    },
    created () {
      if (!this.user) {
        this.$store.dispatch('getUser').then(result => {})
      }
    },
    methods: {
      saveUser () {
        const u = Object.assign({}, this.user)
        this.$store.dispatch('saveUser', u).then(result => {
          this.editUser = false
        })
      }
    }
  }
</script>
