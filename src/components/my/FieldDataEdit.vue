<template>
  <div v-if="!forceHide" class="field-data">
    <div
      v-show="!active"
      class="flex m-auto border-b border-gray-200 py-8 px-3 border-t"
    >
      <div class="flex m-auto">
        <img class="h-5" src="../../assets/images/icons/temperature.png" />
        <h3 class="text-sm ml-2 mr-4" v-if="weather">
          {{ weather.temperature }}°F
        </h3>
        <h3 class="text-sm ml-2 mr-4" v-else>N/A</h3>
        <img class="h-6" src="../../assets/images/icons/weather.png" />
        <h3 class="text-sm ml-2 mr-4" v-if="weather">{{ weather.precip }}%</h3>
        <h3 class="text-sm ml-2 mr-4" v-else>N/A</h3>
        <img class="h-5" src="../../assets/images/icons/wind.png" />
        <h3 class="text-sm ml-2 mr-4" v-if="weather">
          {{ weather.wind_speed }}mph
        </h3>
        <h3 class="text-sm ml-2 mr-4" v-else>N/A</h3>
      </div>
    </div>
    <div
      v-on:click="activate('crop')"
      v-show="active === 'crop' || !active"
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-3"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <h1 class="text-xl m-auto">
        {{ data.selectedCrop.id ? data.selectedCrop.name : "Crop" }}
      </h1>
    </div>
    <div class="w-full overflow-auto h-96" v-show="active === 'crop'">
      <div
        v-for="item in crops"
        v-on:click="select('crop', item)"
        :key="item.id"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{
            'salmon-border-selected': data.selectedCrop.id === item.id
          }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">{{ item.name }}</h1>
        </div>
      </div>
    </div>
    <!-- <div
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <h1 class="text-xl m-auto text-center">{{fieldData.crop_name ? fieldData.crop_name : "None"}}</h1>
    </div> -->
    <!-- <div
      v-on:click="activate('herbicide')"
      v-show="active === 'herbicide' || !active"
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-2"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <h1 class="text-xl m-auto">Herbicide</h1>
    </div>
    <div class="w-full overflow-auto h-96" v-show="active === 'herbicide'">
      <div
        v-for="item in items"
        v-on:click="select('herbicides', item)"
        :key="item"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{
            'salmon-border-selected': selectedHerbicides.includes(item)
          }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">Herbicide {{ item }}</h1>
        </div>
      </div>
    </div> -->
    <div
      v-on:click="activate('trait')"
      v-show="active === 'trait' || !active"
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-3"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <h1 class="text-xl m-auto">
        {{ data.selectedTrait.id ? data.selectedTrait.name : "Trait" }}
      </h1>
    </div>
    <div class="w-full overflow-auto h-96" v-show="active === 'trait'">
      <div
        v-for="item in traits"
        v-on:click="select('trait', item)"
        :key="item.id"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{
            'salmon-border-selected': data.selectedTrait.id === item.id
          }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">{{ item.name }}</h1>
        </div>
      </div>
    </div>
    <!-- <div
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <h1 class="text-xl m-auto text-center">{{fieldData.crop_trait_name ? fieldData.crop_trait_name : "None"}}</h1>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "FieldData",
  props: ["fieldData"],
  data() {
    return {
      data: {
        selectedCrop: {
          id: "",
          name: ""
        },
        selectedTrait: {
          id: "",
          name: ""
        }
      },
      date: "",
      crops: "",
      traits: "",
      active: "",
      items: 10,
      selectedCrops: [],
      selectedHerbicides: [],
      selectedTraits: [],
      weather: {
        temperature: "",
        precip: "",
        wind_speed: ""
      },
      forceHide: true // COMPLETELY DELETE THIS ELEMENT
    };
  },
  computed: {
    watchUpdateProps() {
      return this.fieldData;
    }
  },
  watch: {
    watchUpdateProps(newProps, oldProps) {
      this.updateProps();
    }
  },
  methods: {
    updateProps() {
      this.data = {
        selectedCrop: {
          id: this.fieldData.crop ? this.fieldData.crop : "",
          name: this.fieldData.crop_name ? this.fieldData.crop_name : ""
        },
        selectedTrait: {
          id: this.fieldData.crop_trait ? this.fieldData.crop_trait : "",
          name: this.fieldData.crop_trait_name
            ? this.fieldData.crop_trait_name
            : ""
        }
      };
      this.getFieldWeather();
    },
    async getFieldWeather() {
      let coords = {
        lat: this.fieldData.lat,
        lng: this.fieldData.lng
      };
      await this.$axios
        .post(`weather/me/`, coords)
        .then(res => {
          this.weather = res.data.current;
        })
        .catch(err => {
          console.log(err);
        });
    },
    activate(id) {
      if (!this.active) {
        this.active = id;
      } else this.active = "";
    },
    select(name, item) {
      switch (name) {
        case "crop":
          if (
            !this.data.selectedCrop ||
            this.data.selectedCrop.id !== item.id
          ) {
            this.data.selectedCrop = item;
            this.active = "";
          } else {
            this.data.selectedCrop = "";
          }
          break;
        case "trait":
          if (
            !this.data.selectedTrait ||
            this.data.selectedTrait.id !== item.id
          ) {
            this.data.selectedTrait = item;
            this.active = "";
          } else {
            this.data.selectedTrait = "";
          }
          break;
      }
      this.updateField();
    },
    updateField() {
      let field = {
        crop_trait: this.data.selectedTrait.id,
        crop: this.data.selectedCrop.id
      };
      this.$axios
        .patch(
          `/farms/${this.fieldData.farm}/fields/${this.fieldData.id}/`,
          field
        )
        .then(res => {
          this.fieldData.crop_trait = this.data.selectedTrait.id;
          this.fieldData.crop_trait_name = this.data.selectedTrait.name;
          this.fieldData.crop = this.data.selectedCrop.id;
          this.fieldData.crop_name = this.data.selectedCrop.name;
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Field successfully updated!"
          });
        })
        .catch(err => {
          console.log(err);
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "There was an error updating field!"
          });
        });
    }
  },
  beforeMount() {
    this.getFieldWeather();
    this.updateProps();
    this.date = new Date();
    this.$axios
      .get(`farms/crops/me/`)
      .then(res => {
        this.crops = res.data.my_crop.crops;
      })
      .catch(err => {});
    this.$axios
      .get(`farms/crop-traits/me/`)
      .then(res => {
        let traits = [];
        for (const i in res.data.my_crop_trait.crop_traits) {
          res.data.my_crop_trait.crop_traits[i].forEach(el => traits.push(el));
        }
        this.traits = traits;
      })
      .catch(err => {});
  }
};
</script>

<style scoped>
.field-data {
  width: 252px;
}
</style>
