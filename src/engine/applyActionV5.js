const exports = new Object();
exports.version = 5;

exports.initAA = async function (l, s) {
	this.log = l;
	this.store = s;
	return true;
}

exports.getPlayer = async function (rez) {
	await this.analyzePlayer();
	return true;
}

exports.build = async function (village, buildTask, building) {
	this.log.debug('T5build start');
	if (!(await checkResources(village.villageId, building.upgradeCosts))) {
		return false;
	}
	let url = "building/upgrade";
	let data = {
		'villageId': village.villageId,
		'locationId': building.locationId,
		'buildingType': building.buildingType
	};
	if (building.buildingType === 0) {
		data.buildingType = buildTask.buildingType;
	}

	let response = await request(url, data, "requestT5");
	village.BuildingQueue = {
		"1": 0,
		"2": 0,
		"4": 1
	};
	building.lvlNext = building.lvlNext + 1;
	building.upgradeCosts = multiplayResources(building.upgradeCosts, 1.25);
	building.upgradeTime = building.upgradeTime;
	village.storage = subResources(village.storage, building.upgradeCosts);

	await wait(1000);
	await this.analyzePlayer();
	return true;
}

exports.finishNow = async function (village, building, buildTask) {
	this.log.debug('finishNow start');
	let url = "premiumFeature/bookFeature"
	let data = {
		"featureName": "finishNow",
		"params": {
			"villageId": village.villageId,
			"queueType": building.queueType,
			"price": 0
		}
	}
	let response = await request(url, data, "requestT5");

	await wait(1000);
	await this.analyzePlayer();
	return true;
}

exports.analyzePlayer = async function () {
	this.log.debug('T5analyzePlayer start');
	let rez = await request("", "", "getT5Player");
	if (rez !== undefined && rez.player !== undefined) {
		for (let i = 0; i < rez.player.villages.length; i++) {
			rez.player.villages[i].buildings.unshift({ //dummy building
				"buildingType": 0,
				"locationId": 0,
				"lvl": 0,
				"lvlNext": 0,
				"lvlMax": 0,
				"upgradeCosts": {
					"1": 0,
					"2": 0,
					"3": 0,
					"4": 0
				},
				"upgradeTime": 0
			});
		}
		copyProperties(this.store.Player, rez.player, this.store);
		this.log.debug('T5analyzePlayer done', this.store.Player);
		return true;
	}

	this.log.debug('T5analyzePlayer failed', this.store.Player);
	return false;
}

exports.trade = async function (village, tradeTask, resources) {
	if (!(await checkResources(village.villageId, resources))) {
		return false;
	}
	let url = "trade/sendResources";
	//{"sourceVillageId":535871416,"resources":[0,1500,0,0,0],"destVillageId":535904183,"recurrences":1}
	if (tradeTask.villageId === undefined || tradeTask.villageId == 0) {
		tradeTask.villageId = ja(tradeTask.x * 1, tradeTask.y * 1);
	}
	let data = {
		"sourceVillageId": village.villageId,
		"resources": [0, resources["1"] * 1, resources["2"] * 1, resources["3"] * 1, resources["4"] * 1],
		"destVillageId": tradeTask.villageId,
		"recurrences": 1
	};
	let response = await request(url, data, "requestT5");
	let merchatsUsed = sumResources(resources) / village.Merchants.carry;
	village.Merchants.merchantsFree -= merchatsUsed;
	village.Merchants.maxCapacity = village.Merchants.merchantsFree * village.Merchants.carry;
	village.Merchants.inTransport += merchatsUsed;
	village.storage = subResources(village.storage, resources);

	await wait(1000);
	await this.analyzePlayer();
	return true;
}

exports.train = async function (village, trainTask, resources, building) {
	if (!(await checkResources(village.villageId, building.upgradeCosts))) {
		return false;
	}
	let units = {};
	units[trainTask.type] = trainTask.amount;
	let url = "building/recruitUnits";
	let data = {
		"villageId": village.villageId,
		"locationId": building.locationId,
		"buildingType": building.buildingType,
		"units": units
	};
	let response = await request(url, data, "requestT5");

	village.storage = subResources(village.storage, resources);

	await wait(1000);
	await this.analyzePlayer();
	return true;
}

exports.adventure = async function () {
	let url = "quest/dialogAction";
	let data = {
		questId: 991,
		dialogId: 0,
		command: "activate"
	};
	let response = await request(url, data, "requestT5");
	this.store.Player.hero.status = 2;

	return true;
}

