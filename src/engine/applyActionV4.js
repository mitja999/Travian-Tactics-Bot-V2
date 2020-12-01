import { OperationCanceledException } from "typescript";

const exports = new Object();
exports.version = 4;
let log = new Object();
let store = new Object();
const gf = new Object();

const actions = {
    getPlayer: [
        {
            page: null, skip: false, prereq: null, selector: "", type: "getWindowHTML", postAction: 'analyzePlayer'
        },
        {
            page: null, skip: false, prereq: null, value: "Travian.Game", type: "dom", postAction: 'analyzeWorld'
        }
    ],
    buildDorf1: [
        {
            page: "dorf1", skip: true, prereq: null, selector: "#navigation > a.village.resourceView", type: "click", postAction: null
        },
        {
            page: "dorf1", skip: false, prereq: null, selector: "#resourceFieldContainer > div.buildingSlot{locationId}", type: "click", postAction: null
        },
        {
            page: "dorf1", skip: false, prereq: null, selector: "button.textButtonV1.green.build", type: "click", postAction: 'analyzeDorf1, analyzeResources, analyzeHero, analyzeBuildingTime'
        }
    ],
    buildDorf2: [
        {
            page: "dorf2", skip: true, prereq: null, selector: "#navigation > a.village.buildingView", type: "click", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "#village_map > div.buildingSlot.a{locationId} > div", type: "click", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "button.textButtonV1.green.build", type: "click", postAction: 'analyzeDorf2, analyzeResources, analyzeHero, analyzeBuildingTime'
        }
    ],
    buildDorf2NewBuilding: [
        {
            page: "dorf2", skip: true, prereq: null, selector: "#navigation > a.village.buildingView", type: "click", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "#village_map > div.buildingSlot.a{locationId}>svg>g>path", type: "onclick", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "div.scrollingContainer>div.content>a.{targetcategoryName}.normal", type: "click", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "#contract_building{buildingType} > div.contractLink > button", type: "click", postAction: 'analyzeDorf2, analyzeResources, analyzeHero, analyzeBuildingTime'
        }
    ],
    train: [
        {
            page: "dorf2", skip: true, prereq: null, selector: "#navigation > a.village.buildingView", type: "click", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "#village_map > div.buildingSlot.a{locationId} > div", type: "click", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "div.action.troop.troop{type10} input", type: "setvalue", value: "{amount}", postAction: null
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "button.textButtonV1.green.startTraining", type: "click", postAction: 'analyzeResources'
        }
    ],
    analyzeVillage: [
        {
            page: "dorf1", skip: false, prereq: null, selector: "#navigation > a.village.resourceView", type: "click", postAction: 'analyzeDorf1, analyzeResources, analyzeHero, analyzeBuildingTime'
        },
        {
            page: "dorf2", skip: false, prereq: null, selector: "#navigation > a.village.buildingView", type: "click", postAction: 'analyzeDorf2'
        }
    ],
    adventure: [
        {
            page: "hero", skip: false, prereq: null, selector: "#topBarHero > a.adventure.green", type: "click", postAction: 'analyzeHero'
        },
        {
            page: "hero", skip: false, prereq: null, selector: ".gotoAdventure", type: "click", postAction: null
        },
        {
            page: "hero", skip: false, prereq: null, selector: "div.adventureSendButton > button", type: "click", postAction: 'analyzeHero'
        }
    ],
}

