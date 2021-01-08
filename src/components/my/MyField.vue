<template>
  <div
    class="custom-item flex hover:bg-gray-200 cursor-pointer"
    v-on:click="activate"
  >
    <div
      :class="{ 'salmon-border-selected': activeField === id }"
      class="salmon-border w-full pt-8 pb-2 text-center mx-8 border-b-2 border-gray-200"
    >
      <h1 class="text-2xl">My Field {{ id }}</h1>
      <p>Field Info</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyField",
  props: ["activeField", "id"],
  methods: {
    activate() {
      this.$store.dispatch("setFieldPolygon", [
        [45.73521210986779, 18.097615242004398],
        [45.732036911420124, 18.09757232666016],
        [45.73212677800949, 18.11259269714356],
        [45.73530197134789, 18.11250686645508]
      ]);
      this.$emit("activate");
    }
  }
};
</script>
