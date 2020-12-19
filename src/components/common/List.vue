<template>
  <div class="flex flex-wrap">
    <div v-for="item in listItems" :key="item.id" class="w-64 my-12 mr-16 rounded-lg justify-self-center shadow-md center">
      <div class="flex">
        <div class="flex m-auto py-4 text-xl">
          <img class="h-5 w-5 mt-1 mr-2" v-if="item.imgSrc" :src="item.imgSrc">
          <h1>{{`${item.name} ${item.id}`}}</h1>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:"List",
  props:["listItems"]
}
</script>
