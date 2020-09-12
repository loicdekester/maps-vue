<template>
  <section class="openlayer-page">
    <div id="map"></div>
    <!-- Popup -->
    <div id="popup" class="ol-popup">
      <div id="popup-content"></div>
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
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 40px;
  min-width: 280px;
  font-size: 12px;
}
</style>
