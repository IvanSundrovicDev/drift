<template>
  <div class="AuthLayout">
    <nav class="AuthLayout__nav"></nav>
    <main class="AuthLayout__main relative">
      <router-link
        class="absolute top-8 right-10 rounded-lg designInverseButton"
        v-if="this.$route.name === 'Register'"
        :to="{ name: 'Login' }"
        >Login</router-link
      >
      <router-link
        class="absolute top-8 right-10 rounded-lg designInverseButton"
        v-else
        :to="{ name: 'Register' }"
        >Sign Up</router-link
      >

      <div class="">
        <div class="flex h-screen w-full">
          <div class="m-auto w-full md:w-auto">
            <div
              class="flex flex-wrap rounded-lg shadow-lg rounded-2xl mx-16 md:mx-8"
            >
              <slot />
            </div>
          </div>
        </div>
      </div>
    </main>
    <footer class="AuthLayout__footer"></footer>
  </div>
</template>

<script>
export default {
  name: "AuthLayout"
};
</script>

<style>
.AuthLayout {
  background-color: rgba(40, 170, 225, 0.8);
}
.authInputField:focus {
  outline: 0;
}
.authLeftSide {
  background-color: #28aae1;

  font-family: "SFProDisplay", Arial;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  letter-spacing: 0.008em;
  line-height: 25px;
}
</style>
