<template>
  <div
    class="ml-24 pt-16 fixed z-500"
    :class="{ 'h-screen': active === 'farmSidebar' }"
  >
    <div v-show="active === 'farmSidebar'" class=" h-full bg-white w-64">
      <div class="h-full pb-24">
        <div class="max-h-full overflow-y-auto">
          <div v-for="item in farms" :key="item.id" class="max-h-full">
            <MyFarm
              v-if="!activeFarm || activeFarm === item.id"
              v-on:toggle-farm="activateFarm($event)"
              :farm="item"
            ></MyFarm>
          </div>
        </div>
      </div>
      <div
        v-on:click="activateAddField"
        v-show="activeFarm"
        class="flex fixed w-64 z-20 bg-white bottom-0 cursor-pointer border-t-2 border-gray-200"
      >
        <div class="flex m-auto my-8 pl-6">
          <h1 class="text-2xl text-drift-blue">Add Field</h1>
          <img class="m-auto ml-2" src="../../assets/images/icons/add.png" />
        </div>
      </div>
      <div
        v-on:click="activateAddFarm"
        v-show="!activeFarm"
        class="flex fixed w-64 z-20 bg-white bottom-0 cursor-pointer border-t-2 border-gray-200"
      >
        <div class="flex m-auto my-8 pl-6">
          <h1 class="text-2xl text-drift-blue">Add Farm</h1>
          <img class="m-auto ml-2" src="../../assets/images/icons/add.png" />
        </div>
      </div>
    </div>
    <div v-if="active === 'addField'">
      <AddField v-on:toggle-farm-sidebar="active = 'farmSidebar'" />
    </div>
    <div v-if="active === 'addFarm'">
      <AddFarm v-on:toggle-farm-sidebar="active = 'farmSidebar'" />
    </div>
  </div>
</template>

<script>
import MyFarm from "../my/MyFarm";
import AddField from "../my/AddField";
import AddFarm from "../my/AddFarm";

export default {
  name: "FarmSidebar",
  components: {
    MyFarm,
    AddField,
    AddFarm
  },
  data() {
    return {
      active: "farmSidebar",
      activeFarm: null,
      farms: [
        { id: 1, name: "Test Farm" },
        { id: 2, name: "Test Farm" },
        { id: 3, name: "Test Farm" }
      ]
    };
  },
  methods: {
    activateFarm(id) {
      if (!this.activeFarm) {
        this.activeFarm = id;
      } else {
        this.activeFarm = null;
      }
    },
    activateAddField() {
      this.active = "addField";
      this.$store.dispatch("setRemovedPolygon", false);
    },
    activateAddFarm() {
      this.active = "addFarm";
      this.$store.dispatch("setRemovedPolygon", false);
    }
  }
};
</script>
