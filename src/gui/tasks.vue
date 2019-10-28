<template>
  <vue-draggable-resizable
    class="divBorder"
    :style="{ zIndex: $store.state.options.style.tasks.z}"
    :parent="true"
    :w="$store.state.options.style.tasks.width"
    :h="$store.state.options.style.tasks.height"
    :x="$store.state.options.style.tasks.left"
    :y="$store.state.options.style.tasks.top"
    @resizing="resize"
    @resizestop="resizestop"
    @dragging="resize"
    @dragstop="resizestop"
    :drag-handle="'.drag'"
    :key="$store.state.windowdimension"
  >
    <div class="containerCustom tasksdiv" dark>
      <div class="headDiv" style>
        <v-chip small class="badge" dark label color="blue-grey darken-1">
          <v-icon dark left>group_add</v-icon>
          <b>{{$store.state.lang["tasklist"]}}</b>
          <label>{{$store.state.selectedVillage.name}}</label>
        </v-chip>
        <div class="headdivicons">
          <v-btn
            class="drag headButtonRight"
            fab
            small
            dark
            color="red darken-1"
            @click="$store.state.options.style.tasks.show=false"
          >
            <v-icon medium>close</v-icon>
          </v-btn>
          <v-btn class="drag headButtonRight movebutton" fab small color="warning" @click="$store.state.options.style.tasks.z=$store.getters.getHighestZ()">
            <v-icon medium>open_with</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="containerCustomBody">
        <v-layout
          column
          style="overflow-y: auto;"
          :style="{ height: $store.state.options.style.tasks.height-60+'px'}"
        >
          
          <v-data-table
            :items="$store.state.selectedVillage.tasks.build"
            hide-actions
            hide-headers
            style="text-align: center;overflow-y: auto;"
            no-data-text="/"
            v-show="$store.state.selectedVillage.tasks.build.length!==0"
          >
            <template slot="items" slot-scope="props">
              <td class="tdClass" style="width:15%">
                <v-btn
                  color="blue-grey darken-4"
                  small
                  dark
                  fab
                  @click="$store.state.options.style.build.show=!$store.state.options.style.build.show; $store.state.options.style.build.z=$store.getters.getHighestZ()"
                >
                  <v-icon dark>gavel</v-icon>
                </v-btn>
              </td>
              <td class="tdClass" style="width:10%">{{ props.item.locationId }}</td>
              <td
                class="tdClass resources"
                style="width:45%"
                v-show="props.item.locationId.constructor === Array"
              >
                <img
                  v-show="arrayHasItem(props.item.locationId,'1')"
                  v-bind:src="$store.state.images.r1"
                  alt="W"
                  height="22"
                  width="22"
                >
                <img
                  v-show="arrayHasItem(props.item.locationId,'2')"
                  v-bind:src="$store.state.images.r2"
                  alt="W"
                  height="22"
                  width="22"
                >
                <img
                  v-show="arrayHasItem(props.item.locationId,'3')"
                  v-bind:src="$store.state.images.r3"
                  alt="W"
                  height="22"
                  width="22"
                >
                <img
                  v-show="arrayHasItem(props.item.locationId,'4')"
                  v-bind:src="$store.state.images.r4"
                  alt="W"
                  height="22"
                  width="22"
                >
              </td>
              <td
                class="tdClass"
                style="width:60%"
                v-show="props.item.locationId.constructor !== Array"
              >{{ setBuildingNameFromId(props.item.locationId,props.item.buildingType) }}</td>
              <td class="tdClass" style="width:10%">{{ props.item.toLvl }}</td>
              <td class="tdClass" style="width:20%">
                <v-btn flat icon color="black" @click="removeBuild(props.index)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
          <v-data-table
            :items="$store.state.selectedVillage.tasks.trade"
            hide-actions
            class="elevation-1"
            hide-headers
            style="text-align: center; margin-top: 5px;"
            v-show="$store.state.selectedVillage.tasks.trade.length!==0"
          >
            <template slot="items" slot-scope="props" id="tradeShow">
              <td class="tdClass" style="width:15%">
                <v-btn
                  color="blue-grey darken-4"
                  small
                  dark
                  fab
                  @click="$store.state.options.style.trade.show=!$store.state.options.style.trade.show; $store.state.options.style.trade.z=$store.getters.getHighestZ()"
                >
                  <v-icon dark>swap_horiz</v-icon>
                </v-btn>
              </td>
              <td class="tdClass" style="width:20%">{{ props.item.name }}</td>
              <td class="tdClass" style="width:20%">
                <div style="margin:10px">
                  <p v-if="props.item.type=='1x'">Send only once.</p>
                  <p v-if="props.item.type=='Return'">Send again when merchants return.</p>
                  <p
                    v-if="props.item.type=='Every x minutes'"
                  >Every {{props.item.repeatinterval}} minutes.</p>
                  <p v-if="props.item.type=='Send by %'">Min res: {{props.item.minres}}</p>
                  <p v-if="props.item.type=='Send by %'">Round: {{props.item.round}}</p>
                  <p v-if="props.item.type=='Send by %'">
                    <v-checkbox
                      primary
                      label="Only full"
                      hide-details
                      v-model="props.item.full"
                      disabled
                    ></v-checkbox>
                  </p>
                </div>
              </td>
              <td class="tdClass" style="width:25%">
                <div>{{"X:"+props.item.x}}</div>
                <div>{{"Y:"+props.item.y}}</div>
              </td>
              <td class="tdClass" style="width:30%" v-if="props.item.type!='Send by %'">
                <div>{{"Wood:"+props.item.resources["1"]}}</div>
                <div>{{"Clay:"+props.item.resources["2"]}}</div>
                <div>{{"Iron:"+props.item.resources["3"]}}</div>
                <div>{{"Grain:"+props.item.resources["4"]}}</div>
              </td>
              <td class="tdClass" style="width:30%" v-if="props.item.type=='Send by %'">
                <table>
                  <tr>
                    <td style="height:auto"></td>
                    <td style="height:auto; padding-left: 5px; padding-right:5px;">Fill</td>
                    <td style="height:auto">Empty</td>
                  </tr>
                  <tr>
                    <td style="height:auto">Wood:</td>
                    <td
                      style="height:auto; padding-left: 5px; padding-right:5px;"
                    >{{props.item.fill["1"]}}%</td>
                    <td style="height:auto">{{props.item.empty["1"]}}%</td>
                  </tr>
                  <tr>
                    <td style="height:auto">Clay:</td>
                    <td
                      style="height:auto; padding-left: 5px; padding-right:5px;"
                    >{{props.item.fill["2"]}}%</td>
                    <td style="height:auto">{{props.item.empty["2"]}}%</td>
                  </tr>
                  <tr>
                    <td style="height:auto">Iron:</td>
                    <td
                      style="height:auto; padding-left: 5px; padding-right:5px;"
                    >{{props.item.fill["3"]}}%</td>
                    <td style="height:auto">{{props.item.empty["3"]}}%</td>
                  </tr>
                  <tr>
                    <td style="height:auto">Grain:</td>
                    <td
                      style="height:auto; padding-left: 5px; padding-right:5px;"
                    >{{props.item.fill["4"]}}%</td>
                    <td style="height:auto">{{props.item.empty["4"]}}%</td>
                  </tr>
                </table>
              </td>
              <td class="tdClass" style="width:10%">
                <v-btn flat icon color="black" @click="removeTrade(props.index)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
          <v-data-table
            :items="$store.state.selectedVillage.tasks.train"
            hide-actions
            class="elevation-1"
            hide-headers
            style="text-align: center;"
            v-show="$store.state.selectedVillage.tasks.train.length!==0"
          >
            <template slot="items" slot-scope="props">
              <td class="tdClass" style="width:15%">
                <v-btn
                  color="blue-grey darken-4"
                  small
                  dark
                  fab
                  @click="$store.state.options.style.trade.show=!$store.state.options.style.trade.show; $store.state.options.style.trade.z=$store.getters.getHighestZ()"
                >
                  <v-icon dark>group_add</v-icon>
                </v-btn>
              </td>
              <td class="tdClass" style="width:30%">
                <div class="firefoxIcon" v-bind:style="troopIcon(props.item.type)"></div>
              </td>
              <td class="tdClass" style="width:15%">{{ props.item.amount }}</td>
              <td class="tdClass" style="width:15%">{{ props.item.timeMinutes }}</td>
              <td class="tdClass" style="width:15%">
                <v-btn flat icon color="black" @click="removeTrain(props.index)">
                  <v-icon>delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
          <v-expansion-panel v-show="$store.state.selectedVillage.tasks.farms.length!==0" >
            <v-expansion-panel-content
              v-bind:key="index"
              v-for="(farmTask, index) in $store.state.selectedVillage.tasks.farms"
              class="expansiontasks"
                
            >
      <template v-slot:header>
          <v-layout row>
                         <v-flex xs2>
                      <v-btn color="blue-grey darken-4"
                      style="margin-left: -15px;margin-top: 15px;"
                  large
                  
                  fab
                  @click="$store.state.options.style.farm.show=!$store.state.options.style.farm.show; $store.state.options.style.farm.z=$store.getters.getHighestZ()"
               >
                        <v-icon >my_location</v-icon>
                      </v-btn>
                      </v-flex>
              <v-flex xs2 v-if="farmTask.amount['1']!==0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(1)"></div>
                      {{farmTask.amount['1']}} 
                      </v-flex>
                         <v-flex xs2 v-if="farmTask.amount['2']!==0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(2)"></div>
                      {{farmTask.amount['2']}} 
                      </v-flex>
                         <v-flex xs2 v-if="farmTask.amount['3']!==0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(3)"></div>
                      {{farmTask.amount['3']}} 
                      </v-flex>
                         <v-flex xs2 v-if="farmTask.amount['4']!==0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(4)"></div>
                      {{farmTask.amount['4']}} 
                      </v-flex>
                         <v-flex xs2 v-if="farmTask.amount['5']!==0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(5)"></div>
                      {{farmTask.amount['5']}} 
                      </v-flex>
                         <v-flex xs2 v-if="farmTask.amount['6']!==0">
                  <div class="firefoxIcon" v-bind:style="troopIcon(6)"></div>
                      {{farmTask.amount['6']}} 
                      </v-flex>
                         <v-flex xs2 style="position: absolute;right: 10px;    top: 10px;" >
                      <v-btn @click="removeFarmList(index)" icon>
                        <v-icon>delete</v-icon>
                      </v-btn>
                      </v-flex>
                      </v-layout>
      </template>
          <v-layout row :key="indexfarm" v-for="(farm,indexfarm) in farmTask.villages">
              <v-flex xs8 >{{farm.name+"("+ farm.x+","+farm.y +")"}}</v-flex>
               <v-flex xs2 style="margin-top: -13px;">
                      <v-btn @click="removeFarmListFarm(index,indexfarm)" icon>
                        <v-icon>delete</v-icon>
                      </v-btn>
                      </v-flex>
          </v-layout>
      
              <!--<table slot="header">
                <thead>
                  <tr>
                    <th class="tdClass" style="width:15%">
                      <v-btn
                        color="blue-grey darken-4"
                        small
                        dark
                        fab
                        @click="$store.state.options.style.farm.show=!$store.state.options.style.farm.show; $store.state.options.style.farm.z=$store.getters.getHighestZ()"
                      >
                        <v-icon dark>my_location</v-icon>
                      </v-btn>
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['1']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(1)"></div>
                      {{farmTask.amount['1']}}
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['2']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(2)">2</div>
                      {{farmTask.amount['2']}}
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['3']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(3)">3</div>
                      {{farmTask.amount['3']}}
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['4']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(4)"></div>
                      {{farmTask.amount['4']}}
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['5']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(5)"></div>
                      {{farmTask.amount['5']}}
                    </th>
                    <th style="width: 50px;" v-if="farmTask.amount['6']!==0">
                      <div class="firefoxIcon" v-bind:style="troopIcon(6)"></div>
                      {{farmTask.amount['6']}}
                    </th>
                    <th>{{farmTask.villages.length}}</th>
                    <th>
                      <v-btn @click="removeFarmList(index)" icon>
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td></td>
                    <td>{{farm.name+"("+ farm.x+","+farm.y +")"}}</td>
                  </tr>
                </tbody>
              </table>
              <div>
                <ul>
                  <li></li>
                </ul>
              </div>-->
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-layout>
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
export default {
  name: "tasks",
  data() {
    return {};
  },
  methods: {
    resize(left, top, width, height) {
      this.$store.state.options.coverdiv = true;
    },
    resizestop(left, top, width, height) {
      if (width !== undefined)
        this.$store.state.options.style.tasks.width = width;
      if (height !== undefined)
        this.$store.state.options.style.tasks.height = height;
      this.$store.state.options.style.tasks.left = left;
      this.$store.state.options.style.tasks.top = top;
      this.$store.state.options.coverdiv = false;
    },
    addTrain() {
      this.someVariableUnderYourControl++;
      this.$store.state.selectedVillage.tasks.train.push(
        JSON.parse(JSON.stringify(this.TrainTask))
      );
    },
    removeTrain(index) {
      this.$store.state.selectedVillage.tasks.train.splice(index, 1);
    },
    troopIcon(id) {
      return this.$store.getters.troopIcon(id);
    },
    setBuildingNameFromId: function(id, buildingType) {
      if (Array.isArray(id)) {
        if (id.length > 0) {
          var o = "";
          id.forEach(
            function(e) {
              o += this.$store.state.Player.lang.buildings[e * 1];
            }.bind(this)
          );
          return o;
        }
      } else return this.$store.state.lang["buldings"][buildingType];; //this.$parent.Player.lang.buildings[this.$parent.selectedVillage.buildings[id].buildingType];
    },
    arrayHasItem: function(array, item) {
      if (array.constructor === Array) {
        if (array.includes(item)) return true;
      }
      return false;
    },
    removeBuild(index) {
      this.$store.state.selectedVillage.tasks.build.splice(index, 1);
    },
    removeTrade(index) {
      this.$store.state.selectedVillage.tasks.trade.splice(index, 1);
    },
    troopIcon(id) {
      return this.$store.getters.troopIcon(id);
    },
    removeFarmList(index) {
      this.$store.state.selectedVillage.tasks.farms.splice(index, 1);
    },
    removeFarmListFarm(index,indexfarm) {
      this.$store.state.selectedVillage.tasks.farms[index].villages.splice(indexfarm, 1);
    }
  }
};
</script>