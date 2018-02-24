<template>
  <div class="map">
    <MapUtils v-if="selectedCourt" :uid="selectedCourt" :close-callback="hideCourtInfos" />
    <button class="search-here" v-if="showSearchCourtsHereBtn" v-on:click="getCourtsHere()">Search courts here</button>
    <gmap-map v-if="initMapPos"
      :center="initMapPos.center"
      :zoom="initMapPos.zoom"
      @center_changed="updateMapCenter"
      @zoom_changed="updateMapZoom"
      style="width: 100%; height: 100%"
    >
      <gmap-cluster>
        <gmap-marker
          v-for="(c, index) in courts"
          :key="index"
          :position="c.latLng"
          :clickable="true"
          :draggable="false"
          v-on:click="showCourtInfos(index)"
        ></gmap-marker>
      </gmap-cluster>
    </gmap-map>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import MapUtils from '@/components/MapUtils'

  Vue.use(VueGoogleMaps, {
    load: { key: 'AIzaSyCT6fxAAmGYi54KeUXdhQ7JrGUNlkI-bDE' }
  })

  export default {
    name: 'CourtsMap',
    computed: {
      ...mapGetters(['user', 'courts'])
    },
    components: { MapUtils },
    data () {
      return {
        initMapPos: null,
        currentMapPos: null,
        selectedCourt: null,
        showSearchCourtsHereBtn: false
      }
    },
    created () {
      if (!this.currentUser) {
        this.$store.dispatch('getUser').then(result => {
          let userHomeCourt
          if (this.user.home.length) {
            userHomeCourt = this.courts.find(c => this.user.home === c['.key'])
          }
          if (!userHomeCourt && this.user.follows.length) {
            userHomeCourt = this.courts.find(c => this.user.follows[0] === c['.key'])
          }
          //
          this.initMapPos = {
            zoom: userHomeCourt ? 12 : 7,
            center: userHomeCourt ? userHomeCourt.latLng : {lat: 0, lng: 0}
          }
          this.currentMapPos = Object.assign({}, this.currentMapPos)
          this.getCourtsHere()
        })
      }
    },
    methods: {
      showCourtInfos (index) {
        this.selectedCourt = index
      },
      hideCourtInfos () {
        this.selectedCourt = null
      },
      updateMapCenter (latLng) {
        this.showSearchCourtsHereBtn = true
        this.currentMapPos.center = {lat: latLng.lat(), lng: latLng.lng()}
      },
      updateMapZoom (zoom) {
        this.showSearchCourtsHereBtn = true
        this.currentMapPos.zoom = zoom
      },
      getCourtsHere () {
        console.log('searchCourts, start.')
        this.$store.dispatch('getCourts', this.currentMapPos).then(result => {
          this.showSearchCourtsHereBtn = false
          console.log('searchCourts, done.')
        })
      }
    }
  }
</script>
