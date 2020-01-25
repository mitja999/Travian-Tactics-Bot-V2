<style>
.tdClass {
  padding: 0;
}
.v-input--switch__track {
  opacity: 80;
}
</style>

<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.logs.z }"
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
        <div class="headdivicons" style="width:250px">
          <v-switch
            color="blue darken-3"
            v-model="showrequests"
            value="1"
            style="    float: left;
    top: 10px;
    padding-bottom: 101px;
    margin-top: 0px;"
          ></v-switch>
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.logs.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.logs.z = $store.getters.getHighestZ()
            "
          >
            <v-icon medium>open_with</v-icon>
          </v-btn>
          <v-btn
            color="primary"
            class="headButtonRight"
            style="margin-right: 30px;"
            @click="clearLogs"
            >Clear Logs</v-btn
          >
        </div>
      </div>

      <div class="containerCustomBody">
        <v-layout
          column
          style="overflow-y: auto;"
          :style="{ height: $store.state.options.style.logs.height + 'px' }"
        >
          <v-data-table
            v-bind:headers="[
              { text: 'Time', value: 'time', align: 'center' },
              { text: 'Village', value: 'villageId', align: 'center' },
              { text: 'Name', value: 'name', align: 'center' },
              { text: 'Text', value: 'text', align: 'center' }
            ]"
            :sort-by="['time']"
            :sort-desc="[true]"
            :items="
              $store.state.Player.options.logs.filter(i =>
                showrequests ? true : i.type === undefined
              )
            "
            class="elevation-1"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="index"
                  v-bind:style="{
                    backgroundColor:
                      item.type === undefined ? '#E3F2FD' : '#EDE7F6'
                  }"
                >
                  <td class="tdClass">
                    {{ new Date(item.time).toLocaleString() }}
                  </td>
                  <td class="tdClass">{{ item.villageId }}</td>
                  <td class="tdClass">{{ item.name }}</td>
                  <td class="tdClass">{{ item.text }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
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
    z: 999,
    showrequests: false
  }),
  methods: {
    clearLogs() {
      this.$store.state.Player.options.logs = [];
    },
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.logs.width = width;
      if (height !== undefined)
        this.$store.state.options.style.logs.height = height;
      this.$store.state.options.style.logs.left = left;
      this.$store.state.options.style.logs.top = top;
      this.$store.state.options.coverdiv = false;
    }
  }
});
</script>
