<template>
  <div class="w-48">
    <div class="w-full dots">
      <font-awesome-icon
        class="fa-2x mt-2 hover:text-drift-blue cursor-pointer"
        icon="ellipsis-h"
        v-on:click="activatePopup()"
      ></font-awesome-icon>
      <div v-if="activePopup === field.id" class="fixed flex ml-11 -mt-11">
        <div class="menu-arrow bg-t-white mt-4"></div>
        <div class="bg-white rounded-lg">
          <div v-if="!open" class="mx-3">
            <div
              class="flex list-item my-4 p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer"
              v-on:click="open = 'rename'"
            >
              <Edit class="my-auto invert-to-white mr-4" />
              <h1 class="text-xl">Rename field</h1>
            </div>
            <div
              class="flex list-item my-4 p-2 rounded-md hover:bg-red-500 hover:text-white cursor-pointer"
            >
              <Delete class="my-auto invert-to-white mr-4" />
              <h1 class="text-xl">Delete field</h1>
            </div>
            <div
              v-on:click="addNeighbor"
              class="flex list-item my-4 p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer"
            >
              <Neighbor class="my-auto invert-to-white mr-2" />
              <h1 class="text-xl">Add neighboring boundary</h1>
            </div>
          </div>
          <div v-if="open === 'rename'" class="mx-5">
            <LeftArrow
              class="my-auto mt-4 mr-4 cursor-pointer"
              v-on:click="open = ''"
            />
            <div class="flex mb-6 mt-2" v-on:click="open = 'rename'">
              <Edit class="my-auto mr-4" />
              <h1 class="text-xl">Rename field</h1>
            </div>
            <div class="flex mt-6 border-b-2 pb-3 border-drift-blue">
              <input
                class="w-full text-xl focus:outline-none"
                type="text"
                placeholder="Enter new name"
              />
            </div>
            <div class="pt-3 pb-5 flex">
              <button class="rounded-lg py-2 m-auto w-full designActionButton">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{ 'salmon-border-selected': activeField === field.id }"
      class="w-full field-item pb-2 text-center mx-8 border-b-2 border-gray-200 cursor-pointer"
      v-on:click="activateField(field)"
    >
      <h1 class="text-2xl">{{ field.name }}</h1>
      <p>Field Info</p>
    </div>
  </div>
</template>

<script>
import Edit from "../../assets/images/icons/edit.svg";
import Delete from "../../assets/images/icons/delete.svg";
import Neighbor from "../../assets/images/icons/neighborField.svg";
import LeftArrow from "../../assets/images/icons/LeftArrow.svg";

export default {
  components: {
    Edit,
    Delete,
    Neighbor,
    LeftArrow
  },
  name: "MyField",
  props: ["activeField", "activePopup", "field"],
  data() {
    return {
      menuOpen: false,
      open: ""
    };
  },
  methods: {
    activateField(field) {
      this.$store.dispatch("setActiveLocation", field.mpoly[0]);
      this.$store.dispatch("setFieldPolygon", field.mpoly);
      this.$store.dispatch("drawNeighbor", field);
      this.$emit("activateField");
    },
    activatePopup() {
      this.activateField(this.field)
      this.$emit("activatePopup", this.field.id);
    },
    addNeighbor(){
      this.$emit("activatePopup", this.field.id);
      this.$store.dispatch("setAddNeighbor", true);
    }
  }
};
</script>
<style scoped>
.dots {
  margin-left: 13.5rem;
}
.menu-arrow {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
}
</style>
