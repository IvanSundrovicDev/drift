<template>
  <div class="ml-24 pt-16 fixed z-20 h-screen">
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
        v-on:click="active = 'addField'"
        class="flex fixed w-64 z-20 bg-white bottom-0 cursor-pointer border-t-2 border-gray-200"
      >
        <div class="flex m-auto my-8 pl-6">
          <h1 class="text-2xl text-drift-blue">Add Field</h1>
          <img
            class="m-auto ml-2"
            src="../../assets/images/icons/add.png"
            alt="add_field"
          />
        </div>
      </div>
    </div>
    <div v-show="active === 'addField'">
      <AddField v-on:toggle-farm-sidebar="active = 'farmSidebar'" />
    </div>
  </div>
</template>

<script>
import MyFarm from "../my/MyFarm";
import AddField from "../my/AddField";

export default {
  name: "FarmSidebar",
  components: {
    MyFarm,
    AddField
  },
  data() {
    return {
      active: "farmSidebar",
      activeFarm: null,
      farms: [
        { id: 1, name: "FASD" },
        { id: 2, name: "asd" },
        { id: 3, name: "dasda" },
        { id: 4, name: "asdc" },
        { id: 5, name: "gfdg" },
        { id: 6, name: "hzgfd" },
        { id: 7, name: "bngf" },
        { id: 8, name: "rgegd" },
        { id: 9, name: "hgfgdf" },
        { id: 10, name: "233" }
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
    }
  }
};
</script>
