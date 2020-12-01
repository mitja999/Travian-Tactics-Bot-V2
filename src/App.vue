<template>
  <v-app>
    <v-content>
      <div
        id="coverdiv"
        style="opacity: 0.3; width:100%;height:100%;z-index: 100;position: absolute; background-color: white;"
        v-show="$store.state.options.coverdiv"
      ></div>

      <iframe
        id="traviantacticsFrame"
        :src="$store.state.iframesrc"
        :key="iframeindex"
        style="overflow:hidden; position: fixed; height: 100%; width: 100%; left:0px; top:0px; border: none; z-index: 1; padding: 0px; margin: 0px;"
        alt="Web site is not avaialable"
      ></iframe>

      <buildView v-show="$store.state.options.style.build.show"></buildView>
      <buildfinder
        v-show="$store.state.options.style.buildfinder.show"
      ></buildfinder>
      <farm v-show="$store.state.options.style.farm.show"></farm>
      <trade v-show="$store.state.options.style.trade.show"></trade>
      <train v-show="$store.state.options.style.train.show"></train>
      <hero v-show="$store.state.options.style.hero.show"></hero>
      <setting v-show="$store.state.options.style.setting.show"></setting>
      <tasks v-show="$store.state.options.style.tasks.show"></tasks>

      <!--<commercials
        v-show="$store.state.options.style.commercials.show"
      ></commercials>-->
      <logs v-show="$store.state.options.style.logs.show"></logs>
      <farmfinder
        v-show="$store.state.options.style.farmfinder.show"
      ></farmfinder>
      <sidebar></sidebar>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import hero from "./components/hero.vue";
