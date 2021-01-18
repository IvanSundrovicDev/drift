<template>
  <div>
    <div class="flex m-auto border-b border-gray-200 py-8 px-3">
      <div class="flex m-auto">
        <img class="h-5" src="../../assets/images/icons/temperature.png" />
        <h3 class="text-sm ml-2 mr-4">52°F</h3>
        <img class="h-6" src="../../assets/images/icons/weather.png" />
        <h3 class="text-sm ml-2 mr-4">10%</h3>
        <img class="h-5" src="../../assets/images/icons/wind.png" />
        <h3 class="text-sm ml-2 mr-4">10mph</h3>
      </div>
    </div>
    <div
      v-on:click="activate('crop')"
      v-show="active === 'crop' || !active"
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-2"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <h1 class="text-xl m-auto">
        {{ selectedCrop.id ? selectedCrop.name : "Crops" }}
      </h1>
    </div>
    <div class="w-full overflow-auto h-96" v-show="active === 'crop'">
      <div
        v-for="item in crops"
        v-on:click="selectCrop(item)"
        :key="item.id"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{ 'salmon-border-selected': selectedCrop.id === item.id }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">{{ item.name }}</h1>
        </div>
      </div>
    </div>
    <div
      v-on:click="activate('herbicide')"
      v-show="active === 'herbicide' || !active"
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-2"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <div class="text-center m-auto">
        <h1 class="text-xl">Herbicide</h1>
        <p class="text-drift-blue" v-if="selectedHerbicides[0]">
          {{ selectedHerbicides.length }}
          {{ selectedHerbicides.length > 1 ? "herbicides" : "herbicide" }}
          selected
        </p>
      </div>
    </div>
    <div class="w-full overflow-auto h-96" v-show="active === 'herbicide'">
      <div
        v-for="item in herbicides"
        v-on:click="select('herbicides', item)"
        :key="item.id"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{
            'salmon-border-selected': selectedHerbicides.includes(item)
          }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">{{ item.name }}</h1>
        </div>
      </div>
    </div>
    <div
      v-on:click="activate('trait')"
      v-show="active === 'trait' || !active"
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-2"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <h1 class="text-xl m-auto">Trait</h1>
    </div>
    <div class="w-full overflow-auto h-96" v-show="active === 'trait'">
      <div
        v-for="item in items"
        v-on:click="select('traits', item)"
        :key="item"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{
            'salmon-border-selected': selectedTraits.includes(item)
          }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">Trait {{ item }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FieldData",
  data() {
    return {
      date: "",
      items: 10,
      active: "",
      crops: [],
      herbicides: [],
      traits: [],
      selectedCrop: "",
      selectedHerbicides: [],
      selectedTraits: []
    };
  },
  methods: {
    activate(id) {
      if (!this.active) {
        this.active = id;
      } else this.active = "";
    },
    selectCrop(crop) {
      if (!this.selectedCrop || this.selectedCrop.id !== crop.id) {
        this.selectedCrop = crop;
      } else {
        this.selectedCrop = "";
      }
    },
    select(item, id) {
      switch (item) {
        case "herbicides":
          if (this.selectedHerbicides.find(element => element === id)) {
            this.selectedHerbicides = this.selectedHerbicides.filter(
              item => item !== id
            );
          } else {
            this.selectedHerbicides.push(id);
          }
          break;
        case "traits":
          if (this.selectedTraits.find(element => element === id)) {
            this.selectedTraits = this.selectedTraits.filter(
              item => item !== id
            );
          } else {
            this.selectedTraits.push(id);
          }
          break;
      }
    }
  },
  beforeMount() {
    this.date = new Date();
    this.$axios
      .get(`../farms/crops/`)
      .then(res => {
        this.crops = res.data.crop;
      })
      .catch(err => {
        console.log({ err });
      });
    this.$axios
      .get(`../farms/crops/`)
      .then(res => {
        this.crops = res.data.crop;
      })
      .catch(err => {
        console.log({ err });
      });
    this.$axios
      .get(`../herbicides/me/`)
      .then(res => {
        this.herbicides = res.data.my_herbicide.herbicides;
      })
      .catch(err => {
        console.log({ err });
      });
  }
};
</script>

<style scoped>
.field-data {
  width: 252px;
}
</style>
