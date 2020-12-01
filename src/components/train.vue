<style type="text/css">
@-moz-document url-prefix() {
  .firefoxIcon {
    transform: scale(0.3);
    margin: -45px;
  }
}
div:not(.v-autocomplete__content).menuable__content__active {
  width: 180px;
}
div:not(.v-autocomplete__content).menuable__content__active div {
  float: left;
  padding-top: 5px;
}
div:not(.v-autocomplete__content).menuable__content__active .v-select-list {
  margin-top: -10px;
}
</style>
<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.train.z }"
    :parent="true"
    :w="$store.state.options.style.train.width"
    :h="$store.state.options.style.train.height"
    :x="$store.state.options.style.train.left"
    :y="$store.state.options.style.train.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
    :key="$store.state.windowdimension"
  >
    <div class="containerCustom" dark>
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>group_add</v-icon>
          <b>{{ $store.state.lang["train"] }}</b>
          <label>{{ $store.state.selectedVillage.name }}</label>
        </v-chip>
        <div class="headdivicons">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.train.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.train.z = $store.getters.getHighestZ()
            "
          >
            <v-icon medium>open_with</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="containerCustomBody">
        <v-layout column>
          <v-layout row wrap>
            <v-flex xs4 style="max-width: 100px; margin-left:10px;">
              <v-select
                v-bind:items="Types"
                v-model="TrainTask.type"
                label="Select"
                single-line
              >
                <template slot="selection" slot-scope="data">
                  <div
                    class="firefoxIcon"
                    v-bind:style="troopIconFF(data.item)"
                  ></div>
                </template>
                <template slot="item" slot-scope="data">
                  <div
                    class="firefoxIcon"
                    v-bind:style="troopIconFF(data.item)"
                  ></div>
                </template>
              </v-select>
            </v-flex>
            <v-flex xs3 style="    margin-top: 22px; margin-left: 5px;">
              <v-text-field
                label="amount:"
                v-model="TrainTask.amount"
                type="number"
                step="1"
                min="1"
              ></v-text-field>
            </v-flex>
            <v-flex xs3 style="    margin-top: 22px; margin-left: 5px;">
              <v-text-field
                label="time:"
                v-model="TrainTask.timeMinutes"
                type="number"
                step="1"
                min="2"
              ></v-text-field>
            </v-flex>
            <v-flex xs1>
              <v-btn text icon color="green" @click="addTrain">
                <v-icon large>add_circle</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-divider style="margin-top: 0px;"></v-divider>
        </v-layout>

        <v-layout
          column
          style="overflow-y: auto;"
          :style="{
            height: $store.state.options.style.train.height - 60 + 'px',
          }"
          v-if="$store.state.selectedVillage.tasks.train.length != 0"
        >
          <v-data-table
            :items="$store.state.selectedVillage.tasks.train"
            hide-default-footer
            class="elevation-1"
            hide-default-header
            style="text-align: center;"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td style="width:10%">
                    <v-switch v-model="item.enabled"></v-switch>
                  </td>
                  <td class="tdClass" style="width:40%">
                    <div
                      class="firefoxIcon"
                      v-bind:style="troopIconFF(item.type)"
                    ></div>
                  </td>
                  <td class="tdClass" style="width:20%">{{ item.amount }}</td>
                  <td class="tdClass" style="width:20%">
                    {{ item.timeMinutes }}
                  </td>
                  <td class="tdClass" style="width:20%">
                    <v-btn text icon color="black" @click="removeTrain(index)">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
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
    TrainTask: {
      type: 1,
      amount: 1,
      timeMinutes: 10,
      time: new Date().getTime(),
      enabled: true,
    },
    Types: [1, 2, 3, 4, 5, 6, 7, 8],
  }),
  methods: {
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.train.width = width;
      if (height !== undefined)
        this.$store.state.options.style.train.height = height;
      this.$store.state.options.style.train.left = left;
      this.$store.state.options.style.train.top = top;
      this.$store.state.options.coverdiv = false;
    },
    addTrain() {
      let t = JSON.parse(JSON.stringify(this.TrainTask));
      t.type =
        (this.$store.state.Player.tribeId * 1 - 1) * 10 +
        (this.TrainTask.type % 10);
      this.$store.state.selectedVillage.tasks.train.push(t);
    },
    removeTrain(index: number) {
      this.$store.state.selectedVillage.tasks.train.splice(index, 1);
    },
    troopIconFF(id: number) {
      return this.$store.getters.troopIconFF(id);
    },
  },
});
</script>
