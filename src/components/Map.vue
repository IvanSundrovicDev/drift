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
      center: [39.8859636, -95.6042309],
      zoom: 4,
      active: false,
      fieldPolygon: [],
      drawing: false,
      fieldsShown: false,
      activePolygon: false,
      activeCoords: false
    };
  },
  computed: {
    locationChange() {
      return this.$store.state.activeLocation;
    },
    initDrawPolygon() {
      return this.$store.state.polygonDraw;
    },
    removedPolygon() {
      return this.$store.state.removedPolygon;
    },
    removeAllPolygons() {
      return this.$store.state.removeAllPolygons;
    },
    fieldsUpdate() {
      return this.$store.state.fields
    }
  },
  watch: {
    locationChange(newLocation, oldLocation) {
      console.log(newLocation)
      this.map.flyTo(newLocation.location, 14)
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
    removedPolygon(newState, oldState) {
      this.removeDrawnPolygon();
      this.$store.dispatch("setRemovedPolygon", true);
    },
    removeAllPolygons(newState, oldState) {
      this.removePolygon();
      this.$store.dispatch("setRemoveAllPolygons", false);
    },
    fieldsUpdate(newFields, oldFields) {
      this.removePolygon();
      let map = this.map;
      let store = this.$store;
      newFields.forEach(field => {
        if(field.status === "active"){
          var polygon = L.polygon(field.coords)
            .setStyle({ color: "#FFF", fillColor: "#FFF", fillOpacity: 0.3 })
            .addTo(this.map);
        }
        else if(field.status === "dispute"){
          if (field.is_confirmed) {
          var polygon = L.polygon(field.coords)
            .setStyle({ color: "#EC2828", fillColor: "#EC2828", fillOpacity: 0.3 })
            .addTo(this.map);
          }
           else {
          var polygon = L.polygon(field.coords)
            .bindPopup(`<div style="width:230px" id="popup"></div>`)
            .setStyle({ color: "#EC2828", fillOpacity: 0, id: field.uuid })
            .addTo(this.map);
          polygon.on("click", function() {
            let img = "@/assets/images/icons/envelope.png";
            menu(field)
          });
        }
        }
        else if(field.status === "neighbor"){
          if (field.is_confirmed) {
          var polygon = L.polygon(field.coords)
            .setStyle({
              color: "#FFFFFF",
              fillColor: "#28AAE1",
              fillOpacity: 0.3,
              id: field.uuid
            })
            .addTo(this.map);
        } else {
          var polygon = L.polygon(field.coords)
            .bindPopup(`<div style="width:230px" id="popup"></div>`)
            .setStyle({ color: "#FFF", fillOpacity: 0, id: field.uuid })
            .addTo(this.map);
          polygon.on("click", function() {
            let img = "@/assets/images/icons/envelope.png";
            menu(field)
          });
        }
        }
        let menu = () => {
          new Vue({
              el: "#popup",
              data: function() {
                return {
                  neighborEmail: "",
                  fieldName: "",
                  img: require("@/assets/images/icons/envelope.png"),
                  img2: require("@/assets/images/icons/farm.png"),
                  cropImg: require("@/assets/images/icons/crop-icon.png"),
                  traitImg: require("@/assets/images/icons/trait-icon.png"),
                  inviteImg: require("@/assets/images/icons/invite-icon.png"),
                  addImg: require("@/assets/images/icons/add-icon.png"),
                  farmImg: require("@/assets/images/icons/FarmsLogo.png"),
                  active: "main",
                  crops: [],
                  traits: [],
                  data: {
                    selectedCrop: {
                      id: "",
                      name: ""
                    },
                    selectedTrait: {
                      id: "",
                      name: ""
                    }
                  },
                  activeMenu: false
                };
              },
              methods: {
                inviteNeighbor() {
                  // this.$axios
                  //   .post(`/farms/fields/${neighbor}/invite/`, {
                  //     email: this.neighborEmail
                  //   })
                  //   .then(res => {
                  //     map.closePopup();
                  //     store.dispatch("addNotification", {
                  //       type: "success",
                  //       message: "Neighbor successfully invited!"
                  //     });
                  //   })
                  //   .catch(err => {
                  //     this.$store.dispatch("addNotification", {
                  //       type: "error",
                  //       message: "There was an error inviting neighbor!"
                  //     });
                  //   });
                },
                claimField() {
                  if (this.data.selectedFarm.id && this.fieldName) {
                    this.$axios
                      .patch(
                        `farms/fields/${field.uuid}/claim/`,
                        {
                          name: this.fieldName,
                          farm: this.data.selectedFarm.id
                        }
                      )
                      .then(res => {
                        //this.$store.dispatch("setAllToNeighbor");
                        //this.$store.dispatch("farmNoActive")
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
                assignCropTrait() {
                  this.$axios
                    .patch(
                      `farms/fields/${field.uuid}/claim/`,
                      {
                        crop_trait: this.data.selectedTrait.id,
                        crop: this.data.selectedCrop.id
                      }
                    )
                    .then(res => {
                      res.data.field.mpoly = [];
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
                },
                activate(id) {
                  if (!this.activeMenu) {
                    this.activeMenu = id;
                  } else this.activeMenu = "";
                },
                select(name, item) {
                  switch (name) {
                    case "crop":
                      if (
                        !this.data.selectedCrop ||
                        this.data.selectedCrop.id !== item.id
                      ) {
                        this.data.selectedCrop = item;
                        this.activeMenu = "";
                      } else {
                        this.data.selectedCrop = "";
                      }
                      break;
                    case "trait":
                      if (
                        !this.data.selectedTrait ||
                        this.data.selectedTrait.id !== item.id
                      ) {
                        this.data.selectedTrait = item;
                        this.activeMenu = "";
                      } else {
                        this.data.selectedTrait = "";
                      }
                      break;
                    case "farm":
                      if (
                        !this.data.selectedFarm ||
                        this.data.selectedFarm.id !== item.id
                      ) {
                        this.data.selectedFarm = item;
                        this.activeMenu = "";
                      } else {
                        this.data.selectedFarm = "";
                      }
                      break;
                  }
                }
              },
              beforeMount() {
                console.log(field)
                this.data = {
                  selectedCrop: {
                    id: field.crop,
                    name: field.crop_name
                  },
                  selectedTrait: {
                    id: field.crop_trait,
                    name: field.crop_trait_name
                  },
                  selectedFarm: {
                    id: "",
                    name: ""
                  }
                };
                this.$axios
                  .get(`farms/crops/`)
                  .then(res => {
                    this.crops = res.data;
                  })
                  .catch(err => {});

                this.$axios
                  .get(`farms/crop-traits/`)
                  .then(res => {
                    let traits = [];
                    for(const i in res.data){
                      res.data[i].forEach(el => traits.push(el))
                    }
                    this.traits = traits
                  })
                  .catch(err => {});
                this.$axios
                  .get(`farms/me/`)
                  .then(res => {
                    this.farms = res.data;
                  })
                  .catch(err => {});
              },
              template: `
              <div>
                <div class="w-full">
                  <div v-if="active === 'main'" class="w-full">
                    <div class="py-2 pt-2 flex">
                      <img
                        class="inline h-7"
                        :src="cropImg"
                      />
                      <h1 class="text-xl ml-2">{{ data.selectedCrop.name ? data.selectedCrop.name : "N/A" }}</h1>
                    </div>
                    <div class="py-2 flex">
                      <img
                        class="inline h-7"
                        :src="traitImg"
                      />
                      <h1 class="text-xl ml-2">{{ data.selectedTrait.name ? data.selectedTrait.name : "N/A" }}</h1>
                    </div>
                    <div class="py-2 border-t-2 border-drift-blue flex">
                      <img
                        class="inline h-7"
                        :src="cropImg"
                      />
                      <h1 v-on:click="active = 'assign'" class="text-xl ml-2 custom-underline cursor-pointer">Assign Crop and Trait</h1>
                    </div>
                    <div class="py-2 flex">
                      <img
                        class="inline h-7"
                        :src="inviteImg"
                      />
                      <h1 v-on:click="active = 'invite'" class="text-xl ml-2 custom-underline cursor-pointer">Invite neighbor</h1>
                    </div>
                    <div class="py-2 flex">
                      <img
                        class="inline h-7"
                        :src="addImg"
                      />
                      <h1 v-on:click="active = 'claim'" class="text-xl ml-2 custom-underline cursor-pointer">Add to my fields</h1>
                    </div>
                  </div>
                  <div v-if="active === 'assign'">
                    <div class="w-full">
                      <div class="w-full pt-6">
                        <div>
                          <h1 class="text-xl text-center">Assign Crop and Trait</h1>
                        </div>
                        <div
                          v-on:click="activate('crop')"
                          v-show="activeMenu === 'crop' || !activeMenu"
                          class="flex border-b border-gray-200 mt-2 px-2 py-3 cursor-pointer"
                        >
                          <img
                            class="inline my-auto h-7"
                            :src="cropImg"
                          />
                          <h1 class="text-xl ml-2">
                            {{ data.selectedCrop.id ? data.selectedCrop.name : "N/A" }}
                          </h1>
                          <div v-if="!activeMenu" class="arrow-down my-auto ml-auto mr-3"></div>
                          <div v-else class="arrow-up ml-auto mr-2"></div>
                        </div>
                        <div class="w-full overflow-auto h-32" v-show="activeMenu === 'crop'">
                          <div
                            v-for="item in crops"
                            v-on:click="select('crop', item)"
                            :key="item.id"
                            class="custom-item cursor-pointer hover:bg-gray-200"
                          >
                            <div
                              :class="{
                                'salmon-border-selected': data.selectedCrop.id === item.id,
                              }"
                              class="salmon-border mx-8 border-b-2 border-gray-200 text-sm text-center p-2"
                            >
                              <h1 class="text-lg">{{ item.name }}</h1>
                            </div>
                          </div>
                        </div>
                    
                        <div
                          v-on:click="activate('trait')"
                          v-show="activeMenu === 'trait' || !activeMenu"
                          class="flex border-b border-gray-200 mt-2 px-2 py-3 cursor-pointer"
                        >
                          <img
                            class="inline h-7 my-auto"
                            :src="traitImg"
                          />
                          <h1 class="text-xl ml-2">
                            {{ data.selectedTrait.id ? data.selectedTrait.name : "N/A" }}
                          </h1>
                          <div v-if="!activeMenu" class="arrow-down my-auto ml-auto mr-3"></div>
                          <div v-else class="arrow-up ml-auto mr-2"></div>
                        </div>
                        <div class="w-full overflow-auto h-32" v-show="activeMenu === 'trait'">
                          <div
                            v-for="item in traits"
                            v-on:click="select('trait', item)"
                            :key="item.id"
                            class="custom-item cursor-pointer hover:bg-gray-200"
                          >
                            <div
                              :class="{
                                'salmon-border-selected': data.selectedTrait.id === item.id,
                              }"
                              class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-2"
                            >
                              <h1 class="text-lg">{{ item.name }}</h1>
                            </div>
                          </div>
                        </div>
                        <div class="pt-8 flex">
                          <button
                            class="rounded-lg text-lg py-1 m-auto w-36 designActionButton"
                            v-on:click="assignCropTrait()"
                          >
                            Save
                          </button>
                        </div>
                      </div>
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
                      <div class="pt-10 flex">
                        <button
                          class="rounded-lg text-lg py-1 m-auto w-36 designActionButton"
                          v-on:click="inviteNeighbor"
                        >
                          Invite
                        </button>
                      </div>
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
                  <div
                          v-on:click="activate('crop')"
                          v-show="activeMenu === 'crop' || !activeMenu"
                          class="flex border-b border-gray-200 mt-2 px-2 py-3 cursor-pointer"
                        >
                          <img
                            class="inline h-5 my-auto"
                            :src="farmImg"
                          />
                          <h1 class="text-xl ml-2">
                            {{ data.selectedFarm.id ? data.selectedFarm.name : "Select Farm" }}
                          </h1>
                          <div v-if="!activeMenu" class="arrow-down my-auto ml-auto mr-3"></div>
                          <div v-else class="arrow-up ml-auto mr-2"></div>
                        </div>
                        <div class="w-full overflow-auto h-32" v-show="activeMenu === 'crop'">
                          <div
                            v-for="item in farms"
                            v-on:click="select('farm', item)"
                            :key="item.id"
                            class="custom-item cursor-pointer hover:bg-gray-200"
                          >
                            <div
                              :class="{
                                'salmon-border-selected': data.selectedFarm.id === item.id,
                              }"
                              class="salmon-border mx-8 border-b-2 border-gray-200 text-sm text-center p-2"
                            >
                              <h1 class="text-lg">{{ item.name }}</h1>
                            </div>
                          </div>
                        </div>
                    <div class="pt-8 flex">
                      <button
                        :class="{
                          'opacity-100 hover:bg-drift-blue hover:text-white':
                            data.selectedFarm.id && fieldName,
                          'cursor-not-allowed': !data.selectedFarm.id && !fieldName
                        }"
                        class="rounded-lg text-lg py-1 m-auto w-36 border-2 border-drift-blue text-drift-blue hover:bg-white opacity-50"
                        v-on:click="claimField"
                      >
                        Claim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </div>`
            });
        }
      })
    },
    drawAllFields() {}
  },
  methods: {
    setupLeafletMap: function() {
      // Initiate map
      this.map = L.map("mapContainer", {
        zoomControl: false,
        editable: true
      }).setView(this.center, this.zoom);

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

      // //on zoom get neighbour fields
      // this.map.on("zoomend", function() {
      //   if (map.getZoom() <= 13) {
      //     scopeThis.fieldsShown = false;
      //     scopeThis.activeCoords = false;
      //     scopeThis.removePolygon();
      //   }
      // });

      this.map.on("moveend", function() {
        if (
          !scopeThis.fieldPolygon[0] &&
          !scopeThis.drawing &&
          !scopeThis.activePolygon &&
          !scopeThis.fieldsShown
        ) {
          let coords = map.getCenter();
          scopeThis.getAllFields(coords);
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
    getAllFields(coords) {
      if(this.$store.state.cluActive){
        this.$axios
          .post(`farms/fields/location-search/`, coords)
          .then(res => {
            this.activeCoords = coords;
            this.$store.dispatch("setNeighbor", res.data);
          })
          .catch(err => {
            this.activeCoords = false;
            this.$store.dispatch("setFields", { mpoly:[], neighbour_coords: [], dispute_coords:[]});
          });
      }
    },
    inviteNeighbor() {
      console.log("fds");
    }
  },
  mounted() {
    this.setupLeafletMap();
  },
  beforeMount(){
    this.$axios
        .get(`farms/fields/mpoly/me/`)
        .then(res => {
          console.log(res.data);
          this.map.flyTo(res.data[0].mpoly[0], 11)
          this.$store.dispatch("setMyFields", res.data);
        })
        .catch(err => {
          console.log(err);
        });
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
.custom-underline {
}
.custom-underline:hover {
  text-decoration: underline;
  text-decoration-color: #28aae1;
}
</style>
