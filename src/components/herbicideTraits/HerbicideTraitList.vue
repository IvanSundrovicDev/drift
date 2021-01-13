<template>
  <app-layout>
    <div class="my-16 mx-8">
      <div class="flex">
        <div
          :class="{ active: active === 'list' }"
          v-on:click="active = 'list'"
          class="text-drift-blue text-2xl px-8 py-4 shadow-md cursor-pointer"
        >
          My {{ name }}
        </div>
        <div
          :class="{ active: active === 'add' }"
          v-on:click="active = 'add'"
          class="text-drift-blue text-2xl px-8 py-4 shadow-md cursor-pointer"
        >
          Add {{ name }}
        </div>
      </div>

      <div v-if="active === 'list'">
        <div class="flex w-64 mt-12 shadow-md p-2 rounded-lg">
          <font-awesome-icon
            class="fa-lg pt-1 mt-1 text-gray-400"
            icon="search"
          ></font-awesome-icon>
          <input
            class="w-full text-xl ml-4 focus:outline-none"
            type="text"
            v-model="myItemsSearch"
            placeholder="Search"
          />
        </div>
        <div class="mt-12 ml-12 list">
          <div class="flex flex-wrap">
            <div
              v-for="item in displayedMyItems"
              :key="item.id"
              v-on:click="removeItem(item.id)"
              :class="{ 'bg-drift-blue': removeList.includes(item.id) }"
              class="w-64 my-12 mr-16 rounded-lg justify-self-center shadow-md center hover:bg-drift-blue cursor-pointer"
            >
              <div class="flex herbicide-trait-button h-full py-2 px-4">
                <div class="flex m-auto text-center text-xl">
                  <img
                    class="h-5 w-5 mt-1 mr-2"
                    v-if="item.logo"
                    :src="item.logo"
                  />
                  <h1>{{ item.name || item.long_name }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="float-right mb-20">
            <div
              class="w-64 py-4 mr-16 text-xl shadow-md rounded-lg text-red-500 cursor-pointer hover:bg-red-500 hover:text-white"
              v-on:click="postRemovedItems"
            >
              <h1 class="text-center">Remove selected</h1>
            </div>
          </div>
        </div>
      </div>

      <div v-if="active === 'add'">
        <div class="flex w-64 mt-12 shadow-md p-2 rounded-lg">
          <font-awesome-icon
            class="fa-lg pt-1 mt-1 text-gray-400"
            icon="search"
          ></font-awesome-icon>
          <input
            class="w-full text-xl ml-4 focus:outline-none"
            type="text"
            v-model="allItemsSearch"
            placeholder="Search"
          />
        </div>
        <div class="mt-12 ml-12 list">
          <div class="flex flex-wrap">
            <div
              v-for="item in displayedAddItems"
              :key="item.id"
              v-on:click="addItem(item.id)"
              :class="{ 'bg-drift-blue': addList.includes(item.id) }"
              class="w-64 my-12 mr-16 rounded-lg justify-self-center shadow-md center hover:bg-drift-blue cursor-pointer"
            >
              <div class="flex herbicide-trait-button h-full py-2 px-4">
                <div class="flex m-auto text-center text-xl">
                  <img
                    class="h-5 w-5 mt-1 mr-2"
                    v-if="item.logo"
                    :src="item.logo"
                  />
                  <h1>{{ item.name || item.long_name }}</h1>
                </div>
              </div>
            </div>
          </div>
          <div class="float-right mb-20">
            <div
              class="w-64 py-4 mr-16 text-xl shadow-md rounded-lg text-drift-green cursor-pointer hover:bg-drift-green hover:text-white"
              v-on:click="postAddedItems"
            >
              <h1 class="text-center">Add selected</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from "../../views/layouts/AppLayout";

export default {
  name: "HerbicideTraitList",
  components: {
    AppLayout
  },
  props: ["name", "data"],
  data() {
    return {
      active: "list",
      removeList: [],
      addList: [],
      myItemsSearch: "",
      allItemsSearch: ""
    };
  },
  computed: {
    displayedAddItems() {
      console.log(this.data.allItems);
      return this.data.allItems.filter(el =>
        el.name.toLowerCase().includes(this.allItemsSearch.toLocaleLowerCase())
      );
    },
    displayedMyItems() {
      console.log(this.data.selectedItems);
      return this.data.selectedItems.filter(el =>
        el.name.toLowerCase().includes(this.myItemsSearch.toLocaleLowerCase())
      );
    }
  },
  methods: {
    removeItem(id) {
      if (this.removeList.find(element => element === id)) {
        this.removeList = this.removeList.filter(item => item !== id);
      } else {
        this.removeList.push(id);
      }
    },
    addItem(id) {
      if (this.addList.find(element => element === id)) {
        this.addList = this.addList.filter(item => item !== id);
      } else {
        this.addList.push(id);
      }
    },
    postRemovedItems() {
      console.log(this.removeList);
    },
    postAddedItems() {
      this.$emit("postAddedItems", this.addList);
      this.active = "list";
    }
  }
};
</script>
<style media="screen">
.active {
  background-color: #28aae1;
  color: white !important;
}
.list {
  max-width: 60rem;
}
</style>
