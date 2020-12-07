<template>
    <auth-layout>

        <div class="p-5 rounded-r-2xl" style="background-color: white">

            <div class="register-step-1" v-show="registerStep === 1">
                <h1 class="m-auto mt-10 mb-5 text-center text-2xl font-semibold">Let's get started</h1>

                    <div class="mx-5">

                        <div class="pt-2">
                            <img class="inline" src="../../assets/images/icons/user.png" alt="">
                            <span class="my-auto ml-2 align-middle">Full name <span class="designColor">*</span></span>
                        </div>

                        <div>
                            <input
                                type="text"
                                v-model="user.username"
                                class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                                placeholder="Enter your full name here"
                                autofocus
                            >
                        </div>

                        <div class="pt-5">
                            <img class="inline" src="../../assets/images/icons/envelope.png" alt="">
                            <span class="my-auto ml-2 align-middle">E-mail address <span class="designColor">*</span></span>
                        </div>

                        <div>
                            <input
                                type="email"
                                v-model="user.email"
                                class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                                placeholder="Enter your e-mail address"
                            >
                        </div>

                        <div class="pt-5">
                            <img class="inline" src="../../assets/images/icons/farm.png" alt="">
                            <span class="my-auto ml-2 align-middle">Farm name <span class="designColor">*</span></span>
                        </div>

                        <div>
                            <input
                                type="text"
                                v-model="user.farm_name"
                                class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                                placeholder="Enter the name of your farm"
                            >
                        </div>

                        <div class="pt-7">
                            <button type="button" class="rounded-lg py-1 w-full authActionButton" @click="goToStep2()">Continue</button>
                        </div>

                    </div>

            </div>

            <div class="register-step-1" v-show="registerStep === 2">

                <h1 class="m-auto mt-10 mb-5 text-center text-2xl font-semibold">Let's get started</h1>

                <div class="mx-5">

                    <div class="pt-2">
                        <img class="inline" src="../../assets/images/icons/lock.png" alt="">
                        <span class="my-auto ml-2 align-middle">Password <span class="designColor">*</span></span>
                    </div>

                    <div>
                        <input
                            type="password"
                            v-model="user.password"
                            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Enter your password"
                        >
                    </div>

                    <div class="pt-2">
                        <img class="inline" src="../../assets/images/icons/lock.png" alt="">
                        <span class="my-auto ml-2 align-middle">Password confirmation <span class="designColor">*</span></span>
                    </div>

                    <div>
                        <input
                            type="password"
                            v-model="user.password_confirmation"
                            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Enter your password confirmation"
                        >
                        <small v-if="(user.password !== user.password_confirmation) && (user.password_confirmation !== '')"
                               class="text-red-500">
                            Passwords must match!
                        </small>
                    </div>

                    <div class="pt-2">
                        <img class="inline w-1/10" src="../../assets/images/icons/question.png" alt="">
                        <select
                                v-model="user.security_question"
                                class="w-9/10 authInputField py-2 bg-transparent"
                        >
                            <option value="null" selected>Select a security question</option>
                            <option v-for="question in security_questions" :value="question.id" :key="question.id">{{ question.question }}</option>
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            v-model="user.security_question_answer"
                            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Answer to chosen question"
                        >
                    </div>

                    <div class="pt-7">
                        <button type="button" class="rounded-lg py-1 w-full authActionButton authInputField" @click="register">Register</button>
                    </div>

                </div>
            </div>
        </div>

    </auth-layout>
</template>

<script>
    import AuthLayout from "../layouts/AuthLayout";
    import User from "../../models/user";
    import {API_URL} from "../../main";

    export default {
        name: "Register",
        components: {
            AuthLayout
        },
        data: function () {
            return {
                registerStep: 1,
                user: new User('','','','','', null, ''),
                security_questions: []
            }
        },
        methods: {
            goToStep2() {
                if (this.user.username && this.user.email && this.user.farm_name) {
                    this.registerStep = 2
                }
            },
            register() {
                console.log(this.user)
                this.$store.dispatch('auth/register', this.user).then(
                    data => {
                        console.log(data)
                    },
                    error => {
                        console.log(error)
                    }
                );
            },
            getSecurityQuestions()
            {
                this.$axios.get(API_URL + 'security/questions').then((res) => {
                    this.security_questions = res.data
                })
            }
        },
        mounted() {
            this.getSecurityQuestions()
        }
    }
</script>