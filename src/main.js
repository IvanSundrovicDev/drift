import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import "@/assets/css/tailwind.css";
import user from "./models/user";
import authHeader from "./helpers/auth-header";
import "@/assets/css/global.css";
import {auth} from "./store/auth.module"

Vue.use(Vuex);

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common = authHeader();
Vue.prototype.$axios = axios;

Vue.prototype.$userData = JSON.parse(localStorage.getItem("userData")) || null;

// ---------------- Font Awesome ---------------------------------------
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import {
  faTimes,
  faSearch,
  faMapMarkerAlt,
  faPen,
  faEllipsisH,
  faPlusCircle,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faUser
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faTimes,
  faSearch,
  faMapMarkerAlt,
  faMap,
  faPen,
  faEllipsisH,
  faPlusCircle,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faUser
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
// ----------------------------------------------------------------------

Vue.config.productionTip = false;

export default new Vuex.Store({
  modules: {
    auth
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
