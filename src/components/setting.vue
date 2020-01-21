<style scoped>
.containerCustomBody {
  padding: 5px;
}

.row {
  height: 20px;
}
</style>

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
      <div class="containerCustomBody">
        <v-layout
          column
          style="overflow-y: auto;"
          :style="{ height: $store.state.options.style.setting.height + 'px' }"
        >
          <v-layout row>
            <div>Version Web {{ $store.state.version.web }}</div>
            <br />
          </v-layout>
          <v-layout row>
            <v-flex sm5>Language</v-flex>
            <v-flex sm6>
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
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex sm5>
              RTL
            </v-flex>
            <v-flex sm3
              ><v-switch
                style="padding: 0px;    margin: 0px;"
                v-model="$vuetify.rtl"
                value="true"
              ></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex sm5>
              Task check time
            </v-flex>
            <v-flex sm3>
              <v-text-field
                height="25"
                label="min(second):"
                min="5"
                v-model="$store.state.Player.options.taskchecktime.min"
                type="number"
              ></v-text-field>
            </v-flex>
            <v-flex sm1></v-flex>
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
            <v-flex sm1></v-flex>
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
            <v-flex sm1></v-flex>
            <v-flex sm3>
              <v-text-field
                label="max(minutes):"
                min="0"
                v-model="$store.state.Player.options.sleeptime.max"
                type="number"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row v-if="$store.state.Player.version == 4">
            <v-flex sm4>During sleep time</v-flex>
            <v-flex sm2>Logout</v-flex>
            <v-flex>
              <v-switch
                style="padding: 0px;    margin: 0px;"
                v-model="$store.state.Player.options.User.logout"
              ></v-switch
            ></v-flex>
            <v-flex sm2> Redirect</v-flex
            ><v-flex>
              <v-switch
                style="padding: 0px;    margin: 0px;"
                v-model="$store.state.Player.options.User.redirect"
              ></v-switch
            ></v-flex>
          </v-layout>
          <v-layout row v-if="$store.state.Player.version == 44">
            <v-flex sm3>Autologin</v-flex
            ><v-flex sm2>
              <v-switch
                style="padding: 0px;    margin: 0px;"
                v-model="$store.state.Player.options.User.autologin"
              ></v-switch
            ></v-flex>
            <v-flex sm3>
              <v-text-field
                label="username:"
                v-model="$store.state.Player.options.User.username"
                hide-details
                type="text"
              ></v-text-field>
            </v-flex>
            <v-flex sm1> </v-flex>
            <v-flex sm3>
              <v-text-field
                label="password:"
                v-model="$store.state.Player.options.User.password"
                hide-details
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex sm2>
              <v-switch
                style="padding: 0px;    margin: 0px;"
                v-model="$store.state.Player.options.email.enabled"
                value="true"
                label="mail"
              ></v-switch
            ></v-flex>
            <v-flex sm1> </v-flex>
            <v-flex sm6>
              <v-text-field
                label="notification email:"
                v-model="$store.state.Player.options.email.email"
                type="mail"
              ></v-text-field>
            </v-flex>
            <v-flex sm2> </v-flex>
            <v-flex sm1>
              <v-btn
                color="primary"
                class="headButtonRight"
                style="margin-right: 30px;"
                @click="sendTestMail"
                >Test</v-btn
              >
            </v-flex>
          </v-layout>
        </v-layout>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from "vue";
import $store from "@/store";
export default Vue.extend({
  data: () => ({
    show1: false,
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
    },
    sendTestMail() {
      $store.dispatch("send_email", {
        subject: "test",
        message: "test message"
      });
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
