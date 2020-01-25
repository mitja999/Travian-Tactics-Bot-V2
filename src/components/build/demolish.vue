<style>
.v-autocomplete__content .v-list {
  min-width: 300px;
  max-width: 330px;
  padding: 0px;
}
.v-autocomplete__content .v-select-list {
  padding: 0px;
  height: 0px;
}
.v-autocomplete__content {
  background-color: white;
}
.v-autocomplete__content .v-list div {
  float: left;
}
</style>
<template>
  <vue-draggable-resizable
    class="divBorder"
    :parent="true"
    :style="{ zIndex: $store.state.options.style.build.z }"
    :w="$store.state.options.style.build.width"
    :h="$store.state.options.style.build.height"
    :x="$store.state.options.style.build.left"
    :y="$store.state.options.style.build.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
    :key="$store.state.windowdimension"
  >
    <div class="containerCustom">
      <div label class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>gavel</v-icon>
          <b>{{
            demolish
              ? $store.state.lang["demolish"]
              : $store.state.lang["building"]
          }}</b>
          <label>{{ $store.state.selectedVillage.name }}</label>
        </v-chip>
        <div class="headdivicons" style="width: 100px;">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.build.show = false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn
            class="drag headButtonRight"
            fab
            small
            color="warning"
            @click="
              $store.state.options.style.build.z = $store.getters.getHighestZ()
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
            @click="demolish = !demolish"
          >
            <v-icon medium dark>remove_circle_outline</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="containerCustomBody" v-show="loading1 == false">
        <v-layout column v-show="loading1 == false" class="headlayout">
          <v-container fluid grid-list-sm>
            <v-layout row>
              <v-flex sm7 id="buildings">
                <v-autocomplete
                  class="builgins"
                  v-model="selectedBuilding"
                  :items="buildings"
                  :item-text="buildingname"
                  :item-value="buildingvalue"
                ></v-autocomplete>
              </v-flex>
              <v-flex d-flex sm3>
                <v-select
                  :items="levels"
                  v-model="selectedLevel"
                  label="Select"
                  single-line
                  style="height: 30px; padding: 0;    "
                ></v-select>
              </v-flex>
              <v-flex d-flex sm2>
                <v-btn text icon color="green" @click="addToTaskBuild">
                  <v-icon large>add_circle</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs3 sm10>
                <v-flex
                  d-flex
                  v-if="selectedBuilding.buildingType === 46"
                  class="resources"
                >
                  <img
                    v-bind:src="$store.state.images.r1"
                    alt="W"
                    height="22"
                    width="22"
                  />
                  <v-switch v-model="selectedResources" value="1"></v-switch>
                  <img
                    v-bind:src="$store.state.images.r2"
                    alt="W"
                    height="22"
                    width="22"
                  />
                  <v-switch v-model="selectedResources" value="2"></v-switch>
                  <img
                    v-bind:src="$store.state.images.r3"
                    alt="W"
                    height="22"
                    width="22"
                  />
                  <v-switch v-model="selectedResources" value="3"></v-switch>
                  <img
                    v-bind:src="$store.state.images.r4"
                    alt="W"
                    height="22"
                    width="22"
                  />
                  <v-switch v-model="selectedResources" value="4"></v-switch>
                </v-flex>
                <v-flex d-flex v-if="selectedBuilding.buildingType === 0">
                  <v-autocomplete
                    :items="newbuildings"
                    v-model="newBuilding"
                    item-text="name"
                    item-value="id"
                  ></v-autocomplete>
                </v-flex>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
        <v-layout
          column
          style="overflow-y: auto;"
          :style="{
            height: $store.state.options.style.build.height - 60 + 'px'
          }"
        >
          <v-data-table
            :items="$store.state.selectedVillage.tasks.build"
            hide-default-footer
            hide-default-header
            style="text-align: center;overflow-y: auto;"
            no-data-text="/"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td><v-switch v-model="item.enabled"></v-switch></td>
                  <td class="tdClass" style="width:5%">
                    {{ item.locationId }}
                  </td>
                  <td
                    class="tdClass resources"
                    style="width:60%"
                    v-show="item.locationId.constructor === Array"
                  >
                    <img
                      v-show="arrayHasItem(item.locationId, '1')"
                      v-bind:src="$store.state.images.r1"
                      alt="W"
                      height="22"
                      width="22"
                    />
                    <img
                      v-show="arrayHasItem(item.locationId, '2')"
                      v-bind:src="$store.state.images.r2"
                      alt="W"
                      height="22"
                      width="22"
                    />
                    <img
                      v-show="arrayHasItem(item.locationId, '3')"
                      v-bind:src="$store.state.images.r3"
                      alt="W"
                      height="22"
                      width="22"
                    />
                    <img
                      v-show="arrayHasItem(item.locationId, '4')"
                      v-bind:src="$store.state.images.r4"
                      alt="W"
                      height="22"
                      width="22"
                    />
                  </td>
                  <td
                    class="tdClass"
                    style="width:60%"
                    v-show="item.locationId.constructor !== Array"
                  >
                    {{
                      setBuildingNameFromId(item.locationId, item.buildingType)
                    }}
                  </td>
                  <td class="tdClass" style="width:10%">{{ item.toLvl }}</td>
                  <td class="tdClass" style="width:20%">
                    <v-btn text icon color="black" @click="removeBuild(index)">
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
    <div style="text-align: center" v-show="loading1 == true">
      <v-progress-circular
        indeterminate
        v-bind:size="50"
        color="primary"
      ></v-progress-circular>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from "vue";
