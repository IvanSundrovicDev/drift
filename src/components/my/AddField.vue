<template>
  <div class="bg-white m-2">
    <div class="p-4 border-b-2 border-gray-200">
      <font-awesome-icon
        class="float-right fa-lg hover:text-red-600 cursor-pointer"
        icon="times"
        v-on:click="$emit('toggle-farm-sidebar')"
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
        v-if="!activeLocation"
        placeholder="Search address"
      />
      <div v-else class="w-full">
        <font-awesome-icon
          class="float-right fa-lg hover:text-red-600 cursor-pointer"
          icon="times"
          v-on:click="activeLocation = null"
        ></font-awesome-icon>
        <h1 class="w-full text-xl ml-4">
          {{ activeLocation }}
        </h1>
      </div>
    </div>
    <div v-if="locations && !activeLocation" class="border-t-2 border-gray-200">
      <div
        v-for="item in locations"
        :key="item.id"
        class="flex py-3 hover:bg-gray-200 cursor-pointer px-8"
        v-on:click="getLocations(item)"
      >
        <font-awesome-icon
          class="fa-lg pt-1 text-drift-salmon "
          icon="map-marker-alt"
        ></font-awesome-icon>
        <h3 class="text-xl ml-5">{{ item.text }}</h3>
      </div>
    </div>
    <div v-else-if="activeLocation">
      <div class="border-t-2 border-gray-200">
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
        <div
          class="save-btn flex border-t-2 border-gray-200 py-3 px-8 hover:bg-drift-blue cursor-pointer"
        >
          <h1 class="text-2xl m-auto text-drift-blue">Save</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddField",
  data() {
    return {
      searchField: "",
      activeLocation: null,
      fieldCoordinates: null,
      fieldName: "",
      locations: []
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
            `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?text=${this.searchField}&maxSuggestions=5&f=json`,
            {}
          )
          .then(res => {
            this.locations = res.data.suggestions;
          });
      }
    },
    getLocations(item) {
      this.activeLocation = item.text;
      let axiosNoAuth = this.$axios.create();
      delete axiosNoAuth.defaults.headers.common["Authorization"];

      axiosNoAuth
        .get(
          `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?magicKey=${item.magicKey}&f=json`,
          {}
        )
        .then(res => {
          let activeLocation = [
            res.data.candidates[0].location.y,
            res.data.candidates[0].location.x
          ];
          this.$store.dispatch("setActiveLocation", activeLocation);
        });
    },
    initPolygonDraw() {
      this.$store.dispatch("setPolygonDraw", !this.$store.state.polygonDraw);
    }
  }
};
</script>

<style>
.save-btn:hover h1 {
  color: white;
}
</style>
