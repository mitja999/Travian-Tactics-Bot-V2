const JSON5 = require('./json5.js');
exports.version = 4;
//let MapZoom = 3;
let newtravianversion = false;
const analyze = {};

exports.initAA = async function (l, s) {
    this.log = l;
    this.store = s;
    //console.log("apply action socket",socket,this)
    //this.log.debug=this.log.debug
    wrapObjectFunctions(
        analyze,
        function (fname, o, arg) {
            if (!this.store.Player.start && !(fname === "checkAnalyseBuildRouter" || fname === "analyseBuildRouter" || fname === "search" || fname === "onRouted" || fname === "analyzePlayer" || fname === "createDocument" || fname === "preveriLogin" || fname === "getPlayer" || fname === "ananalizirajNaselje" || fname === "getGoldClubFarmlists" || fname === "coppyFarmlist")) {
                throw "bot stopped";
            }
            //this.log.debug("LOG: before calling " + fname, arg);
        }.bind(this),
        function (fname, o, arg, r) {
            /*c.logs.unshift({
                    "time":new Date(),
                    "name":"Req log",
                    "success":true,
                    "text":r.request.type+": "+r.responseURL,
                    "villageId":r.villageId
                });*/
            if (r.error) {
                this.store.Player.options.logs.unshift({
                    "time": new Date().getTime(),
                    "name": "Error",
                    "success": true,
                    "text": r.errorMessage,
                    "villageId": r.name
                });
                //console.log("pred checkLastLogs")
                let throwerror = checkLastLogs()
                //console.log("po checkLastLogs",throwerror)
                //let throwerror=false
                if (throwerror) {
                    throw r.errorMessage;
                    //this.main.start = false;
                    //clearInterval(this.main.timer);

                }
                //throw r.errorMessage;

            }
            if (r.loggedin) {
                this.store.Player.options.logs.unshift({
                    "time": new Date().getTime(),
                    "name": "Login",
                    "success": true,
                    "text": "Logged in",
                    "villageId": "/"
                });
            }
            if (fname == "analyzeDorf1" || fname == "analyzeDorf2"|| fname == "analyzeMarketplace") {
                analyzeMarketplace
                this.store.Player.options.logs.unshift({
                    "time": new Date().getTime(),
                    "name": fname,
                    "success": true,
                    "text": fname.split("analyze")[1] + " analysed",
                    "villageId": arg[0].name
                });
                //console.log("this",this)
            }

            //this.log.debug("LOG: after calling " + fname, arg);
        }.bind(this)
    );
    //this.log.debug("log attached")
    return true;
}

exports.getPlayer = async function (rez) {
    let doc = await createDocument(rez.document)
    //this.log.debug('rez:', doc);
    let logedin = await preveriLogin(doc);
	if (!logedin)
	{
		return false
	}
	
    this.log.debug('logedin:', logedin);
    if (logedin) {
        await ananalizirajNaselje(doc, rez.url, rez.document, rez);

    }
    return true;
}

exports.trade = async function (village, tradeTask, resources) {
    //console.log("trade",village)
    let wood = resources["1"] == 0 ? "" : resources["1"]
    let clay = resources["2"] == 0 ? "" : resources["2"]
    let iron = resources["3"] == 0 ? "" : resources["3"]
    let crop = resources["4"] == 0 ? "" : resources["4"]

    //this.log.debug("sendTrade:", village, tradeTask, resources, this.store.Player)
    let rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php", "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);

    rez = await AnalyseMarketplace(rez, village, 1, 1)

    if (!rez.error) {
        let doc = createDocument(rez.document)
        let r1 = doc.getElementById("r1");
        let r2 = doc.getElementById("r2");
        let r3 = doc.getElementById("r3");
        let r4 = doc.getElementById("r4");
        let xCoordInput = doc.getElementById("xCoordInput");
        let yCoordInput = doc.getElementById("yCoordInput");
        let submitbutton = doc.getElementById("enabledButton");
        let idd = doc.getElementById("id")
        let t1 = doc.getElementById("t")
        let ajaxToken = rez.ajaxToken;


        if (r1 && r2 && r3 && r4 && xCoordInput && yCoordInput && submitbutton && idd && t1) {

            let data = "cmd=prepareMarketplace&r1=" + wood + "&r2=" + clay + "&r3=" + iron + "&r4=" + crop + "&dname=&x=" + tradeTask.x + "&y=" + tradeTask.y + "&id=" + idd.value + "&t=" + t1.value + "&x2=1&ajaxToken=" + ajaxToken;
            //this.log.debug("found inputs:", data)
            rez = await request(this.store.Player.url + "/ajax.php?cmd=prepareMarketplace", data, "POST", {
                "Referer": rez.responseURL,
                "Accept":"application/json, text/javascript, */*; q=0.01",
                "X-Request":"JSON",
                "X-Requested-With":"XMLHttpRequest",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
            })
            //console.log("rez1",rez)
            let resobj = JSON.parse(rez.document)
            console.log("rez1",resobj)
            if (resobj.response.error||resobj.response.data.errorMessage) {
                console.log("error",resobj,rez.document)
                rez.success = false
                rez.error = true
                rez.errorMessage = "Failed to send resources (post1)."
                rez.name = village.name
                return rez
            }

            let doc = createDocument(resobj.response.data.formular)

            let idd2 = doc.getElementById("id")
            let aaa = doc.getElementById("a")
            let sz = doc.getElementById("sz")
            let kid = doc.getElementById("kid")
            let c = doc.getElementById("c")
            let x2 = doc.getElementById("x2")
            let t2 = doc.getElementById("t")

            data = "cmd=prepareMarketplace&t=" + t2.value + "&id=" + idd2.value + "&a=" + aaa.value + "&sz=" + sz.value + "&kid=" + kid.value + "&c=" + c.value + "&x2=" + x2.value + "&r1=" + resources["1"] + "&r2=" + resources["2"] + "&r3=" + resources["3"] + "&r4=" + resources["4"] + "&ajaxToken=" + ajaxToken;
            

            rez = await request(this.store.Player.url + "/ajax.php?cmd=prepareMarketplace", data, "POST", {
                "Referer": rez.responseURL
            })
            resobj = JSON.parse(rez.document)
            if (resobj.response.error||resobj.response.data.errorMessage) {
                console.log("error",resobj,rez.document)
                rez.success = false
                rez.error = true
                rez.errorMessage = "Failed to send resources (post2)."
                rez.name = village.name
                return rez
            }
            //console.log("rez2",rez)
            sucessfulTrade(tradeTask, village,resources)
        }

    }

    return rez;
}

exports.train = async function (village, trainTask, resources, building, attempts) {
    if (!attempts)
    {
        attempts=1
    }
    let troop = trainTask.type + ""
    troop = troop[troop.length - 1] * 1

    //

    //this.log.debug("troop train started")

    if (attempts > 3) {
        this.log.debug("more than 3 attempts.")
        return {
            error: true,
            errorMessage: "More than 3 attempts have been made.",
            fail: true
        }
    }
    //console.log(village, trainTask, resources, building, attempts)
    let rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php", "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);

    //
    if (rez.villageId != village.villageId) {
        rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": rez.responseURL,
        }, 1);
    }
    //
    //console.log(village, trainTask, resources, building, attempts)
    /*t=trainTask.type%10
    
    let buildingType=0
    if (t == 1 || t == 2 || t == 3) {
        buildingType = 19;
    } else if (t == 4 || t == 5 || t == 6 || t == 7) {
        buildingType = 20;
    } else if (t == 8 || t == 9) {
        buildingType = 21;
    }

    for (let b = 0; b < village.buildings.length; b++) {
        if (village.buildings[b].buildingType == buildingType) {
            building = village.buildings[b];
            break
        }
    }*/
    let page="";
    if(building.buildingType===25||building.buildingType===26)page="s=1&";
    rez = await requestAndAnalyse(this.store.Player.url + "/build.php?"+page+"id=" + building.locationId, "", "GET", {
        "Referer": rez.responseURL
    }, 1);

    if (rez.villageId != village.villageId) {
        //this.log.debug("wrong villageId retray")
        return await this.train(village, trainTask, resources, building, attempts + 1)
    }
    let doc = createDocument(rez.document)
    let obrazec = doc.getElementsByName("snd");
    let obrazec2;
    for (let i = 0; i < obrazec.length; i++) {
        if (obrazec[i].getAttribute("style") == undefined) {
            obrazec2 = obrazec[i];
            break;
        } else if (obrazec[i].getAttribute("style").indexOf("display:none") == -1 && obrazec[i].getAttribute("style").indexOf("display: none") == -1) {
            obrazec2 = obrazec[i];
            break;
        }
    }
    
    if (!obrazec2) {
        //
        return {
            error: true,
            errorMessage: "Unable to find form to train units",
            fail: true
        }
    }
    //
    let inputi = obrazec2.getElementsByTagName("input");
    let data = "";
    for (let i = 0; i < inputi.length; i++) {
        if (data != "") {
            data += "&";
        }


        if (inputi[i].getAttribute("name") == undefined) {} else if (inputi[i].getAttribute("name").indexOf("t") > -1) {
            let enota = inputi[i].getAttribute("name").match(/[\d\.]+/g)[0] * 1;
            if (enota == troop) {
                data += inputi[i].getAttribute("name") + "=" + trainTask.amount;
            } else {
                data += inputi[i].getAttribute("name") + "=0";
            }
        } else {
            data += inputi[i].getAttribute("name") + "=" + inputi[i].getAttribute("value");
        }
    }
    data += "&s1=ok";
    //
    rez = await requestAndAnalyse(this.store.Player.url + "/build.php"+"?id=" + building.locationId, data, "POST", {
        "Referer": rez.responseURL,
        "Content-Type": "application/x-www-form-urlencoded",
    }, 1);
    //this.log.debug("troop train done",data)
    //
    rez.success = true;
    return rez
}

exports.farm = async function (village, FarmTask, farm) {
    return await farm2(village, FarmTask, farm, 1)
}

exports.getGoldClubFarmlists = async function (parameters) {
    //this.log.debug(parameters)
    this.store.Player.goldClubFarmlists = []
    let rez = await goToGoldclubPage(1)
    if (rez.error) {
        return rez
    }
    let farmlists = getAllFarmlists(rez)
    this.store.Player.goldClubFarmlists = farmlists;
    //
    return farmlists;
}

exports.coppyFarmlist = async function (village, farmlist, name, copyStatus) {
    
    //copyStatus:{value:0} //status of copy progress in 1-100
    //farmlist={"goldClubFarmlist":false,"movementType":"4","amount":{"1":"2","2":0,"3":0,"4":0,"5":0,"6":0,"7":0,"8":0,"9":0,"10":0,"11":0},"time":1515181470106,"villages":[{"villageId":"537182212","name":"Dino3","population":"147","type":"0","hasActiveTreasury":false,"x":4,"y":9,"lastReport":{},"player":{"name":"Angels","tribeId":"3","kingdomRole":"0","kingStatus":false,"kingdomId":"52","kingId":347,"spawnedOnMap":"1512479336","active":"1","id":"154","ally":{"id":"52","name":"EMC"}},"distance":9.848857801796104},{"villageId":"537018359","name":"/2/Etzelburg","population":"316","type":"0","hasActiveTreasury":false,"x":-9,"y":4,"lastReport":{},"player":{"name":"DietrichvonBern","tribeId":"3","kingdomRole":"0","kingStatus":false,"kingdomId":"5","kingId":124,"spawnedOnMap":"1512481831","active":"1","id":"318","ally":{"id":"5","name":"Clouds"}},"distance":9.848857801796104}],"farmPosition":0,"timeMinutes":10,"selectedFarmlist":{"listId":"0","listName":"","lastSent":"0","lastChanged":0,"units":{"1":"0","2":"0","3":"0","4":"0","5":"0","6":"0"},"orderNr":"0","villageIds":[],"entryIds":[],"isDefault":true,"maxEntriesCount":10}}
    //this.log.debug(village, farmlist, name, copyStatus)
    return await coppyFarmlist2(village, farmlist, name, copyStatus, 1)

}


let coppyFarmlist2 = async function (village, farmlist, name, copyStatus, attempts)
{
    let villages=farmlist.villages/*[{
        distance: 1,
        hasActiveTreasury: false,
        lastReport: {},
        name: " jure3004",
        player: {},
        population: 284,
        type: "1",
        villageId: 300111,
        x: 136,
        y: 26,
    },
    {
        distance: 1,
        hasActiveTreasury: false,
        lastReport: {},
        name: " jure3001",
        player: {},
        population: 284,
        type: "1",
        villageId: 300111,
        x: 138,
        y: 25,
    }]*/
    
    let totalRequests = 2 + villages.length;
    let requestNumber = 0;
    let rez1=await goToGoldclubPage(attempts,village)
    let ref=rez1.responseURL
    requestNumber++;
    copyStatus.value = Math.round(requestNumber / totalRequests * 100);
    let ret=await createNewFarmlist (village, farmlist, name, copyStatus, rez1, attempts)
    if(ret.fail)
    {
        return false
    }
    let lid=ret.lid
    //console.log(lid)
    requestNumber++;
    copyStatus.value = Math.round(requestNumber / totalRequests * 100);
    for (let i=0;i<villages.length;i++)
    {
        ret=await addFarmToGoldclubFarmlist (lid, villages[i].x, villages[i].y, farmlist.amount, rez1, attempts)
        requestNumber++;
        copyStatus.value = Math.round(requestNumber / totalRequests * 100);
    }
    
    return true
}.bind(this)

let addFarmToGoldclubFarmlist = async function (lid, x, y, troops, rez1, attempts)
{
    let ref=rez1.responseURL
    let rez = await request(this.store.Player.url + "/ajax.php?cmd=raidList", "cmd=raidList&method=ActionAddSlotForm&listId="+lid+"&weAreAdding=&x=&y=&context=rallyPoint&ajaxToken="+rez1.ajaxToken, "POST", {
        "Referer": ref,
        //":authority":this.store.Player.server2,
        //":method": "POST",
        //":path": "/ajax.php?cmd=raidList",
        //":scheme": "https",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-request": "JSON",
        "x-requested-with": "XMLHttpRequest"
    }, 0);
    //console.log("prvi rez",rez)
    rez = await request(this.store.Player.url + "/ajax.php?cmd=raidList", "cmd=raidList&method=ActionAddSlot&listId="+lid+"&slotId=&x="+x+"&y="+y+"&t1="+troops["1"]+"&t2="+troops["2"]+"&t3="+troops["3"]+"&t4="+troops["4"]+"&t5="+troops["5"]+"&t6="+troops["6"]+"&t7="+troops["7"]+"&t8="+troops["8"]+"&t9="+troops["9"]+"&t10="+troops["10"]+"&ajaxToken="+rez1.ajaxToken, "POST", {
        "Referer": ref,
        //":authority":this.store.Player.server2,
        //":method": "POST",
        //":path": "/ajax.php?cmd=raidList",
        //":scheme": "https",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-request": "JSON",
        "x-requested-with": "XMLHttpRequest"
    }, 0,0,0);
    //console.log("drugi rez",rez)
    rez = await request(this.store.Player.url + "/ajax.php?cmd=raidListSlots", "cmd=raidListSlots&lid="+lid+"&sort=distance&direction=asc&ajaxToken="+rez1.ajaxToken, "POST", {
        "Referer": ref,
        //":authority":this.store.Player.server2,
        //":method": "POST",
        //":path": "/ajax.php?cmd=raidList",
        //":scheme": "https",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-request": "JSON",
        "x-requested-with": "XMLHttpRequest"
    }, 0,0,0);
    //console.log("tretji rez",rez)
    return true
}.bind(this)

let createNewFarmlist = async function (village, farmlist, name, copyStatus, rez1, attempts)
{
    let totalRequests = 3 + farmlist.villages.length;
    let requestNumber = 0;
    //let rez1=await goToGoldclubPage(attempts,village)
    let ref=rez1.responseURL
    requestNumber++;
    copyStatus.value = Math.round(requestNumber / totalRequests * 100);
    let rez = await request(this.store.Player.url + "/ajax.php?cmd=raidList", "cmd=raidList&method=actionAddListForm&ajaxToken="+rez1.ajaxToken, "POST", {
        "Referer": ref,
        //":authority":this.store.Player.server2,
        //":method": "POST",
        //":path": "/ajax.php?cmd=raidList",
        //":scheme": "https",
        "accept": "application/json, text/javascript, */*; q=0.01",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "x-request": "JSON",
        "x-requested-with": "XMLHttpRequest"
    }, 0);
    let retobj = JSON5.parse(rez.document)
    
    if (retobj.response)
    {   
        if (retobj.response.error)
        {
            return {"fail":true}
        }
        if (retobj.response.data)
        {
            if(retobj.response.data.html)
            {
                /*console.log(retobj.response.data.html)request(url, data, type, headers, addwindowsize);
                let doc = createDocument(retobj.response.data.html)
                let obrazec = doc.getElementsByName("snd");*/
                rez = await request(this.store.Player.url + "/ajax.php?cmd=raidList", "did="+village.villageId+"&listName="+encodeURI(name)+"&cmd=raidList&method=actionAddList&ajaxToken="+rez1.ajaxToken, "POST", {
                    "Referer": ref,
                    //":authority":this.store.Player.server2,
                    //":method": "POST",
                    //":path": "/ajax.php?cmd=raidList",
                    //":scheme": "https",
                    "accept": "application/json, text/javascript, */*; q=0.01",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "x-request": "JSON",
                    "x-requested-with": "XMLHttpRequest"
                }, 0);
                retobj = JSON5.parse(rez.document)
                if (retobj.response)
                {   
                    if (retobj.response.error)
                    {
                        return {"fail":true}
                    }
                }
                else
                {
                    return {"fail":true}
                }
                rez = await requestAndAnalyse(ref, "", "GET", {
                    "Referer": ref
                }, 1);
                return getMaxLid(rez)

            }
        }        
    }
    else
    {
        return {"fail":true}
    }
    return {"fail":true}
}.bind(this)

let getMaxLid = function(rez)
{
    let doc=rez.doc
    let alllids=doc.getElementsByName("lid")
    let maxlid=0
    for (let i=0;i<alllids.length;i++)
    {
        let thislid=alllids[i].value*1
        if(thislid+""!="NaN")
        {
            maxlid=Math.max(maxlid,thislid)
        }
    }
    return {"fail":false,"lid":maxlid,"rez":rez}
}

