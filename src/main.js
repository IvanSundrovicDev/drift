import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import "@/assets/css/tailwind.css";
import "@/assets/css/global.css";
import { auth } from "./store/auth.module";

Vue.use(Vuex);

// Or as a directive
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);

axios.defaults.headers.common = authHeader();

axios.interceptors.response.use(undefined, function(err) {
  if (err.response.status === 401) {
    axios
      .post("auth/jwt/refresh", {
        refresh: JSON.parse(localStorage.getItem("jwt")).refresh
      })
      .then(res => {
        let jwt = JSON.parse(localStorage.getItem("jwt"));
        jwt.access = res.data.access;

        localStorage.setItem("jwt", JSON.stringify(jwt));
      })
      .catch(err => {
        store.dispatch("auth/logout").then(path => {
          router.push(path);
        });
      });
  }

  throw err;
});

const apiUrl = process.env.VUE_APP_API_URL;

console.log(apiUrl);
console.log(process.env.NODE_ENV);

axios.defaults.baseURL = apiUrl;

Vue.prototype.$axios = axios;

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
import authHeader from "@/helpers/auth-header";
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
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
