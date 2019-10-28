<style>
.tdClass {
  padding: 0;
}
</style>

<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.logs.z}"
    :parent="true"
    :key="$store.state.windowdimension"
    v-bind:w="$store.state.options.style.logs.width"
    :h="$store.state.options.style.logs.height"
    :x="$store.state.options.style.logs.left"
    :y="$store.state.options.style.logs.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>dvr</v-icon>
          <b>Logs</b>
        </v-chip>
        <div class="headdivicons" style="width:200px">
        <v-btn class="drag headButtonRight" fab small dark color="red darken-1" @click="$store.state.options.style.logs.show=false">
          <v-icon medium>close</v-icon>
        </v-btn>
        <v-btn class="drag headButtonRight movebutton" fab small color="warning" @click="$store.state.options.style.logs.z=$store.getters.getHighestZ()">
          <v-icon medium>open_with</v-icon>
        </v-btn>
        <v-btn color="primary" class="headButtonRight" style="margin-right: 30px;" @click="clearLogs">Clear Logs</v-btn>
      </div>
      </div>

      <div class="containerCustomBody">
        <v-layout
          column
          style="overflow-y: auto;"
          :style="{ height: $store.state.options.style.logs.height+'px'}"
        >
        <v-data-table
          v-bind:headers="[
          { text: 'Time', value: 'time' },
          { text: 'Village', value: 'villageId' },
          { text: 'Name', value: 'name' },
          { text: 'Text', value: 'text' }
        ]"
          :items="$store.state.Player.options.logs"
          v-bind:pagination.sync="pagination"
          hide-actions
          hide-headers
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="tdClass">{{ (new Date(props.item.time)).toLocaleString() }}</td>
            <td class="tdClass">{{ props.item.villageId }}</td>
            <td class="tdClass">{{ props.item.name }}</td>
            <td class="tdClass">{{ props.item.text }}</td>
          </template>
        </v-data-table>
        </v-layout>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
export default {
  name: "log",
  data() {
    return {
      z: 999,
      pagination: {
        sortBy: "time",
        descending: true,
        rowsPerPage: 500
      }
    };
  },
  methods: {
    clearLogs() {
      this.$store.state.Player.options.logs = [];
    },
    resize(left, top, width, height) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left, top, width, height) {
      if (width !== undefined)
        this.$store.state.options.style.logs.width = width;
      if (height !== undefined)
        this.$store.state.options.style.logs.height = height;
      this.$store.state.options.style.logs.left = left;
      this.$store.state.options.style.logs.top = top;
      this.$store.state.options.coverdiv = false;
    }
  }
};
</script>