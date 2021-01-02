import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeLocation: "",
    polygonDraw: false,
    polygonCoordinates: []
  },
  mutations: {
    setActiveLocation(state, value) {
      state.activeLocation = value;
    },
    setPolygonDraw(state, value) {
      state.polygonDraw = value;
    },
    setPolygonCoordinates(state, value) {
      state.polygonCoordinates = value;
    }
  },
  actions: {
    setActiveLocation(context, value) {
      context.commit("setActiveLocation", value);
    },
    setPolygonDraw(context, value) {
      context.commit("setPolygonDraw", value);
    },
    setPolygonCoordinates(context, value) {
      context.commit("setPolygonCoordinates", value);
    }
  },
  modules: { auth }
});
