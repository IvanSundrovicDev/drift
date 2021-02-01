import axios from "axios";

export const tutorial = {
  namespaced: true,
  state: {
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
        console.log(res);
        context.commit("setUserTutorial", res.data.user_tutorial);
      });
    },
    setFarmTutorialStep(contex) {
      contex.commit("setFarmTutorialStep");
    },
    setFarmTutorialDone(contex) {
      contex.commit("setFarmTutorialDone");
    },
    setHerbicideTutorialStep(contex) {
      contex.commit("setHerbicideTutorialStep");
    },
    setHerbicideTutorialDone(contex) {
      contex.commit("setHerbicideTutorialDone");
    },
    setTraitTutorialDone(contex) {
      contex.commit("setTraitTutorialDone");
    },
    setMixTutorialStep(contex) {
      contex.commit("setMixTutorialStep");
    },
    setMixTutorialDone(contex) {
      contex.commit("setMixTutorialDone");
    }
  },
  mutations: {
    setUserTutorial(state, value) {
      console.log(value);
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
