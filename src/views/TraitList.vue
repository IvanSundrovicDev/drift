<template>
  <HerbicideTraitList :name="name" />
</template>

<script>
import HerbicideTraitList from "./../components/herbicideTraits/HerbicideTraitList";

export default {
  name: "TraitList",
  components: { HerbicideTraitList },
  data() {
    return {
      name: "Traits",
      data: []
    };
  },
  beforeMount() {
    this.$axios.get(`../herbicides/`).then(res => {
      this.data = res.data;
      console.log(res.data);
    });
  }
};
</script>

<style scoped></style>