const action = async function (steps, task, village) {
    steps = JSON.parse(JSON.stringify(steps));
    let i = steps.length - 1;
    let response = await store.getters.request("", {
        value: ""
    }, "getWindowHTML");
    let page = response.url.substring(response.url.lastIndexOf('/') + 1);
    page = page.substring(0, page.indexOf('.'));
    for (i; i > 0; i--) {
        if (steps[i].skip && step[i].page === page) break;
    }
    for (i; i < steps.length; i++) {
        try {
            if (village) {
                let activeVillage = response.doc.querySelector("#sidebarBoxVillagelist > div.content > ul > li.active > a");
                if (activeVillage) {
                    let villageId = activeVillage.href.split('&')[0].substring(activeVillage.href.indexOf('newdid=') + 'newdid='.length).replace('&', '');

                    if (villageId !== village.villageId) {
                        response = await store.getters.request("", {
                            selector: '#sidebarBoxVillagelist > div.content > ul > li > [href="?newdid=' + village.villageId + '&"]'
                        }, "click");
                        response = await store.getters.request("", {
                        }, "getWindowHTML");
                    }
                }
            }
            if (steps[i].selector) {
                let matches = steps[i].selector.match(/\{(.*?)\}/g);
                if (matches) {
                    for (let m of matches) {
                        steps[i].selector = steps[i].selector.replace(m, task[m.replace("{", "").replace("}", "")]);
                    }
                }
            }

            if (steps[i].value) {
                let matches = steps[i].value.match(/\{(.*?)\}/g);
                if (matches) {
                    for (let m of matches) {
                        steps[i].value = steps[i].value.replace(m, task[m.replace("{", "").replace("}", "")]);
                    }
                }
            }

            if (steps[i].type !== null) {
                response = await store.getters.request("", {
                    value: steps[i].value,
                    selector: steps[i].selector
                }, steps[i].type);
            }

            if (steps[i].type !== "getWindowHTML" || steps[i].type !== "dom") {
                response = await store.getters.request("", {
                }, "getWindowHTML");
            }

            if (!checkLogin(response)) {
                throw 'login failed';
            }

            if (steps[i].postAction !== null) {
                for (let pa of steps[i].postAction.split(',')) {
                    await eval(pa)(response, steps[i], task, village);
                }
            }
        }
        catch (exception) {
            console.log(exception);
            debugger;
        }
    }
}

exports.build = async function (village, buildTask, building) {
    if (buildTask.locationId < 19) {
        await action(actions.buildDorf1, buildTask, village);
    } else if (village.buildings[buildTask.locationId].lvl * 1 > 0) {
        await action(actions.buildDorf2, buildTask, village);
    } else {
        buildTask.targetcategory = 1;
        buildTask.targetcategoryName = 'infrastructure';
        if (buildTask.buildingType * 1 == 13 || buildTask.buildingType * 1 == 14 || buildTask.buildingType * 1 == 19 || buildTask.buildingType * 1 == 20 || buildTask.buildingType * 1 == 21 || buildTask.buildingType * 1 == 22 || buildTask.buildingType * 1 == 29 || buildTask.buildingType * 1 == 30 || buildTask.buildingType * 1 == 36 || buildTask.buildingType * 1 == 37) {
            buildTask.targetcategory = 2;
            buildTask.targetcategoryName = 'military';
        } else if (buildTask.buildingType * 1 == 5 || buildTask.buildingType * 1 == 6 || buildTask.buildingType * 1 == 7 || buildTask.buildingType * 1 == 8 || buildTask.buildingType * 1 == 9) {
            buildTask.targetcategory = 3;
            buildTask.targetcategoryName = 'resources';
        }
        await action(JSON.parse(JSON.stringify(actions.buildDorf2NewBuilding)), buildTask, village);
    }
    return true;
}

const checkLogin = (response) => {
    if (response === undefined || response === null) return true;
    if (response.doc === undefined) return true;
    if (response.doc.querySelector(".innerLoginBox tr.account") !== null) return false;
    if (response.doc.querySelector(".innerLoginBox tr.pass") !== null) return false;
    if (response.doc.querySelector(".loginButtonRow #s1") !== null) return false;
    return true;
}

exports.initAA = async function (l, s) {
    log = l;
    store = s;
    return true;
}


exports.getPlayer = async function (rez) {
    await action(actions.getPlayer);
    return true;
}
exports.logout = async function (rez) {
    return true;
}

exports.loginCustom = async function (rez) {
    return true;
}

exports.finishNow = async function (village, building, buildTask) {

}

exports.analyzePlayer = async function (rez) {
    return true;
}


exports.analyzeVillage = async function (village) {
    let timeNow = (new Date()).getTime();
    if (village.tasks.build.length > 0) {
        if (village.timeBuildCheck === undefined) village.timeBuildCheck = timeNow;
        if (village.timeBuildCheck <= timeNow) {
            village.timeBuildCheck = timeNow + 600000;
            await action(actions.analyzeVillage, null, village);
        }
    }
    return true;
}

exports.trade = async function (village, tradeTask, resources) {

}

exports.train = async function (village, trainTask, resources, building) {
    trainTask.locationId = building.locationId;
    trainTask.type10 = (trainTask.type * 1) % 10;
    await action(JSON.parse(JSON.stringify(actions.train)), trainTask, village);
    return true;
}

exports.farm = async function (village, farm, FarmTask) {

}

exports.search = async function (parameters) {

}

exports.cropFind = async function (parameters) {

}

exports.getGoldClubFarmlists = async function (parameters) {

}

exports.adventure = async function (parameters) {
    await action(actions.adventure);
    return true;
}

