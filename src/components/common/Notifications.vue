<template>
  <div class="notifications fixed right-4 bottom-5">
    <transition-group name="list">
      <Notification
        v-for="item in notifications"
        :key="item.id"
        class="mt-3"
        :notification="item"
      />
    </transition-group>
  </div>
</template>

<script>
import Notification from "./Notification";

export default {
  name: "Notifications",
  components: { Notification },
  data() {
    return {
      notifications: []
    };
  },
  computed: {
    getNotifications() {
      return this.$store.state.notifications;
    }
  },
  watch: {
    getNotifications(newNotifications, oldNotifications) {
      this.notifications = newNotifications;
      console.log(this.notifications);
    }
  }
};
</script>

<style scoped>
.notifications {
  z-index: 6800000;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
