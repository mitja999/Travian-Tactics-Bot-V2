const simulatorHelper = require('./simulatorHelper.js');

function FuzzyStart(villageOrginal, options) {

    if (options.threads > 1) {
        self.simulatorHelper = {};
        self.importScripts(this.location.origin + '/src/engine/buildAlgorythm/simulatorHelper.js')
        self.simulatorHelper.villageToSimulatorVillage = villageToSimulatorVillage;
        self.simulatorHelper.criteriumFunction = criteriumFunction;
        self.simulatorHelper.evaluateBuildingList = evaluateBuildingList;
        self.simulatorHelper.getPossibleBuildings = getPossibleBuildings;
        self.simulatorHelper.buildingData = buildingData;
    }

    let best = {
        total: 0,
        time: 0,
        pop: 0,
        cp: 0,
        negative: 0,
        production: 0,
        village: {},
        tasks: []
    };
    Array.from(Array(options.loops / options.threads)).forEach(function () {
        let village = simulatorHelper.copy(villageOrginal);
        let rez = [];
        let o = 0;
        
        Array.from(Array(options.criterium.taskNumber)).forEach(function (task, index) {
            let tasks = simulatorHelper.getPossibleBuildings(village);
            let bestTask = {
                total: 99999999999999,
                village: {},
                task: {}
            };
            let mainBuildingLevel = 1;
            let storageLevel = 1;
            let granaryLevel = 1;
            village.buildings.forEach(function (building, index) {
                if (building.buildingType * 1 === 15) {
                    mainBuildingLevel = building.lvl;
                }                
                if (building.buildingType * 1 === 10) {
                    storageLevel = building.lvl;
                }               
                if (building.buildingType * 1 === 11) {
                    granaryLevel = building.lvl;
                }
            });
            let resourcesW = village.storage[1] / village.storageCapacity[1];
            let resourcesC = village.storage[2] / village.storageCapacity[2];
            let resourcesI = village.storage[3] / village.storageCapacity[3];
            let resourcesG = village.storage[4] / village.storageCapacity[4];
            
            //fuzifikacija
            let productionRule = (village.production[1] + village.production[2] + village.production[3] + village.production[4]) / 45000;
            let storageRule = Math.max(resourcesW, resourcesC, resourcesI, resourcesG);
            let mainBuildingRule = 1 - mainBuildingLevel / 20;
            let taskNumberRule = (index+1)  / (options.criterium.taskNumber+1);

            let buildResourceField = 0;
            let buildStorage = 0;
            let buildMainBuilding = 0;
            let buildBestBuilding = 0;
            
            //rules
            if (storageRule < 0.1) {
                buildResourceField += 0.4 - productionRule;
            }
            else if (storageRule > 0.95 && storageLevel<19 && granaryLevel<19) {
                buildStorage += storageRule;
            }
            else{
                buildBestBuilding += storageRule-0.3;
            }

            if (productionRule < 0.0036) {
                buildResourceField += 0.7 - productionRule;
            }
            if (mainBuildingRule-0.3 > taskNumberRule) {
                buildMainBuilding += mainBuildingRule;
            }
            if (taskNumberRule < 0.5) {
                buildResourceField += 4.8-productionRule;
            }           
            if (taskNumberRule < 0.5) {
                buildResourceField += 4.8-productionRule;
            }            
            if (taskNumberRule < 0.5) {
                buildResourceField += 4.8-productionRule;
            }
            else if (taskNumberRule < 0.55) {
                //buildResourceField += 1-productionRule;
                buildMainBuilding += 5+mainBuildingRule;
            }
            else {
                buildBestBuilding +=5+ taskNumberRule;
            }
            
            //defuzifikacija
            if (buildBestBuilding > buildMainBuilding && buildBestBuilding > buildResourceField && buildBestBuilding > buildStorage) {
                //build best building
                for(let i=0;i<tasks.length;i++){
                    let taskEvaluated = simulatorHelper.evaluateBuildingList(simulatorHelper.copy(village), [tasks[i]]);
                    tasks[i].total = simulatorHelper.criteriumFunction(taskEvaluated, options.criterium);
    
                    if (bestTask.total > tasks[i].total ) {
                        bestTask.task = simulatorHelper.copy(tasks[i]);
                        bestTask.total=bestTask.task.total;
                    }
                }
            } else if (buildMainBuilding > buildResourceField && buildMainBuilding > buildStorage) {
                //build buildMainBuilding
                    bestTask.task= getLowestBuilding(tasks, [15]);

            } else if (buildResourceField > buildStorage) {
                //buildResourceField
                if (resourcesW <= resourcesG && resourcesW <= resourcesC && resourcesW <= resourcesI) {
                    bestTask.task= getLowestBuilding(tasks, [1]);
                }
                else if (resourcesC <= resourcesI && resourcesC <= resourcesG) {
                    bestTask.task= getLowestBuilding(tasks, [2]);
                }
                else if (resourcesI <= resourcesG ) {
                    bestTask.task= getLowestBuilding(tasks, [3]);
                }
                else{
                    bestTask.task= getLowestBuilding(tasks, [4]);
                }
            } else{
                //buildStorage
                if (resourcesW > resourcesG || resourcesC > resourcesG || resourcesI > resourcesG) {
                    //build storage
                    bestTask.task= getLowestBuilding(tasks, [10]);
                } else {
                    //build granary
                    bestTask.task= getLowestBuilding(tasks, [11]);
                }
            }
            //if(rez.length>80){}
            if(bestTask.task.locationId===0){
                
            }
            let taskEvaluated = simulatorHelper.evaluateBuildingList(village, [bestTask.task]);
            bestTask.task.total = simulatorHelper.criteriumFunction(taskEvaluated, options.criterium);
            bestTask.task.buildBestBuilding=buildBestBuilding;
            bestTask.task.buildMainBuilding=buildMainBuilding;
            bestTask.task.buildResourceField=buildResourceField;
            bestTask.task.buildStorage=buildStorage;
            rez.push(bestTask.task);

        });
        
        let rezFuzzy = simulatorHelper.evaluateBuildingList(JSON.parse(JSON.stringify(villageOrginal)), rez);
        rezFuzzy.total = simulatorHelper.criteriumFunction(rezFuzzy, options.criterium);

        if (rezFuzzy.total > best.total) {
            best = rezFuzzy;
            best.village = village;
            best.tasks = rez;
            //console.log("best random: ",best);
        }
    });
    
    return best;
}

function getLowestBuilding(tasks, buildingTypes) {
    let t = {
        "buildingType": 0,
        "locationId": 0,
        "lvl": 100,
        "total": 0,
        "name": ""
    };
    tasks.forEach(task => {
        if (buildingTypes !== undefined) {
            if (!buildingTypes.includes(task.buildingType)) {
                return;
            }
        }
        if (task.lvl < t.lvl) {
            t = simulatorHelper.copy(task);
        }
    });
    return t;
}
async function simulate(village, workerMain, options) {
    //console.log("start",arguments);

    if (options.threads > 1) {
        let actions = [];
        let parameters = [];
        for (let i = 0; i < options.threads; i++) {
            actions.push({
                message: 'thread' + i,
                func: FuzzyStart
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
        return FuzzyStart(village, options);
    }

}

exports.simulate = simulate;
exports.FuzzyStart = FuzzyStart;