exports.farmGoldClub = async function (village, farmlist) {

    return true;
}

exports.coppyFarmlist = async function (village, farmlist, name, copyStatus) {

    return true;
}


exports.analyzeBuildings = async function (selectedVillageId) {
    let village = store.state.Player.villages.find(v => v.villageId === selectedVillageId);
    if (!village.buildings.some((b) => b.buildingType !== 0)) {
        await action(actions.analyzeVillage, null, village);
    }
    return true;
}

const analyzePlayer = async (response, step) => {
    let playerName = response.doc.querySelector('div.playerName').innerText;
    if (playerName === store.state.Player.name) return;

    let tribe = 0;
    for (let i = 1; i < 7; i++) {
        if (response.doc.querySelector('.tribe' + i) !== null) {
            tribe = i;
        }
    }
    if (tribe === 0) {
        tribe = response.doc.querySelector("roman") === null ? tribe : 1;
        tribe = response.doc.querySelector("teuton") === null ? tribe : 2;
        tribe = response.doc.querySelector("gaul") === null ? tribe : 3;
        tribe = response.doc.querySelector("natar") === null ? tribe : 4;
        tribe = response.doc.querySelector("natar") === null ? tribe : 5;
        tribe = response.doc.querySelector("egyptian") === null ? tribe : 6;
        tribe = response.doc.querySelector("hun") === null ? tribe : 7;
    }
    store.state.Player.name = playerName;
    store.state.Player.tribeId = tribe;

    //get all villages
    response.doc.querySelectorAll('#sidebarBoxVillagelist > div.content > ul > li > a').forEach(element => {
        let villid = find(element.href, 'newdid=', '&');
        let village = store.state.Player.getVillage(villid);
        if (!village) {
            let villagename = element.querySelector('span span').innerText;
            let coorx = element.querySelector('.coordinateX').innerText.split("(").join("");
            let coory = element.querySelector('.coordinateY').innerText.split(")").join("");
            store.state.Player.newVillage(villid, coorx, coory, villagename);
        }
    });
}

const createDocument = function (res) {
    let parser = new DOMParser();
    return parser.parseFromString(res, "text/html");
}
const find = (element, startString, endString) => {
    let start = element.indexOf(startString);
    if (start === -1) {
        return "";
    }
    start += startString.length;
    let end = element.indexOf(endString, start);
    if (end === -1) {
        end = element.length;
    }
    return element.substring(start, end);
}

const analyzeResources = (response, step, task, village) => {
    if (response.doc.querySelector('#resourceFieldContainer') === null) {
        return;
    }
    let resources = JSON.parse(response.doc.querySelector('#contentOuterContainer script').innerText.replace('var resources =', '').replace('production', '"production"').replace('storage', '"storage"').replace('maxStorage', '"maxStorage"').replace(';', ''));

    village.production["1"] = resources.production.l1;
    village.production["2"] = resources.production.l2;
    village.production["3"] = resources.production.l3;
    village.production["4"] = resources.production.l4;
    village.supplyBuildings = resources.production.l5;
    village.storage["1"] = resources.storage.l1;
    village.storage["2"] = resources.storage.l2;
    village.storage["3"] = resources.storage.l3;
    village.storage["4"] = resources.storage.l4;
    village.storageCapacity["1"] = resources.maxStorage.l1;
    village.storageCapacity["2"] = resources.maxStorage.l2;
    village.storageCapacity["3"] = resources.maxStorage.l3;
    village.storageCapacity["4"] = resources.maxStorage.l4;
    village.lastCalculation = new Date().getTime();
}

const analyzeDorf1 = (response, step, task, village) => {
    if (response.doc.querySelector('#resourceFieldContainer') === null) {
        return;
    }
    response.doc.querySelectorAll('#resourceFieldContainer > div').forEach((element, i) => {
        let classes = element.classList.value.split(' ');
        classes.splice(classes.findIndex(f => f === "level"), 1);
        let IdPolja = classes.find(f => f.indexOf('buildingSlot') !== -1).replace('buildingSlot', '') * 1;
        let buildingType = classes.find(f => f.indexOf('gid') !== -1).replace('gid', '') * 1;
        let level = classes.find(f => f.indexOf('level') !== -1).replace('level', '') * 1;
        let construction = classes.find(f => f.indexOf('underConstruction') !== -1);
        if (construction !== undefined) {
            level++;
        }
        village.buildings[IdPolja].buildingType = buildingType;
        village.buildings[IdPolja].lvl = level;
        village.buildings[IdPolja].lvlNext = level + 1;
        village.buildings[IdPolja].lvlMax = 20;
        if (village.buildings[IdPolja].lvlNext !== village.buildings[IdPolja].lvlMax) {
            let r1 = store.state.Buildings[buildingType][level + 1][0];
            let r2 = store.state.Buildings[buildingType][level + 1][1];
            let r3 = store.state.Buildings[buildingType][level + 1][2];
            let r4 = store.state.Buildings[buildingType][level + 1][3];
            village.buildings[IdPolja].upgradeCosts["1"] = r1 * 1;
            village.buildings[IdPolja].upgradeCosts["2"] = r2 * 1;
            village.buildings[IdPolja].upgradeCosts["3"] = r3 * 1;
            village.buildings[IdPolja].upgradeCosts["4"] = r4 * 1;
        }
    });
}

