import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Login from "../views/auth/Login";
import Dashboard from "../views/Dashboard";
import Register from "../views/auth/Register";
import ForgotPassword from "../views/auth/ForgotPassword";
import PricingPlansList from "../views/pricingPlans/PricingPlansList";
import PaymentDetails from "../views/pricingPlans/PaymentDetailsView";
import CropList from "../views/CropList";
import HerbicideList from "../views/HerbicideList";
import TraitList from "../views/TraitList";
import TankMix from "../views/TankMix";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/password_reset",
    name: "Forgot Password",
    component: ForgotPassword
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/pricing_plans",
    name: "Pricing Plans",
    component: PricingPlansList
  },
  {
    path: "/payment_details",
    name: "Payment Details",
    component: PaymentDetails
  },
  {
    path: "/crops",
    name: "Crops",
    component: CropList
  },
  {
    path: "/herbicides",
    name: "Herbicides",
    component: HerbicideList
  },
  {
    path: "/traits",
    name: "Traits",
    component: TraitList
  },
  {
    path: "/tank_mix",
    name: "Tank Mix",
    component: TankMix
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "/",
    "/register",
    "/password_reset",
    "/pricing_plans",
    "/payment_details",
    "/pricing_plans"
  ];
  const authRequired = !publicPages.includes(to.path);
  const jwt = JSON.parse(localStorage.getItem("jwt"));
  let subscription = localStorage.getItem("subscription");

  if (authRequired && !jwt) {
    next("/");
  } else if (authRequired && jwt && !subscription) {
    next("/pricing_plans");
  } else if ((to.path === "/" && jwt) || (to.path === "/register" && jwt)) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
