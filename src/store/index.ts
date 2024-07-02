import { createStore } from "vuex";

export default createStore({
  state: {
    session: null
  },
  getters: {
    getSession(state) {
        return state.session ;
    }
  },
  mutations: {
    setSession(state, session) {
          state.session = session ;
    }
  },
  actions: {},
  modules: {},
});
