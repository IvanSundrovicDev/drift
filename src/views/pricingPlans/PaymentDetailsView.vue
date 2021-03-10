<template>
  <div class="bg-drift-blue ">
    <div :class="{ 'flex h-screen': registration }">
      <div class="m-auto max-w-screen-md py-12 px-16 rounded-md bg-white">
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
            <h3 class="my-auto align-middle">
              Name <span class="text-drift-red">*</span>
            </h3>
          </div>

          <div>
            <input
              type="text"
              v-model="cardName"
              class="w-full border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2"
              :class="{
                'placeholder-black placeholder-opacity-20': !cardName
              }"
              placeholder="Enter your full name"
              tabindex="1"
              autofocus
            />
            <p
              v-if="inputErrors.cardName"
              class="my-auto align-middle text-drift-red"
            >
              Cardholder name is a required field.
            </p>
          </div>
        </div>
        <div class="w-full pt-8">
          <div class="pt-2 flex">
            <img
              class="inline"
              src="../../assets/images/icons/credit-card.png"
            />
            <h3 class="my-auto ml-2 align-middle">
              Card Number <span class="text-drift-red">*</span>
            </h3>
          </div>

          <div>
            <input
              type="text"
              id="cardNumber"
              class="w-full border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2"
              :class="{
                'placeholder-black placeholder-opacity-20': !cardNumber
              }"
              v-mask="generateCardNumberMask"
              v-model="cardNumber"
              data-ref="cardNumber"
              autocomplete="off"
              placeholder="Enter your card number"
              tabindex="2"
            />
            <p
              v-if="inputErrors.cardNumber"
              class="my-auto align-middle text-drift-red"
            >
              The card number you entered appears to be invalid. Please enter a
              valid 16-digit card number
            </p>
          </div>
        </div>
        <div class="flex pt-8">
          <div class="flex flex-wrap justify-between w-1/2 mr-12">
            <div class="w-full pt-2">
              <h3 class="my-auto align-middle">
                Expiration <span class="text-drift-red">*</span>
              </h3>
            </div>
            <div class="w-1/2 pr-1">
              <select
                class="w-full bg-transparent border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2 mt-1"
                :class="{ 'text-black text-opacity-20': !cardMonth }"
                id="cardMonth"
                v-model="cardMonth"
                data-ref="cardDate"
                tabindex="3"
              >
                <option class="hidden" value="" disabled selected>Month</option>
                <option
                  class="text-black text-opacity-100"
                  v-bind:value="n < 10 ? '0' + n : n"
                  v-for="n in 12"
                  v-bind:disabled="n < minCardMonth"
                  v-bind:key="n"
                >
                  {{ n < 10 ? "0" + n : n }}
                </option>
              </select>
            </div>
            <div class="w-1/2 pl-1">
              <select
                class="w-full bg-transparent border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2 mt-1"
                :class="{ 'text-black text-opacity-20': !cardYear }"
                id="cardYear"
                v-model="cardYear"
                data-ref="cardDate"
                tabindex="4"
              >
                <option class="hidden" value="" disabled selected>Year</option>
                <option
                  class="text-black text-opacity-100"
                  v-bind:value="$index + minCardYear"
                  v-for="(n, $index) in 12"
                  v-bind:key="n"
                >
                  {{ $index + minCardYear }}
                </option>
              </select>
            </div>
            <p
              v-if="inputErrors.cardMonth || inputErrors.cardYear"
              class="my-auto align-middle text-drift-red"
            >
              Month and Year are required fields.
            </p>
          </div>
          <div class="w-1/2">
            <div class="pt-2">
              <h3 class="my-auto align-middle">CVC</h3>
            </div>

            <div>
              <input
                type="text"
                class="w-full border-b-2 border-drift-blue focus:border-b-2 focus:border-drift-blue authInputField py-2"
                :class="{
                  'placeholder-black placeholder-opacity-20': !cardCvc
                }"
                id="cardCvc"
                v-mask="'####'"
                maxlength="4"
                v-model="cardCvc"
                autocomplete="off"
                placeholder="CVC"
                tabindex="5"
              />
              <p
                v-if="inputErrors.cardCvc"
                class="my-auto align-middle text-drift-red"
              >
                Security code is a required field.
              </p>
            </div>
          </div>
        </div>
        <div v-if="$route.name === 'Payment Details'" class="flex pt-8">
          <div class="w-full">
            <div class="pt-2">
              <h3 class="my-auto align-middle">
                {{ voucherApplied ? "Gift card applied" : "Have a Gift card?" }}
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
                  'placeholder-black placeholder-opacity-20': !voucherCode,
                  'border-gray-400 focus:border-drift-blue': !voucherApplied,
                  'bg-white': voucherApplied
                }"
                :disabled="voucherApplied"
                placeholder="Enter your Gift card number"
                tabindex="6"
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
                voucherApplied
                  ? "Remove"
                  : "Please enter a valid Gift card code"
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
      cardCvc: "",
      voucherCode: "",
      minCardYear: new Date().getFullYear(),
      amexCardMask: "#### ###### #####",
      otherCardMask: "#### #### #### ####",
      cardNumberTemp: "",
      errors: "",
      payAmount: 79.99,
      voucherApplied: false,
      voucherError: false,
      inputErrors: {
        cardName: false,
        cardNumber: false,
        cardMonth: false,
        cardYear: false,
        cardCvc: false
      }
    };
  },
  methods: {
    validateInput() {
      const inputs = Object.keys(this.inputErrors);
      const $data = this.$data;

      inputs.forEach(input => {
        this.inputErrors[input] = !$data[input];
      });

      return Object.values(this.inputErrors).find(x => x === true);
    },

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
      // eslint-disable-next-line no-undef
      const { VUE_APP_GIFTUP_API_KEY, VUE_APP_GIFTUP_TESTMODE } = process.env;

      this.$axios
        .get(`https://api.giftup.app/gift-cards/${this.voucherCode}`, {
          headers: {
            Authorization: VUE_APP_GIFTUP_API_KEY,
            "x-giftup-testmode": VUE_APP_GIFTUP_TESTMODE
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
      if (this.validateInput()) return;

      await this.$axios
        .post("subscription/verify-card/", {
          number: this.cardNumber,
          cvc: this.cardCvc,
          exp_month: this.cardMonth,
          exp_year: this.cardYear
        })
        .then(res => {
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
