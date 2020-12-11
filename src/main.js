import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import "@/assets/css/tailwind.css";
import user from "./models/user";
import authHeader from "./helpers/auth-header";
import "@/assets/css/global.css";
import * as VueGoogleMaps from "vue2-google-maps";

axios.defaults.baseURL = "http://localhost:8000/auth/";
axios.defaults.headers.common = authHeader();
Vue.prototype.$axios = axios;

Vue.prototype.$user = JSON.parse(localStorage.getItem("user")) || null;

// ---------------- Font Awesome ---------------------------------------
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
library.add(faEnvelope);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// ----------------------------------------------------------------------

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAftK2SylPJvsiWTYVVPORDauFzmQsrKHs",
    libraries: "places"
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