import commercials from "./components/commercials.vue";
import sidebar from "./components/sidebar.vue";
import buildfinder from "./components/buildfinder.vue";
import farm from "./components/farm.vue";
import trade from "./components/trade.vue";
import train from "./components/train.vue";
import setting from "./components/setting.vue";
import buildView from "./components/build/build.vue";
import tasks from "./components/tasks.vue";
import logs from "./components/logs.vue";
import farmfinder from "./components/farmfinder.vue";
import $store from "@/store";
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
  showConsoleColors: false,
};
declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $log: {
      debug(...args: any[]): void;
      info(...args: any[]): void;
      warn(...args: any[]): void;
      error(...args: any[]): void;
      fatal(...args: any[]): void;
    };
  }
}
export default Vue.extend({
  name: "App",
  components: {
    hero,
    sidebar,
    buildView,
    farmfinder,
    logs,
    tasks,
    setting,
    train,
    trade,
    farm,
    buildfinder,
    commercials,
  },
  data: () => ({
    applyActionV5: require("./engine/applyActionV5.js"),
    applyAction: require("./engine/applyActionV4.js"),
    //Simulator: require("./engine/buildAlgorythm/simulator.js"),
    //Golder: require("./engine/golder.js"),
    initiated: false,
    iframeindex: 0,
    reloadDay: new Date().getUTCDate(),

    iframeReloadCounter: 3600,
    mobile: false,
  }),
  methods: {
    calculateTimerTime() {
      let s =
        Math.floor(
          Math.random() *
            (this.$store.state.Player.options.taskchecktime.max * 1 -
              this.$store.state.Player.options.taskchecktime.min * 1)
        ) +
        this.$store.state.Player.options.taskchecktime.min * 1;
      let t = new Date();
      t.setSeconds(t.getSeconds() + s);
      this.$store.state.taskCheckTime = t;
      if (new Date() > this.$store.state.taskWorkingTime) {
        s =
          Math.floor(
            Math.random() *
              (this.$store.state.Player.options.workingdurationtime.max * 1 -
                this.$store.state.Player.options.workingdurationtime.min * 1)
          ) +
          this.$store.state.Player.options.workingdurationtime.min * 1;
        let s1 =
          Math.floor(
            Math.random() *
              (this.$store.state.Player.options.sleeptime.max * 1 -
                this.$store.state.Player.options.sleeptime.min * 1)
          ) +
          this.$store.state.Player.options.sleeptime.min * 1;
        t = new Date();
        t.setMinutes(t.getMinutes() + s + s1);
        this.$store.state.taskWorkingTime = t;
        t = new Date();
        t.setMinutes(t.getMinutes() + s1);
        this.$store.state.taskCheckTime = t;
        this.$store.state.iframesrc = "http://traviantactics.com";

        //$store.state.Player.url
      } else if (new Date() > this.$store.state.redirectTime) {
        let rt = new Date();
        let rtminute =
          Math.floor(
            Math.random() *
              (this.$store.state.Player.options.redirect.max * 1 -
                this.$store.state.Player.options.redirect.min * 1)
          ) +
          this.$store.state.Player.options.redirect.min * 1;
        rt.setMinutes(rt.getMinutes() + rtminute);
        this.$store.state.redirectTime = rt;
        let src = this.$store.state.Player.url;
        switch (this.$store.state.Player.version * 1) {
          case 5:
            src += this.$store.state.redirectPagesV5[
              Math.floor(
                Math.random() * (this.$store.state.redirectPagesV5.length * 1)
              )
            ];
            break;
          default:
            src += this.$store.state.redirectPagesV4[
              Math.floor(
                Math.random() * (this.$store.state.redirectPagesV4.length * 1)
              )
            ];
            break;
        }
        this.$store.state.iframesrc = src;
      }
    },
    async startBot() {
      //this.$log.debug("start");
      //console.log("Player.version", this.$store.state.Player.version);

      if (!this.$store.state.Player.start) {
        //console.log("this.$store.state.Player.version", this.$store.state.Player.version);
        this.$store.state.taskCheckTime = new Date();
        let s =
          Math.floor(
            Math.random() *
              (this.$store.state.Player.options.workingdurationtime.max * 1 -
                this.$store.state.Player.options.workingdurationtime.min * 1)
          ) +
          this.$store.state.Player.options.workingdurationtime.min * 1;
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
        await this.$store.state.CheckLogic.loadPlayer(
          this.applyAction,
          this.applyActionV5
        );
        this.$store.state.Player.options.logs.splice(
          400,
          this.$store.state.Player.options.logs.length - 400
        );
        if (!this.$store.state.Player.loggedIn) {
          return;
        }
        this.initiated = true;
        this.$store.state.selectedVillage = this.$store.state.Player.villages[0];
        await this.$store.state.CheckLogic.getTasks();
        setTimeout(() => {
          this.$store.state.options.coverdiv = false;
        }, 500);
      }
      return;
    },
    onResize() {
      if (!this.mobile || !this.$store.state.Player.loggedIn) {
        this.$store.commit("checkDivs");
        //this.Simulator.trade;
        this.$store.state.windowdimension =
          "" + window.innerWidth + "-" + window.innerHeight;
        setTimeout(() => {
          this.$store.state.options.coverdiv = false;
        }, 300);
      }
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created: async function() {
    this.mobile = this.isMobile();
    this.$store.state.log = this.$log;
    this.$store.state.socket = this.$socket;
    let url = decodeURIComponent(
      window.location.href.substring(window.location.href.indexOf("name=") + 5)
    );
    if (url.indexOf("http") === -1) {
      url = "https://" + url;
    }
    let hostname = new URL(url).hostname;
    if (window.location.href.indexOf("name=") != -1) {
      if (hostname.indexOf("kingdoms") !== -1) {
        hostname = "https://" + hostname;
      } else if (hostname.indexOf("www.travian") !== -1) {
        hostname = "https://" + hostname;
      } else if (hostname.indexOf("travian") !== -1) {
        hostname = "https://" + hostname + "/dorf1.php";
      } else {
        hostname = "http://traviantactics.com/botV2/selectServer.html";
      }
    } else {
      hostname = "http://traviantactics.com/botV2/selectServer.html";
    }
    this.$store.state.iframesrc = hostname;

    //this.$store.state.localStorage = this.$localStorage;
    this.$store.state.CheckLogic.init(this.$store);
    this.$store.state.CheckLogic.lock = false;
    await this.$store.state.CheckLogic.getConfig(options);

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
  mounted: async function() {
    this.$store.state.Player.loggedIn = false;

    if (this.$store.state.options.style.language === "") {
      if (window.location.href.indexOf("name=") != -1) {
        var url = decodeURIComponent(
          window.location.href.substring(
            window.location.href.indexOf("name=") + 5
          )
        );
        if (url.indexOf("http") === -1) {
          url = "https://" + url;
        }
        var hostname = new URL(url).hostname;
        if (hostname.split("kingdoms.").length === 2) {
          this.$store.state.options.style.language = hostname.split(
            "kingdoms."
          )[1];
        }
        if (hostname.split("travian.").length === 2) {
          this.$store.state.options.style.language = hostname.split(
            "travian."
          )[1];
        }
      }
    }

    this.$store.state.lang.setlanguage(
      this.$store.state.options.style.language
    );

    this.$store.watch(
      this.$store.getters.getPlayer,
      (val) => {
        if (this.initiated) {
          this.$store.state.CheckLogic.setTasks(val);
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    this.$store.watch(
      this.$store.getters.getPlayerOptionsworkingdurationtime,
      (val) => {
        if (this.initiated) {
          this.$store.state.workingDuration =
            Math.floor(
              Math.random() *
                (this.$store.state.Player.options.workingdurationtime.max * 1 -
                  this.$store.state.Player.options.workingdurationtime.min * 1)
            ) *
              60 +
            this.$store.state.Player.options.workingdurationtime.min * 60 +
            this.$store.state.timerCounter;
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );
    this.$store.watch(
      this.$store.getters.getPlayerOptionstaskchecktime,
      (val) => {
        if (this.initiated) {
          this.$store.state.timerCounter =
            Math.floor(
              Math.random() *
                (this.$store.state.Player.options.taskchecktime.max * 1 -
                  this.$store.state.Player.options.taskchecktime.min * 1)
            ) +
            this.$store.state.Player.options.taskchecktime.min * 1;
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );
    this.$store.watch(
      this.$store.getters.getOptions,
      (val) => {
        this.$store.state.CheckLogic.setConfig();
      },
      {
        immediate: true,
        deep: true,
      }
    );

    this.$store.watch(
      this.$store.getters.getSelectedVillageId,
      async (val) => {
        if (this.$store.state.options.style.build.show) {
          let loading1 = await this.$store.state.CheckLogic.analyzeBuildings(
            val
          );
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    this.onResize();
    window.addEventListener("resize", this.onResize);

    var refreshId = setInterval(async () => {
      this.$store.state.options.style.commercials.show = true;
    }, 600000);
    let intervalRunning = false;
    var refreshId = setInterval(async () => {
      if (intervalRunning) return;
      intervalRunning = true;
      if (
        !this.$store.state.Player.loggedIn ||
        this.$store.state.Player.playerId === 0
      ) {
        this.$store.state.Player.loggedIn = false;
        this.$store.state.taskStatus = "Get player";
        await this.getPlayer();
        if (this.$store.state.Player.playerId !== 0) {
          this.$store.state.options.style.commercials.show = false;
          this.$store.state.taskStatus = "Got player";
          if (this.$store.state.Player.options.default) {
            this.$store.state.Player.options.default = false;
            if (this.$store.state.Player.version === 4) {
              this.$store.state.Player.options.workingdurationtime.max = 360;
              this.$store.state.Player.options.workingdurationtime.min = 300;
              this.$store.state.Player.options.taskchecktime.max = 180;
              this.$store.state.Player.options.taskchecktime.min = 60;
              this.$store.state.Player.options.sleeptime.max = 240;
              this.$store.state.Player.options.sleeptime.min = 180;
            } else {
              this.$store.state.Player.options.workingdurationtime.max = 99999999;
              this.$store.state.Player.options.workingdurationtime.min = 99999999;
              this.$store.state.Player.options.taskchecktime.max = 10;
              this.$store.state.Player.options.taskchecktime.min = 5;
              this.$store.state.Player.options.sleeptime.max = 1;
              this.$store.state.Player.options.sleeptime.min = 1;
            }
          }
          this.$store.state.workingDuration =
            Math.floor(
              Math.random() *
                (this.$store.state.Player.options.workingdurationtime.max * 1 -
                  this.$store.state.Player.options.workingdurationtime.min * 1)
            ) *
              60 +
            this.$store.state.Player.options.workingdurationtime.min * 60;

          let urlParams = new URLSearchParams(window.location.search);
          let start = urlParams.get("start");
          if (start !== undefined && start === "true") {
            this.$store.state.Player.start = true;
          }
        }
      } else {
        if (this.$store.state.Player.start) {
          if (this.$store.state.timerCounter <= 0) {
            this.$store.state.timerCounter =
              Math.floor(
                Math.random() *
                  (this.$store.state.Player.options.taskchecktime.max * 1 -
                    this.$store.state.Player.options.taskchecktime.min * 1)
              ) +
              this.$store.state.Player.options.taskchecktime.min * 1;
            this.$store.state.taskStatus = "checking";
            let currtime = new Date().getTime();
            await this.$store.state.CheckLogic.checkTasks();
            this.$store.state.workingDuration -= Math.floor(
              (new Date().getTime() - currtime) / 1000
            );
          } else if (!this.$store.state.CheckLogic.lock) {
            this.$store.state.timerCounter--;
            this.$store.state.workingDuration--;
            this.$store.state.taskStatus = this.$store.state.timerCounter + "";
          }

          if (this.$store.state.workingDuration <= 0) {
            if (this.$store.state.Player.options.User.logout) {
              await this.$store.state.CheckLogic.logout();
            }
            if (this.$store.state.Player.options.User.redirect) {
              await this.$store.state.CheckLogic.redirect();
            }
            this.$store.state.timerCounter =
              Math.floor(
                Math.random() *
                  (this.$store.state.Player.options.sleeptime.max * 1 -
                    this.$store.state.Player.options.sleeptime.min * 1)
              ) *
                60 +
              this.$store.state.Player.options.sleeptime.min * 60;

            this.$store.state.workingDuration =
              Math.floor(
                Math.random() *
                  (this.$store.state.Player.options.workingdurationtime.max *
                    1 -
                    this.$store.state.Player.options.workingdurationtime.min *
                      1)
              ) *
                60 +
              this.$store.state.Player.options.workingdurationtime.min * 60 +
              this.$store.state.timerCounter;
          }
          if (
            this.$store.state.timerCounter <=
            this.$store.state.Player.options.taskchecktime.max
          ) {
            this.iframeReloadCounter--;
            if (this.iframeReloadCounter <= 0) {
              //this.$store.state.iframesrc = "http://traviantactics.com";
              this.$store.state.iframesrc = this.$store.state.gameUrl;
              this.iframeindex++;
              //this.$store.state.iframesrc = rez.url;
              this.iframeReloadCounter = 3600;
            }
          }

          if (new Date().getUTCDate() !== this.reloadDay) {
            let endUrl = window.location.href.indexOf("?");
            if (endUrl !== -1) {
              window.location.href =
                window.location.href.substring(0, endUrl) +
                "?start=" +
                this.$store.state.Player.start +
                "&name=" +
                this.$store.state.gameUrl;
            } else {
              window.location.href =
                "http://traviantactics.com/botV2/index.html?start=" +
                this.$store.state.Player.start +
                "&name=" +
                this.$store.state.gameUrl;
            }
          }
        }
      }
      intervalRunning = false;
    }, 1000);
  },
  watch: {
    "$store.state.Player.start": async function(val) {
      this.$store.state.options.style.start = val;
    },
  },
});
</script>
