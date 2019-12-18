<style type="text/css">
.input-group--selection-controls label {
  margin-left: -10px;
}
</style>

<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.buildfinder.z}"
    :parent="true"
    :key="$store.state.windowdimension"
    v-bind:w="$store.state.options.style.buildfinder.width"
    :h="$store.state.options.style.buildfinder.height"
    :x="$store.state.options.style.buildfinder.left"
    :y="$store.state.options.style.buildfinder.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
  >
    <div class="containerCustom">
      <div class="headDiv" style>
        <v-chip small class="badge" label dark color="blue-grey darken-1">
          <v-icon dark left>image_search</v-icon>
          <b>Build Finder</b>
          <label>{{$store.state.selectedVillage.name}}</label>
        </v-chip>
        <div class="headdivicons" >
        <v-btn
          class="drag headButtonRight"
          fab
          small
          dark
          color="red darken-1"
          @click="$store.state.options.style.buildfinder.show=false"
        >
          <v-icon medium>close</v-icon>
        </v-btn>
        <v-btn class="drag headButtonRight movebutton" fab small color="warning">
          <v-icon medium>open_with</v-icon>
        </v-btn></div>
      </div>
      <div class="containerCustomBody">
        <v-layout row wrap>
          <v-flex xs2 sm6>
            <v-slider
              hide-details
              label="time"
              v-bind:max="100"
              v-model="options.criterium.time"
              style="padding-top: 0px;"
            ></v-slider>
          </v-flex>
          <v-flex xs2 sm6>
            <v-slider
              hide-details
              label="pop"
              v-bind:max="100"
              v-model="options.criterium.pop"
              style="padding-top: 0px;"
            ></v-slider>
          </v-flex>
          <v-flex xs2 sm6>
            <v-slider
              hide-details
              label="cp"
              v-bind:max="100"
              v-model="options.criterium.cp"
              style="padding-top: 0px;"
            ></v-slider>
          </v-flex>
          <v-flex xs2 sm6>
            <v-slider
              hide-details
              label="resorces"
              v-bind:max="100"
              v-model="options.criterium.resorces"
              style="padding-top: 0px;"
            ></v-slider>
          </v-flex>
          <v-flex xs2 sm6>
            <v-slider
              hide-details
              label="number"
              v-bind:min="1"
              v-bind:max="20"
              v-model="options.criterium.taskNumber"
              style="padding-top: 0px;"
            ></v-slider>
          </v-flex>
          <v-flex xs2 sm6>
            <v-btn text icon color="green" @click="addToTaskBuildSimulator">
              <v-icon large>add_circle</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <div v-if="taskSimulator.tasks.length!=0">
          <v-data-table
            :items="taskSimulator.tasks"
            hide-default-footer
            class="elevation-1"
            hide-headers
            style="text-align: center;"
          >
            <template v-slot:body="{ items }" >
                      <tbody>
          <tr v-for="(item, index) in items" :key="index">
              <td class="tdClass" style="width:10%">{{ item.locationId }}</td>
              <td
                class="tdClass"
                style="width:70%"
              >{{ setBuildingNameFromId(1,item.buildingType) }}</td>
              <td class="tdClass" style="width:10%">{{ item.lvl }}</td>
              <td class="tdClass" style="width:20%">
                <v-btn text icon color="black" @click="removeBuildSimulator(index)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
          </tr>
        </tbody>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script lang="ts">
import Vue from "vue";
import $store from "@/store";
export default Vue.extend({
  data: () => ({
      //Player:this.$parent.Player,
      selectedBuilding: {},
      newBuilding: null,
      selectedLevel: 0,
      selectedResources: [],
      showBuildHelper: true,
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
        this.$store.state.options.style.buildfinder.width = width;
      if (height !== undefined)
        this.$store.state.options.style.buildfinder.height = height;
      this.$store.state.options.style.buildfinder.left = left;
      this.$store.state.options.style.buildfinder.top = top;
      this.$store.state.options.coverdiv = false;
    },
    addToTaskBuildSimulator() {
      this.taskSimulator.tasks.forEach(
        (task:any) =>{
          var objj = {
            locationId: task.locationId,
            buildingType: task.buildingType,
            toLvl: task.lvl,
            priority: 1
          };
          this.$store.state.selectedVillage.tasks.build.push(objj);
        }
      );
    },
    removeBuildSimulator(index:number) {
      this.taskSimulator.tasks.splice(index, 1);
    },
    setBuildingNameFromId: function(id:any, buildingType:any) {
      if (Array.isArray(id)) {
        if (id.length > 0) {
          var o = "";
          id.forEach(
            (e:any) =>{
              o += this.$store.state.Player.lang.buildings[e * 1];
            }
          );
          return o;
        }
      } else return this.$store.state.Player.lang.buildings[buildingType]; //this.$parent.Player.lang.buildings[this.$parent.selectedVillage.buildings[id].buildingType];
    }
  },
  watch: {
    /*"options.criterium": {
      handler: async function(val, oldVal) {
        console.log(val);
        let rez = await this.$parent.$parent.Simulator.simulate(
          this.$store.state.selectedVillage,
          this.$parent.$parent.$worker,
          this.options
        );
        this.taskSimulator.tasks = rez.tasks;
        console.log(this.taskSimulator.tasks);
      },
      deep: true
    }*/
  },
  mounted: function() {
    if (this.$store.state.selectedVillage.buildings[1] !== undefined) {
      this.selectedBuilding = this.$store.state.selectedVillage.buildings[1];
    }
    /*if (this.newbuildings !== undefined) {
      this.newBuilding = this.newbuildings[0].id;
    }*/
  },
  computed: {}
});
</script>