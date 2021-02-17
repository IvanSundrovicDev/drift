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
            <div class="flex mx-5 h-16 w-16 m-2 mt-8 bg-gray-300 rounded-md">
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
              {{ activePlan === "B" ? "Pro plan" : "Trial plan" }}
            </h1>
            <h1 class="text-2xl mt-3">Subscription end data is NaN</h1>
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
          <ol v-if="activePlan === 'B'" class="text-white text-2xl list-disc">
            <li class="mt-5 ml-7">1 User</li>
            <li class="mt-5 ml-7">Unlimited</li>
            <li class="mt-5 ml-7">Unlimited</li>
          </ol>
          <ol v-else class="text-white text-2xl list-disc">
            <li class="mt-5 ml-7">1 User</li>
            <li class="mt-5 ml-7">10 Fields</li>
            <li class="mt-5 ml-7">1 Farm</li>
          </ol>
          <div class="pt-8 flex">
            <button
              class="rounded-lg py-1 m-auto w-72 bg-drift-blue border-2 text-white border-white hover:bg-white hover:text-drift-blue hover:border-white"
              v-on:click="subscriptionPlan = subscriptionPlan + 1"
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
    <div v-if="subscriptionPlan" class="whitescreen-active flex">
      <div
        :class="[subscriptionPlan !== 2 ? 'bg-drift-blue ' : 'bg-white']"
        class="m-auto rounded-md payment-width"
      >
        <div class="flex p-4">
          <LeftArrow
            class="my-auto mr-4 cursor-pointer"
            v-on:click="subscriptionPlan = subscriptionPlan - 1"
          />
          <h1
            :class="[subscriptionPlan !== 2 ? 'text-white ' : 'text-black']"
            class="text-3xl"
          >
            Subscription Plans
          </h1>
          <font-awesome-icon
            class="ml-auto fa-lg hover:text-red-600 cursor-pointer"
            icon="times"
            v-on:click="(active = 'menu'), (subscriptionPlan = false)"
          ></font-awesome-icon>
        </div>
        <div v-if="subscriptionPlan === 1" class="flex my-8 mx-32">
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
                <h1
                  v-if="activePlan === 'F'"
                  class="text-2xl my-10 text-center text-gray-600 mx-auto"
                >
                  Current Plan
                </h1>
                <button
                  v-else
                  class="rounded-lg py-2 my-8 mx-auto w-48 payment-custom-button designActionButton"
                  v-on:click="changeCurrentPlan('F')"
                >
                  Downgrade
                </button>
              </div>
            </div>
          </div>
          <div class="w-1/2 mx-4 bg-white rounded-xl">
            <div class="mx-4 border-b-2 border-drift-blue">
              <h1 class="text-center pt-4 pb-2 text-3xl text-drift-blue">
                Pro
              </h1>
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
                  v-if="activePlan === 'F'"
                  class="rounded-lg py-2 my-8 mx-auto w-48 payment-custom-button designActionButton"
                  v-on:click="changeCurrentPlan('B')"
                >
                  Upgrade
                </button>
                <h1
                  v-else
                  class="text-2xl my-8 text-center text-gray-600 mx-auto"
                >
                  Current Plan
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div v-show="subscriptionPlan === 2">
          <PaymentDetailsView
            :registration="false"
            v-on:pricing-plan-charged="setSubscriptionPlanPro"
          ></PaymentDetailsView>
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
import PaymentDetailsView from "@/views/pricingPlans/PaymentDetailsView";

export default {
  name: "ProfileMenu",
  components: {
    EditProfile,
    Subscriptions,
    Invite,
    Help,
    Logout,
    LeftArrow,
    GiftCard,
    PaymentDetailsView
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
      giftCard: false,
      neighbourEmail: "",
      paymentInfo: 0
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
          this.active = "menu";
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
            this.$store.dispatch("auth/setUserSubscription");
            this.activePlan = "F";
            this.subscriptionPlan = 0;
          })
          .catch(err => {});
      } else {
        this.subscriptionPlan = this.subscriptionPlan + 1;
      }
    },
    setSubscriptionPlanPro() {
      this.subscriptionPlan = 0;
      this.activePlan = "B";
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
