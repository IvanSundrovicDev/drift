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
              <div
                class="hidden md:block md:w-1/2 p-10 rounded-t-2xl md:rounded-t-none  md:rounded-l-2xl text-white authLeftSide h-auto"
              >
                <img
                  class="m-auto mb-10"
                  src="../../assets/images/drift-logo-transparent.png"
                  alt="DRIFT"
                />
                <div class="mx-2">
                  <p class="abc">
                    Easily set up and manage your farms and fields
                  </p>
                  <p class="mt-4 abc">
                    At the glance of a screen, know which field is best to spray
                    and why
                  </p>
                  <p class="mt-4">
                    See your drift pattern and it’s compatibility with
                    neighbouring fields
                  </p>
                  <p class="mt-4">
                    Create your favourite tank mixes
                  </p>
                </div>
              </div>

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
