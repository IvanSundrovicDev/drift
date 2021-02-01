import AuthService from "../services/auth.service";
import axios from "axios";
import authHeader from "@/helpers/auth-header";

export const auth = {
  namespaced: true,
  state: {
    user:"",
    userTutorial: "",
    status:{
      loggedIn:false
      }
    },
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit("loginSuccess", user);
          axios.defaults.headers.common = authHeader()
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
      delete axios.defaults.headers.common['Authorization']
      commit("logout");
      return Promise.resolve("/")
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },
        error => {
          commit("registerFailure");
          return Promise.reject(error.response.data);
        }
      );
    },
    setUserAction(context) {
      axios.get("auth/users/me").then(res => {
        context.commit("setUser", res.data.user)
      })
    },
    setUserTutorialAction(context) {
      axios.get("tutorials/me/").then(res => {
        context.commit('setUserTutorial', res.data.user_tutorial)
      })
    },
  },
  mutations: {
    setUser(state, value) {
      state.user = value
    },
    setUserTutorial(state, value) {
      state.userTutorial = value
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = '';
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = '';
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
