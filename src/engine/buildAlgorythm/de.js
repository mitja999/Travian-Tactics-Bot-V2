const simulatorHelper = require('./simulatorHelper.js');
const randomAlgorythm = require('./random.js');
const greedyAlgorythm = require('./greedy.js');
const fuzzyAlgorythm = require('./fuzzy.js');
var seedrandom = require('seedrandom');
const rng = seedrandom('de');


function start(villageOrginal, options) {
    if (options.threads > 1) {
        self.simulatorHelper = {};
        self.importScripts('http://localhost:8080/src/engine/buildAlgorythm/simulatorHelper.js')
        self.importScripts('http://localhost:8080/src/engine/buildAlgorythm/random.js')
        self.importScripts('http://localhost:8080/src/engine/buildAlgorythm/greedy.js')
        self.simulatorHelper.villageToSimulatorVillage = villageToSimulatorVillage;
        self.simulatorHelper.criteriumFunction = criteriumFunction;
        self.simulatorHelper.evaluateBuildingList = evaluateBuildingList;
        self.simulatorHelper.getPossibleBuildings = getPossibleBuildings;
        self.simulatorHelper.buildingData = buildingData;
        self.randomAlgorythm = {};
        self.randomAlgorythm.RandomStart = RandomStart;
        self.greedyAlgorythm = {};
        self.greedyAlgorythm.greedyStart = greedyStart;
    }


    let populations = [];
    let optionsGenerate = JSON.parse(JSON.stringify(options));
    optionsGenerate.loops = 1;
    optionsGenerate.threads = 1;
    let globalBest = 9999999999999999999999999;
    Array.from(Array(options.popNumber)).forEach(function (number, index) {
        //populations.push(fuzzyAlgorythm.FuzzyStart(villageOrginal, optionsGenerate));
        populations.push(randomAlgorythm.RandomStart(villageOrginal,optionsGenerate));
        /* if((index%options.popNumber)/options.popNumber<0.2)
         {
         populations.push(fuzzyAlgorythm.FuzzyStart(villageOrginal,optionsGenerate));
         }
         else if((index%options.popNumber)/options.popNumber<0.4)
         {
         populations.push(greedyAlgorythm.greedyStart(villageOrginal,optionsGenerate));
         }
         else{
         populations.push(randomAlgorythm.RandomStart(villageOrginal,optionsGenerate));
         }*/
    });

    let tilda = -0.01; //-1/Math.sqrt(2);
    let N = rng();
    let F = options.criterium.F;
    let CR = options.criterium.CR;
    let best = 0;
    let averageArray = [];
    let bestArray = [];
    let fArray = [];
    let CRArray = [];
    Array.from(Array(options.genNumber)).forEach(function (number,indexGeneration) {

        let average = 0;
        let worst = 0;
        let worstScore = 0;
        if (options.criterium.SADE) {
            F = F * Math.pow(Math.E, tilda * rng());
            CR = CR * Math.pow(Math.E, tilda * rng());
        }
        F = F < 1 ? 1 : F;
        CR = CR < 1 ? 1 : CR;
        fArray.push(F);
        CRArray.push(CR);

        populations.forEach(function (population, index) {

            if (index !== best) {
                let tempTasks = simulatorHelper.copy(population.tasks);
                
                if(indexGeneration!=0){
                    if (index % 2 == 0) {
                        mutate(simulatorHelper.copy(villageOrginal), tempTasks, Math.floor(F), 1, options);
                    } else {
                        crossOver(simulatorHelper.copy(villageOrginal), tempTasks, populations[best].tasks, Math.floor(CR));
                    }
                }
                let evaluated = simulatorHelper.evaluateBuildingList(simulatorHelper.copy(villageOrginal), tempTasks);
                evaluated.total = simulatorHelper.criteriumFunction(evaluated, options.criterium);

                if (populations[index].total > evaluated.total) {
                    evaluated.tasks = tempTasks;
                    populations[index] = simulatorHelper.copy(evaluated);
                }

                if (populations[best].total >= evaluated.total) {
                    best = index;
                }
                if (populations[index].total > worstScore) {
                    worst = index;
                    worstScore = populations[index].total;
                }
                average += populations[index].total;
            }
        });

        if (options.criterium.SADE) {
            //populations[worst]=simulatorHelper.copy(populations[best]);
        }
        /*let ordered=[];
        let average=0;
        populations.forEach(function(population, index){
            average+=population.total;
            for(let i=0;i<ordered.length;i++){
                if(population.total<populations[ordered[i]].total){
                    ordered.splice( i, 0, index );
                    return;
                }
            }
            ordered.push(index);
        });*/
        //console.log(average/ordered.length);
        /*ordered.forEach(function(o, index){
            //console.log(populations[o].time);
            if(index>options.popNumber/1.5){
                populations[o]=simulatorHelper.copy(populations[best]);
            }
        });*/
        if (globalBest > populations[best].total) {
            console.log(populations[best].total);
            globalBest = populations[best].total;
        }
        bestArray.push(globalBest);
        averageArray.push(average / options.popNumber);
    });

    populations[best].bestArray = bestArray;
    populations[best].averageArray = averageArray;
    return populations[best];
}

