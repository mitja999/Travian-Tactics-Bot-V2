const simulatorHelper = require('./simulatorHelper.js');

function greedyStart(villageOrginal, options) {

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
        Array.from(Array(options.criterium.taskNumber)).forEach(function () {
            let tasks = simulatorHelper.getPossibleBuildings(village);
            let bestTask = {
                total: 99999999999999,
                village: {},
                task: {}
            };
            for (let i = 0; i < tasks.length; i++) {
                let tempV = simulatorHelper.copy(village);
                let taskEvaluated = simulatorHelper.evaluateBuildingList(tempV, [tasks[i]]);
                tasks[i].total = simulatorHelper.criteriumFunction(taskEvaluated, options.criterium);
                tasks[i].cp = taskEvaluated.cp;
                tasks[i].pop = taskEvaluated.pop;
                tasks[i].production = taskEvaluated.production;
                tasks[i].resorces = taskEvaluated.resorces;
                tasks[i].time = taskEvaluated.time;
                tasks[i].name = simulatorHelper.buildingData[tasks[i].buildingType].name[0]

                if (bestTask.total > tasks[i].total) {
                    bestTask.village = tempV;
                    bestTask.task = simulatorHelper.copy(tasks[i]);
                    bestTask.total = tasks[i].total;
                }
            }




            tasks.sort(function (a, b) {
                if (a.cp < b.cp)
                    return 1;
                if (a.cp > b.cp)
                    return -1;
                return 0;
            });
            let sortNumber = 1;
            tasks[0].cp += "(" + (sortNumber) + ")";
            for (let i = 1; i < tasks.length; i++) {
                if (tasks[i].cp+"(" + (sortNumber) + ")" !== tasks[i - 1].cp) {
                    sortNumber++;
                }

                tasks[i].cp += "(" + (sortNumber) + ")";

            }
            tasks.sort(function (a, b) {
                if (a.pop < b.pop)
                    return 1;
                if (a.pop > b.pop)
                    return -1;
                return 0;
            });
            sortNumber = 1;
            tasks[0].pop += "(" + (sortNumber) + ")";
            for (let i = 1; i < tasks.length; i++) {
                if (tasks[i].pop+"(" + (sortNumber) + ")" !== tasks[i - 1].pop) {
                    sortNumber++;
                }

                tasks[i].pop += "(" + (sortNumber) + ")";
            }
            tasks.sort(function (a, b) {
                if (a.resorces < b.resorces)
                    return -1;
                if (a.resorces > b.resorces)
                    return 1;
                return 0;
            });
            sortNumber = 1;
            tasks[0].resorces += "(" + (sortNumber) + ")";
            for (let i = 1; i < tasks.length; i++) {
                if (tasks[i].resorces+"(" + (sortNumber) + ")" !== tasks[i - 1].resorces) {
                    sortNumber++;
                }

                tasks[i].resorces += "(" + (sortNumber) + ")";

            }
            tasks.sort(function (a, b) {
                if (a.time < b.time)
                    return -1;
                if (a.time > b.time)
                    return 1;
                return 0;
            });
            sortNumber = 1;
            tasks[0].time += "(" + (sortNumber) + ")";
            for (let i = 1; i < tasks.length; i++) {
                if (tasks[i].time +"(" + (sortNumber) + ")"!== tasks[i - 1].time) {
                    sortNumber++;
                }
                tasks[i].time += "(" + (sortNumber) + ")";

            }

            tasks.sort(function (a, b) {
                if (a.total < b.total)
                    return -1;
                if (a.total > b.total)
                    return 1;
                return 0;
            });
            sortNumber = 1;
            tasks[0].total += "(" + (sortNumber) + ")";
            let distincBuildings=[];
            distincBuildings.push(tasks[0]);
            for (let i = 1; i < tasks.length; i++) {
                let d=false;
                if (tasks[i].total +"(" + (sortNumber) + ")"!== tasks[i - 1].total) {
                    sortNumber++;
                    d=true;
                }
                tasks[i].total += "(" + (sortNumber) + ")";


                if(d)
                distincBuildings.push(tasks[i]);
            }
            let headers="";
            Object.keys(distincBuildings[0]).forEach(function(key){
                headers+=key+"\t";
            })
            
            let body="";
            distincBuildings.forEach(function(task){
                Object.values(task).forEach(function(val){
                    body+=val+"\t";
                })
                body+="\r\n";
            });
            bestTask.task.wholeList = JSON.parse(JSON.stringify(tasks));

            village = simulatorHelper.copy(bestTask.village);
            rez.push(bestTask.task);

        });
        let rezGreedy = simulatorHelper.evaluateBuildingList(JSON.parse(JSON.stringify(villageOrginal)), rez);
        rezGreedy.total = simulatorHelper.criteriumFunction(rezGreedy, options.criterium);

        if (rezGreedy.total > best.total) {
            best = rezGreedy;
            best.village = village;
            best.tasks = rez;
            //console.log("best random: ",best);
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
                func: greedyStart
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
        return greedyStart(village, options);
    }

}

exports.simulate = simulate;
exports.greedyStart = greedyStart;