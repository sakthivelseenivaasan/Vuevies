import { router } from '../router';

const state = {
    user:""
}

const actions = {
    login({commit }, { email, password }) {
        localStorage.setItem("user",email);
        if(password.length)
        commit('loginRequest', { email });
        router.push('/movie');
    },
    logout({ commit }) {
        localStorage.removeItem('user');
        commit('logout');
        router.push('/login');
    },
    localStorageUser({commit},{email}){
        commit('loginRequest', { email });
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