function mutate(village, tasks, mutateNumber, generation, options) {
    let positions = [];
    let tasksLength = tasks.length;
    for (let n = 0; n < mutateNumber; n++) {
        positions.push(Math.floor(rng() * tasks.length * generation));

    }
    let bestInvidual=Math.floor(rng() * positions.length);
    tasks.forEach(function (task, index) {

        let possibleTasks = simulatorHelper.getPossibleBuildings(village);

        //mutate task
        if (positions.includes(index)) {
            task = simulatorHelper.copy(possibleTasks[Math.floor(rng() * possibleTasks.length)]);
            if (options.criterium.SADE) {
                let bestTempTotal = 9999999999999999;
                possibleTasks.forEach(function (tempTask) {
                    let tempTasks = simulatorHelper.copy(tasks);
                    tempTasks[index] = simulatorHelper.copy(tempTask);
                    let taskEvaluated = simulatorHelper.evaluateBuildingList(simulatorHelper.copy(village), tempTasks);
                    let tempTotal = simulatorHelper.criteriumFunction(taskEvaluated, options.criterium);
                    if (bestTempTotal > tempTotal) {
                        task = simulatorHelper.copy(tempTask);
                        bestTempTotal = tempTotal;
                    }
                });
                for (let i = 0; i < possibleTasks.length; i++) {
                    let tempTasks = simulatorHelper.copy(tasks);
                    tempTasks[index] = simulatorHelper.copy(possibleTasks[i]);
                    let taskEvaluated = simulatorHelper.evaluateBuildingList(simulatorHelper.copy(village), tempTasks);
                    let tempTotal = simulatorHelper.criteriumFunction(taskEvaluated, options.criterium);
                    if (bestTempTotal > tempTotal) {
                        task = simulatorHelper.copy(possibleTasks[i]);
                        bestTempTotal = tempTotal;
                    }
                }
            } else {
                task = simulatorHelper.copy(possibleTasks[Math.floor(rng() * possibleTasks.length)]);
            }
        } else {
            let buildingFound = false;
            possibleTasks.forEach(function (pT) {
                if (pT.buildingType === task.buildingType) {
                    if (task.lvl > pT.lvl) {
                        task = simulatorHelper.copy(pT);
                        buildingFound = true;
                    }
                }
            });
            //check if task is not possible 
            if (!buildingFound) {
                task = simulatorHelper.copy(possibleTasks[Math.floor(rng() * possibleTasks.length)]);
            }
        }
        tasks[index] = task;
        if (village.buildings[task.locationId].lvl === task.lvl) {
            debugger;
        }
        village.buildings[task.locationId].lvl = task.lvl;
        village.buildings[task.locationId].buildingType = task.buildingType;

        tasks.length = tasksLength;
    });

}


