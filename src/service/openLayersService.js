import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Icon, Style, Stroke, Fill } from 'ol/style';
import { defaults as defaultControls } from 'ol/control';
import Geolocation from 'ol/Geolocation';
import Feature from "ol/Feature";
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import VectorSource from 'ol/source/Vector';
import VectorLayer from "ol/layer/Vector";
import Overlay from 'ol/Overlay';

function createOpenLayerMap() {
  const view = new View({
    center: [0, 0],
    zoom: 2,
  });
  const iconFeature = createPointFeature();
  const markerVector = createPositionMarker(iconFeature);
  const circleFeature = createCircleFeature();
  const accuracyVector = createCircleMarker(circleFeature);
  const map = new Map({
    target: "map",
    layers: [createMapLayer(), markerVector, accuracyVector],
    controls: defaultControls({ rotate: false }),
    view
  });
  const content = document.getElementById("popup-content");
  const popup = new Overlay({
    element: document.getElementById('popup'),
  });
  map.addOverlay(popup);
  const geolocation = new Geolocation({
    tracking: true,
    projection: map.getView().getProjection(),
  });
  geolocation.on('error', function (error) {
    alert(error.message);
  });
  geolocation.on('change', function () {
    const coordinates = geolocation.getPosition();
    const accuracy = geolocation.getAccuracy();
    circleFeature.getGeometry().setCenterAndRadius(coordinates, accuracy);
    iconFeature.getGeometry().setCoordinates(coordinates);
    map.getView().setCenter(coordinates);
    map.getView().setZoom(17);
    popup.setPosition(coordinates);
    content.innerHTML = `<p>You are within ${accuracy} meters from this point</p>`;
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
      anchor: [0.5, 1]
    }),
  });
}

function createCircleStyle() {
  return new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  });
}

function createPointFeature() {
  return new Feature({ geometry: new Point([]) })
}

function createCircleFeature() {
  return new Feature({ geometry: new Circle([]) })
}

function createCircleMarker(circleFeature) {
  const source = new VectorSource({
    features: [circleFeature]
  });
  return new VectorLayer({
    source,
    style: createCircleStyle()
  });

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

/*function setUpPopOver(coordinates, radius) {
  const element = popup.getElement();
  $(element).popover('dispose');
  popup.setPosition(coordinates);
  $(element).popover({
    container: element,
    placement: 'top',
    animation: false,
    html: true,
    content: `<p>You are within ${radius} meters from this point</p>`,
  });
  $(element).popover('show');
}*/

export { createOpenLayerMap };

