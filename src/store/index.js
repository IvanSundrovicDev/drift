import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";
import { tutorial } from "./tutorial.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeLocation: "",
    polygonDraw: false,
    polygonCoordinates: [],
    fieldPolygon: [],
    removedPolygon: true,
    addedField: {},
    notifications: [],
    neighborFields: []
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
    },
    drawNeighbor(state, value){
      state.neighborFields = value
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
    addNotification(contex, value) {
      contex.commit("addNotification", value);
    },
    removeNotification(contex, value) {
      contex.commit("removeNotification", value);
    },
    drawNeighbor(contex, value) {
      contex.commit("drawNeighbor", value);
    }
  },
  modules: { auth, tutorial }
});
