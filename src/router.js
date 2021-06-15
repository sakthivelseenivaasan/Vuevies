import Vue from 'vue';
import Router from 'vue-router';
import loginComponent from "./components/LoginComponent.vue";
import movieDetail from "./components/MovieList.vue";

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: "/login", component: loginComponent },
    { path: "/movie", component: movieDetail, name: "movie" },
    { path: '*', redirect: '/login' }
  ]
});
