<template>
    <div class="flex flex-col items-center min-h-full w-20" style="background-color: #28AAE1">
        <ul class="flex flex-col w-full">
            <li class="items-center w-full navitem">
                <router-link to="/">
                     <span class="flex h-20 justify-center items-center rounded-2xl"
                           @mouseover="selected = 1"
                           @mouseleave="selected = null"
                           :class="{ active: selected === 1 }"
                     >
                    <Close></Close>
                </span>
                </router-link>
            </li>
            <li class="w-full navitem">
                <router-link to="/">
                    <span class="flex h-20 justify-center items-center rounded-2xl"
                          @mouseover="selected = 2"
                          @mouseleave="selected = null"
                          :class="{ active: selected === 2 }"
                    >
                        <Analitics></Analitics>
                    </span>
                </router-link>
            </li>
            <li class="w-full navitem">
                <router-link to="/">
                    <span class="flex h-20 justify-center items-center rounded-2xl"
                          @mouseover="selected = 3"
                          @mouseleave="selected = null"
                          :class="{ active: selected === 3 }"
                    >
                        <Herbicides></Herbicides>
                    </span>
                </router-link>
            </li>
            <li class="w-full navitem">
                <router-link to="/">
                    <span class="flex h-20 justify-center items-center rounded-2xl"
                          @mouseover="selected = 4"
                          @mouseleave="selected = null"
                          :class="{ active: selected === 4 }"
                    >
                        <Traits></Traits>
                    </span>
                </router-link>
            </li>
            <li class="w-full navitem">
                <router-link to="/">
                    <span class="flex h-20 justify-center items-center rounded-2xl"
                          @mouseover="selected = 5"
                          @mouseleave="selected = null"
                          :class="{ active: selected === 5 }"
                    >
                        <TankMix></TankMix>
                    </span>
                </router-link>
            </li>
            <li class="w-full navitem">
                <router-link to="/">
                    <span class="flex h-20 justify-center items-center rounded-2xl"
                          @mouseover="selected = 6"
                          @mouseleave="selected = null"
                          :class="{ active: selected === 6 }"
                    >
                        <Farms></Farms>
                    </span>
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
</template>

<script>
    import { library } from '@fortawesome/fontawesome-svg-core';
    // import { name of your icon in camelCase } from "@fortawesome/free-solid-svg-icons";
    // For example, I want to use fa-enveloper-open-text, then it's faEnvelopeOpenText
    import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
    // Then add it to library
    library.add(faArrowDown)

    import Close from '../../assets/images/navbar-icons/close.svg'
    import Farms from '../../assets/images/navbar-icons/farms.svg'
    import Herbicides from '../../assets/images/navbar-icons/herbicides.svg'
    import Traits from '../../assets/images/navbar-icons/traits.svg'
    import TankMix from '../../assets/images/navbar-icons/tank-mix.svg'
    import Analitics from '../../assets/images/navbar-icons/analitics.svg'

    export default {
        name: "LeftNavbar",
        components: {
            Close, Farms, Herbicides, Traits, TankMix, Analitics
        },
        data: function () {
            return {
                selected: null
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
    .navitem {
        color: white;
    }
    .navitem:hover {
        color: #28AAE1;
        background-color: white;
        border-radius: 6px 0 0 5px;
    }
    .active {
        filter: invert(57%) sepia(72%) saturate(1464%) hue-rotate(165deg) brightness(94%) contrast(87%);
    }
</style>