exports.farm = async function (village, FarmTask, farm) {
	let currTime = Math.floor(new Date().getTime());
	let url = this.store.Player.url + "/api/?c=troops&a=checkTarget&t" + currTime;
	let data = JSON.stringify({
		"controller": "troops",
		"action": "checkTarget",
		"params": {
			"destVillageName": farm.name,
			"destVillageId": farm.villageId,
			"villageId": village.villageId,
			"movementType": 3,
			"redeployHero": false,
			"heroPresent": false,
			"selectedUnits": FarmTask.amount
		},
		"session": this.store.Player.SeesionId
	});
	let response = JSON.parse((await request(url, data, "POST")).document);
	if (response.error !== undefined) {
		return true;
	}
	if (response.response === undefined) {
		return true;
	}
	if (response.response.villageId * 1 != farm.villageId * 1) {
		return true;
	}

	data = {
		"destVillageId": farm.villageId,
		"villageId": village.villageId,
		"movementType": FarmTask.movementType,
		"redeployHero": false,
		"units": FarmTask.amount,
		"spyMission": "resources"
	};
	url = "troops/send";

	response = await request(url, data, "requestT5");
	village.Troops["1"] -= FarmTask.amount["1"];
	village.Troops["2"] -= FarmTask.amount["2"];
	village.Troops["3"] -= FarmTask.amount["3"];
	village.Troops["4"] -= FarmTask.amount["4"];
	village.Troops["5"] -= FarmTask.amount["5"];
	village.Troops["6"] -= FarmTask.amount["6"];
	village.Troops["7"] -= FarmTask.amount["7"];
	village.Troops["8"] -= FarmTask.amount["8"];
	FarmTask.farmPosition++;
	return true;
}

exports.search = async function (parameters) {

	let currTime = Math.floor(new Date().getTime());
	let url = parameters.url + "/api/?c=map&a=getByRegionIds&t" + currTime;
	let x = parameters.Coordinates.x;
	let y = parameters.Coordinates.y;
	x = Math.round(x / 7);
	y = Math.round(y / 7);

	let positions1 = []; //f(ja(x,y));
	for (let i = -2; i < 3; i++) {
		for (let j = -2; j < 3; j++) {
			//positions1.push.apply(positions1, f(ja(x+i,y+j)));

		}
	}
	positions1.push.apply(positions1, f(ja(x - 3, y - 1)));
	positions1.push.apply(positions1, f(ja(x, y - 1)));
	positions1.push.apply(positions1, f(ja(x + 2, y - 3)));
	positions1.push.apply(positions1, f(ja(x, y + 2)));
	positions1.push.apply(positions1, f(ja(x + 2, y - 1)));
	positions1.push.apply(positions1, f(ja(x + 3, y - 2)));
	positions1.push.apply(positions1, f(ja(x + 4, y + 1)));
	//positions1=[536592391,536592392,536592393,536625159,536625160,536625161,536657927,536657928,536657929,536592394,536625162,536657930,536690696,536690697,536690698,536559624,536559625,536559626,536559627,536592395,536625163,536657931,536690699,536723465,536723466,536723467,536526857,536526858,536526859,536559628,536592396,536625164,536657932,536690700,536723468,536756234,536756235,536756236,536592397,536625165,536657933,536690701,536723469,536625166,536657934,536690702,536526860,536559629,536592398];
	let o = 0;
	positions1.forEach(function (element) {

		if ((o % 7) == 3) {
			id2xy(element);
		}
		o++;
	});
	//return;
	let data = JSON.stringify({
		"controller": "map",
		"action": "getByRegionIds",
		"params": {
			"regionIdCollection": {
				"1": positions1,
				"2": [],
				"3": [],
				"4": [],
				"5": [],
				"6": []
			}
		},
		"session": parameters.SeesionId
	});
	let response = await request(url, data, "POST");
	this.store.custom.farmfinder.progress = 100;
	let a = JSON.parse(response.document)

	this.store.custom.FarmFinderFarms.push.apply(this.store.custom.FarmFinderFarms, FindFarms(JSON.parse(response.document), parameters.Coordinates));

	return true;
}

