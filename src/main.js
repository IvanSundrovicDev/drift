import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import "@/assets/css/tailwind.css";
import "@/assets/css/global.css";
import { auth } from "./store/auth.module";

Vue.use(Vuex);

// Or as a directive
import { VueMaskDirective } from "v-mask";
Vue.directive("mask", VueMaskDirective);

axios.defaults.headers.common = authHeader();

// axios.interceptors.response.use(undefined, function (err) {
//   if (err.response.status === 401) {
//     console.log('intercepted');
//     axios
//       .post("auth/jwt/refresh", {
//         refresh: JSON.parse(localStorage.getItem("jwt")).refresh
//       })
//       .then(res => {
//         let jwt = JSON.parse(localStorage.getItem("jwt"));
//         jwt.access = res.data.access;

//         localStorage.setItem("jwt", JSON.stringify(jwt));
//         axios.defaults.headers.common = {Authorization: 'JWT ' + res.data.access}
//         err.config.headers['Authorization'] = 'JWT ' + res.data.access;
//         return axios.request(err.config)
//       })
//       .catch(err => {
//         console.log('loging out');
//         store.dispatch("auth/logout").then(path => {
//           router.push(path);
//         });
//       });
//   }

//   throw err;
// });

// const interceptor = axios.interceptors.response.use(
//   response => response,
//   error => {
//     // Reject promise if usual error
//     if (error.response.status !== 401) {
//       return Promise.reject(error);
//     }

//     /* 
//      * When response code is 401, try to refresh the token.
//      * Eject the interceptor so it doesn't loop in case
//      * token refresh causes the 401 response
//      */
//     //axios.interceptors.response.eject(interceptor);
//     return axios.post("auth/jwt/refresh", {
//       refresh: JSON.parse(localStorage.getItem("jwt")).refresh
//     }).then(response => {
//       console.log('refreshed');
//       let jwt = JSON.parse(localStorage.getItem("jwt"));
//       jwt.access = response.data.access;
//       localStorage.setItem("jwt", JSON.stringify(jwt));
//       error.response.config.headers['Authorization'] = 'JWT ' + response.data.access;
//       axios.defaults.headers.common = { Authorization: 'JWT ' + response.data.access }
//       return axios(error.response.config);
//     }).catch(error => {
//       console.log('logged out');
//       store.dispatch("auth/logout").then(path => {
//         router.push(path);
//       });
//       return Promise.reject(error);
//     })
//   }
// )


axios.interceptors.response.use((response) => {
  // Return a successful response back to the calling service
  return response;
}, (error) => {
  // Return any error which is not due to authentication back to the calling service
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Logout user if token refresh didn't work or user is disabled
  if (error.response.config.url == 'auth/jwt/refresh') {

    store.dispatch("auth/logout").then(path => {
      router.push(path);
    });

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }

  // Try request again with new token
  return axios.post("auth/jwt/refresh", {
    refresh: JSON.parse(localStorage.getItem("jwt")).refresh
  })
    .then((token) => {

      let jwt = JSON.parse(localStorage.getItem("jwt"));
      jwt.access = token.data.access;
      localStorage.setItem("jwt", JSON.stringify(jwt));

      // New request with new token
      const config = error.response.config;
      config.headers['Authorization'] = 'JWT ' + token.data.access;
      axios.defaults.headers.common = { Authorization: 'JWT ' + token.data.access }

      return new Promise((resolve, reject) => {
        axios.request(config).then(response => {
          resolve(response);
        }).catch((error) => {
          reject(error);
        })
      });

    })
    .catch((error) => {
      Promise.reject(error);
    });
});

const apiUrl = process.env.VUE_APP_API_URL;

console.log(apiUrl);
console.log(process.env.NODE_ENV);

axios.defaults.baseURL = apiUrl;

Vue.prototype.$axios = axios;

// ---------------- Font Awesome ---------------------------------------

import authHeader from "@/helpers/auth-header";

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
