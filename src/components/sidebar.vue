<style type="text/css">
.button {
  margin: 2px 2px 2px 2px;
}
.buttonNavigation {
  min-width: 100%;
  margin: 0px;
  width: 100%;
}
.v-tooltip__content {
  max-width: 60px;
  font-weight: 100;
}
</style>
<template>
  <vue-draggable-resizable
    :parent="true"
    :z="999"
    :x="$store.state.options.style.sidebar.left"
    :y="$store.state.options.style.sidebar.top"
    :drag-handle="'.drag'"
    @dragging="resize"
    @dragstop="resizestop"
    :handles="[]"
    :key="$store.state.windowdimension"
    style="border:none;width: 0px; height: 0px;"
  >
    <div
      id="sidebar"
      :style="{ top: $store.state.options.style.sidebarY + '%' }"
      style="transform: scale(0.9);"
    >
      <div class="sideMenu" style="margin-left: 30px;">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              :class="$store.state.Player.start ? 'green' : 'red'"
              dark
              fab
              @click="start"
            >
              <v-icon x-large>{{
                !$store.state.Player.start ? "play_arrow" : "pause"
              }}</v-icon>
            </v-btn></template
          >
          <span>Start</span>
        </v-tooltip>
        <v-btn
          class="drag"
          fab
          small
          style="position: absolute;padding-left: 0px;margin-left: -10px;margin-top: -5px;height: 30px; width: 30px;"
          color="warning"
        >
          <v-icon style="font-size: 22px;">open_with</v-icon>
        </v-btn>
      </div>
      <div class="sideMenu">
        <v-flex xs12>
          <v-tooltip bottom min-width="117" color="black">
            <template v-slot:activator="{ on }">
              <v-layout row wrap>
                <v-flex
                  v-on="on"
                  xs12
                  style="background-color: #263238!important;border-color: #263238!important; color:white;    text-align: center;"
                >
                  <label> {{ $store.state.taskStatus }}</label>
                </v-flex>
              </v-layout>
            </template>
            <span>Working time: {{ this.$store.state.workingDuration }}</span>
          </v-tooltip>
          <v-layout row wrap>
            <v-flex xs6>
              <v-btn
                color="blue-grey darken-4"
                dark
                depressed
                small
                class="buttonNavigation"
                @click="previousVillage"
              >
                <v-icon medium dark>arrow_back</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs6>
              <v-btn
                color="blue-grey darken-4"
                dark
                depressed
                small
                class="buttonNavigation"
                @click="nextVillage"
              >
                <v-icon medium dark>arrow_forward</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-select
                :items="$store.state.Player.villages"
                v-model="$store.state.selectedVillage"
                label="Select"
                item-text="name"
                solo
                return-object
                single-line
                color="blue-grey darken-4"
                dark
                class="villagesclass"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap style="    margin-top: -10px;">
            <v-flex xs4>
              <v-btn
                color="blue-grey darken-4"
                dark
                depressed
                small
                class="buttonNavigation"
                @click="
                  $store.state.options.style.showNavigation = !$store.state
                    .options.style.showNavigation
                "
              >
                <v-icon medium dark>arrow_drop_down</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs4>
              <v-btn
                color="blue-grey darken-4"
                dark
                depressed
                small
                class="buttonNavigation"
                @click="closeDivs"
              >
                <v-icon medium dark>close</v-icon>
              </v-btn>
            </v-flex>
            <v-flex xs4>
              <v-btn
                color="blue-grey darken-4"
                dark
                depressed
                small
                class="buttonNavigation"
                @click="
                  $store.state.options.style.tasks.show = !$store.state.options
                    .style.tasks.show;
                  $store.state.options.style.tasks.z = $store.getters.getHighestZ();
                "
              >
                <v-icon medium dark>list</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </div>
      <div v-if="$store.state.options.style.showNavigation">
        <div class="sideMenu">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 2px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.build.show = !$store.state.options
                    .style.build.show;
                  $store.state.options.style.build.z = $store.getters.getHighestZ();
                "
              >
                <v-icon medium dark>gavel</v-icon>
              </v-btn></template
            >
            <span>{{ $store.state.lang["building"] }}</span>
          </v-tooltip>
          <!-- <v-tooltip bottom>
            <v-btn
              style="margin: 1px;"
              color="blue-grey darken-4"
              small
              dark
              fab
              @click="$store.state.options.style.buildfinder.show=!$store.state.options.style.buildfinder.show; $store.state.options.style.buildfinder.z=$store.getters.getHighestZ()"
              slot="activator"
            >
              <v-icon medium dark>image_search</v-icon>
            </v-btn>
            <span>Build list</span>
          </v-tooltip> -->

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 1px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.trade.show = !$store.state.options
                    .style.trade.show;
                  $store.state.options.style.trade.z = $store.getters.getHighestZ();
                "
              >
                <v-icon large dark>swap_horiz</v-icon>
              </v-btn></template
            >
            <span>{{ $store.state.lang["trade"] }}</span>
          </v-tooltip>
        </div>
        <div class="sideMenu">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 2px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.farm.show = !$store.state.options
                    .style.farm.show;
                  $store.state.options.style.farm.z = $store.getters.getHighestZ();
                "
              >
                <v-icon large dark>my_location</v-icon>
              </v-btn></template
            >
            <span>{{ $store.state.lang["farmlist"] }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 1px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.farmfinder.show = !$store.state
                    .options.style.farmfinder.show;
                  $store.state.options.style.farmfinder.z = $store.getters.getHighestZ();
                "
              >
                <v-icon large dark>location_searching</v-icon>
              </v-btn></template
            >
            <span>{{ $store.state.lang["cropfinder"] }}</span>
          </v-tooltip>
        </div>

        <div class="sideMenu">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 2px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.train.show = !$store.state.options
                    .style.train.show;
                  $store.state.options.style.train.z = $store.getters.getHighestZ();
                "
              >
                <v-icon large dark>group_add</v-icon>
              </v-btn></template
            >
            <span>{{ $store.state.lang["train"] }}</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 1px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.hero.show = !$store.state.options
                    .style.hero.show;
                  $store.state.options.style.hero.z = $store.getters.getHighestZ();
                "
              >
                <v-icon large dark>accessibility</v-icon>
              </v-btn></template
            >
            <span>Hero</span>
          </v-tooltip>
        </div>
        <div class="sideMenu">
          <!--<v-tooltip bottom>
            <v-btn
              style="margin: 2px;"
              color="blue-grey darken-4"
              small
              dark
              fab
              @click="openChat()"
              slot="activator"
            >
              <v-icon medium dark>C</v-icon>
            </v-btn>
            <span>Chat</span>
          </v-tooltip>-->
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 2px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.setting.show = !$store.state
                    .options.style.setting.show;
                  $store.state.options.style.setting.z = $store.getters.getHighestZ();
                "
              >
                <v-icon medium dark>build</v-icon>
              </v-btn></template
            >
            <span>Settings</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                style="margin: 1px;"
                color="blue-grey darken-4"
                dark
                fab
                @click="
                  $store.state.options.style.logs.show = !$store.state.options
                    .style.logs.show;
                  $store.state.options.style.logs.z = $store.getters.getHighestZ();
                "
              >
                <v-icon medium>dvr</v-icon>
              </v-btn></template
            >
            <span>Logs</span>
          </v-tooltip>
        </div>
        <div class="sideMenu"></div>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from "vue";
import $store from "@/store";
export default Vue.extend({
  data: () => ({
    direction: "right",
    fab: false,
    hover: true,
    tabs: null,
    village: false,
    farm: false,
    preferences: false,
    villages: false,
    transition: "slide-y-reverse-transition"
  }),
  methods: {
    closeDivs() {
      this.$store.state.options.style.build.show = false;
      this.$store.state.options.style.buildfinder.show = false;
      this.$store.state.options.style.farm.show = false;
      this.$store.state.options.style.trade.show = false;
      this.$store.state.options.style.hero.show = false;
      this.$store.state.options.style.logs.show = false;
      this.$store.state.options.style.setting.show = false;
      this.$store.state.options.style.tasks.show = false;
      this.$store.state.options.style.train.show = false;
      this.$store.state.options.style.chat.show = false;
      this.$store.state.options.style.farmfinder.show = false;
    },

    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.sidebar.width = width;
      if (height !== undefined)
        this.$store.state.options.style.sidebar.height = height;
      this.$store.state.options.style.sidebar.left = left;
      this.$store.state.options.style.sidebar.top = top;
      this.$store.state.options.coverdiv = false;
    },
    nextVillage() {
      for (let i = 0; i < this.$store.state.Player.villages.length - 1; i++) {
        if (
          this.$store.state.Player.villages[i].villageId ==
          this.$store.state.selectedVillage.villageId
        ) {
          this.$store.state.selectedVillage = this.$store.state.Player.villages[
            i + 1
          ];
          return;
        }
      }
      this.$store.state.selectedVillage = this.$store.state.Player.villages[0];
    },
    previousVillage() {
      for (let i = 1; i < this.$store.state.Player.villages.length; i++) {
        if (
          this.$store.state.Player.villages[i].villageId ==
          this.$store.state.selectedVillage.villageId
        ) {
          this.$store.state.selectedVillage = this.$store.state.Player.villages[
            i - 1
          ];
          return;
        }
      }
      this.$store.state.selectedVillage = this.$store.state.Player.villages[
        this.$store.state.Player.villages.length - 1
      ];
    },
    openChat() {
      window.open("https://discord.gg/eAh9DCE", "_blank");
    },
    start() {
      this.$store.state.Player.start = !this.$store.state.Player.start;
    }
  },
  computed: {}
});
</script>
