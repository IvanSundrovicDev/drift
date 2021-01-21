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
  </div>
</template>

<script>
import MyField from "./MyField";
import FieldDataEdit from "./FieldDataEdit";
import AddField from "../../assets/images/icons/addField.svg";

export default {
  name: "MyFarm",
  components: {
    MyField,
    FieldDataEdit,
    AddField
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
        .get(`farms/${newField.farm}/fields/`)
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
        .get(`farms/${id}/fields/`)
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
