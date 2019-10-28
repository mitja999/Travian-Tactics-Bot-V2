const simulatorHelper = require('./simulatorHelper.js');
var seedExhaustive = require('seedrandom');
const rng = seedExhaustive('hello.');


function ExhaustiveStart(villageOrginal, options) {
    if (options.threads > 1) {
        self.simulatorHelper = {};
        self.importScripts('http://localhost:8080/src/engine/buildAlgorythm/simulatorHelper.js')
        self.simulatorHelper.villageToSimulatorVillage = villageToSimulatorVillage;
        self.simulatorHelper.criteriumFunction = criteriumFunction;
        self.simulatorHelper.evaluateBuildingList = evaluateBuildingList;
        self.simulatorHelper.getPossibleBuildings = getPossibleBuildings;
        self.simulatorHelper.buildingData = buildingData;
    }
    

    let best = {
        total: 99999999999999999,
        time: 0,
        pop: 0,
        cp: 0,
        negative: 0,
        production: 0,
        village: {},
        tasks: []
    };
    Array.from(Array(options.loops / options.threads)).forEach(function () {
        let village = JSON.parse(JSON.stringify(villageOrginal));
        let rez = [];
        let allPosibleTaskLists=[];
        let tasks=simulatorHelper.getPossibleBuildings(village);
        tasks.forEach(function(task,index){
            let v=simulatorHelper.copy(village);
            v.buildings[task.locationId].lvl++;
            if (v.buildings[task.locationId].buildingType === 0) {
                v.buildings[task.locationId].buildingType = task.buildingType;
            }
            allPosibleTaskLists[index] = {tasks:[],village:v};
            allPosibleTaskLists[index].tasks.push(task);
        });
        Array.from(Array(options.criterium.taskNumber)).forEach(function () {
            let loopLength=allPosibleTaskLists.length;
            for(let i=0;i<loopLength;i++){
                let tasks=simulatorHelper.getPossibleBuildings(allPosibleTaskLists[i].village);
                tasks.forEach(function(task,index){
                    if(index!==0){
                        let v=simulatorHelper.copy(allPosibleTaskLists[i].village);
                        v.buildings[task.locationId].lvl++;
                        if (v.buildings[task.locationId].buildingType === 0) {
                            v.buildings[task.locationId].buildingType = task.buildingType;
                        }
                        allPosibleTaskLists.push({tasks:(allPosibleTaskLists[i].tasks.concat(task)),village:v});
                    }
                });
                allPosibleTaskLists[i].tasks.push(tasks[0]);
                allPosibleTaskLists[i].village.buildings[tasks[0].locationId].lvl++;
                if (allPosibleTaskLists[i].village.buildings[tasks[0].locationId].buildingType === 0) {
                    allPosibleTaskLists[i].village.buildings[tasks[0].locationId].buildingType = tasks[0].buildingType;
                }
            }
        });
        allPosibleTaskLists.forEach(function(task, index){
            let rezExhaustive = simulatorHelper.evaluateBuildingList(simulatorHelper.copy(village), task.tasks);
            rezExhaustive.total = simulatorHelper.criteriumFunction(rezExhaustive, options.criterium);
            //console.log("Rez Exhaustive: ",index,rezExhaustive );
            if (rezExhaustive.total < best.total) {
                best = rezExhaustive;
                best.village = task.village;
                best.tasks = task.tasks;
                //console.log("best Exhaustive: ",best);
            }
        });
    });
    return best;
}

async function simulate(village, workerMain, options) {
    //console.log("start",arguments);

    if (options.threads > 1) {
        let actions = [];
        let parameters = [];
        for (let i = 0; i < options.threads; i++) {
            actions.push({
                message: 'thread' + i,
                func: ExhaustiveStart
            });
            parameters.push([village, options]);
        }
        let worker = workerMain.create(actions)

        return await new Promise((resolve) => {
            worker.postAll(parameters)
                .then(function (rez) {
                    let best = rez[0];
                    rez.forEach(function (rr) {
                        if (best.total < rr.total) {
                            best = rr;
                        }
                        resolve(best);
                    });
                })
                .catch(console.error)
        });

    } else {
        return ExhaustiveStart(village, options);
    }

}

exports.simulate = simulate;
exports.ExhaustiveStart = ExhaustiveStart;