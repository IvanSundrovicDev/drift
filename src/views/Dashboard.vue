<template>
  <app-layout><Map></Map></app-layout>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import Map from "./../components/Map";

export default {
  name: "Dashboard",
  components: {
    AppLayout,
    Map
  },
  data: function() {
    return {
      test: []
    };
  }
};
</script>
