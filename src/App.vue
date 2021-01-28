<template>
  <div class="App">
    <router-view />
    <Notifications />
  </div>
</template>

<script>
import Notifications from "./components/common/Notifications";
export default {
  components: { Notifications }
};
</script>
<style>
@font-face {
  font-family: "SFProDisplay";
  src: local("SFProDisplay"),
    url("assets/fonts/SFProDisplay-Regular.ttf") format("truetype");
}
</style>
