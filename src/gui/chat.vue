
<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: z}"
    :parent="true"
    :key="$store.state.windowdimension"
    v-bind:w="$store.state.options.style.build.width"
    :h="$store.state.options.style.build.height"
    :x="$store.state.options.style.build.left"
    :y="$store.state.options.style.build.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-btn class="headButtonLeft" color="green darken-1" medium dark fab>
          <v-icon large dark>C</v-icon>
        </v-btn>
        <v-btn class="drag headButtonRight" fab small dark color="red darken-1">
          <v-icon large>close</v-icon>
        </v-btn>
        <v-btn class="drag headButtonRight movebutton" fab small color="warning">
          <v-icon large>open_with</v-icon>
        </v-btn>
      </div>
      <div class="containerCustomBody">
        <div style="float: left; width:87%">
          <div>
            <iframe
              src="https://discord.gg/eAh9DCE"
              style="position: absolute;width:100%; height: 100%; border: none;top: 0px;left: 0px;"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </vue-draggable-resizable>
</template>
<script>
export default {
  name: "chat",
  data() {
    return {
      z: 999
    };
  },
  watch: {
    "$store.state.options.style.chat.z": function(val) {
      this.z = val;
    }
  },
  methods: {
    resize(left, top, width, height) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left, top, width, height) {
      if (width !== undefined)
        this.$store.state.options.style.chat.width = width;
      if (height !== undefined)
        this.$store.state.options.style.chat.height = height;
      this.$store.state.options.style.chat.left = left;
      this.$store.state.options.style.chat.top = top;
    }
  }
};
</script>