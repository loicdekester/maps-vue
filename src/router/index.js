import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home"),
    },
    {
      name: "leaflet",
      path: "/leaflet",
      component: () => import("@/views/Leaflet")
    },
    {
      name: "openlayer",
      path: "/openlayer",
      component: () => import("@/views/OpenLayer")
    },
  ]
});
