<template>
  <div class="map">
    <MapUtils v-if="selectedCourt" :user="user" :court="selectedCourt" :close-callback="hideCourtInfos" />
    <gmap-map
      :center="center"
      :zoom="7"
      style="width: 100%; height: 100%"
    >
      <gmap-cluster>
        <gmap-marker
          :key="index"
          v-for="(c, index) in courts"
          :position="c.latLng"
          :clickable="true"
          :draggable="false"
          v-on:click="showCourtInfos(c)"
        ></gmap-marker>
      </gmap-cluster>
    </gmap-map>
  </div>
</template>

<script>
  import Vue from 'vue'
  import firebase from '../modules/firebase'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import MapUtils from '@/components/MapUtils'

  Vue.use(VueGoogleMaps, {
    load: { key: 'AIzaSyCT6fxAAmGYi54KeUXdhQ7JrGUNlkI-bDE' }
  })
  const dbCourts = firebase.database().ref('courts')

  export default {
    name: 'CourtsMap',
    firebase: {
      courts: {
        source: dbCourts,
        cancelCallback (err) {
          console.error(err)
        }
      }
    },
    computed: {
    },
    components: { MapUtils },
    data () {
      return {
        user: null,
        center: {lat: 10.0, lng: 10.0},
        selectedCourt: null
      }
    },
    created () {
      this.$store.dispatch('getUser').then(result => {
        this.user = result
      })
    },
    methods: {
      showCourtInfos (court) {
        this.selectedCourt = court
      },
      hideCourtInfos () {
        this.selectedCourt = null
      }
    }
  }
</script>
