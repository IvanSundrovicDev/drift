<template>
  <div>
    <CropManager
      :name="name"
      :data="data"
      v-on:postAddedItems="postAddedItems"
      v-on:deleteAddedItems="deleteAddedItems"
    />
  </div>
</template>

<script>
import CropManager from "../components/managers/CropManager";

export default {
  name: "CropList",
  components: { CropManager },
  data() {
    return {
      name: "Crops",
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
        .post(`farms/crops/me/`, { crop_ids: postItems })
        .then(res => {
          this.getCrops();
          this.$store.dispatch("addNotification", {
            type: "success",
            message:
              count > 1
                ? "Crops successfully added to your list!"
                : "Crop successfully added to your list!"
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
        .post(`farms/crops/me/`, { crop_ids: postItems })
        .then(res => {
          this.getCrops();
          this.$store.dispatch("addNotification", {
            type: "success",
            message:
              count > 1
                ? "Crops successfully removed from your list!"
                : "Crop successfully removed from your list!"
          });
        })
        .catch(err => {});
    },
    getCrops() {
      this.$axios
        .get(`farms/crops/`)
        .then(res => {
          this.data.allItems = res.data;
          this.$axios
            .get(`farms/crops/me/`)
            .then(res => {
              this.data.selectedItems = res.data.my_crop.crops;
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
  beforeMount(){
    this.getCrops()
  }
};
</script>
