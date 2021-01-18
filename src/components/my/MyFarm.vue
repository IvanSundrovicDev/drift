<template>
  <div>
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
        <MyField
          v-for="item in fields"
          :field="item"
          :active-field="fieldActive"
          v-on:activate="fieldActive = item"
          :key="item.id"
        />
      </div>
    </div>
    <div
      v-if="farmOpen && fieldActive"
      class="fixed border-t border-gray-200 top-16 right-0 bg-white"
    >
      <FieldDataEdit />
    </div>
  </div>
</template>

<script>
import MyField from "./MyField";
import FieldDataEdit from "./FieldDataEdit";

export default {
  name: "MyFarm",
  components: {
    MyField,
    FieldDataEdit
  },
  props: ["farm"],
  data() {
    return {
      farmOpen: false,
      fields: [],
      fieldActive: ""
    };
  },
  methods: {
    toggle(id) {
      this.farmOpen = !this.farmOpen;
      this.fieldActive = "";
      this.$emit("toggle-farm", id);
      this.$store.dispatch("setRemovedPolygon", false);
      this.$axios
        .get(`../farms/${id}/fields/`)
        .then(res => {
          console.log(res.data);
          this.fields = res.data.field;
        })
        .catch(err => {
          console.log({ err });
        });
    }
  }
};
</script>
