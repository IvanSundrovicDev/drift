<template>
  <div class="ml-24 pt-16 fixed z-20 h-screen w-64 bg-white">
    <div class="h-full pb-24">
      <div class="max-h-full overflow-y-auto">
        <div
          v-for="item in farms"
          :key="item.id"
          v-on:click="activateFarm(item.id)"
          class="max-h-full"
        >
          <MyFarm v-if="!active || active === item.id" :farm="item"></MyFarm>
        </div>
      </div>
    </div>
    <div
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
</template>

<script>
import MyFarm from "../my/MyFarm";

export default {
  name: "FarmSidebar",
  components: {
    MyFarm
  },
  data() {
    return {
      active: null,
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
      if (!this.active) {
        this.active = id;
      } else {
        this.active = null;
      }
    }
  }
};
</script>
