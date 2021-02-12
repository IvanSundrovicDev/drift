<template>
  <div class="rounded-md bg-drift-lighter-blue p-4 mb-10" v-if="showTooltip">
    <div class="flex">
      <div class="flex-shrink-0 my-auto">
        <font-awesome-icon
          class="fa-lg text-drift-blue"
          :icon="icon"
        ></font-awesome-icon>
      </div>
      <h3 class="ml-2 flex-shrink-0 text-drift-blue">
        {{ text }}
      </h3>
      <div class="flex justify-end w-full">
        <font-awesome-icon
          class="fa-lg text-drift-blue"
          icon="eye-slash"
          @click="hideTooltip"
        ></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoTooltip",
  props: {
    icon: {
      type: String
    },
    text: {
      type: String
    }
  },
  data() {
    return {
      showTooltip: true
    };
  },
  methods: {
    hideTooltip() {
      this.showTooltip = false;
    }
  }
};
</script>

<style scoped></style>
