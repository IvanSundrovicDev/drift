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

axios.defaults.baseURL = "http://localhost:8000/auth/";
axios.defaults.headers.common = authHeader();
Vue.prototype.$axios = axios;

Vue.prototype.$user = JSON.parse(localStorage.getItem("user")) || null;

// ---------------- Font Awesome ---------------------------------------
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import {
  faTimes,
  faSearch,
  faMapMarkerAlt,
  faPen
} from "@fortawesome/free-solid-svg-icons";
library.add(faTimes, faSearch, faMapMarkerAlt, faMap, faPen);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// ----------------------------------------------------------------------

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
