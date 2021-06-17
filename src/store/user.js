import { router } from '../router';

const state = {
   userData:{}
}

const actions = {
    login({commit }, user) {
        commit('loginRequest', user );
        router.push('/movie');
    },
    logout({ commit }) {
        localStorage.removeItem('movie_user');
        localStorage.removeItem('user_apolo_token');
        commit('logout');
        router.push('/login');
    },
    localStorageUser({commit},user){
        commit('loginRequest', user );
    }
};

const mutations = {
    loginRequest(state, user) {
        state.userData = user;
    },
    logout(state) {
        state.userData = {};
    }
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};