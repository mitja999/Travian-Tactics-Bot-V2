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
    :style="{ zIndex: $store.state.options.style.farm.z}"
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
          <b>{{$store.state.lang["farmlist"]}}</b>
          <label>{{$store.state.selectedVillage.name}}</label>
        </v-chip>
        <div class="headdivicons" style="width: 100px;">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.farm.show=false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn class="drag headButtonRight" fab small color="warning" @click="$store.state.options.style.farm.z=$store.getters.getHighestZ()">
            <v-icon medium>open_with</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight movebutton"
            color="green darken-1"
            dark
            fab
            small
            @click="$store.state.options.style.farmfinder.show=!$store.state.options.style.farmfinder.show; $store.state.options.style.farmfinder.z=$store.getters.getHighestZ()"
          >
            <v-icon medium dark>location_searching</v-icon>
          </v-btn>
        </div>
      </div>
      <v-layout
        justify-space-around
        class="containerCustomBody"
        style="overflow-y: auto;"
        :style="{ height: $store.state.options.style.farm.height-60+'px'}"
      >
        <div style="width: 100%;">
          <v-snackbar
            :timeout="300000"
            :multi-line="true"
            :vertical="false"
            :top="true"
            v-model="snackbar"
            absolute
          >
            <v-layout row wrap>
              <v-flex xs4 sm12 v-show="copyStatus.value==0">
                <v-text-field v-model="newFarmListName" dark hint="name" label="name"></v-text-field>
              </v-flex>
              <v-flex xs12 v-show="copyStatus.value!=0">
                <div style="width:100%"></div>
                <v-progress-linear
                  buffer-value="100"
                  v-model="copyStatus.value"
                  height="15"
                  color="info"
                ></v-progress-linear>
              </v-flex>
              <v-flex xs2 sm6 v-show="copyStatus.value==0">
                <v-btn icon color="green" @click="copyFarmlist" hide-details>
                  <v-icon>done</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs2 sm6 v-show="copyStatus.value==0">
                <v-btn icon color="red" @click.native="snackbar = false" hide-details>
                  <v-icon>clear</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-snackbar>
          <v-expansion-panel>
            <v-expansion-panel-content
              hide-actions
              v-bind:key="index"
              v-for="(farmTask, index) in $store.state.selectedVillage.tasks.farms"
            >
              <table slot="header">
                <thead>
                  <tr>
                    <th style="width: 50px;" v-if="farmTask.amount['1']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(1)"></div>
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['2']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(2)"></div>
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['3']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(3)"></div>
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['4']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(4)"></div>
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['5']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(5)"></div>
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['6']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(6)"></div>
                    </th>
                    <th style="width: 50px;">
                      <v-btn icon color="amber" @click="snackbar = true; selectedFarmlist=index">
                        <v-icon>content_copy</v-icon>
                      </v-btn>
                    </th>
                    <th>
                      <v-btn @click="removeFarmList(index)" icon>
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </th>
                    <th>{{farmTask.villages.length}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td
                      style="padding-right:0px;padding-left:0px"
                      v-if="farmTask.amount['1']!==0"
                    >{{farmTask.amount['1']}}</td>
                    <td
                      style="padding-right:0px;padding-left:0px"
                      v-if="farmTask.amount['2']!==0"
                    >{{farmTask.amount['2']}}</td>
                    <td
                      style="padding-right:0px;padding-left:0px"
                      v-if="farmTask.amount['3']!==0"
                    >{{farmTask.amount['3']}}</td>
                    <td
                      style="padding-right:0px;padding-left:0px"
                      v-if="farmTask.amount['4']!==0"
                    >{{farmTask.amount['4']}}</td>
                    <td
                      style="padding-right:0px;padding-left:0px"
                      v-if="farmTask.amount['5']!==0"
                    >{{farmTask.amount['5']}}</td>
                    <td
                      style="padding-right:0px;padding-left:0px"
                      v-if="farmTask.amount['6']!==0"
                    >{{farmTask.amount['6']}}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <ul>
                  <li
                    v-bind:key="index"
                    v-for="(farm,index) in farmTask.villages"
                  >{{farm.name+"("+ farm.x+","+farm.y +")"}}</li>
                </ul>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </div>
      </v-layout>
    </div>
  </vue-draggable-resizable>
</template>

<script>
export default {
  name: "farm",
  data() {
    return {
      fontSize: "13px",
      Coordinates: {
        x: 1,
        y: 1,
        distance: this.$store.state.custom.farmfinder.distance
      },
      Player: this.$store.state.Player,
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
        villages: [],
        farmPosition: 0,
        timeMinutes: 10,
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
          maxEntriesCount: 10
        }
      },
      Types: ["1", "2", "3", "4", "5", "6", "7", "8"],
      selectedVillages: [],
      selected: [],
      filterFarm: {
        distance: {
          val: this.$store.state.custom.farmfinder.distance,
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
      selectedFarmlist: {},
      extended: true,
      showGoldClubFarm: false,
      snackbar: false,
      newFarmListName: "",
      selectedFarmlist: 0,
      copyStatus: { value: 0 }
    };
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
    }
  },
  methods: {
    resize(left, top, width, height) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left, top, width, height) {
      if (width !== undefined)
        this.$store.state.options.style.farm.width = width;
      if (height !== undefined)
        this.$store.state.options.style.farm.height = height;
      this.$store.state.options.style.farm.left = left;
      this.$store.state.options.style.farm.top = top;
      this.$store.state.options.coverdiv = false;
    },
    customFilter(items, search, filter) {
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
    },
    addTaskFarm() {
      this.FarmTask.villages = [];
      this.selected.forEach(
        function(farm) {
          this.FarmTask.villages.push(farm);
        }.bind(this)
      );
      this.$store.state.selectedVillage.tasks.farms.push(
        JSON.parse(JSON.stringify(this.FarmTask))
      );
      this.selected = [];
    },
    removeFarmList(index) {
      this.$store.state.selectedVillage.tasks.farms.splice(index, 1);
    },
    async farmFind() {
      this.selected = [];
      this.$store.state.custom.FarmFinderFarms = [];
      this.$parent.$parent.CheckLogic.search({
        Coordinates: this.Coordinates,
        url: this.$store.state.Player.url,
        SeesionId: this.$store.state.Player.SeesionId
      });
      //this.searchResult=data.farms;
    },
    async cropFind() {
      this.selected = [];
      this.$store.state.custom.FarmFinderFarms = [];
      this.$parent.$parent.CheckLogic.cropFind({
        Coordinates: this.Coordinates,
        url: this.$store.state.Player.url,
        SeesionId: this.$store.state.Player.SeesionId
      });
    },
    troopIcon(id) {
      return this.$store.getters.troopIcon(id);
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
      let startBotAfter = this.$parent.$parent.start;
      if (this.$parent.$parent.start) {
        this.$parent.$parent.startBot(); //stop bot
      }
      this.copyStatus.value = 1;
      await this.$parent.$parent.CheckLogic.coppyFarmlist(
        this.$store.state.selectedVillage,
        this.$store.state.selectedVillage.tasks.farms[this.selectedFarmlist],
        this.newFarmListName,
        this.copyStatus
      );
      this.copyStatus.value = 0;
      this.snackbar = false;
      if (startBotAfter) {
        this.$parent.$parent.startBot(); //start bot
      }
    }
  },
  filters: {
    uppercase: function(value) {
      return value.toUpperCase();
    },
    shorten: function(value) {
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
};
</script>