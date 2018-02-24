<template>
  <div class="map-utils">
    <div class="card">
      <div class="card-body">
        <a v-on:click="closeCallback" class="close">&times;</a>
        <h4 class="card-title">{{ court.title }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ court.descr }}</h6>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><a v-on:click="toggleHome()" v-bind:class="{ isHome: 'muted' }">
              <span v-if="!isHome">Mark as home</span>
              <span v-else>Unmark as home</span>
            </a></li>
            <li class="list-group-item"><a v-on:click="toggleFollow()" v-bind:class="{ isFollowed: 'muted' }">
              <span v-if="!isFollowed">Follow</span>
              <span v-else>Unfollow</span>
            </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'mapUtils',

    props: ['uid', 'closeCallback'],
    computed: {
      ...mapGetters(['user', 'courts']),
      court () {
        return this.courts[this.uid]
      },
      isHome () {
        return this.user.home === this.uid
      },
      isFollowed () {
        return this.user.follows.findIndex(f => f === this.uid) > -1
      }
    },
    data () {
      return {
      }
    },
    created () {
    },
    methods: {
      toggleFollow () {
        const u = Object.assign({}, this.user)
        if (this.isFollowed) {
          let idx = u.follows.findIndex(f => f === this.uid)
          u.follows.splice(idx, 1)
        } else {
          u.follows.push(this.uid)
        }
        this.$store.dispatch('saveUser', u).then(result => {
          console.log('user saved')
        })
      },
      toggleHome () {
        debugger
        const u = Object.assign({}, this.user)
        u.home = (this.isHome) ? '' : this.uid
        this.$store.dispatch('saveUser', u).then(result => {
          console.log('user saved')
        })
      }
    }
  }
</script>
