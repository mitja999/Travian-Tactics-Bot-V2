<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.setting.z }"
    :parent="true"
    v-bind:w="$store.state.options.style.setting.width"
    :h="$store.state.options.style.setting.height"
    :x="$store.state.options.style.setting.left"
    :y="$store.state.options.style.setting.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
    :key="$store.state.windowdimension"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>build</v-icon>
          <b>Settings</b>
        </v-chip>
        <div class="headdivicons">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.setting.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.setting.z = $store.getters.getHighestZ()
            "
          >
            <v-icon medium>open_with</v-icon>
          </v-btn>
        </div>
      </div>
      <v-container fluid grid-list-sm style="margin:5px;">
        <v-layout row>
          <div>Version Web {{ $store.state.version.web }}</div>
          <br />
        </v-layout>
        <v-layout row>
          <div>Version Extension {{ $store.state.version.extension }}</div>
          <br />
        </v-layout>
        <v-layout row style="margin-top:10px;">
          Language
          <v-select
            :items="[
              'en',
              'si',
              'it',
              'com.eg',
              'com.sa',
              'com.sy',
              'ae',
              'ro',
              'co.id',
              'pl',
              'asia',
              'hu',
              'ru',
              'com.tr',
              'cl',
              'net',
              'com.my',
              'dk',
              'bg',
              'com.br',
              'cz',
              'gr',
              'rs',
              'ir',
              'fr',
              'lt'
            ]"
            v-model="$store.state.options.style.language"
          ></v-select>
        </v-layout>
        <v-layout row>
          RTL <v-switch v-model="$vuetify.rtl" value="true"></v-switch>
        </v-layout>
        <v-layout row>
          <v-flex sm5>
            Task check time
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="min(second):"
              min="5"
              v-model="$store.state.Player.options.taskchecktime.min"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="max(second):"
              min="5"
              v-model="$store.state.Player.options.taskchecktime.max"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex sm5>
            Working duration time
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="min(minutes):"
              min="1"
              v-model="$store.state.Player.options.workingdurationtime.min"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="max(minutes):"
              min="1"
              v-model="$store.state.Player.options.workingdurationtime.max"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex sm5>
            Sleep time
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="min(minutes):"
              min="0"
              v-model="$store.state.Player.options.sleeptime.min"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="max(minutes):"
              min="0"
              v-model="$store.state.Player.options.sleeptime.max"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          Redirect during sleep time
          <v-switch
            v-model="$store.state.Player.options.redirectsleeptime"
          ></v-switch>
        </v-layout>
        <v-layout row>
          <v-flex sm5>
            Redirect when bot is active
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="min(minutes):"
              min="0"
              v-model="$store.state.Player.options.redirect.min"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex sm3>
            <v-text-field
              label="max(minutes):"
              min="0"
              v-model="$store.state.Player.options.redirect.max"
              type="number"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <div v-if="$store.state.Player.version == 444">
            <v-text-field
              label="username:"
              v-model="$store.state.Player.options.User.username"
              hide-details
              type="text"
            ></v-text-field>
            <v-text-field
              label="password:"
              v-model="$store.state.Player.options.User.password"
              hide-details
              type="password"
            ></v-text-field>
          </div>
        </v-layout>
        <v-layout row> </v-layout>
      </v-container>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from "vue";
import $store from "@/store";
export default Vue.extend({
  data: () => ({
    sidebarButtonSizeNumeric: 1
  }),
  methods: {
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.setting.width = width;
      if (height !== undefined)
        this.$store.state.options.style.setting.height = height;
      this.$store.state.options.style.setting.left = left;
      this.$store.state.options.style.setting.top = top;
      this.$store.state.options.coverdiv = false;
    }
  },
  watch: {
    "$store.state.options.style.language": async function(val) {
      $store.state.lang.setlanguage($store.state.options.style.language);
      $store.state.windowdimension += "1";
    }
  }
});
</script>
