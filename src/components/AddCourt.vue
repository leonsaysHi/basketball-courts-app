<template>
  <div class="add-court">  
    <p>Hi, {{ currentUser.email }}.</p>
    <div class="row">
      <div class="col-md-6">
        <div class="form-group">
          <label>Name</label>
          <input type="text" v-model="newCourt.title" class="form-control" placeholder="Name">
        </div>
        <div class="form-group">
          Position : {{ newCourt.latLng.lat }}, {{ newCourt.latLng.lng }}
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="newCourt.descr" class="form-control" placeholder="Description"></textarea>
        </div>
        <button v-on:click="saveCourt" class="btn btn-primary">Save</button>
      </div>
      <div class="col-md-6" v-if="geoloc">
        <gmap-map
          :center="center"
          :zoom="7"
          style="width: 100%; height: 400px"
        >
          <gmap-marker
            :key="0"
            :position="newCourt.latLng"
            :clickable="false"
            :draggable="true"
            @drag="markerDragged"
          ></gmap-marker>
        </gmap-map>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import firebase from '../modules/firebase'
  import * as VueGoogleMaps from 'vue2-google-maps'
  import VueFire from 'vuefire'

  Vue.use(VueFire)
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCT6fxAAmGYi54KeUXdhQ7JrGUNlkI-bDE'
    }
  })

  const dbCourts = firebase.database().ref('courts')

  export default {
    name: 'addCourt',
    firebase: {
      courts: {
        source: dbCourts,
        cancelCallback (err) {
          console.error(err)
        }
      }
    },
    data () {
      const defaultPosition = {lat: 0, lng: 0}
      return {
        geoloc: false,
        center: defaultPosition,
        currentUser: null,
        newCourt: {
          creator: '',
          title: '',
          descr: '',
          latLng: defaultPosition
        }
      }
    },
    methods: {
      markerDragged (m) {
        this.newCourt.latLng.lat = m.latLng.lat()
        this.newCourt.latLng.lng = m.latLng.lng()
      },
      saveCourt () {
        if (this.newCourt.title.length < 3) {
          alert('Title is empty or too short')
          return
        }
        try {
          dbCourts.push(this.newCourt)
        } catch (err) {
          console.log(err)
        }
        this.$router.replace('dashboard')
      }
    },
    mounted () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const latLng = {lat: position.coords.latitude, lng: position.coords.longitude}
          this.center = Object.assign({}, latLng)
          this.newCourt.latLng = Object.assign({}, latLng)
          this.geoloc = true
        })
      } else {
        this.geoloc = true
      }
    },
    created () {
      this.currentUser = firebase.auth().currentUser
      firebase.auth().onAuthStateChanged(user => {
        this.newCourt.creator = user.uid
        this.currentUser = user
      })
    }
  }
</script>
