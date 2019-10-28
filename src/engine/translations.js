////////////////
//// prevodi ///
////////////////


class Translate {
        
    constructor() {
        this.getdata = "Get Data";
        this.start = "Start";
        this.stop = "Stop";
        this.savetoserver = "Save to server";
        this.deletedata = "Delete data";
        this.sendsms = "Send SMS";
        this.cropfinder = "Farm/crop finder";
        this.succesful = "Successfull";
        this.tasklist = "Task list";
        this.farmlist = "Farm list";
        this.trade = "Trade";
        this.train = "Train";
        this.fill = "Fill";
        this.empty = "Empty";
        this.priority = "Priority";
        this.to = "To";
        this.on = "ON";
        this.name = "Name";
        this.type = "type";
        this.del = "Del";
        this.turnon = "Turn ON";
        this.turnoff = "Turn OFF";
        this.repetevery = "Repeat every";
        this.minutes = "minutes";
        this.sendonreturn = "send again on return";
        this.login = "Login to travian and pres Get Data";
        this.edit = "Double click to edit";
        this.newval = "Enter new value";
        this.inputnum = "You need to input a number";
        this.attopt =
          "Input new value:" +
          "\n" +
          "2=Reinforcement" +
          "\n" +
          "3=Attack" +
          "\n" +
          "4=Raid";
        this.attoptallowed = "Only values 2, 3 and 4 are allowed.";
        this.allfields = "All fields";
        this.buldings = [
          "Building site",
          "Woodcutter",
          "Clay Pit",
          "Iron Mine",
          "Cropland",
          "Sawmill",
          "Brickyard",
          "Iron Foundry",
          "Grain Mill",
          "Bakery",
          "Warehouse",
          "Granary",
          "Blacksmith",
          "Armoury",
          "Tournament Square",
          "Main Building",
          "Rally point",
          "Marketplace",
          "Embassy",
          "Barracks",
          "Stable",
          "Workshop",
          "Academy",
          "Cranny",
          "Town Hall",
          "Residence",
          "Palace",
          "Treasury",
          "Trade Office",
          "Great Barracks",
          "Great Stable",
          "City Wall",
          "Earth Wall",
          "Palisade",
          "Stonemason's Lodge",
          "Brewery",
          "Trapper",
          "Hero's Mansion",
          "Great Warehouse",
          "Great Granary",
          "Wonder of the World",
          "Horse Drinking Trough"
        ];
        this.datarecieved =
          "Data recieved. Press start button to launch script.";
        this.datanotrecieved =
          "Data not recieved. Press update button agin to retry.";
        this.checking = "Checking what to do";
        this.analysingvillages = "Analysing all your villages.";
        this.sendingresurces = "Sending resources";
        this.trainingtroops = "Training troops";
        this.building = "Building";
        this.sendingtroops = "Sending troops to ";
        this.stopped = "Stopped";
        this.buildingsucessful = "Building sucessfull";
        this.buildingatwantedlevel =
          "Building unsucessfull. Buildung is already at wanted level";
        this.unabletobuild = "Building unsucessfull. Unable to build.";
        this.sendingressucessful = "Sending resources sucessfull";
        this.notenoughtres = "Not enought resources.";
        this.unabletosendres = "Unable to send resources to this destination.";
        this.trainingsuccesful = "Training troops sucessfull";
        this.sendingtroopssuccesul = "Sending troops sucessfull.";
        this.deletedfarm = "Farm deleted/blocked";
        this.farminunsuccesful = "Farming unsuccesful";
        this.gettingdata = "Getting data";
        this.deletingdata = "Deleting data";
        this.deleted = "Deleted";
        this.nodata = "Error: probably no data on server";
        this.upgradeallfields = "Upgrade all fields";
        this.veryhigh = "Very high";
        this.high = "High";
        this.normal = "Normal";
        this.low = "Low";
        this.verylow = "Very low";
        this.level = "Level";
        this.addtask = "Add task";
        this.fillres = "Fill resources to set %:";
        this.emptyres = "Empty resources to set % :";
        this.onetimesending = "One time sending";
        this.bypercent = "Send by %";
        this.custom = "Custom";
        this.minsres = "Min res:";
        this.trainonce = "Train once";
        this.trainlater = "Train later";
        this.addtofarmlist = "Add to farmlist";
        this.helpupgradeallfields =
          "Set task to upgrade all your fields. if set to level 10, all fields will be upgraded to level 1, then all to level 2,... until all fields are at wanted level.";
        this.helptrain = "Train troops later. " + "\n";
        this.helptrain +=
          "Train once: troops will ve trained and task will be deleted" + "\n";
        this.helptrain +=
          "Repeat every minutes: after script trains units, it will wait for set time and then try to train units again. If you dont have enought resources, script will wait to get enought resources, train units when there is enought resources and again wait for set time before training again. Task will not get deleted from list.";
        this.helpsendres = "Traider" + "\n";
        this.helpsendres +=
          "One time sending: imput resources into resource boxes and set coordinate, click add task and bot will send them later" +
          "\n";
        this.helpsendres +=
          "Send on return: imput resources into resource boxes and set coordinate, click add task and bot will send them to other village as soon as traiders return from trip" +
          "\n";
        this.helpsendres +=
          "Send every minutes: imput resources into resource boxes and set coordinate, imput X number, click add task and bot will try to send them to other village every X minutes" +
          "\n";
        this.helpsendres += "Send by % : " + "\n";
        this.helpsendres +=
          "Min res: min amount of res script can send (so it wont send 1 resource)" +
          "\n";
        this.helpsendres +=
          "Empty resources to set % : this village should send as much resourses to set village that in village will remain that % of resources that are set:" +
          "\n";
        this.helpsendres +=
          "If all set to 10% and you have warhouse 80 000, village will try to send out all resources but 8000 of each will remain in village." +
          "\n";
        this.helpsendres +=
          "Fill resources to set %: the village you are sending resourses to should fill to warhouse of village you are sending to to this value:" +
          "\n";
        this.helpsendres +=
          "If all set to 90% and warhouse can contain 80 000 resources, it will send resources to this village untill it reaches 72 000." +
          "\n";
        this.helpsendres +=
          "So this village should never have less then set % resources (unless you spend it otherwise) and village you are sending resources to should not have more resources then set % (unless it produce them or get it from other villages later)." +
          "\n";
        this.helptasklist =
          "Task added in travian window will show up here." + "\n";
        this.helptasklist += "Every village has its own building list";
        this.helpfarmlist =
          "Farms added in travian window will show up here. Double click on number you wish to change and window will show up where you can set new number." +
          "\n";
        this.helpfarmlist +=
          "Checkbox decide if farm is turned on or off" + "\n";
        this.helpfarmlist +=
          "Buttons Turn On and Turn Off decide if whole farmlist for this village is turned on" +
          "\n";
      }

