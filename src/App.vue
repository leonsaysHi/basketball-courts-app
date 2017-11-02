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

export default {
  name: 'app',
  components: { Navbar }
}
</script>
