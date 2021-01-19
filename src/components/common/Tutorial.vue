<template>
  <div class="flex tutorial">
    <div class="arrow-left mt-4"></div>
    <div class="w-96 p-4 bg-drift-blue text-white rounded-2xl">
      <font-awesome-icon
        class="flex ml-auto text-white fa-lg hover:text-black cursor-pointer"
        icon="times"
        v-on:click="$emit('exit')"
      ></font-awesome-icon>
      <p>
        Great! Under each farm, you’ll have a list of fields. There’s no field
        under this farm, just yet, so let’s go ahead and add one below
      </p>
      <div
        v-on:click="$emit('exit')"
        class="rounded-xl mt-5 inline-block px-2 py-1 border border-white cursor-pointer hover:"
      >
        Got it
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tutorial"
};
</script>

<style>
.tutorial {
  z-index: 700;
}
</style>
