<template>
  <div class="bg-drift-blue ">
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
              class="w-full border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2"
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
              class="w-full border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2"
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
                class="w-22 border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2 mt-1"
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
                class="w-22 border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2 mt-1"
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
                class="w-full border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2"
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
              <h3 class="my-auto align-middle">
                {{ voucherApplied ? "Voucher applied" : "Have a voucher?" }}
              </h3>
            </div>

            <div
              class="relative items-center mt-3"
              :class="[voucherApplied ? 'inline-flex' : 'flex']"
            >
              <input
                v-model="voucherCode"
                type="text"
                class="w-full border-2 border-white authInputField p-2"
                :class="{
                  'border-gray-400 focus:border-drift-blue': !voucherApplied,
                  'bg-white': voucherApplied
                }"
                :disabled="voucherApplied"
                placeholder="Enter your voucher number"
              />
              <font-awesome-icon
                v-if="voucherApplied"
                :icon="['fas', 'check']"
                class="absolute right-1/4 text-drift-blue"
              />
              <a
                v-else-if="voucherError"
                role="button"
                class="absolute right-0 w-10 h-full flex items-center justify-center"
                @click="resetVaucher()"
              >
                <font-awesome-icon
                  :icon="['fas', 'times']"
                  class="text-drift-red"
                />
              </a>
            </div>
            <p
              v-if="voucherApplied || voucherError"
              class="my-auto align-middle"
              :class="[
                { 'text-drift-red': voucherError },
                { 'text-drift-blue mt-2 cursor-pointer': voucherApplied }
              ]"
              @click="removeVoucher()"
            >
              {{
                voucherApplied ? "Remove" : "Please enter a valid voucher code"
              }}
            </p>
          </div>
          <div class="w-96 pt-11 pl-10">
            <button
              v-if="!voucherApplied"
              class="rounded-lg py-2 w-full payment-custom-button designActionButton"
              :class="{ 'opacity-50': !voucherCode }"
              :disabled="!voucherCode"
              @click="redeemVoucher()"
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
            Pay ${{ payAmount }}
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
      errors: "",
      voucherCode: "",
      payAmount: 79,
      voucherApplied: false,
      voucherError: false
    };
  },
  methods: {
    resetVaucher() {
      this.voucherCode = "";
      this.voucherError = false;
    },

    removeVoucher() {
      this.payAmount = 79;
      this.voucherApplied = false;
      this.voucherCode = "";
    },

    redeemVoucher() {
      console.log("from redeem voucher");
      this.$axios
        .get(`https://api.giftup.app/gift-cards/${this.voucherCode}`, {
          headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJjYjJjYjRjYS01YzY0LTQxNWUtOTQ4ZC03YjkxOTI2ZTM3YzMiLCJzdWIiOiJ0Z29sbHlAZGl0Y2hkcmlmdC5jb20iLCJleHAiOjE5MjM4MTk5ODAsImlzcyI6Imh0dHBzOi8vZ2lmdHVwLmFwcC8iLCJhdWQiOiJodHRwczovL2dpZnR1cC5hcHAvIn0.Y_XVrls-jhFzAWNYfBmxUMhIHbEDcctPXRPFTpK0eO8`,
            "x-giftup-testmode": true // for testing purposes only, not needed for production
          }
        })
        .then(res => {
          const { canBeRedeemed, equivalentValuePerUnit } = res.data;

          if (!canBeRedeemed) return;

          this.payAmount = (this.payAmount - equivalentValuePerUnit).toFixed(2);
          this.voucherApplied = true;
          this.voucherError = false;
        })
        .catch(() => {
          this.voucherError = true;
        });
    },

    async finish() {
      await this.$axios
        .post("subscription/verify-card/", {
          number: this.cardNumber,
          cvc: this.cardCvv,
          exp_month: this.cardMonth,
          exp_year: this.cardYear
        })
        .then(res => {
          console.log(res);
          this.$axios
            .patch("subscription/me/", {
              payment_method_id: res.data.payment_method_id,
              plan: "B"
            })
            .then(async response => {
              if (this.registration) {
                await this.$store
                  .dispatch("auth/setUserSubscription")
                  .then(res => {
                    this.$router.push("Dashboard");
                  });
              } else {
                this.$emit("pricing-plan-charged");
                this.$store.dispatch("auth/setUserSubscription");
                await this.$store.dispatch("addNotification", {
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
  },
  beforeRouteLeave(to, from, next) {
    if (this.registration && to.path !== "/Dashboard") {
      localStorage.clear();
      next();
    } else {
      next();
    }
  }
};
</script>

<style scoped>
.payment-custom-button {
  height: 44px;
}

.designActionButton:disabled:hover {
  color: rgba(40, 170, 225, 1);
  border: 2px solid rgba(40, 170, 225, 1);
  background-color: #fff;
  cursor: default;
}
</style>
