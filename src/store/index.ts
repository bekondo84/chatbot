import { createStore } from "vuex";

export default createStore({
  state: {
    session: null,
    chatgpt : null
  },
  getters: {
    getSession(state) {
        return state.session ;
    }, getChatgpt(state) {
        return state.chatgpt;
    }
  },
  mutations: {
    setSession(state, session) {
          state.session = session ;
    }, setChatgpt(state, item) {
        state.chatgpt = item;
    }
  },
  actions: {},
  modules: {},
});
