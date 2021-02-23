<template>
  <div>
    <div :class="{ 'h-full': farmOpen }">
      <div
        v-on:click="toggle(farm.id)"
        class="flex cursor-pointer border-b-2 border-gray-200"
      >
        <div class="flex m-auto my-8 pl-6">
          <h1 class="text-2xl text-drift-blue">{{ farm.name }}</h1>
          <div v-if="!farmOpen" class="arrow-down m-auto ml-2"></div>
          <div v-else class="arrow-up m-auto ml-2"></div>
        </div>
      </div>
      <div v-if="farmOpen" class="pb-1">
        <MyField
          v-for="item in fields"
          :field="item"
          :active-field="fieldActive.id"
          :active-popup="popupActive"
          v-on:activateField="activateField(item)"
          v-on:activatePopup="activatePopup"
          :key="item.id"
        />
        <div v-if="!fields[0] && fieldsLoading" class="mt-12 mx-8">
          <AddField class="m-auto" />
          <p>
            What’s a farm without a field. Add a field by clicking the “Add
            Field” button below
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="farmOpen && fieldActive"
      class="fixed border-t border-gray-200 top-16 right-0 bg-white"
    >
      <FieldDataEdit :fieldData="fieldActive" />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.farmTutorialDone &&
        $store.state.tutorial.farmTutorial === 2 &&
        fields[0]
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setFarmTutorialStep')"
        :direction="'left'"
        :text="'You’ve successfully added your first field. You can view and edit this field at any time by simply selecting it from the list'"
        class="top-0 left-12 fixed ml-80 mt-48"
      />
    </div>
    <div
      class="whitescreen-active"
      v-if="
        !$store.state.tutorial.farmTutorialDone &&
        $store.state.tutorial.farmTutorial === 3 &&
        fieldActive.id
      "
    >
      <Tutorial
        v-on:exit="$store.dispatch('tutorial/setFarmTutorialDone')"
        :direction="'right'"
        :text="'Once selected, you can view the field you’ve just added. You can edit the fields CLU as well as update the associated crop, herbicide and trait.'"
        class="top-0 left-32 fixed ml-80 mt-80"
      />
    </div>
  </div>
</template>

<script>
import MyField from "./MyField";
import FieldDataEdit from "./FieldDataEdit";
import AddField from "../../assets/images/icons/addField.svg";
import Tutorial from "../common/Tutorial";

export default {
  name: "MyFarm",
  components: {
    MyField,
    FieldDataEdit,
    AddField,
    Tutorial,
  },
  props: ["farm"],
  data() {
    return {
      farmOpen: false,
      fields: [],
      fieldActive: "",
      popupActive: "",
      fieldsLoading: true,
    };
  },
  computed: {
    newActiveField() {
      return this.$store.state.addedField;
    },
  },
  watch: {
    newActiveField(newField, oldField) {
      this.$store.dispatch("setFieldPolygon", newField.mpoly);
      this.$store.dispatch("drawNeighbor", newField);
      this.$axios
        .get(`farms/${this.farm.id}/fields/`)
        .then((res) => {
          this.fields = res.data;
        })
        .catch((err) => {});
      this.fieldActive = newField;
      let coords = {
        lat: newField.lat,
        lng: newField.lng
      }
      this.getFieldWeather(coords)
    },
  },
  methods: {
    toggle(id) {
      this.farmOpen = !this.farmOpen;
      this.$store.dispatch("setRemoveAllPolygons", true);
      this.fieldActive = "";
      this.$emit("toggle-farm", id);
      this.fieldsLoading = false;
      this.$axios
        .get(`farms/${id}/fields/`)
        .then((res) => {
          this.fields = res.data;
          this.fieldsLoading = true;
        })
        .catch((err) => {
          this.fieldsLoading = true;
        });
    },
    activatePopup(id) {
      if (this.popupActive === id) {
        this.popupActive = "";
      } else {
        this.popupActive = id;
      }
    },
    activateField(field) {
      this.fieldActive = field;
      let coords = {
        lat: field.lat,
        lng: field.lng
      }
      this.getFieldWeather(coords)
    },
    getFieldWeather(coords) {
      this.$axios
        .post(`weather/me/`, coords)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