exports.cropFind = async function (parameters) {

	let currTime = Math.floor(new Date().getTime());
	let url = parameters.url + "/api/?c=map&a=getByRegionIds&t" + currTime;
	let x = parameters.Coordinates.x;
	let y = parameters.Coordinates.y;
	x = Math.round(x / 7);
	y = Math.round(y / 7);

	let positions1 = []; //f(ja(x,y));
	for (let i = -2; i < 3; i++) {
		for (let j = -2; j < 3; j++) {
			//positions1.push.apply(positions1, f(ja(x+i,y+j)));

		}
	}
	positions1.push.apply(positions1, f(ja(x - 3, y - 1)));
	positions1.push.apply(positions1, f(ja(x, y - 1)));
	positions1.push.apply(positions1, f(ja(x + 2, y - 3)));
	positions1.push.apply(positions1, f(ja(x, y + 2)));
	positions1.push.apply(positions1, f(ja(x + 2, y - 1)));
	positions1.push.apply(positions1, f(ja(x + 3, y - 2)));
	positions1.push.apply(positions1, f(ja(x + 4, y + 1)));
	//positions1=[536592391,536592392,536592393,536625159,536625160,536625161,536657927,536657928,536657929,536592394,536625162,536657930,536690696,536690697,536690698,536559624,536559625,536559626,536559627,536592395,536625163,536657931,536690699,536723465,536723466,536723467,536526857,536526858,536526859,536559628,536592396,536625164,536657932,536690700,536723468,536756234,536756235,536756236,536592397,536625165,536657933,536690701,536723469,536625166,536657934,536690702,536526860,536559629,536592398];
	let o = 0;
	positions1.forEach(function (element) {

		if ((o % 7) == 3) {
			id2xy(element);
		}
		o++;
	});
	//return;
	let data = JSON.stringify({
		"controller": "map",
		"action": "getByRegionIds",
		"params": {
			"regionIdCollection": {
				"1": positions1,
				"2": [],
				"3": [],
				"4": [],
				"5": [],
				"6": []
			}
		},
		"session": parameters.SeesionId
	});
	let response = await request(url, data, "POST");
	this.store.custom.farmfinder.progress = 100;
	let a = JSON.parse(response.document)

	this.store.custom.FarmFinderFarms.push.apply(this.store.custom.FarmFinderFarms, FindCrop(JSON.parse(response.document), parameters.Coordinates));

	return true;
}

exports.onRouted = async function (selectedVillage, route, type) {
	switch (type) {
		case "build":

			break;
	}
	return true;
}

exports.getGoldClubFarmlists = async function (parameters) {

	let currTime = Math.floor(new Date().getTime());
	let url = this.store.Player.url + "/api/?c=cache&a=get&t" + currTime;
	let data = JSON.stringify({
		"controller": "cache",
		"action": "get",
		"params": {
			"names": ["Collection:FarmList:"]
		},
		"session": this.store.Player.SeesionId
	});
	let response = await request(url, data, "POST");

	let rez = JSON.parse(response.document);
	this.store.Player.goldClubFarmlists = [];
	let farmLists = [];
	rez.cache[0].data.cache.forEach(function (farmList) {
		let farmlistData = {
			"listId": farmList.data.listId,
			"listName": farmList.data.listName,
			farms: [],
			"maxEntriesCount": 10,
			"requestTime": new Date().getTime()
		};

		farmList.data.entryIds.forEach(function (entry, index) {
			let farm = {
				villageId: farmList.data.villageIds[index],
				entryId: entry,
				name: "",
				"units": {
					"1": "0",
					"2": "0",
					"3": "0",
					"4": "0",
					"5": "0",
					"6": "0"
				},
				report: {
					capacity: 0,
					notificationType: "0",
					raidedResSum: 0,
					reportId: "",
					time: "0"
				}
			};
			farmlistData.farms.push(farm);
		});
		farmLists.push(farmlistData);
	}.bind(farmLists));
	this.store.Player.goldClubFarmlists = farmLists;
	return true;
}

