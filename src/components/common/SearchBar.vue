<template>
  <div class="flex shadow-md p-2 rounded-lg">
    <font-awesome-icon class="fa-lg pt-1 mt-1 text-gray-400" icon="search"></font-awesome-icon>
    <input
      class="w-full text-xl ml-4 focus:outline-none"
      type="text"
      v-model="searchField"
      placeholder="Search"
    />
  </div>
</template>

<script>
export default {
  name:"SearchBar",
  data(){
    return{
      searchField:""
    }
  }
}
</script>
