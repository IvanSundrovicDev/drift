<template>
  <app-layout>
    <GoogleMap style="margin-left: 200px;margin-top: 100px"></GoogleMap>
  </app-layout>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import GoogleMap from "../components/GoogleMap";

export default {
  name: "Dashboard",
  components: {
    AppLayout,
    GoogleMap
  },
  data: function() {
    return {
      test: []
    };
  },
  mounted() {
    this.$axios.get("users").then(data => {
      this.test = data.data;
    });
  }
};
</script>
