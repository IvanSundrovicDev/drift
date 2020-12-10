<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="h-full min-h-screen designBackground80">
    <div class="pt-12 px-4 sm:px-6 lg:px-8 lg:pt-20">
      <div class="text-center">
        <p
          class="mt- text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl"
        >
          Pricing Guide
        </p>
        <p
          class="mt-3 max-w-4xl mx-auto text-xl sm:mt-5 sm:text-2xl text-white"
        >
          Choose what's best for you and change when you want
        </p>
      </div>
    </div>

    <div class="mt-16 pb-12 lg:mt-20 lg:pb-20">
      <div class="relative z-0">
        <div class="absolute inset-0 h-5/6 lg:h-2/3"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative lg:grid lg:grid-cols-7">
            <div
              class="mx-auto max-w-md lg:mx-0 lg:max-w-none lg:col-start-1 lg:col-end-3 lg:row-start-2 lg:row-end-3"
            >
              <div
                class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-l-lg"
              >
                <div class="flex-1 flex flex-col">
                  <div class="bg-white px-6 py-10">
                    <div>
                      <h3
                        class="text-center text-2xl font-medium text-gray-900"
                        id="tier-hobby"
                      >
                        Trial
                      </h3>
                      <div class="mt-4 flex items-center justify-center">
                        <span class="font-extrabold">
                          Free
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex-1 flex flex-col justify-between p-6 bg-white sm:p-10 lg:p-6 xl:p-10"
                  >
                    <ul class="space-y-4">
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="ml-3 mt-1"
                            src="../../assets/images/icons/dot-list.png"
                            alt=""
                          />
                        </div>
                        <p
                          class="ml-3 text-base font-medium text-gray-500 font-semibold"
                        >
                          1 User
                        </p>
                      </li>

                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="ml-3 mt-1"
                            src="../../assets/images/icons/dot-list.png"
                            alt=""
                          />
                        </div>
                        <p
                          class="ml-3 text-base font-medium text-gray-500 font-semibold"
                        >
                          1 Field
                        </p>
                      </li>

                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="ml-3 mt-1"
                            src="../../assets/images/icons/dot-list.png"
                            alt=""
                          />
                        </div>
                        <p
                          class="ml-3 text-base font-medium text-gray-500 font-semibold"
                        >
                          1 Farm
                        </p>
                      </li>
                    </ul>
                    <div class="mt-8">
                      <div class="rounded-lg shadow-md">
                        <a
                          href="#"
                          class="block w-full text-center rounded-lg designActionButton py-2"
                          aria-describedby="tier-hobby"
                          @click="$router.push({ name: 'Dashboard' })"
                        >
                          Choose Trial
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mt-10 max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-4"
            >
              <div class="relative z-10 rounded-lg shadow-xl">
                <div
                  class="pointer-events-none absolute inset-0 rounded-lg borderDesignTheme"
                  aria-hidden="true"
                ></div>
                <div class="absolute inset-x-0 top-0 transform translate-y-px">
                  <div class="flex justify-center transform -translate-y-1/2">
                    <span
                      class="inline-flex rounded-full designBackground100 px-4 py-1 text-sm font-semibold tracking-wider uppercase text-white"
                    >
                      Most popular
                    </span>
                  </div>
                </div>
                <div class="bg-white rounded-t-lg px-6 pt-12 pb-10">
                  <div>
                    <h3
                      class="text-center text-3xl font-semibold text-gray-900 sm:-mx-6"
                      id="tier-growth"
                    >
                      Starter
                    </h3>
                    <div class="mt-4 flex items-center justify-center">
                      <span
                        class="px-3 flex items-start text-6xl tracking-tight text-gray-900 sm:text-6xl"
                      >
                        <span class="mt-2 mr-2 text-4xl font-medium">
                          $
                        </span>
                        <span class="font-extrabold">
                          29.99
                        </span>
                      </span>
                      <span class="text-2xl font-medium text-gray-500">
                        /month
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="border-gray-100 rounded-b-lg pt-10 pb-8 px-6 bg-white sm:px-10 sm:py-10"
                >
                  <ul class="space-y-4">
                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <img
                          class="ml-3 mt-1"
                          src="../../assets/images/icons/dot-list.png"
                          alt=""
                        />
                      </div>
                      <p
                        class="ml-3 text-base font-medium text-gray-500 font-semibold"
                      >
                        1 User
                      </p>
                    </li>

                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <img
                          class="ml-3 mt-1"
                          src="../../assets/images/icons/dot-list.png"
                          alt=""
                        />
                      </div>
                      <p
                        class="ml-3 text-base font-medium text-gray-500 font-semibold"
                      >
                        10 Fields
                      </p>
                    </li>

                    <li class="flex items-start">
                      <div class="flex-shrink-0">
                        <img
                          class="ml-3 mt-1"
                          src="../../assets/images/icons/dot-list.png"
                          alt=""
                        />
                      </div>
                      <p
                        class="ml-3 text-base font-medium text-gray-500 font-semibold"
                      >
                        1 Farm
                      </p>
                    </li>
                  </ul>
                  <div class="mt-10">
                    <div class="rounded-lg shadow-md">
                      <a
                        href="#"
                        class="block w-full text-center rounded-lg designActionButton py-3"
                        aria-describedby="tier-growth"
                        @click="$router.push({ name: 'Dashboard' })"
                      >
                        Choose Starter
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="mt-10 mx-auto max-w-md lg:m-0 lg:max-w-none lg:col-start-6 lg:col-end-8 lg:row-start-2 lg:row-end-3"
            >
              <div
                class="h-full flex flex-col rounded-lg shadow-lg overflow-hidden lg:rounded-none lg:rounded-r-lg"
              >
                <div class="flex-1 flex flex-col">
                  <div class="bg-white px-6 py-10">
                    <div>
                      <h3
                        class="text-center text-2xl font-medium text-gray-900"
                        id="tier-scale"
                      >
                        Pro
                      </h3>
                      <div class="mt-4 flex items-center justify-center">
                        <span
                          class="px-3 flex items-start text-6xl tracking-tight text-gray-900"
                        >
                          <span class="mt-2 mr-2 text-4xl font-medium">
                            $
                          </span>
                          <span class="font-extrabold">
                            79.99
                          </span>
                        </span>
                        <span class="text-xl font-medium text-gray-500">
                          /month
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex-1 flex flex-col justify-between p-6 bg-white sm:p-10 lg:p-6 xl:p-10"
                  >
                    <ul class="space-y-4">
                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="ml-3 mt-1"
                            src="../../assets/images/icons/dot-list.png"
                            alt=""
                          />
                        </div>
                        <p
                          class="ml-3 text-base font-semibold font-medium text-gray-500"
                        >
                          10 Users
                        </p>
                      </li>

                      <li class="flex items-start ">
                        <div class="flex-shrink-0">
                          <img
                            class="ml-3 mt-1"
                            src="../../assets/images/icons/dot-list.png"
                            alt=""
                          />
                        </div>
                        <p
                          class="ml-3 text-base font-medium text-gray-500 font-semibold"
                        >
                          200 Fields
                        </p>
                      </li>

                      <li class="flex items-start">
                        <div class="flex-shrink-0">
                          <img
                            class="ml-3 mt-1"
                            src="../../assets/images/icons/dot-list.png"
                            alt=""
                          />
                        </div>
                        <p
                          class="ml-3 text-base font-medium text-gray-500 font-semibold"
                        >
                          1 Farm
                        </p>
                      </li>
                    </ul>
                    <div class="mt-8">
                      <div class="rounded-lg shadow-md">
                        <a
                          href="#"
                          class="block w-full text-center rounded-lg designActionButton py-2"
                          aria-describedby="tier-scale"
                          @click="$router.push({ name: 'Dashboard' })"
                        >
                          Choose Pro
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingPlansList"
};
</script>
