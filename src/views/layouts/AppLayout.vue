<template>
  <div class="AppLayout">
    <nav class="AppLayout__nav">
      <TopNavbar></TopNavbar>
    </nav>
    <main class="AppLayout__main">
      <left-navbar></left-navbar>
      <div class="pt-16 ml-0 sm:ml-24 h-screen">
        <slot />
      </div>
    </main>
    <footer class="AppLayout__footer">
      <router-view></router-view>
    </footer>
  </div>
</template>

<script>
import LeftNavbar from "../../components/partials/LeftNavbar";
import TopNavbar from "../../components/partials/TopNavbar";

export default {
  name: "AppLayout",
  components: {
    LeftNavbar,
    TopNavbar
  }
};
</script>
