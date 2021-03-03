<template>
  <TraitManager
    :name="name"
    :items="data"
    v-on:postAddedItems="postAddedItems"
    v-on:deleteAddedItems="deleteAddedItems"
  />
</template>

<script>
import TraitManager from "../components/managers/TraitManager";

export default {
  name: "TraitList",
  components: { TraitManager },
  data() {
    return {
      name: "Traits",
      data: {
        allItems: {},
        selectedItems: [],
        selectedItemsId: {}
      }
    };
  },
  methods: {
    postAddedItems(items) {
      let baseItems = [];
      for(const i in this.data.selectedItems){
        this.data.selectedItems[i].forEach(el => {
          baseItems.push(el.id)
        });
      }
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
      for(const i in this.data.selectedItems){
        this.data.selectedItems[i].forEach(el => {
          baseItems.push(el.id)
        });
      }
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
              let selectedItems = [];
              for(const i in this.data.selectedItems){
                selectedItems = selectedItems.concat(this.data.selectedItems[i])
              }
              for(const i in this.data.allItems){
                this.data.allItems[i] = this.data.allItems[i].filter(function(
                  objFromA
                ) {
                  return !selectedItems.find(function(objFromB) {
                    return objFromA.id === objFromB.id;
                  });
                });
              }
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
