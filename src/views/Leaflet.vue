<template>
  <section class="leaflet-page">
    <div id="mapid">
    </div>
  </section>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css"
// workaround to make the icon visible when using webpack https://github.com/Leaflet/Leaflet/issues/4968
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// end of the workaround

export default {
  name: "Leaflet",
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
      this.map = L.map('mapid').fitWorld();
      L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN
      }).addTo(this.map);
      this.map.locate({setView: true, maxZoom: 15});
      this.map.on('locationfound', this.onLocationFound);
      this.map.on('locationerror', this.onLocationError);
    },
    onLocationFound(e) {
      var radius = e.accuracy;
      L.marker(e.latlng).addTo(this.map)
      .bindPopup("You are within " + radius + " meters from this point").openPopup();
      L.circle(e.latlng, radius).addTo(this.map);
    },
    onLocationError(e) {
    alert(e.message);
}
  }
}
</script>

<style scoped>
.leaflet-page {
  padding: 80px 0 0;
  margin: 0 6em;
}
/* Map container should have defined height */
#mapid {
  height: 400px;
}
</style>
