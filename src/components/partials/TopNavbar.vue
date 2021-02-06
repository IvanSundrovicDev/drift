<template>
  <div>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="w-full fixed border-b border-gray-200 bg-white z-501">
      <nav class="bg-white">
        <div class="w-full">
          <div class="flex h-16">
            <div class="flex w-full">
              <div class="flex items-center ml-2">
                <img
                  class="block lg:hidden h-8 w-auto"
                  src="../../assets/images/drift_logo.png"
                  alt="DRIFT"
                  @click="
                    $route.name !== 'Dashboard'
                      ? $router.push({ name: 'Dashboard' })
                      : false
                  "
                />
                <img
                  class="hidden lg:block h-8 w-auto"
                  src="../../assets/images/drift_logo.png"
                  alt="DRIFT"
                  @click="
                    $route.name !== 'Dashboard'
                      ? $router.push({ name: 'Dashboard' })
                      : false
                  "
                />
              </div>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:items-center mr-5">
              <!-- Profile dropdown -->
              <h1 class="whitespace-nowrap text-xl">Welcome, {{$store.state.auth.user.full_name}}</h1>
              <div
                class="ml-3 relative"
                v-on:click="profileMenuOpen = !profileMenuOpen"
              >
                <div>
                  <button
                    class="h-8 w-8 bg-white flex items-center text-sm rounded-full focus:outline-none"
                    id="user-menu"
                    aria-haspopup="true"
                  >
                    <img
                      class="h-8 w-8 rounded-md "
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div class="mr-2 flex items-center sm:hidden">
              <!-- Mobile menu button -->
              <button
                v-on:click="menuOpen = !menuOpen"
                class="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  class="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  class="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Profile menu -->
        <ProfileMenu v-show="profileMenuOpen" />

        <div v-if="menuOpen" class="block h-screen sm:hidden">
          <div class="pt-4 pb-1 border-t border-gray-200">
            <div class="flex items-center px-4">
              <div class="flex-shrink-0">
                <img
                  class="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div class="ml-3">
                <div class="text-base font-medium text-gray-800">
                  Example User
                </div>
                <div class="text-sm font-medium text-gray-500">
                  example@user.com
                </div>
              </div>
            </div>
            <div class="mt-3 space-y-1">
              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Your Profile
              </a>

              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Settings
              </a>

              <a
                href="#"
                @click="logout"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                Sign out
              </a>
              <hr />
              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <Close class="inline-block item mr-2"></Close>
                <p class="mt-1 inline-block">Exit</p>
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <Analitics class="inline-block item mr-2"></Analitics>
                <p class="mt-1 inline-block">Analitics</p>
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <Herbicides class="inline-block item mr-2"></Herbicides>
                <p class="mt-1 inline-block">Herbicides</p>
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <Traits class="inline-block item mr-2"></Traits>
                <p class="mt-1 inline-block">Traits</p>
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <TankMix class="inline-block item mr-2"></TankMix>
                <p class="mt-1 inline-block">Tank mix</p>
              </a>
              <a
                href="#"
                class="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
              >
                <Farms class="inline-block item mr-2"></Farms>
                <p class="mt-1 inline-block">Farms</p>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import ProfileMenu from "./ProfileMenu";
import Close from "../../assets/images/navbar-icons/close.svg";
import Farms from "../../assets/images/navbar-icons/farms.svg";
import Herbicides from "../../assets/images/navbar-icons/herbicides.svg";
import Traits from "../../assets/images/navbar-icons/traits.svg";
import TankMix from "../../assets/images/navbar-icons/tank-mix.svg";
import Analitics from "../../assets/images/navbar-icons/analitics.svg";

export default {
  name: "TopNavbar",
  components: {
    ProfileMenu,
    Close,
    Farms,
    Herbicides,
    Traits,
    TankMix,
    Analitics
  },
  data: function() {
    return {
      menuOpen: false,
      profileMenuOpen: false
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  },
  beforeMount() {
    if(!this.$store.state.auth.user.email){
      return this.$store.dispatch("auth/setUserAction");
    }
  }
};
</script>

<style>
.item {
  filter: invert(57%) sepia(72%) saturate(1464%) hue-rotate(165deg)
    brightness(94%) contrast(87%);
}
</style>
