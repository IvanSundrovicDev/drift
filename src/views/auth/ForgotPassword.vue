<template>
  <auth-layout>
    <div
      class="auth-width p-4 sm:p-8 rounded-2xl"
      style="background-color: white"
    >
    <div class="flex">
        <img
                  class="m-auto h-16 mb-4"
                  src="../../assets/images/drift_logo.png"
                  alt="DRIFT"
                />
      </div>
      <div class="rounded-md bg-red-50 p-4" v-if="errors">
        <div class="flex">
          <div class="flex-shrink-0">
            <!-- Heroicon name: x-circle -->
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
          <div class="ml-3">
            <h3
              class="text-sm font-medium text-red-800"
              v-if="errors.length < 2"
            >
              There was an error with your submission
            </h3>

            <h3 class="text-sm font-medium text-red-800" v-else>
              There were {{ errors.length }} errors with your submission
            </h3>

            <div class="mt-2 text-sm text-red-700">
              <ul class="list-disc pl-5 space-y-1">
                <li v-for="error in errors" :key="error">
                  {{ error }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="forgot-pwd-step1 h-full" v-show="forgotPwdStep === 1">
        <h1
          class="m-auto sm:mb-10 mt-2 text-xl sm:text-2xl text-center font-semibold"
        >
          Forgot your password? <br />
          No worries, just enter your email below
        </h1>

        <div class="mx-5">
          <div class="pt-12">
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
              autofocus
              @keyup.enter="verifyEmail"
            />
          </div>

          <div class="pt-8 sm:pt-16">
            <button
              class="rounded-lg py-1 w-full designActionButton"
              :disabled="!user.email"
              @click="verifyEmail"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div class="forgot-pwd-step1" v-show="forgotPwdStep === 2">
        <h1 class="m-auto mt-10 mb-5 text-2xl font-semibold">
          Answer your security <br />
          question below
        </h1>

        <div class="pt-12">
          <img
            class="inline w-1/10"
            src="../../assets/images/icons/question.png"
            alt=""
          />
          <span class="w-9/10 authInputField py-2 ml-2 bg-transparent">{{
            security_question
          }}</span>
        </div>

        <div>
          <input
            type="text"
            v-model="user.security_question_answer"
            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
            placeholder="Enter your answer here"
            @keyup.enter="verifySecurityQuestion"
          />
        </div>

        <div class="pt-16">
          <button
            class="rounded-lg py-1 w-full designActionButton"
            @click="verifySecurityQuestion"
          >
            Next
          </button>
        </div>
      </div>

      <div class="forgot-pwd-step1" v-show="forgotPwdStep === 3">
        <h1 class="m-auto mt-10 mb-5 text-2xl font-semibold">
          Create your new password
        </h1>

        <div class="pt-12">
          <img class="inline" src="../../assets/images/icons/lock.png" alt="" />
          <span class="my-auto ml-2 align-middle">Password</span>
        </div>

        <div>
          <input
            type="password"
            v-model="user.password"
            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
            placeholder="Enter your password"
          />
        </div>

        <div class="pt-2">
          <img class="inline" src="../../assets/images/icons/lock.png" alt="" />
          <span class="my-auto ml-2 align-middle">Password confirmation</span>
        </div>

        <div>
          <input
            type="password"
            v-model="user.password_confirmation"
            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
            placeholder="Enter your password confirmation"
          />
        </div>
        <small
          v-if="
            user.password !== user.password_confirmation &&
              user.password_confirmation !== ''
          "
          class="text-red-500"
        >
          Passwords must match!
        </small>

        <div class="">
          <button
            class="rounded-lg py-1 w-full designActionButton"
            @click="resetPassword"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </auth-layout>
</template>

<script>
import AuthLayout from "../layouts/AuthLayout";
import User from "../../models/user";

export default {
  name: "ForgotPassword",
  components: {
    AuthLayout
  },
  data: function() {
    return {
      user: new User(),
      forgotPwdStep: 1,
      security_question: "",
      authorization: "",
      errors: false
    };
  },
  methods: {
    verifyEmail() {
      this.errors = false;
      this.$axios
        .get(`security/${this.user.email}/verify/`)
        .then(res => {
          this.user.security_question = res.data.security_question.id;
          this.security_question = res.data.security_question.question;
          this.forgotPwdStep = 2;
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    verifySecurityQuestion() {
      this.errors = false;
      this.$axios
        .post("security/answer/verify/", {
          email: this.user.email,
          security_question: this.user.security_question,
          security_answer: this.user.security_question_answer
        })
        .then(res => {
          this.authorization = res.data.access;
          this.forgotPwdStep = 3;
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    resetPassword() {
      this.$axios
        .post(
          "security/reset_password/",
          { new_password: this.user.password },
          { headers: { Authorization: "JWT " + this.authorization } }
        )
        .then(res => {
          this.$router.push({ name: "Login" });
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
