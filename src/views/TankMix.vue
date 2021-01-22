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
          <div class="w-full">
            <div
              class="m-auto bg-drift-blue text-white text-2xl w-56 text-center py-4"
            >
              My Herbicides
            </div>
          </div>
          <div class="flex-grow h-64">
            <div
              class="w-96 overflow-auto px-4 py-5 h-full mx-auto bg-drift-light-blue"
            >
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
                'mix-active': data.mix[0]
              }"
            >
              Mix
            </div>
          </div>
          <div class="flex-grow h-64">
            <div
              class="w-96 overflow-auto px-4 py-5 h-full mx-auto bg-drift-light-blue"
            >
              <div class="flex bg-white shadow-sm p-2">
                <input
                  class="w-full text-xl focus:outline-none"
                  type="text"
                  v-model="data.mixName"
                  placeholder="Name mix"
                />
                <font-awesome-icon
                  v-on:click="postTankMix"
                  class="custom-icon-size mt-0.5 right-0 ml-2 text-drift-lighter-blue"
                  :class="{
                    'hover:text-drift-blue cursor-pointer':
                      data.mixName && data.mix[0]
                  }"
                  icon="plus-circle"
                ></font-awesome-icon>
              </div>
              <div class="w-full mt-4">
                <div
                  v-for="item in data.mix"
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
          <div class="flex-grow h-64">
            <div
              class="w-96 overflow-auto px-4 py-5 h-full mx-auto bg-drift-light-blue"
            >
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
                <div v-for="item in mixes" class="flex mb-8" :key="item.id">
                  <div
                    class="w-full block m-auto rounded-lg bg-white cursor-pointer"
                  >
                    <font-awesome-icon
                      class="fa-2x mt-1 mr-2 float-right  hover:text-drift-blue"
                      icon="ellipsis-h"
                    ></font-awesome-icon>
                    <div>
                      <h1 class="text-center m-auto my-4 text-2xl">
                        {{ item.name }}
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
    <div class="tutorial-active" v-if="$store.state.mixTutorial === 0">
      <Tutorial
        v-on:exit="$store.dispatch('setMixTutorial')"
        :direction="'left'"
        :text="
          'To create a tank mix, you can search for and select the herbicides you’d like to mix.'
        "
        class="top-0 left-1/3 fixed -ml-4 mt-52"
      />
    </div>
    <div class="tutorial-active" v-if="$store.state.mixTutorial === 1">
      <Tutorial
        v-on:exit="$store.dispatch('setMixTutorial')"
        :direction="'left'"
        :text="
          'Once selected, click the arrow to add to your mix. You can also remove herbicides from your mix.'
        "
        class="top-32 left-1/3 fixed ml-28 mt-72"
      />
    </div>
    <div class="tutorial-active" v-if="$store.state.mixTutorial === 2">
      <Tutorial
        v-on:exit="$store.dispatch('setMixTutorial')"
        :direction="'left'"
        :text="
          'When you’re ready to create your mix, name it here and click the + icon.'
        "
        class="top-0 left-2/3 fixed -ml-4 mt-52"
      />
    </div>
    <div class="tutorial-active" v-if="$store.state.mixTutorial === 3">
      <Tutorial
        v-on:exit="$store.dispatch('setMixTutorial')"
        :direction="'right'"
        :text="
          'Under “My Mixes” you can edit or delete all of the mixes you have created. '
        "
        class="top-0 right-1/3 -mr-24 fixed mt-64"
      />
    </div>
  </app-layout>
</template>

<script>
import AppLayout from "./layouts/AppLayout";
import Tutorial from "@/components/common/Tutorial";

export default {
  name: "TankMix",
  components: {
    AppLayout,
    Tutorial
  },
  data() {
    return {
      data: {
        mix: [],
        mixName: ""
      },
      searchHerbicide: "",
      searchMix: "",
      herbicides: [],
      selectedHerbicides: [],
      selectedMix: [],
      mixes: []
    };
  },
  methods: {
    getData() {
      this.$axios
        .get(`herbicides/me/`)
        .then(res => {
          this.herbicides = res.data.my_herbicide.herbicides;
          console.log(this.herbicides);
        })
        .catch(err => {
          console.log({ err });
        });

      this.$axios
        .get(`herbicides/tank-mixes/`)
        .then(res => {
          this.mixes = res.data.tank_mix;
          console.log(res.data);
        })
        .catch(err => {
          console.log({ err });
        });
    },
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
        this.data.mix = this.data.mix.concat(this.selectedHerbicides);
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
        this.data.mix = this.data.mix.filter(
          el => !this.selectedMix.includes(el)
        );
        this.selectedMix = [];
      }
    },
    postTankMix() {
      if (this.data.mixName && this.data.mix[0]) {
        let TankMix = {
          name: this.data.mixName,
          tank: 1,
          herbicides: this.data.mix.map(el => el.id)
        };
        this.$axios
          .post(`herbicides/tank-mixes/`, TankMix)
          .then(res => {
            this.getData();
            this.data = {
              mix: [],
              mixName: ""
            };
          })
          .catch(err => {
            console.log({ err });
          });
      }
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>
<style>
.custom-icon-size {
  height: 1.5rem !important;
  width: 1.5rem !important;
}
.custom-arrows {
  margin-top: 18rem;
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
