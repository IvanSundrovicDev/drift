<template>
  <div :class="{ 'h-full': farmOpen }">
    <div
      v-on:click="toggle(farm.id)"
      class="flex cursor-pointer border-b-2 border-gray-200"
    >
      <div class="flex m-auto my-8 pl-6 ">
        <h1 class="text-2xl text-drift-blue">{{ farm.name }}</h1>
        <div v-if="!farmOpen" class="arrow-down m-auto ml-2"></div>
        <div v-else class="arrow-up m-auto ml-2"></div>
      </div>
    </div>
    <div v-if="farmOpen" class="overflow-y-auto">
      <MyField />
      <MyField />
      <MyField />
      <MyField />
      <MyField />
      <MyField />
    </div>
  </div>
</template>

<script>
import MyField from "./MyField";
export default {
  name: "MyFarm",
  components: {
    MyField
  },
  props: ["farm"],
  data() {
    return {
      farmOpen: false
    };
  },
  methods: {
    toggle(id) {
      this.farmOpen = !this.farmOpen;
      this.$emit("toggle-farm", id);
    }
  }
};
</script>

<style>
.arrow-down {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;

  border-top: 8px solid #28aae1;
}
.arrow-up {
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;

  border-bottom: 8px solid #28aae1;
}
</style>
