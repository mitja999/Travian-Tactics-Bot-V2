

import Vue from 'vue';
import logger from 'vuejs-logger';

Vue.use(logger);
Vue.prototype.$log=logger;

export default logger;
