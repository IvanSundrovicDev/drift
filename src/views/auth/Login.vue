<template>
  <auth-layout>
    <div
      class="w-full md:w-1/2 p-4 sm:p-8 rounded-2xl md:rounded-l-none md:rounded-r-2xl bg-white"
    >
      <div>
        <div class="rounded-md bg-red-50 p-4" v-if="error">
          <div class="flex">
            <div class="flex-shrink-0 my-auto">
              <svg
                class="h-5 w-5 text-red-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="ml-2 flex-shrink-0">
              Sorry, we couldn't find an account with that credentials.
              <br />Can we help you
              <a href="#" class="text-drift-blue" @click="goToForgotPassword"
                >recover your account</a
              >
              ?
            </h3>
          </div>
        </div>
        <h1 class="m-auto mb-10 mt-2 text-center text-2xl font-semibold">
          Welcome back
        </h1>

        <div class="mx-5">
          <div class="pt-7">
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
              v-model="user.email"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter your e-mail address"
              @keyup.enter="login"
              autofocus
            />
          </div>

          <div class="pt-12">
            <img
              class="inline"
              src="../../assets/images/icons/lock.png"
              alt=""
            />
            <span class="my-auto ml-2 align-middle">Password</span>
          </div>
          <div>
            <input
              type="password"
              v-model="user.password"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter your password"
              @keyup.enter="login"
            />
            <button class="designColorText" @click="goToForgotPassword">
              Forgot password?
            </button>
          </div>

          <div class="pt-10">
            <button
              class="rounded-lg py-1 w-full outline-none designActionButton"
              @click="login"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script>
import AuthLayout from "../layouts/AuthLayout";
import User from "../../models/user";

export default {
  name: "Login",
  components: {
    AuthLayout
  },
  data: function() {
    return {
      user: new User("", "", "", "", "", null, ""),
      error: false
    };
  },
  methods: {
    login() {
      this.$store.dispatch("auth/login", this.user).then(
        data => {
          console.log(data);
          this.$router.push("/Dashboard");
        },
        error => {
          this.error = true;
        }
      );
    },
    goToForgotPassword() {
      this.$router.push({ name: "Forgot Password" });
    }
  }
};
</script>
