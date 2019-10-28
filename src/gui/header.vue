<template>
  <div></div>
  <!--<div>    
      <v-select
          label="Select"
           :items="villages"
          item-text="name"
          v-model="$parent.$store.state.selectedVillage"
            autocomplete
          single-line
          bottom
        ></v-select>
  </div>-->
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  computed: {
    villages: function() {
      return JSON.parse(
        JSON.stringify(this.$parent.$store.state.Player.villages)
      );
    }
  },
  watch: {
    "$store.state.options.style.farm.z": function(val) {
      this.z = val;
    }
  }
};
</script>