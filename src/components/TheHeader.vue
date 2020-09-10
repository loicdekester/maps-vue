<template>
<div>
  <nav>
        <router-link to="/" class="brand">
          Home
        </router-link>
        <router-link to="/leaflet" class="brand">
          Leaflet
        </router-link>
        <router-link to="/openlayer" class="brand">
          OpenLayer
        </router-link>
  </nav>  
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>
