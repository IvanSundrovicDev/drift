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
  name: "HerbicideList",
  components: { HerbicideTraitList },
  data() {
    return {
      name: "Herbicides",
      data: {
        allItems: [],
        selectedItems: [],
        selectedItemsId: []
      }
    };
  },
  methods: {
    postAddedItems(items) {
      this.$axios
        .post(`../herbicides/me/`, { herbicide_ids: items })
        .then(res => {
          this.getHerbicides();
        })
        .catch(err => {
          console.log({ err });
        });
    },
    getHerbicides() {
      this.$axios
        .get(`../herbicides/`)
        .then(res => {
          this.data.allItems = res.data.herbicide;
          console.log(res.data);
          this.$axios
            .get(`../herbicides/me/`)
            .then(res => {
              this.data.selectedItems = res.data.my_herbicide.herbicides;
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
    this.getHerbicides();
  }
};
</script>

<style scoped></style>
