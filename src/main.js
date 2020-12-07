import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios';

import "@/assets/css/global.css"

Vue.prototype.$axios = axios;

Vue.prototype.$user = localStorage.getItem('user') || null;

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
library.add(faEnvelope)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import '@/assets/css/tailwind.css'

Vue.config.productionTip = false;

export const API_URL = 'http://localhost:8000/auth/';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
