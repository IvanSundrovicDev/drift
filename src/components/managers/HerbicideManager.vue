<template>
  <app-layout>
    <div class="my-16 mx-8">
      <InfoTooltip
        icon="info-circle"
        :text="
          `Choose herbicides that you use on your farm. These selections will
        personalize your app experience`
        "
      ></InfoTooltip>
      <div class="flex">
        <div
          :class="{ active: active === 'list' }"
          v-on:click="active = 'list'"
          class="text-drift-blue text-2xl px-8 py-4 shadow-md cursor-pointer"
        >
          My herbicides
        </div>
        <div
          :class="{ active: active === 'add' }"
          v-on:click="active = 'add'"
          class="text-drift-blue text-2xl px-8 py-4 shadow-md cursor-pointer"
        >
          Add herbicides
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
          <div class="flex flex-wrap pb-28">
            <div
              v-for="item in displayedMyItems"
              :key="item.id"
              v-on:click="removeItem(item.id)"
              :class="{ 'bg-drift-blue': removeList.includes(item.id) }"
              class="w-72 my-8 mr-8 rounded-lg justify-self-center shadow-md center hover:bg-drift-blue cursor-pointer"
            >
              <div
                class="flex herbicide-trait-button h-full py-2 px-4 text-xl text-center"
              >
                <div class="w-full">
                  <img
                    class="h-5 w-5 mt-1 mr-2"
                    v-if="item.logo"
                    :src="item.logo"
                  />
                  <h1>{{ item.group_type }}</h1>
                  <div class="mt-1 flex flex-wrap text-center">
                    <span
                      v-for="(item, index) in item.herbicide_names"
                      :key="index"
                      class="text-sm pr-1"
                    >
                      {{ `${item},` }}
                    </span>
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
                'cursor-not-allowed': !removeList[0]
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
        <div class="mt-12 ml-12 list">
          <div class="flex flex-wrap pb-28">
            <div
              v-for="item in displayedAddItems"
              :key="item.id"
              v-on:click="addItem(item.id)"
              :class="{ 'bg-drift-blue': addList.includes(item.id) }"
              class="w-72 my-8 mr-8 rounded-lg justify-self-center shadow-md center hover:bg-drift-blue cursor-pointer"
            >
              <div class="flex herbicide-trait-button h-full py-2 px-4">
                <div class="flex m-auto text-center text-xl">
                  <div class="w-full">
                    <img
                      class="h-5 w-5 mt-1 mr-2"
                      v-if="item.logo"
                      :src="item.logo"
                    />
                    <h1>{{ item.group_type }}</h1>
                    <div class="mt-1 flex flex-wrap text-center">
                      <span
                        v-for="(item, index) in item.herbicides"
                        :key="index"
                        class="text-sm pr-1"
                      >
                        {{ `${item},` }}
                      </span>
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
                'cursor-not-allowed': !addList[0]
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
          active === 'list'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setHerbicideTutorialStep')"
        :direction="'left'"
        :text="
          'This is your Herbicides Manager. Here you can manage the herbicides you want to have available to you.'
        "
        class="top-0 left-64 fixed ml-96 mt-56"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.herbicideTutorialDone &&
          $store.state.tutorial.herbicideTutorial === 1 &&
          active === 'list'
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
          active === 'list'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setHerbicideTutorialStep')"
        :direction="'left'"
        :text="
          'Here, you can search for and select the herbicides you’d like to add to your list. '
        "
        class="top-0 left-4 fixed ml-96 mt-56"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.herbicideTutorialDone &&
          $store.state.tutorial.herbicideTutorial === 3 &&
          active === 'add'
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setHerbicideTutorialDone')"
        :direction="'left'"
        :text="
          'Once selected, simply click “Add Selected” and your selection will populate under “My Herbicides” '
        "
        class="top-0 left-64 fixed ml-96 mt-56"
      />
    </div>
  </app-layout>
</template>

<script>
import AppLayout from "../../views/layouts/AppLayout";
import Tutorial from "../common/Tutorial";
import InfoTooltip from "@/components/common/InfoTooltip";

export default {
  name: "HerbicideManager",
  components: {
    AppLayout,
    Tutorial,
    InfoTooltip
  },
  props: ["data"],
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
      return this.data.allItems.filter(el =>
        el.group_type
          .toLowerCase()
          .includes(this.allItemsSearch.toLocaleLowerCase())
      );
    },
    displayedMyItems() {
      return this.data.selectedItems.filter(el =>
        el.group_type
          .toLowerCase()
          .includes(this.myItemsSearch.toLocaleLowerCase())
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
      if (this.removeList[0]) {
        this.$emit("deleteAddedItems", this.removeList);
        this.removeList = [];
      }
    },
    postAddedItems() {
      if (this.addList[0]) {
        this.$emit("postAddedItems", this.addList);
        this.addList = [];
        this.active = "list";
      }
    }
  },
  beforeMount() {
    console.log(this.data);
    if (!this.$store.state.traitTutorialDone) {
      this.$store.dispatch("tutorial/setUserTutorial");
    }
  }
};
</script>
<style media="screen">
.active {
  background-color: #28aae1;
  color: white !important;
}
</style>
