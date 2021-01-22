import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeLocation: "",
    polygonDraw: false,
    polygonCoordinates: [],
    fieldPolygon: [],
    removedPolygon: true,
    addedField: {},
    farmTutorial: 0,
    herbicideTutorial: 0,
    mixTutorial: 0
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
    },
    setFieldPolygon(state, value) {
      state.fieldPolygon = value;
    },
    setRemovedPolygon(state, value) {
      state.removedPolygon = value;
    },
    setAddedField(state, value) {
      state.addedField = value;
    },
    setFarmTutorial(state) {
      state.farmTutorial = state.farmTutorial + 1;
    },
    setHerbicideTutorial(state) {
      state.herbicideTutorial = state.herbicideTutorial + 1;
    },
    setMixTutorial(state) {
      state.mixTutorial = state.mixTutorial + 1;
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
    },
    setFieldPolygon(context, value) {
      context.commit("setFieldPolygon", value);
    },
    setRemovedPolygon(context, value) {
      context.commit("setRemovedPolygon", value);
    },
    setAddedField(contex, value) {
      contex.commit("setAddedField", value);
    },
    setFarmTutorial(contex) {
      contex.commit("setFarmTutorial");
    },
    setHerbicideTutorial(contex) {
      contex.commit("setHerbicideTutorial");
    },
    setMixTutorial(contex) {
      contex.commit("setMixTutorial");
    }
  },
  modules: { auth }
});
