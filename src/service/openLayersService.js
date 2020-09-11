import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Icon, Style } from 'ol/style';
import { defaults as defaultControls } from 'ol/control';
import Geolocation from 'ol/Geolocation';
import Feature from "ol/Feature";
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from "ol/layer/Vector";

function createOpenLayerMap() {
  const view = new View({
    center: [0, 0],
    zoom: 2,
  });
  const iconFeature = createPointFeature();
  const vector = createPositionMarker(iconFeature);
  const map = new Map({
    target: "map",
    layers: [createMapLayer(), vector],
    controls: defaultControls({ rotate: false }),
    view
  });

  const geolocation = new Geolocation({
    tracking: true,
    projection: map.getView().getProjection(),
  });
  geolocation.on('error', function (error) {
    alert(error.message);
  });
  geolocation.on('change', function () {
    const coordinates = geolocation.getPosition();
    console.log(coordinates);
    iconFeature.getGeometry().setCoordinates(coordinates);
    map.getView().setCenter(coordinates);
    map.getView().setZoom(15);
  });
  return map;
}

function createMapLayer() {
  return new TileLayer({
    source: new XYZ({
      attributions: [
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
      ],
      url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/512/{z}/{x}/{y}?access_token=${process.env.VUE_APP_MAPBOX_ACCESS_TOKEN}`
    })
  });
}

function createMarkerStyle() {
  return new Style({
    image: new Icon({
      src: require('leaflet/dist/images/marker-icon.png'),
    }),
  });
}

function createPointFeature() {
  return new Feature({ geometry: new Point([]) })
}

function createPositionMarker(iconFeature) {
  const source = new VectorSource({
    features: [iconFeature]
  });
  return new VectorLayer({
    source,
    style: createMarkerStyle()
  });
}

export { createOpenLayerMap };