function crossOver(village, tasks, tasksBest, mutateNumber) {
    let positions = [];
    let tasksLength = tasks.length;
    for (let n = 0; n < mutateNumber; n++) {
        positions.push(Math.floor(rng() * tasks.length));

    }
    tasks.forEach(function (task, index) {

        let possibleTasks = simulatorHelper.getPossibleBuildings(village);
        let buildingFound = false;
        //crossOver task
        if (positions.includes(index)) {
            possibleTasks.forEach(function (pT) {
                if (pT.buildingType === tasksBest[index].buildingType) {
                    if (task.buildingType !== tasksBest[index].buildingType) {
                        task = assignTask(task, pT);
                        buildingFound = true;
                    } else if (task.lvl > pT.lvl) {
                        task = assignTask(task, pT);
                        buildingFound = true;
                    }
                }
            });
        }
        if (!buildingFound) {
            possibleTasks.forEach(function (pT) {
                if (pT.buildingType === task.buildingType) {
                    if (!buildingFound) {
                        task = assignTask(task, pT);
                        buildingFound = true;
                    } else if (task.lvl > pT.lvl) {
                        task = assignTask(task, pT);
                    }
                }
            });
            //check if task is not possible 
            if (!buildingFound) {
                task = simulatorHelper.copy(possibleTasks[Math.floor(rng() * possibleTasks.length)]);
            }
        }
        tasks[index] = task;

        if (village.buildings[tasks[index].locationId].lvl === tasks[index].lvl) {
            debugger;
        }
        village.buildings[tasks[index].locationId].lvl = tasks[index].lvl;
        village.buildings[tasks[index].locationId].buildingType = tasks[index].buildingType;
    });

}
/*
function crossOver(village, tasks, percent) {
    let positions=[];
    for(let n=0;n<percent*tasks.length;n++){
        positions.push( Math.floor(rng() * tasks.length));
    }

    tasks.forEach(function (task, index) {
        /*if (index < position) {
            village.buildings[task.locationId].lvl++;
            if (village.buildings[task.locationId].buildingType === 0) {
                village.buildings[task.locationId].buildingType = task.buildingType;
            } else if (village.buildings[task.locationId].buildingType !== task.buildingType) {
                console.log("buildingType missmatch");
            }
        }
        let position=-1;
        positions.forEach(function(pos){
            if(pos===index)position=pos;
        });
        if (index == position) {
            let possibleTasks = simulatorHelper.getPossibleBuildings(village);

            task = JSON.parse(JSON.stringify(possibleTasks[Math.floor(rng() * possibleTasks.length)]));
            village.buildings[task.locationId].lvl++;
            if (village.buildings[task.locationId].buildingType === 0) {
                village.buildings[task.locationId].buildingType = task.buildingType;
            } else if (village.buildings[task.locationId].buildingType !== task.buildingType) {
                console.log("buildingType missmatch")
            }
        } else {
            let possibleTasks = simulatorHelper.getPossibleBuildings(village);
            let foundTask = false;
            if(task.locationId<19){
                foundTask=true;
            }else{
                possibleTasks.forEach(function (t,index) {
                    if (t.locationId == task.locationId) {
                        foundTask = true;
                    }
                    if(task.lvl===1){
                        if(t.buildingType===task.buildingType){
                            foundTask = true;
                        }
                    }
                });
            }
            if (foundTask === false) {
                task = JSON.parse(JSON.stringify(possibleTasks[Math.floor(rng() * possibleTasks.length)]));
            }

            village.buildings[task.locationId].lvl++;
            task.lvl = village.buildings[task.locationId].lvl;
            if (village.buildings[task.locationId].buildingType === 0) {
                village.buildings[task.locationId].buildingType = task.buildingType;
            } else if (village.buildings[task.locationId].buildingType !== task.buildingType) {
                console.log("buildingType missmatch")
            }
        }
    });
}*/
function assignTask(task, tasknew) {
    task.locationId = tasknew.locationId;
    task.buildingType = tasknew.buildingType;
    task.lvl = tasknew.lvl;
    return task;
}
async function simulate(village, workerMain, options) {
    //console.log("start",arguments);

    if (options.threads > 1) {
        let actions = [];
        let parameters = [];
        for (let i = 0; i < options.threads; i++) {
            actions.push({
                message: 'thread' + i,
                func: start
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
        return start(village, options);
    }

}

exports.simulate = simulate;