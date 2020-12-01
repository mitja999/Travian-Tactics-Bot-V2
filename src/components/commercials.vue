<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.commercials.z }"
    :parent="true"
    :key="$store.state.windowdimension"
    :w="300"
    :h="300"
    :x="$store.state.options.style.commercials.left"
    :y="$store.state.options.style.commercials.top"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
    :resizable="false"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>accessibility</v-icon>
          <b>Support us!</b>
        </v-chip>
        <div class="headdivicons">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.commercials.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.commercials.z = $store.getters.getHighestZ()
            "
          >
            <v-icon medium>open_with</v-icon>
          </v-btn>
        </div>
      </div>
      <v-layout justify-space-around class="containerCustomBody">
        <v-layout row v-if="commercialstab === 1">
          <iframe
            :key="keyframe"
            :src="link"
            style="overflow:hidden;  height: 300px; width: 300px; border: none;  padding: 0px; margin: 0px;"
          ></iframe>
        </v-layout>
        <v-layout row v-if="commercialstab === 0">
          <div class="text-center" style="width:100%">
            <v-label>Support us with donation</v-label>
            <form
              target="_blank"
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
            >
              <input type="hidden" name="cmd" value="_s-xclick" />
              <input
                type="hidden"
                name="hosted_button_id"
                value="XR62LTRDYWY6N"
              />
              <input
                type="image"
                src="https://www.paypalobjects.com/WEBSCR-640-20110429-1/en_US/i/btn/btn_donate_SM.gif"
                border="0"
                name="submit"
                alt="PayPal - The safer, easier way to pay online!"
              />
              <img
                alt=""
                border="0"
                src="https://www.paypalobjects.com/WEBSCR-640-20110429-1/en_US/i/scr/pixel.gif"
                width="1"
                height="1"
              />
            </form>
          </div>
          <div class="text-center" style="width:100%">
            <v-label>Support us with good review</v-label>
            <v-rating
              :value="stars"
              background-color="orange lighten-3"
              color="orange"
            ></v-rating>
            <a
              target="_blank"
              href="https://chrome.google.com/webstore/detail/traviantactics/gegegmbnpdigalgfkegjgnfcpmolijdg/reviews"
            >
              <img
                src="img/chrome.png"
                alt="Chrome store"
                style="width: 250px;"
              />
            </a>
            <br />
            <a
              target="_blank"
              href="https://addons.mozilla.org/sl/firefox/addon/traviantacticsbot/"
            >
              <img
                class=" iconBig "
                src="img/firefoxLogo.png"
                alt="firefox store"
                style="width: 250px;"
            /></a>
          </div>
        </v-layout>

        <v-layout row v-if="commercialstab === 2">
          <a
            href="http://s.click.aliexpress.com/e/_sjA2Du?bz=300*250"
            target="_blank"
            ><img
              width="300"
              height="250"
              src="//ae01.alicdn.com/kf/H717bcf9a3e74494eaa85bb1a99ee10b2L.png"
          /></a>
        </v-layout>
      </v-layout>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from "vue";
import $store from "@/store";
export default Vue.extend({
  data: () => ({
    z: 999,
    Player: $store.state.Player,
    value: "OFF",
    link: "http://traviantactics.com/Reklame3.php",
    timerID: 0,
    keyframe: 1,
    commercialstab: 0,
    stars: 5,
  }),
  methods: {
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.commercials.width = width;
      if (height !== undefined)
        this.$store.state.options.style.commercials.height = height;
      this.$store.state.options.style.commercials.left = left;
      this.$store.state.options.style.commercials.top = top;
      this.$store.state.options.coverdiv = false;
    },
  },
  created: async function() {
    /*this.timerID = setInterval(() => {
      switch (this.keyframe % 4) {
        case 0:
          this.commercialstab = 0;
          break;
        case 1:
          this.link = "http://traviantactics.com/Reklame3.php";
          this.commercialstab = 1;
          break;
        case 2:
          this.link = "http://traviantactics.com/Reklame3.php";
          this.commercialstab = 1;
          break;
        case 3:
          this.commercialstab = 2;
          break;
      }
      this.keyframe++;
    }, 60000);*/
  },
});
</script>
