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
    activeField:{
      coords:[]
    },
    fields: [],
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
    setFields(state, value){
      let fields = [] 
      let neighbors = []
      let dispute = []
      if(state.fields[0]){
        fields = state.fields
        fields.forEach(el => {
          if(el.uuid !== state.activeField.uuid && el.status !== "dispute"){
            return el.status =  "neighbor"
          }
        });
      }
      if(value.mpoly[0]){
        value.status = "active"
        value.is_confirmed = true
        value.coords = value.mpoly
        state.activeField = value
        let activeField = fields.findIndex(el => el.uuid === value.uuid)
        if(activeField !== -1){
          fields[activeField] = value
        }
        else{
          fields.push(value)
        }
      }
      if(Object.keys(value.neighbour_coords).length > 0){
        for (const i in value.neighbour_coords) {
          value.neighbour_coords[i].coords = value.neighbour_coords[i].mpoly;
          value.neighbour_coords[i].status = "neighbor"
          neighbors.push(value.neighbour_coords[i]);   
        }
        neighbors = neighbors.filter(el => el.uuid !== state.activeField.uuid)
      }
      if(Object.keys(value.dispute_coords).length > 0){
        for (const i in value.dispute_coords) {
          value.dispute_coords[i].coords = value.dispute_coords[i].mpoly;
          value.dispute_coords[i].status = "dispute"
          dispute.push(value.dispute_coords[i]);   
        }
        dispute = dispute.filter(el => el.uuid !== state.activeField.uuid)
      }
      let current = neighbors.concat(dispute)
      fields.forEach(el => {
        current = current.filter(item => item.uuid !== el.uuid)
      })
      fields = fields.concat(current)
      console.log(fields)
      state.fields = fields
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
