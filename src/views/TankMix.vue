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
            class="fa-3x mt-0.5 right-0 text-drift-lighter-blue cursor-pointer"
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
                  v-for="item in displayedMyItems"
                  class="flex mb-8"
                  :key="item.id"
                  :class="{
                    'border-drift-salmon': selectedHerbicides.includes(item)
                  }"
                  v-on:click="addHerbicide(item)"
                >
                  <div
                    class="w-full m-auto rounded-lg bg-white p-2 hover:border-drift-salmon border-white border-2 cursor-pointer"
                    :class="{
                      'border-drift-salmon': selectedHerbicides.includes(item)
                    }"
                  >
                    <h1 class="text-center text-xl">{{ item.group_type }}</h1>
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
                    class="w-full m-auto rounded-lg p-2 bg-white hover:border-drift-salmon border-white border-2 cursor-pointer"
                    :class="{
                      'border-drift-salmon': selectedMix.includes(item)
                    }"
                  >
                    <h1 class="text-center text-xl">{{ item.group_type }}</h1>
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
                    class="w-full flex block m-auto pl-12 rounded-lg bg-white"
                  >
                    <div class="mx-auto">
                      <h1 class="text-center my-4 text-2xl">
                        {{ item.name }}
                      </h1>
                    </div>
                    <div class="float-right">
                      <font-awesome-icon
                        v-on:click="openMenu(item)"
                        class="fa-2x mt-1 mr-2 hover:text-drift-blue cursor-pointer"
                        icon="ellipsis-h"
                      ></font-awesome-icon>
                      <div
                        v-if="selectedItem === item && !deletePopUp"
                        v-on:click="deletePopUp = true"
                        class="text-center -mt-2 -ml-16 px-3 py-1 bg bg-gray-500 text-white hover:bg-red-600 cursor-pointer"
                      >
                        <h1>Delete</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="deletePopUp" class="whitescreen-active flex">
      <div class="bg-white border-2 border-gray-300 m-auto w-96">
        <div class="p-4 border-b-2 border-gray-200">
          <font-awesome-icon
            class="float-right fa-lg hover:text-red-600 cursor-pointer"
            icon="times"
            v-on:click="
              deletePopUp = false;
              selectedItem = '';
            "
          ></font-awesome-icon>
          <div class="px-4">
            <div class="flex m-auto">
              <h1 class="text-2xl m-auto text-red-600">Delete tank mix</h1>
            </div>
          </div>
        </div>
        <div class="flex py-5 px-4 border-b-2 border-gray-200">
          <p class="m-auto text-center">
            Are you sure you want to delete {{ selectedItem.name }}?
          </p>
        </div>
        <div class="flex py-4 px-8">
          <div
            v-on:click="deleteMix"
            class="px-6 rounded-lg hover:bg-red-600 hover:text-white text-xl border-2 border-red-600 text-red-600 cursor-pointer"
          >
            Yes
          </div>
          <div
            v-on:click="
              deletePopUp = false;
              selectedItem = '';
            "
            class="ml-auto px-6 rounded-lg hover:bg-drift-blue hover:text-white text-xl border-2 border-drift-blue text-drift-blue cursor-pointer"
          >
            No
          </div>
        </div>
      </div>
    </div>
    <div
      class="whitescreen-active"
      v-if="
        $store.state.tutorial.loaded &&
          !$store.state.tutorial.mixTutorialDone &&
          $store.state.tutorial.mixTutorial === 0
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setMixTutorialStep')"
        :direction="'left'"
        :text="
          'To create a tank mix, you can search for and select the herbicides you’d like to mix.'
        "
        class="top-0 left-1/3 fixed -ml-4 mt-52"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.mixTutorialDone &&
          $store.state.tutorial.mixTutorial === 1
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setMixTutorialStep')"
        :direction="'left'"
        :text="
          'Once selected, click the arrow to add to your mix. You can also remove herbicides from your mix.'
        "
        class="top-32 left-1/3 fixed ml-28 mt-72"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.mixTutorialDone &&
          $store.state.tutorial.mixTutorial === 2
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setMixTutorialStep')"
        :direction="'left'"
        :text="
          'When you’re ready to create your mix, name it here and click the + icon.'
        "
        class="top-0 left-2/3 fixed -ml-4 mt-52"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.mixTutorialDone &&
          $store.state.tutorial.mixTutorial === 3
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setMixTutorialDone')"
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
      selectedItem: "",
      deletePopUp: false,
      searchHerbicide: "",
      searchMix: "",
      herbicides: [],
      selectedHerbicides: [],
      selectedMix: [],
      mixes: []
    };
  },
  computed: {
    displayedMyItems() {
      return this.herbicides.filter(el =>
        el.group_type
          .toLowerCase()
          .includes(this.searchHerbicide.toLocaleLowerCase())
      );
    }
  },
  methods: {
    getData() {
      this.$axios
        .get(`herbicides/me/`)
        .then(res => {
          this.herbicides = res.data.my_herbicide.herbicide_groups;
        })
        .catch(err => {});

      this.$axios
        .get(`herbicides/tank-mixes/me/`)
        .then(res => {
          this.mixes = res.data;
        })
        .catch(err => {});
    },
    addHerbicide(item) {
      if (this.selectedHerbicides.find(element => element === item)) {
        this.selectedHerbicides = this.selectedHerbicides.filter(
          filterItem => filterItem !== item
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
          filterItem => filterItem !== item
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
      console.log(this.$store.state.auth.user.account);
      if (this.data.mixName && this.data.mix[0]) {
        let TankMix = {
          name: this.data.mixName,
          herbicide_groups: this.data.mix.map(el => el.id),
          owner: this.$store.state.auth.user.account
        };
        this.$axios
          .post(`herbicides/tank-mixes/me/`, TankMix)
          .then(res => {
            this.getData();
            this.$store.dispatch("addNotification", {
              type: "success",
              message: "Tank Mix successfully created!"
            });
            this.data = {
              mix: [],
              mixName: ""
            };
            this.selectedMix = [];
          })
          .catch(err => {
            this.$store.dispatch("addNotification", {
              type: "error",
              message: "There was an error creating your Tank Mix!"
            });
          });
      }
    },
    openMenu(item) {
      if (item === this.selectedItem) {
        this.selectedItem = "";
      } else {
        this.selectedItem = item;
      }
    },
    deleteMix() {
      this.$axios
        .delete(`herbicides/tank-mixes/${this.selectedItem.id}/`)
        .then(res => {
          this.getData();
          this.mixes = this.mixes.filter(el => el.id !== this.selectedItem.id);
          this.deletePopUp = false;
          this.selectedItem = "";
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Tank Mix successfully removed!"
          });
        })
        .catch(err => {
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "There was an error removing Tank Mix"
          });
        });
    }
  },
  beforeMount() {
    this.getData();
    if (!this.$store.state.mixTutorialDone) {
      this.$store.dispatch("tutorial/setUserTutorial");
    }
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
