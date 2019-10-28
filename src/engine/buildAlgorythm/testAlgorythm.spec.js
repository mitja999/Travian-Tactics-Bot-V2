const simulator = require('./simulator.js');
const objects = require('../classes.js');
const fs = require('fs');
import "@babel/polyfill";
/*
describe('random', () => {
    test('random_20', async function () {
        let Village = new objects.village();
        options = {
            loops: 100,
            threads: 1,
            type: "random",
            criterium: {
                taskNumber: 20,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("random_20",best);
        writteToFileWithHeader("random_20",best.tasks);
    }),
    test('random_100', async function () {
        let Village = new objects.village();
        options = {
            loops: 100,
            threads: 1,
            type: "random",
            criterium: {
                taskNumber: 100,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("random_100",best);
        writteToFileWithHeader("random_100",best.tasks);
    }),
    test('random_400', async function () {
        let Village = new objects.village();
        options = {
            loops: 100,
            threads: 1,
            type: "random",
            criterium: {
                taskNumber: 400,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("random_400",best);
        writteToFileWithHeader("random_400",best.tasks);
    })
})
*/
describe('greedy', () => {
    test('greedy_20', async function () {
        let Village = new objects.village();
        let options = {
            loops: 1,
            threads: 1,
            type: "greedy",
            criterium: {
                taskNumber: 20,
                time: 1,
                pop: 1,
                cp: 1,
                negative: 0,
                resorces: 1
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("greedy_20",best);
        writteToFileWithHeader("greedy_20",best.tasks);
    })/*,
    test('greedy_100', async function () {
        let Village = new objects.village();
        options = {
            loops: 1,
            threads: 1,
            type: "greedy",
            criterium: {
                taskNumber: 100,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("greedy_100",best);
        writteToFileWithHeader("greedy_100",best.tasks);
    })
    test('greedy_400', async function () {
        let Village = new objects.village();
        options = {
            loops: 1,
            threads: 1,
            type: "greedy",
            criterium: {
                taskNumber: 400,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("greedy_400",best);
        writteToFileWithHeader("greedy_400",best.tasks);
    })*/
})
/*
describe('de', () => {
    test('de_20', async function () {
        let Village = new objects.village();
        options = {
            loops: 1,
            threads: 1,
            type: "de",
            criterium: {
                taskNumber: 20,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
                F:4,
                CR:4,
                SADE:true
            },
            genNumber: 300,
            popNumber: 50
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("de_sade_20",best);
        writteToFileWithHeader("de_sade_20",best.tasks);
    })
    test('de_100', async function () {
        let Village = new objects.village();
        options = {
            timeNeeded: 1,
            threads: 1,
            type: "de",
            criterium: {
                taskNumber: 100,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
                F:4,
                CR:4,
                SADE:true
            },
            genNumber: 400,
            popNumber: 100
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("de_sade_100",best);
        writteToFileWithHeader("de_sade_100",best.tasks);
    })
    test('de_400', async function () {
        let Village = new objects.village();
        options = {
            timeNeeded: 1,
            threads: 1,
            type: "de",
            criterium: {
                taskNumber: 400,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
                F:15,
                CR:15,
                SADE:true
            },
            genNumber: 400,
            popNumber: 100
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("de_sade_400",best);
        writteToFileWithHeader("de_sade_400",best.tasks);
    }),
    test('de_20', async function () {
        let Village = new objects.village();
        options = {
            loops: 1,
            threads: 1,
            type: "de",
            criterium: {
                taskNumber: 20,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
                F:1,
                CR:1,
                SADE:false
            },
            genNumber: 300,
            popNumber: 50
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("de_20",best);
        writteToFileWithHeader("de_20",best.tasks);
    })*//*
    test('de_100', async function () {
        let Village = new objects.village();
        options = {
            timeNeeded: 1,
            threads: 1,
            type: "de",
            criterium: {
                taskNumber: 100,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
                F:1,
                CR:1,
                SADE:false
            },
            genNumber: 400,
            popNumber: 100
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("de_100",best);
        writteToFileWithHeader("de_100",best.tasks);
    })
    test('de_400', async function () {
        let Village = new objects.village();
        options = {
            timeNeeded: 1,
            threads: 1,
            type: "de",
            criterium: {
                taskNumber: 400,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
                F:1,
                CR:1,
                SADE:false
            },
            genNumber: 400,
            popNumber: 100
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("de_400",best);
        writteToFileWithHeader("de_400",best.tasks);
    })
})




describe('fuzzy', () => {
    test('fuzzy_20', async function () {
        let Village = new objects.village();
        options = {
            loops: 1,
            threads: 1,
            type: "fuzzy",
            criterium: {
                taskNumber: 20,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("fuzzy_20",best);
        writteToFileWithHeader("fuzzy_20",best.tasks);
    })
    ,test('fuzzy_100', async function () {
        let Village = new objects.village();
        options = {
            loops: 1,
            threads: 1,
            type: "fuzzy",
            criterium: {
                taskNumber: 100,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("fuzzy_100",best);
        writteToFileWithHeader("fuzzy_100",best.tasks);
    })
    test('fuzzy_400', async function () {
        let Village = new objects.village();
        options = {
            loops: 1,
            threads: 1,
            type: "fuzzy",
            criterium: {
                taskNumber: 400,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
            }
        }
        let best = await simulator.simulate(Village, null, options);
        writteToFile("fuzzy_400",best);
        writteToFileWithHeader("fuzzy_400",best.tasks);
    })
})*/

function writteToFile(filename, object){
    var stream = fs.createWriteStream("results/full_"+filename+".json");
    stream.once('open', function(fd) {
    stream.write(JSON.stringify(object,0,1));
    stream.end();
    });
}

function writteToFileWithHeader(filename, object){
    var stream = fs.createWriteStream("results/"+filename+".json");
    let headers="";
    stream.once('open', function(fd) {
    Object.keys(object[0]).forEach(function(key){
        headers+=key+"\t";
    })
    stream.write(headers+"\r\n");
    let body="";
    object.forEach(function(task){
        Object.values(task).forEach(function(val){
            body+=val+"\t";
        })
        body+="\r\n";
    });
    stream.write(body);
    stream.end();
    });
}

/*
describe('exhaustive', () => {
    test('exhaustive', async function () {
        let Village = new objects.village();
        options = {
            loops: 20,
            threads: 1,
            type: "exhaustive",
            criterium: {
                taskNumber: 2,
                time: 1,
                pop: 0,
                cp: 0,
                negative: 0,
                resorces: 0,
            },
            genNumber: 10000,
            popNumber: 10
        }
        await simulator.simulate(Village, null, options);
        writteToFile("exhaustive",best);
        writteToFileWithHeader("exhaustive",best.tasks);
    })
})*/