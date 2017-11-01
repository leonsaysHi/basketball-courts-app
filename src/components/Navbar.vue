<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">      
      <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
        <li class="nav-item active">
          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">TEST</a>
        </li>
      </ul>
      <form class="form-inline ml-2">
        <input class="form-control mr-2" type="text" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2" type="submit">Search</button>
      </form>
    </nav>
</template>

<script>
  export default {
    name: 'Navbar',
    data () {
      return {}
    },
    methods: {}
  }
</script>