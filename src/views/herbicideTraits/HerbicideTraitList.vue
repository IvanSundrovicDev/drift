<template>
  <app-layout>
    <div class="my-16 mx-8">
      <div class="flex">
        <div :class="{'active': active === 'list'}" v-on:click="active = 'list'" class="text-drift-blue text-2xl px-8 py-4 shadow-md cursor-pointer">
          My {{name}}
        </div>
        <div :class="{'active': active === 'add'}" v-on:click="active = 'add'" class="text-drift-blue text-2xl px-8 py-4 shadow-md cursor-pointer">
          Add {{name}}
        </div>
      </div>
        <div class="flex w-64 mt-12 shadow-md p-2 rounded-lg">
          <font-awesome-icon class="fa-lg pt-1 mt-1 text-gray-400" icon="search"></font-awesome-icon>
          <input
          class="w-full text-xl ml-4 focus:outline-none"
          type="text"
          v-model="searchField"
          placeholder="Search"
          />
        </div>
      <div v-if="active === 'list'">
        <div class="mt-12 ml-12 list">
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
          <div class="float-right">
            <div class="w-64 py-4 mr-16 text-xl shadow-md rounded-lg text-red-500 cursor-pointer hover:bg-red-500 hover:text-white">
              <h1 class="text-center">Remove selected</h1>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active === 'add'">
        <div class="mt-12 ml-12 list">
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
          <div class="float-right">
            <div class="w-64 py-4 mr-16 text-xl shadow-md rounded-lg text-green-600 cursor-pointer hover:bg-green-600 hover:text-white">
              <h1 class="text-center">Add selected</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </app-layout>
</template>

<script>
import AppLayout from "../layouts/AppLayout";

export default {
  name: "HerbicideTraitList",
  components: {
    AppLayout
  },
  data(){
    return {
      active: "list",
      searchField: "",
      name:"",
      listItems: []
    }
  },
  beforeMount(){
    if (this.$route.name === "Herbicides") {
      this.name = "herbicides"
      this.listItems = [{id:1, name:"Herbicide"}, {id:2, name:"Herbicide"}, {id:3, name:"Herbicide"},{id:4, name:"Herbicide"}, {id:5, name:"Herbicide"}, {id:6, name:"Herbicide"}]
    }
    else {
      this.name = "traits"
      this.listItems = [
        {id:1, name:"Trait", imgSrc:"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"},
        {id:2, name:"Trait", imgSrc:"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"},
        {id:3, name:"Trait", imgSrc:"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"},
        {id:4, name:"Trait", imgSrc:"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"},
        {id:5, name:"Trait", imgSrc:"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"},
        {id:6, name:"Trait", imgSrc:"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"},
        {id:7, name:"Trait", imgSrc:"https://cdn.logo.com/hotlink-ok/logo-social-sq.png"}
      ]
    }
  }
};
</script>
<style media="screen">
  .active{
    background-color: #28AAE1;
    color: white !important
  }
  .list{
    max-width: 60rem
  }
</style>