exports.farmGoldClub = async function (village, farmlist) {

	let currTime = Math.floor(new Date().getTime());
	let url = this.store.Player.url + "/api/?c=cache&a=get&t" + currTime;
	let data = JSON.stringify({
		"controller": "cache",
		"action": "get",
		"params": {
			"names": ["Collection:FarmListEntry:" + farmlist.selectedFarmlist.listId]
		},
		"session": this.store.Player.SeesionId
	});
	let response = await request(url, data, "POST");
	let farms = JSON.parse(response.document).cache[0].data.cache;
	farmlist.farmPosition = (farms.length < farmlist.farmPosition) ? 0 : farmlist.farmPosition;
	let sendFarmsGC = {
		"controller": "troops",
		"action": "startPartialFarmListRaid",
		"params": {
			"listId": farmlist.selectedFarmlist.listId,
			"entryIds": [],
			"villageId": village.villageId
		},
		"session": this.store.Player.SeesionId
	};
	for (let i = 0; i < farms.length; i++) {
		if (isLowerFarms(farms[i].data.units, village.Troops)) {
			village.Troops["1"] -= farms[i].data.units["1"];
			village.Troops["2"] -= farms[i].data.units["2"];
			village.Troops["3"] -= farms[i].data.units["3"];
			village.Troops["4"] -= farms[i].data.units["4"];
			village.Troops["5"] -= farms[i].data.units["5"];
			village.Troops["6"] -= farms[i].data.units["6"];
			sendFarmsGC.params.entryIds.push(farms[i].data.entryId * 1);
		}
	}
	currTime = Math.floor(new Date().getTime());
	//data={"destVillageId":farm.villageId,"villageId":village.villageId,"movementType":FarmTask.movementType,"redeployHero":false,"units":FarmTask.amount,"spyMission":FarmTask.movementType==6};
	url = "troops/startFarmListRaid";
	data = {
		"entryIds": sendFarmsGC.params.entryIds,
		"listIds": farmlist.selectedFarmlist.listId * 1,
		"villageId": village.villageId
	};
	//url= player.url+ "/api/?c=troops&a=startPartialFarmListRaid&t"+currTime;
	response = await request(url, data, "requestT5");
	return true;
}

exports.coppyFarmlist = async function (village, farmlist, name, copyStatus) {
	//farmlist={"goldClubFarmlist":false,"movementType":"4","amount":{"1":"2","2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"time":1515181470106,"villages":[{"villageId":"537182212","name":"Dino3","population":"147","type":"0","hasActiveTreasury":false,"x":4,"y":9,"lastReport":{},"player":{"name":"Angels","tribeId":"3","kingdomRole":"0","kingStatus":false,"kingdomId":"52","kingId":347,"spawnedOnMap":"1512479336","active":"1","id":"154","ally":{"id":"52","name":"EMC"}},"distance":9.848857801796104},{"villageId":"537018359","name":"/2/Etzelburg","population":"316","type":"0","hasActiveTreasury":false,"x":-9,"y":4,"lastReport":{},"player":{"name":"DietrichvonBern","tribeId":"3","kingdomRole":"0","kingStatus":false,"kingdomId":"5","kingId":124,"spawnedOnMap":"1512481831","active":"1","id":"318","ally":{"id":"5","name":"Clouds"}},"distance":9.848857801796104}],"farmPosition":0,"timeMinutes":10,"selectedFarmlist":{"listId":"0","listName":"","lastSent":"0","lastChanged":0,"units":{"1":"0","2":"0","3":"0","4":"0","5":"0","6":"0"},"orderNr":"0","villageIds":[],"entryIds":[],"isDefault":true,"maxEntriesCount":10}}
	let totalRequests = 2 + farmlist.villages.length;
	let requestNumber = 0;
	let currTime = Math.floor(new Date().getTime());
	let url = this.store.Player.url + "/api/?c=farmList&a=createList&t" + currTime;
	let data = JSON.stringify({
		"controller": "farmList",
		"action": "createList",
		"params": {
			"name": name
		},
		"session": this.store.Player.SeesionId
	});
	let response = await request(url, data, "POST");
	//{"cache":[{"name":"Collection:FarmList:","data":{"cache":[{"name":"FarmList:4428","data":{"listId":4428,"listName":"test","lastSent":0,"lastChanged":0,"units":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0},"orderNr":5,"villageIds":[],"entryIds":[],"isDefault":false,"maxEntriesCount":100}}],"operation":2}}],"ignoreSerial":1,"time":1515180303413,"serialNo":139808,"response":[]}
	requestNumber++;
	copyStatus.value = Math.round(requestNumber / totalRequests * 100);
	let createdFarmList = JSON.parse(response.document);
	let entryIds = [];
	for (let i = 0; i < farmlist.villages.length; i++) {

		currTime = Math.floor(new Date().getTime());
		url = this.store.Player.url + "/api/?c=farmList&a=addEntry&t" + currTime;
		data = JSON.stringify({
			"controller": "farmList",
			"action": "addEntry",
			"params": {
				"villageId": farmlist.villages[i].villageId,
				"listId": createdFarmList.cache[0].data.cache[0].data.listId
			},
			"session": this.store.Player.SeesionId
		});
		let response = await request(url, data, "POST");
		let createdFarm = JSON.parse(response.document);
		if (createdFarm.response.errors === undefined) {
			entryIds.push(createdFarm.cache[0].data.cache[0].data.entryId);
			copyStatus.value = Math.round(requestNumber / totalRequests * 100);
		}
		requestNumber++;

	}

	//https://com7.kingdoms.com/api/?c=farmList&a=editTroops&t1515182416998
	/*currTime=Math.floor(new Date().getTime());
	url= player.url+ "/api/?c=farmList&a=editTroops&t"+currTime;
	data=JSON.stringify({"controller":"farmList","action":"editTroops","params":{"entryIds":entryIds,"units":{"1":farmlist.amount["1"]*1,"2":farmlist.amount["2"]*1,"3":farmlist.amount["3"]*1,"4":farmlist.amount["4"]*1,"5":farmlist.amount["5"]*1,"6":farmlist.amount["6"]*1}},"session":player.SeesionId});
	response=await request(url,data,"POST");
	requestNumber++;
	copyStatus.value=Math.round(requestNumber/totalRequests*100);*/


	url = "farmList/editTroops";
	data = {
		"entryIds": entryIds,
		"units": {
			"1": farmlist.amount["1"],
			"2": farmlist.amount["2"],
			"3": farmlist.amount["3"],
			"4": farmlist.amount["4"],
			"5": farmlist.amount["5"],
			"6": farmlist.amount["6"]
		}
	};
	response = await request(url, data, "requestT5");
	return true;
}

