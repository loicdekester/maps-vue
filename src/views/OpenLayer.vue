<template>
  <section class="openlayer-page">
    <div id="map">
    </div>
  </section>
</template>

<script>
import 'ol/ol.css';
import * as OLService from '../service/openLayersService';

export default {
  name: "OpenLayer",
  data() {
    return {
      map: null,
    }
  },
  mounted() {
    this.mapInitialize();
  },
  methods: {
    mapInitialize() {
      OLService.createOpenLayerMap();
    },
  }
}
</script>

<style scoped>
.openlayer-page {
  padding: 80px 0 0;
  margin: 0 6em;
}
/* Map container should have defined height */
#map {
  height: 400px;
}
</style>
