import Vue from "vue";
import App from "./App.vue";
import loginComponent from "./components/LoginComponent.vue";
import { createProvider } from "./vue-apollo";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import vueRouter from "vue-router";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(vueRouter);
Vue.config.productionTip = false;
const routes = [{ path: "/login", component: loginComponent }];
const router = new vueRouter({
  routes,
});
new Vue({
  apolloProvider: createProvider(),
  router,
  render: (h) => h(App),
}).$mount("#app");
