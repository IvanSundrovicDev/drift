import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
