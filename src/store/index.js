import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./auth.module";
import { tutorial } from "./tutorial.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    activeLocation: {
      location: "",
      bool: false
    },
    activeField: {
      dispute_coords: {},
      id: ""
    },
    fields: [],
    farmActiveField: false,
    cluActive: false,
    polygonDraw: false,
    polygonCoordinates: [],
    fieldPolygon: [],
    removedPolygon: true,
    removeAllPolygons: false,
    addedField: {},
    notifications: [],
    neighborFields: [],
    addNeighbor: false
  },
  mutations: {
    setActiveLocation(state, value) {
      state.activeLocation = { location: value, bool: !state.activeLocation.bool };
    },
    setFields(state, value) {
      let fields = []
      let neighbors = []
      let dispute = []

      if (value.mpoly[0]) {
        value.status = "active"
        value.is_confirmed = true
        value.coords = value.mpoly
        state.activeField = value
        fields.push(value)
      }

      if (Object.keys(value.neighbour_coords).length > 0) {
        for (const i in value.neighbour_coords) {
          value.neighbour_coords[i].coords = value.neighbour_coords[i].mpoly;
          value.neighbour_coords[i].status = "neighbor"
          neighbors.push(value.neighbour_coords[i]);
        }
      }

      if (Object.keys(state.activeField.dispute_coords).length > 0) {
        for (const i in state.activeField.dispute_coords) {
          state.activeField.dispute_coords[i].coords = state.activeField.dispute_coords[i].mpoly;
          state.activeField.dispute_coords[i].status = "dispute"
          dispute.push(state.activeField.dispute_coords[i]);
        }
      }
      fields = fields.concat(dispute, neighbors)
      state.fields = fields
    },
    setNeighbor(state, value) {
      if(state.cluActive){
        let fields = []
        for (const i in value) {
          value[i].coords = value[i].mpoly;
          value[i].status = "neighbor"
          fields.push(value[i]);
        }
        state.fields.forEach(el => {
          fields = fields.filter(item => item.uuid !== el.uuid)
        })
        fields = fields.concat(state.fields)
        state.fields = fields
      }
    },
    setAllToNeighbor(state) {
      let fields = state.fields.map(el => {
        el.status = "neighbor"
        return el
      })
      state.fields = fields
      state.activeField = {
        dispute_coords: {},
        id: ""
      }
    },
    deleteField(state, value) {
      let fields = state.fields.filter(el => el.uuid !== value)
      state.fields = fields
    },
    farmNoActive(state) {
      state.farmActiveField = !state.farmActiveField
    },
    activateClu(state, value) {
      state.cluActive = value
      state.fields = []
      console.log(state.fields);
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
    setRemoveAllPolygons(state, value) {
      state.removeAllPolygons = value;
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
    drawNeighbor(state, value) {
      state.neighborFields = value
    },
    setAddNeighbor(state, value) {
      state.addNeighbor = value
    }
  },
  actions: {
    setActiveLocation(context, value) {
      context.commit("setActiveLocation", value);
    },
    setFields(context, value) {
      context.commit("setFields", value);
    },
    setNeighbor(context, value) {
      context.commit("setNeighbor", value);
    },
    setAllToNeighbor(context) {
      context.commit("setAllToNeighbor");
    },
    deleteField(context, value) {
      context.commit("deleteField", value)
    },
    farmNoActive(context, value) {
      context.commit("farmNoActive")
    },
    activateClu(context, value) {
      context.commit("activateClu", value)
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
    setRemoveAllPolygons(context, value) {
      context.commit("setRemoveAllPolygons", value);
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
    },
    setAddNeighbor(contex, value) {
      contex.commit("setAddNeighbor", value);
    },
  },
  modules: { auth, tutorial }
});
