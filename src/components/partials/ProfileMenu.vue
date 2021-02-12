<template>
  <div class="fixed right-0 bg-white rounded-md border border-gray-200">
    <div v-if="active !== 'membership'" class="m-5">
      <div v-if="active === 'menu'">
        <div class="flex mb-6">
          <img
            class="h-9 w-9 rounded-md"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <h1 class="text-2xl ml-4 mr-12">
            {{ user.full_name }}
          </h1>
        </div>
        <div
          class="flex p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer list-item"
          v-on:click="active = 'edit'"
        >
          <EditProfile class="h-6 w-6 mt-1 invert-to-white" />
          <h3 class="text-lg ml-3">Edit profile</h3>
        </div>
        <div
          class="flex p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer list-item"
          v-on:click="active = 'membership'"
        >
          <Subscriptions class="h-6 w-6 pt-1 pl-1 invert-to-white" />
          <h3 class="text-lg ml-3">Manage Subscriptions</h3>
        </div>
        <div
          class="flex p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer list-item"
          v-on:click="active = 'invite'"
        >
          <Invite class="h-5 w-6 mt-1 invert-to-white text-drift-blue" />
          <h3 class="text-lg ml-3">Invite Neighbour</h3>
        </div>
        <div
          class="flex p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer list-item"
        >
          <Help class="h-6 w-6 mt-1 invert-to-white" />
          <h3 class="text-lg ml-3">Help</h3>
        </div>
        <div
          class="flex p-2 rounded-md hover:bg-drift-blue hover:text-white cursor-pointer list-item"
          v-on:click="logout"
        >
          <Logout class="h-6 w-6 mt-1 invert-to-white" />
          <h3 class="text-lg ml-3">Logout</h3>
        </div>
      </div>
      <div v-if="active === 'edit'">
        <div class="flex mb-12">
          <h1 class="text-2xl text-drift-blue">Edit your profile</h1>
          <font-awesome-icon
            class="ml-auto fa-lg hover:text-red-600 cursor-pointer"
            icon="times"
            v-on:click="active = 'menu'"
          ></font-awesome-icon>
        </div>
        <div class="flex">
          <div>
            <div class="flex mx-5 h-16 w-16 m-2 mt-8 bg-gray-300  rounded-md">
              <font-awesome-icon
                class="float-right m-auto fa-lg cursor-pointer"
                icon="user"
              ></font-awesome-icon>
            </div>
            <p class="text-drift-blue hover:underline cursor-pointer">
              Upload photo
            </p>
          </div>
          <div>
            <div class="ml-12 w-72">
              <div>
                <img class="inline" src="../../assets/images/icons/user.png" />
                <span class="my-auto ml-2 align-middle">Full Name</span>
              </div>
              <div>
                <input
                  type="text"
                  class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                  placeholder="Enter your full name"
                  autofocus
                  v-model="user.full_name"
                />
              </div>
            </div>
            <div class="ml-12 w-72 pt-6">
              <div>
                <img
                  class="inline"
                  src="../../assets/images/icons/envelope.png"
                  alt=""
                />
                <span class="my-auto ml-2 align-middle">E-mail address</span>
              </div>
              <div>
                <input
                  type="email"
                  class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                  placeholder="Enter your e-mail address"
                  autofocus
                  v-model="user.email"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="pt-10 flex">
          <button
            class="rounded-lg py-1 m-auto w-72 designActionButton"
            v-on:click="saveChanges"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
    <div v-if="active === 'membership'">
      <div class="flex grid grid-cols-2">
        <div class="p-7 col-span-1">
          <div class="w-full text-center">
            <img class="m-auto h-10" src="../../assets/images/drift_logo.png" />
            <h1 class="text-2xl pt-5">Your membership</h1>
            <h1
              class="text-2xl text-drift-blue cursor-pointer hover:underline mt-3"
            >
              Starter plan
            </h1>
            <h1 class="text-2xl mt-3">
              Subscription end data is 01-01-2021
            </h1>
            <h1 class="text-2xl mt-3">
              Thank you for helping us
              <span class="text-drift-blue cursor-pointer hover:underline"
                >spray better</span
              >
            </h1>
            <!-- <div class="pt-10 flex">
              <button
                v-on:click="paymentInfo = 1"
                class="rounded-lg py-1 m-auto w-72 designActionButton"
              >
                Update Payment
              </button>
            </div> -->
          </div>
        </div>
        <div class="bg-drift-blue p-7 col-span-1">
          <font-awesome-icon
            class="float-right fa-lg hover:text-red-600 cursor-pointer"
            icon="times"
            v-on:click="active = 'menu'"
          ></font-awesome-icon>
          <h1 class="text-white mt-11 text-2xl">
            Your current plan allows you to have:
          </h1>
          <ol class="text-white text-2xl list-disc">
            <li class="mt-5 ml-7">1 User</li>
            <li class="mt-5 ml-7">10 Fields</li>
            <li class="mt-5 ml-7">1 Farm</li>
          </ol>
          <div class="pt-8 flex">
            <button
              class="rounded-lg py-1 m-auto w-72 bg-drift-blue border-2 text-white border-white hover:bg-white hover:text-drift-blue hover:border-white"
              v-on:click="subscriptionPlan = true"
            >
              Change Plan
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="active === 'invite'" class="px-6 pb-6">
      <div class="flex mb-4">
        <h1 class="text-2xl text-drift-blue">Invite Neighbour</h1>
        <font-awesome-icon
          class="ml-auto fa-lg hover:text-red-600 cursor-pointer"
          icon="times"
          v-on:click="active = 'menu'"
        ></font-awesome-icon>
      </div>
      <div class="flex">
        <div class="w-full">
          <div class="w-full pt-6">
            <div>
              <img
                class="inline"
                src="../../assets/images/icons/envelope.png"
                alt=""
              />
              <span class="my-auto ml-2 align-middle"
                >Neighbour e-mail address</span
              >
            </div>
            <div class="flex">
              <input
                type="email"
                class="w-full mr-1 border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                placeholder="Enter neighbour e-mail address"
                autofocus
                v-model="neighbourEmail"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="pt-10 flex">
        <button
          class="rounded-lg py-1 m-auto w-72 designActionButton"
          v-on:click="inviteNeighbour"
        >
          Invite
        </button>
      </div>
    </div>
    <div v-if="paymentInfo" class="whitescreen-active flex">
      <div class="m-auto rounded-md bg-white payment-width">
        <div class="flex p-4">
          <LeftArrow
            class="my-auto mr-4 cursor-pointer"
            v-on:click="paymentInfo = paymentInfo - 1"
          />
          <h1 class="text-3xl">Payment information</h1>
          <font-awesome-icon
            class="ml-auto fa-lg hover:text-red-600 cursor-pointer"
            icon="times"
            v-on:click="(active = 'menu'), (paymentInfo = 0)"
          ></font-awesome-icon>
        </div>
        <div class="mx-8" v-if="paymentInfo === 1">
          <div class="flex px-8 pt-6 pb-12 border-b border-black">
            <div class="w-72 mr-16" v-for="card in userCards" :key="card.cvc">
              <div class="rounded-md border border-drift-blue p-4">
                <div class="flex">
                  <img
                    class="inline my-auto mr-4"
                    src="../../assets/images/icons/credit-card.png"
                  />
                  <h3 class="text-2xl">{{ card.name }}</h3>
                  <h3 class="text-2xl ml-auto">{{ card.cvc }}</h3>
                </div>
                <h3 class="pt-6">Expires {{ card.expiration }}</h3>
              </div>
              <div class="flex pt-1">
                <h3 class="text-drift-blue hover:underline cursor-pointer">
                  Edit
                </h3>
                <h3
                  class="text-drift-blue ml-auto hover:underline cursor-pointer"
                >
                  Delete
                </h3>
              </div>
            </div>
            <div class="flex w-72 h-28 px-5 py-10 shadow-md rounded-md">
              <img
                class="inline my-auto mr-4"
                src="../../assets/images/icons/credit-card.png"
              />
              <h1 class="text-2xl">Add new card</h1>
              <font-awesome-icon
                v-on:click="paymentInfo = 2"
                class="custom-icon-size my-auto ml-auto text-drift-lighter-blue hover:text-drift-blue cursor-pointer"
                icon="plus-circle"
              ></font-awesome-icon>
            </div>
          </div>
          <div class="my-12 mx-8">
            <div v-if="!giftCard">
              <div class="flex">
                <GiftCard />
                <h1 class="ml-4 text-2xl">Gift Card</h1>
              </div>
              <div class="w-full">
                <div class="pt-8">
                  <h3 class="my-auto align-middle">Have a gift card?</h3>
                </div>

                <div class="flex">
                  <input
                    type="text"
                    v-model="creditCard.expiration"
                    class="w-96 border-2 border-gray-400 focus:border-blue-400 authInputField p-2 mt-3"
                    placeholder="Enter your gift card code"
                    autofocus
                  />
                  <div class="ml-24 mt-3 w-40">
                    <button
                      class="rounded-lg py-2 w-full payment-custom-button designActionButton"
                      v-on:click="giftCard = true"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="w-72 border p-4 border-drift-blue rounded-md">
              <div class="flex">
                <GiftCard />
                <h1 class="ml-4 text-2xl">Gift Card</h1>
              </div>
              <h3 class="pt-6">Expires 3/2021</h3>
            </div>
          </div>
        </div>
        <div
          v-if="paymentInfo === 2"
          class="mb-12 mt-4 mx-24 shadow-md rounded-md p-6"
        >
          <div class="w-full">
            <div class="pt-2">
              <h3 class="my-auto align-middle">Name</h3>
            </div>

            <div>
              <input
                type="text"
                v-model="creditCard.name"
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
                v-model="creditCard.cardNumber"
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
                  v-model="creditCard.expiration"
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
                  v-model="creditCard.cvc"
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
                  v-model="creditCard.expiration"
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
          <div class="flex pt-8">
            <button
              class="rounded-lg py-1 mx-auto w-48 payment-custom-button designActionButton"
              v-on:click="addUpdateCard()"
            >
              Save card details
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="subscriptionPlan" class="whitescreen-active flex">
      <div class="m-auto rounded-md bg-white payment-width">
        <div class="flex p-4">
          <LeftArrow
            class="my-auto mr-4 cursor-pointer"
            v-on:click="subscriptionPlan = !subscriptionPlan"
          />
          <h1 class="text-3xl">Payment information</h1>
          <font-awesome-icon
            class="ml-auto fa-lg hover:text-red-600 cursor-pointer"
            icon="times"
            v-on:click="
              (active = 'menu'), (subscriptionPlan = !subscriptionPlan)
            "
          ></font-awesome-icon>
        </div>
        <div class="mb-12 mt-4 mx-24 shadow-md rounded-md p-6">
          <div class="w-full">
            <div class="pt-2">
              <h3 class="my-auto align-middle">Name</h3>
            </div>

            <div>
              <input
                type="text"
                v-model="creditCard.name"
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
                v-model="creditCard.cardNumber"
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
                  v-model="creditCard.expiration"
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
                  v-model="creditCard.cvc"
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
                  v-model="creditCard.expiration"
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
          <div class="flex pt-8">
            <button
              class="rounded-lg py-1 mx-auto w-48 payment-custom-button designActionButton"
              v-on:click="addUpdateCard()"
            >
              Save card details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditProfile from "../../assets/images/icons/edit.svg";