function FindFarms(response, Coordinates) {
	let alliances = [];
	let farms = [];
	let players = [];
	if (response.response[1].kingdom !== undefined) {
		Object.entries(response.response[1].kingdom).forEach(function (entry) {
			alliances.push({
				"id": entry[0],
				"name": entry[1].tag
			});
		});
	}

	Object.entries(response.response[1].player).forEach(function (entry) {
		let p = entry[1];
		p.id = entry[0];
		p.ally = {};
		alliances.forEach(function (ally) {
			if (ally.id * 1 == p.kingdomId * 1) {
				p.ally = ally;
			}
		});
		players.push(p);
	});

	Object.entries(response.response[1].region).forEach(function (entry) {
		let region = entry[1];
		region.forEach(function (element) {
			if (element.hasOwnProperty('village')) {
				let v = element.village;
				v.x = id2xy(element.village.villageId).x;
				v.y = id2xy(element.village.villageId).y;
				v.lastReport = {};
				v.player = {};
				v.distance = Math.sqrt((v.x - Coordinates.x) * (v.x - Coordinates.x) + (v.y - Coordinates.y) * (v.y - Coordinates.y));
				players.forEach(function (p) {
					if (p.id * 1 == element.playerId * 1) {
						v.player = p;
					}
				});
				farms.push(v);
			}
		});
	});

	Object.entries(response.response[1].reports).forEach(function (entry) {
		let id = entry[0];
		let report = entry[1];
		farms.forEach(function (farm) {
			if (farm.villageId * 1 == id * 1) {
				farm.lastReport = report;
			}
		});
	});

	return farms;
}

function FindCrop(response, Coordinates) {

	let fields = [];

	Object.entries(response.response[1].region).forEach(function (entry) {
		let region = entry[1];
		region.forEach(function (element) {
			if (element.resType !== '11115' && element.resType !== '3339') {
				return;
			}
			let v = {
				"villageId": element.id,
				"name": "",
				"population": "999",
				"type": "1",
				"hasActiveTreasury": false
			};
			if (element.hasOwnProperty('village')) {
				v = element.village;
			}
			v.lastReport = {};
			v.x = id2xy(element.id).x;
			v.y = id2xy(element.id).y;
			v.distance = Math.sqrt((v.x - Coordinates.x) * (v.x - Coordinates.x) + (v.y - Coordinates.y) * (v.y - Coordinates.y));
			v.player = {};
			v.player.name = element.resType;
			v.player.ally = {};
			v.player.ally.name = v.x + '|' + v.y;
			fields.push(v);
		});
	});


	return fields;
}

function isLowerFarms(res1, res2) {
	return res1["1"] * 1 <= res2["1"] * 1 && res1["2"] * 1 <= res2["2"] * 1 && res1["3"] * 1 <= res2["3"] * 1 && res1["4"] * 1 <= res2["4"] * 1 && res1["5"] * 1 <= res2["5"] * 1 && res1["6"] * 1 <= res2["6"] * 1;
}

