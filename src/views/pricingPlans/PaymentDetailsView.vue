<template>
  <div class="bg-drift-blue ">
    <router-link
      class="absolute top-8 right-10 rounded-lg designInverseButton"
      :to="{ name: 'Register' }"
      >Sign Up</router-link
    >
    <div class="flex h-screen">
      <PaymentDetails />
    </div>
  </div>
</template>

<script>
import PaymentDetails from "../../components/partials/PaymentDetails";

export default {
  name: "PaymentDetailsView",
  components: { PaymentDetails }
};
</script>

<style scoped>
.payment-custom-button {
  height: 44px;
}
</style>
