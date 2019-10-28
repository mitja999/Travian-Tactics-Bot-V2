<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.hero.z}"
    :parent="true"
    :key="$store.state.windowdimension"
    v-bind:w="$store.state.options.style.hero.width"
    :h="$store.state.options.style.hero.height"
    :x="$store.state.options.style.hero.left"
    :y="$store.state.options.style.hero.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>accessibility</v-icon>
          <b>Hero</b>
        </v-chip>
        <div class="headdivicons" >
        <v-btn class="drag headButtonRight" fab small dark color="red darken-1" @click="$store.state.options.style.hero.show=false">
          <v-icon medium>close</v-icon>
        </v-btn>
        <v-btn class="drag headButtonRight movebutton" fab small color="warning" @click="$store.state.options.style.hero.z=$store.getters.getHighestZ()">
          <v-icon medium>open_with</v-icon>
        </v-btn>
        </div>
      </div>
      <v-layout justify-space-around class="containerCustomBody">
        <v-checkbox
          v-model="$store.state.Player.options.tasks.hero.adventure"
          value="true"
          label="Enable hero"
        ></v-checkbox>
      </v-layout>
    </div>
  </vue-draggable-resizable>
</template>

<script>
export default {
  name: "hero",
  data() {
    return {
      z: 999,
      Player: this.$store.state.Player,
      value: "OFF"
    };
  },
  methods: {
    resize(left, top, width, height) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left, top, width, height) {
      if (width !== undefined)
        this.$store.state.options.style.hero.width = width;
      if (height !== undefined)
        this.$store.state.options.style.hero.height = height;
      this.$store.state.options.style.hero.left = left;
      this.$store.state.options.style.hero.top = top;
      this.$store.state.options.coverdiv = false;
    }
  }
};
</script>