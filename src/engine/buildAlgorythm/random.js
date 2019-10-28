const simulatorHelper = require('./simulatorHelper.js');
var seedrandom = require('seedrandom');
const rng = seedrandom('random');


function RandomStart(villageOrginal, options) {
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
        total: 1111111111111111111110,
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
        Array.from(Array(options.criterium.taskNumber)).forEach(function () {
            let tasks = simulatorHelper.getPossibleBuildings(village);
            let task = tasks[Math.floor(rng() * tasks.length)];
            rez.push(task);
            village.buildings[task.locationId].lvl++;
            if (village.buildings[task.locationId].buildingType === 0) {
                village.buildings[task.locationId].buildingType = task.buildingType;
            } else if (village.buildings[task.locationId].buildingType !== task.buildingType) {
                console.log("buildingType missmatch")
            }
        });
        let rezRandom = simulatorHelper.evaluateBuildingList(village, rez);
        rezRandom.total = simulatorHelper.criteriumFunction(rezRandom, options.criterium);
        //console.log("Rez random: ",index,rezRandom );
        if (rezRandom.total < best.total) {
            best = rezRandom;
            best.village = village;
            best.tasks = rez;
            console.log("best random: ",best.total);
        }
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
                func: RandomStart
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
        return RandomStart(village, options);
    }

}

exports.simulate = simulate;
exports.RandomStart = RandomStart;