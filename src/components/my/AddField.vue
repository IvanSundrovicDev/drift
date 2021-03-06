<template>
  <div class="bg-white m-2">
    <div class="p-4 border-b-2 border-gray-200">
      <font-awesome-icon
        class="float-right fa-lg hover:text-red-600 cursor-pointer"
        icon="times"
        v-on:click="close"
      ></font-awesome-icon>
      <div class="px-32">
        <div class="flex m-auto">
          <h1 class="text-2xl m-auto text-drift-blue">Add Field</h1>
        </div>
      </div>
    </div>
    <div class="flex py-5 pl-8 pr-4">
      <font-awesome-icon class="fa-lg pt-1" icon="search"></font-awesome-icon>
      <input
        class="w-full text-xl ml-4 focus:outline-none"
        type="text"
        v-model="searchField"
        v-on:input="search"
        v-if="!activeLocationName"
        placeholder="Search address"
      />
      <div v-else class="w-full">
        <font-awesome-icon
          class="float-right fa-lg hover:text-red-600 cursor-pointer"
          icon="times"
          v-on:click="removeLocation"
        ></font-awesome-icon>
        <h1 class="w-full text-xl ml-4">
          {{ activeLocationName }}
        </h1>
      </div>
    </div>
    <div
      v-if="locations[0] && !activeLocationName"
      class="border-t-2 border-gray-200"
    >
      <div
        v-for="item in locations"
        :key="item.id"
        class="flex py-3 hover:bg-gray-200 cursor-pointer px-8"
        v-on:click="getLocations(item)"
      >
        <font-awesome-icon
          class="fa-lg pt-1 text-drift-salmon"
          icon="map-marker-alt"
        ></font-awesome-icon>
        <h3 class="text-xl ml-5">{{ item.text }}</h3>
      </div>
    </div>
    <div>
      <div v-if="!fieldCoordinates" class="border-t-2 border-gray-200">
        <div
          v-on:click="initPolygonDraw"
          class="flex py-3 px-8 cursor-pointer"
          :class="{ 'bg-drift-blue': this.$store.state.polygonDraw }"
        >
          <font-awesome-icon
            :class="{ 'text-drift-blue': !this.$store.state.polygonDraw }"
            class="fa-lg mt-1"
            :icon="['far', 'map']"
          ></font-awesome-icon>
          <h3 class="text-xl ml-5">Select field location</h3>
        </div>
      </div>
      <div v-if="fieldCoordinates" class="border-t-2 border-gray-200">
        <div class="flex py-3 px-8 pr-4">
          <font-awesome-icon
            class="fa-lg mt-1"
            :icon="['far', 'map']"
          ></font-awesome-icon>
          <div class="w-full">
            <font-awesome-icon
              class="float-right fa-lg hover:text-red-600 cursor-pointer"
              icon="times"
              v-on:click="removeField"
            ></font-awesome-icon>
            <h1 class="w-full text-xl ml-4">Field selected</h1>
          </div>
        </div>
      </div>
      <div v-if="fieldCoordinates">
        <div class="flex border-t-2 border-gray-200 py-3 px-8">
          <font-awesome-icon
            class="fa-lg pt-1 text-drift-blue"
            icon="pen"
          ></font-awesome-icon>
          <input
            class="w-full text-xl ml-4 focus:outline-none"
            type="text"
            v-model="fieldName"
            placeholder="Name your field"
          />
        </div>
      </div>
      <div
        v-if="fieldName && fieldCoordinates"
        class="save-btn flex border-t-2 border-gray-200 py-3 px-8 hover:bg-drift-blue cursor-pointer"
        v-on:click="saveField"
      >
        <h1 class="text-2xl m-auto text-drift-blue">Save</h1>
      </div>
    </div>
    <div class="fixed border-t border-gray-200 top-16 right-0 bg-white">
      <FieldDataAdd v-on:fieldDataUpdate="updateFieldData($event)" />
    </div>
  </div>
</template>

<script>
import FieldDataAdd from "./FieldDataAdd";

export default {
  name: "AddField",
  components: {
    FieldDataAdd
  },
  props: ["farmId"],
  data() {
    return {
      searchField: "",
      activeLocationName: null,
      activeLocationCoordinates: null,
      fieldCoordinates: null,
      fieldName: "",
      locations: [],
      fieldData: {
        selectedCrop: {
          id: null
        },
        selectedHerbicide: {
          id: null
        },
        selectedMix: {
          id: null
        },
        selectedTrait: {
          id: null
        }
      }
    };
  },
  computed: {
    coordinatesChange() {
      return this.$store.state.polygonCoordinates;
    }
  },
  watch: {
    coordinatesChange(newCoordinates, oldCordinates) {
      this.fieldCoordinates = newCoordinates;
    }
  },
  methods: {
    search() {
      if (this.searchField.length >= 1) {
        let axiosNoAuth = this.$axios.create();
        delete axiosNoAuth.defaults.headers.common["Authorization"];

        axiosNoAuth
          .get(
            `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${this.searchField}&maxSuggestions=5&f=json`
          )
          .then(res => {
            this.locations = res.data.suggestions;
          });
      }
    },
    getLocations(item) {
      this.activeLocationName = item.text;
      let axiosNoAuth = this.$axios.create();
      delete axiosNoAuth.defaults.headers.common["Authorization"];

      axiosNoAuth
        .get(
          `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?magicKey=${item.magicKey}&f=json`
        )
        .then(res => {
          let activeLocation = [
            [
              res.data.candidates[0].extent.ymax,
              res.data.candidates[0].extent.xmin
            ],
            [
              res.data.candidates[0].extent.ymin,
              res.data.candidates[0].extent.xmax
            ]
          ];
          this.activeLocationCoordinates = activeLocation;
          this.$store.dispatch("setActiveLocation", activeLocation);
        });
    },
    initPolygonDraw() {
      this.$store.dispatch("setPolygonDraw", !this.$store.state.polygonDraw);
    },
    saveField() {
      this.fieldCoordinates.push(this.fieldCoordinates[0]);
      let field = {
        herbicide: null,
        tank_mix: null,
        crop: this.fieldData.selectedCrop.id || null,
        crop_trait: this.fieldData.selectedTrait.id || null,
        name: this.fieldName,
        mpoly: this.fieldCoordinates
      };
      this.$axios
        .post(`farms/${this.farmId}/fields/`, field)
        .then(res => {
          res.data.field.new = true;

          this.$store.dispatch("activateClu", false);
          this.$store.dispatch("refreshMyFields");
          this.$store.dispatch("refreshFields");
          this.$store.dispatch("setRemovedPolygon", false);
          this.$store.dispatch("setFields", res.data.field);
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Field successfully added!"
          });
        })
        .catch(err => {
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "There was an error adding your filed!"
          });
        });
    },
    close() {
      this.$emit("toggle-farm-sidebar");
      this.$store.dispatch("activateClu", false);
      this.$store.dispatch("setRemovedPolygon", false);
      this.$store.dispatch("setPolygonDraw", false);

      // if we didn't click on any of the fields in the list, then we can't show it after closing the "Add new field" popup
      if (!this.$store.state.activeField.id) return;

      this.$store.dispatch("setFields", this.$store.state.activeField);
    },
    removeLocation() {
      this.activeLocationName = null;
    },
    removeField() {
      this.fieldCoordinates = null;
      this.$store.dispatch("setRemovedPolygon", false);
    },
    updateFieldData(data) {
      this.fieldData = data;
    }
  }
};
</script>

<style>
.save-btn:hover h1 {
  color: white;
}
</style>
