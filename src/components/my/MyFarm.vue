<template>
  <div>
    <div :class="{ 'h-full': farmOpen }">
      <div
        v-on:click="toggle(farm.id)"
        class="flex cursor-pointer border-b-2 border-gray-200"
      >
        <div class="flex m-auto my-8 pl-6 ">
          <h1 class="text-2xl text-drift-blue">{{ farm.name }}</h1>
          <div v-if="!farmOpen" class="arrow-down m-auto ml-2"></div>
          <div v-else class="arrow-up m-auto ml-2"></div>
        </div>
      </div>
      <div v-if="farmOpen" class="overflow-y-auto">
        <MyField
          v-for="item in fields"
          :field="item"
          :active-field="fieldActive"
          v-on:activate="fieldActive = item.id"
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
      <FieldDataEdit />
    </div>
    <div
      class="tutorial-active"
      v-if="$store.state.farmTutorial === 2 && fields[0]"
    >
      <Tutorial
        v-on:exit="$store.dispatch('setFarmTutorial')"
        :direction="'left'"
        :text="
          'You’ve successfully added your first field. You can view and edit this field at any time by simply selecting it from the list'
        "
        class="top-0 left-12 fixed ml-80 mt-48"
      />
    </div>
    <div
      class="tutorial-active"
      v-if="$store.state.farmTutorial === 3 && fieldActive"
    >
      <Tutorial
        v-on:exit="$store.dispatch('setFarmTutorial')"
        :direction="'right'"
        :text="
          'Once selected, you can view the field you’ve just added. You can edit the fields CLU as well as update the associated crop, herbicide and trait.'
        "
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
    Tutorial
  },
  props: ["farm"],
  data() {
    return {
      farmOpen: false,
      fields: [],
      fieldActive: "",
      fieldsLoading: true
    };
  },
  computed: {
    newActiveField() {
      return this.$store.state.addedField;
    }
  },
  watch: {
    newActiveField(newField, oldField) {
      this.$axios
        .get(`../farms/${newField.farm}/fields/`)
        .then(res => {
          this.fields = res.data.field;
        })
        .catch(err => {
          console.log({ err });
        });
      this.fieldActive = newField.id;
    }
  },
  methods: {
    toggle(id) {
      this.farmOpen = !this.farmOpen;
      this.$store.dispatch("setRemovedPolygon", false);
      this.fieldActive = "";
      this.$emit("toggle-farm", id);
      this.fieldsLoading = false;
      this.$axios
        .get(`../farms/${id}/fields/`)
        .then(res => {
          this.fields = res.data.field;
          this.fieldsLoading = true;
        })
        .catch(err => {
          this.fieldsLoading = true;
          console.log({ err });
        });
    }
  }
};
</script>
