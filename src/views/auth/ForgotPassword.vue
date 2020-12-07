<template>
    <auth-layout>

        <div class="p-5 rounded-r-2xl" style="background-color: white">

            <div class="forgot-pwd-step1" v-show="forgotPwdStep === 1">

                <h1 class="m-auto mt-10 mb-5 text-2xl font-semibold">
                    Forgot your password? <br>
                    No worries, just enter your <br>
                    email below </h1>

                <div class="mx-5">

                    <div class="pt-12">
                        <img class="inline" src="../../assets/images/icons/envelope.png" alt="">
                        <span class="my-auto ml-2 align-middle">E-mail address</span>
                    </div>

                    <div>
                        <input type="email"
                               v-model="user.email"
                               class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                               placeholder="Enter your e-mail address"
                        >
                    </div>

                    <div class="pt-16">
                        <button class="rounded-lg py-1 w-full authActionButton" @click="goToStep(2)">Next</button>
                    </div>

                </div>
            </div>

            <div class="forgot-pwd-step1" v-show="forgotPwdStep === 2">

                <h1 class="m-auto mt-10 mb-5 text-2xl font-semibold">
                    Answer your security <br> question below </h1>

                <div class="pt-12">
                    <img class="inline w-1/10" src="../../assets/images/icons/question.png" alt="">
                    <select name="securityQuestion"
                            class="w-9/10 authInputField py-2 bg-transparent">
                        <option v-for="question in security_questions" :key="question.id" :value="question.question">{{ question.question }}</option>
                    </select>
                </div>

                <div>
                    <input
                            type="text"
                            v-model="user.security_question_answer"
                            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Enter your answer here"
                    >
                </div>

                <div class="pt-16">
                    <button class="rounded-lg py-1 w-full authActionButton" @click="goToStep(3)">Next</button>
                </div>

            </div>

            <div class="forgot-pwd-step1" v-show="forgotPwdStep === 3">

                <h1 class="m-auto mt-10 mb-5 text-2xl font-semibold">
                    Create your new password </h1>

                <div class="pt-12">
                    <img class="inline" src="../../assets/images/icons/lock.png" alt="">
                    <span class="my-auto ml-2 align-middle">Password</span>
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
                    <span class="my-auto ml-2 align-middle">Password confirmation</span>
                </div>

                <div>
                    <input
                            type="password"
                            v-model="user.password_confirmation"
                            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Enter your password confirmation"
                    >
                </div>

                <div class="pt-16">
                    <button class="rounded-lg py-1 w-full authActionButton" @click="complete()">Next</button>
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
        name: "ForgotPassword",
        components: {
            AuthLayout
        },
        data: function () {
            return {
                user: new User(),
                forgotPwdStep: 1,
                security_questions: []
            }
        },
        methods: {
            goToStep(step) {
                if(step === 2) {
                    //TODO verify email
                    this.forgotPwdStep = 2
                }
                if(step === 3) {
                    //TODO verify security question
                    this.forgotPwdStep = 3
                }
            },
            complete() {
                //TODO store new password and redirect to login screen
            },
            getUsersSecurityQuestions() {
                this.$axios.get(API_URL + 'security/questions').then(res => {
                    this.security_questions = res.data
                })
            }
        },
        mounted() {
            this.getUsersSecurityQuestions()
        }
    }
</script>