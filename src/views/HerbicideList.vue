<template>
  <HerbicideTraitList :name="name" :data="data.herbicide" />
</template>

<script>
import HerbicideTraitList from "./../components/herbicideTraits/HerbicideTraitList";

export default {
  name: "HerbicideList",
  components: { HerbicideTraitList },
  data() {
    return {
      name: "Herbicides",
      data: {}
    };
  },
  beforeMount() {
    this.$axios.get(`../herbicides/`).then(res => {
      this.data = res.data;
    });
  }
};
</script>

<style scoped></style>
