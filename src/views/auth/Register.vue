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

      <div class="register-step-1" v-show="registerStep === 1">
        <h1 class="m-auto mb-10 mt-2 mb-5 text-center text-2xl font-semibold">
          Let's get started
        </h1>

        <div class="mx-5">
          <div class="pt-2">
            <img
              class="inline"
              src="../../assets/images/icons/user.png"
              alt=""
            />
            <span class="my-auto ml-2 align-middle"
              >Full name <span class="designColorText">*</span></span
            >
          </div>

          <div>
            <input
              type="text"
              v-model="user.full_name"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter your full name here"
              autofocus
            />
          </div>

          <div class="pt-5">
            <img
              class="inline"
              src="../../assets/images/icons/envelope.png"
              alt=""
            />
            <span class="my-auto ml-2 align-middle"
              >E-mail address <span class="designColorText">*</span></span
            >
          </div>

          <div>
            <input
              type="email"
              v-model="user.email"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter your e-mail address"
            />
          </div>

          <div class="pt-5">
            <img
              class="inline"
              src="../../assets/images/icons/farm.png"
              alt=""
            />
            <span class="my-auto ml-2 align-middle"
              >Farm name <span class="designColorText">*</span></span
            >
          </div>

          <div>
            <input
              type="text"
              v-model="user.farm_name"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter the name of your farm"
            />
          </div>

          <div class="pt-7">
            <button
              type="button"
              class="rounded-lg py-1 w-full designActionButton"
              :disabled="stepOneBtnDisabled"
              @keyup.enter="validate"
              @click="validate"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <div class="register-step-1" v-show="registerStep === 2">
        <h1 class="m-auto mt-10 mb-5 text-center text-2xl font-semibold">
          Let's get started
        </h1>

        <div class="mx-5">
          <div class="pt-2">
            <img
              class="inline"
              src="../../assets/images/icons/lock.png"
              alt=""
            />
            <span class="my-auto ml-2 align-middle"
              >Password <span class="designColorText">*</span></span
            >
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
            <img
              class="inline"
              src="../../assets/images/icons/lock.png"
              alt=""
            />
            <span class="my-auto ml-2 align-middle"
              >Password confirmation
              <span class="designColorText">*</span></span
            >
          </div>

          <div>
            <input
              type="password"
              v-model="user.password_confirmation"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Enter your password confirmation"
            />
            <p
              v-if="
                user.password !== user.password_confirmation &&
                  user.password_confirmation !== ''
              "
              class="text-xs text-red-500"
            >
              Passwords must match!
            </p>
          </div>

          <div class="pt-2 flex">
            <img
              class="inline h-5 my-auto mr-1 w-1/10"
              src="../../assets/images/icons/question.png"
              alt=""
            />
            <select
              v-model="user.security_question"
              class="inline w-full authInputField py-2 bg-transparent"
            >
              <option value="null" selected>Select a security question</option>
              <option
                v-for="question in security_questions"
                :value="question.id"
                :key="question.id"
                >{{ question.question }}</option
              >
            </select>
          </div>

          <div>
            <input
              type="text"
              v-model="user.security_question_answer"
              class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
              placeholder="Answer to chosen question"
            />
          </div>

          <div class="pt-10">
            <button
              :disabled="stepTwoBtnDisabled"
              type="button"
              class="rounded-lg py-1 w-full designActionButton authInputField"
              @click="register"
              @keyup.enter="register"
            >
              Continue
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
  name: "Register",
  components: {
    AuthLayout
  },
  data: function() {
    return {
      registerStep: 1,
      user: new User("", "", "", "", "", null, ""),
      security_questions: [],
      errors: false
    };
  },
  mounted() {
    this.getSecurityQuestions();
  },
  methods: {
    register() {
      this.$store
        .dispatch("auth/register", this.user)
        .then(res => {
          this.$router.push({ name: "Pricing Plans" });
          this.$store.dispatch("auth/setUserAction");
        })
        .catch(error => {
          this.errors = error.errors;
        });
    },
    getSecurityQuestions() {
      let axiosNoAuth = this.$axios.create();
      delete axiosNoAuth.defaults.headers.common["Authorization"];
      axiosNoAuth.get("auth/security/questions/").then(res => {
        this.security_questions = res.data;
      });
    },
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validate() {
      if (!this.validateEmail(this.user.email)) {
        this.errors = { errors: "Please enter a valid e-mail address" };
      } else {
        this.errors = false;
        this.registerStep = 2;
      }
    }
  },
  computed: {
    stepOneBtnDisabled() {
      return (
        this.user.username === "" ||
        this.user.email === "" ||
        this.user.farm_name === ""
      );
    },
    stepTwoBtnDisabled() {
      return (
        this.user.password === "" ||
        this.user.password_confirmation === "" ||
        this.user.security_question === null ||
        this.user.security_question_answer === "" ||
        this.user.password !== this.user.password_confirmation
      );
    }
  }
};
</script>
