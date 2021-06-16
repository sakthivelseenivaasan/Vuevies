import Vue from 'vue';
import Router from 'vue-router';
import loginComponent from "./components/loginComponent.vue";
import movieListComponent from "./components/movieListComponent.vue";


const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch(err => err);
};
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: "/login", component: loginComponent },
    { path: "/movie", component: movieListComponent, name: "movie" },
    { path: '*', redirect: '/login' }
  ]
});
