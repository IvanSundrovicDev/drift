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
      let baseItems = [];
      this.data.selectedItems.forEach(item => baseItems.push(item.id));
      let postItems = baseItems.concat(items);
      this.$axios
        .post(`herbicides/me/`, { herbicide_ids: postItems })
        .then(res => {
          this.getHerbicides();
        })
        .catch(err => {
        });
    },
    deleteAddedItems(items) {
      let baseItems = [];
      this.data.selectedItems.forEach(item => baseItems.push(item.id));
      let postItems = baseItems.filter(el => !items.includes(el));
      this.$axios
        .post(`herbicides/me/`, { herbicide_ids: postItems })
        .then(res => {
          this.getHerbicides();
        })
        .catch(err => {
        });
    },
    getHerbicides() {
      this.$axios
        .get(`herbicides/`)
        .then(res => {
          this.data.allItems = res.data.herbicide;
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "Successfully got herbicides"
          });
          this.$axios
            .get(`herbicides/me/`)
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
            });
        })
        .catch(err => {
        });
    }
  },
  beforeMount() {
    this.getHerbicides();
  }
};
</script>

<style scoped></style>
