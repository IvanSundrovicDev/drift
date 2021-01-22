<template>
  <div class="flex tutorial">
    <div v-if="direction === 'left'" class="arrow-left mt-4"></div>
    <div class="w-96 p-4 bg-drift-blue text-white rounded-2xl">
      <font-awesome-icon
        class="flex ml-auto text-white fa-lg hover:text-black cursor-pointer"
        icon="times"
        v-on:click="$emit('exit')"
      ></font-awesome-icon>
      <p>
        {{ text }}
      </p>
      <div
        v-on:click="$emit('exit')"
        class="rounded-xl mt-5 inline-block px-2 py-1 border border-white cursor-pointer hover:"
      >
        Got it
      </div>
    </div>
    <div v-if="direction === 'right'" class="arrow-right mt-4"></div>
  </div>
</template>

<script>
export default {
  name: "Tutorial",
  props: ["text", "direction"]
};
</script>

<style>
.tutorial {
  z-index: 700;
}
</style>
