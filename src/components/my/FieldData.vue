<template>
  <div class="field-data">
    <div
      v-on:click="activate('calendar')"
      v-if="!noCalendar"
      v-show="active === 'calendar' || !active"
      class="flex py-8 px-8 cursor-pointer"
    >
      <div v-if="!active" class="arrow-down my-auto mr-2"></div>
      <div v-else class="arrow-up my-auto mr-2"></div>
      <h1 class="text-xl m-auto">
        {{
          `${date.toLocaleString("default", {
            month: "long"
          })} ${date.getDate()}`
        }}
      </h1>
    </div>
    <div v-show="active === 'calendar'">
      <DatePicker v-model="date"></DatePicker>
    </div>
    <div
      v-show="!active"
      class="flex m-auto border-b border-gray-200 py-8 px-3"
      :class="{ 'border-t': !noCalendar }"
    >
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
      <h1 class="text-xl m-auto">Crop</h1>
    </div>
    <div class="w-full overflow-auto h-96" v-show="active === 'crop'">
      <div
        v-for="item in items"
        v-on:click="select('crops', item)"
        :key="item"
        class="custom-item cursor-pointer hover:bg-gray-200"
      >
        <div
          :class="{ 'salmon-border-selected': selectedCrops.includes(item) }"
          class="salmon-border mx-8 border-b-2 border-gray-200 text-center p-5"
        >
          <h1 class="text-lg">Crop {{ item }}</h1>
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
import DatePicker from "v-calendar/lib/components/date-picker.umd";

export default {
  name: "FieldData",
  components: {
    DatePicker
  },
  props: ["noCalendar"],
  data() {
    return {
      date: "",
      active: "",
      items: 10,
      selectedCrops: [],
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
    select(item, id) {
      switch (item) {
        case "crops":
          if (this.selectedCrops.find(element => element === id)) {
            this.selectedCrops = this.selectedCrops.filter(item => item !== id);
          } else {
            this.selectedCrops.push(id);
          }
          break;
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
    console.log(this.date.toLocaleString("default", { month: "long" }));
  }
};
</script>

<style scoped>
.field-data {
  width: 252px;
}
</style>
