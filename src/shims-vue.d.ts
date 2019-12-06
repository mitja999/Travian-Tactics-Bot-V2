

import Vue, { ComponentOptions } from "vue";
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}


 declare module 'vuejs-logger'{
  interface Vue {
    $log: object;
  }
 }
