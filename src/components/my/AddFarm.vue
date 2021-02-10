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
          <h1 class="text-2xl m-auto text-drift-blue">Add Farm</h1>
        </div>
      </div>
    </div>
    <div class="flex py-5 pr-4 border-b-2 border-gray-200">
      <input
        class="w-full text-xl ml-4 focus:outline-none"
        type="text"
        v-model="farm.name"
        placeholder="Name your farm"
      />
    </div>
    <div
      class="save-btn flex py-3 px-8 hover:bg-drift-blue cursor-pointer"
      v-on:click="saveFarm"
    >
      <h1 class="text-2xl m-auto text-drift-blue">
        Save
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddFarm",
  data() {
    return {
      farm: {
        name: "",
        account: 2
      }
    };
  },
  methods: {
    saveFarm() {
      this.$axios
        .post(`farms/me/`, this.farm)
        .then(res => {
          this.$emit("farmAdded");
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Your farm has been successfully created!"
          });
        })
        .catch(err => {
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "Adding farm was unsuccessful!"
          });
        });
    }
  }
};
</script>

<style scoped></style>
