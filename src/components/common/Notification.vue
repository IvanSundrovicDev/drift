<template>
  <div class="p-3 rounded-full bg-drift-blue w-80" :class="notification.type">
    <div class="flex">
      <h1 class="text-lg w-full pl-4 text-white text-center">
        {{ notification.message }}
      </h1>
      <font-awesome-icon
        class="ml-auto my-auto mr-2 fa-md text-white hover:text-black cursor-pointer"
        icon="times"
        v-on:click="removeNotification"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "Notification",
  props: ["notification"],
  data() {
    return {
      timeout: null
    };
  },
  methods: {
    removeNotification() {
      this.$store.dispatch("removeNotification", this.notification.id);
    }
  },
  created() {
    this.timeout = setTimeout(() => {
      this.removeNotification();
    }, 5000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped>
.notifications {
  z-index: 580;
}
.success {
  background-color: #28aae1;
}
.error {
  background-color: red;
}
</style>
