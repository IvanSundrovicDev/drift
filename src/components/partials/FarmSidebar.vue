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
      <AddField
        v-on:toggle-farm-sidebar="active = 'farmSidebar'"
        :farmId="activeFarm"
      />
    </div>
    <div v-if="active === 'addFarm'">
      <AddFarm
        v-on:toggle-farm-sidebar="active = 'farmSidebar'"
        v-on:farmAdded="closeAndRefreshFarms"
      />
    </div>
    <div v-if="active === 'addNeighbor'">
      <AddNeighbor
        v-on:toggle-farm-sidebar="active = 'farmSidebar'"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        $store.state.tutorial.loaded &&
          !$store.state.tutorial.farmTutorialDone &&
          $store.state.tutorial.farmTutorial === 0
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setFarmTutorialStep')"
        :direction="'left'"
        :text="
          'This is your farms page. Here you can view, edit and add farms. To view the fields within a farm, just select the farm from your list.'
        "
        class="top-0 left-12 fixed ml-80 mt-24"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.farmTutorialDone &&
          $store.state.tutorial.farmTutorial === 1 &&
          activeFarm
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setFarmTutorialStep')"
        :direction="'left'"
        :text="
          'Great! Under each farm, you’ll have a list of fields. There’s no field under this farm, just yet, so let’s go ahead and add one below'
        "
        class="top-0 left-12 fixed ml-80 mt-64"
      />
    </div>
  </div>
</template>

<script>
import MyFarm from "../my/MyFarm";
import AddField from "../my/AddField";
import AddNeighbor from "../my/AddNeighbor";
import AddFarm from "../my/AddFarm";
import Tutorial from "../common/Tutorial";

export default {
  name: "FarmSidebar",
  components: {
    MyFarm,
    AddField,
    AddNeighbor,
    AddFarm,
    Tutorial
  },
  data() {
    return {
      active: "farmSidebar",
      activeFarm: null,
      farms: []
    };
  },
  computed: {
    newActiveField() {
      return this.$store.state.addedField;
    },
    addNeighbor() {
      return this.$store.state.addNeighbor
    }
  },
  watch: {
    newActiveField(newField, oldField) {
      this.active = "farmSidebar";
      //this.activeFarm = newField.farm;
    },
    addNeighbor(newState, oldState) {
      newState ? this.active = 'addNeighbor' : this.active = 'farmSidebar'
    }
  },
  methods: {
    getFarms() {
      if (this.$route.name === "Dashboard") {
        this.$axios
          .get(`farms/me/`)
          .then(res => {
            this.farms = res.data;
          })
          .catch(err => {});
      }
    },
    activateFarm(id) {
      if (!this.activeFarm) {
        this.activeFarm = id;
      } else {
        this.activeFarm = null;
      }
    },
    activateAddField() {
      this.active = "addField";
    },
    activateAddFarm() {
      this.active = "addFarm";
    },
    closeAndRefreshFarms() {
      this.active = "farmSidebar";
      this.getFarms();
    }
  },
  beforeMount() {
    this.getFarms();
    if (!this.$store.state.farmTutorialDone) {
      this.$store.dispatch("tutorial/setUserTutorial");
    }
  }
};
</script>
<style></style>
