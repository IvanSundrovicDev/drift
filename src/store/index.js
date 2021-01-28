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
    farmTutorialDone: false,
    herbicideTutorial: 0,
    herbicideTutorialDone: false,
    traitTutorialDone: false,
    mixTutorial: 0,
    mixTutorialDone: false,
    notifications: []
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
    setFarmTutorialStep(state) {
      state.farmTutorial = state.farmTutorial + 1;
    },
    setFarmTutorialDone(state) {
      state.farmTutorialDone = true;
    },
    setHerbicideTutorialStep(state) {
      state.herbicideTutorial = state.herbicideTutorial + 1;
    },
    setHerbicideTutorialDone(state) {
      state.herbicideTutorialDone = true;
    },
    setTraitTutorialDone(state) {
      state.traitTutorialDone = true;
    },
    setMixTutorialStep(state) {
      state.mixTutorial = state.mixTutorial + 1;
    },
    setMixTutorialDone(state) {
      state.mixTutorialDone = true;
    },
    addNotification(state, value) {
      state.notifications.push({
        ...value,
        id: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(2, 10)
      });
    },
    removeNotification(state, value) {
      state.notifications = state.notifications.filter(el => el.id !== value);
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
    setFarmTutorialStep(contex) {
      contex.commit("setFarmTutorialStep");
    },
    setFarmTutorialDone(contex) {
      contex.commit("setFarmTutorialDone");
    },
    setHerbicideTutorialStep(contex) {
      contex.commit("setHerbicideTutorialStep");
    },
    setHerbicideTutorialDone(contex) {
      contex.commit("setHerbicideTutorialDone");
    },
    setTraitTutorialDone(contex) {
      contex.commit("setTraitTutorialDone");
    },
    setMixTutorialStep(contex) {
      contex.commit("setMixTutorialStep");
    },
    setMixTutorialDone(contex) {
      contex.commit("setMixTutorialDone");
    },
    addNotification(contex, value) {
      contex.commit("addNotification", value);
    },
    removeNotification(contex, value) {
      contex.commit("removeNotification", value);
    }
  },
  modules: { auth }
});
