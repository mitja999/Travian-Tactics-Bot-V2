
import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './style/style.css';
import log from "vuejs-logger";

import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
Vue.config.productionTip = false;
Vue.prototype.$log = log;
Vue.component('vue-draggable-resizable', require('vue-draggable-resizable'));
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