      setlanguage(lang) {
        switch (lang) {
            case "en":
            this.getdata = "Get Data";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Save to server";
            this.deletedata = "Delete data";
            this.sendsms = "Send SMS";
            this.cropfinder = "Farm/crop finder";
            this.succesful = "Successfull";
            this.tasklist = "Task list";
            this.farmlist = "Farm list";
            this.trade = "Trade";
            this.train = "Train";
            this.fill = "Fill";
            this.empty = "Empty";
            this.priority = "Priority";
            this.to = "To";
            this.on = "ON";
            this.name = "Name";
            this.type = "type";
            this.del = "Del";
            this.turnon = "Turn ON";
            this.turnoff = "Turn OFF";
            this.repetevery = "Repeat every";
            this.minutes = "minutes";
            this.sendonreturn = "send again on return";
            this.login = "Login to travian and pres Get Data";
            this.edit = "Double click to edit";
            this.newval = "Enter new value";
            this.inputnum = "You need to input a number";
            this.attopt =
              "Input new value:" +
              "\n" +
              "2=Reinforcement" +
              "\n" +
              "3=Attack" +
              "\n" +
              "4=Raid";
            this.attoptallowed = "Only values 2, 3 and 4 are allowed.";
            this.allfields = "All fields";
            this.buldings = [
              "Building site",
              "Woodcutter",
              "Clay Pit",
              "Iron Mine",
              "Cropland",
              "Sawmill",
              "Brickyard",
              "Iron Foundry",
              "Grain Mill",
              "Bakery",
              "Warehouse",
              "Granary",
              "Blacksmith",
              "Armoury",
              "Tournament Square",
              "Main Building",
              "Rally point",
              "Marketplace",
              "Embassy",
              "Barracks",
              "Stable",
              "Workshop",
              "Academy",
              "Cranny",
              "Town Hall",
              "Residence",
              "Palace",
              "Treasury",
              "Trade Office",
              "Great Barracks",
              "Great Stable",
              "City Wall",
              "Earth Wall",
              "Palisade",
              "Stonemason's Lodge",
              "Brewery",
              "Trapper",
              "Hero's Mansion",
              "Great Warehouse",
              "Great Granary",
              "Wonder of the World",
              "Horse Drinking Trough"
            ];
            this.datarecieved =
              "Data recieved. Press start button to launch script.";
            this.datanotrecieved =
              "Data not recieved. Press update button agin to retry.";
            this.checking = "Checking what to do";
            this.analysingvillages = "Analysing all your villages.";
            this.sendingresurces = "Sending resources";
            this.trainingtroops = "Training troops";
            this.building = "Building";
            this.sendingtroops = "Sending troops to ";
            this.stopped = "Stopped";
            this.buildingsucessful = "Building sucessfull";
            this.buildingatwantedlevel =
              "Building unsucessfull. Buildung is already at wanted level";
            this.unabletobuild = "Building unsucessfull. Unable to build.";
            this.sendingressucessful = "Sending resources sucessfull";
            this.notenoughtres = "Not enought resources.";
            this.unabletosendres = "Unable to send resources to this destination.";
            this.trainingsuccesful = "Training troops sucessfull";
            this.sendingtroopssuccesul = "Sending troops sucessfull.";
            this.deletedfarm = "Farm deleted/blocked";
            this.farminunsuccesful = "Farming unsuccesful";
            this.gettingdata = "Getting data";
            this.deletingdata = "Deleting data";
            this.deleted = "Deleted";
            this.nodata = "Error: probably no data on server";
            this.upgradeallfields = "Upgrade all fields";
            this.veryhigh = "Very high";
            this.high = "High";
            this.normal = "Normal";
            this.low = "Low";
            this.verylow = "Very low";
            this.level = "Level";
            this.addtask = "Add task";
            this.fillres = "Fill resources to set %:";
            this.emptyres = "Empty resources to set % :";
            this.onetimesending = "One time sending";
            this.bypercent = "Send by %";
            this.custom = "Custom";
            this.minsres = "Min res:";
            this.trainonce = "Train once";
            this.trainlater = "Train later";
            this.addtofarmlist = "Add to farmlist";
            this.helpupgradeallfields =
              "Set task to upgrade all your fields. if set to level 10, all fields will be upgraded to level 1, then all to level 2,... until all fields are at wanted level.";
            this.helptrain = "Train troops later. " + "\n";
            this.helptrain +=
              "Train once: troops will ve trained and task will be deleted" + "\n";
            this.helptrain +=
              "Repeat every minutes: after script trains units, it will wait for set time and then try to train units again. If you dont have enought resources, script will wait to get enought resources, train units when there is enought resources and again wait for set time before training again. Task will not get deleted from list.";
            this.helpsendres = "Traider" + "\n";
            this.helpsendres +=
              "One time sending: imput resources into resource boxes and set coordinate, click add task and bot will send them later" +
              "\n";
            this.helpsendres +=
              "Send on return: imput resources into resource boxes and set coordinate, click add task and bot will send them to other village as soon as traiders return from trip" +
              "\n";
            this.helpsendres +=
              "Send every minutes: imput resources into resource boxes and set coordinate, imput X number, click add task and bot will try to send them to other village every X minutes" +
              "\n";
            this.helpsendres += "Send by % : " + "\n";
            this.helpsendres +=
              "Min res: min amount of res script can send (so it wont send 1 resource)" +
              "\n";
            this.helpsendres +=
              "Empty resources to set % : this village should send as much resourses to set village that in village will remain that % of resources that are set:" +
              "\n";
            this.helpsendres +=
              "If all set to 10% and you have warhouse 80 000, village will try to send out all resources but 8000 of each will remain in village." +
              "\n";
            this.helpsendres +=
              "Fill resources to set %: the village you are sending resourses to should fill to warhouse of village you are sending to to this value:" +
              "\n";
            this.helpsendres +=
              "If all set to 90% and warhouse can contain 80 000 resources, it will send resources to this village untill it reaches 72 000." +
              "\n";
            this.helpsendres +=
              "So this village should never have less then set % resources (unless you spend it otherwise) and village you are sending resources to should not have more resources then set % (unless it produce them or get it from other villages later)." +
              "\n";
            this.helptasklist =
              "Task added in travian window will show up here." + "\n";
            this.helptasklist += "Every village has its own building list";
            this.helpfarmlist =
              "Farms added in travian window will show up here. Double click on number you wish to change and window will show up where you can set new number." +
              "\n";
            this.helpfarmlist +=
              "Checkbox decide if farm is turned on or off" + "\n";
            this.helpfarmlist +=
              "Buttons Turn On and Turn Off decide if whole farmlist for this village is turned on" +
              "\n";
              break;
          case "si":
            this.getdata = "Pridobi podatke";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Shrani na server";
            this.deletedata = "Izbrisi podatke";
            this.sendsms = "Pošlji sms";
            this.cropfinder = "Iskalec farm/žita";
            this.succesful = "Uspešno";
            this.tasklist = "Seznam nalog";
            this.farmlist = "Seznam farm";
            this.trade = "Trguj";
            this.train = "Uri";
            this.fill = "Napolni";
            this.empty = "Izprazni";
            this.priority = "Prioriteta";
            this.to = "V";
            this.on = "Vkluceno";
            this.name = "Ime";
            this.type = "tip";
            this.del = "Izbris";
            this.turnon = "Vkljuci";
            this.turnoff = "Izkljuci";
            this.repetevery = "Ponovi vsakih";
            this.minutes = "minut";
            this.login =
              "Prijavi se v travian in pritisni gubm Pridobi podatke";
            this.edit = "Double click to edit";
            this.newval = "Vstavi novo vrednost";
            this.inputnum = "Vstaviti je potrebno stevilo";
            this.attopt =
              "Vstavi novo vrednost:" +
              "\n" +
              "2=Okrepitve" +
              "\n" +
              "3=Napad" +
              "\n" +
              "4=Ropanje";
            this.attoptallowed = "Dovoljena so le števila 2, 3 in 4.";
            this.allfields = "Vsa polja";
            this.buldings = [
              "zazidljiva parcela",
              "Gozdar",
              "Glinokop",
              "Rudnik železa",
              "Žitno polje",
              "Žaga",
              "Opekarna",
              "Talilnica železa",
              "Mlin",
              "Pekarna",
              "Skladišče",
              "Žitnica",
              "Izdelovalec orožja",
              "Izdelovalec oklepov",
              "Vadbišče",
              "Gradbeni ceh",
              "Zbirališče",
              "Tržnica",
              "Ambasada",
              "Barake",
              "Konjušnica",
              "Izdelovalec oblegovalnih naprav",
              "Akademija",
              "Špranja",
              "Mestna hiša",
              "Rezidenca",
              "Palača",
              "Zakladnica",
              "Trgovski center",
              "Velike barake",
              "Velika konjušnica",
              "Mestno obzidje",
              "Zemljen zid",
              "Palisada",
              "Kamnosek",
              "Pivovarna",
              "Postavljalec pasti",
              "Herojeva rezidenca",
              "Veliko skladišče",
              "Velika žitnica",
              "Čudo sveta",
              "Konjsko napajališče"
            ];
            this.datarecieved = "Podatki so pridoljeni. Klikni start za zagon.";
            this.datanotrecieved =
              "Podatki niso bili pridobljeni. Klikni update gumb za ponovni poizkus.";
            this.checking = "Razmišljam kaj bi naredila";
            this.analysingvillages = "Analiziranje vasic.";
            this.sendingresurces = "Posiljanje surovin";
            this.trainingtroops = "Treniranje enot";
            this.building = "Gradnja";
            this.sendingtroops = "Pošiljanje enot k ";
            this.stopped = "Ustavljeno";
            this.buildingsucessful = "Gradnja uspešna";
            this.buildingatwantedlevel =
              "Gradnja neuspešna. Zgradba je že na zahtevani stopnji";
            this.unabletobuild = "Gradnja neuspešna. Nemogoče graditi.";
            this.sendingressucessful = "Pošiljanje surovin neuspešno";
            this.notenoughtres = "Premalo surovin.";
            this.unabletosendres =
              "Nemogoče je poslati surovine na željeno lokacijo.";
            this.trainingsuccesful = "Uspešno urjenje enot";
            this.sendingtroopssuccesul = "Uspešno pošiljanje enot.";
            this.deletedfarm = "Farma je izbrisana/blokirana";
            this.farminunsuccesful = "Farmanje neuspešno";
            this.gettingdata = "Pridobivanje podatkov";
            this.deletingdata = "Brisanje podatkov";
            this.deleted = "Izbrisano";
            this.nodata = "Napaka: verjetno ni podatkov na serverju";
            this.upgradeallfields = "Nadgradi vsa polja";
            this.veryhigh = "Zelo visoka";
            this.high = "Visoka";
            this.normal = "Normalna";
            this.low = "Nizka";
            this.verylow = "Zelo nizka";
            this.level = "Stopnja";
            this.addtask = "Dodaj opravilo";
            this.fillres = "Napolni surovine do določenega %:";
            this.emptyres = "Izprazni surovine do določenega % :";
            this.onetimesending = "Enkratno pošiljanje";
            this.bypercent = "Pošlji po %";
            this.custom = "Po meri";
            this.minsres = "Minimalne surovine:";
            this.trainonce = "Treniraj enkrat";
            this.trainlater = "Treniraj kasneje";
            break;
          case "it":
            this.getdata = "Importa i Dati";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Salva su server";
            this.deletedata = "Elimina i dati";
            this.sendsms = "Invia SMS";
            this.cropfinder = "Trova Farm/grano";
            this.succesful = "OK";
            this.tasklist = "Lista Compiti";
            this.farmlist = "Lista Farm";
            this.trade = "Scambia";
            this.train = "Addestra";
            this.fill = "Riempi";
            this.empty = "Vuoto";
            this.priority = "Priorità";
            this.to = "Verso";
            this.on = "ON";
            this.name = "Nome";
            this.type = "tipo";
            this.del = "Del";
            this.turnon = "Attiva";
            this.turnoff = "Disattiva";
            this.repetevery = "Ripeti ogni";
            this.minutes = "minuti";
            this.sendonreturn = "Inviare nuovamente al ritorno";
            this.login = "Accedere a Travian e premere Importa i Dati";
            this.edit = "Doppio click per modificare";
            this.newval = "Inserire un nuovo valore";
            this.inputnum = "E' necessario inserire un valore numerico.";
            this.attopt =
              "Inserire un nuovo valore:" +
              "\n" +
              "2=Rinforzi" +
              "\n" +
              "3=Attacco" +
              "\n" +
              "4=Raid";
            this.attoptallowed = "Sono ammessi solo i valori 2, 3 e 4.";
            this.allfields = "Tutte le risorse";
            this.buldings = [
              "Sito di Costruzione",
              "Bosco",
              "Pozzo d'Argilla",
              "Miniera di Ferro",
              "Campo di Grano",
              "Segheria",
              "Fabbrica di Mattoni",
              "Fonderia",
              "Mulino",
              "Forno",
              "Magazzino",
              "Granaio",
              "Fabbro",
              "Armeria",
              "Arena",
              "Palazzo Pubblico",
              "Base Militare",
              "Mercato",
              "Ambasciata",
              "Caserma",
              "Scuderia",
              "Officina",
              "Accademia",
              "Deposito Segreto",
              "Municipio",
              "Reggia",
              "Castello",
              "Camera del Tesoro",
              "Ufficio Commerciale",
              "Grande Caserma",
              "Grande Scuderia",
              "Mura cittadine",
              "Fortificazioni",
              "Palizzata",
              "Genio Civile",
              "Birrificio",
              "Esperto di Trappole",
              "Dimora dell'Eroe",
              "Grande Magazzino",
              "Grande Granaio",
              "Meraviglia",
              "Fonte Equestre"
            ];
            this.datarecieved =
              "Dati ricevuti. Premere il pulsante start per lanciare lo script.";
            this.datanotrecieved =
              "Dati non ricevuti. Premere il pulsante update per riprovare";
            this.checking = "Controllo in corso";
            this.analysingvillages = "Analisi dei villaggi";
            this.sendingresurces = "Invio di risorse";
            this.trainingtroops = "Truppe in addestramento";
            this.building = "Costruzione";
            this.sendingtroops = "Invio le truppe verso ";
            this.stopped = "Fermato";
            this.buildingsucessful = "Costruzione riuscita";
            this.buildingatwantedlevel =
              "Costruzione non riuscita. La costruzione è già al livello desiderato.";
            this.unabletobuild =
              "Costruzione non riuscita. Impossibile costruire.";
            this.sendingressucessful = "Invio di risorse riuscito.";
            this.notenoughtres = "Risorse insufficienti.";
            this.unabletosendres =
              "Impossibile inviare risorse alla destinazione specificata.";
            this.trainingsuccesful = "Truppe addestrate.";
            this.sendingtroopssuccesul = "Invio di truppe riuscito.";
            this.deletedfarm = "Farm eliminata/bloccata";
            this.farminunsuccesful = "Farming non riuscito";
            this.gettingdata = "Ricezione dei dati";
            this.deletingdata = "Cancellazione dei dati";
            this.deleted = "Cancellato";
            this.nodata = "Errore: potrebbero non esserci dati sul server";
            this.upgradeallfields = "Amplia tutte le risorse";
            this.veryhigh = "Molto Alta";
            this.high = "Alta";
            this.normal = "Normale";
            this.low = "Bassa";
            this.verylow = "Molto Bassa";
            this.level = "Livello";
            this.addtask = "Aggiungi compito";
            this.fillres = "Riempi risorse fino alla % stabilita:";
            this.emptyres = "Svuota risorse alla % stabilita:";
            this.onetimesending = "Invia una sola volta";
            this.bypercent = "Invia per %";
            this.custom = "Personalizzato";
            this.minsres = "Minimo risorse:";
            this.trainonce = "Addestra una volta";
            this.trainlater = "Addestra dopo";
            this.addtofarmlist = "Aggiungi alla Lista Farm";
            this.helpupgradeallfields =
              "Aggiunge un compito per ampliare tutti i campi di risorse. Se impostato al livello 10, tutte le risorse saranno ampliate al livello 1, poi al livello 2,... finchè tutte le risorse saranno del livello desiderato.";
            this.helptrain = "Addestra le truppe dopo. " + "\n";
            this.helptrain +=
              "Addestra una volta: le truppe saranno addestrate e il compito eliminato" +
              "\n";
            this.helptrain +=
              "Ripeti ogni minuto: dopo che lo script ha addestrato le unità, attenderà un tempo prestabilito e proverà ad addestrare ulteriori truppe. Se non si dispone delle risorse necessarie, lo script attenderà di averne abbastanza, addestrerà le nuove unità e attenderà un tempo prestabilito prima di addestrarne altre. Il compito non verrà rimosso dalla lista.";
            this.helpsendres = "Mercante" + "\n";
            this.helpsendres +=
              "Invia una sola volta: inserire le risorse negli appositi spazi ed inserire le coordinate, cliccare su aggiungi compito e il bot le invierà successivamente" +
              "\n";
            this.helpsendres +=
              "Invia al ritorno: inserire le risorse negli appositi spazi ed inserire le coordinate, cliccare su aggiungi compito e il bot le invierà non appena i mercanti saranno tornati dagli altri villaggi" +
              "\n";
            this.helpsendres +=
              "Invia ogni minuto: inserire le risorse negli appositi spazi ed inserire le coordinate, inserire un numero X, cliccare su aggiungi compito e il bot proverà ad inviarle agli altri villaggi ogni X minuti" +
              "\n";
            this.helpsendres += "Invia per % : " + "\n";
            this.helpsendres +=
              "Minimo risorse: il minimo ammontare di risorse che lo script può inviare" +
              "\n";
            this.helpsendres +=
              "Svuota risorse fino alla % stabilita : questo villaggio invierà tante risorse al villaggio inserito quante quelle necessarie per rimanere con la % di risorse impostate: " +
              "\n";
            this.helpsendres +=
              "Impostandolo al 10%, se possiedi un magazzino che può contenere 80 000 risorse, il villaggio proverà ad inviare tutte le risorse tranne 8 000 per risorsa." +
              "\n";
            this.helpsendres +=
              "Riempi risorse fino alla % stabilita: il villaggio che invia dovrà rimpire il magazzino del villaggio che riceve fino alla % stabilit:" +
              "\n";
            this.helpsendres +=
              "Impostandolo al 90% se chi riceve le risorse ha un magazzino che può contenerne 80 000, gli verranno inviate risorse finchè non arriverà a 72 000." +
              "\n";
            this.helpsendres +=
              "Quindi il villaggio non avrà mai meno risorse della % stabilita e il villaggio ricevente non avrà mai più risorse della % impostata." +
              "\n";
            this.helptasklist =
              "I compiti aggiunti dalla finestra di Travian verranno elencati qui." +
              "\n";
            this.helptasklist +=
              "Ogni villaggio ha la propria lista di costruzioni";
            this.helpfarmlist =
              "Le farm aggiunte dalla finestra di Travian verranno elencate qui. Fai doppio click sui numeri che vuoi cambiare: apparirà una finestra che ti consentirà di impostare un nuovo valore." +
              "\n";
            this.helpfarmlist +=
              "Spuntare o meno le checkbox affianco alle farm per attivarle o meno" +
              "\n";
            this.helpfarmlist +=
              "I pulsanti Attiva e Disattiva permettono di attivare o disattivare l'intera Lista Farm per questo villaggio" +
              "\n";
            break;
          case "com.eg":
          case "com.sa":
          case "com.sy":
          case "ae":
            this.getdata = "الإتصال بالخادم";
            this.start = "إبدأ";
            this.stop = "توقف";
            this.savetoserver = "حفظ على الخادم";
            this.deletedata = "حذف البيانات";
            this.sendsms = "SMS إرسال";
            this.cropfinder = "بحث مزارع/قمحيات";
            this.succesful = "تم بنجاح";
            this.tasklist = "قائمة المهام";
            this.farmlist = "قائمة المزارع";
            this.trade = "التجارة";
            this.train = "تدريب القوات";
            this.fill = "إمتلاء/كفاية";
            this.empty = "فارغ";
            this.priority = "بأولوية";
            this.to = "إلى";
            this.on = "نشط";
            this.name = "إسم المبنى";
            this.type = "نوع";
            this.del = "حذف";
            this.turnon = "تشغيل";
            this.turnoff = "تعطيل";
            this.repetevery = "X تكرار كل";
            this.minutes = "دقائق";
            this.sendonreturn = "إرسال مرة أخرى حين العودة";
            this.login = "(سجل دخول باللعبه، ثم إضغط (الإتصال بالخادم";
            this.edit = "نقرة مزدوجة للتعديل";
            this.newval = "إدخال قيمة جديدة";
            this.inputnum = "يجب أن تدخل رقم";
            this.attopt =
              "إدخال قيمة جديدة:" +
              "\n" +
              "2= تعزيز" +
              "\n" +
              "3= هجوم" +
              "\n" +
              "4=نهب ";
            this.attoptallowed = "فقط القيم 2 و 3 و 4 هي المسموح بها.";
            this.allfields = "جميع الحقول";
            this.buldings = [
              "موقع البناء",
              "الحطاب",
              "حفرة الطين",
              "منجم الحديد",
              "حقل القمح",
              "معمل النشارة",
              "مصنع الطوب",
              "مسبك الحديد",
              "المطاحن",
              "المخابز",
              "المخزن",
              "مخزن الحبوب",
              "الحداد",
              "مستودع الدروع",
              "ساحة البطولة",
              "المبنى الرئيسي",
              "نقطة التجمع",
              "السوق",
              "السفارة",
              "الثكنه",
              "الإسطبل",
              "المصانع الحربية",
              "الأكاديمية",
              "المخبأ",
              "البلدية",
              "السكن",
              "القصر",
              "الخزنة",
              "المكتب التجاري",
              "الثكنة الكبيرة",
              "الإسطبل الكبير",
              "سور المدينة",
              "الحائط الأرضي",
              "الحاجز",
              "الحجار",
              "المعصرة",
              "الصياد",
              "قصر الأبطال",
              "مخزن كبير",
              "مخزن حبوب كبير",
              "معجزة العالم",
              "ساقية الخيول"
            ];
            this.datarecieved =
              "تم الحصول على البيانات، إضغط زر البدأ ليعمل الإسكربت";
            this.datanotrecieved =
              "لم يتم الحصول على البيانات. إضغط زر التحديث مرة أخرى لإعادة المحاولة";
            this.checking = "التحقق من العمل المطلوب";
            this.analysingvillages = "تحليل ومراجعة كل القرى";
            this.sendingresurces = "إرسال الموارد";
            this.trainingtroops = "تدريب القوات";
            this.building = "بناء";
            this.sendingtroops = "إرسال القوات إلى ";
            this.stopped = "متوقف";
            this.buildingsucessful = "تم البناء بنجاح";
            this.buildingatwantedlevel =
              "فشل البناء. المبنى بالفعل في المستوى المطلوب";
            this.unabletobuild = "فشل البناء. غير قادر على البناء";
            this.sendingressucessful = "تم إرسال الموارد بنجاح";
            this.notenoughtres = "الموارد غير كافية";
            this.unabletosendres = "غير قادر على إرسال الموارد لهذه الوجهه";
            this.trainingsuccesful = "تم تدريب القوات بنجاح";
            this.sendingtroopssuccesul = "تم إرسال القوات بنجاح";
            this.deletedfarm = "المزارع المحذوفه/المحظورة";
            this.farminunsuccesful = "فشل الزراعة";
            this.gettingdata = "الحصول على البيانات";
            this.deletingdata = "حذف البيانات";
            this.deleted = "حُذفت";
            this.nodata = "خطأ: من المحتمل أنه لا توجد بيانات على الخادم";
            this.upgradeallfields = "ترقية كل الحقول";
            this.veryhigh = "عاليه جدا";
            this.high = "عالية";
            this.normal = "عادية";
            this.low = "قليلة";
            this.verylow = "قليلة جدا";
            this.level = "المستوى";
            this.addtask = "إضافة مهمة";
            this.fillres = "ملأ الموارد إلى نسبة X%:";
            this.emptyres = "تفريغ الموارد إلى نسبة X% :";
            this.onetimesending = "إرسال مرة واحدة";
            this.bypercent = "إرسال بنسبة X%";
            this.custom = "تخصيص";
            this.minsres = "أقل حد للموارد:";
            this.trainonce = "درب مرة واحدة";
            this.trainlater = "تدريب لاحقا";
            this.addtofarmlist = "إضافة لقائمة المزارع";
            this.helpupgradeallfields =
              "ضبط المهام لترقية جميع حقولك. إذا تم الضبط لمستوى 10, جميع الحقول ستتم ترقيتها إلى المتسوى 1, ثم رفع الكل إلى المستوى 2 ... حتى تصل جميع الحقول للمستوى المطلوب.";
            this.helptrain = "تدريب القوات لاحقا. " + "\n";
            this.helptrain +=
              "تدريب مرة واحدة: سيتم تدريب القوات ثم يتم حذف المهمه - تعريب : باسم فتوح" +
              "\n";
            this.helptrain +=
              "الإعادة كل (دقائق): بعد ما يتم تدريب القوات, سينتظر الاسكربت للوقت المضبوط ثم يحاول تدريب الوحدات مرة أخرى. إذا لم تكن لديك الموارد الكافية, سينتظر الإسكربت لحين وجود موارد كافية للتدريب, ثم يتم التدريب حين وجود موارد كافيه ومجدداً ينتظر لوقت محدد قبل التدريب مرة أخرى. المهمة لن يتم حذفها من قائمة المهام. - تعريب : باسم فتوح basim_fotoh@yahoo.com";
            this.helpsendres = "التجار" + "\n";
            this.helpsendres +=
              "إرسال مرة واحده: إدخل الموارد لصندوق الموارد وأضبط نساقها, إضغط إضافة المهمة وسيرسلها البوت ملحقاً. - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres +=
              "الإرسال حين العودة: إدخل الموارد لصندوق الموارد وأضبط نساقها, إضغط إضافة المهمة وسيرسلها البوت إلى القرية الأخرى حين رجوع التجار من رحلتهم. - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres +=
              "إرسال كل (دقائق): إدخل الموارد لصندوق الموارد وأضبط نساقها, ثم قم بإدخال عدد الدقائق, إضغط إضافة المهمة وسيحاول البوت إرسالها إلى القرية الأخرى كلما يأتي وقت الإرسال حسب الدقائق المدخله مسبقاً. - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres += "إرسال بنسبة % : - تعريب : باسم فتوح" + "\n";
            this.helpsendres +=
              "أقل حد للموارد: أقل حد للموارد يمكن للإسكربت إرساله (وأكيد لن يقوم بإرسال مورد واحد) - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres +=
              "تفريغ المخازن إلى نسبة % : هذه القرية يجب أن ترسل موارد على قدر المستطاع للقرية المطلوبة وسيظل يرسل في الموارد للنسبة المطلوبة % من الموارد التي تم ضبطها: - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres +=
              "إذا تم ضبط الكل إلى 10% وسعة مخزنك 80 000, القرية ستحاول إرسال كل الموارد للخارج ولكن 8000 من كل مورد ستتبقى في القرية. - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres +=
              "ملأ المخازن إلى نسبة %: القرية التي تقوم بالإرسال إليها يجب أن تمتليء مخازنها للنسبة التي تقوم بتحديدها: - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres +=
              "إذا تم ضبط الكل إلى 90% وسعة مخزنك 80 000 من الموارد, ستبقى ترسل موارد إلى هذه القرية حتى تصل إلى 72 000 من الموارد. - تعريب : باسم فتوح" +
              "\n";
            this.helpsendres +=
              "هذه القرية يجب أن لا تكون أقل من % موارد (ما لم تستهلكها وإلا) والقرية التي ترسل لها الموارد يجب أن لا تصل فيا الموارد إلى النسبة % (ما لم تحصلها أو تأتي إليها من قرى أخرى فيما بعد). - تعريب : باسم فتوح basim_fotoh@yahoo.com" +
              "\n";
            this.helptasklist =
              "المهمة التي تتم إضافتها لنافذة ترافيان ستظهر هنا. - تعريب : باسم فتوح" +
              "\n";
            this.helptasklist +=
              "كل قرية لديها قائمة مهامها المستقله - تعريب : باسم فتوح basim_fotoh@yahoo.com";
            this.helpfarmlist =
              "المزارع التي تتم إضافتها لنافذة ترافيان ستظهر هنا. نقرة مزدوجة على الرقم الذي تريد تغييره وستفتح لك نافذه تستطيع من خلالها إدخال الرقم الذي تريده. - تعريب : باسم فتوح" +
              "\n";
            this.helpfarmlist +=
              "صندوق التأشير لتحديد ما إذا كانت هذه المزرعة تعمل أم لا - تعريب : باسم فتوح" +
              "\n";
            this.helpfarmlist +=
              "الأزرار تشغيل وتعطيل لتحديد ما إذا كانت كل قائمة الهجمات الخاصة بكل قرية تعمل أم لا - تعريب : باسم فتوح basim_fotoh@yahoo.com" +
              "\n";
            break;
          case "ro":
            this.getdata = "Descarca datele";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Salveaza pe server";
            this.deletedata = "Sterge datele";
            this.sendsms = "Trimite SMS";
            this.cropfinder = "Gasire Ferma/crop";
            this.succesful = "Successfull";
            this.tasklist = "Lista sarcini";
            this.farmlist = "Lista Ferme";
            this.trade = "Trade";
            this.train = "Antreneaza";
            this.fill = "Plin";
            this.empty = "Gol";
            this.priority = "Prioritate";
            this.to = "Catre";
            this.on = "Pornit";
            this.name = "Nume";
            this.type = "tip";
            this.del = "Sterge";
            this.turnon = "Porneste";
            this.turnoff = "Opreste";
            this.repetevery = "Repeta la fiecare";
            this.minutes = "minute";
            this.sendonreturn = "Trimite din nou la intoarcere";
            this.login = "Logheaza-te si apasa Descarca datele";
            this.edit = "Dublu click pentru editare";
            this.newval = "Introdu valoarea";
            this.inputnum = "Introdu doar cifre";
            this.attopt =
              "Introdu valoarea:" +
              "\n" +
              "2=Intariri" +
              "\n" +
              "3=Atac" +
              "\n" +
              "4=Raid";
            this.attoptallowed = "Permise doar valorile 2,3,4.";
            this.allfields = "Toate campurile";
            this.buldings = [
              "Santier",
              "Padure",
              "Put de lut",
              "Mina de fier",
              "Lan de grau",
              "Fabrica de cherestea",
              "Fabrica de caramida",
              "Topitorie",
              "Moara",
              "Brutarie",
              "Hambar",
              "Granar",
              "Fierarie",
              "Fierarie",
              "Arena",
              "Primarie",
              "Adunare",
              "Targ",
              "Ambasada",
              "Cazarma",
              "Grajd",
              "Atelier",
              "Academie",
              "Beci",
              "Casa de cultura",
              "Vila",
              "Palat",
              "Trezorerie",
              "Oficiu de comert",
              "Cazarma extinsa",
              "Grajd extins",
              "Zid",
              "Metereze",
              "Palisada",
              "Arhitect",
              "Berarie",
              "Temnita",
              "Resedinta eroului",
              "Hambar extins",
              "Granar extins",
              "Minunea Lumii",
              "Adapatoare"
            ];
            this.datarecieved =
              "Date primite. Apasa butonul Start pentru pornirea scriptului.";
            this.datanotrecieved =
              "Date nereceptionate. Apasa din nou butonul Descarca date.";
            this.checking = "Checking what to do";
            this.analysingvillages = "Analizez toate satele.";
            this.sendingresurces = "Trimit resurse";
            this.trainingtroops = "Antrenez trupe";
            this.building = "Construiesc";
            this.sendingtroops = "Trimit trupe catre ";
            this.stopped = "Oprit";
            this.buildingsucessful = "Constructie pornita";
            this.buildingatwantedlevel =
              "Constructie nepornita. Cladirea este deja la nivelul comandat";
            this.unabletobuild = "Constructie nepornita. Nu pot construi.";
            this.sendingressucessful = "Resurse trimise!";
            this.notenoughtres = "Resurse insuficiente.";
            this.unabletosendres =
              "Nu pot trimite resurse catre aceasta destinatie.";
            this.trainingsuccesful = "Trupe antrenate!";
            this.sendingtroopssuccesul = "Trupe trimise!";
            this.deletedfarm = "Ferma stearsa/blocata";
            this.farminunsuccesful = "Farmare nereusita";
            this.gettingdata = "Primire date";
            this.deletingdata = "Stergere date";
            this.deleted = "Sters";
            this.nodata = "Eroare: probabil lipsesc datele pe server";
            this.upgradeallfields = "Upgrade toate campurile";
            this.veryhigh = "Foarte urgent";
            this.high = "Urgent";
            this.normal = "Normal";
            this.low = "Scazut";
            this.verylow = "Foarte scazut";
            this.level = "Nivel";
            this.addtask = "Adauga sarcina";
            this.fillres = "Grad de umplere %:";
            this.emptyres = "Grad de golire % :";
            this.onetimesending = "O singura trimitere";
            this.bypercent = "Trimite ca %";
            this.custom = "Particularizat";
            this.minsres = "Resurse min:";
            this.trainonce = "O singura antrenare";
            this.trainlater = "Sarcina antrenare";
            this.addtofarmlist = "Adauga la lista de ferme";
            this.helpupgradeallfields =
              "Mareste toate campurile de resurse. Daca e ales nivelul 10, toate campurile vor fi marite succesiv la nivelul 1, apoi 2, ... pana se atinge nivelul dorit.";
            this.helptrain = "Sarcina pentru antrenare trupe. " + "\n";
            this.helptrain +=
              "O singura antrenare: Trupele vor fi antrenate, iar sarcina va fi stearsa din lista" +
              "\n";
            this.helptrain +=
              "Repeta la fiecare .. minute: scriptul asteapta numarul de minute setate intre terminarea unei unitati si antrenarea urmatoarei unitati. Daca nu exista suficiente resurse, scriptul asteapta acumularea de resurse, antreneaza unitatea si asteapta timpul setat pana la un nou ordin de antrenare. Sarcina nu va fi stearsa din lista de sarcini.";
            this.helpsendres = "Traider" + "\n";
            this.helpsendres +=
              "O singura trimitere: trimite cantitatea de resurse setate la coordonatele dorite o singura data. Sarcina se sterge din lista la finalizare" +
              "\n";
            this.helpsendres +=
              "Trimite din nou la intoarcere: trimite cantitatea de resurse setate la coordonatele dorite, se intoarce si repeta trimiterea" +
              "\n";
            this.helpsendres +=
              "Trimite la fiecare .. minute: trimite cantitatea de resurse setate la coordonatele dorite, se intoarce, dupa care repeta sarcina dupa numarul de minute setate" +
              "\n";
            this.helpsendres += "Trimite ca % : " + "\n";
            this.helpsendres +=
              "Resurse min: cantitatea min de resure peste care scriptul va trimite resursele" +
              "\n";
            this.helpsendres +=
              "Grad de golire % : scriptul executa sarcina de trimitere a resurselor catre coordonatele dorite, atat timp cat in stoc se afla cel putin X % din capacitatea de stocare" +
              "\n";
            this.helpsendres +=
              "De ex, daca se alege 10%, iar capacitatea de stocare este de 80 000, scriptul trimite resurse, atat timp cat in stoc se afla minim 8000 din fiecare resursa. Daca stocul e mai mic, asteapta." +
              "\n";
            this.helpsendres +=
              "Grad de umplere %: scriptul executa sarcina de trimitere a resurselor catre coordonatele dorite, pana cand in stocul satului destinatie se acumuleaza maxim Y % din capacitatea de stocare:" +
              "\n";
            this.helpsendres +=
              "De ex, daca se alege 90%, iar capacitatea de stocare este de 80 000, scriptul trimite resurse, pana cand in stoc se acumuleaza maxim 72 000 din fiecare resursa. Daca stocul e mai mare, asteapta." +
              "\n";
            this.helpsendres +=
              "Asadar satul expeditor nu va avea niciodata mai putin de X % resurse in stoc (decat daca nu se consuma in alt mod), iar satul destinatar nu va avea niciodata mai mult de Y % resurse in stoc (decat daca nu se produce sau se primeste din alta parte)." +
              "\n";
            this.helptasklist =
              "Sarcinile adaugate vor fi afisate in aceasta fereastra." + "\n";
            this.helptasklist +=
              "Fiecare sat are propria lista de sarcini de constructie";
            this.helpfarmlist =
              "Fermele adaugate vor fi afisate in aceasta fereastra. Dublu click pe numarul de unitati, permite modificarea acestora." +
              "\n";
            this.helpfarmlist +=
              "Bifarea casutelor arata ca ferma respectiva este activata pentru farmare sau nu" +
              "\n";
            this.helpfarmlist +=
              "Butoanele Porneste si Opreste activeaza sau dezactiveaza farmarea pentru intreaga lista de ferme" +
              "\n";
            break;
          case "co.id":
            this.getdata = "ambil data";
            this.start = "mulai";
            this.stop = "berhenti";
            this.savetoserver = "menyimpan di server";
            this.deletedata = "hapus data";
            this.sendsms = "kirim SMS";
            this.cropfinder = "pencari Farm/crop ";
            this.succesful = "berhasil";
            this.tasklist = "daftar tugas";
            this.farmlist = "daftar farm";
            this.trade = "dagang";
            this.train = "latih";
            this.fill = "isi";
            this.empty = "kosong";
            this.priority = "utama";
            this.to = "ke";
            this.on = "pada";
            this.name = "Nama";
            this.type = "jenis";
            this.del = "hapus";
            this.turnon = "nyalakan";
            this.turnoff = "matikan";
            this.repetevery = "ulang tiap";
            this.minutes = "menit";
            this.sendonreturn = "kirim lagi saat kembali";
            this.login = "Login ke travian dan klik ambil data";
            this.edit = "Double click pada edit";
            this.newval = "masukan new value";
            this.inputnum = "perlu memasukan angka";
            this.attopt =
              "masukan new value:" +
              "\n" +
              "2=bantuan" +
              "\n" +
              "3=serang" +
              "\n" +
              "4=Rampok";
            this.attoptallowed = "hanya values 2, 3 dan 4 are allowed.";
            this.allfields = "semua lahan";
            this.buldings = [
              "lokasi bangunan",
              "penebang kayu",
              "penggalian tanah liat",
              "tambang besi",
              "ladang",
              "pemotong kayu",
              "pabrik bata",
              "peleburan besi",
              "penggilingan gandum",
              "toko roti",
              "gudang",
              "lumbung",
              "pandai besi",
              "pabrik prisai",
              "pusat kebugaran",
              "bagunan utama",
              "titik temu",
              "pasar",
              "kedutaan",
              "Barak",
              "istal",
              "bengkel",
              "Academi",
              "Cranny",
              "balai desa",
              "kastil",
              "istana",
              "gudang ilmu",
              "kantor dagang",
              "barak besar",
              "istal besar",
              "pagar besi",
              "pagar tanah",
              "pagar kayu",
              "tukang batu",
              "pabrik bir",
              "perangkap",
              "padepokan",
              "gudang besar",
              "lumbung besar",
              "Wonder of the World",
              "tempat minum kuda"
            ];
            this.datarecieved =
              "Data diterima. klik start untuk menjalankan script.";
            this.datanotrecieved = "data ditolak.ulangi, Klik update lagi.";
            this.checking = "mengecek apa yang harus dilakukan";
            this.analysingvillages = "menganalisa semua desa.";
            this.sendingresurces = "mengirim SDA";
            this.trainingtroops = "Melatih pasukan";
            this.building = "bangunan";
            this.sendingtroops = "mengirim pasukan ke ";
            this.stopped = "berhenti";
            this.buildingsucessful = "pembangunan selesei";
            this.buildingatwantedlevel =
              "pembangunan gagal. Bangunan telah berada pada level yang diinginkan";
            this.unabletobuild = "pembangunan gagal. Tidak bias membangun.";
            this.sendingressucessful = "pengiriman SDA berhasil";
            this.notenoughtres = "SDA tidak mencukupi.";
            this.unabletosendres = "tidak bias mengirim SDA ke tujuan.";
            this.trainingsuccesful = "pelatihan pasukan berhasil";
            this.sendingtroopssuccesul = "pengiriman pasukan berhasil.";
            this.deletedfarm = "Farm dihapus/block";
            this.farminunsuccesful = "Farming gagal";
            this.gettingdata = "mengambil data";
            this.deletingdata = "hapus data";
            this.deleted = "hapus";
            this.nodata = "Error: tidak ada data di server";
            this.upgradeallfields = "menaikan semua lahan";
            this.veryhigh = "sangat tinggi";
            this.high = "tinggi";
            this.normal = "normal";
            this.low = "rendah";
            this.verylow = "sangat rendah";
            this.level = "Level";
            this.addtask = "tambahkan tugas";
            this.fillres = "Fill resources to set %:";
            this.emptyres = "Empty resources to set % :";
            this.onetimesending = "pengiriman sekali";
            this.bypercent = "Send by %";
            this.custom = "Custom";
            this.minsres = "SDA minimal:";
            this.trainonce = "latih sekali";
            this.trainlater = "latih";
            this.addtofarmlist = "tambahkan ke daftar farm";
            this.helpupgradeallfields =
              "atur tugas menaikan semua lahan, jika di set ke level 10, semua lahan akan meningkat kelevel 1 kemudian 2 dst, sampai semua lahan mencapai level yang diinginkan.";
            this.helptrain = "Train troops later. " + "\n";
            this.helptrain +=
              "latih sekali: pasukan akan dilatih kemudian tugas akan dihapus" +
              "\n";
            this.helptrain +=
              "ulangi pelatihan: setelah scripts melatih pasukan, lalu menunggu sampai waktu yang telah di set, dan kemudian melatih pasukan kembali. Jika anda tidak memiliki cukup SDA, script akan menunggu sampai mendapat cukup SDA, tugas tidak akan dihapus dari daftar.";
            this.helpsendres = "pedagang" + "\n";
            this.helpsendres +=
              "pengiriman sekali: masukan SDA ke kotak SDA dan set kordinat, click tambahkan tugas, dan bot akan mengirimnya nanti" +
              "\n";
            this.helpsendres +=
              "kirim kembali: masukan SDA ke kotak SDA dan set kordinat, click tambahkan tugas, dan bot akan mengirimnya setelah pedagang kembali" +
              "\n";
            this.helpsendres +=
              "kirim tiap saat: masukan SDA ke kotak SDA dan set kordinat, click tambahkan tugas, dan bot akan mengirimnya, masukan angka X, click tambahkan tugas dan bot akan mengirim SDA setiap X menit" +
              "\n";
            this.helpsendres += "dikirim oleh % : " + "\n";
            this.helpsendres +=
              "Min res: jumlah minimal yang dikirim (tidak dapat mengirim 1 SDA)" +
              "\n";
            this.helpsendres +=
              " Sumber daya Kosong untuk mengatur%: desa ini harus mengirimkan sebagai resourses banyak untuk mengatur desa yang di desa akan tetap yang% dari sumber daya yang ditetapkan:" +
              "\n";
            this.helpsendres +=
              " Jika semua set ke 10% dan Anda memiliki warhouse 80 000, desa akan mencoba untuk mengirimkan semua sumber daya tapi 8000 dari masing-masing akan tetap tinggal di desa." +
              "\n";
            this.helpsendres +=
              " Isi sumber daya untuk mengatur%: desa yang Anda kirimkan resourses untuk harus mengisi untuk warhouse desa Anda kirimkan untuk untuk nilai ini:" +
              "\n";
            this.helpsendres +=
              " Jika diatur semua untuk 90% dan warhouse dapat berisi 80 000 sumber daya, akan mengirim sumber daya ke desa ini hingga mencapai 72 000." +
              "\n";
            this.helpsendres +=
              " Jadi desa ini seharusnya tidak pernah kurang sumber daya% set (kecuali anda menghabiskan itu dinyatakan) dan desa Anda mengirim sumber daya untuk tidak harus memiliki sumber daya lebih kemudian mengatur% (kecuali jika memproduksi mereka atau mendapatkannya dari desa-desa lainnya kemudian)." +
              "\n";
            this.helptasklist =
              "Task added in travian window will show up here." + "\n";
            this.helptasklist +=
              "tiap desa memiliki daftar pembangunan sendiri ";
            this.helpfarmlist =
              " Farms ditambahkan dalam travian jendela akan muncul di sini. Klik dua kali pada nomor yang ingin Anda ubah dan jendela akan muncul di mana Anda dapat mengatur nomor baru." +
              "\n";
            this.helpfarmlist +=
              "tandai kotak untuk menentukan farm dilakukan atau tidak" + "\n";
            this.helpfarmlist +=
              " Tombol Aktifkan dan Nonaktifkan memutuskan apakah farmlist seluruh desa ini diaktifkan " +
              "\n";
            break;
          case "pl":
            this.getdata = "Pobierz dane";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Zapisz dane";
            this.deletedata = "Usuń dane";
            this.sendsms = "Wyślij SMS";
            this.cropfinder = "Wyszukaj Farmy/Cropy";
            this.succesful = "Zapisano pomyślnie";
            this.tasklist = "Lista zadań";
            this.farmlist = "Lista farm";
            this.trade = "Rynek";
            this.train = "Szkolenie";
            this.fill = "Wypełnij";
            this.empty = "Opróżnij";
            this.priority = "Priorytet";
            this.to = "Do";
            this.on = "ON";
            this.name = "Osada";
            this.type = "typ";
            this.del = "Usuń";
            this.turnon = "Włącz";
            this.turnoff = "Wyłącz";
            this.repetevery = "Powtarzaj co:";
            this.minutes = "minut/ę/y";
            this.sendonreturn = "Wyślij gdy wrócą";
            this.login = "Zaloguj się na konto i naciśnij <b>Pobierz dane</b>";
            this.edit = "Dwukrotnie kliknij aby edytować";
            this.newval = "Wprowadź nową wartość:";
            this.inputnum = "Musisz wprowadzić liczbę";
            this.attopt =
              "Wprowadź odpowiednią wartość:" +
              "\n" +
              "2=Posiłki" +
              "\n" +
              "3=Atak" +
              "\n" +
              "4=Grabież";
            this.attoptallowed = "Dozwolone są tylko wartości: 2, 3 i 4";
            this.allfields = "Wszystkie pola/kopalnie";
            this.buldings = [
              "Plac budowy",
              "Las",
              "Kopalnia gliny",
              "Kopalnia żelaza",
              "Pole zboża",
              "Tartak",
              "Cegielnia",
              "Huta stali",
              "Młyn",
              "Piekarnia",
              "Magazyn",
              "Spichlerz",
              "Zbrojownia",
              "Kuźnia",
              "Plac turniejowy",
              "Główny budynek",
              "Miejsce zbiórki",
              "Rynek",
              "Ambasada",
              "Koszary",
              "Stajnia",
              "Warsztat",
              "Akademia",
              "Kryjówka",
              "Ratusz",
              "Rezydencja",
              "Pałac",
              "Skarbiec",
              "Targ",
              "Duże koszary",
              "Duża stajnia",
              "Mury obronne",
              "Wały",
              "Palisada",
              "Pracownia kamieniarza",
              "Browar",
              "Traper",
              "Dwór bohatera",
              "Duży magazyn",
              "Duży spichlerz",
              "Cud",
              "Wodopój"
            ];
            this.datarecieved =
              "Pobrano dane. Kliknij start aby uruchomić skrypt.";
            this.datanotrecieved =
              "Nie pobrano danych. Odśwież i spróbuj ponownie.";
            this.checking = "Sprawdzanie listy zadań";
            this.analysingvillages = "Analizowanie wiosek.";
            this.sendingresurces = "Wysyłanie surowców";
            this.trainingtroops = "Szkolenie jednostek";
            this.building = "Budowa";
            this.sendingtroops = "Wysyłanie jednostek do ";
            this.stopped = "Zatrzymano";
            this.buildingsucessful = "Rozpoczęto budowę";
            this.buildingatwantedlevel =
              "Rozbudowa niemożliwa. Budowa jest już na żądanym poziomie";
            this.unabletobuild = "Budowa wstrzymana. Brak możliwości budowy.";
            this.sendingressucessful = "Surowce wysłano pomyślnie";
            this.notenoughtres = "Za mało surowców.";
            this.unabletosendres =
              "Wysłanie surowców do tego miejsca jest niemożliwe.";
            this.trainingsuccesful = "Wyszkolono jednostki.";
            this.sendingtroopssuccesul = "Wysłano jednostki.";
            this.deletedfarm = "Farma skasowana/zbanowana";
            this.farminunsuccesful = "Farmienie nieudane";
            this.gettingdata = "Pobieranie danych";
            this.deletingdata = "Kasowanie danych";
            this.deleted = "Usunięto";
            this.nodata = "Błąd: prawdopodobnie brak danych na serwerze";
            this.upgradeallfields = "Buduj wszystkie";
            this.veryhigh = "Najwyższy";
            this.high = "Wysoki";
            this.normal = "Normalny";
            this.low = "Niski";
            this.verylow = "Najniższy";
            this.level = "Poziom";
            this.addtask = "Dodaj do zadań";
            this.fillres = "Wypełnij magazyny do x %:";
            this.emptyres = "Opróżnij magazyny do x % :";
            this.onetimesending = "Wyślij raz";
            this.bypercent = "Wyślij procentowo %";
            this.custom = "Własne";
            this.minsres = "Minium surowców:";
            this.trainonce = "Wyszkol raz";
            this.trainlater = "Wyszkol później";
            this.addtofarmlist = "Dodaj do listy farm";
            this.helpupgradeallfields =
              "Ustaw zadanie budowy wszystkich pól/kopalni. Gdy ustawisz budowę na poziom 10, najpierw wszystko będzie podniesione do 1 poziomu, potem 2 i tak aż do 10.";
            this.helptrain = "Wyszkol jednostki później. " + "\n";
            this.helptrain +=
              "Wyszkol raz: Po wyszkoleniu jednostek zadanie zostanie usunięte." +
              "\n";
            this.helptrain +=
              "Powtarzaj co x minut: po pierwszym wyszkoleniu, skrypt poczeka określony czas i spróbuje wyszkolić jeszcze raz. Gdy nie będzie wystarczającej ilości surowców, skrypt poczeka i wyszkoli gdy już będą. Potem zacznie się kolejne odliczanie.. i tak w kółko. Zadanie nie usunie się samo z listy.";
            this.helpsendres = "Rynek" + "\n";
            this.helpsendres +=
              "Wyślij raz: wprowadź ilość surowców oraz współrzędne celu, kliknij <b>Dodaj zadanie</b> - bot wyśle te surowce później" +
              "\n";
            this.helpsendres +=
              "Wyślij gdy wrócą: wprowadź ilość surowców oraz współrzędne celu, kliknij <b>Dodaj zadanie</b> - bot wyśle te surowce, gdy tylko wrócą handlarze" +
              "\n";
            this.helpsendres +=
              "Wyślij co x minut: wprowadź ilość surowców, współrzędne celu oraz liczbę x minut, kliknij <b>Dodaj zadanie</b> - bot będzie wysyłał te surowce okresowo co x minut" +
              "\n";
            this.helpsendres += "Wyślij procentowo % : " + "\n";
            this.helpsendres +=
              "Minimum surowców: minimalna ilość surowców jaką skrypt może wysłać (żeby nie było takiej sytuacji, że wyśle np. tylko 1 ilość surowca)" +
              "\n";
            this.helpsendres +=
              "Opróżnij magazyny do x % : dana osada powinna wysyłać tyle surowca do celu, aby pozostało w niej x % pojemności magazynu:" +
              "\n";
            this.helpsendres +=
              "Jeżeli ustawisz na 10% i masz magazyn o pojemności 80 000, osada będzie wysyłać surowce dopóki nie zostanie po 8000 każdego." +
              "\n";
            this.helpsendres +=
              "Wypełnij magazyny do x %: osada do której wysyłasz surowce będzie mieć wypełnione magazyny do x %:" +
              "\n";
            this.helpsendres +=
              "Jeżeli ustawisz na 90% oraz pojemność magazynu to 80 000, skrypt będzie wysyłał surowce dopóki nie zapełni go do 72 000 każdego" +
              "\n";
            this.helpsendres +=
              "Czyli osada z której wysyłasz nie będzie mieć mniej surowców niż 10% pojemności magazynu (chyba, że je wydasz), a osada do której wysyłasz nie powinna mieć więcej surowców niż 90% pojemności magazynu (chyba, że przyjdzie z samej produkcji lub z innej osady)." +
              "\n";
            this.helptasklist = "Dodane zadania pokażą się tutaj." + "\n";
            this.helptasklist += "Każda osada ma swoją listę zadań";
            this.helpfarmlist =
              "Dodane farmy pokażą się tutaj. Ilość wojska i rodzaj ataku zmienia się dwukrotnym kliknięciem na daną liczbę." +
              "\n";
            this.helpfarmlist +=
              "Zaznaczając pole wyboru decydujesz czy farma ma być aktywna czy nie" +
              "\n";
            this.helpfarmlist +=
              "Przyciski Włącz i Wyłącz decydują czy całą lista farm dla danej osady jest aktywna czy nie" +
              "\n";
            break;
          case "asia":
            this.getdata = "โหลดข้อมูล";
            this.start = "เริ่ม";
            this.stop = "หยุด";
            this.savetoserver = "เซฟข้อมูล";
            this.deletedata = "ลบข้อมูล";
            this.sendsms = "ส่ง sms";
            this.cropfinder = "ค้นหา ฟาร์มและข้าว";
            this.succesful = "สำเร็จ";
            this.tasklist = "รายการงาน";
            this.farmlist = "รายการฟาร์ม";
            this.trade = "แลกเปลื่ยน";
            this.train = "ฝึกฝน";
            this.fill = "ใส่";
            this.empty = "ว่างปล่าว";
            this.priority = "ความสำคัญ";
            this.to = "ถึง";
            this.on = "เปิด";
            this.name = "ชื่อ";
            this.type = "ประเภท";
            this.del = "Del";
            this.turnon = "เปิด";
            this.turnoff = "ปิด";
            this.repetevery = "กระทำ ทุกๆ";
            this.minutes = "นาที";
            this.sendonreturn = "ส่งกลับมาอีกครั้ง";
            this.login = "กรุณาล็อกอิน ทราเวียนและโหลดข้อมูล";
            this.edit = "ดับเบิ้ลคลิกเพื่อแก้ไข";
            this.newval = "กรุณากรอกค่าใหม่";
            this.inputnum = "คุณต้องการที่จะกรอกตัวเลข";
            this.attopt =
              "กรุณาใส่ค่าใหม่:" +
              "\n" +
              "2=เสริมกำลัง" +
              "\n" +
              "3=โจมตี" +
              "\n" +
              "4=ปล้น";
            this.attoptallowed = "Only values 2, 3 and 4 are allowed.";
            this.allfields = "ทั้งหมด";
            this.buldings = [
              "หน้าก่อสร้าง",
              "โรงตัดไม้",
              "บ่อโคลน",
              "เหมืองเหล็ก",
              "ทุ่งข้าว",
              "โรงเลื่อย",
              "โรงอิฐ",
              "โรงหลอมเหล็ก",
              "โรงสีข้าว",
              "เบเกอรี่",
              "โกดัง",
              "ยุ้งฉาง",
              "ช่างตีเหล็ก",
              "คลังแสง",
              "ลานประลองยุทธ์",
              "อาคารหลัก",
              "จุดรวมพล",
              "ตลาด",
              "สถานฑูต",
              "ค่ายทหาร",
              "โรงม้า",
              "ห้องเครื่อง",
              "สถานศึกษา",
              "ที่ซ่อนเสบียง",
              "ศาลากลาง",
              "ที่พักอาศัย",
              "วัง",
              "คลังสมบัติ",
              "สำนักงานการค้า",
              "ค่ายทหารใหญ่",
              "โรงม้าใหญ่",
              "กำแพงเมือง",
              "กำแพงเมือง",
              "กำแพงเมือง",
              "โรงหิน",
              "โรงเบียร์",
              "ผู้วางกับดัก",
              "คฤหาสน์ของฮีโร่",
              "โกดังใหญ่",
              "ยุ้งใหญ่",
              "Wonder of the World",
              "รางน้ำทหารม้า"
            ];
            this.datarecieved =
              "โหลดข้อมูลเรียบร้อย กรุณากด เริ่ม เพื่อเริ่มทำงาน";
            this.datanotrecieved = "กรุณาโหลดข้อมูล อีกครั้ง";
            this.checking = "กำลังตรวจสอบว่าจะทำอะไร";
            this.analysingvillages = "กรุณาวิเคราะหมู่บ้านทั้งหมดของคุณ";
            this.sendingresurces = "กำลังส่งทรัพยากร";
            this.trainingtroops = "กำลังส่งทหาร";
            this.building = "กำลังก่อสร้าง";
            this.sendingtroops = "กำลังส่งทหารไป  ";
            this.stopped = "หยุด";
            this.buildingsucessful = "ก่อสร้างสำเร็จ";
            this.buildingatwantedlevel =
              "ก่อสร้างไม่สำเร็จ เนื่องจากมีระดับที่ต้องการอยู่แล้ว";
            this.unabletobuild =
              "ก่อสร้างไม่สำเร็จ เนื่องจากไม่สามารถก่อสร้างได้";
            this.sendingressucessful = "ส่งทรัพยากร สำเร็จ";
            this.notenoughtres = "ไม่มีทรัพยากร";
            this.unabletosendres = "ไม่สามารถส่งทรัพยากรไปยังปลายทางได้ ";
            this.trainingsuccesful = "ฝึกทหาร สำเร็จ";
            this.sendingtroopssuccesul = "ส่งทหาร สำเร็จ";
            this.deletedfarm = "ลบ หรือ บล็อก ฟาร์ม";
            this.farminunsuccesful = "ฟาร์ม ไม่สำเร็จ";
            this.gettingdata = "กำลังโหลดข้อมูล";
            this.deletingdata = "กำลังลบข้อมูล";
            this.deleted = "ลบสำเร็จ";
            this.nodata = "Error: ไม่มีข้อมูลอยู่บนเซิฟเวอร์";
            this.upgradeallfields = "อัพเกรต‎ทุกอย่าง";
            this.veryhigh = "สูงสุด";
            this.high = "สูง";
            this.normal = "ปกติ";
            this.low = "น้อย";
            this.verylow = "น้อยมาก";
            this.level = "ระดับ";
            this.addtask = "เพิ่มงาน";
            this.fillres = "กรอกทรัพยากรเป็นเปอร์เซ็น :";
            this.emptyres = "Empty resources to set % :";
            this.onetimesending = "One time sending";
            this.bypercent = "Send by %";
            this.custom = "Custom";
            this.minsres = "Min res:";
            this.trainonce = "Train once";
            this.trainlater = "Train later";
            this.addtofarmlist = "Add to farmlist";
            this.helpupgradeallfields =
              "Set task to upgrade all your fields. if set to level 10, all fields will be upgraded to level 1, then all to level 2,... until all fields are at wanted level.";
            this.helptrain = "Train troops later. " + "\n";
            this.helptrain +=
              "Train once: troops will ve trained and task will be deleted" +
              "\n";
            this.helptrain +=
              "Repeat every minutes: after script trains units, it will wait for set time and then try to train units again. If you dont have enought resources, script will wait to get enought resources, train units when there is enought resources and again wait for set time before training again. Task will not get deleted from list.";
            this.helpsendres = "Traider" + "\n";
            this.helpsendres +=
              "One time sending: imput resources into resource boxes and set coordinate, click add task and bot will send them later" +
              "\n";
            this.helpsendres +=
              "Send on return: imput resources into resource boxes and set coordinate, click add task and bot will send them to other village as soon as traiders return from trip" +
              "\n";
            this.helpsendres +=
              "Send every minutes: imput resources into resource boxes and set coordinate, imput X number, click add task and bot will try to send them to other village every X minutes" +
              "\n";
            this.helpsendres += "Send by % : " + "\n";
            this.helpsendres +=
              "Min res: min amount of res script can send (so it wont send 1 resource)" +
              "\n";
            this.helpsendres +=
              "Empty resources to set % : this village should send as much resourses to set village that in village will remain that % of resources that are set:" +
              "\n";
            this.helpsendres +=
              "If all set to 10% and you have warhouse 80 000, village will try to send out all resources but 8000 of each will remain in village." +
              "\n";
            this.helpsendres +=
              "Fill resources to set %: the village you are sending resourses to should fill to warhouse of village you are sending to to this value:" +
              "\n";
            this.helpsendres +=
              "If all set to 90% and warhouse can contain 80 000 resources, it will send resources to this village untill it reaches 72 000." +
              "\n";
            this.helpsendres +=
              "So this village should never have less then set % resources (unless you spend it otherwise) and village you are sending resources to should not have more resources then set % (unless it produce them or get it from other villages later)." +
              "\n";
            this.helptasklist =
              "Task added in travian window will show up here." + "\n";
            this.helptasklist += "Every village has its own building list";
            this.helpfarmlist =
              "Farms added in travian window will show up here. Double click on number you wish to change and window will show up where you can set new number." +
              "\n";
            this.helpfarmlist +=
              "Checkbox decide if farm is turned on or off" + "\n";
            this.helpfarmlist +=
              "Buttons Turn On and Turn Off decide if whole farmlist for this village is turned on" +
              "\n";
            break;
          case "hu":
            this.getdata = "Adatok gyűjtése";
            this.start = "Indítás";
            this.stop = "Megállítás";
            this.savetoserver = "Mentés a szerverre";
            this.deletedata = "Adatok törlése";
            this.sendsms = "SMS küldése";
            this.cropfinder = "Farm/búzás kereső";
            this.succesful = "Sikeres";
            this.tasklist = "Feladat lista";
            this.farmlist = "Farm lisa";
            this.trade = "Kereskedelem";
            this.train = "Kiképzés";
            this.fill = "Kitölteni";
            this.empty = "Üres";
            this.priority = "Elsőbbség";
            this.to = "hoz";
            this.on = "BE";
            this.name = "Név";
            this.type = "Típus";
            this.del = "Del";
            this.turnon = "Bekapcsolás";
            this.turnoff = "Kikapcsolás";
            this.repetevery = "Ismételd minden";
            this.minutes = "percben";
            this.sendonreturn = "visszaérkezésnél újraküldés";
            this.login =
              "Jelentkezz be a Traviánba és nyomd meg az Adatok gyűjtése gombot";
            this.edit = "Dupla klikk hogy szerkeszd";
            this.newval = "Írd be az új értéket";
            this.inputnum = "Egy számot kell beírnod";
            this.attopt =
              "Írd be az új értéket:" +
              "\n" +
              "2=Támogatás" +
              "\n" +
              "3=Támadás" +
              "\n" +
              "4=Fosztogatás";
            this.attoptallowed = "Csak 2,3 vagy 4-et írhatsz be.";
            this.allfields = "Minden mező";
            this.buldings = [
              "Építési terület",
              "Favágó",
              "Agyagbánya",
              "Vasércbánya",
              "Búzafarm",
              "Fűrészüzem",
              "Agyagégető",
              "Vasöntöde",
              "Malom",
              "Pékség",
              "Raktár",
              "Magtár",
              "Kovácsműhely",
              "Páncélműhely",
              "Gyakorlótér",
              "Főépület",
              "Gyülekezőtér",
              "Piac",
              "Követség",
              "Kaszárnya",
              "Istálló",
              "Műhely",
              "Akadémia",
              "Hasadék",
              "Városháza",
              "Rezidencia",
              "Palota",
              "Kincstár",
              "Kereskedelmi központ",
              "Nagy kaszárnya",
              "Nagy istálló",
              "Kőfal",
              "Földfal",
              "Cölöpfal",
              "Kőfaragó",
              "Sörfőzde",
              "Csapdakészítő",
              "Hősök háza",
              "Nagy raktár",
              "Nagy magtár",
              "Világcsoda",
              "Ló itató"
            ];
            this.datarecieved =
              "Adatok feldolgozva. Nyomd meg az Indítás gombot hogy aktiváld a scriptet.";
            this.datanotrecieved =
              "Adatok nem elérhetőek. Nyomd meg a frissítés gombot hogy újra próbáld.";
            this.checking = "Feladatok ellenőrzése";
            this.analysingvillages = "A falú ellemzése.";
            this.sendingresurces = "Nyersanyag küldése";
            this.trainingtroops = "Egységek kiképzése";
            this.building = "Építés";
            this.sendingtroops = "Egységek küldése ide: ";
            this.stopped = "Megállt";
            this.buildingsucessful = "Építés sikeres";
            this.buildingatwantedlevel =
              "Építés sikertelen. Az épület már a kívánt szinten van.";
            this.unabletobuild = "Építés sikertelen. Nem lehet építeni.";
            this.sendingressucessful = "Nyersanyag küldése sikeres";
            this.notenoughtres = "Nincs elég nyersanyag.";
            this.unabletosendres = "Nem lehet ide nyersanyagot küldeni.";
            this.trainingsuccesful = "Egységek kiképzése sikeres.";
            this.sendingtroopssuccesul = "Egységek küldése sikeres.";
            this.deletedfarm = "Farm törölt/blokkolt";
            this.farminunsuccesful = "Farmolás sikertelen";
            this.gettingdata = "Adatok gyűjtése";
            this.deletingdata = "Adatok törlése";
            this.deleted = "Törölve";
            this.nodata = "Hiba: nincs adat a szerveren";
            this.upgradeallfields = "Összes mező kiépítése";
            this.veryhigh = "Nagyon nagy";
            this.high = "Nagy";
            this.normal = "Normál";
            this.low = "Alacsony";
            this.verylow = "Nagyon alacsony";
            this.level = "Szint";
            this.addtask = "Feladat hozzáadása";
            this.fillres = "Nyersanyagok %-os feltöltése:";
            this.emptyres = "Nyersanyagok %-os kiürítése:";
            this.onetimesending = "Egyszer küldés";
            this.bypercent = "%-al küldés";
            this.custom = "Egyéni";
            this.minsres = "Min nyersi:";
            this.trainonce = "Egyszeri kiképzés";
            this.trainlater = "Kiképzés később";
            this.addtofarmlist = "Felvétel a farmlistára";
            this.helpupgradeallfields =
              "Az összes mező építése. Ha 10-es szintre van állítva, akkor az összes mező kiépítődik 1-es szintre, majd az összes 2-es szintre, és így tovább amíg az összes mező a eléri a kívánt szintet.";
            this.helptrain = "Egységek kiképzése később. " + "\n";
            this.helptrain +=
              "Egyszer képzés: az egység kiképződik és a feladat törlődik" +
              "\n";
            this.helptrain +=
              "Ismétlés minden percben: miután a script kiképezte az egységet, vár a megadott ideig, majd újra kiképzi az egységet. Ha nincs elég nyersanyag akkor a script vár míg lesz és legyártja akkor. Ezután újból várni fog a megadott időpontig mielőtt újra kiképezne egységeket. A feladat nem törlődik a listából.";
            this.helpsendres = "Kereskedő" + "\n";
            this.helpsendres +=
              "Egyszer küldés: add meg a nyersanyagot és a koordinátát, a script pedig elküldi később" +
              "\n";
            this.helpsendres +=
              "Visszaérkezésnél újraküldés: add meg a nyersanyagot és a koordinátát, a script pedig elküldi később amint lesz szabad kereskedő" +
              "\n";
            this.helpsendres +=
              "Küldés percenként: add meg a nyersanyagot és a koordinátát, adj meg egy X számot, és a script elküldi majd a nyersit minden megadott percben." +
              "\n";
            this.helpsendres += "%-os küldés : " + "\n";
            this.helpsendres +=
              "Min nyersi: minimum nyersi amit lehet küldeni (nem fog 1 nyersit küldeni csak)" +
              "\n";
            this.helpsendres +=
              "Kiürítés a megadott %-ig : ez a falu addig küldi a nyersit amíg a faluban a megadott % nyersanyag marad:" +
              "\n";
            this.helpsendres +=
              " Ha az összes 10% és a raktár 80 000 nyersanyagot tárolhat, akkor addig küldi a nyersit amíg a faluban 8000 nyersi marad." +
              "\n";
            this.helpsendres +=
              "Töltés a megadott %-ig: ez a falu addig küldi a nyersit amíg a faluban amelyikbe küldöd a megadott % nyersanyag lesz:" +
              "\n";
            this.helpsendres +=
              "Ha az összes 90% és a raktár 80 000 nyersanyagot tárolhat, akkor addig küldi a nyersit amíg a célfaluban 72000 nyersi lesz." +
              "\n";
            this.helpsendres +=
              "Szóval ennek a falunak a nyersanyaga sosem megy a megadott % alá (ha nem költesz másra) és a falu amelyikbe küldöd a nyersanyagszint nem haladja meg a megadott %-ot. (amíg a falu nem termel többet vagy nem kap máshonnan nyersit)." +
              "\n";
            this.helptasklist =
              "A feladatok amelyeket beállítasz itt jelennek meg." + "\n";
            this.helptasklist += "Minden falunak külön építkezési listája van.";
            this.helpfarmlist =
              "A farmok amelyeket hozzáadtál a farmkeresőben itt jelennek meg. Dupla klikk az értékre és beírhatsz egy új értéket." +
              "\n";
            this.helpfarmlist +=
              "Ha ki van pipálva akkor a farmolás aktív arra a falura" + "\n";
            this.helpfarmlist +=
              "A be- és kikapcsoló gomb határozza meg hogy az egész farmlista aktív legyen-e erre a falura" +
              "\n";
            break;
          case "ru":
            this.getdata = "Получение информации";
            this.start = "Старт";
            this.stop = "Стоп";
            this.savetoserver = "Сохранить на сервер";
            this.deletedata = "Удалить информацию с сервера";
            this.sendsms = "Отправить СМС";
            this.cropfinder = "Поиск фарма/кропа";
            this.succesful = "Выполнено";
            this.tasklist = "Список задач";
            this.farmlist = "Список фарма";
            this.trade = "Отправить";
            this.train = "Обучить";
            this.fill = "Fill";
            this.empty = "Свободная";
            this.priority = "Приоритет";
            this.to = "В";
            this.on = "Вкл";
            this.name = "Имя";
            this.type = "Тип";
            this.del = "Удалить";
            this.turnon = "Включить";
            this.turnoff = "Выключить";
            this.repetevery = "Повторить каждые";
            this.minutes = "минуты";
            this.sendonreturn = "Отправить ещё раз по возвращению";
            this.login = "Войдите в игру и нажмите Получить информацию";
            this.edit = "Двойной клик для редактирования";
            this.newval = "Введите новую величину";
            this.inputnum = "Необходимо ввести номер";
            this.attopt =
              "Введите новую величину:" +
              "\n" +
              "2=Подкрепление" +
              "\n" +
              "3=Атака" +
              "\n" +
              "4=Набег";
            this.attoptallowed = "Возможен выбрать только 1,2 или 3.";
            this.allfields = "Все поля";
            this.buldings = [
              "Место для строительства",
              "Лесопилка",
              "Глиняный карьер",
              "Железный рудник",
              "Ферма",
              "Лесопильный завод",
              "Кирпичный завод",
              "Чугунолитейный завод",
              "Мельница",
              "Пекарня",
              "Склад",
              "Амбар",
              "Кузница",
              "Кузница",
              "Арена",
              "Главное здание",
              "Пункт сбора",
              "Рынок",
              "Посольство",
              "Казарма",
              "Конюшня",
              "Мастерская",
              "Академия",
              "Тайник",
              "Ратуша",
              "Резиденция",
              "Дворец",
              "Сокровищница",
              "Торговая палата",
              "Большая казарма",
              "Большая конюшня",
              "Стена",
              "Изгородь",
              "Городской вал",
              "Камнетёс",
              "Пивоварня",
              "Капканщик",
              "Таверна",
              "Большой склад",
              "Большой амбар",
              "Чудо света",
              "Водопой"
            ];
            this.datarecieved =
              "Информация получена. Нажмите кнопку старт для активации скрипта.";
            this.datanotrecieved =
              "Информация не получена. Нажмите кнопку Повтор для отправка запроса ещё раз.";
            this.checking = "Анализ действий";
            this.analysingvillages = "Анализ вашей деревни.";
            this.sendingresurces = "Отправка ресурсов";
            this.trainingtroops = "Обучение юнитов";
            this.building = "Строительство";
            this.sendingtroops = "Отправка юнитов ";
            this.stopped = "Остановлено";
            this.buildingsucessful = "Строительство завершено";
            this.buildingatwantedlevel =
              "Строительство не завершено. Строение уже данного уровня.";
            this.unabletobuild = "Строительство невозможно.";
            this.sendingressucessful = "Отправка ресурсов завершена.";
            this.notenoughtres = "Не хватает ресурсов.";
            this.unabletosendres = "Отправка в указанное место невозможна.";
            this.trainingsuccesful = "Обучение завершено";
            this.sendingtroopssuccesul = "Отправка завершена.";
            this.deletedfarm = "Фарм удалён/заблокирован.";
            this.farminunsuccesful = "Фарм не удался";
            this.gettingdata = "Получение информации";
            this.deletingdata = "Удаление информации";
            this.deleted = "Удалено";
            this.nodata = "Ошибка: нет информации на сервере";
            this.upgradeallfields = "Улучшить все поля";
            this.veryhigh = "Максимальный приоритет";
            this.high = "Высокий приоритет";
            this.normal = "Нормальный приоритет";
            this.low = "Низкий приоритет";
            this.verylow = "Незначительный приоритет";
            this.level = "Уровень";
            this.addtask = "Добавить задание";
            this.fillres = " Ресурсы свыше %:";
            this.emptyres = " До достижения % :";
            this.onetimesending = "Единожды";
            this.bypercent = "Послать %";
            this.custom = "Настроить";
            this.minsres = "Миним. ресурсы:";
            this.trainonce = "Однократное обучение";
            this.trainlater = "Обучить позже";
            this.addtofarmlist = "Добавить в список фарма";
            this.helpupgradeallfields =
              "Задайте задание по улучшению ваших полей. Если поставить 10, то все ваши поля будут улучшаться сначала на 1 уровень, потом на 2,3….пока не достигнут 10 уровня.";
            this.helptrain = "Обучить позже. " + "\n";
            this.helptrain +=
              "Однократное обучение: после обучения задание удалится" + "\n";
            this.helptrain +=
              "Повторить с интервалом: после обучения скрипт выждет указанное время и посторит обучение снова. Если ресурсов не хватает скрипт подождёт пока не станет хватать ресурсов, выполнит обучение и снова будет ожидать указанный интервал. Задание само не удаляется из списка.";
            this.helpsendres = "Отправка" + "\n";
            this.helpsendres +=
              "Однократная отправка: введите количество ресурсов и укажите координаты отправки,нажмите добавить задание и скрипт отправит заданные ресурсы позже" +
              "\n";
            this.helpsendres +=
              "Отправить по возврату: введите количество ресурсов и укажите координаты отправки, нажмите добавить задание и скрипт отправит заданные ресурсы ещё раз по возврату торговцев " +
              "\n";
            this.helpsendres +=
              "Отправка с интервалом: введите количество ресурсов и укажите координаты отправки и временной интервал (мин), нажмите добавить задание и скрипт будет отправлять заданные ресурсы с указанным интервалом постоянно" +
              "\n";
            this.helpsendres += "Отправка в % : " + "\n";
            this.helpsendres +=
              "Минимальная отправка: Минимальное количество ресурсов, в случае накопления которого происходит отправка (если равно 1 будет отправлять всё что есть)" +
              "\n";
            this.helpsendres +=
              "Отправка по %остатка : будет отправляться все что больше указанного процента от максимально возможного количества ресурсов находящихся в деревне:" +
              "\n";
            this.helpsendres +=
              "если установлено 10% и у вас склад 80 000, будет отправлено всё что больше 8000, остающихся в деревне." +
              "\n";
            this.helpsendres +=
              "Отсылать до достижения %: ресурсы будут отсылаться пока заполнение не достигнет данного процента:" +
              "\n";
            this.helpsendres +=
              "Если установлено 90% и склад вмещает 80 000 ресурсов, ресурсы будут отправляться до тех пор пока содержание на складе не станет 72 000." +
              "\n";
            this.helpsendres +=
              "Таким образом, в этой деревне никогда не будет менее установленного % ресурсов(если Вы не тратите их иначе), и деревня, куда Вы посылаете ресурсы , не будет иметь большего выбранного % количества ресурсов (если она не производит их или получает от других деревень)." +
              "\n";
            this.helptasklist = "Задача будет отображаться тут." + "\n";
            this.helptasklist +=
              "У каждой деревни персональный список построек";
            this.helpfarmlist =
              "Добавленный фарм отображается тут. Для изменения величин требуется двойным кликом на величине вызвать окно и в нём изменить величину." +
              "\n";
            this.helpfarmlist += "Галочкой указано активен ли фарм" + "\n";
            this.helpfarmlist +=
              "Кнопки включить и выключить фарм управляют всем списком полностью" +
              "\n";
            break;
          case "com.tr":
            this.getdata = "Veriyi Al";
            this.start = "Başlat";
            this.stop = "Durdur";
            this.savetoserver = "Servera Kaydet";
            this.deletedata = "Veriyi Sil";
            this.sendsms = "SMS Gönder";
            this.cropfinder = "Köy/Vaha Bulucu";
            this.succesful = "Başarıyla Tamamlandı";
            this.tasklist = "Görev Listesi";
            this.farmlist = "Yağma Listesi";
            this.trade = "Ticaret";
            this.train = "Yetiştir";
            this.fill = "Doldur";
            this.empty = "Boşalt";
            this.priority = "Öncelik";
            this.to = "Kime";
            this.on = "Açık";
            this.name = "İsim";
            this.type = "Tür";
            this.del = "Sil";
            this.turnon = "Aç";
            this.turnoff = "Kapat";
            this.repetevery = "Tekrarla";
            this.minutes = "Dakikalar";
            this.sendonreturn = "Dönünce Tekrar Gönder";
            this.login = "Traviana Giriş Yapın ve Veriyi Al Tuşuna Basın";
            this.edit = "Düzenlemek İçin Çift Tıklayın";
            this.newval = "Yeni Değeri Girin";
            this.inputnum = "Bir Sayı Girmeniz Gerekir";
            this.attopt =
              "Yeni Değer Girin:" +
              "\n" +
              "2=Destek" +
              "\n" +
              "3=Saldırı" +
              "\n" +
              "4=Yağma";
            this.attoptallowed = "Sadece 2, 3 ve 4 Girilebilir.";
            this.allfields = "Tüm Alanlar";
            this.buldings = [
              "İnşa Alanı",
              "Oduncu",
              "Tuğla Ocağı",
              "Demir Madeni ",
              "Tarla",
              "Kereste Fabrikası",
              "Tuğla Fırını",
              "Demir Dökümhanesi",
              "Değirmen",
              "Fırın",
              "Depo",
              "Tahıl Ambarı",
              "Demirci",
              "Zırh Dökümhanesi",
              "Turnuva Alanı",
              "Ana Bina",
              "Toplanma Yeri",
              "Pazar",
              "Elçilik",
              "Kışla",
              "Ahır",
              "Tamirhane",
              "Akademi",
              "Sığınak",
              "Belediye",
              "Köşk",
              "Saray",
              "Hazine",
              "Ticaret Ofisi",
              "Büyük Kışla",
              "Büyük Ahır",
              "Duvar",
              "Toprak Duvar",
              "Çit",
              "Taşçı",
              "Bira Fabrikası",
              "Tuzakçı",
              "Kahraman Kışlası",
              "Büyük Depo",
              "Büyük Ambar",
              "Dünya Harikası",
              "Yalak"
            ];
            this.datarecieved = "Veriler Alındı. Başlamak İçin Starta basın";
            this.datanotrecieved =
              "Veri Alınamadı. Tekrar Denemek İçin Güncelleye Basın";
            this.checking = "Ne Yapılacağı Kontrol Ediliyor";
            this.analysingvillages = "Tüm Köyler İnceleniyor";
            this.sendingresurces = "Hammadde Gönderiliyor";
            this.trainingtroops = "Asker Yetiştiriliyor";
            this.building = "Bina";
            this.sendingtroops = "Askerler gönderiliyor ";
            this.stopped = "Durduruldu";
            this.buildingsucessful = "Başarıyla İnşa Edildi";
            this.buildingatwantedlevel =
              "İnşaat Başarılı Olmadı. Bina Zaten İstenen Seviyede";
            this.unabletobuild = "İnşaat Başarılı Olmadı. İnşa Edilemiyor";
            this.sendingressucessful = "Hammaddeler Başarıyla Gönderildi";
            this.notenoughtres = "Yeterli Hammadde Yok.";
            this.unabletosendres = "Hammaddeler Bu Konuma Gönderilemedi.";
            this.trainingsuccesful = "Askerler Başarıyla Yetiştirildi";
            this.sendingtroopssuccesul = "Askerler Başarıyla Gönderildi.";
            this.deletedfarm = "Köy Silindi/Kapatıldı";
            this.farminunsuccesful = "Yağma Başarısız";
            this.gettingdata = "Veri Alınıyor";
            this.deletingdata = "Veri Siliniyor";
            this.deleted = "Silindi";
            this.nodata = "Hata: Muhtemelern Serverda Veri Yok";
            this.upgradeallfields = "Tüm Alanları Yükselt";
            this.veryhigh = "Çok Yüksek";
            this.high = "Yüksek";
            this.normal = "Normal";
            this.low = "Düşük";
            this.verylow = "Çok Düşük ";
            this.level = "Seviye";
            this.addtask = "Görev Ekle";
            this.fillres = "Hammaddeleri %X Olana Kadar Doldur:";
            this.emptyres = "Hammaddeleri %X Olana Kadar Boşalt :";
            this.onetimesending = "Tek Bir Sefer Gönder";
            this.bypercent = "Gönderilecek %";
            this.custom = "Özel";
            this.minsres = "En Az Hammadde:";
            this.trainonce = "Bir Kere Yetiştir";
            this.trainlater = "Daha Sonra Yetiştir";
            this.addtofarmlist = "Yağma Listesine Ekle";
            this.helpupgradeallfields =
              "Tüm Alanları Yükselt. Eğer 10 Olarak Belirlenirse Önce Tüm Alanlar Seviye 1’e, Sonra Seviye 2’ye vb. İstenen Seviyeye Kadar Yükseltilir.";
            this.helptrain = "Askerleri Daha Sonra Yetiştir. " + "\n";
            this.helptrain +=
              "Bir Kere Yetiştir: Askerler Yetiştirildikten Sonra Görev Silinecektir" +
              "\n";
            this.helptrain +=
              "Her X Dakikada Yenile: Script Birimleri Yetiştirdikten Sonra Belirlenen Süre Kadar Bekler ve Tekrar Asker Yetiştirmeyi Dener. Eğer Yeterli Hammadde Yoksa Script Yeterli Hammadde Olana Kadar Bekler, Yeterli Hammadde Olunca Askerleri Yetiştirir, ve Sonra Tekrar Belirlenen Süre Kadar Bekler. Görev Listeden Silinmez.";
            this.helpsendres = "Satıcı" + "\n";
            this.helpsendres +=
              "Bir Kerelik Gönderim: Gönderilecek Hammadde Alanına Miktarı ve Koordinatları Girin, Görev Ekleye Tıklayın, Bot Daha Sonra Gönderecektir " +
              "\n";
            this.helpsendres +=
              "Dönünce Tekrar Gönder: Gönderilecek Hammadde Alanına Miktarı ve Koordinatları Girin, Görev Ekleye Tıklayın, Bot Satıcılar Döner Dönmez Satıcıları Tekrar Gönderecektir " +
              "\n";
            this.helpsendres +=
              "Her Dakika Gönder: Gönderilecek Hammadde Alanına Miktarı ve Koordinatları Girin, X Dakikayı Girin ve Görev Ekleye Tıklayın, Bot Her X Dakikada Bir Diğer Köye Hammadde Göndermeyi Deneyecektir" +
              "\n";
            this.helpsendres += "% Olarak Gönder: " + "\n";
            this.helpsendres +=
              "Minimum Hammadde: Scriptin Gönderebileceği En Düşük Hammadde Miktarı (Böylece 1 Hammadde Gönderilmeyecektir)" +
              "\n";
            this.helpsendres +=
              "Hammaddeleri %X Olana Kadar Boşalt: Bu Köy %X Hammadde Kalana Kadar Hammaddeleri Gönderir:" +
              "\n";
            this.helpsendres +=
              "Eğer %10 Olarak Belirlenirse ve 80000 Kapasiteli Deponuz Varsa 8000 Hammaddenin Üstünü Gönderir." +
              "\n";
            this.helpsendres +=
              "%X Olana Kadar Doldur: Hammadde Gönderdiğiniz Köyün Depoları %X Dolana Kadar Hammadde Gönderilir:" +
              "\n";
            this.helpsendres +=
              "Eğer Hepsi%90 olarak Belirlenirse ve Depo Kapasitesi 80000 İse, 72000 Olana Kadar Hammadde Gönderilir." +
              "\n";
            this.helpsendres +=
              "Böylece Köyde Asla Belirlenen Yüzdeden Az Hammadde Olmayacaktır (Başka Şekilde Harcamadığınız Müddetçe) ve Hammadde Gönderdiğiniz Köyde Belirlediğiniz Yüzdeden Daha Fazla Hammadde Olmayacaktır (Kendi Ürettikleri ve Başka Köylerden Nakledilenler Hariç)." +
              "\n";
            this.helptasklist =
              "Travian Penceresinde Eklenen Görevler Burada Gözükür." + "\n";
            this.helptasklist += "Her Köyün Kendi İnşa Listesi Vardır. ";
            this.helpfarmlist =
              "Travian Penceresinde Eklenen Yağma Köyler Burada Gözükür. Değiştirmek İstediğiniz Rakamın Üzerine Çift Tıklayın, Açılan Pencerede İstediğiniz Rakamı Girin.." +
              "\n";
            this.helpfarmlist +=
              "Her Bir Köy İçin Yağmayı Açma veya Kapama İşaret Kutusu " + "\n";
            this.helpfarmlist +=
              "Tüm Yağma Listesini Açma veya Kapama Tuşu " + "\n";
            break;
          case "cl":
            this.getdata = "Obtener Datos";
            this.start = "Comenzar";
            this.stop = "Detener";
            this.savetoserver = "Guardar en el servidor";
            this.deletedata = "Borrar Datos";
            this.sendsms = "Enviar SMS";
            this.cropfinder = "Buscador de Granjas/Cerealeras";
            this.succesful = "Hecho";
            this.tasklist = "Lista de tareas";
            this.farmlist = "Lista de Granjas";
            this.trade = "Comercio";
            this.train = "Entrenar";
            this.fill = "lleno";
            this.empty = "Vacio";
            this.priority = "Prioridad";
            this.to = "A";
            this.on = "Encender";
            this.name = "Nombre";
            this.type = "tipo";
            this.del = "Borrar";
            this.turnon = "Activar";
            this.turnoff = "Desactivar";
            this.repetevery = "Repetir cada";
            this.minutes = "Minutos";
            this.sendonreturn = "Mandar cuando regresen";
            this.login = "Entrar a Travian y oprimir Obtener Datos";
            this.edit = "Doble click Para editar";
            this.newval = "Entrar un nuevo valor";
            this.inputnum = "Nesecitas escribir un numero";
            this.attopt =
              "Entrar un nuevo valor:" +
              "\n" +
              "2=Refuerzos" +
              "\n" +
              "3=Ataque" +
              "\n" +
              "4=Asalto";
            this.attoptallowed = "Solo valores 2, 3 y 4 estan permitidos.";
            this.allfields = "Todos los campos";
            this.buldings = [
              "Construir sitio",
              "Bosque",
              "Barrera",
              "Mina de Hierro",
              "Granja",
              "Serreria",
              "Ladrillar",
              "Fundicion de hierro",
              "Molino",
              "Panaderia",
              "Almacen",
              "Granero",
              "Herreria",
              "Armeria",
              "Plaza de Torneos",
              "Edificio principal",
              "Plaza de reuniones",
              "Mercado",
              "Embajada",
              "Cuartel",
              "Establo",
              "Taller",
              "Academia",
              "Escondite",
              "Centro civico",
              "Residencia",
              "Palacio",
              "Tesoro",
              "Oficina de Comercio",
              "Gran Cuartel",
              "Gran Establo",
              "Muralla",
              "Terraplen",
              "Empalizada",
              "Canterero",
              "Cerveceria",
              "Trampero",
              "Mansion del Heroe",
              "Gran Almacen",
              "Gran Granero",
              "Maravilla del Mundo",
              "Abrevadero"
            ];
            this.datarecieved =
              "Datos recividos. Oprimir Comenzar Para activar el script.";
            this.datanotrecieved =
              "Datos no recividos. Oprimir actualizar para intentarlo de nuevo.";
            this.checking = "Comprobando que hacer";
            this.analysingvillages = "Analizando todas tus aldeas.";
            this.sendingresurces = "Mandando recursos";
            this.trainingtroops = "Entrenando Tropas";
            this.building = "Construyendo";
            this.sendingtroops = "Mandando tropas a ";
            this.stopped = "detenido";
            this.buildingsucessful = "Construccion terminada";
            this.buildingatwantedlevel =
              "Construccion fallida. La construccion estan en el nivel deseado";
            this.unabletobuild = "Construccion fallida. No se puede construir.";
            this.sendingressucessful = "Recursos mandados completado";
            this.notenoughtres = "No hay suficientes recursos.";
            this.unabletosendres = "No se puede mandar recursos a este sitio.";
            this.trainingsuccesful = "Entrenado de tropas terminado";
            this.sendingtroopssuccesul = "Mandando tropas correctamente.";
            this.deletedfarm = "Granja borrada/bloqueada";
            this.farminunsuccesful = "Granjeo fallido";
            this.gettingdata = "Obteniendo datos";
            this.deletingdata = "Borrando datos";
            this.deleted = "Borrando";
            this.nodata = "Error: probablemente no hay datos en el servidor";
            this.upgradeallfields = "Levantado todos los campos";
            this.veryhigh = "Muy Alta";
            this.high = "Alta";
            this.normal = "Normal";
            this.low = "Baja";
            this.verylow = "Muy baja";
            this.level = "Nivel";
            this.addtask = "Agregar tarea";
            this.fillres = "Completar recursos hasta obtener %:";
            this.emptyres = "Vaciar recursos hasta obtener % :";
            this.onetimesending = "Mandar una vez";
            this.bypercent = "Mandar por %";
            this.custom = "Personalizado";
            this.minsres = "Minimo:";
            this.trainonce = "Entrenar una vez";
            this.trainlater = "Entrenar despues";
            this.addtofarmlist = "Agregar a la lista de granjas";
            this.helpupgradeallfields =
              "Configurar la actualizacion de los campos. Si se configura en nivel 10, todos los campos se actualizaran del nivel 1 y luego el 2 etc. hasta el nivel deseado";
            this.helptrain = "Entrenar tropas luego. " + "\n";
            this.helptrain +=
              "Entrenar tropas una vez: La tarea de entrenar tropas sera borrada" +
              "\n";
            this.helptrain +=
              "Repetir cada tantos minutos: después de los script de entrenamiento de tropa , esperará el tiempo establecido y luego tratara de entrenar a las unidades de nuevo. Si usted no tiene los recursos suficientes, el script va a esperar hasta obtener los recursos necesarios, y asi sucesivamente. La tarea no se borra de la lista.";
            this.helpsendres = "Mercadeo" + "\n";
            this.helpsendres +=
              "Enviar solo una vez: ponga la cantidad de recursos en el cuadro de los recursos y establesca coordenadas, haga clic en Agregar tarea y el bot los enviará más tarde" +
              "\n";
            this.helpsendres +=
              "Enviar a la entrega: ponga la cantidad de recursos en el cuadro de los recursos y establesca coordenadas, haga clic en Agregar tarea y el bot los enviará a otro pueblo tan pronto como los comerciantes vuelvan del viaje" +
              "\n";
            this.helpsendres +=
              "Enviar cada tantos minutos: ponga la cantidad de recursos en el cuadro de los recursos y establesca coordenadas, ponga cada X minutos quiere enviar, haga clic en Agregar tarea y el bot tratará de enviar a otra aldea cada X minutos" +
              "\n";
            this.helpsendres += "Enviar en % : " + "\n";
            this.helpsendres +=
              "Minimos recursos: minimo envio de recursos que se enviaran (no se enviaran ni un recurso menos)" +
              "\n";
            this.helpsendres +=
              "Vaciar los recursos para establecer%: este pueblo debe enviar recursos para establecer un % maximo en almacen que ha sido programado:" +
              "\n";
            this.helpsendres +=
              "Si ha establecido que un 10% de recusos queden en la aldea usted tiene en almacen 80 000, la aldea tratara de enviar todos los recursos menos 8000 que permanecerán en la aldea." +
              "\n";
            this.helpsendres +=
              "Recursos de relleno para establecer%: el pueblo que está enviando los RECURSOS debe llenar el almacen de la aldea que está enviando a este valor:" +
              "\n";
            this.helpsendres +=
              "Si ha establecido un 90% y el almacen puede contener 80 000 recursos, enviará los recursos a este pueblo hasta llegar a 72 000." +
              "\n";
            this.helpsendres +=
              "Este pueblo no debe tener menos recursos del % establecido (a menos que se gasten de otra manera) y el pueblo va a enviar recursos hasta no tener más recursos del % establecido (a menos que lo produscan ellos o conseguirlo de otros pueblos más adelante)." +
              "\n";
            this.helptasklist =
              "Tarea añadida en la ventana de travian se mostrarán aquí." +
              "\n";
            this.helptasklist += "Cada pueblo tiene su lista de edificios";
            this.helpfarmlist =
              "Granjas añadidas en la ventana de travian se mostrarán aquí. Haga doble clic en el número que desea cambiar y la ventana de configuracion se mostrara para poner el nuevo numero." +
              "\n";
            this.helpfarmlist +=
              "Casilla de verificación para decidir si el granjeo se enciende o apaga" +
              "\n";
            this.helpfarmlist +=
              "Botones de encender y apagar para decidir si toda la lista de granjeo esta activada para este pueblo" +
              "\n";
            break;
          case "net":
            this.getdata = "Obtener Datos";
            this.start = "Comenzar";
            this.stop = "Detener";
            this.savetoserver = "Guardar en el servidor";
            this.deletedata = "Borrar Datos";
            this.sendsms = "Enviar SMS";
            this.cropfinder = "Buscador de Granjas/Cerealeras";
            this.succesful = "Hecho";
            this.tasklist = "Lista de tareas";
            this.farmlist = "Lista de Granjas";
            this.trade = "Comercio";
            this.train = "Entrenar";
            this.fill = "lleno";
            this.empty = "Vacio";
            this.priority = "Prioridad";
            this.to = "A";
            this.on = "Encender";
            this.name = "Nombre";
            this.type = "tipo";
            this.del = "Borrar";
            this.turnon = "Activar";
            this.turnoff = "Desactivar";
            this.repetevery = "Repetir cada";
            this.minutes = "Minutos";
            this.sendonreturn = "Mandar cuando regresen";
            this.login = "Entrar a Travian y oprimir Obtener Datos";
            this.edit = "Doble click Para editar";
            this.newval = "Entrar un nuevo valor";
            this.inputnum = "Nesecitas escribir un numero";
            this.attopt =
              "Entrar un nuevo valor:" +
              "\n" +
              "2=Refuerzos" +
              "\n" +
              "3=Ataque" +
              "\n" +
              "4=Asalto";
            this.attoptallowed = "Solo valores 2, 3 y 4 estan permitidos.";
            this.allfields = "Todos los campos";
            this.buldings = [
              "Construir sitio",
              "Bosque",
              "Barrera",
              "Mina de Hierro",
              "Granja",
              "Serreria",
              "Ladrillar",
              "Fundicion de hierro",
              "Molino",
              "Panaderia",
              "Almacen",
              "Granero",
              "Herreria",
              "Armeria",
              "Plaza de Torneos",
              "Edificio principal",
              "Plaza de reuniones",
              "Mercado",
              "Embajada",
              "Cuartel",
              "Establo",
              "Taller",
              "Academia",
              "Escondite",
              "Centro civico",
              "Residencia",
              "Palacio",
              "Tesoro",
              "Oficina de Comercio",
              "Gran Cuartel",
              "Gran Establo",
              "Muralla",
              "Terraplen",
              "Empalizada",
              "Canterero",
              "Cerveceria",
              "Trampero",
              "Mansion del Heroe",
              "Gran Almacen",
              "Gran Granero",
              "Maravilla del Mundo",
              "Abrevadero"
            ];
            this.datarecieved =
              "Datos recividos. Oprimir Comenzar Para activar el script.";
            this.datanotrecieved =
              "Datos no recividos. Oprimir actualizar para intentarlo de nuevo.";
            this.checking = "Comprobando que hacer";
            this.analysingvillages = "Analizando todas tus aldeas.";
            this.sendingresurces = "Mandando recursos";
            this.trainingtroops = "Entrenando Tropas";
            this.building = "Construyendo";
            this.sendingtroops = "Mandando tropas a ";
            this.stopped = "detenido";
            this.buildingsucessful = "Construccion terminada";
            this.buildingatwantedlevel =
              "Construccion fallida. La construccion estan en el nivel deseado";
            this.unabletobuild = "Construccion fallida. No se puede construir.";
            this.sendingressucessful = "Recursos mandados completado";
            this.notenoughtres = "No hay suficientes recursos.";
            this.unabletosendres = "No se puede mandar recursos a este sitio.";
            this.trainingsuccesful = "Entrenado de tropas terminado";
            this.sendingtroopssuccesul = "Mandando tropas correctamente.";
            this.deletedfarm = "Granja borrada/bloqueada";
            this.farminunsuccesful = "Granjeo fallido";
            this.gettingdata = "Obteniendo datos";
            this.deletingdata = "Borrando datos";
            this.deleted = "Borrando";
            this.nodata = "Error: probablemente no hay datos en el servidor";
            this.upgradeallfields = "Levantado todos los campos";
            this.veryhigh = "Muy Alta";
            this.high = "Alta";
            this.normal = "Normal";
            this.low = "Baja";
            this.verylow = "Muy baja";
            this.level = "Nivel";
            this.addtask = "Agregar tarea";
            this.fillres = "Completar recursos hasta obtener %:";
            this.emptyres = "Vaciar recursos hasta obtener % :";
            this.onetimesending = "Mandar una vez";
            this.bypercent = "Mandar por %";
            this.custom = "Personalizado";
            this.minsres = "Minimo:";
            this.trainonce = "Entrenar una vez";
            this.trainlater = "Entrenar despues";
            this.addtofarmlist = "Agregar a la lista de granjas";
            this.helpupgradeallfields =
              "Configurar la actualizacion de los campos. Si se configura en nivel 10, todos los campos se actualizaran del nivel 1 y luego el 2 etc. hasta el nivel deseado";
            this.helptrain = "Entrenar tropas luego. " + "\n";
            this.helptrain +=
              "Entrenar tropas una vez: La tarea de entrenar tropas sera borrada" +
              "\n";
            this.helptrain +=
              "Repetir cada tantos minutos: después de los script de entrenamiento de tropa , esperará el tiempo establecido y luego tratara de entrenar a las unidades de nuevo. Si usted no tiene los recursos suficientes, el script va a esperar hasta obtener los recursos necesarios, y asi sucesivamente. La tarea no se borra de la lista.";
            this.helpsendres = "Mercadeo" + "\n";
            this.helpsendres +=
              "Enviar solo una vez: ponga la cantidad de recursos en el cuadro de los recursos y establesca coordenadas, haga clic en Agregar tarea y el bot los enviará más tarde" +
              "\n";
            this.helpsendres +=
              "Enviar a la entrega: ponga la cantidad de recursos en el cuadro de los recursos y establesca coordenadas, haga clic en Agregar tarea y el bot los enviará a otro pueblo tan pronto como los comerciantes vuelvan del viaje" +
              "\n";
            this.helpsendres +=
              "Enviar cada tantos minutos: ponga la cantidad de recursos en el cuadro de los recursos y establesca coordenadas, ponga cada X minutos quiere enviar, haga clic en Agregar tarea y el bot tratará de enviar a otra aldea cada X minutos" +
              "\n";
            this.helpsendres += "Enviar en % : " + "\n";
            this.helpsendres +=
              "Minimos recursos: minimo envio de recursos que se enviaran (no se enviaran ni un recurso menos)" +
              "\n";
            this.helpsendres +=
              "Vaciar los recursos para establecer%: este pueblo debe enviar recursos para establecer un % maximo en almacen que ha sido programado:" +
              "\n";
            this.helpsendres +=
              "Si ha establecido que un 10% de recusos queden en la aldea usted tiene en almacen 80 000, la aldea tratara de enviar todos los recursos menos 8000 que permanecerán en la aldea." +
              "\n";
            this.helpsendres +=
              "Recursos de relleno para establecer%: el pueblo que está enviando los RECURSOS debe llenar el almacen de la aldea que está enviando a este valor:" +
              "\n";
            this.helpsendres +=
              "Si ha establecido un 90% y el almacen puede contener 80 000 recursos, enviará los recursos a este pueblo hasta llegar a 72 000." +
              "\n";
            this.helpsendres +=
              "Este pueblo no debe tener menos recursos del % establecido (a menos que se gasten de otra manera) y el pueblo va a enviar recursos hasta no tener más recursos del % establecido (a menos que lo produscan ellos o conseguirlo de otros pueblos más adelante)." +
              "\n";
            this.helptasklist =
              "Tarea añadida en la ventana de travian se mostrarán aquí." +
              "\n";
            this.helptasklist += "Cada pueblo tiene su lista de edificios";
            this.helpfarmlist =
              "Granjas añadidas en la ventana de travian se mostrarán aquí. Haga doble clic en el número que desea cambiar y la ventana de configuracion se mostrara para poner el nuevo numero." +
              "\n";
            this.helpfarmlist +=
              "Casilla de verificación para decidir si el granjeo se enciende o apaga" +
              "\n";
            this.helpfarmlist +=
              "Botones de encender y apagar para decidir si toda la lista de granjeo esta activada para este pueblo" +
              "\n";
            break;
          case "com.my":
            this.getdata = "dapatkan data";
            this.start = "mula";
            this.stop = "berhenti";
            this.savetoserver = "simpan di server";
            this.deletedata = "padam data";
            this.sendsms = "hantar SMS";
            this.cropfinder = "mencari Farm/crop ";
            this.succesful = "berjaya";
            this.tasklist = "senarai tugas";
            this.farmlist = "senarai farm";
            this.trade = "berdagang";
            this.train = "melatih";
            this.fill = "isi";
            this.empty = "kosong";
            this.priority = "keutamaan";
            this.to = "ke";
            this.on = "buka";
            this.name = "Nama";
            this.type = "jenis";
            this.del = "padam";
            this.turnon = "membuka";
            this.turnoff = "matikan";
            this.repetevery = "ulang tiap";
            this.minutes = "minit";
            this.sendonreturn = "kirim lagi bila kembali";
            this.login = "Login ke travian dan klik ambil data";
            this.edit = "Double click pada edit";
            this.newval = "masukan new value";
            this.inputnum = "perlu memasukan angka";
            this.attopt =
              "masukan angka baru:" +
              "\n" +
              "2=bantuan" +
              "\n" +
              "3=serang" +
              "\n" +
              "4=Rompak";
            this.attoptallowed = "hanya angka 2, 3 dan 4 yang dibenarkan";
            this.allfields = "semua sumber";
            this.buldings = [
              "lokasi bangunan",
              "penebang kayu",
              "penggalian tanah liat",
              "lombong besi",
              "ladang",
              "kilang kayu",
              "kilang bata",
              "kilang besi",
              "pengisar gandum",
              "kedai roti",
              "gudang",
              "lombong",
              "pandai besi",
              "pabrik prisai",
              "pusat kebugaran",
              "bagunan utama",
              "titik perhimpunan",
              "pasar",
              "kedutaan",
              "Berek",
              "istana",
              "bengkel",
              "akademi",
              "gua",
              "balairaya",
              "residen",
              "istana",
              "perbendaharaan",
              "pejabat dagangan",
              "berek besar",
              "istal besar",
              "pagar besi",
              "pagar tanah",
              "pagar kayu",
              "tukang batu",
              "kilang arak",
              "perangkap",
              "padepokan",
              "gudang besar",
              "lombong besar",
              "Keajaiban dunia",
              "palung kuda"
            ];
            this.datarecieved =
              "Data diterima. klik start untuk menjalankan script.";
            this.datanotrecieved = "data ditolak.ulangi, Klik update lagi.";
            this.checking = "memeriksa";
            this.analysingvillages = "memeriksa semua kampung.";
            this.sendingresurces = "menghantar sumber";
            this.trainingtroops = "Melatih askar";
            this.building = "pembangunan";
            this.sendingtroops = "menghantar askar ke ";
            this.stopped = "berhenti";
            this.buildingsucessful = "pembangunan selesei";
            this.buildingatwantedlevel =
              "pembangunan gagal. Bangunan telah berada pada level yang diinginkan";
            this.unabletobuild = "pembinaan gagal. Tidak boleh dibina.";
            this.sendingressucessful = "penghantaran sumber berjaya";
            this.notenoughtres = "tidak cukup sumber.";
            this.unabletosendres = "tidak boleh menghantar sumber ke tujuan.";
            this.trainingsuccesful = "askar berjaya dilatih";
            this.sendingtroopssuccesul = "sumber berjaya dihantar.";
            this.deletedfarm = "padam senarai farm";
            this.farminunsuccesful = "rompakan gagal dihantar";
            this.gettingdata = "mengambil data";
            this.deletingdata = "hapus data";
            this.deleted = "hapus";
            this.nodata = "Error: tidak ada data di server";
            this.upgradeallfields = "menaikan semua sumber";
            this.veryhigh = "sangat tinggi";
            this.high = "tinggi";
            this.normal = "biasal";
            this.low = "rendah";
            this.verylow = "sangat rendah";
            this.level = "Tahap";
            this.addtask = "tambahkan senarai tugas";
            this.fillres = "Masukkan sumber untuk di masukkan %:";
            this.emptyres = "Kosongkan sumber untuk dimasukkan % :";
            this.onetimesending = "hantar sekali";
            this.bypercent = "hantar mengikut %";
            this.custom = "Custom";
            this.minsres = "sumber terendah:";
            this.trainonce = "latih sekali";
            this.trainlater = "latih kemudian";
            this.addtofarmlist = "masukkan ke senarai rompakan";
            this.helpupgradeallfields =
              "atur tugas menaikan semua sumber, jika di set ke level 10, semua sumber akan meningkat kelevel 1 kemudian 2 dst, sampai semua sumber mencapai level yang diinginkan.";
            this.helptrain = "latih. " + "\n";
            this.helptrain +=
              "latih sekali: askar akan dilatih kemudian tugas akan dihapus" +
              "\n";
            this.helptrain +=
              "ulangi melatih: setelah scripts melatih askar, dan menunggu sampai masa yang telah di set, dan kemudian askar seterusnya akan dilatih lagi. Jika anda tidak memiliki cukup sumber, script akan menunggu sampai cukup sumber, tugas tidak akan dihapus dari daftar.";
            this.helpsendres = "pedagang" + "\n";
            this.helpsendres +=
              "pengiriman sekali: masukan sumber ke kotak sumber dan set kordinat, click tambahkan tugas, dan bot akan mengirimnya nanti" +
              "\n";
            this.helpsendres +=
              "kirim kembali: masukan sumber ke kotak sumber dan set kordinat, click tambahkan tugas, dan bot akan mengirimnya setelah pedagang kembali" +
              "\n";
            this.helpsendres +=
              "kirim tiap saat: masukan sumber ke kotak sumber dan set kordinat, click tambahkan tugas, dan bot akan mengirimnya, masukan angka X, click tambahkan tugas dan bot akan mengirim sumber setiap X minit" +
              "\n";
            this.helpsendres += "dikirim oleh % : " + "\n";
            this.helpsendres +=
              "Min res: jumlah minimal yang dikirim (tidak dapat mengirim 1 sumber)" +
              "\n";
            this.helpsendres +=
              " Sumber daya Kosong untuk mengatur%: desa ini harus mengirimkan sebagai resourses banyak untuk mengatur desa yang di desa akan tetap yang% dari sumber daya yang ditetapkan:" +
              "\n";
            this.helpsendres +=
              " Jika semua set ke 10% dan Anda memiliki warhouse 80 000, desa akan mencoba untuk mengirimkan semua sumber daya tapi 8000 dari masing-masing akan tetap tinggal di desa." +
              "\n";
            this.helpsendres +=
              " Isi sumber daya untuk mengatur%: desa yang Anda kirimkan resourses untuk harus mengisi untuk warhouse desa Anda kirimkan untuk untuk nilai ini:" +
              "\n";
            this.helpsendres +=
              " Jika diatur semua untuk 90% dan warhouse dapat berisi 80 000 sumber daya, akan mengirim sumber daya ke desa ini hingga mencapai 72 000." +
              "\n";
            this.helpsendres +=
              " Jadi desa ini seharusnya tidak pernah kurang sumber daya% set (kecuali anda menghabiskan itu dinyatakan) dan desa Anda mengirim sumber daya untuk tidak harus memiliki sumber daya lebih kemudian mengatur% (kecuali jika memproduksi mereka atau mendapatkannya dari desa-desa lainnya kemudian)." +
              "\n";
            this.helptasklist =
              "Task added in travian window will show up here." + "\n";
            this.helptasklist +=
              "tiap desa memiliki daftar pembangunan sendiri ";
            this.helpfarmlist =
              " Farms ditambahkan dalam travian jendela akan muncul di sini. Klik dua kali pada nomor yang ingin Anda ubah dan jendela akan muncul di mana Anda dapat mengatur nomor baru." +
              "\n";
            this.helpfarmlist +=
              "tanda kotak untuk menentukan rompakan dilakukan atau tidak" +
              "\n";
            this.helpfarmlist +=
              " Tombol Aktifkan dan Nonaktifkan memutuskan apakah senarai farm seluruh kampung ini diaktifkan " +
              "\n";
            break;
          case "dk":
            this.getdata = "Hent Data";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Gem på server";
            this.deletedata = "Slet data";
            this.sendsms = "Send SMS";
            this.cropfinder = "Farm/crop søger";
            this.succesful = "Fuldført";
            this.tasklist = "Opgave liste";
            this.farmlist = "Farm liste";
            this.trade = "Byt";
            this.train = "Træn";
            this.fill = "Fyld";
            this.empty = "Tom";
            this.priority = "Prioritet";
            this.to = "Til";
            this.on = "SLÅ TIL";
            this.name = "Navn";
            this.type = "type";
            this.del = "Slet";
            this.turnon = "Slå TIL";
            this.turnoff = "Slå FRA";
            this.repetevery = "Gentag hvert";
            this.minutes = "minuter";
            this.sendonreturn = "send igen ved retur";
            this.login = "Login i travian og tryk Hent Data";
            this.edit = "Double click for at redigere";
            this.newval = "Indsæt ny værdi";
            this.inputnum = "Du skal indtaste et tal";
            this.attopt =
              "Indsæt ny værdi:" +
              "\n" +
              "2=Reinforcement" +
              "\n" +
              "3=Angreb" +
              "\n" +
              "4=Plyndre";
            this.attoptallowed = "Kun værdier 2, 3 og 4 er tilladt.";
            this.allfields = "Alle felter";
            this.buldings = [
              "Byggested",
              "Skovhugger",
              "Lergrav",
              "Jernmine",
              "Kornavler",
              "Savværk",
              "Lerbrænderi",
              "Jernstøberi",
              "Kornmølle",
              "Bageri",
              "Råstoflager",
              "Kornkammer",
              "Våben smedje",
              "Rustnings smedje",
              "Turneringsplads",
              "Hovedbygning",
              "Forsamlingsplads",
              "Markedsplads",
              "Ambassade",
              "Kaserne",
              "Stald",
              "Værksted",
              "Akademi",
              "Gemmested",
              "Rådhus",
              "Residens",
              "Palads",
              "Skatkammer",
              "Handelskontor",
              "Stor Kaserne",
              "Stor Stald",
              "Mur",
              "Jordvold",
              "Palisade",
              "Stenhugger",
              "Bryggeri",
              "Fældebygger",
              "Heltebygning",
              "Stor Råstoflager",
              "Stor Kornkammer",
              "Verdensvidunder",
              "Heste Drikkebrønd"
            ];
            this.datarecieved =
              "Data modtaget. tryk start for at starte script.";
            this.datanotrecieved =
              "Data ikke modtaget. Tryk Opdater og prøv igen.";
            this.checking = "Kigger efter hvad der skal gøres";
            this.analysingvillages = "Analysere alle dine byer.";
            this.sendingresurces = "Sender resourcer";
            this.trainingtroops = "Træner tropper";
            this.building = "Bygger";
            this.sendingtroops = "Sender tropper til ";
            this.stopped = "Stoppet";
            this.buildingsucessful = "Bygning fuldført";
            this.buildingatwantedlevel =
              "bygning ej fuldført. Bygning er allerede den ønskede level";
            this.unabletobuild = "Bygning ej fuldført. kunne ikke bygge.";
            this.sendingressucessful = "Sendt resourcer fuldendt";
            this.notenoughtres = "Ikke nok resourcer.";
            this.unabletosendres =
              "Kan ikke sende resourcer til denne destination.";
            this.trainingsuccesful = "Troppetræning fuldført";
            this.sendingtroopssuccesul = "Tropper Sendt.";
            this.deletedfarm = "Farm slettet/blokeret";
            this.farminunsuccesful = "Farming ej fuldført";
            this.gettingdata = "Henter data";
            this.deletingdata = "Sletter data";
            this.deleted = "Slettet";
            this.nodata = "Fejl: ingen data på server";
            this.upgradeallfields = "Opgrader alle felter";
            this.veryhigh = "Meget Høj";
            this.high = "Høj";
            this.normal = "Normal";
            this.low = "Lav";
            this.verylow = "Meget lav";
            this.level = "Level";
            this.addtask = "Tilføj opgave";
            this.fillres = "Fill resourcer til sæt %:";
            this.emptyres = "Tøm resourcer til sæt % :";
            this.onetimesending = "engangs sending";
            this.bypercent = "Send med %";
            this.custom = "Custom";
            this.minsres = "Min res:";
            this.trainonce = "Træn en gang";
            this.trainlater = "Træn senere";
            this.addtofarmlist = "Tilføj til farmliste";
            this.helpupgradeallfields =
              "Sæt opgave til opgrader alle felter. hvis sat til level 10, vil alle felter blive opgraderet til level 1, og så alle til level 2,... indtil alle er den ønskede level.";
            this.helptrain = "Træn tropper senere. " + "\n";
            this.helptrain +=
              "Træn en gang: Tropperne vil blive trænet, og opgaven slettet " +
              "\n";
            this.helptrain +=
              "Gentag hver minuter: Når scriptet har trænet tropper, vil det vente den anslået tid og forsøge at træne tropper igen. Hvis du ikke har nok resourcer, vil scriptet vente til der er nok resourcer, træne tropper når der er nok resourcer og igen vente til anslået tid før træning af tropper igen. Opgaven vil ikke blive slettet fra listen.";
            this.helpsendres = "Handler" + "\n";
            this.helpsendres +=
              "engangs sending: indtast resourcer i resource bokserne og indtast koordinater, klik tilføj opgave og botten vil sende dem senere" +
              "\n";
            this.helpsendres +=
              "send ved retur: indtast resourcer i resource bokserne og indtast koordinater, klik tilføj opgave og botten vil sende dem til valgte by så snart handelsfolkene kommer tilbage fra deres tur" +
              "\n";
            this.helpsendres +=
              "Send hver minuter: indtast resourcer i resource bokserne og indtast koordinater, imput X number, klik tilføj opgave og botten vil forsøge at sende dem til valgte by hver X minuter" +
              "\n";
            this.helpsendres += "Send ved % : " + "\n";
            this.helpsendres +=
              "Min res: min beløb af res script skal sende (så det ikke sender 1 resource)" +
              "\n";
            this.helpsendres +=
              "Tøm resourser til % : denne by skal sende så manger resourcer til valgte by  og skal undlade at sende % af resourcerne der er sat:" +
              "\n";
            this.helpsendres +=
              "Hvis alle er sat til 10% og dit råstoflager er på 80 000, byen vil sende alle resourcer undtagen 8000 af hver, som vil forblive i byen." +
              "\n";
            this.helpsendres +=
              "Udfyld resourcer til %: byen du sender resourcer til skald udfylde råstoflageret af byen du sender til med denne værdi:" +
              "\n";
            this.helpsendres +=
              "Hvis alle er sat til 90% og råstoflageret kan holde 80 000 resourcer, vil der blive sendt resourcer til denne by indtil den når 72 000." +
              "\n";
            this.helpsendres +=
              "Så denne by skal aldrig have mindre sat end % resourser (med mindre du bruger dem på en anden måde) og byen du sender resourcer til skal ikke have mere end % resourcer (med mindre den selv producere dem eller får fra en anden by)." +
              "\n";
            this.helptasklist =
              "Opgaver tilføjet i travian vinduet bliver vist her." + "\n";
            this.helptasklist += "Alle byer har sin egen byggeliste";
            this.helpfarmlist =
              "Farms tilføjet i travian vindue bliver vist her. Dobbelt klik på nummeret du ønsker at ændre og vinduet vil komme frem hvor du kan sætte et nyt nummer." +
              "\n";
            this.helpfarmlist +=
              "Checkbox bestemmer om farm er slået til eller fra" + "\n";
            this.helpfarmlist +=
              "Knapperne Slå TIL og Slå FRA bestemmer om farming er slået til for denne by" +
              "\n";
            break;
          case "bg":
            this.getdata = "Изтегли задачите";
            this.start = "Пусни";
            this.stop = "Спри";
            this.savetoserver = "Запази задачите на сървъра";
            this.deletedata = "Изтрий задачите от сървъра";
            this.sendsms = "Прати SMS";
            this.cropfinder = "Търсачка за житници и долини";
            this.succesful = "Успешно";
            this.tasklist = "Лист със задачи";
            this.farmlist = "Лист със градове за нападение";
            this.trade = "Размени";
            this.train = "Тренирай";
            this.fill = "Запълни";
            this.empty = "Празно";
            this.priority = "Приоритет";
            this.to = "На";
            this.on = "Вкл.";
            this.name = "Име";
            this.type = "Тип";
            this.del = "Изтрий";
            this.turnon = "Включи";
            this.turnoff = "Изключи";
            this.repetevery = "Повтаряй на всеки";
            this.minutes = "минути";
            this.sendonreturn = "Изпрати отново след завръщане";
            this.login = "Логни се и натисни изтегли задачите";
            this.edit = "Кликни 2 пъти за промяна";
            this.newval = "Въведи нова стойност";
            this.inputnum = "Трябва да въведете число";
            this.attopt =
              "Въведи стойност:" +
              "\n" +
              "2=Подкрепление" +
              "\n" +
              "3=Нормална атака" +
              "\n" +
              "4=Набег";
            this.attoptallowed = "Позволени стойности са само 2,3 и 4";
            this.allfields = "Всички полета";
            this.buldings = [
              "Място за строеж",
              "Сечище",
              "Глинена кариера",
              "Желязна мина",
              "Житно поле",
              "Дъскорезница",
              "Тухларна",
              "Леярна",
              "Мелница",
              "Пекарна",
              "Склад",
              "Хамбар",
              "Ковачница за оръжия",
              "Ковачница за брони",
              "Арена",
              "Главна сграда",
              "Сборен пункт",
              "Пазар",
              "Посолство",
              "Казарма",
              "Конюшня",
              "Работилница",
              "Aкадемия",
              "Скривалище",
              "Кметство",
              "Резиденция",
              "Дворец",
              "Съкровищница",
              "Търговска палата",
              "Голяма Казарма",
              "Голяма Конюшня",
              "Градска стена",
              "Земен насип",
              "Палисада",
              "Зидарска гилдия",
              "Пивоварна",
              "Трапер",
              "Таверна",
              "Голям склад",
              "Голям хамбар",
              "Чудо на Света",
              "Поилка"
            ];
            this.datarecieved =
              "Задачите са изтеглени, натисни старт за да пуснеш бота";
            this.datanotrecieved =
              "Задачите не са изтегляни, моля презаредете страницата и опитайте отново";
            this.checking = "Проверявам какво да свърша";
            this.analysingvillages = "Анализ на градовете";
            this.sendingresurces = "Изпращане на ресурси";
            this.trainingtroops = "В процес на тренировка на войска";
            this.building = "В процес на строене";
            this.sendingtroops = "Изпращане на войски до ";
            this.stopped = "Спряно";
            this.buildingsucessful = "Строенето е успешно";
            this.buildingatwantedlevel =
              "Строенето е не успешно.Тази сграда вече е на нивото което желаете";
            this.unabletobuild =
              "Построяването е неуспешно! Не може да постройте това";
            this.sendingressucessful = "Изпращането на ресурси е неуспешно";
            this.notenoughtres = "Нямате достатъчно ресурси.";
            this.unabletosendres =
              "Не може да изпратите ресурси до тази дестинация.";
            this.trainingsuccesful = "Тренировката на войска е успешна";
            this.sendingtroopssuccesul = "Изпращането на войска е успешно.";
            this.deletedfarm = "Касата е изтрита/блокирана";
            this.farminunsuccesful = "Касирането неуспешно";
            this.gettingdata = "Получаване на данни";
            this.deletingdata = "Изтриване на данни";
            this.deleted = "Изтрито";
            this.nodata = "Грешка:няма качени данни на сървъра";
            this.upgradeallfields = "Ъпгрейд на всички полета";
            this.veryhigh = "Много висок";
            this.high = "Висок";
            this.normal = "Нормален";
            this.low = "Нисък";
            this.verylow = "Много нисък";
            this.level = "Ниво";
            this.addtask = "Добави в задачи";
            this.fillres = "Запълни ресурсите до%:";
            this.emptyres = "Изпразни ресурсите до % :";
            this.onetimesending = "Еднократно изпращане";
            this.bypercent = "Изпрати по %";
            this.custom = "По избор";
            this.minsres = "Минимум ресурс:";
            this.trainonce = "Тренирай веднъж";
            this.trainlater = "Тренирай по-късно";
            this.addtofarmlist = "Добави към листа с касите";
            this.helpupgradeallfields =
              "Тази опция задава задача за развиване на всички полета. ако зададете полетата да се развият до ниво 10, то всички ще бъдат развити до ниво 1 след това всички до ниво 2ро, и така докато не достигнат желаното от вас ниво";
            this.helptrain = "Tренирайте вашата войска по-късно " + "\n";
            this.helptrain +=
              "Тренирай еднократно.войската ще бъде тренирана и задачата ще бъде изтрита" +
              "\n";
            this.helptrain +=
              "Повтаряй всеки х минути.Веднага след започване тренировката на зададената от вас войска започва отброяване на х време за започване тренировката на още толкова войска. ако нямате достатъчно ресурси бота изчаква докато се натрупат и започва отново";
            this.helpsendres = "Автоматично пращане" + "\n";
            this.helpsendres +=
              "Еднократно пращане: напишете желаното количество ресурс който искате да изпратите и въведете координати.. " +
              "\n";
            this.helpsendres +=
              "Изпрати отново при завръщане: Пишете координати и ресурс в кутийките и давате добави към задачи.. когато търговците ви се приберат от предишно пращане те веднага ще потеглят към следващото място" +
              "\n";
            this.helpsendres +=
              "Изпращай на всеки минути: Изпращане на Х ресурси на Х минути към даден град" +
              "\n";
            this.helpsendres += "Изпрати по % : " + "\n";
            this.helpsendres +=
              "Минимум ресурс: Минималното количество ресурс което бота може да изпраща(е няма да изпрати 1 ресурс)" +
              "\n";
            this.helpsendres +=
              "Изпразни ресурсите до % : Изпраща толкова ресурс до друг град, така че в този град да останат Х % ресурс:" +
              "\n";
            this.helpsendres +=
              "Ако всичко е на 10% и имате склад 80000, бота ще изпрати толкова ресурс че в града да останат само 8000 (10%) ресурс . Пример: имате 60000 глина 55000 дървесина и 48000 желязо, склада побира 80000..въвеждате 10% и изпращате: изпратеният ресурс ще бъде 52000 глина ,48000 дървесина и 40000 желязо.. 8000 от всичко остава в града" +
              "\n";
            this.helpsendres +=
              "Запълни ресурсите до %: Изпраща ресурси на друг град докато склада не достигне Х %:" +
              "\n";
            this.helpsendres +=
              "ако всичко е на 90%. и склада побира 80000. то ще се пращат ресурси до тогаава докато склада на града на който пращате не достигне 72000." +
              "\n";
            this.helpsendres +=
              "Значи този град няма да има никога по малко от х % ресурси (естествено ако не ги похарчите за друго) а града на който пращате никога няма да има повече от Х % който сте задали освена ако не произведете или не пратите от друг град." +
              "\n";
            this.helptasklist =
              "Това са задачите който чакат да бъдат изпълнени." + "\n";
            this.helptasklist += "Всеки град има свой лист със задачи";
            this.helpfarmlist =
              "Това са касите който сте добавили.. двоен клик на мишката върху стойността която искате да промените и ще се отвори прозорец където можете да въведете стойността." +
              "\n";
            this.helpfarmlist +=
              "кутийката с тикчето определя дали тази каса ще бъде атакувана при следващо нападение или не" +
              "\n";
            this.helpfarmlist +=
              "Бутоните Включи и Изключи определят дали целият лист с каси е включен" +
              "\n";
          default:
            break;
          case "com.br":
            this.getdata = "Obter dados";
            this.start = "Iniciar";
            this.stop = "Parar";
            this.savetoserver = "Salvar no servidor";
            this.deletedata = "Apagar dados";
            this.sendsms = "Enviar SMS";
            this.cropfinder = "Achar Farm/crop ";
            this.succesful = "Successfull";
            this.tasklist = "Lista de tarefas";
            this.farmlist = "Lista de Farms";
            this.trade = "Comercio";
            this.train = "Treinar";
            this.fill = "Preencher";
            this.empty = "Vazio";
            this.priority = "Prioridade";
            this.to = "Parar";
            this.on = "Ligar";
            this.name = "Nome";
            this.type = "tipo";
            this.del = "Apagar";
            this.turnon = "Ligar";
            this.turnoff = "Desligar";
            this.repetevery = "Repetir todos";
            this.minutes = "Minutos";
            this.sendonreturn = "enviar após retornar";
            this.login = "Logar no travian e depois carregue dados";
            this.edit = "Clique 2 vezes para editar";
            this.newval = "Digitar um novo valor";
            this.inputnum = "Você precisa inserir um número";
            this.attopt =
              "Inserir um número:" +
              "\n" +
              "2=Reforço" +
              "\n" +
              "3=Ataque" +
              "\n" +
              "4=Assalto";
            this.attoptallowed = "Somente os números 2, 3 and 4 são aceitos.";
            this.allfields = "Todos os campos";
            this.buldings = [
              "Construir",
              "Bosque",
              "Poço de Barro",
              "Mina de Ferro",
              "Campo de Cereais",
              "Serraria",
              "Alvenaria",
              "Fundição",
              "Moinho",
              "Padaria",
              "Armazém",
              "Celeiro",
              "Ferreiro",
              "Armadura",
              "Praça de Torneios",
              "Edifício Principal",
              "Ponto de Reunião",
              "Mercado",
              "Embaixada",
              "Quartel",
              "Cavalaria",
              "Oficina",
              "Academia",
              "Esconderijo",
              "Prefeitura",
              "Residência",
              "Palácio",
              "Tesouraria",
              "Companhia do Comércio",
              "Grande Quartel",
              "Grande Cavalaria",
              "Muralha",
              "Muralha de barro",
              "Paliçada",
              "Pedreiro",
              "Cervejaria",
              "Fabrica de Armadilha",
              "Mansão do Herói",
              "Grande Armazém",
              "Grande Celeiro",
              "Maravilha do Mundo",
              "Cavalo Bebedouro"
            ];
            this.datarecieved =
              "Dados carregados! Pressione o botão para iniciar o lançamento script.";
            this.datanotrecieved =
              " Dados não carregados. Pressione o botão obter dados, novamente.";
            this.checking = "Verificando o que fazer";
            this.analysingvillages = "Analisando suas aldeias.";
            this.sendingresurces = "Enviar recursos";
            this.trainingtroops = "Tropas em treino";
            this.building = "Construir";
            this.sendingtroops = "O envio de tropas para";
            this.stopped = "Parou";
            this.buildingsucessful = "Construção concluída.";
            this.buildingatwantedlevel =
              "Construção deu errado. Construção chegou ao nível pedido ou maximo";
            this.unabletobuild = "Construção deu errado. Incapaz de construir.";
            this.sendingressucessful = "Envio de recursos concluído";
            this.notenoughtres = "Não é possível enviar.";
            this.unabletosendres = "Incapaz de enviar recursos para o destino.";
            this.trainingsuccesful = "Treino de tropas concluído";
            this.sendingtroopssuccesul = "Envio de tropas deu certo.";
            this.deletedfarm = "Farm apagado/bloqueado";
            this.farminunsuccesful = "Farmar deu certo";
            this.gettingdata = "Carregar dados";
            this.deletingdata = "Apagar dados";
            this.deleted = "Apagar";
            this.nodata = "Erro: não há dados no servidor";
            this.upgradeallfields = "Atualizar todos os campos";
            this.veryhigh = "Muito alta";
            this.high = "Alta";
            this.normal = "Normal";
            this.low = "Baixo";
            this.verylow = "Muito Baixo";
            this.level = "Nível";
            this.addtask = "Adicionar tarefa";
            this.fillres = "Encher recurso até %:";
            this.emptyres = "Recurso mínimo em % :";
            this.onetimesending = "Enviar 1 vez";
            this.bypercent = "Enviar tantos %";
            this.custom = "Personalizado";
            this.minsres = "Em minutos:";
            this.trainonce = "Treinar 1 vez";
            this.trainlater = "Treinar depois";
            this.addtofarmlist = "Adicionar a lista de farms";
            this.helpupgradeallfields =
              "Conjunto de tarefas para atualizar todos os seus campos. Se definido como o nível 10, todos os campos serão atualizados para nível 1, depois todos para o nível 2, até que todos os campos estejam no nível desejado.";
            this.helptrain = "Treinar tropas depois." + "\n";
            this.helptrain +=
              "Treinar uma vez: Após o treino de tropas a tarefa será excluída" +
              "\n";
            this.helptrain +=
              "Repetir a cada minuto:. depois de treinadas, ele vai esperar por um tempo definido e tentará treinar unidades de novo. Se não tiver recursos suficientes, irá esperar para obter recursos suficientes, unidades de treino quando há recursos suficientes e, novamente, esperar o tempo definido antes de treinar novamente tarefa não será excluída da lista.";
            this.helpsendres = "Comercio" + "\n";
            this.helpsendres +=
              "Enviar uma vez: inserir recursos e coordenadas, clique em Adicionar tarefa e será enviado mais tarde." +
              "\n";
            this.helpsendres +=
              "Enviar ao retornar: inserir recursos e coordenadas, clique em Adicionar tarefa e bot irá enviá-los para outra aldeia, logo que retornar da viagem." +
              "\n";
            this.helpsendres +=
              "Envio programado: inserir recursos e coordenadas, inserir número X, clique em Adicionar tarefa e o bot vai tentar enviá-los para outra aldeia a cada X minutos " +
              "\n";
            this.helpsendres += "Enviar tantos %:" + "\n";
            this.helpsendres +=
              "Envio por min: quantidade min que o script pode enviar (para que ele não envie um recurso ) " +
              "\n";
            this.helpsendres +=
              "Recurso mínimo de %: esta aldeia enviará recursos para outra aldeia, ao enviar ela manterá a quantia mínima de % dos recursos definidos para envio." +
              "\n";
            this.helpsendres +=
              "Se destinou 10% para envio e em seu armazém tem 80.000, esta vila enviará 72.000 recursos mas 8.000 ficará na aldeia." +
              "\n";
            this.helpsendres +=
              "Recurso cheio em %: esta aldeia receberá recursos de outra aldeia. Ela manterá a quantia máxima de % dos recursos definidos." +
              "\n";
            this.helpsendres +=
              " Ao definir que os recursos devem chegar a 90% da capacidade. E se o armazém pode conter 80.000 recursos, o sistema irá enviar recursos para esta vila, até atingir 72 000." +
              " \n";
            this.helpsendres +=
              " Portanto, esta vila chegará com os recursos até % da capacidade a menos que gaste de outra forma. E a aldeia que está enviando recursos deve ter o mínimo de % da capacidade. Só terá mais ao buscar de outras aldeias mais tarde." +
              " \n ";
            this.helptasklist = "A Tarefa adicionada vai aparecer aqui" + "\n";
            this.helptasklist +=
              "Cada as aldeias tem a sua lista de construção ";
            this.helpfarmlist =
              " O farm adicionado vai aparecer aqui. Dê um duplo clique sobre o número que deseja alterar e uma janela aparecerá onde poderá fazer a alteração" +
              "\n";
            this.helpfarmlist +=
              "Caixa de Seleção decidir se a fazenda será ligado ou desligada" +
              "\n";
            this.helpfarmlist +=
              "Botões, Ligar e desligar para decidir se toda a lista de farms será usada por esta aldeia" +
              "\n";
            break;
          case "cz":
            this.getdata = "Načíst";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Uložit data";
            this.deletedata = "Smazat data";
            this.sendsms = "Poslat SMS";
            this.cropfinder = "Vyhledávač farem/multicropů";
            this.succesful = "Úspěšné";
            this.tasklist = "Stavbyvedoucí";
            this.farmlist = "Farmlist";
            this.trade = "Trade";
            this.train = "Trénovat";
            this.fill = "Vyplnit";
            this.empty = "Prázdné";
            this.priority = "Priorita";
            this.to = "Do";
            this.on = "Zapnuto";
            this.name = "Název";
            this.type = "Typ útoku";
            this.del = "Smazat";
            this.turnon = "Zapnout";
            this.turnoff = "Vypnout";
            this.repetevery = "Opakovat každých";
            this.minutes = "minut";
            this.sendonreturn = "Opět odeslat po návratu";
            this.login = "Přihlaš se do Travianu a Načti data";
            this.edit = "Dvojí klik pro úpravu";
            this.newval = "Zadej novou hodnotu";
            this.inputnum = "Musíš zadat hodnotu";
            this.attopt =
              "Zadej hodnotu:" +
              "\n" +
              "2=Podpora" +
              "\n" +
              "3=Normální útok" +
              "\n" +
              "4=Loupež";
            this.attoptallowed = "Pouze hodnoty 2, 3 a 4 jsou povoleny.";
            this.allfields = "Všechna pole";
            this.buldings = [
              "Staveniště",
              "Dřevorubec",
              "Hliněný důl",
              "Železný důl",
              "Obilné pole",
              "Pila",
              "Cihelna",
              "Slévárna",
              "Mlýn",
              "Pekárna",
              "Sklad surovin",
              "Sýpka",
              "Kovář",
              "Zbrojnice",
              "Turnajové hříště",
              "Hlavní budova",
              "Shromaždiště",
              "Tržiště",
              "Ambasáda",
              "Kasárny",
              "Stáje",
              "Dílna",
              "Akademie",
              "Úkryt",
              "Radnice",
              "Rezidence",
              "Palác",
              "Pokladnice",
              "Obchodní kancelář",
              "Velké kasárny",
              "Velké stáje",
              "Městská zeď",
              "Zemní hráz",
              "Palisáda",
              "Kameník",
              "Pivovar",
              "Pasti",
              "Hrdinský dvůr",
              "Velké sklady",
              "Velké sýpky",
              "Div světa",
              "Koňské napajedlo"
            ];
            this.datarecieved =
              "Data načteny. Stiskni Start pro spuštění skriptu.";
            this.datanotrecieved =
              "Data nenačteny. Stiskni Aktualizovat k opětovnému načtení.";
            this.checking = "Přemýšlím";
            this.analysingvillages = "Analyzování tvých vesnic.";
            this.sendingresurces = "Odesílání jednotek";
            this.trainingtroops = "Trénování jednotek";
            this.building = "Stavba";
            this.sendingtroops = "Odesílání jednotek do ";
            this.stopped = "Zastaveno";
            this.buildingsucessful = "Stavba dokončena";
            this.buildingatwantedlevel =
              "Neúspěná stavba, již je na požadované úrovni";
            this.unabletobuild = "Neúspěšná stavba, nelze ji postavit";
            this.sendingressucessful = "Jednotky úspěšně odeslány";
            this.notenoughtres = "Málo jednotek k odeslání.";
            this.unabletosendres =
              "Nelze odeslat jednotky do požadovaného cíle.";
            this.trainingsuccesful = "Jednotky úspěšně vytrénovány";
            this.sendingtroopssuccesul = "Jednotky úspěšně odeslány.";
            this.deletedfarm = "Farma smazána/blokována";
            this.farminunsuccesful = "Neúspěšné farmení";
            this.gettingdata = "Načítání";
            this.deletingdata = "Mazání dat";
            this.deleted = "Smazáno";
            this.nodata = "Chyba: pravděpodoboně nejsou data na serveru";
            this.upgradeallfields = "Rozšířit všechna pole";
            this.veryhigh = "Velmi vysoká";
            this.high = "Vysoká";
            this.normal = "Normální";
            this.low = "Nízká";
            this.verylow = "Velmi nízká";
            this.level = "Úroveň";
            this.addtask = "Stavbyvedoucí";
            this.fillres = "Fill resources to set %:";
            this.emptyres = "Empty resources to set % :";
            this.onetimesending = "Odeslat pouze jednou";
            this.bypercent = "Send by %";
            this.custom = "Přednastaveno";
            this.minsres = "Min res:";
            this.trainonce = "Trénovat pouze jednou";
            this.trainlater = "Trénovat později";
            this.addtofarmlist = "Přidat do Farmlistu";
            this.helpupgradeallfields =
              "Zadat požadavek k rozšíření všech polí. Pokud zadáš na úroveň 10, všechny pole budou rozšířeny na úroveň 1, poté na úroveň 2,...dokud všechny pole nebudou na požadované úrovni 10.";
            this.helptrain = "Trénovat jednotky později. " + "\n";
            this.helptrain +=
              "Trénovat jednou: Jednotky budou vytrénovány pouze nyní, poté bude příkaz zrušen. " +
              "\n";
            this.helptrain +=
              "Opakovat po minutách: Poté, co budou vytrénovány jednotky, bude čekáno stanovenou dobu a poté budou jednotky opět trénovány. Pokud nebude dostatek surovin, bude čekáno jakmile bue dostatek surovin, poté bude opět vytrénováno. Požadavek se neodstraní.";
            this.helpsendres = "Traider" + "\n";
            this.helpsendres +=
              "Jednorázové odeslání: jednorázově bude odesláno zadané množství." +
              "\n";
            this.helpsendres +=
              "Odeslat po návratu: po návratu z cílové vesnice, bude opět odesláno zadané množství." +
              "\n";
            this.helpsendres +=
              "Odeslat po minutách: zadané množství bude odesíláno po zvolených minutách." +
              "\n";
            this.helpsendres += "Odeslat dle % : " + "\n";
            this.helpsendres +=
              "Minimální množství: nejmenší množství, které se mohou odeslat." +
              "\n";
            this.helpsendres +=
              "Empty resources to set % : this village should send as much resourses to set village that in village will remain that % of resources that are set:" +
              "\n";
            this.helpsendres +=
              "If all set to 10% and you have warhouse 80 000, village will try to send out all resources but 8000 of each will remain in village." +
              "\n";
            this.helpsendres +=
              "Fill resources to set %: the village you are sending resourses to should fill to warhouse of village you are sending to to this value:" +
              "\n";
            this.helpsendres +=
              "If all set to 90% and warhouse can contain 80 000 resources, it will send resources to this village untill it reaches 72 000." +
              "\n";
            this.helpsendres +=
              "So this village should never have less then set % resources (unless you spend it otherwise) and village you are sending resources to should not have more resources then set % (unless it produce them or get it from other villages later)." +
              "\n";
            this.helptasklist =
              "Task added in travian window will show up here." + "\n";
            this.helptasklist += "Every village has its own building list";
            this.helpfarmlist =
              "Farms added in travian window will show up here. Double click on number you wish to change and window will show up where you can set new number." +
              "\n";
            this.helpfarmlist +=
              "Checkbox decide if farm is turned on or off" + "\n";
            this.helpfarmlist +=
              "Buttons Turn On and Turn Off decide if whole farmlist for this village is turned on" +
              "\n";
            break;
          case "gr": //server
            this.getdata = "Ανάκτηση δεδομένων";
            this.start = "Έναρξη";
            this.stop = "Διακοπή";
            this.savetoserver = "Αποθήκευση στον server";
            this.deletedata = "Διαγραφή δεδομένων";
            this.sendsms = "Αποστολή SMS";
            this.cropfinder = "Έυρεση φαρμών/χωραφιών";
            this.succesful = "Επιτυχής";
            this.tasklist = "Λίστα εργασιων";
            this.farmlist = "Λίστα φαρμών";
            this.trade = "Ανταλαγή";
            this.train = "Εκπέδευση";
            this.fill = "Fill";
            this.empty = "Άδειο";
            this.priority = "Προτεραιότητα";
            this.to = "To";
            this.on = "ON";
            this.name = "Όνομα";
            this.type = "Τύπος";
            this.del = "Διαγραφή";
            this.turnon = "Ενεργοποίηση";
            this.turnoff = "Διακοπή";
            this.repetevery = "Επανέλαβε κάθε";
            this.minutes = "λεπτά";
            this.sendonreturn = "στείλε ξανά κατά την επιστροφή";
            this.login = "Συνδεθείτε στο travian και πιέστε Ανάκτηση δεδομένων";
            this.edit = "Διπλο click to edit";
            this.newval = "Εισάγετε νέα τιμή";
            this.inputnum = "Πρέπει να εισάγετε ένα αριθμό";
            this.attopt =
              "Εισάγετε νέα τιμή:" +
              "\n" +
              "2=Ενισχύσεις" +
              "\n" +
              "3=Επίθεση Κανονική" +
              "\n" +
              "4=Επίθεση Επιδρομή";
            this.attoptallowed = "Μόνο οι τιμές 2, 3 and 4 επιτρέπονται.";
            this.allfields = "Όλα τα πεδία";
            this.buldings = [
              "Εργοτάξιο",
              "Ξυλοκόπος",
              "Ορυχείο πηλού",
              "Ορυχείο σιδήρου",
              "Χωράφι σιταριού",
              "Πριονιστήριο",
              "Πηλοποιείο",
              "Χυτήριο σιδήρου",
              "Μύλος σιταριού",
              "Αρτοποιείο",
              "Αποθήκη πρώτων υλών",
              "Σιταποθήκη",
              "Blacksmith",
              "Σιδηρουργείο",
              "Πλατεία αθλημάτων",
              "Κεντρικό κτήριο",
              "Πλατεία συγκεντρώσεως",
              "Αγορά",
              "Πρεσβεία",
              "Στρατόπεδο",
              "Στάβλος",
              "Εργαστήριο",
              "Ακαδημία",
              "Κρυψώνα",
              "Δημαρχείο",
              "Μέγαρο",
              "Παλάτι",
              "Θησαυροφυλάκιο",
              "Εμπορικό γραφείο",
              "Μεγάλο στρατόπεδο",
              "Μεγάλος στάβλος",
              "Τείχος πόλεως",
              "Χωμάτινο τεἰχος",
              "Τείχος με πασσάλους",
              "Λιθοδόμος",
              "Ζυθοποιείο",
              "Παγίδες",
              "Περιοχή ηρώων",
              "Μεγάλη αποθήκη υλών",
              "Μεγάλη σιταποθήκη",
              "Παγκόσμιο θαύμα",
              "Ποτίστρα αλόγων"
            ];
            this.datarecieved =
              "Δεδομένα ελήφθησαν. Πατήστε το κουμπί έναρξη για να ξεκινήσει το script.";
            this.datanotrecieved =
              "Δεδομένα δεν ελήφθησαν. Πατήστε το κουμπί ενημέρωση για επανάληψη.";
            this.checking = "Ελέγχει τι να κανένει";
            this.analysingvillages = "Ανάλυση όλων των χωριών σας.";
            this.sendingresurces = "Αποστολή υλών";
            this.trainingtroops = "Εκπαίδευση στρατευμάτων";
            this.building = "Χτίζει";
            this.sendingtroops = "Αποστολή στρατευμάτων στο ";
            this.stopped = "Σταματήμενο";
            this.buildingsucessful = "Επιτυχής χτίσιμο";
            this.buildingatwantedlevel =
              "Ανεπιτυχής χτισιμο. Το κτήριο είναι στο επιθυμητό επίπεδο";
            this.unabletobuild = "Ανεπιτυχής χτισιμο. Αδύνατο να χτίσει.";
            this.sendingressucessful = "Επιτυχής Αποστολή υλών";
            this.notenoughtres = "Μη επαρκής ύλες.";
            this.unabletosendres =
              "Ανεπιτυχής αποστολή υλών σε αυτ'ον τον προορισμό.";
            this.trainingsuccesful = "Επιτυχής Εκπαίδευση στρατευμάτων";
            this.sendingtroopssuccesul = "Επιτυχής αποστολή στρατευμάτων.";
            this.deletedfarm = "Φάρμα διαγράφηκε/μπλοκαρίστηκε";
            this.farminunsuccesful = "Farming Ανεπιτυχής";
            this.gettingdata = "Λήψη δεδομένων";
            this.deletingdata = "Διαγραφή δεδομένων";
            this.deleted = "Διαγραφή";
            this.nodata = "Λάθος: πιθανών χωρίς δεδομένα ο server";
            this.upgradeallfields = "Αναβάθμιση όλων των πεδίων";
            this.veryhigh = "Πολύ υψηλό";
            this.high = "υψηλό";
            this.normal = "Κανονικό";
            this.low = "Χαμηλό";
            this.verylow = "Πολύ χαμηλό";
            this.level = "Επίπεδο";
            this.addtask = "Πρόσθεσε εργασία";
            this.fillres = "Γέμισε ύλες στο %:";
            this.emptyres = "Άδειασε ύλες στο % :";
            this.onetimesending = "Μια φορά αποστολή";
            this.bypercent = "Στείλε το %";
            this.custom = "Custom";
            this.minsres = "Ελάχιστες ύλες:";
            this.trainonce = "Εκπαίδευσε μία φορά";
            this.trainlater = "Εκπαίδευσε αργότερα";
            this.addtofarmlist = "Πρόσθεσε στη λίστα φαρμων";
            this.helpupgradeallfields =
              "Ορίζει τις εργασίες αναβάθμισης των πεδίων. Εαν οριστεί στο επίπεδο 10 , όλα τα πεδία θα αναβαθμιστούν στο επίπεδο 1 μετά ολα στο επίπεδο 2,... μέχρι να φτάσουν το επιθυμητό επίπεδο.";
            this.helptrain = "Εκπαίδευση στρατευμάτων αργότερα. " + "\n";
            this.helptrain +=
              "Εκπαίδευσε μία φορά: Τα στρατεύματα θα εκπαιδευτούν και η εργασία θα διαγραφεί" +
              "\n";
            this.helptrain +=
              "Επανέλαβε κάθε λεπτό: after script trains units, it will wait for set time and then try to train units again. If you dont have enought resources, script will wait to get enought resources, train units when there is enought resources and again wait for set time before training again. Task will not get deleted from list.";
            this.helpsendres = "Ανταλακτήριο" + "\n";
            this.helpsendres +=
              "Μία φορά αποστολή: imput resources into resource boxes and set coordinate, click add task and bot will send them later" +
              "\n";
            this.helpsendres +=
              "Αποστολη κατά την επιστροφή: imput resources into resource boxes and set coordinate, click add task and bot will send them to other village as soon as traiders return from trip" +
              "\n";
            this.helpsendres +=
              "Αποστολή κάθε λεπτό: imput resources into resource boxes and set coordinate, imput X number, click add task and bot will try to send them to other village every X minutes" +
              "\n";
            this.helpsendres += "Αποστολή % : " + "\n";
            this.helpsendres +=
              "Ελάχιστες ύλες: min amount of res script can send (so it wont send 1 resource)" +
              "\n";
            this.helpsendres +=
              "Empty resources to set % : this village should send as much resourses to set village that in village will remain that % of resources that are set:" +
              "\n";
            this.helpsendres +=
              "If all set to 10% and you have warhouse 80 000, village will try to send out all resources but 8000 of each will remain in village." +
              "\n";
            this.helpsendres +=
              "Fill resources to set %: the village you are sending resourses to should fill to warhouse of village you are sending to to this value:" +
              "\n";
            this.helpsendres +=
              "If all set to 90% and warhouse can contain 80 000 resources, it will send resources to this village untill it reaches 72 000." +
              "\n";
            this.helpsendres +=
              "So this village should never have less then set % resources (unless you spend it otherwise) and village you are sending resources to should not have more resources then set % (unless it produce them or get it from other villages later)." +
              "\n";
            this.helptasklist =
              "Task added in travian window will show up here." + "\n";
            this.helptasklist += "Every village has its own building list";
            this.helpfarmlist =
              "Farms added in travian window will show up here. Double click on number you wish to change and window will show up where you can set new number." +
              "\n";
            this.helpfarmlist +=
              "Checkbox decide if farm is turned on or off" + "\n";
            this.helpfarmlist +=
              "Buttons Turn On and Turn Off decide if whole farmlist for this village is turned on" +
              "\n";
            break;
          case "rs": //server
            this.getdata = "Preuzmi Podatke";
            this.start = "Start";
            this.stop = "Stop";
            this.savetoserver = "Sačuvaj na server";
            this.deletedata = "Obriši podatke";
            this.sendsms = "Pošalji SMS";
            this.cropfinder = "Farme/žitnice pronalazač";
            this.succesful = "Uspešno";
            this.tasklist = "Lista zadataka";
            this.farmlist = "Lista farmi";
            this.trade = "Trgovina";
            this.train = "Istreniraj";
            this.fill = "Popuni";
            this.empty = "Prazno";
            this.priority = "Prioritet";
            this.to = "u";
            this.on = "na";
            this.name = "Ime";
            this.type = "vrsta";
            this.del = "Brisanje";
            this.turnon = "Upali";
            this.turnoff = "Ugasi";
            this.repetevery = "Ponovi svakih";
            this.minutes = "minuta";
            this.sendonreturn = "pošalji ponovo po povratku";
            this.login = "Uloguj se na travian i klikni na Preuzmi Podatke";
            this.edit = "Dupli klik za ispravku";
            this.newval = "Unesi novu vrednost";
            this.inputnum = "Treba da ubaciš broj";
            this.attopt =
              "Ubaci novu vrednost:" +
              "\n" +
              "2=Pojačanje" +
              "\n" +
              "3=Napad" +
              "\n" +
              "4=Pljačka";
            this.attoptallowed = "Samo vrednosti 2, 3 i 4 su dozvoljene.";
            this.allfields = "Sva polja";
            this.buldings = [
              "Mesto gradnje",
              "Drvoseča",
              "Rudnik gline",
              "Rudnik gvožđa",
              "Njiva",
              "Pilana",
              "Ciglana",
              "Livnica",
              "Mlin",
              "Pekara",
              "Skladište",
              "Silos",
              "Kovačnica",
              "Oružarnica",
              "Viteška arena",
              "Glavna zgrada",
              "Mesto okupljanja",
              "Pijaca",
              "Ambasada",
              "Kasarna",
              "Štala",
              "Radionica",
              "Akademija",
              "Pekara",
              "Opština",
              "Rezidencija",
              "Palata",
              "Riznica",
              "Trgovački centar",
              "Velika Kasarna",
              "Velika Štala",
              "Gradski Zid",
              "Zemljani Zid",
              "Palisada",
              "Kamenorezac",
              "Pivara",
              "Postavljač zamki",
              "Dvorac Heroja",
              "Veliko Skladište",
              "Veliki Silos",
              "Svetsko Čudo",
              "Pojilište"
            ];
            this.datarecieved =
              "Podaci primljeni. Pritisni start dugme da pokreneš skriptu.";
            this.datanotrecieved =
              "Podaci nisu primljeni. Pritisni updejtuj dugme da pokušaš ponovo.";
            this.checking = "Proveravam šta da radim";
            this.analysingvillages = "Analiziranje svih tvojih sela.";
            this.sendingresurces = "Slanje resursa";
            this.trainingtroops = "Obučavanje jedinica";
            this.building = "Izgradnja";
            this.sendingtroops = "Slanje trupa u ";
            this.stopped = "Zaustavljeno";
            this.buildingsucessful = "Izgradnja uspešna";
            this.buildingatwantedlevel =
              "Izgradnja nije uspela. Građevina je već na željenom nivou";
            this.unabletobuild =
              "Izgradnja nije uspela. U nemogućnosti da se izgradi.";
            this.sendingressucessful = "Slanje sirovina uspešno";
            this.notenoughtres = "Nema dovoljno sirovina.";
            this.unabletosendres =
              "Nije moguće poslati sirovine na ovo odredište.";
            this.trainingsuccesful = "Obučavanje jedinica uspešno";
            this.sendingtroopssuccesul = "Slanje jedinica uspešno.";
            this.deletedfarm = "Farma obrisana/blokirana";
            this.farminunsuccesful = "Farmanje neuspelo";
            this.gettingdata = "Dobijanje podataka";
            this.deletingdata = "Brisanje podataka";
            this.deleted = "Obrisano";
            this.nodata = "Greška: verovatno nema podataka na serveru";
            this.upgradeallfields = "Nadogradi sva polja";
            this.veryhigh = "Veoma visoko";
            this.high = "Visoko";
            this.normal = "Normalno";
            this.low = "Nisko";
            this.verylow = "Veoma nisko";
            this.level = "Nivo";
            this.addtask = "Dodaj zadatak";
            this.fillres = "Popunite sirovine da podesite %:";
            this.emptyres = "Ispraznite sirovine da podesite % :";
            this.onetimesending = "Slanje jedanputa";
            this.bypercent = "Pošalji %";
            this.custom = "po narudžbini";
            this.minsres = "Min sirovina:";
            this.trainonce = "Obuči jednom";
            this.trainlater = "Obuči kasnije";
            this.addtofarmlist = "Dodaj na listu farmi";
            this.helpupgradeallfields =
              "Postavite zadatak da nadogradite sva vaša polja. ako je podešeno na nivo 10, sva polja će bitinadograđena na nivo 1, onda sva do nivoa 2,... dok sva polja nisu na željenom nivou.";
            this.helptrain = "Obuči jedinice kasnije. " + "\n";
            this.helptrain +=
              "Obuči jednom: jedinice će biti obučene i zadatak će biti izbrisan" +
              "\n";
            this.helptrain +=
              "Ponavljaj svake minute: kada skripta obuči jedinicu, ona će čekati određeno vreme, a zatim će pokušati da obuči jedinice ponovo. Ako nemaš dovoljno sirovina, skripta će čekati da dobiješ dovoljno sirovina, obučiti jedinice kada ima dovoljno resursa i ponovo čekati određeno vreme pre nego pokuša ponovo. Zadatak neće biti obrisan sa liste.";
            this.helpsendres = "Trgovac" + "\n";
            this.helpsendres +=
              "Slanje jedanput: unesite količinu sirovina u kvadratiće i podesite koordinate, klikni dodaj zadatak i bot će ih poslati kasnije" +
              "\n";
            this.helpsendres +=
              "Poslati po povratku: unesite sirovine u kvadratiće i postavite koordinate , kliknite na dugme dodaj zadatak i bot će ih poslati u drugo selo čim se trgovci vrate sa puta" +
              "\n";
            this.helpsendres +=
              "Pošalji svakih minuta: unesite sirovine u kvadratiće i postavite koordinate, unesite X broj, kliknite na dugme dodaj zadatak i bot će pokušati da ih pošalje u drugo selo svakih X minuta" +
              "\n";
            this.helpsendres += "Pošalji po % : " + "\n";
            this.helpsendres +=
              "Min sirovina: minimalna količina koju bot može da pošalje (tako neće slati po 1 sirovinu)" +
              "\n";
            this.helpsendres +=
              "Isprazniti sirovine do % : ovo selo će slati onoliko sirovina u zadano selo dok ne preostane po % sirovina kliko je zadato:" +
              "\n";
            this.helpsendres +=
              "Ako je sve podešeno na 10% a imaš skladište na 80 000, selo će pokušati da pošalje sve sirovine osim 8000 od svake će ostati u selu." +
              "\n";
            this.helpsendres +=
              "Napuni sirovine do %: selo kome šalješ sirovine će popuniti skladište u selu kome šalješ do zadate vrednosti:" +
              "\n";
            this.helpsendres +=
              "Ako je sve podešeno na 90% a skladište može da primi 80 000 sirovina, ono će slati sirovine u to selo dok ne dostigne 72 000." +
              "\n";
            this.helpsendres +=
              "Dakle u ovom selu nikad ne bi trebalo da ima manje od % sirovina (osim ako ih potrošite drugačije) a selo kome šaljete sirovine ne bi trebalo da ima više od % (osim ako ih proizvede ili ih dobije od drugog sela kasnije)." +
              "\n";
            this.helptasklist =
              "Task added in travian window will show up here." + "\n";
            this.helptasklist += "Svako selo ima sopstvenu listu gradnje";
            this.helpfarmlist =
              "Farme dodane u travian prozoru će se pojaviti tamo. Dupli klik na broj koji želite da promenite i pojaviće se prozor u kome možete da unesete novu vrednost." +
              "\n";
            this.helpfarmlist +=
              "Čekiranjem u kvadratiću odlučujete dali je farma aktivna ili ne" +
              "\n";
            this.helpfarmlist +=
              "Dugmeta upaljeno i ugašeno odlučuju dali je cela lista farmi za to selo upaljena ili ne" +
              "\n";
            break;
          case "ir": //multiple servers
            this.getdata = "دریافت اطلاعات";
            this.start = "شروع";
            this.stop = "توقف";
            this.savetoserver = "ذخیره در سرور";
            this.deletedata = "پاک کردن اطلاعات";
            this.sendsms = "ارسال پیامک";
            this.cropfinder = "جستجوی فارم/کراپ";
            this.succesful = "موفقیت";
            this.tasklist = "وظایف";
            this.farmlist = "لیست فارم";
            this.trade = "نژاد";
            this.train = "آموزش";
            this.fill = "پر";
            this.empty = "خالی";
            this.priority = "اولویت";
            this.to = "به";
            this.on = "روشن";
            this.name = "نام";
            this.type = "نوع";
            this.del = "پاک کردن";
            this.turnon = "روشن کردن";
            this.turnoff = "خاموش کردن";
            this.repetevery = "تکرار هر";
            this.minutes = "دقیقه";
            this.sendonreturn = "ارسال مجدد پس از برگشت";
            this.login = "وارد تراوین شوید و سپس رو دریافت اطلاعات کلیک کنید";
            this.edit = "برای ویرایش 2 بار کلیک کنید";
            this.newval = "وارد کردن مقدار جدید";
            this.inputnum = "شما باید یک شماره وارد کنید";
            this.attopt =
              "وارد کردن مقدار جدید" +
              "\n" +
              "2=پشتیبانی" +
              "\n" +
              "3=حمله" +
              "\n" +
              "4=غارت";
            this.attoptallowed = "فقط میتوانید مقدار 2، 3، 4 را وارد کنید";
            this.allfields = "همه ی خونه ها";
            this.buldings = [
              "ساید ساختمان",
              "چوب بری",
              "اجر سازی",
              "معدن اهن",
              "گندم زار",
              "چوب بری",
              "اجر پزی",
              "ذوب اهن",
              "اسیاب",
              "نانوایی",
              "انبار",
              "انبار غذا",
              "اهنگری",
              "زره سازی",
              "میدان تمرین",
              "ساختمان اصلی",
              "اردوگاه",
              "بازار",
              "سفارت",
              "سربازخانه",
              "اصطبل",
              "کارگاه",
              "دارالفنون",
              "مخفیگاه",
              "تالار شهر",
              "اقامتگاه",
              "قصر",
              "خزانه",
              "دفتر تجارت",
              "سربازخانه بزرگ",
              "اصطبل",
              "دیوار شهر",
              "دیوار گلی",
              "پرچین",
              "سنگ تراشی",
              "قهوه خانه",
              "تله ساز",
              "عمارت قهرمان",
              "انبار بزرگ",
              "انبار غذای بزرگ",
              "شگفتی جهان",
              "ابشخوری اسب"
            ];
            this.datarecieved =
              "اطلاعات دریافت شد. لطفا شروع رو برای اجرا اسکریپت بزنید";
            this.datanotrecieved =
              "اطلاعات دریافت نشد. لطفا بروزرسانی را برای تلاش مجدد بزنید";
            this.checking = "در حال چک کردن وظیفه ای که باید انجام شود";
            this.analysingvillages = "انالیز کردن همه دهکده ها.";
            this.sendingresurces = "ارسال منابع";
            this.trainingtroops = "تربیت نیرو";
            this.building = "ساختن";
            this.sendingtroops = "ارسال نیروها به ";
            this.stopped = "توقف شده";
            this.buildingsucessful = "ساخت با موفقیت";
            this.buildingatwantedlevel =
              "ساخت ناموفق. ساختمان هم اکنون در سطح مورد نظر هست";
            this.unabletobuild = "ساخت ناموفق. ناتوان در ساختن";
            this.sendingressucessful = "ارسال منابع موفقیت امیز بود.";
            this.notenoughtres = "منابع کافی نیست.";
            this.unabletosendres = "قادر ارسال منابع به این سمت نیستید";
            this.trainingsuccesful = "تربیت نیرو موفقیت امیز بود";
            this.sendingtroopssuccesul = "ارسال نیرو موفقیت امیز بود";
            this.deletedfarm = "فارم پاک شد/بلاک شد";
            this.farminunsuccesful = "فارم سازی ناموفق";
            this.gettingdata = "دریافت اطلاعات";
            this.deletingdata = "پاک کردن اطلاعات";
            this.deleted = "پاک شد";
            this.nodata = "ارور: احتمالا اطلاعاتی در سرور نیست";
            this.upgradeallfields = "بروزرسانی همه ی خانه ها";
            this.veryhigh = "بسیار بالا";
            this.high = "بالا";
            this.normal = "معمولی";
            this.low = "پایین";
            this.verylow = "خیلی پایین";
            this.level = "مرحله";
            this.addtask = "ایجاد وظیفه";
            this.fillres = "پر کدن منابع تا رسیدن به %:";
            this.emptyres = "خالی کردن منابع تا رسیدن به % :";
            this.onetimesending = "یکبار ارسال میشود";
            this.bypercent = "ارسال با %";
            this.custom = "سفارشی";
            this.minsres = "حداقل منابع:";
            this.trainonce = "یکبار تربیت کردن";
            this.trainlater = "بعدا تربیت کردن";
            this.addtofarmlist = "اضافه کردن به فارم لیست";
            this.helpupgradeallfields =
              "انجام کار برای بالابردن همه خانه ها. اگر درخواست بالا بردن به سطح 10 باشد، همه منابع بالا می ایند تا سطح 1، سپس سطح 2،... تا زمانی که همه خانه ها برسند به سطح درخواستی.";
            this.helptrain = "نیرو ها را بعدا تربیت کن. " + "\n";
            this.helptrain +=
              "یکبار تربیت: نیرو ها تربیت می شوند و وظیفه ها پاک می شوند" +
              "\n";
            this.helptrain +=
              "انجام مجدد در دقیقه: بعد از اینکه اسکریپت اموزش داد نیروها را، اون صبر میکند برای زمانبندی و سپس سعی میکند به تربیت نیرو ها دوباره. اگر شما ندارید منابع کافی، اسکریپت صبر میکند تا منابع کافی را بدست بیاورد، اموزش نیروها هنگامی میشود که منابع کافی شوند و دوباره صبر میکنید برای زمانبندی قبل از اموزی دوباره. وظیفه پاک نمیشود از لیست.";
            this.helpsendres = "تاجر" + "\n";
            this.helpsendres +=
              "یکبار ارسال: وارد میکند را در جعبه ها منابع و مخصات اطلاعات مربوطه را، کلیک کنید بر اضافه کردن کار و بات ارسال میکند ان ها را دیرتر" +
              "\n";
            this.helpsendres +=
              "ارسال در برگشت: وارد میکند را در جعبه ها منابع و مخصات اطلاعات مربوطه را، کلیک کنید بر اضافه کردن کار و بات ارسال میکند ان ها به دهکده های دیگر به محض اینکه تاجرها برگردند از تجارت" +
              "\n";
            this.helpsendres +=
              "ارسال پی در پی در دقیقه: وارد میکند را در جعبه ها منابع و مخصات اطلاعات مربوطه را، وارد میکند مقدار ایکس را، کلیک کنید بر اضافه کردن کار و بات سعی میکند به ارسال انها به دهکده های دیگر هر ایکس دقیقه" +
              "\n";
            this.helpsendres += "ارسال تا % : " + "\n";
            this.helpsendres +=
              "حداقل منابع: حداقل میزان منابع که اسکریپت می تواند ارسال کند (همچنین ارسال نمیکند 1 منبع)" +
              "\n";
            this.helpsendres +=
              "خالی کردن منابع تا % : این دهکده باید ارسال شود بیشتر منابعش تا زمانی که منابع در دهکده بماند به مقدار % از منابع که ست شده" +
              "\n";
            this.helpsendres +=
              "اگر همه منابع برسند به 10 درصد و انبار شما 80000 باشد دهکه تلاش بر ارسال منابع همه منابع میکیند اما 8000 تا از هر کدام می ماند در دهکده" +
              "\n";
            this.helpsendres +=
              "پر کردن منابع تا رسیدن به %: منابع دهکده ارسال میشود تا پر شدن انبار دهکده شما ارسال میکنید به این مقدار" +
              "\n";
            this.helpsendres +=
              "اگر همه مانع باشند رو 90 درصد و انبار شمال 80000 منابع باشد ارسال میشود منابع به این دهکه تا زمانی که برسد به 72000." +
              "\n";
            this.helpsendres +=
              "بنابراین ارسال نمیشود از این دهکده منابع کمتر از % تعیین شده (اگرچه شما خرجش کنید در راه دیگر) و دهکده ای که شما دارید بش منابع میدید تا نداشته باشد منابع بیشتر از % (اگرچه انرا تولید کند یا از دهکده های دیگر بگیرد)." +
              "\n";
            this.helptasklist =
              "وظیفه های اضافه شده در تراوین اینجا نمایش داده میشود" + "\n";
            this.helptasklist +=
              "همه دهکده ها در زیر ساخت لیست ساختمان هایشان هستند";
            this.helpfarmlist =
              "فارم های اضافه شده در صفحه تراوین اینجا نشان داده میشوند. 2بار کلیک کنید رو عددی که میخواهید عوض کنید و صفحه نشان میدهد به شما جایی که عدد جدید را وارد کنید" +
              "\n";
            this.helpfarmlist +=
              "دکمه وظیفه روشن خاموش کردن فار لیست را دارد" + "\n";
            this.helpfarmlist +=
              "دکمه روشن خاموش واسه روشن کردن فارم لیست این دهکده هست" + "\n";
            break;
          case "fr": //multiple servers
            this.getdata = "Obtenir les données";
            this.start = "Démarrer";
            this.stop = "Arrêter";
            this.savetoserver = "Sauvegarder";
            this.deletedata = "Supprimer les données";
            this.sendsms = "Envoyer un SMS";
            this.cropfinder = "Rechercher des frigos/oasis/15c";
            this.succesful = "Effectué";
            this.tasklist = "Liste des tâches";
            this.farmlist = "Liste de pillage";
            this.trade = "Envoyer des ressources";
            this.train = "Former";
            this.fill = "Remplir";
            this.empty = "Vide";
            this.priority = "Priorité";
            this.to = "À";
            this.on = "ON";
            this.name = "Nom";
            this.type = "type";
            this.del = "Effacer";
            this.turnon = "Activer";
            this.turnoff = "Désactiver";
            this.repetevery = "Répéter chaque x";
            this.minutes = "minutes";
            this.sendonreturn = "renvoyer dès le retour";
            this.login =
              "Connectez vous à Travian et cliquez sur Obtenir les données";
            this.edit = "Double clic pour éditer";
            this.newval = "Entrez une nouvelle valeur";
            this.inputnum = "Vous devez inscrire un nombre";
            this.attopt =
              "Entrez une nouvelle valeur :" +
              "\n" +
              "2=Assistance" +
              "\n" +
              "3=Attaque" +
              "\n" +
              "4=Pillage";
            this.attoptallowed =
              "Seulement les valeurs 2, 3 et 4 sont autorisées.";
            this.allfields = "Tous les champs";
            this.buldings = [
              "Site de construction",
              "Bûcheron",
              "Carrière d'argile",
              "Mine de fer",
              "Ferme de céréales",
              "Scierie",
              "Usine de poterie",
              "Fonderie",
              "Moulin",
              "Boulangerie",
              "Dépôt de ressources",
              "Silo de céréales",
              "Forge",
              "Armurerie",
              "Place du tournoi",
              "Bâtiment principal",
              "Place de rassemblement",
              "Place du marché",
              "Ambassade",
              "Caserne",
              "Écurie",
              "Atelier",
              "Académie",
              "Cachette",
              "Hôtel de ville",
              "Résidence",
              "Palais",
              "Chambre au trésor",
              "Comptoir de commerce",
              "Grande caserne",
              "Grande écurie",
              "Mur d'enceinte",
              "Mur de terre",
              "Palissade",
              "Tailleur de pierre",
              "Brasserie",
              "Fabricant de pièges",
              "Manoir du Héros",
              "Grand Dépôt",
              "Grand silo",
              "Merveille",
              "Abreuvoir"
            ];
            this.datarecieved =
              "Données reçues. Cliquez sur Démarrer pour lancer le script.";
            this.datanotrecieved =
              "Données non reçues. Rechargez la page et essayez de nouveau.";
            this.checking = "Vérification de la liste des tâches.";
            this.analysingvillages = "Analyse de tous les villages.";
            this.sendingresurces = "Envoi de ressources";
            this.trainingtroops = "Formation des troupes";
            this.building = "Construction";
            this.sendingtroops = "Envoi de troupes à";
            this.stopped = "Arrêté";
            this.buildingsucessful = "Construction effectuée";
            this.buildingatwantedlevel =
              "Échec de la construction. Le bâtiment est déjà au niveau indiqué";
            this.unabletobuild =
              "Échec de la construction. Construction impossible.";
            this.sendingressucessful = "Envoi de ressources effectué";
            this.notenoughtres = "Pas assez de ressources.";
            this.unabletosendres =
              "Envoi de ressources impossible vers ce village.";
            this.trainingsuccesful = "Formation des troupes effectuée.";
            this.sendingtroopssuccesul = "Envoi de troupes effectué.";
            this.deletedfarm = "Village bloqué ou effacé";
            this.farminunsuccesful = "Échec du pillage";
            this.gettingdata = "Lecture des données";
            this.deletingdata = "Suppression des données";
            this.deleted = "Supprimé";
            this.nodata =
              "Erreur, apparemment il n'y a aucune donnée sur le serveur";
            this.upgradeallfields = "Augmenter tous les champs";
            this.veryhigh = "Très haute";
            this.high = "Haute";
            this.normal = "Normale";
            this.low = "Basse";
            this.verylow = "Très basse";
            this.level = "Niveau";
            this.addtask = "Ajouter la tâche";
            this.fillres = "Remplir les ressources jusqu'à % :";
            this.emptyres = "Vider les ressources jusqu'à % :";
            this.onetimesending = "Envoyer une seule fois";
            this.bypercent = "Envoyer par %";
            this.custom = "Autre";
            this.minsres = "Ress. mini :";
            this.trainonce = "Former une fois";
            this.trainlater = "Former chaque ";
            this.addtofarmlist = "Ajouter à la liste de pillage";
            this.helpupgradeallfields =
              "Définir le niveau des champs. Si vous indiquez 10, tous les champs seront augmentés ensemble jusqu'à 10.";
            this.helptrain = "Former les troupes plus tard" + "\n";
            this.helptrain +=
              "Former une seule fois : la tâche sera ensuite supprimée" + "\n";
            this.helptrain +=
              "Répéter chaque x minutes : Le script répétera la formation des troupes selon le délai indiqué en minutes. S'il n'y a pas assez de ressources, le script attendra que les ressources soient suffisantes, formera les troupes demandées puis attendra à nouveau le délai avant de recommencer. La tâche ne sera pas supprimée automatiquement de la liste.";
            this.helpsendres = "Marchand" + "\n";
            this.helpsendres +=
              "Envoyer une seule fois : définir le nombre de ressources à envoyer et définir les coordonnées, ajouter la tâche et le script effectuera l'envoi dès que les ressources seront disponibles" +
              "\n";
            this.helpsendres +=
              "Renvoyer dès le retour : définir le nombre de ressources à envoyer et définir les coordonnées, ajouter la tâche et le script répètera le même envoi dès le retour des marchands." +
              "\n";
            this.helpsendres +=
              "Envoyer chaque x minutes : définir le nombre de ressources à envoyer et définir les coordonnées, indiquer un délai en minutes, ajouter la tâche et le script répètera indéfiniment le même envoi selon l'intervalle indiqué." +
              "\n";
            this.helpsendres += "Envoyer par % : " + "\n";
            this.helpsendres +=
              "Ress. mini : Nombre de ressources minimum que peut envoyer le script (pour éviter qu'il n'envoie que 1 ressource)" +
              "\n";
            this.helpsendres +=
              "Vider les ressources jusqu'à % : Le script enverra autant de ressources nécessaires pour ne garder que la proportion indiquée :" +
              "\n";
            this.helpsendres +=
              "Si vous indiquez tout à 10% et que votre dépôt de ressources contient 80 000, le script enverra toutes les ressources mais gardera 8 000 (10%) dans le village expéditeur." +
              "\n";
            this.helpsendres +=
              "Remplir les ressources jusqu'à % : Le script enverra autant de ressources nécessaires pour remplir les dépôts du destinataire selon la proportion indiquée" +
              "\n";
            this.helpsendres +=
              "Si vous indiquez tout à 90 % et que le dépôt de ressource chez qui vous envoyez peut contenir 80 000, le script enverra des ressources jusqu'à atteindre 72 000 (90%) dans le village destinataire." +
              "\n";
            this.helpsendres +=
              "Donc l'expéditeur n'aura jamais moins de ressources qu'indiqué (sauf si vous les dépensez par ailleurs) et le destinataire n'aura jamais plus de ressources qu'indiqué (sauf s'il les produit ou les reçoit d'autres villages)." +
              "\n";
            this.helptasklist =
              "Les tâches ajoutées seront affichées ici." + "\n";
            this.helptasklist +=
              "Chaque village à sa propre liste de construction";
            this.helpfarmlist =
              "Les frigos ajoutés seront affichés ici. double cliquez sur un nombre que vous voulez modifier et une fenêtre vous permettra d'indiquer un nouveau nombre." +
              "\n";
            this.helpfarmlist +=
              "Les cases à cocher définissent si un frigo est activé ou désactivé" +
              "\n";
            this.helpfarmlist +=
              "Les boutons Activer et Désactiver définissent si toute la liste de pillage de ce village est active ou non" +
              "\n";
            break;
          case "lt": //server
            this.getdata = "Gauti informacija";
            this.start = "Pradeti";
            this.stop = "Sustabdyti";
            this.savetoserver = "Issaugoti serveri";
            this.deletedata = "Istrinti informacija";
            this.sendsms = "Siusti SMS";
            this.cropfinder = "Fermu/cropu finderis";
            this.succesful = "Sekmingas";
            this.tasklist = "Uzduociu Sarasas";
            this.farmlist = "Fermu Sarasas";
            this.trade = "Prekyba";
            this.train = "Treniruoti";
            this.fill = "Uzpildyti";
            this.empty = "Tuscia";
            this.priority = "Prioritetas";
            this.to = "i";
            this.on = "Ijungti";
            this.name = "Pavadinimas";
            this.type = "tipas";
            this.del = "Istrinti";
            this.turnon = "Ijungti";
            this.turnoff = "Isjungti";
            this.repetevery = "Kartoti kiekviena";
            this.minutes = "minute";
            this.sendonreturn = "Siusti kai gryzta";
            this.login =
              "Prisijunkite prie traviano ir spauskite Gauti Informacija";
            this.edit = "Dvigubas paspaudimas redagavimui";
            this.newval = "Irasykite nauja reiksme";
            this.inputnum = "Jums reikia irasyti skaiciu";
            this.attopt =
              "Irasykite nauja reiksme:" +
              "\n" +
              "2=Pastiprinimas" +
              "\n" +
              "3=Ataka" +
              "\n" +
              "4=Reidas";
            this.attoptallowed = "Tik sios reiksmes 2, 3 ir 4 yra leidziami.";
            this.allfields = "Visus laukus";
            this.buldings = [
              "Statybvietes",
              "Medziu kirtaviete",
              "Molio karjeras",
              "Gelezies kasykla",
              "Grudu ferma",
              "Lentpjuve",
              "Plytine",
              "Liejykla",
              "Malunas",
              "Duonine",
              "Sandelis",
              "Kletis",
              "Kalve",
              "Kalve",
              "Arena",
              "Pagrindins pastatas",
              "Susiburimo vieta",
              "Turgaviete",
              "Ambasada",
              "Kareivines",
              "Arklides",
              "Dirbtuves",
              "Akademija",
              "Sleptuve",
              "Rotuse",
              "Residencija",
              "Valdovu Rumai",
              "Izdine",
              "Prekybos Rumai",
              "Didziosios Kareivines",
              "Didziosios arklides",
              "Murine Siena",
              "Statine Tvora",
              "Gynybinis Pylimas",
              "Murine",
              "Alaus Darykla",
              "Spastine",
              "Karzygio Namai",
              "Didysis Sandelis",
              "Didysis Svirnas",
              "Pasaulio Stebuklas",
              "Arkliu Girdykla"
            ];
            this.datarecieved =
              "Data recieved. Spausk pradeti, kad ijungtum bota.";
            this.datanotrecieved =
              "Informacijos negavome. Spauskite atnaujinti mygtuka, ir meginkite dar karta.";
            this.checking = "Tikrinama ka daryti...";
            this.analysingvillages = "Analysuojami visi jusu kaimai.";
            this.sendingresurces = "Siunciami resursai";
            this.trainingtroops = "Treniruojami kariai";
            this.building = "Statoma.";
            this.sendingtroops = "Siunciami kariai i";
            this.stopped = "Stopped";
            this.buildingsucessful = "Pastatyti pavyko.";
            this.buildingatwantedlevel =
              "Pastatyti nepavyko. Pastatas jau yra pastatytas.";
            this.unabletobuild = "Pastatyti nepavyko..";
            this.sendingressucessful = "Resursai sekmingai issiusti";
            this.notenoughtres = "Neuztenka resursu.";
            this.unabletosendres =
              "Neimanoma issiusti resursu, siom kordinatem.";
            this.trainingsuccesful = "Kariai sekmingai paruosti.";
            this.sendingtroopssuccesul = "Kariai sekmingai issiusti.";
            this.deletedfarm = "Ferma istrinta/uzblokuota.";
            this.farminunsuccesful = "Ferminimas nepavyko.";
            this.gettingdata = "Gaunama informacija";
            this.deletingdata = "Istrinti informacija";
            this.deleted = "Istrinta";
            this.nodata =
              "Klaida: Greiciausiai nera informacijos apie serveri.";
            this.upgradeallfields = "Pakelti visus laukus.";
            this.veryhigh = "Labai didelis";
            this.high = "Didelis";
            this.normal = "Vidutinis";
            this.low = "Mazas";
            this.verylow = "Labai mazas";
            this.level = "Lygis";
            this.addtask = "Prideti uzduoti";
            this.fillres = "Uzpildyti resursais iki %:";
            this.emptyres = "Istustinti resursus iki % :";
            this.onetimesending = "Viena karta siusti";
            this.bypercent = "Siusti nuo %";
            this.custom = "Iprastai";
            this.minsres = "Min res:";
            this.trainonce = "Treniruoti karta";
            this.trainlater = "Treniruoti veliau";
            this.addtofarmlist = "Prideti i fermu sarasa";
            this.helpupgradeallfields =
              "Nustatyti uzduoti, pakelti visus laukus. Jei nustatete iki 10lygio, visi laukai bus keliami iki 1lygio, paskui iki 2 ir taip toliau...";
            this.helptrain = "Treniruoti karius veliau. " + "\n";
            this.helptrain +=
              "Treniruoti karta: Kariai bus treniruojami karta. Kai uzduotis bus ivykdyta, ji pradings is uzduociu saraso." +
              "\n";
            this.helptrain +=
              "Kartoti kiekviena minute: Karius treniruos kas tam tikra laika, kuri jus irasete.";
            this.helpsendres = "Prekiautojas" + "\n";
            this.helpsendres +=
              "Viena karta siusti: irasykite kiek resursu i kokias koordinates norite kad issiustu. Botas viena karta issius tiek resursu, kiek jus norite i tam tikra kaima." +
              "\n";
            this.helpsendres +=
              "Siusti kai gryzta: Irasykite resursu kieki ir koordinates, ir botas sius resursus i tam tikra kaima, kuri irasete. Kai grys prekeivis, jis vel tapati kartos." +
              "\n";
            this.helpsendres +=
              "Siusti kiekviena minute: Irasykite resursu kieki, koordinates, ir kas kiek laiko, siusti resursus. Botas sius resursus i jusu nurodyta kaima, po tiek resursu, kiek jus irasete." +
              "\n";
            this.helpsendres += "Siusti nuo % : " + "\n";
            this.helpsendres +=
              "Min res: Minimaliai kiek siusti resursu." + "\n";
            this.helpsendres +=
              "Istustinti iki % : Siame kaime bus istustinta tiek sandelio %, kiek jus irasete." +
              "\n";
            this.helpsendres +=
              "Jeigu telpa 80000, 10% reiskia 800 0resursu paliks jusu kaime)" +
              "\n";
            this.helpsendres +=
              "Uzpildyti iki %: Siunciamam kaimui bus siunciama iki tiek % sandelio talpos, kiek irasete." +
              "\n";
            this.helpsendres +=
              "Jeigu nustatyta iki 90%, o jusu sandelis yra 80 000 talpos, tada jums resursu atsius iki 72 000" +
              "\n";
            this.helpsendres +=
              "Taigi, jusu kaimai, niekada nebus perpildyti resursais." + "\n";
            this.helptasklist =
              "Uzduotis prideda, ji pasirodys travian lange." + "\n";
            this.helptasklist += "Kiekvienas kaimas turi savo uzduociu sarasa.";
            this.helpfarmlist =
              "Fermos pridetos, jas pamatysite travian lange. Jeigu norite koreguoti kariu skaiciu, spauskite ant kariu 2kartus, ir irasykite norima skaiciu." +
              "\n";
            this.helpfarmlist +=
              "Botas nuspres, ar fermas isjungti (Isjungia to atveju, jei jus prarandate kariu)" +
              "\n";
            this.helpfarmlist +=
              "Mygtukai ijungti ir isjungti reiskia ar fermu sarase ijungti ar isjungti sios fermos ferminima." +
              "\n";
            break;
        }
      }
    }
    exports.translations = new Translate();