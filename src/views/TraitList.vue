<template>
  <HerbicideTraitList
    :name="name"
    :data="data"
    v-on:postAddedItems="postAddedItems"
  />
</template>

<script>
import HerbicideTraitList from "./../components/herbicideTraits/HerbicideTraitList";

export default {
  name: "TraitList",
  components: { HerbicideTraitList },
  data() {
    return {
      name: "Traits",
      data: {
        allItems: [],
        selectedItems: [],
        selectedItemsId: []
      }
    };
  },
  methods: {
    postAddedItems(items) {
      let allSelectedItems = this.data.selectedItemsId.concat(items);
      this.$axios
        .post(`../farms/crop-traits/me/`, { crop_traits: allSelectedItems })
        .then(res => {
          this.getTraits();
        })
        .catch(err => {
          console.log({ err });
        });
    },
    getTraits() {
      this.$axios
        .get(`../farms/crop-traits/`)
        .then(res => {
          this.data.allItems = res.data.crop_trait;
          this.$axios
            .get(`../farms/crop-traits/me/`)
            .then(res => {
              this.data.selectedItemsId = res.data.crop_traits;
              this.data.selectedItems = this.data.allItems.filter(el =>
                this.data.selectedItemsId.includes(el.id)
              );
              this.data.allItems = this.data.allItems.filter(
                el => !this.data.selectedItems.includes(el)
              );
            })
            .catch(err => {
              console.log({ err });
            });
        })
        .catch(err => {
          console.log({ err });
        });
    }
  },
  beforeMount() {
    this.getTraits();
  }
};
</script>

<style scoped></style>
