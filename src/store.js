import Vue from "vue";
import Vuex from "vuex";
import objects from "./engine/classes.js";
import translations from "./engine/translations.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Player: new objects.Player(),
    Village: new objects.village(),
    selectedVillage: new objects.village(),
    troopCost: new objects.troopCost(),
    BuildingRez: new objects.BuildingRez(),
    Buildings: new objects.Buildings(),
    uc: new objects.uc(),
    uc2: new objects.uc2(),
    custom: objects.custom,
    options: objects.options,
    start: false,
    landType: objects.landType,
    lang: translations.translations,
    taskCheckTime: new Date(),
    taskWorkingTime: new Date(),
    redirectTime: new Date(),
    taskStatus: "Stop",
    executing: false,
    windowdimension: "2560-1440",
    version: {
      web: "3.3.24",
      extension: "3.3.24"
    },
    iframesrc: "https://traviantactics.com",
    images: {
      r1:
        "https://gpack.travian.com/863d0145/mainPage/img_ltr/general/resources/lumber_small.png",
      r2:
        "https://gpack.travian.com/863d0145/mainPage/img_ltr/general/resources/clay_small.png",
      r3:
        "https://gpack.travian.com/863d0145/mainPage/img_ltr/general/resources/iron_small.png",
      r4:
        "https://gpack.travian.com/863d0145/mainPage/img_ltr/general/resources/crop_small.png"
    },
    mapZoom: 3,
    map: {
      width: 801,
      height: 801,
      left: -400,
      right: 400,
      bottom: -400,
      top: 400
    },
    redirectPagesV4:["/karte.php","/statistiken.php","/messages.php","/berichte.php","/dorf1.php","/dorf2.php","/hero.php","/hero.php?t=4"],
    redirectPagesV5:["/#/page:village","/#/page:resources/","/#/page:map/","/#/page:village/herotab:Auctions/window:hero/cp:1","/#/page:village/herotab:CardGame/window:hero/cp:1","/#/page:village/herotab:Inventory/window:hero"]
  },

  mutations: {
    checkDivs(state) {
      for (var propertyName in state.options.style) {
        if (state.options.style[propertyName].left !== undefined) {
          if (
            state.options.style[propertyName].left +
              state.options.style[propertyName].width >
            window.innerWidth
          ) {
            state.options.style[propertyName].left =
              window.innerWidth - state.options.style[propertyName].width;
            //state.options.style[propertyName].width=300;
          }
          if (
            state.options.style[propertyName].top +
              state.options.style[propertyName].height >
            window.innerHeight
          ) {
            state.options.style[propertyName].top =
              window.innerHeight - state.options.style[propertyName].height;
            //state.options.style[propertyName].width=300;
          }

          if (state.options.style[propertyName].top < 30) {
            state.options.style[propertyName].top = 30;
            //state.options.style[propertyName].width=300;
          }
          if (state.options.style[propertyName].left < 30) {
            state.options.style[propertyName].left = 30;
            //state.options.style[propertyName].width=300;
          }
          if (state.options.style[propertyName].z < 10) {
            state.options.style[propertyName].z = 10;
            //state.options.style[propertyName].width=300;
          }
        }
      }
    }
  },
  getters: {
    getPlayer: state => () => state.Player,
    getSelectedVillageId: state => () => state.selectedVillage.villageId,
    troopIcon: state => id => {
      let tribeIcon = state.Player.tribeId * 1 - 1;
      id = id % 10;

      let TroopUrl =
        "https://gpack.travian.com/863d0145/mainPage/img/u/section/u" +
        (tribeIcon === 0 ? "" : tribeIcon) +
        "" +
        id +
        "-ltr.png";
      return {
        background: "url(" + TroopUrl + ")",
        width: "120px",
        height: "120px",
        zoom: 0.45
      };
    },
    troopIconFF: state => id => {
      let tribeIcon = state.Player.tribeId * 1 - 1;
      id = id % 10;

      let TroopUrl =
        "https://gpack.travian.com/863d0145/mainPage/img/u/section/u" +
        (tribeIcon === 0 ? "" : tribeIcon) +
        "" +
        id +
        "-ltr.png";
      return {
        background: "url(" + TroopUrl + ")",
        width: "120px",
        height: "120px",
        zoom: 0.35
      };
    },
    getIcon: state => id => {
      let tribeIcon = "";
      let TroopUrl =
        "https://gpack.travian.com/863d0145/mainPage/img_ltr/general/resources/" +
        id +
        ".png";
      return {
        background: "url(" + TroopUrl + ")",
        width: "120px",
        height: "120px",
        zoom: 0.4
      };
    },
    getOptions: state => () => state.options,
    getHighestZ: state => () => {
      let z = 1;
      for (var propertyName in state.options.style) {
        if (state.options.style[propertyName].z > z) {
          z = state.options.style[propertyName].z;
        }
      }
      return z + 1;
    }
  }
});
