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
      let allSelectedItems = this.data.selectedItemsId.concat(items);
      this.$axios
        .post(`../herbicides/me/`, { herbicides: allSelectedItems })
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
          this.$axios
            .get(`../herbicides/me/`)
            .then(res => {
              this.data.selectedItemsId = res.data.herbicides;
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
    this.getHerbicides();
  }
};
</script>

<style scoped></style>
