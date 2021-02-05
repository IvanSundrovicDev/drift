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

export default {
  name: "Map",
  data: function() {
    return {
      map: null,
      center: [45.72727000000003, 18.10650000000004],
      active: false,
      fieldPolygon: []
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
    }
  },
  watch: {
    locationChange(newLocation, oldLocation) {
      this.map.panTo(new L.LatLng(newLocation[0], newLocation[1]));
    },
    initDrawPolygon(newState, oldState) {
      if (newState) {
        this.polygonDrawer.enable();
      } else {
        this.polygonDrawer.disable();
      }
    },
    drawPolygon(newPolygon, oldPolygon) {
      this.removePolygon();
      var polygon = L.polygon(newPolygon).setStyle({color: "#" + (Math.floor(Math.random()*16777215).toString(16))}).addTo(this.map);
    },
    removedPolygon(newState, oldState) {
      this.removePolygon();
      this.$store.dispatch("setRemovedPolygon", true);
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

      // catch drawn polygon
      this.map.on("draw:created", function(e) {
        let layer = e.layer;

        let newCoords = [];

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
            newCoords.push([value.lat, value.lng]);
          });

          scopeThis.fieldPolygon = newCoords;

          scopeThis.map.fitBounds(layer.getBounds());
        });
      });
    },
    removePolygon() {
      for (let i in this.map._layers) {
        if (this.map._layers[i]._path !== undefined) {
          try {
            this.map.removeLayer(this.map._layers[i]);
          } catch (e) {
            console.log("problem with " + e + this.map._layers[i]);
          }
        }
      }
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
