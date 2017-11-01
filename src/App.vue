<template>
  <div>    
    <Navbar/>
    <main role="main" class="container">
      <router-view/>
    </main>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'app',
  components: {
    Navbar
  }
}
</script>

<style>
  body {
    min-height: 75rem;
    padding-top: 4.5rem;
  }
</style>