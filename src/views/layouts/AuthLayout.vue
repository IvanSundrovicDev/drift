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

      <div
        class="grid grid-flow-col auto-cols-max h-screen justify-center w-auto"
      >
        <div>
          <div class="flex items-center h-screen">
            <div
              class="grid grid-cols-2 gap-x-0 rounded-lg shadow-lg rounded-2xl"
            >
              <div class="rounded-l-2xl text-white authLeftSide">
                <img
                  class="m-auto my-10"
                  src="../../assets/images/drift-logo-transparent.png"
                  alt="DRIFT"
                />
                <div class="mx-8">
                  <p class="abc">
                    Easily set up and manage your farms and fields
                  </p>
                  <p class="mt-10 abc">
                    At the glance of a screen, know which field is best to spray
                    and why
                  </p>
                  <p class="mt-10">
                    See your drift pattern and it’s compatibility with
                    neighbouring fields
                  </p>
                  <p class="mt-10">
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
  height: 466px;
  width: 650px;
  font-family: "SFProDisplay", Arial;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  letter-spacing: 0.008em;
  line-height: 25px;
}
</style>
