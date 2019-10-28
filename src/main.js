import Vue from "vue";
import Build from "./gui/build.vue";
import Buildfinder from "./gui/buildfinder.vue";
import Trade from "./gui/trade.vue";
import Hero from "./gui/hero.vue";
import Farmfinder from "./gui/farmfinder.vue";
import Farm from "./gui/farm.vue";
import Train from "./gui/train.vue";
import Setting from "./gui/setting.vue";
import Logs from "./gui/logs.vue";
import Tasks from './gui/tasks.vue';
import VueLogger from "vuejs-logger";

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
//import './gui/css/vuetify.css';
import TravianSideBar from "./gui/sidebar.vue";
import VueWorker from "vue-worker";
import store from "./store";
import VueDraggableResizable from "vue-draggable-resizable";
import VueLocalStorage from "vue-localstorage";

import VueTimers from 'vue-timers'

require("./gui/css/style.css");

Vue.component("vue-draggable-resizable", VueDraggableResizable);
Vue.component("travian-side-bar", TravianSideBar);
Vue.component("build", Build);
Vue.component("trade", Trade);
Vue.component("hero", Hero);
Vue.component("farm", Farm);
Vue.component("train", Train);
Vue.component("setting", Setting);
Vue.component("logs", Logs);
Vue.component('tasks', Tasks);
Vue.component("farmfinder", Farmfinder);
Vue.component("buildfinder", Buildfinder);

const options = {
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: "debug",
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: false,
  // optional : defaults to false if not specified
  showMethodName: true,
  // optional : defaults to '|' if not specified
  separator: "|",
  // optional : defaults to false if not specified
  showConsoleColors: false
};

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

Vue.use(VueWorker);
Vue.use(VueLogger, options);
Vue.use(VueTimers)
//ue.use(VueRouter);

Vue.use(Vuetify, {
  theme: {
    primary: "#3f51b5"
  }
});

Vue.use(VueLocalStorage);


