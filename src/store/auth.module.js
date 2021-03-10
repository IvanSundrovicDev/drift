import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "@/helpers/auth-header";

export const auth = {
  namespaced: true,
  state: {
    user: "",
    userTutorial: "",
    status: {
      loggedIn: false
    }
  },
  actions: {
    login({ commit, dispatch }, user) {
      return AuthService.login(user).then(
        async user => {
          commit("loginSuccess", user);
          axios.defaults.headers.common = authHeader();
          await dispatch("setUserAction");
          await dispatch("setUserSubscription");
          return Promise.resolve(user);
        },
        error => {
          commit("loginFailure");
          return Promise.reject(error.response.data);
        }
      );
    },
    logout({ commit }, user) {
      AuthService.logout();
      delete axios.defaults.headers.common["Authorization"];
      commit("logout");
      return Promise.resolve("/");
    },
    async register({ commit, dispatch }, user) {
      return await AuthService.register(user).then(
        response => {
          axios.defaults.headers.common = authHeader();
          commit("registerSuccess");
          return Promise.resolve(response);
        },
        error => {
          commit("registerFailure");
          return Promise.reject(error.response.data);
        }
      );
    },
    async setUserAction(context) {
      await axios.get("auth/users/me/").then(res => {
        context.commit("setUser", res.data.user);
      });
    },

    async setUserSubscription() {
      const cookies = document.cookie;
      const jwtCookie = cookies.includes("jwt")
        ? cookies.split("jwt=")[1].split(";")[0]
        : "";
      const jwt = jwtCookie ? JSON.parse(jwtCookie) : "";

      if (!jwt) return;

      await axios
        .get("subscription/me/", {
          headers: { Authorization: "JWT " + jwt.access }
        })
        .then(res => {
          localStorage.removeItem("subscription");
          localStorage.setItem("subscription", res.data.subscription.plan);
        })
        .catch(err => {});
    }
  },
  mutations: {
    setUser(state, value) {
      state.user = value;
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = "";
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = "";
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
