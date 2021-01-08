<template>
  <div>
    <div class="flex flex-col items-center overflow-auto w-24 hidden sm:block">
      <ul class="flex h-full flex-col w-24 fixed mt-16 bg-drift-blue">
        <li class="navitem">
          <router-link to="/dashboard">
            <div
              class="flex h-20 justify-center items-center rounded-2xl"
              :class="{ active: farmSidebarOpen }"
              v-on:click="farmSidebarOpen = !farmSidebarOpen"
            >
              <div class="mx-auto">
                <Farms class="m-auto icon"></Farms>
                <span>
                  Farms
                </span>
              </div>
            </div>
          </router-link>
        </li>
        <li class="navitem">
          <router-link to="/herbicides">
            <div
              class="flex h-20 justify-center items-center rounded-2xl"
              :class="{ active: this.$route.name === 'Herbicides' }"
            >
              <div class="mx-auto">
                <Herbicides class="m-auto icon"></Herbicides>
                <span>
                  Herbicides
                </span>
              </div>
            </div>
          </router-link>
        </li>
        <li class="navitem">
          <router-link to="/traits">
            <div
              class="flex h-20 justify-center items-center rounded-2xl"
              :class="{ active: this.$route.name === 'Traits' }"
            >
              <div class="mx-auto">
                <Traits class="m-auto icon"></Traits>
                <span>
                  Traits
                </span>
              </div>
            </div>
          </router-link>
        </li>
        <li class="navitem">
          <router-link to="/tank_mix">
            <div class="flex h-20 justify-center items-center rounded-2xl">
              <div class="mx-auto">
                <TankMix class="m-auto icon"></TankMix>
                <span>
                  Tank Mix
                </span>
              </div>
            </div>
          </router-link>
        </li>
        <li class="navitem">
          <router-link to="#">
            <div class="flex h-20 items-center rounded-2xl">
              <div class="mx-auto">
                <Analitics class="m-auto icon"></Analitics>
                <span>
                  Analitics
                </span>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
      <!--<button class="mt-auto flex items-center justify-center hover:text-indigo-100 text-indigo-500 h-10 w-10">
              <svg class="w-6 h-6"
                   fill="none"
                   stroke="currentColor"
                   viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
          </button>-->
    </div>
    <FarmSidebar v-show="farmSidebarOpen" />
  </div>
</template>

<script>
import Farms from "../../assets/images/navbar-icons/farms.svg";
import Herbicides from "../../assets/images/navbar-icons/herbicides.svg";
import Traits from "../../assets/images/navbar-icons/traits.svg";
import TankMix from "../../assets/images/navbar-icons/tank-mix.svg";
import Analitics from "../../assets/images/navbar-icons/analitics.svg";
import FarmSidebar from "./FarmSidebar.vue";

export default {
  name: "LeftNavbar",
  components: {
    Farms,
    Herbicides,
    Traits,
    TankMix,
    Analitics,
    FarmSidebar
  },
  data: function() {
    return {
      selected: null,
      farmSidebarOpen: false
    };
  },
  methods: {}
};
</script>

<style scoped>
.navitem {
  color: white;
  margin-top: 15px;
}
.navitem:hover,
.active {
  color: #28aae1 !important;
  background-color: white !important;
  border-radius: 6px 0 0 5px;
}
.navitem:hover .icon,
.active .icon {
  filter: invert(57%) sepia(72%) saturate(1464%) hue-rotate(165deg)
    brightness(94%) contrast(87%);
}
</style>
