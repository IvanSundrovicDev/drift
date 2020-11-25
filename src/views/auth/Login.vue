<template>
    <div>
        <div class="flex items-center justify-center h-screen">

            <div class="grid grid-cols-2 bg-indigo-800 rounded-lg shadow-lg rounded-2xl">

                <div class="rounded-l-2xl text-white" style="background-color: #28AAE1; height: 466px; width: 368px">
                    <img class="m-auto my-10" src="../../assets/images/drift-logo-transparent.png" alt="DRIFT">
                    <div class="mx-8">
                        <p class="font-medium">
                            Easily set up and manage your farms and fields
                        </p>
                        <p class="mt-4 font-medium">
                            At the glance of a screen, know which field is best to spray and why
                        </p>
                        <p class="mt-4 font-medium">
                            See your drift pattern and it’s compatability with neighbourng fields
                        </p>
                        <p class="mt-4 font-medium">
                            Create your favourite tank mixes
                        </p>
                    </div>
                </div>

                <div class="p-5 rounded-r-2xl" style="background-color: white">
                    <div>

                        <h1 class="m-auto my-10 text-center text-2xl font-semibold">Welcome back</h1>

                        <div class="mx-5">
                            <div class="pt-7">
                                <img class="inline" src="../../assets/images/icons/envelope.png" alt="">
                                <span class="my-auto ml-2 align-middle">E-mail address</span>
                            </div>
                            <div>
                                <input type="text"
                                       class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 inputField py-2"
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
                                        class="w-full border-b-2 border-blue-400 focus:border-b-2 focus:border-blue-400 inputField py-2"
                                        placeholder="Enter your password"
                                >
                            </div>

                            <div class="pt-7">
                                <button class="rounded-lg py-1 w-full" id="loginButton" @click="login()">Login</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        methods: {
            login() {
                this.$router.push('Dashboard')
            }
        }
    };
</script>

<style>
    body {
        background-color: rgba(40,170,225,0.8);
    }
    .inputField:focus {
        outline: 0;
    }
    #loginButton {
        color: rgba(40,170,225,1);
        border: 2px solid rgba(40,170,225,1);
    }
    #loginButton:hover {
        color: #FFFFFF;
        background-color: rgba(40,170,225,1);
    }
</style>