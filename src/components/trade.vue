<template>
  <vue-draggable-resizable
    :parent="true"
    :style="{ zIndex: $store.state.options.style.trade.z }"
    class="divBorder"
    :w="$store.state.options.style.trade.width"
    :h="$store.state.options.style.trade.height"
    :x="$store.state.options.style.trade.left"
    :y="$store.state.options.style.trade.top"
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
          <v-icon dark left>swap_horiz</v-icon>
          <b>{{ $store.state.lang["trade"] }}</b>
          <label>{{ $store.state.selectedVillage.name }}</label>
        </v-chip>
        <div class="headdivicons">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.trade.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.trade.z = $store.getters.getHighestZ()
            "
          >
            <v-icon medium>open_with</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="containerCustomBody">
        <v-layout column>
          <v-layout row wrap>
            <v-flex xs1>
              <v-checkbox
                primary
                label
                hide-details
                v-model="showVillage"
              ></v-checkbox>
            </v-flex>
            <v-flex xs2 v-show="!showVillage">
              <v-text-field
                label="x:"
                v-model="TradeTask.x"
                hide-details
                type="number"
                style="padding: 0; padding-left: 10px;"
              ></v-text-field>
            </v-flex>
            <v-flex xs2 v-show="!showVillage">
              <v-text-field
                label="y:"
                v-model="TradeTask.y"
                hide-details
                type="number"
                style="padding: 0; padding-left: 10px;"
              ></v-text-field>
            </v-flex>
            <v-flex xs4 v-show="showVillage">
              <v-select
                v-bind:items="filterVillages"
                v-model="VillageTo"
                label="Select"
                single-line
                style="padding: 0; padding-left: 10px;"
              >
                <template slot="selection" slot-scope="data">{{
                  data.item.name
                }}</template>
                <template slot="item" slot-scope="data">{{
                  data.item.name
                }}</template>
              </v-select>
            </v-flex>
            <v-flex xs5 class="tradeselect">
              <v-select
                v-bind:items="['1x', 'Return', 'Every x minutes', 'Send by %']"
                v-model="TradeTask.type"
                label="Select"
                single-line
                style="padding: 0; padding-left: 10px;"
              ></v-select>
            </v-flex>

            <v-flex xs1>
              <v-btn text icon color="green" @click="addTradeTask">
                <v-icon large>add_circle</v-icon>
              </v-btn>
            </v-flex>
            <v-layout row wrap v-show="TradeTask.type == 'Every x minutes'">
              <v-flex xs3>
                <v-text-field
                  label="minutes:"
                  v-model="TradeTask.repeatinterval"
                  hide-details
                  type="number"
                  style="padding: 0; padding-left: 10px;"
                  min="0"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs3>
                <v-text-field
                  v-show="TradeTask.type == 'Send by %'"
                  label="Min. resource:"
                  v-model="TradeTask.minres"
                  hide-details
                  type="number"
                  style="padding: 0; padding-left: 10px;"
                  min="100"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-text-field
                  v-show="TradeTask.type == 'Send by %'"
                  label="Round:"
                  v-model="TradeTask.round"
                  hide-details
                  type="number"
                  style="padding: 0; padding-left: 10px;"
                  min="0"
                ></v-text-field>
              </v-flex>
              <v-flex xs3>
                <v-checkbox
                  v-show="TradeTask.type == 'Send by %'"
                  label="Full merchants:"
                  v-model="TradeTask.full"
                  style="padding: 0; padding-left: 10px;"
                  min="0"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-layout>
        <v-layout
          row
          wrap
          v-show="TradeTask.type != 'Send by %'"
          class="tradeicons"
        >
          <v-flex xs3>
            <img v-bind:src="r1" alt="W" />
            <v-text-field
              hide-details
              v-model="TradeTask.resources['1']"
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="100"
              min="0"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r2" alt="W" />
            <v-text-field
              v-model="TradeTask.resources['2']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="100"
              min="0"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r3" alt="W" />
            <v-text-field
              v-model="TradeTask.resources['3']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="100"
              min="0"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r4" alt="W" />
            <v-text-field
              v-model="TradeTask.resources['4']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="100"
              min="0"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout
          row
          wrap
          v-show="TradeTask.type == 'Send by %'"
          class="tradeicons"
        >
          <v-flex xs12>
            <div>Fill</div>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r1" alt="W" />
            <v-text-field
              append-outer-icon="%"
              hide-details
              v-model="TradeTask.fill['1']"
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r2" alt="W" />
            <v-text-field
              append-outer-icon="%"
              v-model="TradeTask.fill['2']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r3" alt="W" />
            <v-text-field
              append-outer-icon="%"
              v-model="TradeTask.fill['3']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r4" alt="W" />
            <v-text-field
              append-outer-icon="%"
              v-model="TradeTask.fill['4']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <div>Empty</div>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r1" alt="W" />
            <v-text-field
              hide-details
              v-model="TradeTask.empty['1']"
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
              append-outer-icon="%"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r2" alt="W" />
            <v-text-field
              v-model="TradeTask.empty['2']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
              append-outer-icon="%"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r3" alt="W" />
            <v-text-field
              v-model="TradeTask.empty['3']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
              append-outer-icon="%"
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <img v-bind:src="r4" alt="W" />
            <v-text-field
              v-model="TradeTask.empty['4']"
              hide-details
              type="number"
              style="padding: 0; padding-left: 10px;"
              step="10"
              min="0"
              max="100"
              append-outer-icon="%"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout
          row
          wrap
          column
          style="overflow-y: auto;"
          :style="{
            height: $store.state.options.style.trade.height - 120 + 'px'
          }"
          v-show="$store.state.selectedVillage.tasks.trade.length != 0"
        >
          <v-flex xs12>
            <v-data-table
              :items="$store.state.selectedVillage.tasks.trade"
              hide-default-footer
              class="elevation-1"
              hide-default-header
              style="text-align: center; margin-top: 5px;"
            >
              <template v-slot:body="{ items }" id="tradeShow">
                <tbody>
                  <tr v-for="(item, index) in items" :key="index">
                    <td class="tdClass" style="width:5%">
                      <v-switch v-model="item.enabled"></v-switch>
                    </td>
                    <td class="tdClass" style="width:20%">{{ item.name }}</td>
                    <td class="tdClass" style="width:20%">
                      <div style="margin:10px">
                        <p v-if="item.type == '1x'">Send only once.</p>
                        <p v-if="item.type == 'Return'">
                          Send again when merchants return.
                        </p>
                        <p v-if="item.type == 'Every x minutes'">
                          Every {{ item.repeatinterval }} minutes.
                        </p>
                        <p v-if="item.type == 'Send by %'">
                          Min res: {{ item.minres }}
                        </p>
                        <p v-if="item.type == 'Send by %'">
                          Round: {{ item.round }}
                        </p>
                        <p v-if="item.type == 'Send by %'">
                          <v-checkbox
                            primary
                            label="Only full"
                            hide-details
                            v-model="item.full"
                            disabled
                          ></v-checkbox>
                        </p>
                      </div>
                    </td>
                    <td class="tdClass" style="width:40%">
                      <div>{{ "X:" + item.x }}</div>
                      <div>{{ "Y:" + item.y }}</div>
                    </td>
                    <td
                      class="tdClass"
                      style="width:30%"
                      v-if="item.type != 'Send by %'"
                    >
                      <div>{{ "Wood:" + item.resources["1"] }}</div>
                      <div>{{ "Clay:" + item.resources["2"] }}</div>
                      <div>{{ "Iron:" + item.resources["3"] }}</div>
                      <div>{{ "Grain:" + item.resources["4"] }}</div>
                    </td>
                    <td
                      class="tdClass"
                      style="width:30%"
                      v-if="item.type == 'Send by %'"
                    >
                      <table>
                        <tr>
                          <td style="height:auto"></td>
                          <td
                            style="height:auto; padding-left: 5px; padding-right:5px;"
                          >
                            Fill
                          </td>
                          <td style="height:auto">Empty</td>
                        </tr>
                        <tr>
                          <td style="height:auto">Wood:</td>
                          <td
                            style="height:auto; padding-left: 5px; padding-right:5px;"
                          >
                            {{ item.fill["1"] }}%
                          </td>
                          <td style="height:auto">{{ item.empty["1"] }}%</td>
                        </tr>
                        <tr>
                          <td style="height:auto">Clay:</td>
                          <td
                            style="height:auto; padding-left: 5px; padding-right:5px;"
                          >
                            {{ item.fill["2"] }}%
                          </td>
                          <td style="height:auto">{{ item.empty["2"] }}%</td>
                        </tr>
                        <tr>
                          <td style="height:auto">Iron:</td>
                          <td
                            style="height:auto; padding-left: 5px; padding-right:5px;"
                          >
                            {{ item.fill["3"] }}%
                          </td>
                          <td style="height:auto">{{ item.empty["3"] }}%</td>
                        </tr>
                        <tr>
                          <td style="height:auto">Grain:</td>
                          <td
                            style="height:auto; padding-left: 5px; padding-right:5px;"
                          >
                            {{ item.fill["4"] }}%
                          </td>
                          <td style="height:auto">{{ item.empty["4"] }}%</td>
                        </tr>
                      </table>
                    </td>
                    <td class="tdClass" style="width:10%">
                      <v-btn
                        text
                        icon
                        color="black"
                        @click="removeTrade(index)"
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </v-flex>
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
    VillageTo: { x: 0, y: 0, villageId: 0, name: "" },
    TradeTask: {
      type: "1x",
      x: 0,
      y: 0,
      villageId: 0,
      resources: { "1": 0, "2": 0, "3": 0, "4": 0 },
      fill: { "1": 90, "2": 90, "3": 90, "4": 90 },
      empty: { "1": 10, "2": 10, "3": 10, "4": 10 },
      minres: 100,
      round: 100,
      full: true,
      repeatinterval: 1,
      time: new Date().getTime(),
      name: "",
      enabled:true
    },
    showVillage: false
  }),
  methods: {
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.trade.width = width;
      if (height !== undefined)
        this.$store.state.options.style.trade.height = height;
      this.$store.state.options.style.trade.left = left;
      this.$store.state.options.style.trade.top = top;
      this.$store.state.options.coverdiv = false;
    },
    addTradeTask() {
      if (this.showVillage) {
        this.TradeTask.x = this.VillageTo.x;
        this.TradeTask.y = this.VillageTo.y;
        this.TradeTask.villageId = this.VillageTo.villageId;
        this.TradeTask.name = this.VillageTo.name;
      } else {
        this.TradeTask.name = "";
      }
      this.$store.state.selectedVillage.tasks.trade.push(
        JSON.parse(JSON.stringify(this.TradeTask))
      );
    },
    removeTrade(index: number) {
      this.$store.state.selectedVillage.tasks.trade.splice(index, 1);
    }
  },
  computed: {
    filterVillages() {
      this.VillageTo = this.$store.state.Player.villages.filter(
        (row: any) =>
          this.$store.state.selectedVillage.villageId !== row.villageId
      )[0];
      return this.$store.state.Player.villages.filter(
        (row: any) =>
          this.$store.state.selectedVillage.villageId !== row.villageId
      );
    },
    r1: function() {
      return this.$store.state.images.r1;
    },
    r2: function() {
      return this.$store.state.images.r2;
    },
    r3: function() {
      return this.$store.state.images.r3;
    },
    r4: function() {
      return this.$store.state.images.r4;
    }
  }
});
</script>
