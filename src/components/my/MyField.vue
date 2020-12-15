<template>
  <div class="my-field flex hover:bg-gray-200 cursor-pointer">
    <div
      class="field-border w-full pt-8 pb-2 text-center mx-8 border-b-2 border-gray-200"
    >
      <h1 class="text-2xl">My Field</h1>
      <p>Field Info</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyField"
};
</script>

<style>
.my-field:hover .field-border {
  border-bottom-color: #ff8966;
}
</style>
