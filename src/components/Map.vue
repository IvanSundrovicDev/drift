<template>
  <div class="flex h-full">
    <div id="mapContainer" class="h-full w-full"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Draw from "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import Editable from "leaflet-editable";
import Search from "leaflet-search";
import Vue from "vue";

export default {
  name: "Map",
  data: function() {
    return {
      map: null,
      center: [45.72727000000003, 18.10650000000004],
      active: false,
      fieldPolygon: [],
      drawing: false,
      activePolygon: false
    };
  },
  computed: {
    locationChange() {
      return this.$store.state.activeLocation;
    },
    initDrawPolygon() {
      return this.$store.state.polygonDraw;
    },
    drawPolygon() {
      return this.$store.state.fieldPolygon;
    },
    removedPolygon() {
      return this.$store.state.removedPolygon;
    },
    removeAllPolygons() {
      return this.$store.state.removeAllPolygons;
    },
    drawNeighbor() {
      return this.$store.state.neighborFields;
    }
  },
  watch: {
    locationChange(newLocation, oldLocation) {
      this.map.panTo(new L.LatLng(newLocation[0], newLocation[1]));
    },
    initDrawPolygon(newState, oldState) {
      if (newState) {
        this.polygonDrawer.enable();
        this.drawing = true;
      } else {
        this.polygonDrawer.disable();
        this.drawing = false;
      }
    },
    drawPolygon(newPolygon, oldPolygon) {
      this.removePolygon();
      this.activePolygon = true;
      var polygon = L.polygon(newPolygon)
        .setStyle({ color: "#FFF", fillColor: "#FFF", fillOpacity: 0.3 })
        .addTo(this.map);
    },
    removedPolygon(newState, oldState) {
      this.removeDrawnPolygon();
      this.$store.dispatch("setRemovedPolygon", true);
    },
    removeAllPolygons(newState, oldState) {
      this.removePolygon();
      this.$store.dispatch("setRemoveAllPolygons", false);
    },
    drawNeighbor(newNeighbors, oldNeighbors) {
      let map = this.map;
      let store = this.$store;
      for (const neighbor in newNeighbors.dispute_coords) {
        var polygon = L.polygon(newNeighbors.dispute_coords[neighbor].mpoly)
          .setStyle({
            color: "#EC2828",
            fillColor: "#EC2828",
            fillOpacity: 0.3
          })
          .addTo(this.map);
      }
      for (const neighbor in newNeighbors.neighbour_coords) {
        if (newNeighbors.neighbour_coords[neighbor].is_confirmed) {
          var polygon = L.polygon(newNeighbors.neighbour_coords[neighbor].mpoly)
            .setStyle({
              color: "#FFFFFF",
              fillColor: "#28AAE1",
              fillOpacity: 0.3,
              id: neighbor
            })
            .addTo(this.map);
        } else {
          var polygon = L.polygon(newNeighbors.neighbour_coords[neighbor].mpoly)
            .bindPopup(`<div style="width:344px" id="popup"></div>`)
            .setStyle({ color: "#FFF", fillOpacity: 0, id: neighbor })
            .addTo(this.map);
          polygon.on("click", function() {
            let img = "@/assets/images/icons/envelope.png";
            new Vue({
              el: "#popup",
              data: function() {
                return {
                  neighborEmail: "",
                  fieldName: "",
                  img: require("@/assets/images/icons/envelope.png"),
                  img2: require("@/assets/images/icons/farm.png"),
                  active: "main"
                };
              },
              methods: {
                inviteNeighbor() {
                  this.$axios
                    .post(`/farms/fields/${neighbor}/invite/`, {
                      email: this.neighborEmail
                    })
                    .then(res => {
                      map.closePopup();
                      store.dispatch("addNotification", {
                        type: "success",
                        message: "Neighbor successfully invited!"
                      });
                    })
                    .catch(err => {
                      this.$store.dispatch("addNotification", {
                        type: "error",
                        message: "There was an error inviting neighbor!"
                      });
                    });
                },
                claimField() {
                  this.$axios
                    .patch(`farms/fields/${newNeighbors.neighbour_coords[neighbor].uuid}/claim/`, {name: this.fieldName, farm: newNeighbors.farm})
                    .then(res => {
                      res.data.mpoly = []
                      store.dispatch("setAddedField", res.data.field);
                      store.dispatch("addNotification", {
                        type: "success",
                        message: "Neighbor field successfully claimed!"
                      });
                    })
                    .catch(err => {
                      store.dispatch("addNotification", {
                        type: "error",
                        message: "There was an error claiming neighbor!"
                      });
                    });
                }
              },
              template: `<div>
                <div class="w-full">
                  <div v-if="active === 'main'" class="flex">
                    <div class="py-5 flex">
                      <button
                        class="rounded-lg py-1 text-lg m-auto w-36 mr-4 designActionButton"
                        v-on:click="active = 'invite'"
                      >
                        Invite neighbor
                      </button>
                    </div>
                    <div class="py-5 flex">
                      <button
                        class="rounded-lg text-lg py-1 m-auto w-36 designActionButton"
                        v-on:click="active = 'claim'"
                      >
                        Claim field
                      </button>
                    </div>
                  </div>
                  <div v-if="active === 'invite'">
                    <div class="w-full">
                      <div class="w-full pt-6">
                        <div>
                          <img
                            class="inline"
                            :src="img"
                          />
                          <span class="my-auto text-lg ml-2 align-middle"
                            >Neighbour e-mail address</span
                          >
                        </div>
                        <div class="flex">
                          <input
                            type="email"
                            class="w-72 mr-1 border-b-2 text-lg border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Enter neighbour e-mail address"
                            autofocus
                            v-model="neighborEmail"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="pt-10 flex">
                      <button
                        class="rounded-lg text-lg py-1 m-auto w-36 designActionButton"
                        v-on:click="inviteNeighbor"
                      >
                        Invite
                      </button>
                    </div>
                  </div>
                  <div v-if="active === 'claim'">
                    <div class="w-full">
                      <div class="w-full pt-6">
                        <div>
                          <img
                            class="inline"
                            :src="img2"
                          />
                          <span class="my-auto text-lg ml-2 align-middle"
                            >Field name</span
                          >
                        </div>
                        <div class="flex">
                          <input
                            type="text"
                            class="w-72 mr-1 border-b-2 text-lg border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Enter field name"
                            autofocus
                            v-model="fieldName"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="pt-10 flex">
                      <button
                        class="rounded-lg text-lg py-1 m-auto w-36 designActionButton"
                        v-on:click="claimField"
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                </div>
              </div>`
            });
          });
        }
      }
    }
  },
  methods: {
    setupLeafletMap: function() {
      // Initiate map
      this.map = L.map("mapContainer", {
        zoomControl: false,
        editable: true
      }).setView(this.center, 13);

      // Put zoom control bottom right
      L.control
        .zoom({
          position: "bottomright"
        })
        .addTo(this.map);

      // Set options and params
      L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Initialise the FeatureGroup to store editable layers
      let editableLayers = new L.FeatureGroup();
      this.map.addLayer(editableLayers);

      let drawPluginOptions = {
        position: "bottomright",
        draw: {
          polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
              color: "#e1e100", // Color the shape will turn when intersects
              message:
                "<strong>Polygon draw does not allow intersections!<strong> (allowIntersection: false)" // Message that will show when intersect
            },
            shapeOptions: {
              fillColor: "rgb(196, 196, 196)",
              color: "#F47500",
              weight: 10
            }
          },
          polyline: false,
          circlemarker: false,
          circle: false,
          rectangle: false,
          marker: false
        },
        edit: {
          featureGroup: editableLayers, //REQUIRED!!
          remove: true
        }
      };

      // Initialise the draw control and pass it the FeatureGroup of editable layers
      let drawControl = new L.Control.Draw(drawPluginOptions);
      this.map.addControl(drawControl);

      let scopeThis = this;

      let store = this.$store;

      this.polygonDrawer = new L.Draw.Polygon(this.map);

      let map = this.map;

      let fieldsShown = false;
      //on zoom get neighbour fields
      this.map.on("zoomend", function() {
        if (
          map.getZoom() > 10 &&
          !scopeThis.fieldPolygon[0] &&
          !scopeThis.drawing &&
          !scopeThis.activePolygon &&
          !fieldsShown
        ) {
          let coords = map.getCenter();

          scopeThis.$axios
            .post(`farms/fields/location-search/`, coords)
            .then(res => {
              fieldsShown = true;
              let fields = { neighbour_coords: res.data, dispute_coords: [] };
              store.dispatch("drawNeighbor", fields);
            })
            .catch(err => {});
          store.dispatch("addNotification", {
            type: "success",
            message: "Calculating neighboring fields..."
          });
        } else if (map.getZoom() <= 10) {
          fieldsShown = false;
          scopeThis.removePolygon();
        }
      });

      // catch drawn polygon
      this.map.on("draw:created", function(e) {
        let layer = e.layer;

        let newCoords = [];

        layer.options.color = "#FFF";
        layer.options.fillColor = "#FFF";
        layer.options.fillOpacity = 0.3;
        layer.options.name = "last";

        layer.editing.latlngs[0][0].map(function(value, key) {
          newCoords.push([value.lat, value.lng]);
        });

        store.dispatch("setPolygonCoordinates", newCoords);
        store.dispatch("setPolygonDraw", !store.state.polygonDraw);

        scopeThis.fieldPolygon = newCoords;

        editableLayers.addLayer(layer);
        // zoom the map to the polygon
        scopeThis.map.fitBounds(layer.getBounds());
      });

      this.map.on("draw:edited", function(e) {
        let layers = e.layers;

        let newCoords = [];

        layers.eachLayer(function(layer) {
          layer.editing.latlngs[0][0].map(function(value, key) {
            layer.options.color = "orange";
            newCoords.push([value.lat, value.lng]);
          });

          scopeThis.fieldPolygon = newCoords;

          scopeThis.map.fitBounds(layer.getBounds());
        });
      });
      this.map.on("draw:canceled", function(e) {
        store.dispatch("setPolygonDraw", false);
      });
    },
    removePolygon() {
      this.fieldPolygon = [];
      this.activePolygon = false;
      for (let i in this.map._layers) {
        if (this.map._layers[i]._path !== undefined) {
          try {
            this.map.removeLayer(this.map._layers[i]);
          } catch (e) {
            console.log("problem with " + e + this.map._layers[i]);
          }
        }
      }
    },
    removeDrawnPolygon() {
      for (let i in this.map._layers) {
        if (
          this.map._layers[i]._path !== undefined &&
          this.map._layers[i].options.name
        ) {
          try {
            this.map.removeLayer(this.map._layers[i]);
          } catch (e) {
            console.log("problem with " + e + this.map._layers[i]);
          }
        }
      }
    },

    inviteNeighbor() {
      console.log("fds");
    }
  },
  mounted() {
    this.setupLeafletMap();
  }
};
</script>

<style>
.leaflet-draw-toolbar-top {
  display: none;
}
.leaflet-draw-edit-remove {
  display: none !important;
}
</style>
