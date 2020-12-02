<template>
    <auth-layout>
        <div class="p-5 rounded-r-2xl" style="background-color: white">
            <div>

                <h1 class="m-auto my-10 text-center text-2xl font-semibold">Welcome back</h1>

                <div class="mx-5">
                    <div class="pt-7">
                        <img class="inline" src="../../assets/images/icons/envelope.png" alt="">
                        <span class="my-auto ml-2 align-middle">E-mail address</span>
                    </div>
                    <div>
                        <input type="email"
                               class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                               placeholder="Enter your e-mail address"
                        >
                    </div>

                    <div class="pt-12">
                        <img class="inline" src="../../assets/images/icons/lock.png" alt="">
                        <span class="my-auto ml-2 align-middle">Password</span>
                    </div>
                    <div>
                        <input
                                type="password"
                                class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 authInputField py-2"
                                placeholder="Enter your password"
                        >
                    </div>

                    <div class="pt-7">
                        <button class="rounded-lg py-1 w-full authActionButton" @click="login()">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </auth-layout>
</template>

<script>
    import AuthLayout from "../layouts/AuthLayout";

    export default {
        name: 'Login',
        components: {
            AuthLayout
        },
        methods: {
            login() {
                this.$router.push('Dashboard')
            }
        }
    };
</script>