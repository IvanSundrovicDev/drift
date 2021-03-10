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
    myFields: [],
    fields: [],
    cluActive: false,
    refresh: false,
    myRefresh: false,
    fieldsMerge: [],
    polygonDraw: false,
    polygonCoordinates: [],
    fieldPolygon: [],
    removedPolygon: true,
    removeAllPolygons: false,
    notifications: [],
    neighborFields: [],
    addNeighbor: false
  },
  mutations: {
    setActiveLocation(state, value) {
      state.activeLocation = {
        location: value,
        bool: !state.activeLocation.bool
      };
    },
    setFields(state, value) {
      let fields = [];
      let neighbors = [];
      let dispute = [];
      state.activeField = {
        dispute_coords: {},
        id: ""
      }

      if (value.mpoly[0]) {
        value.status = "active";
        value.is_confirmed = true;
        value.coords = value.mpoly;
        state.activeField = value;
        fields.push(value);
      }

      if (Object.keys(value.neighbour_coords).length > 0) {
        for (const i in value.neighbour_coords) {
          value.neighbour_coords[i].id = i
          value.neighbour_coords[i].coords = value.neighbour_coords[i].mpoly;
          value.neighbour_coords[i].status = "neighbor";
          neighbors.push(value.neighbour_coords[i]);
        }
      }

      if (Object.keys(state.activeField.dispute_coords).length > 0) {
        for (const i in state.activeField.dispute_coords) {
          state.activeField.dispute_coords[i].id = i
          state.activeField.dispute_coords[i].coords =
            state.activeField.dispute_coords[i].mpoly;
          state.activeField.dispute_coords[i].status = "dispute";
          dispute.push(state.activeField.dispute_coords[i]);
        }
      }
      fields = fields.concat(dispute, neighbors);
      state.fields = fields;
      console.log("finished");
    },
    setNeighbor(state, value) {
      if (state.cluActive) {
        let fields = [];
        for (const i in value) {
          value[i].id = i
          value[i].coords = value[i].mpoly;
          value[i].status = "neighbor";
          fields.push(value[i]);
        }
        state.fields = fields;
      }
    },
    setAllToNeighbor(state) {
      state.fields = state.myFields;
      // state.activeField = {
      //   dispute_coords: {},
      //   id: ""
      // };
    },
    deleteField(state, value) {
      let fields = state.fields.filter(el => el.uuid !== value);
      state.fields = fields;
    },
    activateClu(state, value) {
      state.fields = state.myFields;
      state.cluActive = value;
    },
    setMyFields(state, value) {
      value.forEach(el => {
        el.status = "myField";
        el.is_confirmed = true;
        el.coords = el.mpoly;
      });
      state.myFields = value;
      if(!state.activeField.id){
        state.fields = value;
      }
    },
    refreshFields(state) {
      state.refresh = !state.refresh;
    },
    refreshMyFields(state) {
      state.myRefresh = !state.myRefresh;
    },
    addToMerge(state, value){
      if (state.fieldsMerge.find(el => el === value)) {
        state.fieldsMerge = state.fieldsMerge.filter(item => item !== value);
      } else {
        state.fieldsMerge.push(value);
      }
      console.log(state.fieldsMerge);
    },
    updateField(state, value) {
      console.log(state.fields);
      console.log(value.crop);
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
      state.neighborFields = value;
    },
    setAddNeighbor(state, value) {
      state.addNeighbor = value;
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
      context.commit("deleteField", value);
    },
    activateClu(context, value) {
      context.commit("activateClu", value);
    },
    setMyFields(context, value) {
      context.commit("setMyFields", value);
    },
    refreshFields(context) {
      context.commit("refreshFields");
    },
    addToMerge(context, value) {
      context.commit("addToMerge", value)
    },
    refreshMyFields(context) {
      context.commit("refreshMyFields");
    },
    updateField(context, value) {
      context.commit("updateField", value);
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
    }
  },
  modules: { auth, tutorial }
});
