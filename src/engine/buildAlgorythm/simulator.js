const random = require('./random.js');
const greedy = require('./greedy.js');
const fuzzy = require('./fuzzy.js');
const exhaustive = require('./exhaustive.js');
const de = require('./de.js');
const simulatorHelper = require('./simulatorHelper.js');
//var napa = require('napajs');

exports.simulate=async function simulate(village,workerMain,options){
    const villageStart=simulatorHelper.villageToSimulatorVillage(village);   
    let t0 = performance.now();
    let best={};
    options=Object.freeze(options);
    switch(options.type){
        case "random":
            best=await random.simulate(villageStart,workerMain,options);
        break;
        case "greedy":
            best=await greedy.simulate(villageStart,workerMain,options);
        break;
        case "de":
            best=await de.simulate(villageStart,workerMain,options);
        break;
        case "exhaustive":
            best=await exhaustive.simulate(villageStart,workerMain,options);
        break;
        case "fuzzy":
            best=await fuzzy.simulate(villageStart,workerMain,options);
            
        break;
    }
    let t1 = performance.now();
     
    let villageTemp=simulatorHelper.villageToSimulatorVillage(village);   
    let totalTogether=0;
    let buildingTimeTogether=0;
    best.tasks.forEach(function(task,index){
        let taskEvaluated = simulatorHelper.evaluateBuildingList(villageTemp, [task]);
        task.total =Math.floor( simulatorHelper.criteriumFunction(taskEvaluated, options.criterium));
        totalTogether+=task.total;
        task.totalUntillNow=totalTogether;
        task.name=simulatorHelper.buildingData[task.buildingType].name[0];
        task.buildingTime=simulatorHelper.buildingData[task.buildingType].upgrade[task.lvl - 1][5];
        buildingTimeTogether+=task.buildingTime;
        task.buildingTimeTogether=buildingTimeTogether;
        task.negative=taskEvaluated.negative;
        task.number=index;
        task.sumResources=simulatorHelper.buildingData[task.buildingType].upgrade[task.lvl - 1][1]+simulatorHelper.buildingData[task.buildingType].upgrade[task.lvl - 1][2]+simulatorHelper.buildingData[task.buildingType].upgrade[task.lvl - 1][3]+simulatorHelper.buildingData[task.buildingType].upgrade[task.lvl - 1][4]
    });    
    best.executionTime=t1 - t0;
    console.log(options.type,"Call to simulate took " + (t1 - t0) + " milliseconds. result: ",best.total);
    //best.village.buildings=[];

    //console.log(JSON.stringify(best,0,1));
    best.buildings=[];
    return best;
}