import Subscriptions from "../../assets/images/icons/Subscriptions.svg";
import Invite from "../../assets/images/icons/Invite.svg";
import Help from "../../assets/images/icons/Help.svg";
import Logout from "../../assets/images/icons/Logout.svg";
import LeftArrow from "../../assets/images/icons/LeftArrow.svg";
import GiftCard from "../../assets/images/icons/GiftCard.svg";

export default {
  name: "ProfileMenu",
  components: {
    EditProfile,
    Subscriptions,
    Invite,
    Help,
    Logout,
    LeftArrow,
    GiftCard
  },
  data() {
    return {
      active: "menu",
      paymentDetailsActive: false,
      subscriptionPlan: false,
      activePlan: "",
      user: {
        full_name: this.$store.state.auth.user.full_name,
        email: this.$store.state.auth.user.email
      },
      userCards: [
        {
          name: "Visa",
          cvc: 1234,
          expiration: "12/2023"
        }
      ],
      giftCard: false,
      neighbourEmail: "",
      paymentInfo: 0,
      creditCard: {
        name: "",
        cardNumber: "",
        expiration: "",
        cvc: ""
      }
    };
  },
  computed: {
    getUser() {
      return this.$store.state.auth.user;
    }
  },
  watch: {
    getUser(newUser, oldUser) {
      this.user = newUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout").then(path => {
        this.$router.push(path);
      });
    },
    saveChanges() {
      this.$axios
        .patch("auth/users/me/", this.user)
        .then(res => {
          this.$store.dispatch("addNotification", {
            type: "success",
            message: "Profile successfully updated"
          });
        })
        .catch(err => {
          this.$store.dispatch("addNotification", {
            type: "error",
            message: "There was an error updating your profile!"
          });
        });
    },
    inviteNeighbour() {
      this.$store.dispatch("addNotification", {
        type: "success",
        message: "Neighbour successfully invited!"
      });
    },
    addUpdateCard() {
      console.log(this.creditCard);
    },
    getUserPricingPlan() {
      this.$axios
        .get("subscription/me/")
        .then(res => {
          res.data.subscription.plan === "F"
            ? (this.activePlan = "F")
            : (this.activePlan = "B");
        })
        .catch(err => {});
    },
    changeCurrentPlan(arg) {
      if (arg === "F") {
        this.$axios
          .patch("subscription/me/", {
            plan: arg,
            account: this.$store.state.auth.user.account
          })
          .then(res => {
            arg === "B" ? (this.activePlan = "B") : (this.activePlan = "F");
          })
          .catch(err => {});
      } else {
        // TODO send to verify route for paid plan
      }
    }
  },
  beforeMount() {
    this.getUserPricingPlan();
    if (!this.$store.state.auth.user) {
      return this.$store.dispatch("auth/setUserAction");
    }
  }
};
</script>

<style scoped>
.test {
  background-color: #ff8966;
}
.payment-width {
  width: 1000px;
}
</style>