import $store from "@/store";
export default Vue.extend({
  data: () => ({
    height: "50px",
    build: {
      show: true,
      left: 891,
      top: 255,
      width: 360,
      height: 190,
      z: 999,
      enabled: true
    },
    demolish: false,
    loading1: false,
    //Player:$parent.Player,
    selectedBuilding: $store.getters.getNewBuiding(),
    newBuilding: 0,
    selectedLevel: 0,
    selectedResources: ["1", "2", "3", "4"],
    showBuildHelper: false,
    options: {
      loops: 1,
      threads: 1,
      type: "greedy",
      criterium: {
        taskNumber: 10,
        time: 0,
        pop: 0,
        cp: 0,
        negative: 0,
        resorces: 0
      }
    },
    taskSimulator: {
      tasks: []
    }
  }),
  methods: {
    resize(left: number, top: number, width: number, height: number) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left: number, top: number, width: number, height: number) {
      if (width !== undefined)
        this.$store.state.options.style.build.width = width;
      if (height !== undefined)
        this.$store.state.options.style.build.height = height;
      this.$store.state.options.style.build.left = left;
      this.$store.state.options.style.build.top = top;
      this.$store.state.options.coverdiv = false;
    },
    addToTaskBuild() {
      var objj = {
        locationId: this.selectedBuilding.locationId,
        buildingType: this.selectedBuilding.buildingType,
        toLvl: this.selectedLevel,
        priority: 1,
        enabled: true
      };
      if (objj.buildingType == 0) {
        objj.buildingType = this.newBuilding;
      }
      if (!objj.toLvl) {
        return;
      }
      if (this.selectedBuilding.buildingType == 46) {
        objj.locationId = this.selectedResources;
      }
      this.$store.state.selectedVillage.tasks.build.push(objj);
    },
    removeBuild(index: number) {
      this.$store.state.selectedVillage.tasks.build.splice(index, 1);
    },
    setLevels: function(building: any) {
      let levels = [];
      if (building.buildingType == 0) {
        for (let i = 1; i < 21; i++) {
          levels.push(i);
        }
      } else {
        for (let i = building.lvlNext; i < (building.lvlMax && 20); i++) {
          levels.push(i);
        }
      }
    },
    setBuildingNameFromId: function(id: number, buildingType: number) {
      if (Array.isArray(id)) {
        if (id.length > 0) {
          var o = "";
          id.forEach((e: number) => {
            o += this.$store.state.Player.lang.buildings[e * 1];
          });
          return o;
        }
      } else return this.$store.state.lang["buldings"][buildingType]; //$parent.Player.lang.buildings[$parent.selectedVillage.buildings[id].buildingType];
    },
    getIcon(id: number) {
      return this.$store.getters.getIcon("clay");
    },
    arrayHasItem: function(array: Array<string>, item: string) {
      if (array.constructor === Array) {
        if (array.includes(item)) return true;
      }
      return false;
    },
    buildingname: function(item: any) {
      if (item === null) return "";
      if (item.buildingType === 46) {
        return (
          item.locationId +
          " " +
          this.$store.state.lang["allfields"] +
          " " +
          item.lvl
        );
      }
      return (
        item.locationId +
        " " +
        this.$store.state.lang["buldings"][item.buildingType] +
        " " +
        item.lvl
      );
    },
    buildingvalue: (item: any) => item
  },
  watch: {
    /* "options.criterium": {
      handler: async function(val, oldVal) {
        console.log(val);
        let rez = await $parent.$parent.Simulator.simulate(
          this.$store.state.selectedVillage,
          $parent.$parent.$worker,
          options
        );
        taskSimulator.tasks = rez.tasks;
        console.log(taskSimulator.tasks);
      },
      deep: true
    },*/
    "$store.state.options.style.build.show": async function(val) {
      if (val == true) {
        try {
          //analyze dorf1
          //console.log($parent.$parent.CheckLogic);
          let loading1 = await this.$store.state.CheckLogic.ApplyActions.analyseBuildings(
            this.$store.state.selectedVillage
          );
          if (loading1) {
            await this.$store.state.CheckLogic.ApplyActions.analyseBuildRouter(
              this.$store.state.selectedVillage
            );
            loading1 = false;
          }
        } catch (err) {}
      }
    },
    "this.$store.state.selectedVillage": async function(val) {
      //console.log("selected village changed")
      if (this.$store.state.options.style.build.show == true) {
        try {
          //analyze dorf1
          //console.log($parent.$parent.CheckLogic)
          let loading1 = await this.$store.state.CheckLogic.ApplyActions.analyseBuildings(
            val
          );
          if (loading1) {
            await this.$store.state.CheckLogic.ApplyActions.analyseBuildRouter(
              val
            );
            loading1 = false;
          }
        } catch (err) {}
      }
    }
  },
  mounted: function() {
    if (this.$store.state.selectedVillage.buildings[1] !== undefined)
      this.selectedBuilding = this.$store.state.selectedVillage.buildings[1];
    this.newBuilding = this.newbuildings[0].id;
  },
  computed: {
    newbuildings: function() {
      let b = [];
      for (let i = 5; i < 44; i++) {
        b.push({ id: i, name: this.$store.state.lang["buldings"][i] });
      }
      return b;
    },
    buildings: function() {
      var buildings = JSON.parse(
        JSON.stringify(this.$store.state.selectedVillage.buildings)
      );
      for (var i = 0; i < buildings.length; i++) {
        if (buildings[i] === null) {
          buildings.splice(i, 1);
          i--;
        }
      }
      //log.debug("selectedVillage",this.$store.state.selectedVillage)
      var buildtasks = this.$store.state.selectedVillage.tasks.build;
      //log.debug("buildtasks",buildtasks )

      for (var i = 0; i < buildtasks.length; i++) {
        var loc = buildtasks[i].locationId;
        if (Array.isArray(loc)) {
          continue;
        }
        if (buildings[loc].buildingType == 0) {
          var update = false;
          if (this.selectedBuilding.locationId == loc) {
            update = true;
          }
          buildings[loc].buildingType = buildtasks[i].buildingType;
          buildings[loc].lvlNext = buildtasks[i].toLvl + 1;
          if (update) {
            if (buildings[loc] !== undefined)
              this.selectedBuilding = buildings[loc];
          }
        } else {
          buildings[loc].lvlNext = buildtasks[i].toLvl + 1;
        }
      }

      buildings[0].buildingType = 46;
      buildings[0].locationId = 0;

      if (buildings[this.selectedBuilding.locationId] !== undefined)
        this.selectedBuilding = buildings[this.selectedBuilding.locationId];
      //console.log(selectedBuilding)

      return buildings;
      /*.filter(function (buildings,index) {
        return index > 0
      })*/
    },
    levels: function() {
      let levels = [];
      let building = this.selectedBuilding;
      if (building === undefined) return;
      if (building.buildingType == 0) {
        building = {
          buildingType: this.newBuilding
        };
      }
      let lvlNext = 1;
      if (building.lvlNext) {
        lvlNext = building.lvlNext;
      }
      //console.log("building",building,lvlNext)
      if (building.buildingType == undefined) return;
      if (this.selectedBuilding.buildingType == 46) {
        for (var i = 1; i < 16; i++) {
          levels.push(i);
        }
      } else {
        for (
          var i = lvlNext;
          i < this.$store.state.Buildings[building.buildingType].length;
          i++
        ) {
          levels.push(i);
        }
      }

      //console.log("levels",levels,building,building.buildingType)
      //if(levels.length>0){selectedLevel=levels[0];}
      if (levels.length > 0) {
        this.selectedLevel = levels[0];
      }

      return levels;
    }
  }
});
</script>
