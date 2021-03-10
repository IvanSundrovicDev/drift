<template>
  <div class="w-48">
    <div class="dots">
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
              v-on:click="open = 'delete'"
            >
              <Delete class="my-auto invert-to-white mr-4" />
              <h1 class="text-xl">Delete field</h1>
            </div>
            <div
              v-on:click="addNeighbor"
              class="flex list-item my-4 p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer"
            >
              <Neighbor class="my-auto invert-to-white mr-2" />
              <h1 class="text-xl">Add adjacent field</h1>
            </div>
          </div>

          <div v-if="open === 'rename'" class="mx-5">
            <LeftArrow
              class="my-auto mt-4 mr-4 cursor-pointer"
              v-on:click="open = ''"
            />
            <div class="flex mb-6 mt-2">
              <Edit class="my-auto mr-4" />
              <h1 class="text-xl">Rename field</h1>
            </div>
            <div class="flex mt-6 border-b-2 pb-3 border-drift-blue">
              <input
                class="w-full text-xl focus:outline-none"
                type="text"
                v-model="fieldName"
                placeholder="Enter new name"
              />
            </div>
            <div class="pt-3 pb-5 flex">
              <button
                class="rounded-lg py-2 m-auto w-full designActionButton"
                v-on:click="renameField()"
              >
                Save
              </button>
            </div>
          </div>

          <div v-if="open === 'delete'" class="mx-5 w-48">
            <LeftArrow
              class="my-auto mt-4 mr-4 cursor-pointer"
              v-on:click="open = ''"
            />
            <div class="flex mb-6 mt-2">
              <Delete class="my-auto mr-4" />
              <h1 class="text-xl">Delete field?</h1>
            </div>
            <div class="pt-3 pb-5 flex">
              <button
                class="rounded-lg w-20 py-1 m-auto hover:bg-red-600 hover:text-white text-xl border-2 border-red-600 text-red-600"
                v-on:click="deleteField()"
              >
                Yes
              </button>
              <button
                class="ml-auto rounded-lg w-20 py-1 m-auto hover:bg-drift-blue hover:text-white text-xl border-2 border-drift-blue text-drift-blue"
                v-on:click="open = ''"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{ 'salmon-border-selected': $store.state.activeField.id === field.id }"
      class="w-full field-item pb-2 text-center mx-8 border-b-2 border-gray-200 cursor-pointer"
      v-on:click="activateField(field)"
    >
      <h1 class="text-2xl">{{ field.name }}</h1>
      <p>{{ field.area }} ac.</p>
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
      open: "",
      fieldName: "",
      crops: [],
      traits: []
    };
  },
  methods: {
    activateField(field) {
      field.new = false
      this.$store.dispatch("setFields", field);                                                                         
      this.$store.dispatch("setActiveLocation", field.coords);
    },
    activatePopup() {
      this.activateField(this.field);
      this.$emit("activatePopup", this.field.id);
    },
    addNeighbor() {
      this.$emit("activatePopup", this.field.id);
      this.$store.dispatch("activateClu", true)
      this.$store.dispatch("setAddNeighbor", true);
    },
    deleteField() {
      this.$axios
        .delete(`/farms/${this.field.farm}/fields/${this.field.id}/`)
        .then(res => {
          this.$store.dispatch("setAllToNeighbor");
          this.$store.dispatch("deleteField", this.field.uuid);
          this.$store.dispatch("refreshFields");
          this.$store.dispatch("refreshMyFields");
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Field successfully removed!"
          });
          this.$destroy();
        })
        .catch(err => {
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "There was an error removing field"
          });
        });
    },
    renameField() {
      let field = {
        name: this.fieldName
      };
      this.$axios
        .patch(`/farms/${this.field.farm}/fields/${this.field.id}/`, field)
        .then(res => {
          this.menuOpen = false;
          this.open = "";
          this.activatePopup();
          this.$store.dispatch("updateField", this.field);
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Field successfully renamed!"
          });
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "There was an error renaming field!"
          });
        });
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
