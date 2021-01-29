<template>
  <div class="fixed right-0 bg-white rounded-md border border-gray-200">
    <div v-if="active !== 'membership'" class="m-5">
      <div v-if="active === 'menu'">
        <div class="flex mb-6">
          <img
            class="h-9 w-9 rounded-md"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          />
          <h1 class="text-2xl ml-4 mr-12">John Doe</h1>
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
            <img class="m-auto" src="../../assets/images/drift_logo.png" />
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
            <div class="pt-10 flex">
              <button
                v-on:click="paymentDetailsActive = true"
                class="rounded-lg py-1 m-auto w-72 designActionButton"
              >
                Update Payment
              </button>
            </div>
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
          v-on:click="saveChanges"
        >
          Invite
        </button>
      </div>
    </div>
    <div v-if="paymentDetailsActive" class="whitescreen-active flex">
      <PaymentDetails
        class="w-1/2 m-auto border-2 border-gray-300"
        v-on:close="paymentDetailsActive = false"
      />
    </div>
  </div>
</template>

<script>
import PaymentDetails from "./PaymentDetails";
import EditProfile from "../../assets/images/icons/EditProfile.svg";
import Subscriptions from "../../assets/images/icons/Subscriptions.svg";
import Invite from "../../assets/images/icons/Invite.svg";
import Help from "../../assets/images/icons/Help.svg";
import Logout from "../../assets/images/icons/Logout.svg";

export default {
  name: "ProfileMenu",
  components: {
    PaymentDetails,
    EditProfile,
    Subscriptions,
    Invite,
    Help,
    Logout
  },
  data() {
    return {
      active: "menu",
      paymentDetailsActive: false,
      user: {
        full_name: "",
        email: ""
      },
      neighbourEmail: ""
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
    saveChanges() {
      this.$axios.patch("auth/users/me/", this.user).then(res => {});
    }
  }
};
</script>

<style scoped>
.list-item:hover .invert-to-white {
  filter: brightness(0) invert(1);
}
.test {
  background-color: #ff8966;
}
</style>
