import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  setGame({ state }, game) {
    state.game = game;
  },
  setUser({ state }, user) {
    state.user = user;
  },
};

// getters are functions
const getters = {
  getGame: _state => _state.game,
  getUser: _state => _state.user,
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state: {
    game: undefined,
    user: undefined,
  },
  getters,
  actions,
  mutations,
});
