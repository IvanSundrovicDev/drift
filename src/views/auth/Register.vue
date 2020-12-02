<template>
    <auth-layout>

        <div class="p-5 rounded-r-2xl" style="background-color: white">

            <div class="register-step-1" v-show="registerStep === 1">
                <h1 class="m-auto mt-10 mb-5 text-center text-2xl font-semibold">Let's get started</h1>

                <div class="mx-5">

                    <div class="pt-2">
                        <img class="inline" src="../../assets/images/icons/user.png" alt="">
                        <span class="my-auto ml-2 align-middle">Full name</span>
                    </div>

                    <div>
                        <input
                            type="text"
                           v-model="user.full_name"
                           class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                           placeholder="Enter your full name here"
                        >
                    </div>

                    <div class="pt-5">
                        <img class="inline" src="../../assets/images/icons/envelope.png" alt="">
                        <span class="my-auto ml-2 align-middle">E-mail address</span>
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
                        <span class="my-auto ml-2 align-middle">Farm name</span>
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
                        <button class="rounded-lg py-1 w-full authActionButton" @click="goToStep2()">Continue</button>
                    </div>

                </div>

            </div>

            <div class="register-step-1" v-show="registerStep === 2">

                <h1 class="m-auto mt-10 mb-5 text-center text-2xl font-semibold">Let's get started</h1>

                <div class="mx-5">

                    <div class="pt-2">
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
                            class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                            placeholder="Enter your password confirmation"
                        >
                    </div>

                    <div class="pt-2">
                        <img class="inline w-1/10" src="../../assets/images/icons/question.png" alt="">
                        <select name="securityQuestion"
                                v-model="user.security_question"
                                class="w-9/10 authInputField py-2 bg-transparent"
                        >
                            <option value="null" selected>Select a security question</option>
                            <option v-for="question in security_questions" :value="question" :key="question">{{ question }}</option>
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
                        <button class="rounded-lg py-1 w-full authActionButton" @click="register()">Register</button>
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
        data: function () {
            return {
                registerStep: 1,
                user: new User('','','','', null, ''),
                security_questions: []
            }
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push('/dashboard');
            }
            this.getSecurityQuestions()
        },
        methods: {
            goToStep2() {
                this.registerStep = 2
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
                this.security_questions = [
                    'dsadasdad', 'adasdasda', '42342342'
                ]
            }
        }
    }
</script>