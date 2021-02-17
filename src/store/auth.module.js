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
      await axios.get("auth/users/me").then(res => {
        context.commit("setUser", res.data.user);
      });
    },

    async setUserSubscription() {
      let jwt = JSON.parse(localStorage.getItem("jwt"));
      await axios
        .get("subscription/me/", {
          headers: { Authorization: "JWT " + jwt.access }
        })
        .then(res => {
          localStorage.removeItem("subscription");
          localStorage.setItem("subscription", "F");
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
