
import Vue from 'vue';
// @ts-ignore
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/log';
import './plugins/sockets';
import './style/style.css';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

Vue.config.productionTip = false;
Vue.component('vue-draggable-resizable', require('vue-draggable-resizable'));

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
