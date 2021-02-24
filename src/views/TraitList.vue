<template>
  <TraitMenager
    :name="name"
    :data="data"
    v-on:postAddedItems="postAddedItems"
    v-on:deleteAddedItems="deleteAddedItems"
  />
</template>

<script>
import TraitMenager from "./../components/menagers/TraitMenager";

export default {
  name: "TraitList",
  components: { TraitMenager },
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
      let count = items.length;
      this.$axios
        .post(`farms/crop-traits/me/`, { crop_trait_ids: postItems })
        .then(res => {
          this.getTraits();
          this.$store.dispatch("addNotification", {
            type: "success",
            message:
              count > 1
                ? "Traits successfully added to your list!"
                : "Trait successfully added to your list!"
          });
        })
        .catch(err => {});
    },
    deleteAddedItems(items) {
      let baseItems = [];
      this.data.selectedItems.forEach(item => baseItems.push(item.id));
      let postItems = baseItems.filter(el => !items.includes(el));
      let count = items.length;
      this.$axios
        .post(`farms/crop-traits/me/`, { crop_trait_ids: postItems })
        .then(res => {
          this.getTraits();
          this.$store.dispatch("addNotification", {
            type: "success",
            message:
              count > 1
                ? "Traits successfully removed from your list!"
                : "Trait successfully removed from your list!"
          });
        })
        .catch(err => {});
    },
    getTraits() {
      this.$axios
        .get(`farms/crop-traits/`)
        .then(res => {
          this.data.allItems = res.data;
          this.$axios
            .get(`farms/crop-traits/me/`)
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
            .catch(err => {});
        })
        .catch(err => {});
    }
  },
  beforeMount() {
    this.getTraits();
  }
};
</script>
