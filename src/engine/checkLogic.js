const exports = function () {
	let taskTimers = {
		analyze: {
			time: 0
		},
		build: {
			time: 0
		},
		trade: {
			time: 0
		},
		hero: {
			time: 0
		},
		train: {
			time: 0
		},
		farm: {
			time: 0
		}
	}


	this.lock = false;

	this.init = function (store, log, socket, main) {
		this.store = store;
		this.log = store.log;
		this.ApplyActions = undefined;
		this.main = main;
	}
	const getWindowHTMLdata = {
		"classes": [
			{
				"class": "r1",
				"values": ["backgroundImage"]
			},
			{
				"class": "r2",
				"values": ["backgroundImage"]
			},
			{
				"class": "r3",
				"values": ["backgroundImage"]
			},
			{
				"class": "r4",
				"values": ["backgroundImage"]
			}
		]
	}
	function setImages(classes, vue1) {
		for (let i = 0; i < getWindowHTMLdata.classes.length; i++) {

			if (getWindowHTMLdata.classes[i]["class"] == "r1" || getWindowHTMLdata.classes[i]["class"] == "r2" || getWindowHTMLdata.classes[i]["class"] == "r3" || getWindowHTMLdata.classes[i]["class"] == "r4") {
				if (classes[getWindowHTMLdata.classes[i]["class"]]) {
					vue1.store.images[getWindowHTMLdata.classes[i]["class"]] = classes[getWindowHTMLdata.classes[i]["class"]]["backgroundImage"].split('"')[1]
				}
			}
		}
	}
	this.loadPlayer = async function (aa, aa5) {
		this.log.debug("loadPlayer", this.ApplyActions, this.store.Player.loggedIn);
		if (this.ApplyActions === undefined || !this.store.Player.loggedIn) {
			let rez = await request("", getWindowHTMLdata, "getWindowHTML");
			//this.log.debug("getWindowHTML", rez);
			if (rez) {
				if (rez.orign) {
					this.store.Player.url = rez.orign;
				}

				if (rez.document) {
					let wrapObject = false;
					if (rez.orign.indexOf('kingdoms.com') !== -1) {

						if (this.ApplyActions === undefined) {
							wrapObject = true;
							this.ApplyActions = aa5;
							await this.ApplyActions.initAA(this.log, this.store);
							this.store.Player.version = 5;
						}
						await this.ApplyActions.getPlayer(rez);
						this.store.Player.loggedIn = true;

					} else {
						if (rez.document.indexOf('Travian.Game.version') !== -1) {


							if (this.ApplyActions === undefined) {
								wrapObject = true;
								this.ApplyActions = aa;
								this.store.Player.version = 4;
							}
							if (rez.classes) {
								setImages(rez.classes, this)
							}
							let loggedin = await this.ApplyActions.getPlayer(rez);
							if (!loggedin) {
								return
							}
							this.store.Player.loggedIn = true;
							this.store.Player.villages = this.store.Player.villages.filter(function (value, index, arr) {

								return value.villageId !== 0;

							});
						}
					}
					if (wrapObject) {
						wrapObjectFunctions(
							this.ApplyActions,
							function (fname, o, arg) {
								this.log.debug("LOG: before calling " + fname, arg);
								this.store.executing = true;
								this.store.taskStatus = fname;
								/*if (!this.store.Player.start && !(fname === "analyseBuildRouter" || fname === "checkAnalyseBuildRouter" || fname === "cropFind" || fname === "search" || fname === "initAA" || fname === "onRouted" || fname === "analyzePlayer" || fname === "getPlayer" || fname === "getGoldClubFarmlists" || fname === "coppyFarmlist")) {
									throw "bot stopped";
								}*/
							}.bind(this),
							function (fname, o, arg, r) {
								this.store.executing = false;
								this.log.debug("LOG: after calling " + fname, arg);
								let text = "";
								let logname = fname;
								let success = r;
								if (this.store.Player.version == 4) {
									if (r)
										success = r.success;
								}
								switch (fname) {
									case "getPlayer":
										text = "Analyze player"
										break;
									case "build":
										let lvl = arg[1].lvlNext;
										if (this.store.Player.version == 4) {
											lvl = r.lvl
										}
										text = "Building: " + this.store.Buildings[arg[1].buildingType][0][1] + ", LocationId: " + arg[1].locationId + ", level: " + lvl;
										if (this.store.Player.version == 4) {
											if (r && r.error) {
												logname = "Error"
												text = "Building failed (" + text + "): " + r.errorMessage;
											}
										}
										break;
									case "trade":
										text = "(" + arg[1].x + "|" + arg[1].y + "), [ Wood=" + arg[2]["1"] + " Clay=" + arg[2]["2"] + " Iron=" + arg[2]["3"] + " Grain=" + arg[2]["4"] + " ]";
										if (this.store.Player.version == 4) {
											if (r && r.error) {
												logname = "Error"
												text = "Trade failed (" + text + "): " + r.errorMessage;
											}
										}
										break;
									case "train":
										text = "Type: " + arg[1].type + ", Amount: " + arg[1].amount;
										if (this.store.Player.version == 4) {
											if (r && r.error) {
												logname = "Error"
												text = "Train failed (" + text + "): " + r.errorMessage;
											}
										}
										break;
									case "adventure":
										text = "Hero adventure"
										break;
									case "farm":
										text = "(" + arg[2].x + "|" + arg[2].y + "), " + arg[2].name + " [" + arg[1].amount["1"] + "," + arg[1].amount["2"] + "," + arg[1].amount["3"] + "," + arg[1].amount["4"] + "," + arg[1].amount["5"] + "," + arg[1].amount["6"] + " ]";
										if (r && r.fail) {
											text = "Farming failed: " + text + " (" + r.failmessage + ")"
										}
										break;
									case "finishNow":
										text = "finishNow";
										break;
									case "analyzeDorf1":
										text = "Dorf 1 analysed";
										break;
									case "analyzeDorf2":
										text = "Dorf 2 analysed";
										break;
									case "analyzeMarketplace":
										text = "Marketplace analysed";
										break;
									case "onRouted":
										return;
									case "analyzePlayer":
										return;
									case "search":
										return;
									case "getGoldClubFarmlists":
										return;
									case "coppyFarmlist":
										return;
									case "analyseBuildRouter":
										return;
									case "checkAnalyseBuildRouter":
										return;
									case "farmGoldClub":
										text = "goldclub attacks sent.";
										if (this.store.Player.version == 4) {
											if (r && r.error) {
												logname = "Error"
												text = "farmGoldClub failed: " + r.errorMessage;
											} else if (r.message) {
												text = r.message
											}
										}
										break;
									case "getGoldClubFarmlists":
										return;
								}
								let villageId = "";
								try {
									villageId = arg[0].name;
								} catch{ }

								this.store.Player.options.logs.push({
									"time": new Date().getTime(),
									"name": logname,
									"success": success,
									"text": text,
									"villageId": villageId
								});
								if (this.store.Player.options.logs.length > 500) {

									this.store.Player.options.logs.splice(400, this.store.Player.options.logs.length - 400)
								}
								if (r && r.error) {
									let throwerror = this.checkLastLogs()
									this.log.debug("throwerror", throwerror)
									if (throwerror) {
										//this.store.Player.start = false;
										//clearInterval(v.timer);
										throw r.errorMessage
									}

								}

							}.bind(this)
						);
					}
				}
			}
		}
	}



	this.onRouted = async function (selectedVillage, route, type) {
		return await this.ApplyActions.onRouted(selectedVillage, route, type);
	}

	this.checkLastLogs = function () {
		let logslength = this.store.Player.options.logs.length
		let numberOfFails = 0
		for (let i = 0; i < 50 & i < this.store.Player.options.logs.length; i++) {
			let log = this.store.Player.options.logs[i]
			if (log.time > new Date().getTime() - 300000 & log.name == "Error") {
				numberOfFails += 1
			} else {
				break
			}
		}
		//console.log("numberOfFails", numberOfFails)
		if (numberOfFails > 10) {
			this.store.Player.options.logs.unshift({
				"time": new Date().getTime(),
				"name": "Error",
				"success": true,
				"text": "More than 10 errors happend in last 5 minutes. Bot stopped.",
				"villageId": "/"
			});
			return true
		}
		return false
	}.bind(this)

	this.checkTasks = async function () {
		if (this.lock) {
			this.log.debug('checkTasks locked');
			return;
		}
		this.lock = true;
		this.log.debug('checkTasks start');

		try {
			await this.ApplyActions.analyzePlayer();
		} catch (e) {
			taskTimers.analyze.time = new Date().getTime() + 10 * 60 * 1000;
			reportError(e, "analyzePlayer");
			return;
		}
		try {
			if (new Date().getTime() > taskTimers.build.time)
				await checkBuild();
		} catch (e) {
			taskTimers.build.time = new Date().getTime() + 10 * 60 * 1000;
			reportError(e, "checkBuild");
		}
		//try {
		if (new Date().getTime() > taskTimers.trade.time)
			await checkTrade();
		//} catch (e) {
		//	taskTimers.trade.time = new Date().getTime() + 10 * 60 * 1000;
		//	reportError(e, "checkTrade");
		//}
		try {
			if (new Date().getTime() > taskTimers.hero.time)
				await checkHero();
		} catch (e) {
			taskTimers.hero.time = new Date().getTime() + 10 * 60 * 1000;
			reportError(e, "checkHero");
		}
		try {
			if (new Date().getTime() > taskTimers.train.time)
				await checkTrain();
		} catch (e) {
			taskTimers.train.time = new Date().getTime() + 10 * 60 * 1000;
			reportError(e, "checkTrain");
		}
		try {
			if (new Date().getTime() > taskTimers.farm.time)
				await checkFarm();
		} catch (e) {
			taskTimers.farm.time = new Date().getTime() + 10 * 60 * 1000;
			reportError(e, "checkFarm");

		}

		this.log.debug('checkTasks done');
		this.lock = false;
	}

	this.search = async function (parameters) {
		this.store.custom.farmfinder.progress = 0.0;
		this.store.custom.farmfinder.showProgress = true;
		this.store.custom.farmfinder.running = true;
		let start = this.store.Player.start;
		this.store.Player.start = false;
		await this.ApplyActions.search(parameters);
		this.store.Player.start = start;
		this.store.custom.farmfinder.progress = 100;
		this.store.custom.farmfinder.showProgress = false;
		this.store.custom.farmfinder.running = false;
	}

	this.cropFind = async function (parameters) {
		this.store.custom.farmfinder.progress = 0.0;
		this.store.custom.farmfinder.showProgress = true;
		this.store.custom.farmfinder.running = true;
		let start = this.store.Player.start;
		this.store.Player.start = false;
		await this.ApplyActions.cropFind(parameters);
		this.store.Player.start = start;
		this.store.custom.farmfinder.progress = 100;
		this.store.custom.farmfinder.showProgress = false;
		this.store.custom.farmfinder.running = false;
	}

	this.getGoldClubFarmlists = async function (parameters) {
		this.store.custom.farmfinder.progress = 0.0;
		this.store.custom.farmfinder.showProgress = true;
		this.store.custom.farmfinder.running = true;
		let start = this.store.Player.start;
		this.store.Player.start = false;
		await this.ApplyActions.getGoldClubFarmlists(parameters);
		this.store.Player.start = start;
		this.store.custom.farmfinder.progress = 100;
		this.store.custom.farmfinder.showProgress = false;
		this.store.custom.farmfinder.running = false;
	}

	this.coppyFarmlist = async function (village, farmlist, name, copyStatus) {

		let start = this.store.Player.start;
		this.store.Player.start = false;
		await this.ApplyActions.coppyFarmlist(village, farmlist, name, copyStatus);
		this.store.Player.start = start;
	}

	this.getConfig = async function () {
		this.log.debug("getConfig", this.store.Player);
		let configLs = this.store.localStorage.get("settings");
		if (configLs !== false) {
			copyProperties(this.store.options, configLs);
		}
		this.store.options.init = true;

		return true;
	}


	this.setConfig = async function () {
		//this.log.debug("set tasks", this.store.options);
		this.store.localStorage.set("settings", this.store.options);
		return true;
	}

	this.getTasks = async function () {

		this.log.debug('Get localStorage getTasks data: ', this.store.Player.playerId);

		if (this.store.Player.playerId === 0) {
			this.log.debug("no playerId", this.store.Player.playerId);
			return true;
		}

		let loggedIn = this.store.Player.loggedIn;

		this.log.debug("getConfig", this.store.Player);
		let villageTasks = this.store.localStorage.get(this.store.Player.playerId + "");
		if (villageTasks !== false && villageTasks !== null) {
			for (let i = 0; i < villageTasks.length; i++) {

				for (let j = 0; j < this.store.Player.villages.length; j++) {
					if (this.store.Player.villages[j].villageId === villageTasks[i].villageId) {
						copyProperties(this.store.Player.villages[j].tasks, villageTasks[i].tasks);
					}
				}
			}
		}

		let playerOptions = this.store.localStorage.get(this.store.Player.playerId + "options");
		if (playerOptions !== false) {
			copyProperties(this.store.Player.options, playerOptions);

		}
		this.store.Player.loggedIn = loggedIn;
		this.store.Player.tasksLoad = true;

		this.store.windowdimension = "L" + window.innerWidth + "-" + window.innerHeight;

		let parsedUrl = new URL(this.store.Player.url);

		//console.log("getCredentials")
		let userInfo = await request("", "", "getCredentials", "", 0, parsedUrl.hostname);
		//console.log(userInfo)
		if (userInfo.length === 1) {
			if (userInfo[0].users.length === 1) {
				this.store.Player.options.User.username = userInfo[0].users[0].password;
				this.store.Player.options.User.password = userInfo[0].users[0].name;
			} else if (userInfo[0].users.length !== 0) {
				let user = userInfo[0].users.find(d => d.password === this.store.Player.name);
				if (user !== undefined) {
					this.store.Player.options.User.username = user.password;
					this.store.Player.options.User.password = user.name;
				}
			}
		}
		return true;
	}


	this.setTasks = async function () {
		if (this.store.Player.playerId === 0) {
			return true;
		}

		if (this.store.Player.tasksLoad === false) return true;

		let villageTasks = [];

		for (let i = 0; i < this.store.Player.villages.length; i++) {
			if (this.store.Player.villages[i] !== undefined) {
				villageTasks.push({
					villageId: this.store.Player.villages[i].villageId,
					tasks: this.store.Player.villages[i].tasks
				});
			}
		}
		//this.log.debug("set tasks", villageTasks);
		this.store.localStorage.set(this.store.Player.playerId + "", villageTasks);
		this.store.localStorage.set(this.store.Player.playerId + "options", this.store.Player.options);
		return true;
	}

	const request = function (url, data, type, headers, timeout, hostname) {
		if (!timeout) {
			timeout = 10000
		}
		let headers1 = {
			"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
			"Upgrade-Insecure-Requests": 1
		}
		if (type == "POST") {
			headers1["Content-Type"] = "application/json;charset=UTF-8"
		}
		if (headers) {
			for (header in request.headers) {
				headers1[header] = headers[header];
			}
		}
		//this.log.debug('request start', url, data, type, headers1);
		return new Promise((resolve, reject) => {
			setTimeout(function () {
				resolve({ "document": "", "orign": "", "url": "" })
			}, timeout)
			if (!!window.chrome) {
				chrome.runtime.sendMessage("gegegmbnpdigalgfkegjgnfcpmolijdg", {
					'url': url,
					'data': data,
					'type': type,
					timeout: 10000,
					timemin: 500,
					timemax: 2000,
					headers: headers1,
					hostname: hostname
				}, function (response) {
					//console.log('request done', response);
					resolve(response);
				})
			} else {
				let _r1 = {};
				if (window.sendMessage === undefined) {
					resolve(undefined);
					return;
				}

				window.sendMessage("gegegmbnpdigalgfkegjgnfcpmolijdg", {
					'url': url,
					'data': data,
					'type': type,
					timeout: 10000,
					timemin: 500,
					timemax: 2000,
					headers: headers1,
					hostname: hostname
				}, function (response) {
					resolve(response.data);
				}, _r1);
			}
		});
	}.bind(this)
	this.request = request;

	const checkHero = async function () {
		this.log.debug('checkHero start');
		if (this.store.Player.options.tasks.hero.adventure) {
			if (this.store.Player.hero.time) {
				if (this.store.Player.hero.time < new Date().getTime()) {
					this.store.Player.hero.status = 0
					this.store.Player.hero.adventurePoints = 1
				}
			}
			//status 0=alive, 1 returning, 2 on the way, 7 dead
			if (this.store.Player.hero.status == 0 && this.store.Player.hero.adventurePoints * 1 > 0) {
				let rez = await this.ApplyActions.adventure();
			}
		}
		this.log.debug('checkHero end');
	}.bind(this)

	const checkBuild = async function () {
		this.log.debug('checkBuild start');
		for (let i = 0; i < this.store.Player.villages.length; i++) {
			let village = this.store.Player.villages[i];
			if (village.BuildingQueueTimes[1] !== undefined && village.BuildingQueueTimes[1] !== 0)
				if (village.BuildingQueueTimes[1] - (new Date().getTime() / 1000) < 300) {
					let rez = await this.ApplyActions.finishNow(village, {
						"queueType": 1
					}, {
						"queueType": 1
					});
				}
			if (village.BuildingQueueTimes[2] !== undefined && village.BuildingQueueTimes[2] !== 0)
				if (village.BuildingQueueTimes[2] - (new Date().getTime() / 1000) < 300) {
					let rez = await this.ApplyActions.finishNow(village, {
						"queueType": 2
					}, {
						"queueType": 2
					});
				}

			if (village.tasks.build.length == 0) {
				continue;
			}
			let buildtasksToRemove = []
			for (let j = 0; j < village.tasks.build.length; j++) {
				let buildTask = village.tasks.build[j];

				let locationId = undefined;
				let lowestBuilding = 30;
				let lowestBuilding2 = 30;


				if (buildTask.locationId.length !== undefined) {
					for (let l = 1; l < 19; l++) {
						if (buildTask.locationId.includes(village.buildings[l].buildingType + "")) {
							let villageBuilding = village.buildings[l];
							if (villageBuilding.lvlNext < lowestBuilding2) {
								lowestBuilding2 = villageBuilding.lvlNext
							}
							if (villageBuilding.lvlNext < lowestBuilding && isLowerReources(villageBuilding.upgradeCosts, village.storage) & villageBuilding.lvlNext <= buildTask.toLvl) {
								locationId = l;
								lowestBuilding = villageBuilding.lvlNext;
							}
						}
					}
				} else {
					locationId = buildTask.locationId;
				}

				if (locationId === undefined) {
					//console.log("locationId",locationId)
					//console.log(lowestBuilding2,">",buildTask.toLvl)
					if (lowestBuilding2 > buildTask.toLvl) {
						buildtasksToRemove.unshift(j)
					}

					continue;
				}

				if ((village.BuildingQueue["2"] == 0 && locationId <= 18) || (village.BuildingQueue["1"] == 0 && locationId > 18)) {

					continue;
				}

				if (village.buildings[locationId].buildingType == 0) {
					let res1 = {
						"1": this.store.Buildings[buildTask.buildingType][1][0],
						"2": this.store.Buildings[buildTask.buildingType][1][1],
						"3": this.store.Buildings[buildTask.buildingType][1][2],
						"4": this.store.Buildings[buildTask.buildingType][1][3]
					}

					if (isLowerReources(res1, village.storage)) {
						let villageBuilding = village.buildings[locationId];
						let rez = await this.ApplyActions.build(village, villageBuilding, buildTask);
					}
				} else {
					let villageBuilding = village.buildings[locationId];

					if (villageBuilding.lvlNext == villageBuilding.lvl) {

						buildtasksToRemove.unshift(j)
					} else if (villageBuilding.lvlNext <= buildTask.toLvl) {

						if (isLowerReources(villageBuilding.upgradeCosts, village.storage)) {
							let rez = await this.ApplyActions.build(village, villageBuilding, buildTask);
						}
					} else {
						buildtasksToRemove.unshift(j)
					}
				}
			}
			this.log.debug('build to remove:', buildtasksToRemove);
			for (let j = 0; j < buildtasksToRemove.length; j++) {
				village.tasks.build.splice(buildtasksToRemove[j], 1)
			}
		}
		this.log.debug('checkBuild done');
		return true
	}.bind(this)

	const checkTrade = async function () {

		this.log.debug('checkTrade start');
		for (let i = 0; i < this.store.Player.villages.length; i++) {

			let village = this.store.Player.villages[i];
			//updateInncomingResources(village)
			updateMerchants(village)

			if (village.tasks.trade.length == 0) {
				continue;
			}
			for (let j = 0; j < village.tasks.trade.length; j++) {
				let resources = village.tasks.trade[j].resources;
				if (village.tasks.trade[j].time > new Date().getTime()) {
					continue;
				}
				//Pre trade
				switch (village.tasks.trade[j].type) {
					case "1x":
						break;
					case "Return":
						break;
				}
				if (village.tasks.trade[j].type == "Send by %") {


					//console.log("send by %")
					//console.log(village,village.tasks.trade[j])
					resources = resourcesToBeSentByPercent(village, village.tasks.trade[j]);

					resources = { "1": resources[0], "2": resources[1], "3": resources[2], "4": resources[3] }
					//console.log(resources)
					//continue
				}
				//else
				//{
				//console.log("tradecheck",village.Merchants.maxCapacity,">",sumResources(resources),"&&", isLowerReources(resources, village.storage))
				if (village.Merchants.maxCapacity >= sumResources(resources) && isLowerReources(resources, village.storage) && sumResources(resources) > 0) {
					//console.log("sending")

					let rez = await this.ApplyActions.trade(village, village.tasks.trade[j], resources);
					//console.log("distance",distance(village.x, village.y, village.tasks.trade[j].x, village.tasks.trade[j].y))
					//console.log("village.Merchants.speed",village.Merchants.speed)
					//console.log("village.Merchants.speed",village.Merchants.speed)

					if (village.tasks.trade[j].type == "Every x minutes") {
						village.tasks.trade[j].time = new Date().getTime() + village.tasks.trade[j].repeatinterval * 60000
					}
					else if (village.tasks.trade[j].type == "Return") {
						village.tasks.trade[j].time = new Date().getTime() + (distance(village.x, village.y, village.tasks.trade[j].x, village.tasks.trade[j].y) / village.Merchants.speed) * 60 * 60 * 1000 * 2;
					}
					//console.log("traveltime",(distance(village.x, village.y, village.tasks.trade[j].x, village.tasks.trade[j].y) / village.Merchants.speed) * 60 * 60 * 1000 * 2)
					//console.log("village.tasks.trade[j].time",village.tasks.trade[j].time)
					if (!rez) {
						return;
					}
					//Post trade
					switch (village.tasks.trade[j].type) {
						case "1x":
							village, village.tasks.trade.splice(j, 1);
							break;
						case "Return":

							break;
					}
					//}
				}



			}
		}
		this.log.debug('checkTrade done');
	}.bind(this)

	const resourcesToBeSentByPercent = function (village, task) {
		let targetvillage = getVillageFromXY(task.x, task.y);

		let SkupajSurovinZaPosiljanje = village.Merchants.maxCapacity;

		let SkupajLes1 = village["storage"]["1"];
		let SkupajGlina1 = village["storage"]["2"];
		let SkupajZelezo1 = village["storage"]["3"];
		let SkupajZito1 = village["storage"]["4"];

		let PolnoLes1 = SkupajLes1 / village["storageCapacity"]["1"];
		let PolnoGlina1 = SkupajGlina1 / village["storageCapacity"]["2"];
		let PolnoZelezo1 = SkupajZelezo1 / village["storageCapacity"]["3"];
		let PolnoZito1 = SkupajZito1 / village["storageCapacity"]["4"];
		let PolnoLes2 = 0;
		let PolnoGlina2 = 0;
		let PolnoZelezo2 = 0;
		let PolnoZito2 = 0;
		let capacity = { "1": 1000000000, "2": 1000000000, "3": 1000000000, "4": 1000000000 };

		if (targetvillage) {
			updateInncomingResources(targetvillage)
			let incommingRes = getInncomingResources(targetvillage);
			let SkupajLes2 = targetvillage["storage"]["1"] + incommingRes[0];
			let SkupajGlina2 = targetvillage["storage"]["2"] + incommingRes[1];
			let SkupajZelezo2 = targetvillage["storage"]["3"] + incommingRes[2];
			let SkupajZito2 = targetvillage["storage"]["4"] + incommingRes[3];

			PolnoLes2 = SkupajLes2 / targetvillage["storageCapacity"]["1"];
			PolnoGlina2 = SkupajGlina2 / targetvillage["storageCapacity"]["2"];
			PolnoZelezo2 = SkupajZelezo2 / targetvillage["storageCapacity"]["3"];
			PolnoZito2 = SkupajZito2 / targetvillage["storageCapacity"]["4"];
			capacity = targetvillage["storageCapacity"];

		}

		if ((task["empty"]["1"] / 100 < PolnoLes1 || task["empty"]["2"] / 100 < PolnoGlina1 || task["empty"]["3"] / 100 < PolnoZelezo1 || task["empty"]["4"] / 100 < PolnoZito1)
			&& (task["fill"]["1"] / 100 > PolnoLes2 || task["fill"]["2"] / 100 > PolnoGlina2 || task["fill"]["3"] / 100 > PolnoZelezo2 || task["fill"]["4"] / 100 > PolnoZito2)) {

			let LesKiGaLahkoPosljem = 0;
			let GlinaKiGaLahkoPosljem = 0;
			let ZelezoKiGaLahkoPosljem = 0;
			let ZitoKiGaLahkoPosljem = 0;
			if (task["empty"]["1"] / 100 < PolnoLes1 && task["fill"]["1"] / 100 > PolnoLes2) {
				let LesKiGaLahkoPosljem1 = Math.floor((PolnoLes1 - task["empty"]["1"] / 100) * village["storageCapacity"]["1"]);
				let LesKiGaLahkoPosljem2 = Math.floor((task["fill"]["1"] / 100 - PolnoLes2) * capacity["1"]);
				LesKiGaLahkoPosljem = Math.min(LesKiGaLahkoPosljem1, LesKiGaLahkoPosljem2);
			}
			if (task["empty"]["2"] / 100 < PolnoGlina1 && task["fill"]["2"] / 100 > PolnoGlina2) {
				let GlinaKiGaLahkoPosljem1 = Math.floor((PolnoGlina1 - task["empty"]["2"] / 100) * village["storageCapacity"]["2"]);
				let GlinaKiGaLahkoPosljem2 = Math.floor((task["fill"]["2"] / 100 - PolnoGlina2) * capacity["2"]);
				GlinaKiGaLahkoPosljem = Math.min(GlinaKiGaLahkoPosljem1, GlinaKiGaLahkoPosljem2);
			}

			if (task["empty"]["3"] / 100 < PolnoZelezo1 && task["fill"]["3"] / 100 > PolnoZelezo2) {
				let ZelezoKiGaLahkoPosljem1 = Math.floor((PolnoZelezo1 - task["empty"]["3"] / 100) * village["storageCapacity"]["3"]);
				let ZelezoKiGaLahkoPosljem2 = Math.floor((task["fill"]["3"] / 100 - PolnoZelezo2) * capacity["3"]);
				ZelezoKiGaLahkoPosljem = Math.min(ZelezoKiGaLahkoPosljem1, ZelezoKiGaLahkoPosljem2);
			}

			if (task["empty"]["4"] / 100 < PolnoZito1 && task["fill"]["4"] / 100 > PolnoZito2) {
				let ZitoKiGaLahkoPosljem1 = Math.floor((PolnoZito1 - task["empty"]["4"] / 100) * village["storageCapacity"]["4"]);
				let ZitoKiGaLahkoPosljem2 = Math.floor((task["fill"]["4"] / 100 - PolnoZito2) * capacity["4"]);
				ZitoKiGaLahkoPosljem = Math.min(ZitoKiGaLahkoPosljem1, ZitoKiGaLahkoPosljem2);
			}

			let vsotaSurovin = LesKiGaLahkoPosljem + GlinaKiGaLahkoPosljem + ZelezoKiGaLahkoPosljem + ZitoKiGaLahkoPosljem;
			let ProcentiLes = LesKiGaLahkoPosljem / vsotaSurovin;
			let ProcentiGlina = GlinaKiGaLahkoPosljem / vsotaSurovin;
			let ProcentiZelezo = ZelezoKiGaLahkoPosljem / vsotaSurovin;
			let ProcentiZito = ZitoKiGaLahkoPosljem / vsotaSurovin;
			vsotaSurovin = Math.min(vsotaSurovin, SkupajSurovinZaPosiljanje);

			if (vsotaSurovin == 0) {
				return [0, 0, 0, 0];
			}
			let surovine = [Math.floor(ProcentiLes * vsotaSurovin), Math.floor(ProcentiGlina * vsotaSurovin), Math.floor(ProcentiZelezo * vsotaSurovin), Math.floor(ProcentiZito * vsotaSurovin)];
			let maxsurovin = [LesKiGaLahkoPosljem, GlinaKiGaLahkoPosljem, ZelezoKiGaLahkoPosljem, ZitoKiGaLahkoPosljem];
			let zaokrozene = RoundTrade(surovine, maxsurovin, [village["Merchants"]["merchantsFree"], village["Merchants"]["carry"]], task["minres"], task["round"], task["full"]);
			console.log("send by % rounded res", zaokrozene);
			return zaokrozene;
		}

		return [0, 0, 0, 0];
	}

	const getInncomingResources = function (village) {
		let res = [0, 0, 0, 0]
		let timenow = new Date().getTime()
		for (let i = 0; i < village["troopsMoving"].length; i++) {
			//console.log(village["troopsMoving"][i],village.name, village["troopsMoving"][i]["movementType"]*1,"==", 7 ,"&&", village["troopsMoving"][i]["villageIdTarget"]*1,"==", village.villageId)
			if (village["troopsMoving"][i]["movementType"] * 1 == 7 && village["troopsMoving"][i]["villageIdTarget"] * 1 == village.villageId * 1) {
				res[0] += village["troopsMoving"][i]["resources"]["1"];
				res[1] += village["troopsMoving"][i]["resources"]["2"];
				res[2] += village["troopsMoving"][i]["resources"]["3"];
				res[3] += village["troopsMoving"][i]["resources"]["4"];
			}
		}
		return res;
	}

	const updateInncomingResources = function (village) {
		let res = [0, 0, 0, 0]
		let toRemove = []
		let timenow = new Date().getTime()
		for (let i = 0; i < village["troopsMoving"].length; i++) {
			//console.log(village["troopsMoving"][i]["movementType"]*1,"==", 7," && ",village["troopsMoving"][i]["villageIdTarget"]*1," == ",village.villageId*1 ,"&&", village["troopsMoving"][i]["timeFinish"]*1,">=",timenow)
			if (village["troopsMoving"][i]["movementType"] * 1 == 7 && village["troopsMoving"][i]["villageIdTarget"] * 1 == village.villageId * 1 && village["troopsMoving"][i]["timeFinish"] * 1 <= timenow) {
				//console.log("remove this")
				toRemove.splice(0, 0, i)
				res[0] += village["troopsMoving"][i]["resources"]["1"]
				res[1] += village["troopsMoving"][i]["resources"]["2"]
				res[2] += village["troopsMoving"][i]["resources"]["3"]
				res[3] += village["troopsMoving"][i]["resources"]["4"]
			}
		}
		village["storage"]["1"] += res[0]
		village["storage"]["2"] += res[1]
		village["storage"]["3"] += res[2]
		village["storage"]["4"] += res[3]
		//console.log("new res" , res, village["storage"])
		for (let i = 0; i < toRemove.length; i++) {
			village["troopsMoving"].splice(toRemove[i], 1)
		}
		//console.log(res,toRemove)
	}

	const updateMerchants = function (village) {
		let trg = 0
		let toRemove = []
		let timenow = new Date().getTime()
		for (let i = 0; i < village["TRGOVCI"].length; i++) {
			if (village["TRGOVCI"][i]["time"] * 1 <= timenow) {
				toRemove.splice(0, 0, i)
				trg += village["TRGOVCI"][i]["trgovci"]
			}
		}
		village["Merchants"]["merchantsFree"] = Math.min(village["Merchants"]["merchantsFree"] + trg, village["Merchants"]["max"])
		for (let i = 0; i < toRemove.length; i++) {
			village["TRGOVCI"].splice(toRemove[i], 1)
		}
		//console.log(trg,toRemove)
	}

	const getVillageFromXY = function (x, y) {
		for (let i = 0; i < this.store.Player.villages.length; i++) {
			if (this.store.Player.villages[i]["x"] == x && this.store.Player.villages[i]["y"] == y) {
				return this.store.Player.villages[i]
			}
		}
		return false
	}.bind(this)


	function Vsota(polje) {
		let vsota = 0;
		for (let i = 0; i < polje.length; i++) {
			vsota += polje[i] * 1;
		}
		return vsota;
	}

	const RoundTrade = function (surovine, maxsurovine, trgovci, minsurovin, zaokrozitev, polnitrgovci) {

		let wood = surovine[0];
		let clay = surovine[1];
		let iron = surovine[2];
		let crop = surovine[3];
		let woodMax = maxsurovine[0];
		let clayMax = maxsurovine[1];
		let ironMax = maxsurovine[2];
		let cropMax = maxsurovine[3];
		if (!(zaokrozitev == 10 || zaokrozitev == 100 || zaokrozitev == 1000)) {
			zaokrozitev = 100;
		}
		wood = Math.floor(wood / zaokrozitev) * zaokrozitev;
		clay = Math.floor(clay / zaokrozitev) * zaokrozitev;
		iron = Math.floor(iron / zaokrozitev) * zaokrozitev;
		crop = Math.floor(crop / zaokrozitev) * zaokrozitev;
		let sumResources = wood + clay + iron + crop;
		if (polnitrgovci) {
			//add resources to fill trade task
			let resourcesLeft = trgovci[1] - (sumResources % trgovci[1]);
			let change = true;
			if (sumResources / trgovci[1] < trgovci[0]) {
				while (resourcesLeft > 0 && change) {
					change = false;
					if (woodMax - wood >= zaokrozitev && resourcesLeft > 0) {
						wood += zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						change = true;
					}
					if (clayMax - clay >= zaokrozitev && resourcesLeft > 0) {
						clay += zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						change = true;
					}
					if (ironMax - iron >= zaokrozitev && resourcesLeft > 0) {
						iron += zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						change = true;
					}
					if (cropMax - crop >= zaokrozitev && resourcesLeft > 0) {
						crop += zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
						change = true;
					}
				}
			}
			//remove resources in case of multiple trades when resources are over
			sumResources = wood + clay + iron + crop;
			if (sumResources / trgovci[1] > 1) {

				if (polnitrgovci) {
					resourcesLeft = sumResources % trgovci[1];
				} else {
					resourcesLeft = 0;
				}

				if (sumResources / trgovci[1] > trgovci[0]) {
					resourcesLeft = sumResources - trgovci[1] * trgovci[0];
				}
				if (trgovci[1] !== resourcesLeft) {
					change = true;
					while (resourcesLeft > 0 && change) {
						change = false;

						if (wood >= zaokrozitev && resourcesLeft > 0) {
							wood -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							change = true;
						}
						if (clay >= zaokrozitev && resourcesLeft > 0) {
							clay -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							change = true;
						}
						if (iron >= zaokrozitev && resourcesLeft > 0) {
							iron -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							change = true;
						}
						if (crop >= zaokrozitev && resourcesLeft > 0) {
							crop -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							resourcesLeft -= zaokrozitev < resourcesLeft ? zaokrozitev : resourcesLeft;
							change = true;
						}
					}
				}
			}
		}

		if ((wood + clay + iron + crop) > minsurovin) {
			return [wood, clay, iron, crop];
		}

		return [0, 0, 0, 0];
	}


	const checkTrain = async function () {

		this.log.debug('checkTrain start');
		for (let i = 0; i < this.store.Player.villages.length; i++) {
			let village = this.store.Player.villages[i];
			if (village.tasks.train.length == 0) {
				continue;
			}
			for (let j = 0; j < village.tasks.train.length; j++) {
				if (village.tasks.train[j].time > new Date().getTime()) {
					continue;
				}
				village.tasks.train[j].type = ((this.store.Player.tribeId - 1) * 10) + (village.tasks.train[j].type * 1 % 10);
				let t = village.tasks.train[j].type % 10;

				let resources = {};
				if (this.store.Player.version === 5) {
					resources["1"] = this.store.troopCost[t].costs[1] * village.tasks.train[j].amount;
					resources["2"] = this.store.troopCost[t].costs[2] * village.tasks.train[j].amount;
					resources["3"] = this.store.troopCost[t].costs[3] * village.tasks.train[j].amount;
					resources["4"] = this.store.troopCost[t].costs[4] * village.tasks.train[j].amount;
				} else {
					resources["1"] = this.store.uc[t][1] * village.tasks.train[j].amount;
					resources["2"] = this.store.uc[t][2] * village.tasks.train[j].amount;
					resources["3"] = this.store.uc[t][3] * village.tasks.train[j].amount;
					resources["4"] = this.store.uc[t][4] * village.tasks.train[j].amount;
				}


				if (isLowerReources(resources, village.storage)) {

					let buildingType = 0;
					let building = undefined;
					if (t == 1 || t == 2 || t == 3) {
						buildingType = 19;
					} else if (t == 4 || t == 5 || t == 6) {
						buildingType = 20;
					} else if (t == 7 || t == 8) {
						buildingType = 21;
					} else if (t == 9 || t == 0) {

						buildingType = 25;
						for (let b = 0; b < village.buildings.length; b++) {
							if (village.buildings[b].buildingType == 26) {
								buildingType = 26;
							}
						}
					}
					//teutons
					if (this.store.Player.tribeId * 1 == 2 && t == 4) {
						buildingType = 19;
					}
					//gauls
					if ((this.store.Player.tribeId * 1 == 3 || this.store.Player.tribeId * 1 == 7) && t == 3) {
						buildingType = 20;
					}

					for (let b = 0; b < village.buildings.length; b++) {
						if (village.buildings[b].buildingType == buildingType) {
							building = village.buildings[b];
						}
					}

					if (building !== undefined) {
						let rez = await this.ApplyActions.train(village, village.tasks.train[j], resources, building);
						village.tasks.train[j].time = new Date().getTime() + village.tasks.train[j].timeMinutes * 60 * 1000;
					}
				}
			}
		}
		this.log.debug('checkTrain done');
	}.bind(this)

	const checkFarm = async function () {
		this.log.debug('checkFarm start');
		for (let i = 0; i < this.store.Player.villages.length; i++) {
			let village = this.store.Player.villages[i];
			if (village.tasks.farms.length == 0) {
				continue;
			}
			for (let j = 0; j < village.tasks.farms.length; j++) {
				if (village.tasks.farms[j].time > new Date().getTime()) {
					continue;
				}
				if (!village.tasks.farms[j].goldClubFarmlist) {
					for (let f = village.tasks.farms[j].farmPosition; f < village.tasks.farms[j].villages.length; f++) {

						if (isLowerFarms(village.tasks.farms[j].amount, village.Troops) || this.store.Player.version == 4) {
							let rez = await this.ApplyActions.farm(village, village.tasks.farms[j], village.tasks.farms[j].villages[f]);

							if (rez.fail) {
								break;
							}
							village.tasks.farms[j].farmPosition = f;
						}
					}

					if (village.tasks.farms[j].farmPosition == (village.tasks.farms[j].villages.length - 1)) {
						village.tasks.farms[j].farmPosition = 0;
					}
				} else {
					let rez = await this.ApplyActions.farmGoldClub(village, village.tasks.farms[j]);

				}
				village.tasks.farms[j].timeMinutes *= 1;
				let randomMinutes = village.tasks.farms[j].timeMinutes;
				if (village.tasks.farms[j].timeMinutesMax !== undefined) {
					village.tasks.farms[j].timeMinutesMax *= 1;
					if (village.tasks.farms[j].timeMinutesMax > village.tasks.farms[j].timeMinutes) {

						randomMinutes = Math.floor(Math.random() * (village.tasks.farms[j].timeMinutesMax - village.tasks.farms[j].timeMinutes)) + village.tasks.farms[j].timeMinutes;
					}
				}

				village.tasks.farms[j].time = new Date().getTime() + randomMinutes * 60 * 1000;
			}
		}
		this.log.debug('checkFarm done');
	}.bind(this)

	function sumResources(res1) {
		return res1["1"] * 1 + res1["2"] * 1 + res1["3"] * 1 + res1["4"] * 1;
	}

	function isLowerReources(res1, res2) {
		return res1["1"] * 1 < res2["1"] * 1 && res1["2"] * 1 < res2["2"] * 1 && res1["3"] * 1 < res2["3"] * 1 && res1["4"] * 1 < res2["4"] * 1;
	}

	function isLowerFarms(res1, res2) {
		return res1["1"] * 1 <= res2["1"] * 1 && res1["2"] * 1 <= res2["2"] * 1 && res1["3"] * 1 <= res2["3"] * 1 && res1["4"] * 1 <= res2["4"] * 1 && res1["5"] * 1 <= res2["5"] * 1 && res1["6"] * 1 <= res2["6"] * 1 && res1["7"] * 1 <= res2["7"] * 1 && res1["8"] * 1 <= res2["8"] * 1;
	}

	function distance(x1, y1, x2, y2) {
		return Math.sqrt(((x2 * 1 - x1 * 1) * (x2 * 1 - x1 * 1)) + ((y2 * 1 - y1 * 1) * (y2 * 1 - y1 * 1)));
	}
	const reportError = function (e, type) {
		console.log("error", type)
		console.log(e)
		/*this.socket.emit('ERROR', {
			"type": "checkFarm",
			"error": exceptionToString(e)
		});*/
	}.bind(this)

	const keysToWrap = [
		"getPlayer",
		"build",
		"finishNow",
		"analyzePlayer",
		"trade",
		"train",
		"adventure",
		"farm",
		"search",
		"cropFind",
		"onRouted",
		"getGoldClubFarmlists",
		"farmGoldClub",
		"coppyFarmlist",
	]

	const wrapObjectFunctions = function (obj, before, after) {
		let key, value;

		for (key in obj) {
			value = obj[key];
			if (typeof value === "function") {
				if (keysToWrap.includes(key)) {
					wrapFunction(obj, key, value);
				}
			}
		}

		function wrapFunction(obj, fname, f) {
			obj[fname] = async function () {
				let rv;
				if (before) {
					before(fname, this, arguments);
				}
				rv = await f.apply(this, arguments); // Calls the original
				if (after) {
					after(fname, this, arguments, rv);
				}
				return rv;
			};
		}
	}.bind(this)

	function copyProperties(main, other) {
		if (other != undefined) {
			for (let key in main) {
				if (other[key] !== undefined) {
					// Handle Array
					if (key == "lang") {
						continue;
					}
					if (Array.isArray(other[key])) {
						let arrayOther = other[key];
						let arrayMain = main[key];
						if (arrayMain !== undefined) {
							for (let i = 0, len = arrayOther.length; i < len; i++) {
								if (arrayMain[i] !== undefined) {
									copyProperties(arrayMain[i], arrayOther[i]);
								} else {
									switch (key) {
										case "village":
											arrayMain[i] = JSON.parse(JSON.stringify(this.store.Village));
											arrayMain[i].tasks.villageId = arrayMain[i].villageId;
											copyProperties(arrayMain[i], arrayOther[i]);
											break;
										default:
											arrayMain[i] = arrayOther[i];
											break;
									}
								}
							}
							for (let i = arrayMain.length - 1; i >= 0; i--) {
								if (arrayOther[i] === undefined) {
									arrayMain.splice(i, 1);
								}
							}
						}
					} else if (typeof main[key] === 'object') {
						copyProperties(main[key], other[key])
					} else {
						if (main[key] !== other[key]) {
							main[key] = other[key];
						}
					}
				}
			}
		}
	}
}

export default new exports();