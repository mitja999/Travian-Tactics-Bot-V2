<style type="text/css">
.iconTroopT5 {
  width: 130px;
  height: 119px;
  zoom: 0.3;
}
.T5T1 {
  background-position: -4px -177px;
}
.T5T2 {
  background-position: -4px -177px;
}
.T5T3 {
  background-position: -4px -177px;
}
.T5T4 {
  background-position: -4px -177px;
}
.T5T5 {
  background-position: -4px -177px;
}
.T5T6 {
  background-position: -4px -177px;
}
table {
  text-align: center;
}
@-moz-document url-prefix() {
  .firefoxIcon {
    transform: scale(0.3);
    margin: -45px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.align-center {
  width: 100%;
  text-align: center;
}
.expansion-panel__header {
  padding: 0;
}
.attacktype .v-select__selection {
  margin: 5px;
}
</style>
<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.farmfinder.z }"
    :parent="true"
    :w="$store.state.options.style.farmfinder.width"
    :h="$store.state.options.style.farmfinder.height"
    :x="$store.state.options.style.farmfinder.left"
    :y="$store.state.options.style.farmfinder.top"
    :min-width="$store.state.options.style.farmfinder.minwidth"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    style=" background-color: white;"
    :drag-handle="'.drag'"
    :key="$store.state.windowdimension"
    :resizable="true"
    :enable-native-drag="true"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>location_searching</v-icon>
          <b>{{ $store.state.lang["cropfinder"] }}</b>
          <label>{{ $store.state.selectedVillage.name }}</label>
        </v-chip>
        <div class="headdivicons">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.farmfinder.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.farmfinder.z = $store.getters.getHighestZ()
            "
          >
            <v-icon medium>open_with</v-icon>
          </v-btn>
        </div>
      </div>
      <div justify-space-around class="containerCustomBody">
        <v-layout
          column
          style="overflow-y: auto;    overflow-x: hidden; margin:10px;"
          :style="{
            height: $store.state.options.style.farmfinder.height - 30 + 'px'
          }"
        >
          <v-container fluid grid-list-sm style="max-height:50px;">
            <v-layout row>
              <v-flex xs2 style="padding-left: 10px;    margin-top: 15px;">
                <v-text-field
                  label="X:"
                  v-model="Coordinates.x"
                  type="number"
                  hint="Coordinate X"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 style="padding-left: 10px;    margin-top: 15px;">
                <v-text-field
                  label="Y:"
                  v-model="Coordinates.y"
                  type="number"
                  hint="Coordinate Y"
                ></v-text-field>
              </v-flex>
              <v-flex xs8 style="padding-left: 10px;">
                <v-btn
                  text
                  icon
                  color="green"
                  @click="
                    farmFind();
                    showGoldClubFarm = false;
                  "
                  v-show="!$store.state.custom.farmfinder.running"
                >
                  <v-icon large>search</v-icon>
                </v-btn>
                <v-btn
                  text
                  icon
                  color="green"
                  @click="stop"
                  v-show="$store.state.custom.farmfinder.running"
                >
                  <v-icon large>stop</v-icon>
                </v-btn>

                <v-btn
                  text
                  icon
                  color="green"
                  @click="cropFind()"
                  v-show="!$store.state.custom.farmfinder.running"
                >
                  <v-icon large>C</v-icon>
                </v-btn>

                <v-btn
                  text
                  icon
                  color="green"
                  @click="showFilter = showFilter ? false : true"
                >
                  <v-icon large>filter_none</v-icon>
                </v-btn>

                <v-btn
                  text
                  icon
                  color="amber darken-1"
                  @click="
                    showGoldClubFarm = true;
                    $store.state.CheckLogic.getGoldClubFarmlists({});
                  "
                >
                  <v-icon large>my_location</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <div v-if="!showGoldClubFarm">
            <v-data-table
              :headers="headers"
              :items="$store.state.custom.FarmFinderFarms"
              item-key="villageId"
              show-select
              v-model="selected"
            >
              <template v-slot:top>
                <v-layout row>
                  <v-flex xs2>
                    distance
                    <br />
                    <v-text-field
                      label
                      v-model="Coordinates.distance"
                      type="number"
                      min="1"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    InActive
                    <br />
                    <v-checkbox
                      primary
                      label
                      hide-details
                      v-model="filterFarm.activePlayers.val"
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs2>
                    NoAlly
                    <br />
                    <v-checkbox
                      primary
                      label
                      hide-details
                      v-model="filterFarm.noAlly.val"
                    ></v-checkbox>
                  </v-flex>
                  <v-flex xs2>
                    Min pop
                    <br />
                    <v-text-field
                      label
                      v-model="filterFarm.pop.min"
                      type="number"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs2>
                    Max pop
                    <br />
                    <v-text-field
                      label
                      v-model="filterFarm.pop.max"
                      type="number"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </template>
            </v-data-table>
          </div>
          <v-layout row wrap v-if="!showGoldClubFarm">
            <v-layout row wrap>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(1)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['1']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(2)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['2']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(3)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['3']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(4)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['4']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(5)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['5']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(6)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['6']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(7)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['7']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs1 style>
                    <div class="firefoxIcon" v-bind:style="troopIcon(8)"></div>
                    <v-text-field
                      label
                      v-model="FarmTask.amount['8']"
                      type="number"
                      hint="amount"
                      min="0"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs3 style=" margin-top:-10px;">
                    <v-select
                      v-bind:items="[
                        { text: 'attack', value: '3' },
                        { text: 'raid', value: '4' },
                        { text: 'support', value: '5' },
                        { text: 'spy', value: '6' }
                      ]"
                      v-model="FarmTask.movementType"
                      label="Select"
                      single-line
                      class="attacktype"
                    ></v-select>
                    <v-layout row>
                      <v-flex xs6>
                        <v-text-field
                          style="margin-top:15px"
                          label="Min time:"
                          v-model="FarmTask.timeMinutes"
                          type="number"
                          hint="min"
                          min="10"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs6>
                        <v-text-field
                          style="margin-top:15px"
                          label="Max time:"
                          v-model="FarmTask.timeMinutesMax"
                          type="number"
                          hint="max"
                          min="10"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs1 style="margin-left: 0px;margin-top: 36px;">
                    <v-btn text icon color="green" @click="addTaskFarm">
                      <v-icon large>add_circle</v-icon>
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-layout>
          <v-container fluid px-0 v-if="showGoldClubFarm">
            <v-radio-group
              v-bind:key="index"
              v-for="(farmList, index) in $store.state.Player.goldClubFarmlists"
              v-model="selectedFarmlist"
            >
              <v-radio
                :label="farmList.listName"
                :key="index"
                :value="index"
              ></v-radio>
            </v-radio-group>
            <v-layout style="margin-top:15px">
              <v-flex xs2>
                <v-text-field
                  label="Min time:"
                  v-model="FarmTask.timeMinutes"
                  type="number"
                  hint="min"
                ></v-text-field>
              </v-flex>
              <v-flex xs2 style="margin-left:5px;">
                <v-text-field
                  label="Max time:"
                  v-model="FarmTask.timeMinutesMax"
                  type="number"
                  hint="max"
                ></v-text-field>
              </v-flex>
              <v-flex xs1 style="margin-left:5px;">
                <v-btn block color="green" dark @click="addGoldClubFarmlist">
                  <v-icon large>add_box</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
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
    Coordinates: {
      x: 1,
      y: 1,
      distance: $store.state.custom.farmfinder.distance
    },
    Player: $store.state.Player,
    showFilter: false,
    showProggres: false,
    progress: 0.0,
    //movementType 3-attack, 4-raid, 5-support, 6-spy
    FarmTask: {
      goldClubFarmlist: false,
      movementType: "4",
      amount: {
        "1": 0,
        "2": 0,
        "3": 0,
        "4": 0,
        "5": 0,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0
      },
      time: new Date().getTime(),
      villages: new Array(),
      farmPosition: 0,
      timeMinutes: 10,
      timeMinutesMax: 30,
      //{"listId":"1713","listName":"Startup farm list","lastSent":"0","lastChanged":1514720188,"units":{"1":"0","2":"3","3":"0","4":"0","5":"0","6":"0"},"orderNr":"0","villageIds":["534691834","537509897","538329049"],"entryIds":["43559","43576","43575"],"isDefault":true,"maxEntriesCount":10}
      selectedFarmlist: {
        listId: "0",
        listName: "",
        lastSent: "0",
        lastChanged: 0,
        units: { "1": "0", "2": "0", "3": "0", "4": "0", "5": "0", "6": "0" },
        orderNr: "0",
        villageIds: [],
        entryIds: [],
        isDefault: true,
        maxEntriesCount: 10,
        villageId: 0
      }
    },
    Types: ["1", "2", "3", "4", "5", "6", "7", "8"],
    selectedVillages: [],
    selected: [],
    filterFarm: {
      distance: {
        val: $store.state.custom.farmfinder.distance,
        enabled: true
      },
      pop: { min: 0, max: 2000, enabled: true },
      activePlayers: { val: false, enabled: true },
      noAlly: { val: false, enabled: true }
    },
    TroopUrl: "",
    fontSize: 10,
    pagination: {
      sortBy: "distance",
      descending: false,
      rowsPerPage: 5000000
    },
    extended: true,
    showGoldClubFarm: false,
    snackbar: false,
    newFarmListName: "",
    selectedFarmlist: 0,
    copyStatus: { value: 0 }
  }),
  computed: {
    headers() {
      return [
        {
          text: "Ally",
          value: "ally.name",
          align: "center",
          filter: (value: string) => {
            return this.filterFarm.noAlly ? true : true;
          }
        },
        {
          text: "Player",
          value: "player.name",
          align: "center",
          filter: (value: string) => {
            return this.$store.state.Player.name !== value;
          }
        },
        { text: "Village", value: "name", align: "center" },
        {
          text: "Pop",
          value: "population",
          align: "center",
          filter: (value: number) => {
            return (
              value < this.filterFarm.pop.max && value > this.filterFarm.pop.min
            );
          }
        },
        {
          text: "Distance",
          value: "distance",
          align: "center",
          filter: (value: number) => {
            return value < this.filterFarm.distance.val;
          }
        },
        {
          text: "Active",
          value: "active",
          align: "center"
        },
        { text: "Report", value: "lastReport", align: "center" }
      ];
    }
  },
  mounted: async function() {
    if (this.$store.state.selectedVillage) {
      this.Coordinates.x = this.$store.state.selectedVillage.x;

      this.Coordinates.y = this.$store.state.selectedVillage.y;
    }
  },
  watch: {
    Coordinates: {
      handler: function(val, oldVal) {
        //debugger
        if (!isNaN(val.distance * 1)) {
          this.filterFarm.distance.val = val.distance * 1;
          this.$store.state.custom.farmfinder.distance = val.distance * 1;
        }
      },
      deep: true
    },
    "$store.state.selectedVillage.x": function(val) {
      this.Coordinates.x = this.$store.state.selectedVillage.x;
    },
    "$store.state.selectedVillage.y": function(val) {
      this.Coordinates.y = this.$store.state.selectedVillage.y;
    }
  },
  methods: {
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.farmfinder.width = width;
      if (height !== undefined)
        this.$store.state.options.style.farmfinder.height = height;
      this.$store.state.options.style.farmfinder.left = left;
      this.$store.state.options.style.farmfinder.top = top;
      this.$store.state.options.coverdiv = false;
    },
    customFilter(items: Array<any>, search: any, filter: any) {
      return items.filter(
        row =>
          //distance
          Number(
            Math.sqrt(
              (row.x - this.Coordinates.x) * (row.x - this.Coordinates.x) +
                (row.y - this.Coordinates.y) * (row.y - this.Coordinates.y)
            ).toFixed(1)
          ) < search.distance.val &&
          //pop
          row.population * 1 > search.pop.min &&
          row.population * 1 < search.pop.max &&
          //active players
          (search.activePlayers.val ? row.player.active == "0" : true) &&
          //no ally
          (search.noAlly.val ? row.player.ally.id === undefined : true)
      );
    },
    customFilterNew(value: any, search: any, item: any) {
      return (
        value != null &&
        search != null &&
        //distance
        Number(
          Math.sqrt(
            (value.x - this.Coordinates.x) * (value.x - this.Coordinates.x) +
              (value.y - this.Coordinates.y) * (value.y - this.Coordinates.y)
          ).toFixed(1)
        ) < search.distance.val &&
        //pop
        value.population * 1 > search.pop.min &&
        value.population * 1 < search.pop.max &&
        //active players
        (search.activePlayers.val ? value.player.active == "0" : true) &&
        //no ally
        (search.noAlly.val ? value.player.ally.id === undefined : true)
      );
    },
    addTaskFarm() {
      debugger;
      this.FarmTask.villages = [];
      this.selected.forEach((farm: any) => {
        this.FarmTask.villages.push(farm);
      });
      this.$store.state.selectedVillage.tasks.farms.push(
        JSON.parse(JSON.stringify(this.FarmTask))
      );
      this.selected = [];
    },
    removeFarmList(index: number) {
      this.$store.state.selectedVillage.tasks.farms.splice(index, 1);
    },
    async farmFind() {
      this.selected = [];
      this.$store.state.custom.FarmFinderFarms = [];

      this.$store.state.CheckLogic.search({
        Coordinates: this.Coordinates,
        url: this.$store.state.Player.url,
        SeesionId: this.$store.state.Player.SeesionId
      });
      //this.searchResult=data.farms;
    },
    async cropFind() {
      this.selected = [];
      this.$store.state.custom.FarmFinderFarms = [];
      this.$store.state.CheckLogic.cropFind({
        Coordinates: this.Coordinates,
        url: this.$store.state.Player.url,
        SeesionId: this.$store.state.Player.SeesionId
      });
    },
    troopIcon(id: number) {
      return this.$store.getters.troopIconFF(id);
    },
    stop() {
      this.$store.state.custom.farmfinder.stopped = true;
    },
    addGoldClubFarmlist() {
      this.FarmTask.selectedFarmlist = this.$store.state.Player.goldClubFarmlists[
        this.selectedFarmlist
      ];
      this.FarmTask.goldClubFarmlist = true;
      //debugger
      if (this.FarmTask.selectedFarmlist.villageId) {
        var vill = this.$store.state.Player.getVillage(
          this.FarmTask.selectedFarmlist.villageId
        );
        //debugger
        if (vill) {
          this.$store.state.selectedVillage = vill;
        }
      }
      this.$store.state.selectedVillage.tasks.farms.push(
        JSON.parse(JSON.stringify(this.FarmTask))
      );
    },
    async copyFarmlist() {
      /*let startBotAfter = this.$parent.$parent.start;
      if (this.$parent.$parent.start) {
        this.$parent.$parent.startBot(); //stop bot
      }
      this.copyStatus.value = 1;
      await this.$store.state.CheckLogic.coppyFarmlist(
        this.$store.state.selectedVillage,
        this.$store.state.selectedVillage.tasks.farms[this.selectedFarmlist],
        this.newFarmListName,
        this.copyStatus
      );
      this.copyStatus.value = 0;
      this.snackbar = false;
      if (startBotAfter) {
        this.$parent.$parent.startBot(); //start bot
      }*/
    }
  },
  filters: {
    uppercase: function(value: string) {
      return value.toUpperCase();
    },
    shorten: function(value: string) {
      return value !== undefined ? value.substring(0, 8) : "/";
    }
  }
});
</script>
