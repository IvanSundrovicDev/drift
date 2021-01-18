<template>
  <div
    class="custom-item flex hover:bg-gray-200 cursor-pointer"
    v-on:click="activate(field.mpoly)"
  >
    <div
      :class="{ 'salmon-border-selected': activeField === field.id }"
      class="salmon-border w-full pt-8 pb-2 text-center mx-8 border-b-2 border-gray-200"
    >
      <h1 class="text-2xl">{{ field.name }}</h1>
      <p>Field Info</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyField",
  props: ["activeField", "field"],
  methods: {
    activate(coords) {
      this.$store.dispatch("setActiveLocation", coords[0]);
      this.$store.dispatch("setFieldPolygon", coords);
      this.$emit("activate");
    }
  }
};
</script>
