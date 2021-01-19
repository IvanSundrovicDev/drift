<template>
  <HerbicideTraitList
    :name="name"
    :data="data"
    v-on:postAddedItems="postAddedItems"
    v-on:deleteAddedItems="deleteAddedItems"
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
      let baseItems = [];
      this.data.selectedItems.forEach(item => baseItems.push(item.id));
      let postItems = baseItems.concat(items);
      this.$axios
        .post(`../farms/crop-traits/me/`, { crop_trait_ids: postItems })
        .then(res => {
          this.getTraits();
        })
        .catch(err => {
          console.log({ err });
        });
    },
    deleteAddedItems(items) {
      this.$axios
        .delete(`../farms/crop-traits/me/`, { herbicide_ids: items })
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
              this.data.selectedItems = res.data.my_crop_trait.crop_traits;
              let selectedItems = this.data.selectedItems;
              this.data.allItems = this.data.allItems.filter(function(
                objFromA
              ) {
                return !selectedItems.find(function(objFromB) {
                  return objFromA.id === objFromB.id;
                });
              });
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
