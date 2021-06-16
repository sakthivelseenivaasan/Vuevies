import { router } from '../router';

const state = {
    user:""
}

const actions = {
    login({commit }, { email, password }) {
        if(password.length)
        commit('loginRequest', { email });
        router.push('/movie');
    },
    logout({ commit }) {
        commit('logout');
        router.push('/login');
    }
};

const mutations = {
    loginRequest(state, user) {
        state.user = user.email;
    },
    logout(state) {
        state.user = null;
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};