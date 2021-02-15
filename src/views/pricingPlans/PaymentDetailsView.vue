<template>
  <div class="bg-drift-blue ">
    <router-link
      class="absolute top-8 right-10 rounded-lg designInverseButton"
      :to="{ name: 'Login' }"
      v-if="registration"
      >Sign In Instead</router-link
    >
    <div :class="{ 'flex h-screen': registration }">
      <div class="m-auto py-12 px-16 rounded-md bg-white">
        <div class="w-full text-center">
          <h1 class="text-3xl">Enter your payment details</h1>
        </div>

        <div class="rounded-md bg-red-200 p-4 mt-7" v-if="errors">
          <div class="my-auto w-full flex justify-center mb-5">
            <font-awesome-icon
              class="fa-lg text-red-500"
              icon="exclamation-circle"
            ></font-awesome-icon>
            <h3 class="ml-3 text-bold">Please correct the following issues</h3>
          </div>
          <ol class="ml-2" v-for="(error, key) in errors" :key="key">
            <li>{{ error }}</li>
          </ol>
        </div>

        <div class="w-full pt-8">
          <div class="pt-2">
            <h3 class="my-auto align-middle">Name</h3>
          </div>

          <div>
            <input
              type="text"
              v-model="cardName"
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
              id="cardNumber"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              v-mask="generateCardNumberMask"
              v-model="cardNumber"
              data-ref="cardNumber"
              autocomplete="off"
              placeholder="Enter your card number"
            />
          </div>
        </div>
        <div class="flex pt-8">
          <div class="w-22 mr-12">
            <div>
              <div class="pt-2">
                <h3 class="my-auto align-middle">Month</h3>
              </div>
              <select
                class="w-22 border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2 mt-1"
                id="cardMonth"
                v-model="cardMonth"
                data-ref="cardDate"
              >
                <option value="" disabled selected>Month</option>
                <option
                  v-bind:value="n < 10 ? '0' + n : n"
                  v-for="n in 12"
                  v-bind:disabled="n < minCardMonth"
                  v-bind:key="n"
                >
                  {{ n < 10 ? "0" + n : n }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-22 mr-12">
            <div>
              <div class="pt-2">
                <h3 class="my-auto align-middle">Year</h3>
              </div>
              <select
                class="w-22 border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2 mt-1"
                id="cardYear"
                v-model="cardYear"
                data-ref="cardDate"
              >
                <option value="" disabled selected>Year</option>
                <option
                  v-bind:value="$index + minCardYear"
                  v-for="(n, $index) in 12"
                  v-bind:key="n"
                >
                  {{ $index + minCardYear }}
                </option>
              </select>
            </div>
          </div>
          <div class="w-22">
            <div class="pt-2">
              <h3 class="my-auto align-middle">CVC</h3>
            </div>

            <div>
              <input
                type="text"
                class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                id="cardCvv"
                v-mask="'####'"
                maxlength="4"
                v-model="cardCvv"
                autocomplete="off"
                placeholder="CVV"
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
                class="w-full border-2 border-gray-400 focus:border-blue-400 authInputField p-2 mt-3"
                placeholder="Enter your card number"
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
            Pay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentDetailsView",
  props: {
    registration: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      cardName: "",
      cardNumber: "",
      cardMonth: "",
      cardYear: "",
      cardCvv: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      errors: ""
    };
  },
  methods: {
    finish() {
      this.$axios
        .post("subscription/verify-card/", {
          number: this.cardNumber,
          cvc: this.cardCvv,
          exp_month: this.cardMonth,
          exp_year: this.cardYear
        })
        .then(res => {
          this.$axios
            .patch("subscription/me/", {
              payment_method_id: res.data.payment_method_id,
              plan: "B"
            })
            .then(response => {
              if (this.registration) {
                this.$router.push("Dashboard");
              } else {
                this.$emit("pricing-plan-charged");
                this.$store.dispatch("addNotification", {
                  type: "success",
                  message: "You have successfully upgraded your plan!"
                });
              }
            })
            .catch(error => {
              console.log(error.response);
            });
        })
        .catch(err => {
          this.errors = err.response.data.errors;
        });
    }
  },
  mounted() {
    this.cardNumberTemp = this.otherCardMask;
    document.getElementById("cardNumber").focus();
  },
  computed: {
    getCardType() {
      let number = this.cardNumber;
      let re = new RegExp("^4");
      if (number.match(re) != null) return "visa";

      re = new RegExp("^(34|37)");
      if (number.match(re) != null) return "amex";

      re = new RegExp("^5[1-5]");
      if (number.match(re) != null) return "mastercard";

      re = new RegExp("^6011");
      if (number.match(re) != null) return "discover";

      re = new RegExp("^9792");
      if (number.match(re) != null) return "troy";

      return "visa"; // default type
    },
    generateCardNumberMask() {
      return this.getCardType === "amex"
        ? this.amexCardMask
        : this.otherCardMask;
    },
    minCardMonth() {
      if (this.cardYear === this.minCardYear) return new Date().getMonth() + 1;
      return 1;
    }
  },
  watch: {
    cardYear() {
      if (this.cardMonth < this.minCardMonth) {
        this.cardMonth = "";
      }
    }
  }
};
</script>

<style scoped>
.payment-custom-button {
  height: 44px;
}
</style>
