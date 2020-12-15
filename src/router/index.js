import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/auth/Login";
import Dashboard from "../views/Dashboard";
import Register from "../views/auth/Register";
import ForgotPassword from "../views/auth/ForgotPassword";
import PricingPlansList from "../views/pricingPlans/PricingPlansList";
import HerbicidesList from "../views/herbicides/HerbicidesList";

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
    path: "/herbicides",
    name: "Herbicides",
    component: HerbicidesList
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/register", "/password_reset", "/pricing_plans"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  if (authRequired && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
