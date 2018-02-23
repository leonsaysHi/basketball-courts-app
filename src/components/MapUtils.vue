<template>
  <div class="map-utils">
    <div class="card">
      <div class="card-body">
        <a v-on:click="closeCallback" class="close">&times;</a>
        <h4 class="card-title">{{ court.title }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ court.descr }}</h6>
        <ul class="list-group list-group-flush">
            <li class="list-group-item"><a v-on:click="toggleHome()" v-bind:class="{ isHome: muted }">
              <span v-if="!isHome">Mark as home</span>
              <span v-else>Unmark as home</span>
            </a></li>
            <li class="list-group-item"><a v-on:click="toggleFollow()" v-bind:class="{ isFollowed: muted }">
              <span v-if="!isFollowed">Follow</span>
              <span v-else>Unfollow</span>
            </a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mapUtils',

    props: ['user', 'court', 'closeCallback'],
    computed: {
      isHome () {
        return this.user.home === this.court['.key']
      },
      isFollowed () {
        return this.user.follows.findIndex(f => f === this.court['.key']) > -1
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
        if (this.isFollowed) {
          let idx = this.user.follows.findIndex(f => f === this.court['.key'])
          this.user.follows.splice(idx, 1)
        } else {
          this.user.follows.push(this.court['.key'])
        }
        this.$store.dispatch('saveUser', this.user).then(result => {
          console.log('user saved')
        })
      },
      toggleHome () {
        this.user.home = (this.isHome) ? '' : this.court['.key']
        this.$store.dispatch('saveUser', this.user).then(result => {
          console.log('user saved')
        })
      }
    }
  }
</script>
