<template>
  <app-layout>
    <GoogleMap></GoogleMap>
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
  }
};
</script>