function subResources(res1, res2) {
	return {
		"1": res1["1"] - res2["1"],
		"2": res1["2"] - res2["2"],
		"3": res1["3"] - res2["3"],
		"4": res1["4"] - res2["4"]
	}
}

function multiplayResources(res1, m) {
	return {
		"1": res1["1"] * m,
		"2": res1["2"] * m,
		"3": res1["3"] * m,
		"4": res1["4"] * m
	}
}

function sumResources(res1) {
	return res1["1"] * 1 + res1["2"] * 1 + res1["3"] * 1 + res1["4"] * 1;
}

const copyProperties = function (main, other, store) {
	if (other != undefined) {
		for (let key in main) {
			if (key == "lang") {
				continue;
			}
			if (other[key] !== undefined) {
				// Handle Array
				if (Array.isArray(other[key])) {
					let arrayOther = other[key];
					let arrayMain = main[key];
					if (arrayMain !== undefined) {
						for (let i = 0, len = arrayOther.length; i < len; i++) {
							if (arrayMain[i] !== undefined) {
								copyProperties(arrayMain[i], arrayOther[i], store);
							} else if (key === "villages") {
								arrayMain[i] = JSON.parse(JSON.stringify(store.Village));
								copyProperties(arrayMain[i], arrayOther[i], store);
								arrayMain[i].tasks.villageId = arrayMain[i].villageId;

							} else {
								arrayMain[i] = JSON.parse(JSON.stringify(arrayOther[i]));
							}
						}
						for (let i = arrayMain.length - 1; i >= 0; i--) {
							if (arrayOther[i] === undefined) {
								arrayMain.splice(i, 1);
							}
						}
					}
				} else if (typeof main[key] === 'object') {
					copyProperties(main[key], other[key], store)
				} else {
					if (main[key] !== other[key]) {
						main[key] = other[key];
					}
					else if (main[key] === null) {
						main[key] = other[key];
					}
				}
			}
		}
	}
}.bind(this)

function ja(a, c) {
	return a + 16384 + 32768 * (c + 16384);
}

function f(a) {
	a = parseInt(a);
	let e = id2xy(a),
		b = [];
	b.push(ja(e.x - 1, e.y - 1));
	b.push(ja(e.x, e.y - 1));
	b.push(ja(e.x + 1, e.y - 1));
	b.push(a - 1);
	b.push(a);
	b.push(a + 1);
	b.push(ja(e.x - 1, e.y + 1));
	b.push(ja(e.x, e.y + 1));
	b.push(ja(e.x + 1, e.y + 1));
	b.push(ja(e.x + 1, e.y + 2));
	b.push(ja(e.x + 1, e.y + 3));
	b.push(ja(e.x + 2, e.y + 1));
	b.push(ja(e.x + 3, e.y + 1));
	return b;
}

function id2xy(a) {
	return {
		"x": (a % 32768 - 16384),
		"y": (Math.floor(a / 32768) - 16384)
	};
}

const request = function (url, data, type) {

	return new Promise((resolve, reject) => {
		if (!!window.chrome) {
			chrome.runtime.sendMessage("gegegmbnpdigalgfkegjgnfcpmolijdg", {
				'url': url,
				'data': data,
				'type': type,
				timeout: 10000,
				timemin: 500,
				timemax: 2000,
			}, function (response) {
				resolve(response);
			})
		} else {
			let _r1 = {};
			window.sendMessage("gegegmbnpdigalgfkegjgnfcpmolijdg", {
				'url': url,
				'data': data,
				'type': type,
				timeout: 10000,
				timemin: 500,
				timemax: 2000,
			}, function (response) {
				resolve(response.data);
			}, _r1);
		}
	});
}.bind(this)

function wait(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

exports.checkAnalyseBuildRouter = async function (selectedVillage) {
	return false;
}.bind(this)

exports.analyseBuildRouter = async function (selectedVillage) {
	return false;
}.bind(this);
export default exports;

const checkResources = async (villageId, resources) => {

	let rez = await request("", "", "getT5Player");
	if (rez !== undefined && rez.player !== undefined) {
		let updatedRes = rez.player.villages.find(v => v.villageId === villageId).storage;
		if (resources["1"] * 1 > updatedRes["1"] * 1) return false;
		if (resources["2"] * 1 > updatedRes["2"] * 1) return false;
		if (resources["3"] * 1 > updatedRes["3"] * 1) return false;
		if (resources["4"] * 1 > updatedRes["4"] * 1) return false;
	}

	return true;
}