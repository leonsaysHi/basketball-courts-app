<template>
  <div class="map">
    <MapUtils />
    <gmap-map
      :center="center"
      :zoom="7"
      style="width: 100%; height: 100%"
    >
      <gmap-marker
        :key="index"
        v-for="(c, index) in courts"
        :position="c.latLng"
        :clickable="false"
        :draggable="false"
      ></gmap-marker>
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
      courts: dbCourts.limitToLast(25)
    },
    components: { MapUtils },
    data () {
      return {
        center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }, {
          position: {lat: 11.0, lng: 11.0}
        }]
      }
    },
    methods: {}
  }
</script>