const analyzeBuildingTime = (response, step, task, village) => {
    let buildingTimer = response.doc.querySelector('div.buildDuration .timer');
    if (buildingTimer) {
        village.BuildingQueue["1"] = 0;
        village.BuildingQueue["2"] = 0;
        village.timeBuildCheck = (new Date()).getTime() + buildingTimer.attributes["value"].value * 1000;
    } else {
        village.BuildingQueue["1"] = 1;
        village.BuildingQueue["2"] = 1;
    }
}

const analyzeDorf2 = (response, step, task, village) => {
    if (response.doc.querySelector('#village_map') === null) {
        return;
    }
    response.doc.querySelectorAll('#village_map > div').forEach((element, i) => {
        let IdPolja = element.classList[1].replace('a', '') * 1;
        if (IdPolja < 19 || IdPolja > 40) return;

        let buildingType = element.classList[2].replace('g', '') * 1;
        let level = 0;
        if (buildingType !== 0) {
            level = element.innerText * 1;
        }
        if (element.innerHTML.indexOf('underConstruction') !== -1) {
            level++;
        }
        village.buildings[IdPolja].buildingType = buildingType;
        village.buildings[IdPolja].lvl = level;
        village.buildings[IdPolja].lvlNext = level + 1;
        village.buildings[IdPolja].lvlMax = store.state.Buildings[buildingType].length;
        if (village.buildings[IdPolja].lvlNext !== village.buildings[IdPolja].lvlMax) {
            let r1 = store.state.Buildings[buildingType][level + 1][0];
            let r2 = store.state.Buildings[buildingType][level + 1][1];
            let r3 = store.state.Buildings[buildingType][level + 1][2];
            let r4 = store.state.Buildings[buildingType][level + 1][3];
            village.buildings[IdPolja].upgradeCosts["1"] = r1 * 1;
            village.buildings[IdPolja].upgradeCosts["2"] = r2 * 1;
            village.buildings[IdPolja].upgradeCosts["3"] = r3 * 1;
            village.buildings[IdPolja].upgradeCosts["4"] = r4 * 1;
        }
    });
}

const analyzeHero = (response) => {
    if (response.doc.getElementsByClassName("heroRunning").length === 1) {
        store.state.Player.hero.status = 2;
    }

    if (response.doc.getElementsByClassName("heroHome").length === 1) {
        store.state.Player.hero.status = 0;
        if (response.doc.querySelector("#topBarHero .content") !== null)
            store.state.Player.hero.adventurePoints = response.doc.querySelector("#topBarHero .content").innerText * 1;
    }
}

const getActiveVillage = (response) => {
    let element = response.doc.querySelector('#sidebarBoxVillagelist > div.content > ul > li > a.active');
    let villid = find(element.href, 'newdid=', '&');
    let village = exports.store.state.Player.getVillage(villid);
    return village;
}
const getVillageUrl = (response, villageId) => {
    let url = "";
    response.doc.querySelectorAll('#sidebarBoxVillagelist > div.content > ul > li > a').forEach(element => {

        let villid = find(element.href, 'newdid=', '&');
        if (villid === villageId) {
            url = element.href;
        }
    });
    return url;
}

const analyzeWorld = async (response, step, task) => {
    if (store.state.Player.playerId === store.state.Player.worldId + "_" + store.state.Player.name) {
        return;
    }
    store.state.Player.speed = response.speed;
    store.state.Player.country = response.country;
    store.state.Player.worldId = response.worldId;
    store.state.Player.travianVersion = response.version;
    store.state.Player.playerId = store.state.Player.worldId + "_" + store.state.Player.name;
}

export default exports;