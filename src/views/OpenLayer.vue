<template>
  <section class="openlayer-page">
    <div id="map"></div>
    <!-- Popup -->
    <div v-if="openPopUp" id="popup" class="ol-popup">
      <div id="popup-closer" class="ol-popup-closer" @click="closePopUp"></div>
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
      openPopUp:true
    }
  },
  mounted() {
    this.mapInitialize();
  },
  methods: {
    mapInitialize() {
      OLService.createOpenLayerMap();
    },
    closePopUp() {
      this.openPopUp = false;
    }
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
  bottom: 50px;
  left: -50px;
  min-width: 280px;
  font-size: 12px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
.ol-popup-closer:after {
  content: "✖";
}
</style>
