<template>
  <div class="w-64">
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
      v-on:click="activate('herbicide')"
      v-show="active === 'herbicide' || !active"
      class="flex border-b border-gray-200 px-8 py-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-3"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <div class="text-center m-auto">
        <h1 class="text-xl">
          {{ herbicideName }}
        </h1>
      </div>
    </div> -->
    <!-- <div class="w-full overflow-auto h-96" v-show="active === 'herbicide'">
      <div
        v-for="item in herbicides"
        v-on:click="select('herbicide', item)"
        :key="item.id"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{
            'salmon-border-selected': data.selectedHerbicide.name === item.name
          }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">{{ item.name }}</h1>
        </div>
      </div>
      <div
        v-for="item in mixes"
        v-on:click="select('mix', item)"
        :key="item.id + 'mix'"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{
            'salmon-border-selected': data.selectedMix.name === item.name
          }"
          class="flex salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <TankMix class="mr-2 mt-1 mix-icon"></TankMix>
          <h1 class="m-auto text-lg">{{ item.name }}</h1>
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
  </div>
</template>

<script>
import TankMix from "../../assets/images/navbar-icons/tank-mix.svg";

export default {
  name: "FieldData",
  components: {
    TankMix
  },
  data() {
    return {
      date: "",
      items: 10,
      active: "",
      crops: [],
      herbicides: [],
      mixes: [],
      traits: [],
      data: {
        selectedCrop: "",
        selectedHerbicide: "",
        selectedMix: "",
        selectedTrait: ""
      }
    };
  },
  computed: {
    herbicideName() {
      if (this.data.selectedHerbicide) {
        return this.data.selectedHerbicide.name;
      } else if (this.data.selectedMix) {
        return this.data.selectedMix.name;
      } else {
        return "Herbicide";
      }
    }
  },
  methods: {
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
        case "herbicide":
          if (
            !this.data.selectedHerbicide ||
            this.data.selectedHerbicide.name !== item.name
          ) {
            this.data.selectedHerbicide = item;
            this.data.selectedMix = "";
            this.active = "";
          } else {
            this.data.selectedHerbicide = "";
          }
          break;
        case "mix":
          if (
            !this.data.selectedMix ||
            this.data.selectedMix.name !== item.name
          ) {
            this.data.selectedMix = item;
            this.data.selectedHerbicide = "";
            this.active = "";
          } else {
            this.data.selectedMix = "";
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
      this.$emit("fieldDataUpdate", this.data);
    }
  },
  beforeMount() {
    this.date = new Date();
    this.$axios
      .get(`farms/crops/`)
      .then(res => {
        this.crops = res.data.crop;
      })
      .catch(err => {
      });
    this.$axios
      .get(`farms/crops/`)
      .then(res => {
        this.crops = res.data.crop;
      })
      .catch(err => {
      });
    this.$axios
      .get(`herbicides/me/`)
      .then(res => {
        this.herbicides = res.data.my_herbicide.herbicides;
      })
      .catch(err => {
      });
    this.$axios
      .get(`herbicides/tank-mixes/`)
      .then(res => {
        this.mixes = res.data.tank_mix;
      })
      .catch(err => {
      });
    this.$axios
      .get(`farms/crop-traits/me/`)
      .then(res => {
        this.traits = res.data.my_crop_trait.crop_traits;
      })
      .catch(err => {
      });
  }
};
</script>

<style scoped>
.field-data {
  width: 252px;
}
.mix-icon {
  filter: brightness(0%);
}
</style>
