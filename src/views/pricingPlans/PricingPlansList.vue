<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="w-full min-h-screen designBackground80">
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

    <div class="flex">
      <div class="flex m-auto pricing-width my-8">
        <div class="w-1/2 mx-4 bg-white rounded-xl">
          <div class="mx-4 border-b-2 border-drift-blue">
            <h1 class="text-center pt-4 pb-2 text-3xl text-drift-blue">
              Trial
            </h1>
          </div>
          <div>
            <h1 class="text-2xl text-center my-8 text-gray-600">Free</h1>
          </div>
          <div class="mx-6">
            <div class="flex">
              <img
                class="my-auto h-4 w-4 mr-2"
                src="../../assets/images/icons/dot-list.png"
              />
              <h3 class="text-xl">1 User</h3>
            </div>
            <div class="flex mt-10">
              <img
                class="my-auto h-4 w-4 mr-2"
                src="../../assets/images/icons/dot-list.png"
              />
              <h3 class="text-xl">1 Fields</h3>
            </div>
            <div class="flex mt-10">
              <img
                class="my-auto h-4 w-4 mr-2"
                src="../../assets/images/icons/dot-list.png"
              />
              <h3 class="text-xl">1 Farm</h3>
            </div>
            <div class="flex">
              <button
                class="rounded-lg py-2 my-8 mx-auto w-48 payment-custom-button designActionButton"
                v-on:click="selectPlan('F')"
              >
                Select Trail
              </button>
            </div>
          </div>
        </div>
        <div class="w-1/2 mx-4 bg-white rounded-xl">
          <div class="mx-4 border-b-2 border-drift-blue">
            <h1 class="text-center pt-4 pb-2 text-3xl text-drift-blue">Pro</h1>
          </div>
          <div>
            <h1 class="text-3xl text-center my-8">
              <span class="text-2xl text-gray-600">$</span>
              79.99
              <span class="text-2xl text-gray-600">/yr</span>
            </h1>
          </div>
          <div class="mx-6">
            <div class="flex -mt-0.5">
              <img
                class="my-auto h-4 w-4 mr-2"
                src="../../assets/images/icons/dot-list.png"
              />
              <h3 class="text-xl">1 User</h3>
            </div>
            <div class="flex mt-10">
              <img
                class="my-auto h-4 w-4 mr-2"
                src="../../assets/images/icons/dot-list.png"
              />
              <h3 class="text-xl text-drift-blue">Unlimited</h3>
            </div>
            <div class="flex mt-10">
              <img
                class="my-auto h-4 w-4 mr-2"
                src="../../assets/images/icons/dot-list.png"
              />
              <h3 class="text-xl text-drift-blue">Unlimited</h3>
            </div>
            <div class="flex">
              <button
                class="rounded-lg py-2 my-8 mx-auto w-48 payment-custom-button designActionButton"
                v-on:click="selectPlan('B')"
              >
                Select Pro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PricingPlansList",
  methods: {
    selectPlan(plan) {
      console.log(this.$axios.defaults.headers);
      let status = plan === "F" ? "A" : "I";
      // TODO: modify hardcoded account
      this.$axios
        .post("subscription/", { plan: plan, status: status, account: 4 })
        .then(res => {
          if (status === "A") {
            this.$router.push({ name: "Dashboard" });
          } else {
            this.$router.push({ name: "Payment Details" });
          }
        })
        .catch(err => {});
    }
  }
};
</script>
<style scoped>
.pricing-width {
  width: 770px;
}
</style>