//{"listId":"1713","listName":"Startup farm list","lastSent":"0","lastChanged":1514720188,"units":{"1":"0","2":"3","3":"0","4":"0","5":"0","6":"0"},"orderNr":"0","villageIds":["534691834","537509897","538329049"],"entryIds":["43559","43576","43575"],"isDefault":true,"maxEntriesCount":10}
exports.farmGoldClub = async function (village, farmlist) {
    //this.log.debug(village, farmlist, this.store.Player)
    //
    let rez = await goToGoldclubPage(1)
    if (rez.error) {
        rez.name = village.name
        return rez
    }
    let farmlists = getAllFarmlists(rez)
    this.store.Player.goldClubFarmlists = farmlists;
    let farmlistExist = false;
    //let currentFarmlist=
    for (let i = 0; i < farmlists.length; i++) {
        if (farmlists[i].listId == farmlist.selectedFarmlist.listId) {
            farmlist.selectedFarmlist = farmlists[i]
            farmlistExist = true;
            break;
        }
    }

    if (!farmlistExist) {
        return {
            error: true,
            errorMessage: "Farmlist does not exist.",
            name: village.name
        }
    }

    let parsedRaidData = getTroopData(rez.document)
    if (parsedRaidData.error) {
        return parsedRaidData
    }
    if (parsedRaidData[farmlist.selectedFarmlist.listId]) {
    } else {
        return {
            error: true,
            errorMessage: "No troop data for farmlist (" + farmlist.selectedFarmlist.listId + ").",
            name: village.name
        }
    }
    let troops = parsedRaidData[farmlist.selectedFarmlist.listId].troops

    let lid = farmlist.selectedFarmlist.listId;
    let doc = createDocument(rez.document)
    let formElement = doc.getElementById("list" + lid)
    formElement = createDocument(formElement.innerHTML)
    if (!formElement) {
        //
        return {
            error: true,
            errorMessage: "No form found.",
            name: village.name
        }
    }
    //
    let action = formElement.getElementsByName("action")
    if (!action.length) {
        return {
            error: true,
            errorMessage: "No form element <action> found.",
            name: village.name
        }
    }
    action = action[0].value
    let a = formElement.getElementsByName("a")
    if (!a.length) {
        return {
            error: true,
            errorMessage: "No form element <a> found.",
            name: village.name
        }
    }
    a = a[0].value
    let sort = formElement.getElementsByName("sort")
    if (!sort.length) {
        return {
            error: true,
            errorMessage: "No form element <sort> found.",
            name: village.name
        }
    }
    sort = sort[0].value
    let direction = formElement.getElementsByName("action")
    if (!direction.length) {
        return {
            error: true,
            errorMessage: "No form element <direction> found.",
            name: village.name
        }
    }
    direction = direction[0].value
    let data = "action=" + action + "&a=" + a + "&sort=" + sort + "&direction=" + direction + "&lid=" + lid;
    //
    if (farmlist.farmPosition >= farmlist.selectedFarmlist.farms.length) {
        farmlist.farmPosition = 0
    }
    let poslji = false;
    nrOfAttacks = 0
    for (let slot = farmlist.farmPosition; slot < farmlist.selectedFarmlist.farms.length; slot++) {
        let nadaljuj = true;
        for (let j = 1; j < 11; j++) {
            //
            troops[j] -= farmlist.selectedFarmlist.farms[slot].units[j] * 1
            if (troops[j] < 0) {
                nadaljuj = false;
                break;
            }
        }
        if (!nadaljuj) {
            break
        }
        data += "&slot%5B" + farmlist.selectedFarmlist.farms[slot].entryId + "%5D=on";
        poslji = true;
        farmlist.farmPosition = slot + 1
        nrOfAttacks += 1
        //
    }
    //
    if (nrOfAttacks == 0) {
        return {
            error: true,
            errorMessage: "Not enought troops to send any attack to farmlist.",
            name: village.name
        }
    }
    let rez2 = await requestAndAnalyse(this.store.Player.url + "/build.php?gid=16&tt=99", data, "POST", {
        "Referer": rez.responseURL
    }, 1);
    //
    rez2.success = true;
    rez2.message = "Attacks sent to " + nrOfAttacks + " farms."
    return rez2;
}

exports.search = async function (parameters) {
    this.store.custom.farmfinder.progress = 0.0;
    this.store.custom.farmfinder.showProgress = true;
    this.store.custom.farmfinder.running = true;
    this.store.custom.farmfinder.stopped = false;
    //this.log.debug("search", parameters)

    let cropfinder = {
        x: parameters.Coordinates.x * 1,
        y: parameters.Coordinates.y * 1,
        mindistance: 0,
        maxdistance: parameters.Coordinates.distance * 1,
		farme:true,
		c9c15: false,
		c9: false,
        c15: false,
        /*maxvillagepop: document.getElementById("MaxVillagePop").value * 1,
        maxplayerpop: document.getElementById("MaxPlayerPop").value * 1,
        maxnumberofvillages: document.getElementById("MaxPlayerVillages").value * 1,
        link: document.getElementById("CropFinderLink").innerHTML,
        findfarms: CropFinderFarme,
        getreports: GetFarmsReports,
        reports: AnalyseFarmsReports,
        advancedfarmfinder: document.getElementById("AdvancedFarm").checked,
        c9c15: CropFinderc9c15,
        
        farme: CropFinderFarme,
        oaze: CropFinderOases,
        vseoaze: VseOaze,
        sloni: Sloni,
        krokodili: Krokodili,
        prazneoaze: PrazneOaze,
        prosteoaze: ProsteOaze2,
        oazeles: PrazneOazeLes,
        oazeglina: PrazneOazeGlina,
        oazezelezo: PrazneOazeZelezo,
        oazezito: PrazneOazeZito,
        natars: Natars,
        onlynatars: OnlyNatars*/
    }
    //parameters.Coordinates={x:1,y:1,distance:10}
    //custom.FarmFinderFarms.push.apply(found farms);

    let kvadrati = UstvariIskanja(cropfinder)
    //this.log.debug("kvadrati", kvadrati)
    let rez = await requestAndAnalyse(this.store.Player.url + "/karte.php?x=" + cropfinder.x + "&y=" + cropfinder.y, "", "GET", {
        "Referer": parameters.url + "/dorf1.php"
    }, 1);
    //this.log.debug("rez", rez)
    let ajaxToken = rez.ajaxToken;
    let farme = []
    //
    kvadrati = kvadrati.sort(function (a, b) {
        return (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0);
    });

    //
    let success = true
    for (let i = 0; i < kvadrati.length; i++) {
        if (this.store.custom.farmfinder.stopped) {
            break;
        }
        let farme1 = await AnalizirajKvadrateT4(kvadrati[i], cropfinder, ajaxToken, 1)
        if (farme1.error) {
            break;
        }
        farme = farme.concat(farme1)
        this.store.custom.farmfinder.progress = round((i + 1) / kvadrati.length * 100, 2)
    }
    this.store.custom.farmfinder.showProgress = false;
    //


    this.store.custom.FarmFinderFarms.push.apply(this.store.custom.FarmFinderFarms, farme);
    this.store.custom.farmfinder.running = false;
    return success;
}

exports.cropFind = async function (parameters) {
    this.store.custom.farmfinder.progress = 0.0;
    this.store.custom.farmfinder.showProgress = true;
    this.store.custom.farmfinder.running = true;
    this.store.custom.farmfinder.stopped = false;
    //this.log.debug("search", parameters)

    let cropfinder = {
        x: parameters.Coordinates.x * 1,
        y: parameters.Coordinates.y * 1,
        mindistance: 0,
        maxdistance: parameters.Coordinates.distance * 1,
		farme:false,
		c9c15: true,
		c9: true,
        c15: true,
        /*maxvillagepop: document.getElementById("MaxVillagePop").value * 1,
        maxplayerpop: document.getElementById("MaxPlayerPop").value * 1,
        maxnumberofvillages: document.getElementById("MaxPlayerVillages").value * 1,
        link: document.getElementById("CropFinderLink").innerHTML,
        findfarms: CropFinderFarme,
        getreports: GetFarmsReports,
        reports: AnalyseFarmsReports,
        advancedfarmfinder: document.getElementById("AdvancedFarm").checked,
        c9c15: CropFinderc9c15,
        c9: CropFinderc9,
        c15: CropFinderc15,
        farme: CropFinderFarme,
        oaze: CropFinderOases,
        vseoaze: VseOaze,
        sloni: Sloni,
        krokodili: Krokodili,
        prazneoaze: PrazneOaze,
        prosteoaze: ProsteOaze2,
        oazeles: PrazneOazeLes,
        oazeglina: PrazneOazeGlina,
        oazezelezo: PrazneOazeZelezo,
        oazezito: PrazneOazeZito,
        natars: Natars,
        onlynatars: OnlyNatars*/
    }
    //parameters.Coordinates={x:1,y:1,distance:10}
    //custom.FarmFinderFarms.push.apply(found farms);

    let kvadrati = UstvariIskanja(cropfinder)
    //this.log.debug("kvadrati", kvadrati)
    let rez = await requestAndAnalyse(this.store.Player.url + "/karte.php?x=" + cropfinder.x + "&y=" + cropfinder.y, "", "GET", {
        "Referer": parameters.url + "/dorf1.php"
    }, 1);
    //this.log.debug("rez", rez)
    let ajaxToken = rez.ajaxToken;
    let farme = []
    //
    kvadrati = kvadrati.sort(function (a, b) {
        return (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0);
    });

    //
    let success = true
    for (let i = 0; i < kvadrati.length; i++) {
        if (this.store.custom.farmfinder.stopped) {
            break;
        }
        let farme1 = await AnalizirajKvadrateT4(kvadrati[i], cropfinder, ajaxToken, 1)
        if (farme1.error) {
            break;
        }
        farme = farme.concat(farme1)
        this.store.custom.farmfinder.progress = round((i + 1) / kvadrati.length * 100, 2)
    }
    this.store.custom.farmfinder.showProgress = false;
    //


    this.store.custom.FarmFinderFarms.push.apply(this.store.custom.FarmFinderFarms, farme);
    this.store.custom.farmfinder.running = false;
    return success;
}

exports.build = async function (village, villageBuilding, buildTask) {
    //this.log.debug('T4build start', villageBuilding, buildTask);
    let url = this.store.Player.url + "/dorf1.php"
    if (!villageBuilding) {
        villageBuilding = {
            locationId: buildTask.locationId,
            toLvl: buildTask.toLvl
        }
    }
    if (villageBuilding.locationId > 18) {
        url = this.store.Player.url + "/dorf2.php"
    }
    //this.log.debug('url', url, this.store.Player);
    let rez = await requestAndAnalyse(url, "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);
    rez = await build2(village, villageBuilding, rez, 0, url, buildTask)
    //this.log.debug('T4build done');
    return rez;
}

exports.onRouted = async function (selectedVillage, router, type) {


    //reffer to main.js->routes for types
    switch (type) {
        case "build":
            analyseBuildRouter(selectedVillage, router);
            break;
        case "trade":

            break;
    }
    return true;
}

const analyzeDorf1 = async function (village, withouterrorhandler) {

    let rez = await requestAndAnalyse(this.store.Player.url + "/dorf1.php", "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);

    if (rez.villageId != village.villageId) {
        rez = await requestAndAnalyse(this.store.Player.url + "/dorf1.php?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": rez.responseURL
        }, 1);
    }
    return rez
}.bind(this)

const analyzeDorf2 = async function (village, withouterrorhandler) {

    let rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php", "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);

    if (rez.villageId != village.villageId) {
        rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": rez.responseURL
        }, 1);
    }
    return rez
}.bind(this)

const analyzeMarketplace = async function (village, withouterrorhandler) {

    let rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php", "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);

    rez = await AnalyseMarketplace(rez, village, 1, withouterrorhandler)
    return rez
}.bind(this)

exports.analyzePlayer = async function () {

    let timeNow = new Date()
    timeNow = timeNow.getTime()
    //this.log.debug('T4analyzePlayer start', this.store.Player);
    updateResources()

    let ret = {
        T4: true,
        success: true,
        analysedDorf1: [],
        analysedDorf2: [],
        analysedMarketplace: [],
    }
    let tradevillages = getAllVillagesWithTrade();
    
    for (let i = 0; i < this.store.Player.villages.length; i++) {
        let village = this.store.Player.villages[i]

        if (village.CASANALIZEGRADNJA1 < timeNow) {
            let dorf1task = false;
            for (let j = 0; j < village.tasks.build.length; j++) {
                if (village.tasks.build[j].buildingType * 1 <= 4 || village.tasks.build[j].buildingType * 1 == 46) {
                    dorf1task = true;
                    break;
                }
            }
            if (dorf1task) {
                let rez = await analyze.analyzeDorf1(village, 1)

                ret.analysedDorf1.push({
                    village: village,
                    time: new Date().getTime()
                });
                //this.log.debug('rez', rez);
                //this.log.debug('T4analyzePlayer dorf1 done', this.store.Player);
            }
        }

        if (village.CASANALIZEGRADNJA2 < timeNow) {
            let dorf2task = false;
            for (let j = 0; j < village.tasks.build.length; j++) {
                if (village.tasks.build[j].buildingType * 1 > 4 & village.tasks.build[j].buildingType * 1 != 46) {
                    dorf2task = true;
                    break;
                }
            }
            if(village.tasks.farms.length>0){
                dorf2task = true;
            }
            if(village.tasks.trade.length>0){
                dorf2task = true;
            }
            if(village.tasks.train.length>0){
                dorf2task = true;
            }
            if (dorf2task) {
                let rez = await analyze.analyzeDorf2(village, 1)
                ret.analysedDorf2.push({
                    village: village,
                    time: new Date().getTime()
                });
               // this.log.debug('rez', rez);
                //this.log.debug('T4analyzePlayer dorf2 done', this.store.Player);
            }
        }

        if (village.CASANALIZETRZNICA < timeNow) {
            let maketplacetask = tradevillages.indexOf(village) > -1;

            if (maketplacetask) {
                let rez = await analyze.analyzeMarketplace(village, 1)
                ret.analysedMarketplace.push({
                    village: village,
                    time: new Date().getTime()
                });
                //this.log.debug('rez', rez);
                //this.log.debug('T4analyzePlayer dorf2 done', this.store.Player);
            }
        }


        if (village.FildFinishTime < timeNow) {
            //this.log.debug('BuildingQueue', 1, village.FildFinishTime, timeNow);
            village.FildFinishTime = 99999999999999
            if (this.store.Player.tribeId != 1) {
                village.BuildingQueue["1"] = 1
            }
            village.BuildingQueue["2"] = 1
        }
        if (village.BuildingFinishTime < timeNow) {
            village.BuildingFinishTime = 99999999999999
            if (this.store.Player.tribeId != 1) {
                village.BuildingQueue["2"] = 1
            }
            village.BuildingQueue["1"] = 1
        }

    }

    return ret;
}


preveriRequest = function (rez) {
    if (rez) {
        if (rez.document) {
            return true
        }
    }
    return false
}.bind(this)

