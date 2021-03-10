import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import "@/assets/css/tailwind.css";
import "@/assets/css/global.css";
import { auth } from "./store/auth.module";
import authHeader from "@/helpers/auth-header";

Vue.use(Vuex);

// Or as a directive
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);

const cookieExtract = cookieName => {
  const cookies = document.cookie;
  const singleCookie = cookies.split(`${cookieName}=`)[1].split(";")[0];
  const singleCookieParsed = JSON.parse(singleCookie);
  return singleCookieParsed;
};

axios.defaults.headers.common = authHeader();

axios.interceptors.response.use(
  response => {
    // Return a successful response back to the calling service
    return response;
  },
  error => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work
    if (error.response.config.url === "auth/jwt/refresh") {
      store.dispatch("auth/logout").then(path => {
        router.push(path);
      });

      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Try request again with new token
    return axios
      .post("auth/jwt/refresh", {
        refresh: cookieExtract().refresh
      })
      .then(token => {
        let jwt = cookieExtract();
        jwt.access = token.data.access;
        document.cookie = `jwt=${JSON.stringify(jwt)}`;

        // New request with new token
        const config = error.response.config;
        config.headers["Authorization"] = "JWT " + token.data.access;
        axios.defaults.headers.common = {
          Authorization: "JWT " + token.data.access
        };

        return new Promise((resolve, reject) => {
          axios
            .request(config)
            .then(response => {
              resolve(response);
            })
            .catch(error => {
              reject(error);
            });
        });
      })
      .catch(error => {
        Promise.reject(error);
      });
  }
);

const apiUrl = process.env.VUE_APP_API_URL;

console.log(apiUrl);
console.log(process.env.NODE_ENV);

axios.defaults.baseURL = apiUrl;

Vue.prototype.$axios = axios;

// ---------------- Font Awesome ---------------------------------------
library.add(fas);
library.add(far);
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
