import axios from "axios";

export const tutorial = {
  namespaced: true,
  state: {
    loaded: false,
    farmTutorial: 0,
    farmTutorialDone: false,
    herbicideTutorial: 0,
    herbicideTutorialDone: false,
    traitTutorialDone: false,
    mixTutorial: 0,
    mixTutorialDone: false
  },
  actions: {
    setUserTutorial(context) {
      axios.get("tutorials/me/").then(res => {
        context.commit("setUserTutorial", res.data.user_tutorial);
      });
    },
    setFarmTutorialStep(contex) {
      contex.commit("setFarmTutorialStep");
    },
    setFarmTutorialDone({commit, state}) {
      let tutorial = {
        farms: true,
        herbicides: state.herbicideTutorialDone,
        traits: state.traitTutorialDone,
        tank_mix: state.mixTutorialDone
      }
      axios.patch("tutorials/me/" , tutorial).then(res => {
        commit("setFarmTutorialDone");
      });
    },
    setHerbicideTutorialStep(contex) {
      contex.commit("setHerbicideTutorialStep");
    },
    setHerbicideTutorialDone({commit, state}) {
      let tutorial = {
        farms: state.farmTutorialDone,
        herbicides: true,
        traits: state.traitTutorialDone,
        tank_mix: state.mixTutorialDone
      }
      axios.patch("tutorials/me/" , tutorial).then(res => {
        commit("setHerbicideTutorialDone");
      });
    },
    setTraitTutorialDone({commit, state}) {
      let tutorial = {
        farms: state.farmTutorialDone,
        herbicides: state.herbicideTutorialDone,
        traits: true,
        tank_mix: state.mixTutorialDone
      }
      axios.patch("tutorials/me/" , tutorial).then(res => {
        commit("setTraitTutorialDone");
      });
    },
    setMixTutorialStep(contex) {
      contex.commit("setMixTutorialStep");
    },
    setMixTutorialDone({commit, state}) {
      let tutorial = {
        farms: state.farmTutorialDone,
        herbicides: state.herbicideTutorialDone,
        traits: state.traitTutorialDone,
        tank_mix: true
      }
      axios.patch("tutorials/me/" , tutorial).then(res => {
        commit("setMixTutorialDone");
      });
    }
  },
  mutations: {
    setUserTutorial(state, value) {
      state.farmTutorialDone = value.farms
      state.herbicideTutorialDone = value.herbicides
      state.traitTutorialDone = value.traits
      state.mixTutorialDone = value.tank_mix
      state.loaded = true
    },
    setFarmTutorialStep(state) {
      state.farmTutorial = state.farmTutorial + 1;
    },
    setFarmTutorialDone(state) {
      state.farmTutorialDone = true;
    },
    setHerbicideTutorialStep(state) {
      state.herbicideTutorial = state.herbicideTutorial + 1;
    },
    setHerbicideTutorialDone(state) {
      state.herbicideTutorialDone = true;
    },
    setTraitTutorialDone(state) {
      state.traitTutorialDone = true;
    },
    setMixTutorialStep(state) {
      state.mixTutorial = state.mixTutorial + 1;
    },
    setMixTutorialDone(state) {
      state.mixTutorialDone = true;
    }
  }
};