window.vue = new Vue({
  el: "#app",
  store,
  data() {
    return {
      CheckLogic: require("./engine/checkLogic.js"),
      Simulator: require("./engine/buildAlgorythm/simulator.js"),
      Golder: require("./engine/golder.js"),
      initiated: false,
      logOut: false
    };
  },
  timers: {
    log: {
      time: 100, autostart: true, repeat: true, immediate: false, isSwitchTab: true, callback: async function () {
        this.$timer.stop("log");
        let t = new Date();
        if (!this.$store.state.executing) {
          if (this.$store.state.Player.start) {
            if (this.logOut) {
              let timelogout = new Date();
              timelogout.setSeconds(timelogout.getSeconds() + 10);
              if (timelogout > this.$store.state.taskCheckTime) {
                this.logOut = false;
                this.$store.state.iframesrc = this.$store.state.Player.url + (this.$store.state.Player.version * 1 === 5 ? "" : "/dorf2.php");
              }
            }
            if (t > this.$store.state.taskCheckTime) {
              await this.CheckLogic.checkTasks();
              this.calculateTimerTime();
            }
            this.$store.state.taskStatus = ((this.$store.state.taskCheckTime - t) / 1000).toFixed(0);
          } else {
            this.$store.state.taskStatus = "Stop"
          }
        }
        this.$timer.start("log");
      }
    },
    initplayer: {
      time: 3000, autostart: true, repeat: true, immediate: false, isSwitchTab: true, callback: async function () {
        if (
          !this.$store.state.Player.loggedIn ||
          this.$store.state.Player.playerId === 0
        ) {
          this.$store.state.Player.loggedIn = false;
          console.log("getPlayer");
          this.getPlayer();
        } else {
          console.log("clear getPlayer interval");
          if (this.$store.state.options.style.start) {
            this.$store.state.Player.start = false;
            this.startBot();
          } this.$timer.stop("initplayer");
        }
      }
    },
    checkVersion: {
      time: 36000000, autostart: true, repeat: true, immediate: false, isSwitchTab: true, callback: async function () {
        location.reload(true);
      }
    }
  },
  methods: {
    calculateTimerTime() {
      let s = Math.floor(Math.random() * (this.$store.state.Player.options.taskchecktime.max * 1 - this.$store.state.Player.options.taskchecktime.min * 1)) + this.$store.state.Player.options.taskchecktime.min * 1;
      let t = new Date();
      t.setSeconds(t.getSeconds() + s);
      this.$store.state.taskCheckTime = t;
      if (new Date() > this.$store.state.taskWorkingTime) {
        s = Math.floor(Math.random() * (this.$store.state.Player.options.workingdurationtime.max * 1 - this.$store.state.Player.options.workingdurationtime.min * 1)) + this.$store.state.Player.options.workingdurationtime.min * 1;
        let s1 = Math.floor(Math.random() * (this.$store.state.Player.options.sleeptime.max * 1 - this.$store.state.Player.options.sleeptime.min * 1)) + this.$store.state.Player.options.sleeptime.min * 1;
        t = new Date();
        t.setMinutes(t.getMinutes() + s + s1);
        this.$store.state.taskWorkingTime = t;
        t = new Date();
        t.setMinutes(t.getMinutes() + s1);
        this.$store.state.taskCheckTime = t;
        this.logOut = true;
        this.$store.state.iframesrc = "http://traviantactics.com";

        //$store.state.Player.url
      } else if (new Date() > this.$store.state.redirectTime) {
        let rt = new Date();
        let rtminute = Math.floor(Math.random() * (this.$store.state.Player.options.redirect.max * 1 - this.$store.state.Player.options.redirect.min * 1)) + this.$store.state.Player.options.redirect.min * 1;
        rt.setMinutes(rt.getMinutes() + rtminute);
        this.$store.state.redirectTime = rt;
        let src = this.$store.state.Player.url;
        switch (this.$store.state.Player.version * 1) {
          case 5:
            src += this.$store.state.redirectPagesV5[Math.floor(Math.random() * (this.$store.state.redirectPagesV5.length * 1))];
            break;
          default:
            src += this.$store.state.redirectPagesV4[Math.floor(Math.random() * (this.$store.state.redirectPagesV4.length * 1))];
            break;
        }
        this.$store.state.iframesrc = src;
      }
    },
    async startBot() {
      this.$log.debug("start");
      //console.log("Player.version", this.$store.state.Player.version);

      if (!this.$store.state.Player.start) {
        //console.log("this.$store.state.Player.version", this.$store.state.Player.version);
        this.$store.state.taskCheckTime = new Date();
        let s = Math.floor(Math.random() * (this.$store.state.Player.options.workingdurationtime.max * 1 - this.$store.state.Player.options.workingdurationtime.min * 1)) + this.$store.state.Player.options.workingdurationtime.min * 1;
        let t = new Date();
        t.setMinutes(t.getMinutes() + s);
        this.$store.state.taskWorkingTime = t;

        this.$store.state.Player.start = true;
        //this.$store.state.options.style.start = false;

      } else {
        this.$store.state.Player.start = false;
      }
    },
    async getPlayer() {
      if (!this.$store.state.Player.loggedIn) {
        await this.CheckLogic.loadPlayer();
        this.$store.state.Player.options.logs.splice(
          400,
          this.$store.state.Player.options.logs.length - 400
        );
        if (!this.$store.state.Player.loggedIn) {
          return;
        }
        this.initiated = true;
        this.$store.state.selectedVillage = this.$store.state.Player.villages[0];
        await this.CheckLogic.getTasks();
        setTimeout(() => {
          this.$store.state.options.coverdiv = false;
        }, 500);

        if (this.$ret_fun) {
          let playerDomains = await this.CheckLogic.request(
            "",
            "",
            "getCookieOrigins"
          );
          let server = this.$store.state.Player.server2;
          if (!server) {
            server = this.$store.state.Player.url;
          }
          this.$ret_fun({
            username: this.$store.state.Player.name,
            server: server,
            domains: playerDomains
          });
          delete this.$ret_fun;
        }
      }
      return;
    },
    onResize() {
      store.commit("checkDivs");

      this.$store.state.windowdimension = "" + window.innerWidth + "-" + window.innerHeight;
      setTimeout(() => {
        this.$store.state.options.coverdiv = false;
      }, 300);
    }
  },
  created: async function () {
    let url = decodeURIComponent(window.location.href.substring(decodeURIComponent(window.location.href.indexOf('name=') + 5)));
    if (url.indexOf('http') === -1) {
      url = 'https://' + url;
    }
    let hostname = (new URL(url)).hostname;
    if (window.location.href.indexOf('name=') != -1) {

      if (hostname.indexOf("kingdoms") !== -1) {
        hostname = "https://" + hostname;
      }
      else if (hostname.indexOf("www.travian") !== -1) {
        hostname = "https://" + hostname;
      } else if (hostname.indexOf("travian") !== -1) {
        hostname = "https://" + hostname + "/dorf1.php";
      } else {
        hostname = "http://traviantactics.com/#install";
      }
    } else {
      hostname = "http://traviantactics.com/#install";

    }
    this.$store.state.iframesrc = hostname;
    this.$store.state.localStorage = this.$localStorage;
    this.CheckLogic.init(this.$store.state, this.$log);
    this.CheckLogic.lock = false;
    await this.CheckLogic.getConfig(this.options);

    this.$store.state.options.style.setting.show = true;
    this.$store.state.options.style.build.show = false;
    this.$store.state.options.style.buildfinder.show = false;
    this.$store.state.options.style.farm.show = false;
    this.$store.state.options.style.farmfinder.show = false;
    this.$store.state.options.style.trade.show = false;
    this.$store.state.options.style.hero.show = false;
    this.$store.state.options.style.logs.show = false;
    this.$store.state.options.style.train.show = false;
    this.$store.state.options.style.tasks.show = false;
    setTimeout(() => {
      this.$store.state.options.coverdiv = false;
    }, 500);

    //await this.registerGolder("https://www.travian.com/si?uc=67429000-d6aa-11e8-2001-01000000111e","kren12345121","kren12345@shayzam121.net")
  },
  mounted: async function () {
    this.$store.state.selectedVillage = this.$store.state.Player.villages[0];
    this.$store.state.Player.loggedIn = false;
    this.$log.debug = console.log;

    if (this.$store.state.options.style.language === "") {
      if (window.location.href.indexOf('name=') != -1) {
        var url = decodeURIComponent(window.location.href.substring(decodeURIComponent(window.location.href.indexOf('name=') + 5)));
        if (url.indexOf('http') === -1) {
          url = 'https://' + url;
        }
        var hostname = (new URL(url)).hostname;
        if (hostname.split("kingdoms.").length === 2) {
          this.$store.state.options.style.language = hostname.split("kingdoms.")[1];
        }
        if (hostname.split("travian.").length === 2) {
          this.$store.state.options.style.language = hostname.split("travian.")[1];
        }
      }
    }

    this.$store.state.lang.setlanguage(this.$store.state.options.style.language);

    this.$store.watch(
      this.$store.getters.getPlayer,
      val => {
        if (this.initiated) {
          this.CheckLogic.setTasks(val);
        }
      },
      {
        immediate: true,
        deep: true
      }
    );

    this.$store.watch(
      this.$store.getters.getOptions,
      val => {
        this.CheckLogic.setConfig();
      },
      {
        immediate: true,
        deep: true
      }
    );

    this.onResize();
  },
  watch: {
    "$store.state.Player.start": async function(val) {
      this.$store.state.options.style.start=val;
    }
  }
});
