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
          <h1 class="text-2xl m-auto text-drift-blue">Add Adjacent Field</h1>
        </div>
      </div>
    </div>
    <div>
      <div v-if="!fieldCoordinates">
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
      <div>
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
        v-if="fieldCoordinates"
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
    FieldDataAdd,
  },
  data() {
    return {
      fieldCoordinates: null,
      fieldName: "",
      fieldData: {
        selectedCrop: {
          id: null,
        },
        selectedHerbicide: {
          id: null,
        },
        selectedMix: {
          id: null,
        },
        selectedTrait: {
          id: null,
        },
      },
    };
  },
  computed: {
    coordinatesChange() {
      return this.$store.state.polygonCoordinates;
    },
  },
  watch: {
    coordinatesChange(newCoordinates, oldCordinates) {
      this.fieldCoordinates = newCoordinates;
    },
  },
  methods: {
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
        mpoly: this.fieldCoordinates,
      };
      this.$axios
        .post(`farms/fields/`, field)
        .then((res) => {
          this.$store.dispatch("setAllToNeighbor");
          this.$store.dispatch("farmNoActive")
          this.$store.dispatch("setAddNeighbor", false);
          this.$store.dispatch("activateClu", false)
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Neighbor field successfully added!",
          });
        })
        .catch((err) => {
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "There was an error adding neighbor filed!",
          });
        });
    },
    close() {
      console.log("close");
      this.$store.dispatch("activateClu", false)
      this.$emit("toggle-farm-sidebar");
      this.$store.dispatch("setAddNeighbor", false);
      this.$store.dispatch("setRemovedPolygon", false);
    },
    removeField() {
      this.fieldCoordinates = null;
      this.$store.dispatch("setRemovedPolygon", false);
    },
    updateFieldData(data) {
      this.fieldData = data;
    },
  },
};
</script>

<style>
.save-btn:hover h1 {
  color: white;
}
</style>
