<template>
  <div>
    <HerbicideManager
      :data="data"
      v-on:postAddedItems="postAddedItems"
      v-on:deleteAddedItems="deleteAddedItems"
    />
  </div>
</template>

<script>
import HerbicideManager from "../components/managers/HerbicideManager";

export default {
  name: "HerbicideList",
  components: { HerbicideManager },
  data() {
    return {
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
        .post(`herbicides/me/`, { herbicide_group_ids: postItems })
        .then(res => {
          this.getHerbicides();
          this.$store.dispatch("addNotification", {
            type: "success",
            message:
              count > 1
                ? "Herbicides successfully added to your list!"
                : "Herbicide successfully added to your list!"
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
        .post(`herbicides/me/`, { herbicide_group_ids: postItems })
        .then(res => {
          this.getHerbicides();
          this.$store.dispatch("addNotification", {
            type: "success",
            message:
              count > 1
                ? "Herbicides successfully removed from your list!"
                : "Herbicide successfully removed from your list!"
          });
        })
        .catch(err => {});
    },
    getHerbicides() {
      this.$axios
        .get(`herbicides/groups/`)
        .then(res => {
          this.data.allItems = res.data.herbicide_groups;
          this.$axios
            .get(`herbicides/me/`)
            .then(res => {
              this.data.selectedItems = res.data.my_herbicide.herbicide_groups;
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
    this.getHerbicides();
  }
};
</script>