const ananalizirajNaselje = function (doc, url, originalDocText, rez) {
    //let Player=v//.Player
    let timeNow = new Date();
    let server2 = url.split("/")[2];
    this.store.Player.server2 = server2;
    if (!originalDocText) {
        try {
            originalDocText = doc.documentElement.innerHTML;
        } catch (err) {
            //this.log.debug("doc.documentElement.innerHTML is undefined", doc)
            originalDocText = "";
        }
    }
    if (server2.indexOf("travian") == -1) {
        //this.log.debug("url not travian page", url);
        return false;
    }
    pridobiVsaNaselja(doc)
    analizirajPlayer(doc)
    let villageid = pridobiActiveVillage(doc);
    //this.log.debug("rez med analizo:", rez);
    rez.villageId = villageid;
    //let village = this.store.Player.getVillage(villageid);
    let village = this.store.Player.villages.find(v=>v.villageId===villageid);
    if (!village) {
        //this.log.debug("Village not found:", [villageid, village]);
        return false;
    } else {
        analizirajPolja(doc, village, url)
        analizirajZgradbe(doc, village, url)
        analizirajGradnje(doc, village, url)
    }

    //this.log.debug('Polja:',polja);
    
    analizirajSurovine(doc, village, originalDocText)
    analizirajHero(doc, village, originalDocText, url)
    AnalizirajTrznico(doc, village, originalDocText, url)
    let buildimage = doc.evaluate(".//div[@id='build']//img[contains(@class,'build_logo ')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log("buildimage.snapshotLength",buildimage.snapshotLength)
    if(buildimage.snapshotLength)
    {
        let buildingname=buildimage.snapshotItem(0).getAttribute("class").match(/[\d\.]+/g)
        //console.log("buildingname",buildingname)
        if (buildingname.length)
        {
            rez.buildingid=buildingname[0] * 1;
        }
        
    }
    //this.log.debug("Village po analizi:", village);


    return true;
}.bind(this)

exports.adventure = async function () {
    let url = this.store.Player.url + "/hero.php?t=3"
    let rez = await requestAndAnalyse(url, "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);

    if (this.store.Player.hero.status == 0 && this.store.Player.hero.adventurePoints * 1 > 0) {
        let doc = createDocument(rez.document)
        let movetime = doc.evaluate(".//form[@id='adventureListForm']//tr[contains(@id,'adventure')]//td[@class='moveTime']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        let link = doc.evaluate(".//form[@id='adventureListForm']//tr[contains(@id,'adventure')]//td[@class='goTo']//a[@class='gotoAdventure arrow']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        if (movetime.snapshotLength && link.snapshotLength) {
            let url2 = this.store.Player.url + "/" + link.snapshotItem(0).getAttribute("href")
            let cas = link.snapshotItem(0).innerHTML.split(":");
            let rez = await requestAndAnalyse(url2, "", "GET", {
                "Referer": url
            }, 1);
            let doc = createDocument(rez.document)
            let send = doc.getElementsByName("send")
            let kid = doc.getElementsByName("kid")
            let from = doc.getElementsByName("from")
            let a = doc.getElementsByName("a")
            let start = doc.getElementsByName("start")
            let url3 = this.store.Player.url + "/start_adventure.php"
            if (send.length == 0 || kid.length == 0 || from.length == 0 || a.length == 0) {
                this.store.Player.hero.time = new Date().getTime() + randomXToY(this.store.Player.INTERVALHERO * 60000 * (1 - this.store.Player.deviation), this.store.Player.INTERVALHERO * 60000 * (1 + this.store.Player.deviation));
                return false
            }
            let data = "send=" + encodeURIComponent(send[0].value) + "&kid=" + encodeURIComponent(kid[0].value) + "&from=" + encodeURIComponent(from[0].value) + "&a=" + encodeURIComponent(a[0].value) //+"&start="+encodeURIComponent(start[0].value).split("%20").join("+")
            rez = await requestAndAnalyse(url3, data, "POST", {
                "Referer": url2
            }, 1, false)
            doc = createDocument(rez.document)
            let herostatus50 = doc.getElementsByClassName("heroStatus50")
            if (herostatus50.length) {
                this.store.Player.hero.time = new Date().getTime() + (cas[0] * 3600000 + cas[1] * 60000 + cas[2] * 1000) * 2 + randomXToY(5000, 15000);
                return true
            }

            this.store.Player.hero.time = new Date().getTime() + randomXToY(this.store.Player.INTERVALHERO * 60000 * (1 - this.store.Player.deviation), this.store.Player.INTERVALHERO * 60000 * (1 + this.store.Player.deviation));
            return false
        } else {
            this.store.Player.hero.adventurePoints = 0;
            this.store.Player.hero.time = new Date().getTime() + randomXToY(this.store.Player.INTERVALHERO * 60000 * (1 - this.store.Player.deviation), this.store.Player.INTERVALHERO * 60000 * (1 + this.store.Player.deviation));
            return false
        }
    } else {
        this.store.Player.hero.time = new Date().getTime() + randomXToY(this.store.Player.INTERVALHERO * 60000 * (1 - this.store.Player.deviation), this.store.Player.INTERVALHERO * 60000 * (1 + this.store.Player.deviation));
    }
    //this.log.debug("send hero to advanture")
    return true;
}

const checkLastLogs = function () {
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
    //this.log.debug("numberOfFails", numberOfFails)
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

const preveriLogin = function (doc) {
    //this.log.debug("doc.getElementsByName('login').length", doc.getElementsByName('login').length)
    if (doc.getElementsByName('login').length != 0) {
        let ex = ".//input[@value='login']";
        let tag = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        ex = ".//button[@type='submit']";
        let tag1 = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        ex = ".//input[@type='password']"; // and contains(@value, '*')
        let tag2 = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        ex = ".//div[@class='error LTR']"; // and contains(@value, '*')
        let tag223 = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        let dovoljenlogin = true;
        if (tag223.snapshotLength > 0) {
            for (let i = 0; i < tag223.snapshotLength; i++) {
                if (tag223.snapshotItem(i).innerHTML.length > 14) {
                    dovoljenlogin = false;
                    break;
                }
            }
        }
        if (tag.snapshotLength > 0 && tag2.snapshotLength > 0 && dovoljenlogin) {
            if (tag2.snapshotItem(0).value != "") {
                let loginButton = tag.snapshotItem(0);
                return false;
            }
        } else if (tag1.snapshotLength && tag2.snapshotLength && dovoljenlogin) {
            if (tag2.snapshotItem(0).value != "") {
                let loginButton = tag1.snapshotItem(0);
                return false;
            } else {
                return false;
            }
        } else {
            return false;
        }
        return false;
    } else {
        return true;
    }

}.bind(this)

const createDocument = function (res) {
    let parser = new DOMParser();
    return parser.parseFromString(res, "text/html");
}

const goToGoldclubPage = async function (attempts) {
    let rez = {}
    if (attempts > 3) {
        rez.success = false
        rez.error = true
        rez.errorMessage = "More than 3 attempts to get farmlists."
        return rez
    }
    rez = await requestAndAnalyse(this.store.Player.url + "/build.php?id=39", "", "GET", {
        "Referer": this.store.Player.url + "/dorf2.php"
    }, 1);
    if (!rez.activeTab && rez.activeTab != 0) {
        rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php?id=39", "", "GET", {
            "Referer": this.store.Player.url + "/dorf1.php?newdid=" + village.villageId + "&"
        }, 1);
        return await goToGoldclubPage(attempts + 1)
    }
    if (rez.activeTab != 99) {
        rez = await requestAndAnalyse(this.store.Player.url + "/build.php?tt=99&id=39", "", "GET", {
            "Referer": rez.responseURL
        }, 1);
    }
    return rez
}.bind(this)

const getTroopData = function (rezhtml) {
    let raidData = rezhtml.split("Travian.Game.RaidList.setData(")
    if (raidData.length > 1) {
        raidData = raidData[1].split(");")[0]
    } else {
        return {
            error: true,
            errorMessage: "No troop data for farmlists."
        }
    }
    let parsedRaidData = JSON5.parse(raidData)

    return parsedRaidData
}.bind(this)

const getAllFarmlists = function (rez) {
    let doc = createDocument(rez.document)
    let farmlists1 = doc.evaluate(".//div[@id='raidList']//div[@class='listEntry' and contains(@id,'list')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //this.log.debug(farmlists1.snapshotLength)
    let farmlists = []
    let parsedRaidData = getTroopData(rez.document)
    //
    if (parsedRaidData.error) {
        return parsedRaidData
    }
    for (let i = 0; i < farmlists1.snapshotLength; i++) {
        let farmlistelement = farmlists1.snapshotItem(i)
        let lid = farmlistelement.getAttribute("id").match(/[\d\.]+/g)[0] * 1;
        let thisParsedRaidData = parsedRaidData[lid]
        if (!thisParsedRaidData) {
            continue
        }
        //

        let nroffarms1 = doc.evaluate(".//div[contains(@class,'listTitle')]//span[@class='raidListSlotCount']", farmlistelement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        let nrOfFarms = 0;
        let maxFarms = 100;
        if (nroffarms1.snapshotLength) {
            let nrrr = nroffarms1.snapshotItem(0).innerHTML.match(/[\d\.]+/g)
            if (nrrr.length > 1) {
                nrOfFarms = nrrr[0] * 1
                maxFarms = nrrr[1] * 1
            }
        }
        //
        let farmlistname = "Unknown"
        let farmlistname1 = doc.evaluate(".//div[contains(@class,'listTitle')]//div[@class='listTitleText']", farmlistelement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (farmlistname1.snapshotLength) {
            //this.log.debug(farmlistname1.snapshotItem(0).childNodes[0])
            farmlistname = farmlistname1.snapshotItem(0).childNodes[0].data.trim();
        }
        let farmsoffarmlist1 = doc.evaluate(".//div[contains(@class,'listContent')]//div[@class='detail']//table//tbody//tr[contains(@id,'slot-row')]", farmlistelement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        let farms = []
        for (let j = 0; j < farmsoffarmlist1.snapshotLength; j++) {
            let tafarmaelement = farmsoffarmlist1.snapshotItem(j)
            let slot_id = tafarmaelement.getAttribute("id").match(/[\d\.]+/g)[0] * 1;
            let farmname = ""
            let farmx = 0
            let farmy = 0
            let farmvillage1 = doc.evaluate(".//td[@class='village']//a", tafarmaelement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (farmvillage1.snapshotLength) {
                farmname = farmvillage1.snapshotItem(0).innerHTML.replace(/<[^>]*>/g, "").trim()
                farmx = farmvillage1.snapshotItem(0).getAttribute("href").split("x=")[1].split("&")[0] * 1
                farmy = farmvillage1.snapshotItem(0).getAttribute("href").split("y=")[1] * 1
            }
            let pop = tafarmaelement.getElementsByClassName("ew")[0].innerHTML.match(/[\d\.]+/g)[0] * 1;
            let distance = tafarmaelement.getElementsByClassName("distance")[0].innerHTML.match(/[\d\.]+/g)[0] * 1;
            let troopimg = tafarmaelement.getElementsByClassName("troopIcon")[0].getElementsByTagName("img")
            let troopspan = tafarmaelement.getElementsByClassName("troopIcon")[0].getElementsByTagName("span")
            let troops = {
                "1": 0,
                "2": 0,
                "3": 0,
                "4": 0,
                "5": 0,
                "6": 0,
                "7": 0,
                "8": 0,
                "9": 0,
                "10": 0,
                "11": 0,
            }
            /*for(let k=0;k<troopimg.length&&k<troopspan.length;k++)
            {
                let trooptype=troopimg[k].getAttribute("class").match(/[\d\.]+/g)[0]
                trooptype=trooptype[trooptype.length-1]
                troops[trooptype]=troopspan[k].innerHTML.match(/[\d\.]+/g)[0] * 1

                troops.push(thistroop)
            }*/
            let thisParsedRaidDataTroops = thisParsedRaidData.slots[slot_id]
            if (thisParsedRaidDataTroops) {
                troops = thisParsedRaidDataTroops.troops
            }
            //
            let lastradi1 = tafarmaelement.getElementsByClassName("lastRaid")[0]
            let lastRaid = {
                notificationType: 0,
                reportCarryType: "",
                raidedResSum: 0,
                capacity: 1,
                reportId: "",
                time: new Date().getTime()
            }
            if (lastradi1.childNodes.length > 1) {
                let reportimg = lastradi1.getElementsByTagName("img")
                let reporta = lastradi1.getElementsByTagName("a")
                if (reporta.length) {
                    lastRaid.reportId = reporta[0].getAttribute("href").split("id=")[1];
                    lastRaid.time = new Date(reporta[0].innerHTML.trim()).getTime();
                }
                if (reportimg.length > 1) {
                    lastRaid.notificationType = reportimg[0].getAttribute("class").match(/[\d\.]+/g)[0] * 1;
                    //this.log.debug(reportimg[0].getAttribute("class"))
                    lastRaid.reportCarryType = reportimg[1].getAttribute("class")
                    let carry = reportimg[1].getAttribute("alt").replace(".", "").match(/[\d\.]+/g)
                    if (carry.length) {
                        lastRaid.raidedResSum = carry[0] * 1;
                        if (carry.length > 1) {
                            lastRaid.capacity = carry[1] * 1;
                        }
                    }
                }
            }


            let thisfarm = {
                name: farmname,
                x: farmx,
                y: farmy,
                villageId: getCoordfromXY(farmx, farmy),
                entryId: slot_id,
                pop: pop,
                distance: distance,
                units: troops,
                report: lastRaid
            }
            //this.log.debug(thisfarm)
            farms.push(thisfarm)
            //
        }
        //this.log.debug(farms)
        let villageId = 0;
        let villagename = farmlistname.split("-")
        villagename.splice(villagename.length - 1, 1)
        villagename = villagename.join("-").trim()


        for (let j = 0; j < this.store.Player.villages.length; j++) {
            if (this.store.Player.villages[j].name.trim() == villagename) {
                villageId = this.store.Player.villages[j].villageId;
                break;
            }
        }
        farmlists.push({
            listId: lid,
            listName: farmlistname,
            farms: farms,
            //nrOfFarms:nrOfFarms,
            maxEntriesCount: maxFarms,
            villageId: villageId,
            requestTime: new Date().getTime()
        })
        //
        //
        //this.log.debug(lid,farmlistname)
    }
    /*let rez2 = await request(this.store.Player.url + "/ajax.php?cmd=raidListSlots", "cmd=raidListSlots&lid=2860&ajaxToken="+rez.ajaxToken, "POST", {
        "Referer": rez.responseURL,
        "Content-Type":"application/x-www-form-urlencoded",  
    },  1);*/
    //this.log.debug(JSON.stringify(farmlists, null, '\t'))
    //this.log.debug(farmlists)
    return farmlists
}.bind(this)




const farm2 = async function (village, FarmTask, farm, attempts) {
    if (attempts > 3) {
        //this.log.debug("more than 3 attempts.")
        return {
            error: true,
            fail: true
        }
    }

    let troops = FarmTask.amount
    let movementType = FarmTask.movementType
    //this.log.debug(village, FarmTask, farm, this.store.Player)
    //
    let rez = await requestAndAnalyse(this.store.Player.url + "/karte.php", "", "GET", {
        "Referer": this.store.Player.url + "/dorf1.php"
    }, 1);
    if (rez.villageId != village.villageId) {
        let oldvill = this.store.Player.getVillage(rez.villageId)
        let ref = this.store.Player.url + "/karte.php?x=" + village.x + "&y=" + village.y
        if (oldvill) {
            ref = this.store.Player.url + "/karte.php?x=" + oldvill.x + "&y=" + oldvill.y
        }
        rez = await requestAndAnalyse(this.store.Player.url + "/karte.php?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": ref
        }, 1);
    }
    //
    let x = farm.x + randomXToY(-3, 3)
    let y = farm.y + randomXToY(-3, 3)
    let rez1 = await request(this.store.Player.url + "/ajax.php?cmd=viewTileDetails", "cmd=viewTileDetails&x=" + farm.x + "&y=" + farm.y + "&ajaxToken=" + rez.ajaxToken, "POST", {
        "Referer": this.store.Player.url + "/karte.php?x=" + x + "&y=" + y,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Request": "JSON"
    })
    let DobljeniPodatki = JSON.parse(rez1.document)
    if (!DobljeniPodatki.response) {
        //this.log.debug("error")
        rez.fail = true;
        rez.failmessage = "Error1 occured."
        //
        return rez
    }

    if (DobljeniPodatki.response.error) {
        //this.log.debug("error")
        rez.fail = true;
        rez.success = false;
        rez.failmessage = "Error2 occured"
        //
        return rez
    }
    if (DobljeniPodatki.response.javascript) {
        //this.log.debug("error")
        rez.fail = true;
        rez.success = false;
        rez.failmessage = "Error3 occured"
        //
        return rez
    }
    if (DobljeniPodatki.response.data) {
        if (!DobljeniPodatki.response.data.html) {
            //this.log.debug("error")
            rez.fail = true;
            rez.success = false;
            rez.failmessage = "Error4 occured"
            //
            return rez
        }
    } else {
        //this.log.debug("error")
        rez.fail = true;
        rez.success = false;
        rez.failmessage = "Error5 occured"
        //
        return rez
    }

    let doc = createDocument(DobljeniPodatki.response.data.html)
    let farmlink = doc.evaluate(".//div[@id='tileDetails']//div[@class='options']//a[contains(@href,'build.php') and contains(@href,'id=39') and contains(@href,'tt=2')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (farmlink.snapshotLength == 0) {
        //this.log.debug("error")
        rez.fail = true;
        rez.success = false;
        rez.failmessage = "Error6 occured"
        //
        return rez
    }
    farmlink = this.store.Player.url + "/" + farmlink.snapshotItem(0).getAttribute("href")

    //
    rez = await requestAndAnalyse(farmlink, "", "GET", {
        "Referer": this.store.Player.url + "/karte.php?x=" + x + "&y=" + y,
    }, 1);
    if (rez.villageId != village.villageId) {
        let rez = await requestAndAnalyse(rez.responseURL + "?newdid=" + village.villageId + "&gid=16", "", "GET", {
            "Referer": rez.responseURL,
        }, 1);
    }
    //
    doc = createDocument(rez.document)
    let inputs = doc.getElementsByTagName("form")[0].getElementsByTagName("input");
    let data = "";
    let AnalysedC = false;
    let AnalysedT11 = false;
    //
    for (let i = 0; i < inputs.length; i++) {
        //this.log.debug(inputs[i].getAttribute("name"),data)
        //
        if (i > 0 && inputs[i].getAttribute("name") != "c" && inputs[i].getAttribute("name") != "redeployHero") {
            data += "&";
        }
        if (inputs[i].getAttribute("name") == "t11") {
            AnalysedT11 = true;
        }

        if (inputs[i].getAttribute("name").indexOf("t") > -1 && inputs[i].getAttribute("name").match(/[\d\.]+/g) != null) {
            let troop = inputs[i].getAttribute("name").match(/[\d\.]+/g)[0] * 1;
            let maxtroop = 0;

            if (inputs[i].getAttribute("class").indexOf("disabled") == -1) {
                maxtroop = inputs[i].nextSibling.nextSibling.getAttribute("onclick").split(inputs[i].getAttribute("name"))[1].split(".").join("").match(/[\d\.]+/g)[0] * 1;
            }
            if (troops[troop] * 1 <= maxtroop) {
                if (troops[troop] == 0) {
                    data += inputs[i].getAttribute("name") + "=";
                } else {
                    data += inputs[i].getAttribute("name") + "=" + troops[troop];
                }

            } else {
                //this.log.debug("premalo enot")
                rez.fail = true;
                rez.success = false;
                rez.failmessage = "Not enough troops."
                //
                return rez
            }
        } else if (inputs[i].getAttribute("name") == "c") {

            if (!AnalysedC) {
                if (i > 0) {
                    data += "&";
                }
                data += inputs[i].getAttribute("name") + "=" + movementType;
                AnalysedC = true;
            }
        } else if (inputs[i].getAttribute("name") == "redeployHero") {
            //data += inputs[i].getAttribute("name") + "=";
        } else {
            data += inputs[i].getAttribute("name") + "=" + inputs[i].getAttribute("value");
        }


    }
    /*if(AnalysedT11)
    {
        data += "&redeployHero=";
    }*/
    data += "&s1=ok";
    //
    rez = await requestAndAnalyse(this.store.Player.url + "/build.php?id=39&tt=2", data, "POST", {
        "Referer": rez.responseURL,
        "Content-Type": "application/x-www-form-urlencoded",
    }, 1);

    if (rez.villageId != village.villageId) {
        return await farm2(village, FarmTask, farm, attempts + 1)
    }
    doc = createDocument(rez.document)
    inputs = doc.getElementsByTagName("form")[0].getElementsByTagName("input");
    data = "";
    let Analysedspy = false;
    for (let i = 0; i < inputs.length; i++) {
        if (i > 0) {
            data += "&";
        }

        if (inputs[i].getAttribute("name") == "redeployHero") {
            data += inputs[i].getAttribute("name") + "=";
        } else if (inputs[i].getAttribute("name") == "spy") {
            if (!Analysedspy) {
                if (i > 0) {
                    data += "&";
                }
                if (task.att == 4) {
                    data += inputs[i].getAttribute("name") + "=1";
                } else if (task.att == 3) {
                    data += inputs[i].getAttribute("name") + "=2";
                }
                Analysedspy = true;
            }
        } else {
            data += inputs[i].getAttribute("name") + "=" + inputs[i].getAttribute("value");
        }
    }
    data += "&s1=ok";
    //
    rez = await requestAndAnalyse(this.store.Player.url + "/build.php?id=39&tt=2", data, "POST", {
        "Referer": rez.responseURL,
        "Content-Type": "application/x-www-form-urlencoded",
    }, 1);

    if (rez.villageId != village.villageId) {
        return await farm2(village, FarmTask, farm, attempts + 1)
    }
    rez.success = true;
    //
    return rez;
}.bind(this)

const sucessfulTrade = function (task, village,resources) {
    //console.log("sucessfulTrade",task)
    let cass = new Date();
    let vasVKateroPosiljam = GetVillageFromCoord(task.x, task.y)
    let casPotovanja = pridobiCasPotovanja(task, village);
    if (vasVKateroPosiljam) {
        let vracamke={
            "troopId": 0,
            "villageIdStart": 0,
            "playerNameStart": "",
            "villageNameStart": "",
            "villageIdTarget": vasVKateroPosiljam.villageId,
            "villageNameTarget": "",
            "playerNameTarget": "",
            "playerIdTarget": 0,
            "timeStart": 0,
            "timeFinish": cass.getTime() + casPotovanja + 1000,
            "movementType": 7,
            "resources": {
                "1": resources["1"],
                "2": resources["2"],
                "3": resources["3"],
                "4": resources["4"]
            },
            "treasures": 0,
            "spyTarget": 0,
            "catapultTarget1": 0,
            "catapultTarget2": 0,
            "culturePoints": 0,
            "coordinateID": 0,
            "merchants": 1,
            "recurrences": "1",
            "recurrencesTotal": "1"
        }
        vasVKateroPosiljam.troopsMoving.push(vracamke);
        console.log("vasVKateroPosiljam",vracamke["timeFinish"],vasVKateroPosiljam["name"],vasVKateroPosiljam.troopsMoving.length,vasVKateroPosiljam.troopsMoving[vasVKateroPosiljam.troopsMoving.length-1])
    }
    //console.log("cas potovanja",casPotovanja)
    //console.log("cas potovanja",casPotovanja)
    let sttrgovcev = Math.ceil((resources["1"] + resources["2"] + resources["3"] + resources["4"]) / (Math.max(1, village.Merchants.carry)));

    village.TRGOVCI.push({
        trgovci: sttrgovcev,
        time: cass.getTime() + casPotovanja * 2 + 1000
    });
    
    village.Merchants.merchantsFree = Math.max(0, village.Merchants.merchantsFree - sttrgovcev);
    village.Merchants.maxCapacity = village.Merchants.carry*village.Merchants.merchantsFree;

}.bind(this)

const GetVillageFromCoord = function (x, y) {
    for (let i = 0; i < this.store.Player.villages.length; i++) {
        if (this.store.Player.villages[i].x == x & this.store.Player.villages[i].y == y) {
            return this.store.Player.villages[i];
        }
    }
    return false;
}.bind(this)

const pridobiCasPotovanja = function (task, village) {
    let HitrostTehTrgovcev = village.Merchants.speed;
    let Razdalja = PridobiRazdaljo(parseFloat(task.x), parseFloat(task.y), parseFloat(village.x), parseFloat(village.y));
    let CasPotovanja = Math.ceil(Razdalja * 3600000 / (HitrostTehTrgovcev));
    return CasPotovanja;

}.bind(this)


exports.checkAnalyseBuildRouter = async function (selectedVillage) {
    let zdaj = new Date().getTime()
    if (this.store.selectedVillage.CASANALIZEGRADNJA1 < zdaj ||this.store.selectedVillage.CASANALIZEGRADNJA2 < zdaj) {
        return true
    }

    return false;
}.bind(this)

exports.analyseBuildRouter = async function (selectedVillage) {
    //console.log("analyseBuildRouter start")
    let zdaj = new Date().getTime()
    //this.log.debug(this.store.selectedVillage.CASANALIZEGRADNJA1, this.store.selectedVillage.CASANALIZEGRADNJA1 < zdaj);
    //this.log.debug(this.store.selectedVillage.CASANALIZEGRADNJA2, this.store.selectedVillage.CASANALIZEGRADNJA2 < zdaj);
    if (this.store.selectedVillage.CASANALIZEGRADNJA1 < zdaj) {
        await analyzeDorf1(selectedVillage, true);
    }

    if (this.store.selectedVillage.CASANALIZEGRADNJA2 < zdaj) {
        
        await analyzeDorf2(selectedVillage, true);
        //this.log.debug("dorf2 analysed");
    }

    
    return false;
}.bind(this)

const round = function (val, dec) {
    return Math.round(val * 10 ** dec) / 10 ** dec
}

const AnalizirajKvadrateT4 = async function (kvadrat, cropfinder, ajaxToken, attempts) {

    let farme = []
    if (attempts > 3) {
        //this.log.debug("more than 3 attempts.")
        return {
            error: true
        }
    }
    let takvadrat = kvadrat
    //
    let centerX = (takvadrat.xmin + takvadrat.xmax) / 2;
    let centerY = (takvadrat.ymin + takvadrat.ymax) / 2;
    let Naslov = this.store.Player.url + "/ajax.php?cmd=mapPositionData";
	//console.log("this.store.mapZoom",this.store.mapZoom)
    let data = "cmd=mapPositionData&data[x]=" + centerX + "&data[y]=" + centerY + "&data[zoomLevel]=" + this.store.mapZoom + "&ajaxToken=" + ajaxToken;
    let x = cropfinder.x;
    let y = cropfinder.y;
    let rez = await request(Naslov, data, "POST", {
        "Referer": this.store.Player.url + "/karte.php?x=" + cropfinder.x + "&y=" + cropfinder.y,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        "X-Request": "JSON"
    })


    if (!rez) {
        return await AnalizirajKvadrateT4(kvadrat, cropfinder, ajaxToken, attempts + 1)
    }
    if (rez.error) {
        return await AnalizirajKvadrateT4(kvadrat, cropfinder, ajaxToken, attempts + 1)
    }


    let DobljeniPodatki = JSON.parse(rez.document)

    if (DobljeniPodatki.response.error) {
        return await AnalizirajKvadrateT4(kvadrat, cropfinder, ajaxToken, attempts + 1)
    }
    if (DobljeniPodatki.response.javascript) {
        return await AnalizirajKvadrateT4(kvadrat, cropfinder, ajaxToken, attempts + 1)
    }
    let poljeObjektov = DobljeniPodatki.response.data.tiles;

    for (let aaa = 0; aaa < poljeObjektov.length; aaa++) {
        let PodatekX = poljeObjektov[aaa].position.x * 1;
        let PodatekY = poljeObjektov[aaa].position.y * 1;
        let PodatekC = poljeObjektov[aaa].title;
        let PodatekT = poljeObjektov[aaa].text;
        let PodatekD = poljeObjektov[aaa].did;
        let PodatekA = poljeObjektov[aaa].aid;
        let PodatekU = poljeObjektov[aaa].uid;
        let razdalja = PridobiRazdaljo(x, y, PodatekX * 1, PodatekY * 1);
        if (poljeObjektov[aaa].u) {
            //this.log.debug(poljeObjektov[aaa])
            //this.log.debug(PodatekT.indexOf("k.spieler"))
            //this.log.debug(PodatekT.indexOf("k.einwohner"))
        }
        if (razdalja < cropfinder.mindistance || razdalja > cropfinder.maxdistance) {
            continue;
        }

        if (takvadrat.omejitevxmax) {
            if (PodatekX > takvadrat.omejitevxmax) {
                continue;
            }
        }
        if (takvadrat.omejitevymax) {
            if (PodatekY > takvadrat.omejitevymax) {
                continue;
            }
        }
        if (takvadrat.omejitevxmin) {
            if (PodatekX < takvadrat.omejitevxmin) {

                continue;
            }
        }
        if (takvadrat.omejitevymin) {
            if (PodatekY < takvadrat.omejitevymin) {
                continue;
            }
        }

        if (PodatekC) {

            let Je15c = PodatekC.indexOf("f6}");
            let Je9c = PodatekC.indexOf("f1}");

            let JeIgralec = false;
            if (PodatekT) {
                if (PodatekT.indexOf("k.spieler") != -1 && PodatekT.indexOf("k.einwohner") != -1) {
                    JeIgralec = true;
                }
            }

            let JeOaza = false;
            if (PodatekC.indexOf("{k.fo}") != -1 || PodatekD == -1) {
                let JeOaza = true;


                /*if (cropfinder.oaze) {
                    if (PodatekT.indexOf("k.spieler") != -1 && cropfinder.vseoaze && cropfinder.oaze) {
                        let Aliansa = PodatekT.split("{k.allianz}")[1].split("<br")[0];
                        let Igralec = PodatekT.split("{k.spieler}")[1].split("<br")[0];
                        if (Aliansa == "" || Aliansa == " ") {
                            Aliansa = "/";
                        }
                        else {
                            Aliansa = [Aliansa, poljeObjektov[aaa].a];
                        }

                        DodajVCropTabelo("", PodatekX, PodatekY, x, y, "oases", "/", 0, Aliansa, Igralec, "oases", unsafeWindow.SERVERLINK, "d=" + getCoordfromXY(PodatekX, PodatekY), poljeObjektov[aaa].u, 4);


                    }
                    else if (PodatekT.indexOf("k.spieler") != -1) {
                    }
                    else if (cropfinder.vseoaze || cropfinder.sloni || cropfinder.prazneoaze || cropfinder.prosteoaze || cropfinder.krokodili || cropfinder.oazeles || cropfinder.oazeglina || cropfinder.oazezelezo || cropfinder.oazezito) {
                        DodajVCropTabelo("", PodatekX, PodatekY, x, y, "oases", "/", 0, "/", "/", "oases", unsafeWindow.SERVERLINK, "d=" + getCoordfromXY(PodatekX, PodatekY), 0, 4);
                        ProsteOaze.push({ x: PodatekX, y: PodatekY, options: cropfinder });
                    }


                }*/
            }


            if (cropfinder.c9c15) {
                if (!JeIgralec) { //neposeljeno
                    //c15: TaPodatek[2]=6
                    //c9:  TaPodatek[2]=1
                    if (Je15c != -1 && cropfinder.c15 == true) //
                    {
                        /*ProstaC15.push({
                            x: PodatekX,
                            y: PodatekY,
                            options: cropfinder
                        }); //
                        DodajVCropTabelo("disabled", PodatekX, PodatekY, x, y, "/", "", 0, "/", "/", "c15", unsafeWindow.SERVERLINK, "d=" + getCoordfromXY(PodatekX, PodatekY), 0, 4)*/
						/*let farm = {
							hasActiveTreasury: false,
							lastReport: {},
							name: "C15",
							player: {
								active: "1",
								ally: {
									id: 0,
									name: ""
								},
								id: PodatekU,
								kingId: 0,
								kingStatus: false,
								kingdomId: "0",
								kingdomRole: "0",
								name: "",
								spawnedOnMap: "1512494130",
								tribeId: "0"
							},
							population: 0,
							type: "1",
							villageId: getCoordfromXY(PodatekX * 1, PodatekY * 1),
							x: PodatekX * 1,
							y: PodatekY * 1,
							distance: razdalja
						}
						farme.push(farm)*/
						let v = {
							"villageId": getCoordfromXY(PodatekX * 1, PodatekY * 1),
							"name": "",
							"population": "999",
							"type": "1",
							"hasActiveTreasury": false
						};

						v.lastReport = {};
						v.x = PodatekX * 1
						v.y = PodatekY * 1;
						v.distance = razdalja;
						v.player = {};
						v.player.name = "C15";
						v.player.ally = {};
						v.player.ally.name = v.x + '|' + v.y;
						farme.push(v);
                    } else if (Je9c != -1 && cropfinder.c9 == true) //
                    {
						
                        /*ProstaC9.push({
                            x: PodatekX,
                            y: PodatekY,
                            options: cropfinder
                        });

                        DodajVCropTabelo("disabled", PodatekX, PodatekY, x, y, "/", "", 0, "/", "/", "c9", unsafeWindow.SERVERLINK, "d=" + getCoordfromXY(PodatekX, PodatekY), 0, 4)*/
						/*let farm = {
							hasActiveTreasury: false,
							lastReport: {},
							name: "C9",
							player: {
								active: "1",
								ally: {
									id: 0,
									name: ""
								},
								id: PodatekU,
								kingId: 0,
								kingStatus: false,
								kingdomId: "0",
								kingdomRole: "0",
								name: "",
								spawnedOnMap: "1512494130",
								tribeId: "0"
							},
							population: 0,
							type: "1",
							villageId: getCoordfromXY(PodatekX * 1, PodatekY * 1),
							x: PodatekX * 1,
							y: PodatekY * 1,
							distance: razdalja
						}
						console.log(farm)
						farme.push(farm)*/
						
						let v = {
							"villageId": getCoordfromXY(PodatekX * 1, PodatekY * 1),
							"name": "",
							"population": "999",
							"type": "1",
							"hasActiveTreasury": false
						};

						v.lastReport = {};
						v.x = PodatekX * 1
						v.y = PodatekY * 1;
						v.distance = razdalja;
						v.player = {};
						v.player.name = "C9";
						v.player.ally = {};
						v.player.ally.name = v.x + '|' + v.y;
						farme.push(v);
						
						
                    }
                }
            }
            //this.log.debug(JeIgralec)
            if (JeIgralec&&cropfinder.farme) {
                //if (!cropfinder.advancedfarmfinder && cropfinder.findfarms && JeIgralec) {
                let villagename = PodatekC.split("{k.dt}").join("");
                let Prebivalci = PodatekT.split("{k.einwohner}")[1].split("<br")[0] * 1;
                let Aliansa = PodatekT.split("{k.allianz}")[1].split("<br")[0];
                let Igralec = PodatekT.split("{k.spieler}")[1].split("<br")[0];

                //
                if (Aliansa == "" || Aliansa == " ") {
                    Aliansa = "/";
                }

                let farm = {
                    hasActiveTreasury: false,
                    lastReport: {},
                    name: villagename,
                    player: {
                        active: "1",
                        ally: {
                            id: PodatekA,
                            name: Aliansa
                        },
                        id: PodatekU,
                        kingId: 0,
                        kingStatus: false,
                        kingdomId: "0",
                        kingdomRole: "0",
                        name: Igralec,
                        spawnedOnMap: "1512494130",
                        tribeId: "0"
                    },
                    population: Prebivalci,
                    type: "1",
                    villageId: getCoordfromXY(PodatekX * 1, PodatekY * 1),
                    x: PodatekX * 1,
                    y: PodatekY * 1,
                    distance: razdalja
                }
                farme.push(farm)
                // function DodajVCropTabelo(add,x,y,Xorign,Yorign,vname,oases,population,allay,type,AnaliziranServer,link)
                //DodajVCropTabelo("", PodatekX, PodatekY, x, y, villagename, "?", Prebivalci, Aliansa, Igralec, "farm", unsafeWindow.SERVERLINK, "d=" + getCoordfromXY(PodatekX, PodatekY), 0, 4);
                /*if (cropfinder.getreports) {
                    ProsteFarme.push({ x: PodatekX, y: PodatekY, options: cropfinder });
                }*/


            }


        }
    }

    //
    return farme
    


}.bind(this)

const UstvariIskanja = function (cropfinder) { //30x30
    let deltar = cropfinder.maxdistance - cropfinder.mindistance;
    let stevilovodoravnihkvadratov = deltar / 30;
    let dy = 30;
	//console.log("this.store.mapZoom",this.store.mapZoom)
    if (this.store.mapZoom == 2) {
        dy = 20;
    }
    let kvadrati = [];
    for (let i = 0; i < Math.ceil(cropfinder.maxdistance * 2 / dy); i++) { //po y
        let ymax = cropfinder.y + cropfinder.maxdistance - i * dy - i;
        let ymin = cropfinder.y + cropfinder.maxdistance - (i + 1) * dy - i;
        for (let j = 0; j < Math.ceil(cropfinder.maxdistance * 2 / dy); j++) {
            let xmax = cropfinder.x + cropfinder.maxdistance - j * dy - j;
            let xmin = cropfinder.x + cropfinder.maxdistance - (j + 1) * dy - j;
            kvadrati = RazdeliNaPodkvadrate(kvadrati, xmin, xmax, ymin, ymax, cropfinder);
        }
    }
    return kvadrati
}.bind(this)

const RazdeliNaPodkvadrate = function (kvadrati, xmin, xmax, ymin, ymax, cropfinder) {
    let meja = this.store.map.right;
    if (xmin < meja * -1 && xmax < meja * -1) { //pretvori koordinate
        xmin += (2 * meja + 1);
        xmax += (2 * meja + 1);
    }

    if (xmin > meja && xmax > meja) { //pretvori koordinate
        xmin -= (2 * meja + 1);
        xmax -= (2 * meja + 1);
    }

    if (ymin < meja * -1 && ymax < meja * -1) { //pretvori koordinate
        ymin += (2 * meja + 1);
        ymax += (2 * meja + 1);
    }

    if (ymin > meja && ymax > meja) { //pretvori koordinate
        ymin -= (2 * meja + 1);
        ymax -= (2 * meja + 1);
    }


    let velikostx = xmax - xmin;
    let velikosty = ymax - ymin;

    let xsr = (xmax + xmin) / 2; //(-370-400)/2=-385
    let ysr = (ymax + ymin) / 2; //(-390-410)/2=-385
    let sekax = false;
    let sekay = false;
    //dolocitev mej

    if (Math.abs(xsr) + velikostx / 2 > 2 * meja) //seka y os
    {
        sekay = true;
        if (xsr > 0) //sredisce na +
        {
            let spodnjaxplus = xmin; //>0
            let spodnjaxminus = xmax - (2 * meja + 1); //<0
        } else if (xsr < 0) //sredisce na -
        {
            let spodnjaxplus = xmin + (2 * meja + 1); //>0
            let spodnjaxminus = xmax; //<0
        }
    }

    if (Math.abs(ysr) + velikosty / 2 > 2 * meja) //seka x os
    {
        sekax = true;

        if (ysr > 0) //sredisce na +
        {
            let spodnjayplus = ymin; //>0
            let spodnjayminus = ymax - (2 * meja); //<0
        } else if (ysr < 0) //sredisce na -
        {
            let spodnjayplus = ymin + (2 * meja); //>0
            let spodnjayminus = ymax; //<0
        }
    }

    if (sekax && sekay) { //4 kvadrati
        //++
        let xmax1 = meja;
        let xmin1 = xmax1 - velikostx; //370
        let omejitevxmax1 = meja;
        let omejitevxmin1 = spodnjaxplus;
        let ymax1 = meja;
        let ymin1 = ymax1 - velikosty; //370
        let omejitevymax1 = meja;
        let omejitevymin1 = spodnjayplus;
        kvadrati.push({
            xmin: xmin1,
            xmax: xmax1,
            ymin: ymin1,
            ymax: ymax1,
            omejitevxmin: omejitevxmin1,
            omejitevxmax: omejitevxmax1,
            omejitevymin: omejitevymin1,
            omejitevymax: omejitevymax1
        });
        //-+
        let xmin2 = -1 * meja;
        let xmax2 = xmin2 + velikostx; //-370
        let omejitevxmin2 = -1 * meja;
        let omejitevxmax2 = spodnjaxminus;
        let ymax2 = meja;
        let ymin2 = ymax2 - velikosty; //370
        let omejitevymax2 = meja;
        let omejitevymin2 = spodnjayplus;
        kvadrati.push({
            xmin: xmin2,
            xmax: xmax2,
            ymin: ymin2,
            ymax: ymax2,
            omejitevxmin: omejitevxmin2,
            omejitevxmax: omejitevxmax2,
            omejitevymin: omejitevymin2,
            omejitevymax: omejitevymax2
        });
        //+-
        let xmax3 = meja;
        let xmin3 = xmax3 - velikostx; //370
        let omejitevxmax3 = meja;
        let omejitevxmin3 = spodnjaxplus;
        let ymin3 = -1 * meja;
        let ymax3 = ymin3 + velikosty; //-370
        let omejitevymin3 = -1 * meja;
        let omejitevymax3 = spodnjayminus;
        kvadrati.push({
            xmin: xmin3,
            xmax: xmax3,
            ymin: ymin3,
            ymax: ymax3,
            omejitevxmin: omejitevxmin3,
            omejitevxmax: omejitevxmax3,
            omejitevymin: omejitevymin3,
            omejitevymax: omejitevymax3
        });
        //--
        let xmin4 = -1 * meja;
        let xmax4 = xmin4 + velikostx; //-370
        let omejitevxmax4 = -1 * meja;
        let omejitevxmin4 = spodnjaxminus;
        let ymin4 = -1 * meja;
        let ymax4 = ymin4 + velikosty; //-370
        let omejitevymin4 = -1 * meja;
        let omejitevymax4 = spodnjayminus;
        kvadrati.push({
            xmin: xmin4,
            xmax: xmax4,
            ymin: ymin4,
            ymax: ymax4,
            omejitevxmin: omejitevxmin4,
            omejitevxmax: omejitevxmax4,
            omejitevymin: omejitevymin4,
            omejitevymax: omejitevymax4
        });
    } else if (sekay) { //2 kvadrata
        //
        let xmax1 = meja;
        let xmin1 = xmax1 - velikostx; //370
        let omejitevxmax1 = meja;
        let omejitevxmin1 = spodnjaxplus;
        let ymax1 = ymax;
        let ymin1 = ymin;
        let omejitevymax1 = ymax;
        let omejitevymin1 = ymin;
        kvadrati.push({
            xmin: xmin1,
            xmax: xmax1,
            ymin: ymin1,
            ymax: ymax1,
            omejitevxmin: omejitevxmin1,
            omejitevxmax: omejitevxmax1,
            omejitevymin: omejitevymin1,
            omejitevymax: omejitevymax1
        });
        //-+
        let xmin2 = -1 * meja;
        let xmax2 = xmin2 + velikostx; //-370
        let omejitevxmin2 = -1 * meja;
        let omejitevxmax2 = spodnjaxminus;
        let ymax2 = ymax;
        let ymin2 = ymin;
        let omejitevymax2 = ymax;
        let omejitevymin2 = ymin;
        kvadrati.push({
            xmin: xmin2,
            xmax: xmax2,
            ymin: ymin2,
            ymax: ymax2,
            omejitevxmin: omejitevxmin2,
            omejitevxmax: omejitevxmax2,
            omejitevymin: omejitevymin2,
            omejitevymax: omejitevymax2
        });
    } else if (sekay) { //2 kvadrata
        //+
        let xmax3 = xmax;
        let xmin3 = xmin;
        let omejitevxmax3 = xmax;
        let omejitevxmin3 = xmin;
        let ymax3 = meja;
        let ymin3 = ymax3 - velikosty; //370
        let omejitevymax3 = meja;
        let omejitevymin3 = spodnjayplus;
        kvadrati.push({
            xmin: xmin3,
            xmax: xmax3,
            ymin: ymin3,
            ymax: ymax3,
            omejitevxmin: omejitevxmin3,
            omejitevxmax: omejitevxmax3,
            omejitevymin: omejitevymin3,
            omejitevymax: omejitevymax3
        });
        //-
        let xmax4 = xmax;
        let xmin4 = xmin;
        let omejitevxmax4 = xmax;
        let omejitevxmin4 = xmin;
        let ymin4 = -1 * meja;
        let ymax4 = ymax4 + velikosty; //-370
        let omejitevymin4 = -1 * meja;
        let omejitevymax4 = spodnjayminus;
        kvadrati.push({
            xmin: xmin4,
            xmax: xmax4,
            ymin: ymin4,
            ymax: ymax4,
            omejitevxmin: omejitevxmin4,
            omejitevxmax: omejitevxmax4,
            omejitevymin: omejitevymin4,
            omejitevymax: omejitevymax4
        });
    } else {
        kvadrati.push({
            xmin: xmin,
            xmax: xmax,
            ymin: ymin,
            ymax: ymax
        });
    }
    for (let i = 0; i < kvadrati.length; i++) {
        let tmpx = (kvadrati[i].xmax + kvadrati[i].xmin) / 2 - cropfinder.x
        let tmpy = (kvadrati[i].ymax + kvadrati[i].ymin) / 2 - cropfinder.y
        let dist = (tmpx ** 2 + tmpy ** 2) ** 0.5
        kvadrati[i].distance = dist
    }

    return kvadrati;
}.bind(this)

const getAllVillagesWithTrade = function () {
    let vill = []
    for (let i = 0; i < this.store.Player.villages.length; i++) {
        let village = this.store.Player.villages[i]
        if (village.tasks.trade.length > 0) {
            if (vill.indexOf(village) == -1) {
                vill.push(village)
            }
        }
        for (let j = 0; j < village.tasks.trade.length; j++) {
            let tradetask = village.tasks.trade[j]
            for (let k = 0; k < this.store.Player.villages.length; k++) {
                let village1 = this.store.Player.villages[k]
                if (village1.x == tradetask.x && village1.y == tradetask.y) {
                    if (vill.indexOf(village1) == -1) {
                        vill.push(village1)
                    }
                    break;
                }
            }
        }
    }
    return vill
}.bind(this)

const build2 = async function (village, villageBuilding, rez, attempts, url, buildTask) {
    if (attempts > 3) {
        rez.success = false
        rez.error = true
        rez.errorMessage = "More than 3 attempts to build have been made."
        rez.name = village.name
        return rez
    }
    let lvl = 1
    if (rez.villageId != village.villageId) {
        rez = await requestAndAnalyse(url + "?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": rez.responseURL
        }, 1);
        return await build2(village, villageBuilding, rez, attempts + 1, url, buildTask)
    }
    rez = await requestAndAnalyse(this.store.Player.url + "/build.php?id=" + villageBuilding.locationId, "", "GET", {
        "Referer": rez.responseURL
    }, 1);
    //this.log.debug('Na zgradbi', rez);
    if (rez.villageId != village.villageId) {
        rez = await requestAndAnalyse(url + "?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": rez.responseURL
        }, 1);
        return await build2(village, villageBuilding, rez, attempts + 1, url, buildTask)
    }
    let linkURL="";
    let doc = createDocument(rez.document)
    let buildlink = doc.evaluate(".//div[@class='build']//div[@id='build']//div[@class='section1']//button", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (buildlink.snapshotLength > 0) {
        //this.log.debug('buildlink', buildlink.snapshotItem(0));
        let buildgoldlink = doc.evaluate(".//i[@class='goldIcon']", buildlink.snapshotItem(0), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        //this.log.debug('buildgoldlink', buildgoldlink.snapshotLength);

        if (buildgoldlink.snapshotLength) {
            rez.success = false
            rez.error = true
            rez.errorMessage = "Build is not possible."
            rez.name = village.name
            return rez
        }
        let link = buildlink.snapshotItem(0).getAttribute("onclick").split("'")
        if (link.length == 3) {
            linkURL = this.store.Player.url + "/" + link[1]
        } else {
            rez.success = false
            rez.error = true
            rez.errorMessage = "Unable to find link2 while building."
            rez.name = village.name
            return rez
        }
        let buttoncontent = buildlink.snapshotItem(0).getElementsByClassName("button-content")

        if (buttoncontent.length) {
            lvl = buttoncontent[0].innerHTML.match(/[\d\.]+/g)[0] * 1;
        }else{
            lvl = buildlink.snapshotItem(0).value.match(/[\d\.]+/g)[0] * 1;
        }
    } else {
        let tablink = checkTab(doc, buildTask)
        //this.log.debug('ni linka', "preveri ce lahko zgradis kot novo zgradbo", tablink);

        if (tablink == "0") {
            rez.success = false
            rez.error = true
            rez.errorMessage = "Unable to find link to build new building."
            rez.name = village.name
            return rez
        } else if (tablink != "") {
            rez = await requestAndAnalyse(tablink, "", "GET", {
                "Referer": rez.responseURL
            }, 1);
            if (rez.villageId != village.villageId) {
                rez = await requestAndAnalyse(url + "?newdid=" + village.villageId + "&", "", "GET", {
                    "Referer": rez.responseURL
                }, 1);
                return await build2(village, villageBuilding, rez, attempts + 1, url, buildTask)
            }
            doc = createDocument(rez.document)
        }

        tablink = checkTab(doc, buildTask)
        //this.log.debug('ni linka', "preveri ce lahko zgradis kot novo zgradbo 2", tablink, tablink != "");
        if (tablink != "") {
            this.log.debug('ni linka');
            rez.success = false
            rez.error = true
            rez.errorMessage = "Unable to find link while building2."
            rez.name = village.name
            return rez
        }


        buildlink = doc.evaluate(".//div[@class='build']//div[@id='build']//div[@id='contract_building" + buildTask.buildingType + "']//button", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        //this.log.debug(".//div[@class='build']//div[@id='build']//div[@id='contract_building" + buildTask.buildingType + "']//button", buildlink.snapshotLength);
        if (buildlink.snapshotLength) {
            let buildgoldlink = doc.evaluate(".//i[@class='goldIcon']", buildlink.snapshotItem(0), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            //this.log.debug('buildgoldlink', buildgoldlink.snapshotLength);
            if (buildgoldlink.snapshotLength) {
                rez.success = false
                rez.error = true
                rez.errorMessage = "Unable to find link while building3."
                rez.name = village.name
                return rez
            }
            let link = buildlink.snapshotItem(0).getAttribute("onclick").split("'");
            if (link.length == 3) {
                linkURL = this.store.Player.url + "/" + link[1]
            } else {
                //this.log.debug('ni linka');
                rez.success = false
                rez.error = true
                rez.errorMessage = "Unable to find link while building4."
                rez.name = village.name
                return rez
            }
            //this.log.debug("link", link);

            rez = await requestAndAnalyse(linkURL, "", "GET", {
                "Referer": rez.responseURL
            }, 1);
            if (rez.villageId != village.villageId) {
                rez = await requestAndAnalyse(url + "?newdid=" + village.villageId + "&", "", "GET", {
                    "Referer": rez.responseURL
                }, 1);
                return await build2(village, villageBuilding, rez, attempts + 1, url, buildTask)
            }
            rez.lvl = 1;
            rez.success = true
            return rez
        } else {
            rez.success = false
            rez.error = true
            rez.errorMessage = "No new building link."
            rez.name = village.name;
            return rez
        }
    }

    if (lvl>buildTask.toLvl)
    {
        rez.success = false
        rez.error = true
        rez.errorMessage = "Building at location: "+villageBuilding.locationId+" already at selected level. Next level: "+lvl
        rez.name = village.name
        return rez
    }
    rez = await requestAndAnalyse(linkURL, "", "GET", {
        "Referer": rez.responseURL
    }, 1);
    if (rez.villageId != village.villageId) {
        rez = await requestAndAnalyse(url + "?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": rez.responseURL
        }, 1);

        return await build2(village, villageBuilding, rez, attempts + 1, url, buildTask)
    }
    rez.lvl = lvl;
    rez.success = true
    return rez
}.bind(this)

const checkTab = function (doc, buildTask) {
    let tabs = doc.evaluate(".//div[@class='build']//div[@id='build']//a[@class='tabItem']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    let activeTab = doc.evaluate(".//div[@class='build']//div[@id='build']//div[contains(@class,'container ') and contains(@class,' active')]//a[@class='tabItem']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //this.log.debug('tabs', tabs.snapshotLength, activeTab.snapshotLength, buildTask);
    let targetcategory = 1
    if (buildTask.buildingType * 1 == 13 || buildTask.buildingType * 1 == 14 || buildTask.buildingType * 1 == 19 || buildTask.buildingType * 1 == 20 || buildTask.buildingType * 1 == 21 || buildTask.buildingType * 1 == 22 || buildTask.buildingType * 1 == 29 || buildTask.buildingType * 1 == 30 || buildTask.buildingType * 1 == 36 || buildTask.buildingType * 1 == 37) {
        targetcategory = 2;
    } else if (buildTask.buildingType * 1 == 5 || buildTask.buildingType * 1 == 6 || buildTask.buildingType * 1 == 7 || buildTask.buildingType * 1 == 8 || buildTask.buildingType * 1 == 9) {
        targetcategory = 3;
    }

    if (activeTab.snapshotLength) {
        let link = activeTab.snapshotItem(0).getAttribute("href")
        let category = link.split("category=")[1].split("&")[0] * 1
        //this.log.debug('activeTab', link, category, targetcategory);
        if (category != targetcategory) {
            link = "";
            for (let i = 0; i < tabs.snapshotLength; i++) {
                //this.log.debug(tabs.snapshotItem(i))
                let link2 = tabs.snapshotItem(i).getAttribute("href")
                let category2 = link2.split("category=")[1].split("&")[0] * 1
                //this.log.debug('category2', category2);
                if (category2 == targetcategory) {
                    link = link2
                    break;
                }
            }

            if (link == "") {
                //this.log.debug('can not find category link', link, category, targetcategory);

                return "0"
            }

            return this.store.Player.url + "/" + link
            //rez = await requestAndAnalyse(this.store.Player.url+"/"+link,"","GET", {"Referer":rez.responseURL},Player);
            //build2(village,villageBuilding,rez,attempts+1,url,buildTask) 
        }
    }

    return ""
}.bind(this)

const updateResources = function () {
    let now = new Date().getTime()
    for (let i = 0; i < this.store.Player.villages.length; i++) {
        let village = this.store.Player.villages[i]
        let toRemove = []
        for (let j = 0; j < village.SUROVINEPRIHAJAJOCE.length; j++) {
            let teSurovine = village.SUROVINEPRIHAJAJOCE[j]
            if (teSurovine.time <= now) {
                toRemove.push(j)
                village.storage["1"] += teSurovine.wood * 1
                village.storage["2"] += teSurovine.clay * 1
                village.storage["3"] += teSurovine.iron * 1
                village.storage["4"] += teSurovine.grain * 1
            }

        }
        toRemove.sort(function (a, b) {
            return b - a;
        });
        for (let j = 0; j < toRemove.length; j++) {
            village.SUROVINEPRIHAJAJOCE.splice(toRemove[j], 1)
        }

        toRemove = []
        for (let j = 0; j < village.TRGOVCI.length; j++) {
            let tiTrgovci = village.TRGOVCI[j]
            if (tiTrgovci.time <= now) {
                toRemove.push(j)
                village.Merchants.merchantsFree += tiTrgovci.trgovci * 1;
            }

        }
        toRemove.sort(function (a, b) {
            return b - a;
        });

        for (let j = 0; j < toRemove.length; j++) {
            village.TRGOVCI.splice(toRemove[j], 1)
        }

        village.storage["1"] += Math.min(village.production["1"] * (now - village.lastCalculation) / 3600000, village.storageCapacity["1"]);
        village.storage["2"] += Math.min(village.production["2"] * (now - village.lastCalculation) / 3600000, village.storageCapacity["2"]);
        village.storage["3"] += Math.min(village.production["3"] * (now - village.lastCalculation) / 3600000, village.storageCapacity["3"]);
        village.storage["4"] += Math.min(village.production["4"] * (now - village.lastCalculation) / 3600000, village.storageCapacity["4"]);
        village.lastCalculation = now;
        village.Merchants.maxCapacity = village.Merchants.carry*village.Merchants.merchantsFree;
    }
}.bind(this)

const AnalyseMarketplace = async function (rez, village, attempts, withouterrorhandler) {
    //this.log.debug("AnalyseMarketplace", village.villageId,village);

    if (rez.villageId != village.villageId) {

        rez = await requestAndAnalyse(this.store.Player.url + "/dorf2.php?newdid=" + village.villageId + "&", "", "GET", {
            "Referer": rez.responseURL
        }, 1);
    }
    let doc = createDocument(rez.document)
    if (attempts > 3) {

        rez.error = true
        rez.errorMessage = "More than 3 attemts have been made while trying to analyse marketplace."
        rez.name = village.name
        return rez;
    }
    let location=getBuildingId(doc,17)
    //this.log.debug("location", location);
    //let areagumb = doc.evaluate(".//img[@class='building g17']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (location) {
        //let item = areagumb.snapshotItem(0);
        //let location = 17 + getElementIndex(item);
        //this.log.debug("location", location);
        //let areagumb1 = doc.evaluate(".//area[contains(@href, 'build.php?') and contains(@href, 'id=" + location + "')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

            //this.log.debug(this.store.Player.url + "/build.php?id=" + location);
            rez = await requestAndAnalyse(this.store.Player.url + "/build.php?id=" + location, "", "GET", {
                "Referer": rez.responseURL
            }, 1);
            //this.log.debug(rez.villageId , village.villageId);
            if (rez.villageId != village.villageId) {
                //console.log("err1",rez.villageId,village.villageId)
                return await AnalyseMarketplace(rez, village, attempts + 1, withouterrorhandler)
            }
            doc = createDocument(rez.document)
            let activeTab = activeTab = rez.activeTab;
            if (activeTab || activeTab == 0) {
                if (activeTab != 5) {
                    rez = await requestAndAnalyse(this.store.Player.url + "/build.php?t=5&id=" + location, "", "GET", {
                        "Referer": rez.responseURL
                    }, 1);
                    if (rez.villageId != village.villageId) {
                        //console.log("err2",rez.villageId,village.villageId)
                        return await AnalyseMarketplace(rez, village, attempts + 1, withouterrorhandler)
                    }
                    doc = createDocument(rez.document)
                    activeTab = activeTab = rez.activeTab;
                    if (activeTab || activeTab == 0) {
                        if (activeTab != 5) {
                            rez.error = true
                            rez.errorMessage = "Switching to correct tab failed whilde analysing marketplace."
                            rez.name = village.name
                            let novCas = new Date();
                            novCas = novCas.getTime() + randomXToY(Math.round(60000 * (1 - this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA), Math.round(60000 * (1 + this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA));
                            village.CASANALIZETRZNICA = novCas;
                        } else {
                            return rez
                        }
                    } else {
                        rez.error = true
                        rez.errorMessage = "No tabs found on marketplace."
                        rez.name = village.name
                        let novCas = new Date();
                        novCas = novCas.getTime() + randomXToY(Math.round(60000 * (1 - this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA), Math.round(60000 * (1 + this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA));
                        village.CASANALIZETRZNICA = novCas;
                    }

                }
            } else {
                rez.error = true
                rez.errorMessage = "No tabs found on marketplace."
                rez.name = village.name
            }
    } else {
        //this.log.debug("no result2", 5);
        rez.error = true
        rez.errorMessage = "Marketplace not found."
        rez.name = village.name
        village.Merchants.merchantsFree = 0
        village.Merchants.carry = 1
        village.Merchants.maxCapacity = 0
        let novCas = new Date();
        novCas = novCas.getTime() + randomXToY(Math.round(60000 * (1 - this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA), Math.round(60000 * (1 + this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA));
        village.CASANALIZETRZNICA = novCas;
        /*addLog("Trade",village.villageid,"Failed to send ["+task.res.wood+","+task.res.clay+","+task.res.iron+","+task.res.crop+"] to "+getVillageName(task.x,task.y,PLAYER)+" ("+task.x+"|"+task.y+"); Can not find marketplace.",2);
        setTimeoutStart(15000,30000,PLAYER);   
        return;*/
    }

    return rez
}.bind(this)

function getBuildingId(doc,bid)
{
    let areagumb = doc.evaluate(".//div[contains(@class, 'buildingSlot ') and contains(@class, ' g"+bid+" ')]//div[contains(@onclick, 'window.location.href') and contains (@onclick,"+'"'+"'"+'"'+")]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log(".//div[contains(@class, 'buildingSlot ') and contains(@class, ' g"+bid+" ')]//div[contains(@onclick, 'window.location.href') and contains (@onclick,"+'"'+"'"+'"'+")]")
    //console.log("areagumb.snapshotLength",areagumb.snapshotLength)
    let areagumb1 = doc.evaluate(".//div[contains(@class, 'buildingSlot ') and contains(@class, ' g"+bid+" ')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    //console.log(doc.body.innerHTML)
    //console.log("areagumb1.snapshotLength",areagumb1.snapshotLength)
    if (areagumb.snapshotLength) {
        let tmp1=areagumb.snapshotItem(0).getAttribute("onclick").split("'")[1]
        let splittmp1=tmp1.split("id=")
        if (splittmp1.length>1) {
            polozajtrznice=splittmp1[1].split("&")[0]
            return polozajtrznice
        }
    }
    else
    {
        //console.log("unable to get building id")
        //console.log(doc.body.innerHTML)
    }
    return 0
}


const relogin = async function (doc) {
    if (doc.getElementsByName('login').length != 0) {
        let ex = ".//input[@value='login']";
        let tag = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        ex = ".//button[@type='submit']";
        let tag1 = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        ex = ".//input[@type='password']"; // and contains(@value, '*')
        let tag2 = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        ex = ".//div[@class='error LTR']"; // and contains(@value, '*')
        let tag223 = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        ex = ".//input[@name='login']"; // and contains(@value, '*')
        let login = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        let s1 = doc.getElementsByName("s1")
        let w = doc.getElementsByName("w")
        //console.log("name=" + encodeURIComponent(this.store.Player.options.User.username) + "&password=" + encodeURIComponent(this.store.Player.options.User.password) + "&s1=" + encodeURIComponent(s1[0].value) + "&w=" + encodeURIComponent(screen.width + ":" + screen.height) + "&login=" + encodeURIComponent(login.snapshotItem(0).value))
        //console.log(this.store.Player)
        return await request(this.store.Player.url + "/dorf1.php", "name=" + encodeURIComponent(this.store.Player.options.User.username) + "&password=" + encodeURIComponent(this.store.Player.options.User.password) + "&s1=" + encodeURIComponent(s1[0].value) + "&w=" + encodeURIComponent(screen.width + ":" + screen.height) + "&login=" + encodeURIComponent(login.snapshotItem(0).value), "POST", {}, true)

    }
}.bind(this)

window.addEventListener("message", function(event) {
  //console.log("event",event)
  let rez=event.data
  if (rez.document)
  {
	  let doc = createDocument(rez.document)
	  ananalizirajNaselje(doc, rez.url, rez.document, rez)
	  //console.log(rez)
  }
});

const requestAndAnalyse = async function (url, data, type, headers, nrattempts, addwindowsize) {
    if (nrattempts > 3) {
        return {
            document: "",
            error: true,
            errorMessage: "More than 3 attempts done trying to request: " + url + " (" + type + ")."
        }
    }
    let rez = await request(url, data, type, headers, addwindowsize);
    //this.log.debug('requestAndAnalyse rez', rez);
    if (preveriRequest(rez)) {
        let doc = createDocument(rez.document)
        rez.doc=doc
        //this.log.debug('Response document:',doc); 
        let logedin = preveriLogin(doc);
        //this.log.debug('logedin:', logedin);
        if (logedin) {
            ananalizirajNaselje(doc, rez.responseURL, rez.document, rez)
            setAjaxToken(rez)
			setMapSize(rez)
            setTravianTab(rez, doc)
            return rez
        } else {
            //this.log.debug('Not logged in. trying to relogin: ');
            //this.log.debug(this.store);
            //this.log.debug(this.store.Player);
            //this.log.debug('Not logged in. trying to relogin: ');

            rez = await relogin(doc)
            //this.log.debug('requestAndAnalyse rez (after login):', rez);
            doc = createDocument(rez.document);
            let logedin = preveriLogin(doc);
            rez.loggedin = logedin;
            //this.log.debug('logedin:', logedin);
            if (logedin) {
                ananalizirajNaselje(doc, rez.responseURL, rez.document, rez);
                //this.log.debug('Url after login:', rez.responseURL, url);
                if (rez.responseURL) {
                    if (rez.responseURL != url) {
                        this.log.debug('Url after login not correct, retry:', rez.responseURL, url);
                        rez = await requestAndAnalyse(url, data, type, headers, nrattempts + 1, addwindowsize);
                    }
                }
                setAjaxToken(rez)
                return rez
            } else {
                //this.log.debug('Login failed:');
                return {
                    document: "",
                    error: true,
                    errorMessage: "login failed"
                }
            }

        }
    } else {
        return {
            document: "",
            error: true,
            errorMessage: "no document received. url: " + url + ";type:" + type + ";data: " + data
        }
    }
}.bind(this)

const setAjaxToken = function (rez) {
	//console.log(rez)
    let re1 = new RegExp('return \'[a-zA-Z0-9]{32,32}\'');
    let res1=rez.document.match(re1)
	//console.log(res1)
    if(res1)
    {
        rez.ajaxToken = res1[0].split("'")[1]
        return
    }

    let re2 = new RegExp('\'[a-zA-Z0-9]{32,32}\'');
    let res2=rez.document.match(re2)
	//console.log(res2)
    if(res2)
    {
        rez.ajaxToken = res2[0].split("'")[1]
    }

    //let split1 = rez.document.split("grommetZodiacsJerroldFormalizing")
    //let split2 = rez.document.split("Travian.shawlsSheilaCarissa")
    //if (split1.length > 1) {
    //    rez.ajaxToken = split1[1].split("'")[1]
    //} else if (split2.length > 1) {
    //    rez.ajaxToken = split2[1].split("'")[1]
    //} else {
    //    rez.ajaxToken = rez.document.split("window.ajaxToken")[1].split("'")[1]
    //}

}

const setMapSize = function (rez) {
	//console.log(rez)
    let re1 = new RegExp('{"Map"[ ]*:[ ]*{[ ]*"Size"[ ]*:[ ]*{[ ]*"width"[ ]*:[ ]*[0-9]{1,4}[ ]*,[ ]*"height"[ ]*:[ ]*[0-9]{1,4}[ ]*,[ ]*"left"[ ]*:[ ]*[-]*[0-9]{1,4}[ ]*,[ ]*"right"[ ]*:[ ]*[-]*[0-9]{1,4}[ ]*,[ ]*"bottom"[ ]*:[ ]*[-]*[0-9]{1,4}[ ]*,[ ]*"top"[ ]*:[ ]*[-]*[0-9]{1,4}[ ]*}[ ]*}[ ]*}');
    let res1=rez.document.match(re1)
	//console.log(res1)
    if(res1)
    {
		try{
        //console.log(res1[0])
		let mapobj=JSON.parse(res1[0])
		this.store.map=mapobj.Map.Size
		if (this.store.map.width==401)
		{
			this.store.mapZoom=2
		}
		//console.log(mapobj)
		}
		catch(err)
		{
			console.log("Error while analysing map size")
		}
        return
    }
}.bind(this)

const setTravianTab = function (rez, doc) {
    let ex = ".//div[@class='contentContainer']//div[contains(@class,'container') and contains(@class,'active')]//a[@class='tabItem' and (contains (@href, 't=') or contains (@href, 'category='))]"; // 
    let activeTab = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (activeTab.snapshotLength) {
        let spliter = activeTab.snapshotItem(0).getAttribute("href").split("category=").length > 1 ? "category=" : "t="
        let activeTabUrl = activeTab.snapshotItem(0).getAttribute("href").split(spliter)[1].match(/[\d\.]+/g)[0] * 1;
        rez.activeTab = activeTabUrl;
    }
    ex = ".//div[@class='contentContainer']//div[contains(@class,'container') and contains(@class,'normal')]//a[@class='tabItem' and (contains (@href, 't=') or contains (@href, 'category='))]";
    activeTab = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (activeTab.snapshotLength) {
        rez.otherTabs = []
        for (let i = 0; i < activeTab.snapshotLength; i++) {
            let spliter = activeTab.snapshotItem(i).getAttribute("href").split("category=").length > 1 ? "category=" : "t="
            let thisTab = activeTab.snapshotItem(i).getAttribute("href").split(spliter)[1].match(/[\d\.]+/g)[0] * 1;
            rez.otherTabs.push(thisTab)
        }

    }
    //
}.bind(this)



const analizirajGradnje = function (doc, village, url) {

    if (url.indexOf("dorf1.php") > 0 || url.indexOf("dorf2.php") > 0) {

        let Zdaj = new Date()
        Zdaj = Zdaj.getTime()
        let CasKoncanja1 = [0, 0];

        let SpanTimer = doc.evaluate(".//div[@class='boxes buildingList']//div[@class='buildDuration']//span[contains(@class, 'timer')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        let StavbeKiSeGradijo = [];
        let Stavba1 = [0, 0];
        let Stavba2 = [0, 0];
        //this.log.debug("SpanTimer.snapshotLength:", SpanTimer.snapshotLength);
        village.BuildingQueue["2"] = 1;
        village.BuildingQueue["1"] = 1;

        if (SpanTimer.snapshotLength == 0) {
            village.BuildingQueue["2"] = 1;
            village.BuildingQueue["1"] = 1;
        } else {


            for (let TaTimer = 0; TaTimer < SpanTimer.snapshotLength; TaTimer++) {
                let StopnjaStavbe = SpanTimer.snapshotItem(TaTimer).parentNode.parentNode.getElementsByClassName("lvl");
                let ImeStavbe = SpanTimer.snapshotItem(TaTimer).parentNode.parentNode.getElementsByClassName("name")[0].innerHTML.split(" <span")[0];

                while (ImeStavbe.charCodeAt(0) == 32 || ImeStavbe.charCodeAt(0) == 10 || ImeStavbe.charCodeAt(0) == 9) {
                    ImeStavbe = ImeStavbe.substring(1);
                }
                while (ImeStavbe.charCodeAt(ImeStavbe.length - 1) == 32 || ImeStavbe.charCodeAt(ImeStavbe.length - 1) == 10 || ImeStavbe.charCodeAt(ImeStavbe.length - 1) == 9) {
                    ImeStavbe = ImeStavbe.substring(0, ImeStavbe.length - 2);
                }

                let Pirmerjalnik = "(" + this.store.Player.IMENAPOLJ + ")";

                let test = ImeStavbe.toLowerCase().match(Pirmerjalnik.toLowerCase());
                let CasKoncanja = SpanTimer.snapshotItem(TaTimer).getAttribute("value") * 1000;
                if (test != null) {
                    village.BuildingQueue["2"] = 0 //CasKoncanja
                    if (this.store.Player.tribeId != 1) {
                        village.BuildingQueue["1"] = 0
                    }
                    village.FildFinishTime = CasKoncanja + Zdaj
                    //let TipStavbe = 1;
                } else {
                    //let TipStavbe = 2;
                    village.BuildingQueue["1"] = 0 //CasKoncanja
                    if (this.store.Player.tribeId != 1) {
                        village.BuildingQueue["2"] = 0
                    }
                    village.BuildingFinishTime = CasKoncanja + Zdaj
                }

            }

        }

        //this.log.debug("village.BuildingQueue:",village.BuildingQueue);

    }
}.bind(this)

const analizirajSurovine = function (doc, village, originalDocText) {
    let production ={};
    let storage ={};
    let storageCapacity ={};
    if(originalDocText.split("resources.production = {").length>1)
    {
        production = JSON.parse("{" + originalDocText.split("resources.production = {")[1].split("}")[0] + "}")
        storage = JSON.parse("{" + originalDocText.split("resources.storage = {")[1].split("}")[0] + "}")
        storageCapacity = JSON.parse("{" + originalDocText.split("resources.maxStorage = {")[1].split("}")[0] + "}")
    }
    else if(originalDocText.split("let resources = {").length>1)
    {
        tmpsplit=originalDocText.split("let resources = {")[1]
        production = JSON.parse("{" + tmpsplit.split("production: {")[1].split("}")[0] + "}")
        storage = JSON.parse("{" + tmpsplit.split("storage: {")[1].split("}")[0] + "}")
        storageCapacity = JSON.parse("{" + tmpsplit.split("maxStorage: {")[1].split("}")[0] + "}")
    }
    else if(originalDocText.split("var resources = {").length>1)
    {
        tmpsplit=originalDocText.split("var resources = {")[1]
        production = JSON.parse("{" + tmpsplit.split("production: {")[1].split("}")[0] + "}")
        storage = JSON.parse("{" + tmpsplit.split("storage: {")[1].split("}")[0] + "}")
        storageCapacity = JSON.parse("{" + tmpsplit.split("maxStorage: {")[1].split("}")[0] + "}")
    }
    else{
        //console.log(doc, village, originalDocText);
        return;
    }
    
    village.production["1"] = production.l1;
    village.production["2"] = production.l2;
    village.production["3"] = production.l3;
    village.production["4"] = production.l4;
    village.supplyBuildings = production.l5;
    village.storage["1"] = storage.l1;
    village.storage["2"] = storage.l2;
    village.storage["3"] = storage.l3;
    village.storage["4"] = storage.l4;
    village.storageCapacity["1"] = storageCapacity.l1;
    village.storageCapacity["2"] = storageCapacity.l2;
    village.storageCapacity["3"] = storageCapacity.l3;
    village.storageCapacity["4"] = storageCapacity.l4;
    village.lastCalculation = new Date().getTime()

    //this.log.debug('production:',production);
    //this.log.debug('storage:',storage);
    //this.log.debug('maxStorage:',storageCapacity);
}.bind(this)

const analizirajPolja = function (doc, village, url) {
    if (url.indexOf("dorf1.php") > -1) {


        let divPolja = doc.evaluate(".//map[@id='rx']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        let polja = []
        let CasZdaj = new Date();

        if (divPolja.snapshotLength) {
            divPolja = divPolja.snapshotItem(0);

            let vsebina = doc.getElementById("village_map");
            let TipPokrajine = vsebina.getAttribute("class");
            let StevilkaPokrajine = TipPokrajine.match(/[\d\.]+/g)[0] * 1;

            let SlikePolj = divPolja.getElementsByTagName("area");
            let Polja = [
                [0, 0, 0]
            ];
            let ShranjujemPolja = "";
            let PoljaZaShranjevanje = CasZdaj.getDate() + ":" + CasZdaj.getMonth() + ":" + CasZdaj.getFullYear() + ":" + CasZdaj.getHours() + ":" + CasZdaj.getMinutes() + ":" + CasZdaj.getSeconds();

            for (let i = 0; i < SlikePolj.length - 1; i++) {
                let IdPolja = i + 1; //TipSlike.substring(zacetek,konec)*1;
                let TipPolja = SlikePolj[i].getAttribute("alt");
                let ImePolja = this.store.landType[StevilkaPokrajine][IdPolja]*1;
                let StopnjaPolja = TipPolja.match(/[\d\.]+/g)[0] * 1;
                Polja.push([IdPolja, ImePolja, StopnjaPolja]); //                        <area href="build.php?id=1" coords="101,33,28" shape="circle" title="Gozdar Stopnja 10" alt="Gozdar Stopnja 10"/><area href="build.php?id=2" coords="165,32,28" shape="circle" title="ÄąËťitno polje Stopnja 10" alt="ÄąËťitno polje Stopnja 10"/><area href="build.php?id=3" coords="224,46,28" shape="circle" title="Gozdar Stopnja 10" alt="Gozdar Stopnja 10"/><area href="build.php?id=4" coords="46,63,28" shape="circle" title="Rudnik ÄąÄľeleza Stopnja 10" alt="Rudnik ÄąÄľeleza Stopnja 10"/><area href="build.php?id=5" coords="138,74,28" shape="circle" title="Glinokop Stopnja 10" alt="Glinokop Stopnja 10"/><area href="build.php?id=6" coords="203,94,28" shape="circle" title="Glinokop Stopnja 10" alt="Glinokop Stopnja 10"/><area href="build.php?id=7" coords="262,86,28" shape="circle" title="Rudnik ÄąÄľeleza Stopnja 10" alt="Rudnik ÄąÄľeleza Stopnja 10"/><area href="build.php?id=8" coords="31,117,28" shape="circle" title="ÄąËťitno polje Stopnja 10" alt="ÄąËťitno polje Stopnja 10"/><area href="build.php?id=9" coords="83,110,28" shape="circle" title="ÄąËťitno polje Stopnja 10" alt="ÄąËťitno polje Stopnja 10"/><area href="build.php?id=10" coords="214,142,28" shape="circle" title="Rudnik ÄąÄľeleza Stopnja 10" alt="Rudnik ÄąÄľeleza Stopnja 10"/><area href="build.php?id=11" coords="269,146,28" shape="circle" title="Rudnik ÄąÄľeleza Stopnja 10" alt="Rudnik ÄąÄľeleza Stopnja 10"/><area href="build.php?id=12" coords="42,171,28" shape="circle" title="ÄąËťitno polje Stopnja 10" alt="ÄąËťitno polje Stopnja 10"/><area href="build.php?id=13" coords="93,164,28" shape="circle" title="ÄąËťitno polje Stopnja 10" alt="ÄąËťitno polje Stopnja 10"/><area href="build.php?id=14" coords="160,184,28" shape="circle" title="Gozdar Stopnja 10" alt="Gozdar Stopnja 10"/><area href="build.php?id=15" coords="239,199,28" shape="circle" title="ÄąËťitno polje Stopnja 10" alt="ÄąËťitno polje Stopnja 10"/><area href="build.php?id=16" coords="87,217,28" shape="circle" title="Glinokop Stopnja 10" alt="Glinokop Stopnja 10"/><area href="build.php?id=17" coords="140,231,28" shape="circle" title="Gozdar Stopnja 10" alt="Gozdar Stopnja 10"/><area href="build.php?id=18" coords="190,232,28" shape="circle" title="Glinokop Stopnja 10" alt="Glinokop Stopnja 10"/><area href="dorf2.php" coords="144,131,36" shape="circle" title="Center naselja" alt="" />

                let r1 = 9999999;
                let r2 = 9999999;
                let r3 = 9999999;
                let r4 = 9999999;
                let underconstruction = false;
                let lvnext=StopnjaPolja + 1;
                if (SlikePolj[i].getAttribute("title")) {
                    
                    try {
                        TipPolja = SlikePolj[i].getAttribute("title").split("<b>")[1].split("</b>")[0];
                    } catch (err) {
                        TipPolja = SlikePolj[i].getAttribute("title").split(" <span")[0];
                    }
                    let tmpdoc = createDocument(SlikePolj[i].getAttribute("title"))

                    if (ShranjujemPolja == "") {
                        ShranjujemPolja = TipPolja;
                    } else {
                        ShranjujemPolja += "|" + TipPolja;
                    }

                    //console.log(tmpdoc)

                    let r1item = tmpdoc.evaluate(".//i[@class='r1']", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    //console.log("r1item.snapshotLength",r1item.snapshotLength)
                    if (r1item.snapshotLength) {
                        let ell = r1item.snapshotItem(0).parentNode.getElementsByTagName("span")
                        //console.log("ell.length",ell,ell.length,r1item.snapshotItem(0).parentNode)
                        if(ell.length)
                        {
                            r1 = ell[0].innerHTML.match(/[\d\.]+/g)[0] * 1
                        }
                        //console.log("r1",r1)
                        //let imgs = r1item.snapshotItem(0).getElementsByTagName("img")
                        //for (let j = 0; j < imgs.length; j++) {
                        //    imgs[j].parentElement.removeChild(imgs[j])
                        //}
                        //r1 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1
                    }
                    r1item = tmpdoc.evaluate(".//i[@class='r2']", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (r1item.snapshotLength) {
                        ell = r1item.snapshotItem(0).parentNode.getElementsByTagName("span")
                        if(ell.length)
                        {
                            r2 = ell[0].innerHTML.match(/[\d\.]+/g)[0] * 1
                        }
                        /*let ell = r1item.snapshotItem(0)
                        let imgs = r1item.snapshotItem(0).getElementsByTagName("img")
                        for (let j = 0; j < imgs.length; j++) {
                            imgs[j].parentElement.removeChild(imgs[j])
                        }
                        r2 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1*/
                    }
                    r1item = tmpdoc.evaluate(".//i[@class='r3']", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (r1item.snapshotLength) {
                        ell = r1item.snapshotItem(0).parentNode.getElementsByTagName("span")
                        if(ell.length)
                        {
                            r3 = ell[0].innerHTML.match(/[\d\.]+/g)[0] * 1
                        }
                        /*
                        let ell = r1item.snapshotItem(0)
                        let imgs = r1item.snapshotItem(0).getElementsByTagName("img")
                        for (let j = 0; j < imgs.length; j++) {
                            imgs[j].parentElement.removeChild(imgs[j])
                        }
                        r3 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1*/
                    }
                    r1item = tmpdoc.evaluate(".//i[@class='r4']", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (r1item.snapshotLength) {
                        ell = r1item.snapshotItem(0).parentNode.getElementsByTagName("span")
                        if(ell.length)
                        {
                            r4 = ell[0].innerHTML.match(/[\d\.]+/g)[0] * 1
                        }
                        /*
                        let ell = r1item.snapshotItem(0)
                        let imgs = r1item.snapshotItem(0).getElementsByTagName("img")
                        for (let j = 0; j < imgs.length; j++) {
                            imgs[j].parentElement.removeChild(imgs[j])
                        }
                        r4 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1*/

                    }
                    if (ShranjujemPolja == "") {
                        ShranjujemPolja = TipPolja;
                    } else {
                        ShranjujemPolja += "|" + TipPolja;
                    }
                    try {
                        if (vsebina.childNodes[i * 2 + 1].getAttribute("class").indexOf("underConstruction") > -1) {
                            underconstruction = true;
                        }
                    } catch (err) {}
                    
                    try {
                        let lvnextDiv = SlikePolj[i].getAttribute("title").split('showCosts')[0].split("||")[1].split("<br />");
                        lvnext = lvnextDiv[lvnextDiv.length - 2].match(/[\d\.]+/g)[0] * 1;
                    } catch (err) {

                        lvnext = StopnjaPolja + 1

                        if (underconstruction) {
                            lvnext = lvnext + 1;
                        }
                        //this.log.debug("error next lv ", lvnext)
                    }
                }else{
                    r1=this.store.Buildings[ImePolja][lvnext][0];
                    r2=this.store.Buildings[ImePolja][lvnext][1];
                    r3=this.store.Buildings[ImePolja][lvnext][2];
                    r4=this.store.Buildings[ImePolja][lvnext][3];
                }
                

                tmpdoc = null;

                village.buildings[IdPolja].buildingType = ImePolja * 1;
                village.buildings[IdPolja].lvl = StopnjaPolja * 1;
                village.buildings[IdPolja].lvlNext = lvnext * 1;
                village.buildings[IdPolja].buildingType = ImePolja * 1;

                village.buildings[IdPolja].upgradeCosts["1"] = r1 * 1;
                village.buildings[IdPolja].upgradeCosts["2"] = r2 * 1;
                village.buildings[IdPolja].upgradeCosts["3"] = r3 * 1;
                village.buildings[IdPolja].upgradeCosts["4"] = r4 * 1;

            }
            
            if (ShranjujemPolja.length) {
                this.store.Player.IMENAPOLJ = ShranjujemPolja;
            }
            let novCas = new Date()
            novCas = novCas.getTime() + randomXToY(Math.round(60000 * (1 - this.store.Player.deviation) * this.store.Player.INTERVALGRADNJA), Math.round(60000 * (1 + this.store.Player.deviation) * this.store.Player.INTERVALGRADNJA));
            village.CASANALIZEGRADNJA1 = novCas;

        } else {
            //this.log.debug("Error analysing fields. Please contact administrator with this error on forum");
        }
    }
}.bind(this)

const analizirajZgradbe = function (doc, village, url) {

    if (url.indexOf("dorf2") > -1) {
        let CasZdaj = new Date();
        let divZPolji = doc.getElementById("village_map");

        let SlikePolj = divZPolji.getElementsByTagName("img");
        let Polja = [
            [0, 0, 0]
        ];
        let area = doc.evaluate(".//div[contains(@class, 'buildingSlot') and contains(@class, ' a') and contains(@class, ' g')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        //let PoljaZaShranjevanje = CasZdaj.getDay() + ":" + CasZdaj.getMonth() + ":" + CasZdaj.getFullYear() + ":" + CasZdaj.getHours() + ":" + CasZdaj.getMinutes() + ":" + CasZdaj.getSeconds();
        //let area = doc.getElementsByTagName("area");

        for (let i = 0; i < area.snapshotLength; i++) {
            let IdPolja=0;
            let ImePolja=0;
            let TipSlike = area.snapshotItem(i).getAttribute("class");
            //console.log(TipSlike)
            //let TipSlike2 = area.snapshotItem(i).getAttribute("title");
            
            //let tmpdoc = createDocument(TipSlike2)
            try {//building d1 g23
                ImePolja = TipSlike.split(" g")[1].match(/[\d\.]+/g)[0] * 1;
            }
            catch (Error) {
                ImePolja = 0;
            }
            try 
            {
                IdPolja = TipSlike.split(" a")[1].match(/[\d\.]+/g)[0] * 1 ;
            }
            catch (Error) {
                continue;
            }
            if (IdPolja>40 || IdPolja<19)
            {
                continue
            }
            
                //let IdPolja = i + 19;
            let StopnjaPolja = 0;
            let lvnext=0;
            try {
                let parser = new DOMParser();
                //console.log("test2")
                //console.log(area.snapshotItem(i).getElementsByTagName("div"))
                let TipSlike2tmp = area.snapshotItem(i).getElementsByTagName("div")[0].getAttribute("title")
                //console.log(TipSlike2tmp)
                let tmpel = parser.parseFromString(TipSlike2tmp, "text/html");
                //console.log(tmpel)
                try {
                    let TipSlike2tmp = tmpel.getElementsByClassName("level")[0].innerHTML
                    StopnjaPolja = TipSlike2tmp.match(/[\d\.]+/g)[0] * 1;
                    //lvnext=StopnjaPolja
                    //if (tmpel.getElementsByClassName("level")[0].nextSibling)
                    //{
                    //    let aaa=tmpel.getElementsByClassName("level")[0].nextSibling.textContent.match(/[\d\.]+/g)
                    //    if (aaa.length)
                    //    {
                    //        lvnext=aaa[0]
                    //    }
                    //}
                }
                catch (Error) {

                }
                
                try {
                    let TipSlike2tmp = tmpel.getElementsByClassName("notice")[0].innerHTML
                    StopnjaPolja = TipSlike2tmp.match(/[\d\.]+/g)[0] * 1;
                }
                catch (Error) {

                }

                if(StopnjaPolja===0||StopnjaPolja===null){
                    try {
                        StopnjaPolja = area.snapshotItem(i).getElementsByClassName("labelLayer")[0].innerHTML * 1;
                    }
                    catch (Error) {
    
                    }
                }
                lvnext=StopnjaPolja+1
                let underconstruction = false;
                let tmpdoc=tmpel
                //console.log(tmpel)
                
                let r1 = 9999999;
                let r2 = 9999999;
                let r3 = 9999999;
                let r4 = 9999999;
                if(tmpdoc)
                {
                    let r1item = tmpdoc.evaluate(".//i[contains(@class,'r1')]/..//span[contains(@class,'value')]", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    //console.log("r1item.snapshotLength",r1item.snapshotLength)
                    if (r1item.snapshotLength>0) {
                        let ell = r1item.snapshotItem(0)
                        r1 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1
                    }
                    r1item = tmpdoc.evaluate(".//i[contains(@class,'r2')]/..//span[contains(@class,'value')]", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (r1item.snapshotLength>0) {
                        let ell = r1item.snapshotItem(0)
                        r2 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1
                    }
                    r1item = tmpdoc.evaluate(".//i[contains(@class,'r3')]/..//span[contains(@class,'value')]", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (r1item.snapshotLength>0) {
                        let ell = r1item.snapshotItem(0)
                        r3 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1
                    }
                    r1item = tmpdoc.evaluate(".//i[contains(@class,'r4')]/..//span[contains(@class,'value')]", tmpdoc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                    if (r1item.snapshotLength>0) {
                        let ell = r1item.snapshotItem(0)
                        r4 = ell.innerHTML.match(/[\d\.]+/g)[0] * 1
                    }
                }
                
                village.buildings[IdPolja].buildingType = ImePolja * 1;
                village.buildings[IdPolja].lvl = StopnjaPolja * 1;
                village.buildings[IdPolja].lvlNext = lvnext * 1;
                village.buildings[IdPolja].buildingType = ImePolja * 1;
                if(IdPolja===40 && r1===9999999 && StopnjaPolja*1>0){
                    try{
                    r1=this.store.Buildings[ImePolja][StopnjaPolja+1][0];
                    r2=this.store.Buildings[ImePolja][StopnjaPolja+1][1];
                    r3=this.store.Buildings[ImePolja][StopnjaPolja+1][2];
                    r4=this.store.Buildings[ImePolja][StopnjaPolja+1][3];
                    }
                    catch{}
                }
                village.buildings[IdPolja].upgradeCosts["1"] = r1 * 1;
                village.buildings[IdPolja].upgradeCosts["2"] = r2 * 1;
                village.buildings[IdPolja].upgradeCosts["3"] = r3 * 1;
                village.buildings[IdPolja].upgradeCosts["4"] = r4 * 1;
            }
            catch (Error) {
                //  console.log("error")
                //let StopnjaPolja = 0;
            }

        }

        let novCas = new Date()
        novCas = novCas.getTime() + randomXToY(Math.round(60000 * (1 - this.store.Player.deviation) * this.store.Player.INTERVALGRADNJA), Math.round(60000 * (1 + this.store.Player.deviation) * this.store.Player.INTERVALGRADNJA));
        village.CASANALIZEGRADNJA2 = novCas;
    }
}.bind(this)

const analizirajPlayer = function (doc) {
    let slikaheroj = doc.evaluate(".//img[contains(@src, 'uid=') and @class='heroImage']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    /*if (slikaheroj.snapshotLength > 0) {
        let uid = slikaheroj.snapshotItem(0).getAttribute("src").split("uid=")[1].match(/[\d\.]+/g)[0] * 1;
        this.store.Player.playerId = uid;
    } else {
        this.log.debug("cant find hero picture", slikaheroj)
        return false;
    }*/
    let deviation = this.store.Player.deviation;
    let playerName = doc.getElementsByClassName("playerName")
	if(playerName.length)
	{
		playerName=playerName[0].getElementsByTagName("a")
		if(playerName.length)
		{
			playerName = playerName[playerName.length - 1].innerHTML;
			//this.log.debug(playerName)
			this.store.Player.name = playerName;
		}
	}
	
	
    //this.log.debug(playerName)
    


    let tribe = -1;
    let ex = ".//div[@class='playerName']//a//img[contains(@class, 'nation nation')]";
    let tribeev = doc.evaluate(ex, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (tribeev.snapshotLength) {
        try {

            tribe = tribeev.snapshotItem(0).getAttribute("class").match(/[\d\.]+/g)[0] * 1;
        } catch (err) {}
    }
    //this.log.debug("tribe:",tribe);
    
    if(tribe===-1){
        
        tribe = doc.documentElement.innerHTML.indexOf("tribe1_")===-1?tribe:1;
        tribe = doc.documentElement.innerHTML.indexOf("tribe2_")===-1?tribe:2;
        tribe = doc.documentElement.innerHTML.indexOf("tribe3_")===-1?tribe:3;
        tribe = doc.documentElement.innerHTML.indexOf("tribe4_")===-1?tribe:4;
        tribe = doc.documentElement.innerHTML.indexOf("tribe5_")===-1?tribe:5;
        tribe = doc.documentElement.innerHTML.indexOf("tribe6_")===-1?tribe:6;
        tribe = doc.documentElement.innerHTML.indexOf("tribe7_")===-1?tribe:7;
    }

    this.store.Player.tribeId = tribe

    let split1 = doc.documentElement.innerHTML.split("Travian.Game.speed =")
    if (split1.length > 1) {
        let speed = split1[1].split(";")[0].match(/[\d\.]+/g)[0] * 1;
        this.store.Player.speed = speed;
        //this.log.debug("speed:", speed);
    }

    split1 = doc.documentElement.innerHTML.split("Travian.Game.country =")
    if (split1.length > 1) {
        split1 = split1[1].split(";")[0].split("'")
        if (split1.length > 2) {
            let country = split1[1]
            this.store.Player.country = country;
            //this.log.debug("country :", country);
        }
    }

    split1 = doc.documentElement.innerHTML.split("Travian.Game.worldId =")
    if (split1.length > 1) {
        split1 = split1[1].split(";")[0].split("'")
        if (split1.length > 2) {
            let worldId = split1[1]
            this.store.Player.worldId = worldId;
            //this.log.debug("worldId :", worldId);
        }
    }
    split1 = doc.documentElement.innerHTML.split("Travian.Game.version =")
    if (split1.length > 1) {
        split1 = split1[1].split(";")[0].split("'")
        if (split1.length > 2) {
            let version = split1[1]
            this.store.Player.travianVersion = version;
            //this.log.debug("version :", version);
        }
    }
    this.store.Player.playerId = this.store.Player.worldId+"_"+this.store.Player.name;


}.bind(this)

const pridobiVsaNaselja = function (doc) {
    let naseljjj = doc.getElementById("sidebarBoxVillagelist");
    if (!naseljjj) {
        return;
    }
    let allvillages = doc.evaluate("//ul//li//a[contains(@href, 'newdid=')]", naseljjj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    let allvillageids = []
    for (let i = 0; i < allvillages.snapshotLength; i++) {
        try {
            let villid = allvillages.snapshotItem(i).getAttribute("href").split("newdid=")[1].match(/[\d\.]+/g)[0] * 1;
            allvillageids.push(villid)
            let coorx = allvillages.snapshotItem(i).getElementsByClassName("coordinateX")[0].innerHTML.split("(").join("");
            coorx = convertToNumber(coorx)
            let coory = allvillages.snapshotItem(i).getElementsByClassName("coordinateY")[0].innerHTML.split(")").join("");
            coory = convertToNumber(coory)
            let villagename = allvillages.snapshotItem(i).getElementsByClassName("name")[0].innerHTML;
            let village = this.store.Player.getVillage(villid)
            if (!village) {
                village = this.store.Player.newVillage(villid, coorx, coory, villagename)
                //this.log.debug("New village detected:", village);
            }
            village.x = coorx;
            village.y = coory;
            village.name = villagename;
            village.villageId = villid;

        } catch (err) {
            //this.log.debug("error: ", err)
            continue;
        }
    }
    /*for (let i=0;i<this.store.Player.villages.length;i++)
    {*/
    let m = 0;
    while (m < 100 && this.store.Player.villages.length > 0) {
        if (!this.store.Player.villages[m]) {
            break;
        }
        //this.log.debug("villageStillExist:",this.store.Player.villages[m],allvillageids,villageStillExist(this.store.Player.villages[m],allvillageids));
        if (!villageStillExist(this.store.Player.villages[m], allvillageids)) {
            this.store.Player.villages.splice(m, 1)
        } else {
            m = m + 1
        }

    }
    //}
}.bind(this)

const villageStillExist = function (village, allvillageids) {
    for (let j = 0; j < allvillageids.length; j++) {
        if (village.villageId * 1 == allvillageids[j] * 1) {
            return true
        }
    }
    return false
}.bind(this)

const pridobiActiveVillage = function (doc) {
    let ActiveVillage = doc.evaluate(".//a[contains(@href, 'newdid=') and @class='active']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (ActiveVillage.snapshotLength > 0) {
        let villageid = ActiveVillage.snapshotItem(0).getAttribute("href").split("newdid=")[1].match(/[\d\.]+/g)[0] * 1;
        return villageid;
    }
    /*else {
        return undefined;
    }*/
}.bind(this)

const analizirajHero = function (doc, village, originalDocText, url) {
    if (!this.store.Player.hero.time) {
        this.store.Player.hero.time = 1
    }

    //analyse hero
    let herostatus = doc.getElementsByClassName("heroStatus100")
    let herostatus50 = doc.getElementsByClassName("heroStatus50")
    if (herostatus.length) {
        this.store.Player.hero.status = 0;
    } else // if(herostatus50.length)
    {
        this.store.Player.hero.status = 2;
    }

    let divAdvant = doc.evaluate(".//div[@id='sidebarBoxHero']/div[@class='speechBubbleContent']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    if (divAdvant.snapshotLength) {
        this.store.Player.hero.adventurePoints = divAdvant.snapshotItem(0).innerHTML.match(/[\d\.]+/g)[0] * 1;
    }

    if (url.indexOf("hero.php") > -1) {

        let divHealth = doc.evaluate(".//div[@class='attribute health tooltip']/div[@class='element current powervalue']/span[@class='value']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (divHealth.snapshotLength == 0) {
            divHealth = doc.evaluate(".//tr[@class='attribute health tooltip']/td[@class='element current powervalue']/span[@class='value']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        }       

        if (divHealth.snapshotLength > 0) {
            let herohealth = divHealth.snapshotItem(0).innerHTML.match(/[\d\.]+/g)[0] * 1;
            //this.log.debug("Hero health:",herohealth);
            if (herohealth != "NaN") {
                this.store.Player.hero.health = herohealth;
                this.store.Player.hero.lastHealthTime = new Date().getTime()
                saveplayer = true;
                //addLog("Hero", "", "Heros health: "+this.store.Player.hero.health,  1);
            } else {
                //addLog("Hero", "", "Heros health is not a number. Hero deactivated.",  2);
            }

        } else {   
            divHealth = doc.evaluate(".//div[@class='heroHealthBarBox alive']/div[@class='bar']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (divHealth.snapshotLength > 0) {
                let herohealth = divHealth.snapshotItem(0).style.width.match(/[\d\.]+/g)[0] * 1;

                //this.log.debug("Hero health:",herohealth);
                if (herohealth != "NaN") {
                    this.store.Player.hero.health = herohealth;
                    this.store.Player.hero.lastHealthTime = new Date().getTime()
                    saveplayer = true;
                    //addLog("Hero", "", "Heros health: "+this.store.Player.hero.health,  1);
                } else {
                    //addLog("Hero", "", "Heros health is not a number. Hero deactivated.",  2);
                }
    
            } else {
            this.log.debug("hero hp not found", 5)
            }
            //addLog("Hero", "", "Failed to read hero's health. Hero deactivated.",  2);
        }

        let split1 = originalDocText.split(' class="attribute health tooltip"')
        if (split1.length > 1) {
            let split2 = split1[1].split('#x202d;');
            if (split2.length > 1) {
                let split3 = split2[1].split('&');
                if (split3.length > 1) {
                    //this.store.Player.hero.health_regen=split3[0].match(/[\d\.]+/g)[0] * 1;
                    //this.log.debug("regen:",split3[0].match(/[\d\.]+/g)[0]);
                    this.store.Player.hero.regenerationRate = split3[0].match(/[\d\.]+/g)[0] * 1;
                    saveplayer = true;
                    //addLog("Hero", "", "Heros health regen: "+this.store.Player.hero.health_regen,  1);
                } else {
                    //addLog("Hero", "", "Failed to read hero's regeneration. Hero deactivated.",  2);
                }
            } else {
                //addLog("Hero", "", "Failed to read hero's regeneration. Hero deactivated.",  2);
            }
        } else {
            //addLog("Hero", "", "Failed to read hero's regeneration. Hero deactivated.",  2);
        }
        let divSpeed = doc.evaluate(".//div[@id='attributes']/span[@class='speed tooltip']/strong[@class='value']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (divHealth.snapshotLength) {
            divHealth = doc.evaluate(".//tr[@class='attribute health tooltip']/td[@class='element current powervalue']/span[@class='value']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        }
        let HeroSpeed = doc.getElementById("heroSpeedValueNumber")
        if (HeroSpeed) {
            this.store.Player.hero.speed = HeroSpeed.innerHTML.match(/[\d\.]+/g)[0] * 1;
        }
        //this.store.Player.hero.analyse_time=timeNow.getTime();
        saveplayer = true;
        let heroobjekt = {}
        split1 = originalDocText.split('new Travian.Game.Hero.Inventory(')
        if (split1.length > 1) {
            let split2 = split1[1].split('text:')
            if (split2.length > 1) {
                let objekttext = split2[0] + "}";
                objekttext = objekttext.substring(objekttext.indexOf("{"), objekttext.length);
                heroobjekt = JSON5.parse(objekttext);
                //this.log.debug("heroobjekt:",heroobjekt)

            } else {
                //addLog("Hero", "", "Failed to read hero's data. Hero deactivated.",  2);
            }
        } else {
            //addLog("Hero", "", "Failed to read hero's data. Hero deactivated.",  2);
        }
        /*this.log.debug("heroobjekt",heroobjekt)
        if(heroobjekt.isInVillage)
        {
            //this.store.Player.hero.status=0;
            //this.store.Player.hero.time=1
        }
        else
        {
            let divHealth = doc.evaluate(".//div[@class='heroStatusMessage ']/span[contains(@id,'timer')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if (divHealth.snapshotLength > 0) {
                let cas=divHealth.snapshotItem(0).innerHTML.split(":");
                this.store.Player.hero.time=timeNow.getTime()+cas[0]*3600000+cas[1]*60000+cas[2]*1000+randomXToY(5000,15000);
                saveplayer=true;
                //this.log.debug("this.store.Player.hero.time:",cas)

            }
            else
            {
                //addLog("Hero", "", "Hero is not in village.",  2);
            }
        }*/
    }
}.bind(this)

const AnalizirajTrznico = function (doc, village, originalDocText, url) {
    //this.log.debug("AnalizirajTrznico");
    let sendselect = doc.getElementById("send_select");
    //analyse marketplace
    if (sendselect) //marketplace
    {
        //this.log.debug("on marketplace");
        let merchantsdiv = doc.evaluate(".//div[@class='boxes boxesColor gray traderCount']/div[@class='boxes-contents cf']", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (merchantsdiv.snapshotLength > 0) {
            let trgovci = merchantsdiv.snapshotItem(0).innerHTML.match(/[\d\.]+/g);
            this.log.debug("Nr. of merchants: ", trgovci);
            
            village.Merchants.merchantsFree = trgovci[0] * 1
            village.Merchants.max = trgovci[1] * 1
            //naselje1.TRGOVCI[0][0] = trgovci[0] * 1;
            //naselje1.TRGOVCI[0][1]=trgovci[1]*1;
            //naselje1
        } else {
            //this.log.debug("unable to find number of merchants.");
            //naselje1.TRGOVCI[0][0] = 0;
            village.Merchants.merchantsFree = 0;
        }
        merchantsdiv = doc.evaluate(".//div[@class='carry']/b", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if (merchantsdiv.snapshotLength > 0) {
            trgovci = merchantsdiv.snapshotItem(0).innerHTML.match(/[\d\.]+/g);
            //this.log.debug("Merchants carry: ", trgovci);

            village.Merchants.carry = trgovci[0] * 1
            //naselje1.TRGOVCI[0][1] = trgovci[0] * 1;
            //naselje1.TRGOVCI[0][1]=trgovci[1]*1;
            //naselje1
        } else {
            //this.log.debug("unable to find number of merchants.");
            village.Merchants.carry = 0;
        }
        
        village.Merchants.maxCapacity = village.Merchants.merchantsFree*village.Merchants.carry;

        let Pleme = this.store.Player.tribeId * 1;
        let HitrostTrgovcev = 1;

        if (Pleme == 1) {
            HitrostTrgovcev = 16;
        } else if (Pleme == 2) {
            HitrostTrgovcev = 12;
        } else if (Pleme == 3) {
            HitrostTrgovcev = 24;
        } else if (Pleme == 6) {
            HitrostTrgovcev = 16;
        } else if (Pleme == 7) {
            HitrostTrgovcev = 20;
        }

        village.Merchants.speed = HitrostTrgovcev*this.store.Player.speed
        let tabelastrgovci = doc.getElementById("merchantsOnTheWayFormular")
        analizirajTrgovce(doc, tabelastrgovci, village)

        let novCas = new Date();
        novCas = novCas.getTime() + randomXToY(Math.round(60000 * (1 - this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA), Math.round(60000 * (1 + this.store.Player.deviation) * this.store.Player.INTERVALTRZNICA));
        village.CASANALIZETRZNICA = novCas;

    }
    return true;
}.bind(this)

const analizirajTrgovce = function (doc, tabelastrgovci, village) {
    let previossiblings = 0;
    let prihajajocitrgovcinaslov = null;
    let odhajajocitrgovcinaslov = null;
    let maxmerhants = village.Merchants.max;
    let availablemerchants = village.Merchants.merchantsFree;
    let HitrostTrgovcev = village.Merchants.speed;
    let TrgovciNosijo = village.Merchants.carry
    //console.log("analizirajTrgovce")
    if (tabelastrgovci) {
        //console.log("tabelastrgovci")
        let naslovi = tabelastrgovci.getElementsByTagName("h4")
        let ex11 = ".//tr[@class='res']";
        let Tabele = doc.evaluate(ex11, tabelastrgovci, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        //this.log.debug("naslovi",naslovi)
        let nadaljuj = true
        if (naslovi.length == 2) {
            let naslov1 = naslovi[0].innerHTML.trim()
            let naslov2 = naslovi[1].innerHTML.trim()
            this.store.Player.translations.incomingmerchants = naslov1;
            this.store.Player.translations.outgoingmerchants = naslov2;
            //this.log.debug("naslov1",naslov1)
            //this.log.debug("naslov2",naslov2)
            prihajajocitrgovcinaslov = naslovi[0]
            odhajajocitrgovcinaslov = naslovi[1]
            previossiblings = getNrOfPreviousSiblings(odhajajocitrgovcinaslov)
            //this.log.debug("previossiblings",previossiblings)
        } else if (naslovi.length == 1) {
            if (this.store.Player.translations.incomingmerchants != "" && naslovi[0].innerHTML.split(this.store.Player.translations.incomingmerchants).length > 1) {
                prihajajocitrgovcinaslov = naslovi[0]
            } else if (this.store.Player.translations.outgoingmerchants != "" && naslovi[0].innerHTML.split(this.store.Player.translations.outgoingmerchants).length > 1) {
                odhajajocitrgovcinaslov = naslovi[0]
            } else {
                //this.log.debug("no saved own merchants")
                //naselje1.PONUDBETRGOVCI = 0;
                //let ana = AnalizirajTrznicoXX(doc, naselje1.villageid);
                //nadaljuj = false


                let skupnotrgovcevvtrznici = 0;
                for (let gfsd = 0; gfsd < Tabele.snapshotLength; gfsd++) {
                    let Tabele1 = Tabele.snapshotItem(gfsd);
                    let poljezsur = Tabele1.getElementsByTagName("span")[0]
                    let Celatabela = Tabele1.parentNode.parentNode;
                    let naslovnacelica = Celatabela.getElementsByTagName("thead")[0].getElementsByClassName("dorf")[0]
                    let Tatimer = Celatabela.getElementsByClassName("timer")[0].innerHTML.split(":")
                    let PrihodCezSekund = Tatimer[0] * 3600 + Tatimer[1] * 60 + Tatimer[2] * 1;
                    let idnaseljavkateregaposiljam = naslovnacelica.getElementsByTagName("a")[0].getAttribute("href").split("d=")[1].match(/[\d\.]+/g)[0] * 1
                    let classpoljezsur = poljezsur.getAttribute("class")
                    let surovine = [
                        poljezsur.innerHTML.split('class="r1"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1,
                        poljezsur.innerHTML.split('class="r2"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1,
                        poljezsur.innerHTML.split('class="r3"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1,
                        poljezsur.innerHTML.split('class="r4"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1
                    ]
                    //this.log.debug("surovine ", surovine, TrgovciNosijo)
                    let SteviloPoslanihTrgovcev = Math.ceil((surovine[0] + surovine[1] + surovine[2] + surovine[3]) / Math.max(TrgovciNosijo, 1));
                    skupnotrgovcevvtrznici += SteviloPoslanihTrgovcev
                }
                //let maxmerhants = village.Merchants.max;

                //this.log.debug("skupnotrgovcevvtrznici ", skupnotrgovcevvtrznici)
                //this.log.debug("maxmerhants ", maxmerhants)
                //this.log.debug("availablemerchants ", availablemerchants)
                if (skupnotrgovcevvtrznici + availablemerchants > maxmerhants) {
                    prihajajocitrgovcinaslov = naslovi[0]
                } else {
                    odhajajocitrgovcinaslov = naslovi[0]
                }
                //nadaljuj = false
            }


        } else {
            //this.log.debug("ni trgovcev na poti.")
            nadaljuj = false
        }
        //this.log.debug(naselje1.TRGOVCI)
        if (nadaljuj) {
            //this.log.debug("Nadaljujem")

            let VracanjaTrgovcev = [];
            let PrihajajoceSurovine = [];
            for (let gfsd = 0; gfsd < Tabele.snapshotLength; gfsd++) {
                let Tabele1 = Tabele.snapshotItem(gfsd);
                let poljezsur = Tabele1.getElementsByTagName("span")[0]
                let Celatabela = Tabele1.parentNode.parentNode;
                let naslovnacelica = Celatabela.getElementsByTagName("thead")[0].getElementsByClassName("dorf")[0]
                let predelementov = getNrOfPreviousSiblings(Celatabela)
                //this.log.debug("predelementov",predelementov)
                let lastninapoti = false
                let prihajajocituji = false
                //this.log.debug("prihajajocitrgovcinaslov",prihajajocitrgovcinaslov)
                if (predelementov < previossiblings) {
                    //this.log.debug("tuji1")
                    prihajajocituji = true
                } else if (odhajajocitrgovcinaslov) {
                    //this.log.debug("lastni")
                    lastninapoti = true
                } else {
                    prihajajocituji = true
                    //this.log.debug("tuji2")
                }

                let Tatimer = Celatabela.getElementsByClassName("timer")[0].innerHTML.split(":")
                let PrihodCezSekund = Tatimer[0] * 3600 + Tatimer[1] * 60 + Tatimer[2] * 1;
                let idnaseljavkateregaposiljam = naslovnacelica.getElementsByTagName("a")[0].getAttribute("href").split("d=")[1].match(/[\d\.]+/g)[0] * 1
                let classpoljezsur = poljezsur.getAttribute("class")
                //this.log.debug(poljezsur,classpoljezsur, 5)
                let surovine = [
                        poljezsur.innerHTML.split('class="r1"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1,
                        poljezsur.innerHTML.split('class="r2"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1,
                        poljezsur.innerHTML.split('class="r3"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1,
                        poljezsur.innerHTML.split('class="r4"')[1].split("span")[1].split(">")[1].split("<")[0].match(/[\d\.]+/g)[0] * 1
                ]
                let SteviloPoslanihTrgovcev = Math.ceil((surovine[0] + surovine[1] + surovine[2] + surovine[3]) / Math.max(TrgovciNosijo, 1));
                //this.log.debug(surovine, 5)
                //this.log.debug(idnaseljavkateregaposiljam, 5)
                let SekundePotovanja = 1
                let CasVracanja = new Date();
                if (lastninapoti && classpoljezsur != "none") {
                    //this.log.debug("transportto", 5)


                    let XVasPosiljanja = getXfromCoord(idnaseljavkateregaposiljam * 1);
                    let YVasPosiljanja = getYfromCoord(idnaseljavkateregaposiljam * 1);

                    let RazdaljaVmes = PridobiRazdaljo(village.x * 1, village.y * 1, XVasPosiljanja * 1, YVasPosiljanja * 1);
                    let SekundePotovanja = Math.ceil(RazdaljaVmes * 3600 / (this.store.Player.speed * HitrostTrgovcev)) + 5;
                    let VracanjeCezSekund = SekundePotovanja + PrihodCezSekund;

                    
                    CasVracanja.setSeconds(CasVracanja.getSeconds() + VracanjeCezSekund);

                    let vracamke = {
                        trgovci: SteviloPoslanihTrgovcev,
                        time: CasVracanja.getTime()
                    }
                    VracanjaTrgovcev.push(vracamke)
                } else if (prihajajocituji) {
                    //this.log.debug("transportfrom")
                    let VracanjeCezSekund = SekundePotovanja + PrihodCezSekund;
                    //this.log.debug("VracanjeCezSekund", VracanjeCezSekund)
                    //let CasVracanja = new Date();
                    //CasVracanja.setSeconds(CasVracanja.getSeconds() + VracanjeCezSekund);
                    //this.log.debug("village", village,surovine)
                    //this.log.debug("timeFinish", CasVracanja.getTime()+VracanjeCezSekund*1000)
                    let vracamke={
                        "troopId": 0,
                        "villageIdStart": 0,
                        "playerNameStart": "",
                        "villageNameStart": "",
                        "villageIdTarget": village.villageId,
                        "villageNameTarget": "",
                        "playerNameTarget": "",
                        "playerIdTarget": 0,
                        "timeStart": 0,
                        "timeFinish": CasVracanja.getTime()+VracanjeCezSekund*1000,
                        "movementType": 7,
                        "resources": {
                            "1": surovine[0],
                            "2": surovine[1],
                            "3": surovine[2],
                            "4": surovine[3]
                        },
                        "treasures": 0,
                        "spyTarget": 0,
                        "catapultTarget1": 0,
                        "catapultTarget2": 0,
                        "culturePoints": 0,
                        "coordinateID": 0,
                        "merchants": 1,
                        "recurrences": "1",
                        "recurrencesTotal": "1"
                    }
                    //this.log.debug("vracamke", vracamke)
                    PrihajajoceSurovine.push(vracamke);

                } else if (lastninapoti && classpoljezsur == "none") {
                    this.log.debug("returnfrom", 5)
                    //let CasVracanja = new Date();
                    let VracanjeCezSekund = SekundePotovanja + PrihodCezSekund;
                    CasVracanja.setSeconds(CasVracanja.getSeconds() + VracanjeCezSekund);

                    let vracamke = {
                        trgovci: SteviloPoslanihTrgovcev,
                        time: CasVracanja.getTime()
                    }
                    VracanjaTrgovcev.push(vracamke);
                } else {
                    //console.this.log.debug("nic od nastetega")
                }
            }
            village.TRGOVCI = VracanjaTrgovcev;
            village.troopsMoving = PrihajajoceSurovine;
            //this.log.debug("VracanjaTrgovcev", VracanjaTrgovcev,village.name)
            //this.log.debug("PrihajajoceSurovine", PrihajajoceSurovine,village.name)
        }


    }
}.bind(this)

const request = function (url, data, type, headers, addwindowsize, delaymin,delaymax,hostname) {
    //this.log.debug("request", url, data, type, headers);
    let headers1 = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Upgrade-Insecure-Requests": 1
    }
    if (type == "POST") {
        headers1["Content-Type"] = "application/x-www-form-urlencoded"
    }
    if (headers) {
        for (header in headers) {
            headers1[header] = headers[header];
        }
    }
    /*this.log.debug('T4request start', url, data, type, headers1, {
        'url': url,
        'data': data,
        'type': type,
        timeout: 10000,
        timemin: 500,
        timemax: 2000,
        headers: headers1
    });;*/
    if(!delaymin)
    {
        delaymin=500
    }
    if(!delaymax)
    {
        delaymax=1500
    }
    return new Promise((resolve, reject) => {
        let delay = randomXToY(delaymin, delaymax);
        if (!!window.chrome) {
            setTimeout(function () {

                chrome.runtime.sendMessage("gegegmbnpdigalgfkegjgnfcpmolijdg", {
                    'url': url,
                    'data': data,
                    'type': type,
                    timeout: 10000,
                    timemin: 0,
                    timemax: 0,
                    headers: headers1,
                    delay: delay
                }, function (response) {
                    resolve(response);
                })
            }, delay);
        } else {
            setTimeout(function () {

                let _r1 = {};
                window.sendMessage("gegegmbnpdigalgfkegjgnfcpmolijdg", {
                    'url': url,
                    'data': data,
                    'type': type,
                    timeout: 10000,
                    timemin: 0,
                    timemax: 0,
                    headers: headers1,
                    delay: delay
                }, function (response) {
                    resolve(response.data);
                }, _r1);
            }, delay);
        }
    });
}.bind(this)

const wrapObjectFunctions = function (obj, before, after) {
    let key, value;

    for (key in obj) {
        value = obj[key];
        if (typeof value === "function") {
            wrapFunction(obj, key, value);
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

const getCoordfromXY = function (x, y) {
    if (!isNumber(x)) {
        x = convertToNumber(x+"");
    }

    if (!isNumber(y)) {
        y = convertToNumber(y+"");
    }
    let coordZ = (x * 1 + Math.ceil(this.store.map.width/2)) + ((this.store.map.right - y * 1) * this.store.map.width);
    return coordZ;
}.bind(this)

const isNumber = function (n) {
    if (n == "") return false;

    return !isNaN(parseFloat(n)) && isFinite(n);
}
const getXfromCoord = function (z) {
    z = parseInt(z);
    let x = ((z - 1) % this.store.map.width) - this.store.map.right;
    return x;
}.bind(this)

const getYfromCoord = function (z) {
    z = parseInt(z);
    let y = this.store.map.right - (parseInt(((z - 1) / this.store.map.width)));
    return y;
}.bind(this)

const sNumber = function (n) {
    if (n == "") return false;

    return !isNaN(parseFloat(n)) && isFinite(n);
}

const PridobiRazdaljo = function (x1, y1, x2, y2) {
    return Math.sqrt((x1 * 1 - x2 * 1) * (x1 * 1 - x2 * 1) + (y1 * 1 - y2 * 1) * (y1 * 1 - y2 * 1))
}

const getElementIndex = function (element) {
    return Array.prototype.indexOf.call(element.parentNode.childNodes, element);
}

const getNrOfPreviousSiblings = function (element1) {
    let minprevel = 0;
    c = element1;
    while (c && minprevel < 1000) {
        c = c.previousElementSibling;
        minprevel++;
    }
    return minprevel
}

const randomXToY = function (x, y) {
    return Math.round(Math.random() * (y - x)) + x;
}

const convertToNumber = function (numberstring) {
    let newnumber = "";
    for (let i = 0; i < numberstring.length; i++) {
        if (numberstring[i] * 1 + "" != "NaN" || numberstring[i] == "-") {
            newnumber += numberstring[i];
        }
        else if(numberstring[i] == String.fromCharCode(8722))
        {
            newnumber += "-";
        }
    }
    return newnumber * 1;
}
analyze.requestAndAnalyse = requestAndAnalyse;
analyze.analyzeMarketplace = analyzeMarketplace;
analyze.analyzeDorf2 = analyzeDorf2;
analyze.analyzeDorf1 = analyzeDorf1;