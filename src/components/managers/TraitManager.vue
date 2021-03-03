<template>
  <app-layout>
    <div class="my-16 mx-8">
      <InfoTooltip
        icon="info-circle"
        :text="`Choose ${name} that you use on your farm. These selections will
        personalize your app experience`"
      ></InfoTooltip>
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
        <div class="mt-12 ml-8 pb-28 list">
          <div v-for="(value, i) in displayedMyItems" :key="i">
            <div v-if="value[0]" class="w-full">
              <div class="border-b-2 border-drift-blue my-4">
                <h1 class="text-xl">{{ i }}</h1>
              </div>
              <div class="flex flex-wrap ml-4">
                <div
                  v-for="item in value"
                  :key="item.id"
                  v-on:click="removeItem(item.id)"
                  :class="{ 'bg-drift-blue': removeList.includes(item.id) }"
                  class="w-56 my-8 mr-8 rounded-lg justify-self-center shadow-md center hover:bg-drift-blue cursor-pointer"
                >
                  <div class="flex herbicide-trait-button h-full py-2 px-4">
                    <div class="flex m-auto text-center text-xl">
                      <img
                        class="h-6 w-6 my-auto mr-2"
                        v-if="item.logo_url"
                        :src="item.logo_url"
                      />
                      <h1>{{ item.name || item.long_name }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fixed w-full bg-white bottom-0 left-24">
            <div
              :class="{
                'cursor-pointer hover:bg-red-500 hover:text-white opacity-100':
                  removeList[0],
                'cursor-not-allowed': !removeList[0],
              }"
              class="w-64 py-4 my-6 mr-36 text-xl float-right shadow-md rounded-lg text-red-500 opacity-50"
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
        <div class="mt-12 ml-8 list pb-28">
          <div v-for="(value, i) in displayedAddItems" :key="i">
            <div v-if="value[0]" class="w-full">
              <div class="border-b-2 border-drift-blue my-4">
                <h1 class="text-xl">{{ i }}</h1>
              </div>
              <div class="flex flex-wrap ml-4">
                <div
                  v-for="item in value"
                  :key="item.id"
                  v-on:click="addItem(item.id)"
                  :class="{ 'bg-drift-blue': addList.includes(item.id) }"
                  class="w-72 my-8 mr-8 rounded-lg justify-self-center shadow-md center hover:bg-drift-blue cursor-pointer"
                >
                  <div class="flex herbicide-trait-button h-full py-2 px-4">
                    <img
                      class="max-h-6 my-auto mr-2"
                      v-if="item.logo_url"
                      :src="item.logo_url"
                    />
                    <div class="flex m-auto text-center text-xl">
                      <h1>{{ item.name || item.long_name }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="fixed w-full bg-white bottom-0 left-24">
            <div
              :class="{
                'cursor-pointer hover:bg-drift-green hover:text-white opacity-100':
                  addList[0],
                'cursor-not-allowed': !addList[0],
              }"
              class="w-64 py-4 my-6 mr-36 text-xl float-right shadow-md rounded-lg text-drift-green opacity-50"
              v-on:click="postAddedItems"
            >
              <h1 class="text-center">Add selected</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="whitescreen-active"
      v-if="
        $store.state.tutorial.loaded &&
        !$store.state.tutorial.herbicideTutorialDone &&
        $store.state.tutorial.herbicideTutorial === 0 &&
        active === 'list' &&
        $route.name === 'Herbicides'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setHerbicideTutorialStep')"
        :direction="'left'"
        :text="'This is your Herbicides Manager. Here you can manage the herbicides you want to have available to you.'"
        class="top-0 left-64 fixed ml-96 mt-56"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.herbicideTutorialDone &&
        $store.state.tutorial.herbicideTutorial === 1 &&
        active === 'list' &&
        $route.name === 'Herbicides'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setHerbicideTutorialStep')"
        :direction="'left'"
        :text="'To add a Herbicide to your list, just select “Add Herbicides”'"
        class="top-0 left-72 fixed ml-80 mt-36"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.herbicideTutorialDone &&
        $store.state.tutorial.herbicideTutorial === 2 &&
        active === 'list' &&
        $route.name === 'Herbicides'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setHerbicideTutorialStep')"
        :direction="'left'"
        :text="'Here, you can search for and select the herbicides you’d like to add to your list. '"
        class="top-0 left-4 fixed ml-96 mt-56"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.herbicideTutorialDone &&
        $store.state.tutorial.herbicideTutorial === 3 &&
        active === 'add' &&
        $route.name === 'Herbicides'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setHerbicideTutorialDone')"
        :direction="'left'"
        :text="'Once selected, simply click “Add Selected” and your selection will populate under “My Herbicides” '"
        class="top-0 left-64 fixed ml-96 mt-56"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        $store.state.tutorial.loaded &&
        !$store.state.tutorial.traitTutorialDone &&
        $route.name === 'Traits'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setTraitTutorialDone')"
        :direction="'left'"
        :text="'Your Trait Manager has the same layout as your Herbicide Manager. Go ahead and try to add a few of your favourite traits. '"
        class="top-0 left-4 fixed ml-96 mt-56"
      />
    </div>
  </app-layout>
</template>

<script>
import AppLayout from "../../views/layouts/AppLayout";
import Tutorial from "../common/Tutorial";
import InfoTooltip from "@/components/common/InfoTooltip";

export default {
  name: "TraitManager",
  components: {
    AppLayout,
    Tutorial,
    InfoTooltip,
  },
  props: ["name", "items"],
  data() {
    return {
      active: "list",
      removeList: [],
      addList: [],
      myItemsSearch: "",
      allItemsSearch: "",
    };
  },
  computed: {
    displayedAddItems() {
      let items = this.items.allItems;
      let search = {};
      for (const i in items) {
        search[i] = items[i].filter((el) =>
          el.name
            .toLowerCase()
            .includes(this.allItemsSearch.toLocaleLowerCase())
        );
      }
      return search;
    },
    displayedMyItems() {
      let items = this.items.selectedItems;
      let search = {};
      for (const i in items) {
        search[i] = items[i].filter((el) =>
          el.name.toLowerCase().includes(this.myItemsSearch.toLocaleLowerCase())
        );
      }
      return search;
    },
  },
  // watch:{
  //   '$props':{
  //     handler: function (val, oldVal) {
  //       console.log("called");
  //       this.displayedAddItems = val.items.allItems
  //       this.displayedMyItems = val.items.selectedItems
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    removeItem(id) {
      if (this.removeList.find((element) => element === id)) {
        this.removeList = this.removeList.filter((item) => item !== id);
      } else {
        this.removeList.push(id);
      }
    },
    addItem(id) {
      if (this.addList.find((element) => element === id)) {
        this.addList = this.addList.filter((item) => item !== id);
      } else {
        this.addList.push(id);
      }
    },
    postRemovedItems() {
      if (this.removeList[0]) {
        this.$emit("deleteAddedItems", this.removeList);
        this.removeList = [];
      }
    },
    postAddedItems() {
      if (this.addList[0]) {
        this.$emit("postAddedItems", this.addList);
        console.log(this.addList);
        this.addList = [];
        this.active = "list";
      }
    },
  },
  beforeMount() {
    if (!this.$store.state.traitTutorialDone) {
      this.$store.dispatch("tutorial/setUserTutorial");
    }
  },
};
</script>
<style media="screen">
.active {
  background-color: #28aae1;
  color: white !important;
}
</style>
