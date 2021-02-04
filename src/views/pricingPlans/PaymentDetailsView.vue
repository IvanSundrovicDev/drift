<template>
  <div class="bg-drift-blue ">
    <router-link
      class="absolute top-8 right-10 rounded-lg designInverseButton"
      :to="{ name: 'Register' }"
      >Sign Up</router-link
    >
    <div class="flex h-screen">
      <div class="m-auto py-12 px-16 rounded-md bg-white">
        <div class="w-full text-center">
          <h1 class="text-3xl">Enter your payment details</h1>
        </div>
        <div class="w-full pt-8">
          <div class="pt-2">
            <h3 class="my-auto align-middle">Name</h3>
          </div>

          <div>
            <input
              type="text"
              v-model="name"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter your full name"
              autofocus
            />
          </div>
        </div>
        <div class="w-full pt-8">
          <div class="pt-2 flex">
            <img
              class="inline"
              src="../../assets/images/icons/credit-card.png"
            />
            <h3 class="my-auto ml-2 align-middle">Card Number</h3>
          </div>

          <div>
            <input
              type="text"
              v-model="cardNumber"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter your card number"
              autofocus
            />
          </div>
        </div>
        <div class="flex pt-8">
          <div class="w-96 mr-12">
            <div class="pt-2">
              <h3 class="my-auto align-middle">Expiration</h3>
            </div>

            <div>
              <input
                type="text"
                v-model="expiration"
                class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                placeholder="Enter your card number"
                autofocus
              />
            </div>
          </div>
          <div class="w-96">
            <div class="pt-2">
              <h3 class="my-auto align-middle">CVC</h3>
            </div>

            <div>
              <input
                type="text"
                v-model="cvc"
                class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                placeholder="Enter your CVC"
                autofocus
              />
            </div>
          </div>
        </div>
        <div v-if="$route.name === 'Payment Details'" class="flex pt-8">
          <div class="w-full">
            <div class="pt-2">
              <h3 class="my-auto align-middle">Have a voucher?</h3>
            </div>

            <div>
              <input
                type="text"
                v-model="expiration"
                class="w-full border-2 border-gray-400 focus:border-blue-400 authInputField p-2 mt-3"
                placeholder="Enter your card number"
                autofocus
              />
            </div>
          </div>
          <div class="w-96 pt-11 pl-10">
            <button
              class="rounded-lg py-2 w-full payment-custom-button designActionButton"
            >
              Apply
            </button>
          </div>
        </div>
        <div class="w-full pt-8">
          <button
            class="rounded-lg py-1 w-full payment-custom-button designActionButton"
            v-on:click="finish()"
          >
            Pay $29.99
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentDetailsView",
  data() {
    return {
      name: "",
      cardNumber: "",
      expiration: "",
      cvc: ""
    };
  },
  methods: {
    finish() {
      this.$router.push("dashboard");
    }
  }
};
</script>

<style scoped>
.payment-custom-button {
  height: 44px;
}
</style>
