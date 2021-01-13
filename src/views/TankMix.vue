<template>
  <app-layout>
    <div class="flex pt-16 h-full pb-12">
      <div class="w-1/3">
        <div class="w-12 float-right custom-arrows">
          <font-awesome-icon
            class="fa-3x mt-0.5 right-0 mb-20 text-drift-lighter-blue cursor-pointer"
            :class="{ 'drift-blue-arrow': selectedHerbicides[0] }"
            icon="arrow-alt-circle-right"
            v-on:click="addToMix"
          ></font-awesome-icon>
          <font-awesome-icon
            class="fa-3x mt-0.5 right-0 text-drift-lighter-blue hover:text-drift-blue cursor-pointer"
            icon="arrow-alt-circle-left"
            :class="{ 'drift-blue-arrow': selectedMix[0] }"
            v-on:click="addToHerbicides"
          ></font-awesome-icon>
        </div>
        <div class="flex flex-col h-full">
          <div class="flex">
            <div
              class="m-auto bg-drift-blue text-white text-2xl w-56 text-center py-4"
            >
              My Herbicides
            </div>
          </div>
          <div class="flex h-full">
            <div class="w-96 px-4 py-5 h-full mx-auto bg-drift-light-blue">
              <div class="flex bg-white shadow-sm p-2 rounded-lg">
                <font-awesome-icon
                  class="fa-lg pt-1 mt-0.5 text-gray-400"
                  icon="search"
                ></font-awesome-icon>
                <input
                  class="w-full text-xl ml-4 focus:outline-none"
                  type="text"
                  v-model="searchHerbicide"
                  placeholder="Search"
                />
              </div>
              <div class="w-full mt-4">
                <div
                  v-for="item in herbicides"
                  class="flex mb-8"
                  :key="item.id"
                  :class="{
                    'border-drift-salmon': selectedHerbicides.includes(item)
                  }"
                  v-on:click="addHerbicide(item)"
                >
                  <div
                    class="w-full m-auto rounded-lg bg-white hover:border-drift-salmon border-white border-2 cursor-pointer"
                    :class="{
                      'border-drift-salmon': selectedHerbicides.includes(item)
                    }"
                  >
                    <h1 class="text-center my-4 text-2xl">
                      {{ `${item.name} ${item.id}` }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex flex-col h-full">
          <div class="flex">
            <div
              class="m-auto text-drift-blue text-2xl shadow-sm w-56 text-center py-4"
              :class="{
                'mix-active': mix[0]
              }"
            >
              Mix
            </div>
          </div>
          <div class="flex h-full">
            <div class="w-96 px-4 py-5 h-full mx-auto bg-drift-light-blue">
              <div class="flex bg-white shadow-sm p-2">
                <input
                  class="w-full text-xl focus:outline-none"
                  type="text"
                  v-model="mixName"
                  placeholder="Name mix"
                />
                <font-awesome-icon
                  class="custom-icon-size mt-0.5 right-0 text-drift-lighter-blue hover:text-drift-blue cursor-pointer"
                  icon="plus-circle"
                ></font-awesome-icon>
              </div>
              <div class="w-full mt-4">
                <div
                  v-for="item in mix"
                  class="flex mb-8"
                  :key="item.id"
                  :class="{
                    'border-drift-salmon': selectedMix.includes(item)
                  }"
                  v-on:click="addMixHerbicide(item)"
                >
                  <div
                    class="w-full m-auto rounded-lg bg-white hover:border-drift-salmon border-white border-2 cursor-pointer"
                    :class="{
                      'border-drift-salmon': selectedMix.includes(item)
                    }"
                  >
                    <h1 class="text-center my-4 text-2xl">
                      {{ `${item.name} ${item.id}` }}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <div class="flex flex-col h-full">
          <div class="flex">
            <div
              class="m-auto bg-drift-blue text-white text-2xl w-56 text-center py-4"
            >
              My Mixes
            </div>
          </div>
          <div class="flex h-full">
            <div class="w-96 px-4 py-5 h-full mx-auto bg-drift-light-blue">
              <div class="flex bg-white shadow-sm p-2 rounded-lg">
                <font-awesome-icon
                  class="fa-lg pt-1 mt-0.5 text-gray-400"
                  icon="search"
                ></font-awesome-icon>
                <input
                  class="w-full text-xl ml-4 focus:outline-none"
                  type="text"
                  v-model="searchMix"
                  placeholder="Search"
                />
              </div>
              <div class="w-full mt-4">
                <div class="flex mb-8">
                  <div
                    class="w-full block m-auto rounded-lg bg-white cursor-pointer"
                  >
                    <font-awesome-icon
                      class="fa-2x mt-1 mr-2 float-right hover:text-drift-blue"
                      icon="ellipsis-h"
                    ></font-awesome-icon>
                    <div>
                      <h1 class="text-center w-16 m-auto my-4 text-2xl">
                        Mix 1
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from "./layouts/AppLayout";

export default {
  name: "TankMix",
  components: {
    AppLayout
  },
  data() {
    return {
      searchHerbicide: "",
      mixName: "",
      searchMix: "",
      herbicides: [],
      selectedHerbicides: [],
      mix: [],
      selectedMix: []
    };
  },
  methods: {
    addHerbicide(item) {
      if (this.selectedHerbicides.find(element => element === item)) {
        this.selectedHerbicides = this.selectedHerbicides.filter(
          filterIitem => filterIitem !== item
        );
      } else {
        this.selectedHerbicides.push(item);
      }
    },
    addToMix() {
      if (this.selectedHerbicides[0]) {
        this.mix = this.mix.concat(this.selectedHerbicides);
        this.herbicides = this.herbicides.filter(
          el => !this.selectedHerbicides.includes(el)
        );
        this.selectedHerbicides = [];
      }
    },
    addMixHerbicide(item) {
      if (this.selectedMix.find(element => element === item)) {
        this.selectedMix = this.selectedMix.filter(
          filterIitem => filterIitem !== item
        );
      } else {
        this.selectedMix.push(item);
      }
    },
    addToHerbicides() {
      if (this.selectedMix[0]) {
        this.herbicides = this.herbicides.concat(this.selectedMix);
        this.mix = this.mix.filter(el => !this.selectedMix.includes(el));
        this.selectedMix = [];
      }
    }
  },
  beforeMount() {
    this.$axios
      .get(`../herbicides/me/`)
      .then(res => {
        this.herbicides = res.data.herbicides;
        console.log(this.herbicides);
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
</script>
<style>
.custom-icon-size {
  height: 1.5rem !important;
  width: 1.5rem !important;
}
.custom-arrows {
  margin-top: 50%;
  margin-right: -23px;
  position: relative;
}
.drift-blue-arrow {
  color: #28aae1 !important;
}
.mix-active {
  background: #28aae1 !important;
  color: white !important;
}
</style>
