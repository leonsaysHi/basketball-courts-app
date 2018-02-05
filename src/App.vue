<template>
  <div id="root">    
    <Navbar/>
    <main role="main">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import store from '@/store'

export default {
  name: 'app',
  store,
  components: { Navbar }
}
</script>
