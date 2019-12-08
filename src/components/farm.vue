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
</style>
<template>
  <vue-draggable-resizable
    :style="{ zIndex: $store.state.options.style.farm.z }"
    class="divBorder"
    :parent="true"
    :w="$store.state.options.style.farm.width"
    :h="$store.state.options.style.farm.height"
    :x="$store.state.options.style.farm.left"
    :y="$store.state.options.style.farm.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    style=" background-color: white;"
    :drag-handle="'.drag'"
    :key="$store.state.windowdimension"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>my_location</v-icon>
          <b>{{ $store.state.lang["farmlist"] }}</b>
          <label>{{ $store.state.selectedVillage.name }}</label>
        </v-chip>
        <div class="headdivicons" style="width: 100px;">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.farm.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.farm.z = $store.getters.getHighestZ()
            "
          >
            <v-icon medium>open_with</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            color="green darken-1"
            dark
            fab
            small
            @click="
              $store.state.options.style.farmfinder.show = !$store.state.options
                .style.farmfinder.show;
              $store.state.options.style.farmfinder.z = $store.getters.getHighestZ();
            "
          >
            <v-icon medium dark>location_searching</v-icon>
          </v-btn>
        </div>
      </div>
      <v-layout
        justify-space-around
        class="containerCustomBody"
        style="overflow-y: auto;"
        :style="{ height: $store.state.options.style.farm.height - 60 + 'px' }"
      >
        <v-expansion-panels>
          <v-expansion-panel
            color="green darken-1"
            v-for="(FarmTask, index) in $store.state.selectedVillage.tasks
              .farms"
            :key="index"
          >
            <v-expansion-panel-header
              :style="{
                backgroundColor: FarmTask.goldClubFarmlist
                  ? '#FFE57F'
                  : '#BBDEFB'
              }"
              >farmTask
              {{
                FarmTask.listName !== undefined ? FarmTask.listName : ""
              }}</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-layout row wrap>
                <v-btn x-large @click="removeFarmList(index)" icon>
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-flex xs1 style v-if="FarmTask.amount['1'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(1)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['1']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 style v-if="FarmTask.amount['2'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(2)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['2']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 style v-if="FarmTask.amount['3'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(3)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['3']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 style v-if="FarmTask.amount['4'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(4)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['4']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 style v-if="FarmTask.amount['5'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(5)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['5']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 style v-if="FarmTask.amount['6'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(6)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['6']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 style v-if="FarmTask.amount['7'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(7)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['7']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex xs1 style v-if="FarmTask.amount['8'] !== 0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(8)"></div>
                  <v-text-field
                    label
                    v-model="FarmTask.amount['8']"
                    type="number"
                    hint="amount"
                    min="0"
                  ></v-text-field>
                </v-flex>
                <v-flex v-if="!FarmTask.goldClubFarmlist">
                  <v-hover v-slot:default="{ hover }">
                    <v-container>
                      <v-row>
                        <v-btn icon color="amber">
                          <v-icon>content_copy</v-icon>
                        </v-btn>
                        <v-layout v-show="hover">
                          <v-text-field
                            label="Copy farmlist, name: "
                            style="max-width:200px;"
                            v-model="newFarmListName"
                          ></v-text-field>

                          <v-btn
                            @click="copyFarmlist(index)"
                            icon
                            color="green"
                          >
                            <v-icon>check_circle</v-icon>
                          </v-btn>
                        </v-layout>
                      </v-row>
                      <v-row>
                        <v-progress-linear
                          v-show="copyStatus.value > 0"
                          v-model="copyStatus.value"
                          color="light-blue"
                          height="10"
                          value="10"
                          striped
                        ></v-progress-linear>
                      </v-row>
                    </v-container>
                  </v-hover>
                </v-flex>
              </v-layout>
              <div :key="componentKey">
                <ul>
                  <li v-bind:key="i" v-for="(farm, i) in FarmTask.villages">
                    <v-btn @click="removeFarmListFarm(index, i)" icon>
                      <v-icon>delete</v-icon>
                    </v-btn>
                    {{ farm.name + "(" + farm.x + "," + farm.y + ")" }}
                  </li>
                </ul>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-layout>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from "vue";
import $store from "@/store";
export default Vue.extend({
  data: () => ({
    fontSize: "13px",
    Coordinates: {
      x: 1,
      y: 1,
      distance: $store.state.custom.farmfinder.distance
    },
    Player: $store.state.Player,
    showFilter: false,
    showProggres: false,
    progress: 0.0,
    componentKey: 0,
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
      timeMinutes: 10
      //{"listId":"1713","listName":"Startup farm list","lastSent":"0","lastChanged":1514720188,"units":{"1":"0","2":"3","3":"0","4":"0","5":"0","6":"0"},"orderNr":"0","villageIds":["534691834","537509897","538329049"],"entryIds":["43559","43576","43575"],"isDefault":true,"maxEntriesCount":10}
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
    pagination: {
      sortBy: "distance",
      descending: false,
      rowsPerPage: 5000000
    },
    extended: true,
    showGoldClubFarm: false,
    snackbar: false,
    newFarmListName: "",
    copyStatus: { value: 0 }
  }),
  watch: {
    Coordinates: {
      handler: function(val, oldVal) {
        if (!isNaN(val.distance * 1)) {
          this.filterFarm.distance.val = val.distance * 1;
          this.$store.state.custom.farmfinder.distance = val.distance * 1;
        }
      },
      deep: true
    }
  },
  methods: {
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.farm.width = width;
      if (height !== undefined)
        this.$store.state.options.style.farm.height = height;
      this.$store.state.options.style.farm.left = left;
      this.$store.state.options.style.farm.top = top;
      this.$store.state.options.coverdiv = false;
    },
    /*customFilter(items, search, filter) {
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
          (row.population * 1 > search.pop.min &&
            row.population * 1 < search.pop.max) &&
          //active players
          (search.activePlayers.val ? row.player.active == "0" : true) &&
          //no ally
          (search.noAlly.val ? row.player.ally.id === undefined : true)
      );
    },*/
    addTaskFarm() {
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
    removeFarmListFarm(index: number, i: number) {
      this.$store.state.selectedVillage.tasks.farms[index].villages.splice(
        i,
        1
      );
      this.componentKey++;
    },
    async farmFind() {
      this.selected = [];
      this.$store.state.custom.FarmFinderFarms = [];
      /*this.$parent.$parent.CheckLogic.search({
        Coordinates: this.Coordinates,
        url: this.$store.state.Player.url,
        SeesionId: this.$store.state.Player.SeesionId
      });*/
      //this.searchResult=data.farms;
    },
    troopIcon(id: number) {
      return this.$store.getters.troopIcon(id);
    },
    stop() {
      this.$store.state.custom.farmfinder.stopped = true;
    },
    async copyFarmlist(selectedFarmlist: number) {
      let startBotAfter = this.$store.state.start;
      if (this.$store.state.start) {
        this.$store.state.startBot(); //stop bot
      }
      this.copyStatus.value = 1;

      await this.$store.state.CheckLogic.coppyFarmlist(
        this.$store.state.selectedVillage,
        this.$store.state.selectedVillage.tasks.farms[selectedFarmlist],
        this.newFarmListName,
        this.copyStatus
      );
      this.copyStatus.value = 0;
      this.snackbar = false;
      if (startBotAfter) {
        this.$store.state.startBot(); //start bot
      }
    }
  },
  filters: {
    uppercase: function(value: string) {
      return value.toUpperCase();
    },
    shorten: function(value: string) {
      return value !== undefined ? value.substring(0, 8) : "/";
    }
  },
  created: function() {
    this.Coordinates.x = this.$store.state.selectedVillage.x;
    this.Coordinates.y = this.$store.state.selectedVillage.y;
    //this.$parent.$parent.custom.FarmFinderFarms.push({"villageId":"536657960","name":"1. New Dawn","population":"171","type":"1","hasActiveTreasury":true,"influenceSize":2.3,"treasures":"35","x":40,"y":-7,"lastReport":{},"player":{"name":"Wolf","tribeId":"2","kingdomRole":"2","kingStatus":false,"kingdomId":"137","kingId":119,"spawnedOnMap":"1512478993","active":"1","id":"123","ally":{"id":"137","name":"Gaia"}}});
    // this.$parent.$parent.custom.FarmFinderFarms=[];
  },
  computed: {}
});
</script>
