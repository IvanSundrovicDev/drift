<template>
  <div>
    <div class="flex flex-col items-center overflow-auto w-24 hidden sm:block">
      <ul class="flex h-full flex-col w-24 fixed mt-16 bg-drift-blue">
        <li class="navitem">
          <router-link to="/dashboard">
            <div
              class="flex h-20 justify-center items-center rounded-2xl"
              :class="{
                active: farmSidebarOpen && $route.name === 'Dashboard'
              }"
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
        <hr class="mt-3" />
        <li class="navitem">
          <router-link to="/crops">
            <div
              class="flex h-20 justify-center items-center rounded-2xl"
              :class="{ active: this.$route.name === 'Crops' }"
            >
              <div class="mx-auto">
                <Crops class="m-auto icon"></Crops>
                <span>
                  Crops
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
        <li class="navitem-disabled">
          <router-link to="#">
            <div class="flex h-20 items-center rounded-2xl">
              <div class="mx-auto">
                <Analytics class="m-auto icon color-black"></Analytics>
                <span style="opacity: 0.5">
                  Analytics
                </span>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
    <FarmSidebar v-if="$route.name === 'Dashboard'" v-show="farmSidebarOpen" />
  </div>
</template>

<script>
import Farms from "../../assets/images/navbar-icons/farms.svg";
import Herbicides from "../../assets/images/navbar-icons/herbicides.svg";
import Traits from "../../assets/images/navbar-icons/trait-icon.svg";
import Crops from "../../assets/images/navbar-icons/traits.svg";
import TankMix from "../../assets/images/navbar-icons/tank-mix.svg";
import Analytics from "../../assets/images/navbar-icons/analitics.svg";
import FarmSidebar from "./FarmSidebar.vue";

export default {
  name: "LeftNavbar",
  components: {
    Farms,
    Herbicides,
    Traits,
    Crops,
    TankMix,
    Analytics,
    FarmSidebar
  },
  data: function() {
    return {
      selected: null,
      farmSidebarOpen: true
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
.navitem-disabled {
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
