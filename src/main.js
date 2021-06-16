import Vue from "vue";
import { store } from './store/store';
import { router } from './router';
import App from './App';
import { createProvider } from "./vue-apollo";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./main.css";
// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

require('./filter/dateFilter');
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
//Vue.use(vueRouter);
Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");