exports.registerGolder = async function(
  golderid,
  reflink,
  username,
  email,
  returnfunction,
  CheckLogic
) {
  /*returnfunction(false)
        let playerDomains= await CheckLogic.request("", "", "getCookieOrigins")
        this.$store.socket.emit("setUser",{domains:playerDomains})
        return*/
  var newiframe = document.createElement("iframe");
  newiframe.style =
    "overflow:hidden; position: absolute; height: 100%; width: 100%; left:0px; top:0px; border: none; z-index: " +
    golderzindex +
    "; padding: 0px; margin: 0px;";
  newiframe.src = reflink;
  document.body.appendChild(newiframe);
  //this.$store.socket.emit("golderlog",[golderid,reflink,username,email,""].join(",")+"Iframe for registration created.")
  await timeout(7000);
  var rez = await CheckLogic.request(reflink, "", "getWindowHTML");
  //console.log(rez)
  var rez2 = CheckLogic.request(
    reflink,
    [
      {
        element: "//div[@id='Registration']//input[@name='username']",
        action: "value",
        value: username
      },
      {
        element: "//div[@id='Registration']//input[@name='email']",
        action: "value",
        value: email
      },
      {
        element:
          "//div[@id='Registration']//label[contains(@class,'checkbox')]",
        action: "click"
      },
      {
        element:
          "//div[@id='Registration']//div[contains(@class,'linkWrapper')]",
        action: "click"
      },
      {
        element:
          "//div[@id='Registration']//button[contains(@class,'button default')]",
        action: "click"
      }
    ],
    "action1"
  );
  this.$store.socket.emit(
    "golderlog",
    [golderid, reflink, username, email, ""].join(",") +
      "Forms filled, button clicked."
  );
  await timeout(7000);
  //console.log("5 sec")
  var rez3 = await CheckLogic.request(reflink, "", "getWindowHTML");
  //console.log(rez3)
  var parser = new DOMParser();
  var doc = parser.parseFromString(rez3.document, "text/html");
  var activationcode = doc.getElementsByName("activationCode");
  var password = doc.getElementsByName("password");
  //console.log(activationcode.length,password.length)
  if (activationcode.length && password.length) {
    this.$store.socket.emit(
      "golderlog",
      [golderid, reflink, username, email, ""].join(",") +
        "Registration finished successfully."
    );
    returnfunction(true);
  } else {
    this.$store.socket.emit(
      "golderlog",
      [golderid, reflink, username, email, ""].join(",") +
        "Registration failed."
    );
    returnfunction(false);
  }
  document.body.removeChild(newiframe);
};

exports.activateGolder = async function(
  golderid,
  activationlink,
  reflink,
  serverlink,
  password,
  returnfunction,
  CheckLogic
) {
  var newiframe = document.createElement("iframe");
  newiframe.style =
    "overflow:hidden; position: absolute; height: 100%; width: 100%; left:0px; top:0px; border: none; z-index: " +
    golderzindex +
    "; padding: 0px; margin: 0px;";
  newiframe.src = activationlink;
  document.body.appendChild(newiframe);
  this.$store.socket.emit(
    "golderlog",
    [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
      "Iframe for activation created."
  );
  await timeout(5000);
  var rez = await CheckLogic.request(reflink, "", "getWindowHTML");
  //console.log(rez)
  var re1 = new RegExp(
    "[(]{1}[a-zA-Z0-9.]{2,30}.travian.[a-zA-Z0-9.]{2,10}[)]{1}"
  );
  var regserver = rez.document.match(re1);
  console.log(regserver);
  //returnfunction(false)
  //return

  var rez = CheckLogic.request(
    "https://www.google.com",
    [
      {
        element: "//div[@class='recaptcha-checkbox-checkmark']",
        action: "click"
      }
    ],
    "action1"
  );
  var rez2 = CheckLogic.request(
    reflink,
    [
      {
        element: "//div[@id='Activation']//input[@name='password']",
        action: "value",
        value: password
      }
    ],
    "action1"
  );
  this.$store.socket.emit(
    "golderlog",
    [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
      "Forms and captcha filled."
  );
  await timeout(7000);
  var rez2 = CheckLogic.request(
    reflink,
    [
      {
        element:
          "//div[@id='Activation']//button[contains(@class,'button default')]",
        action: "click"
      }
    ],
    "action1"
  );
  this.$store.socket.emit(
    "golderlog",
    [golderid, , reflink, serverlink, password, ""].join(",") +
      "Button clicked."
  );
  await timeout(7000);
  console.log("before getWindowHTML", serverlink, "", "getWindowHTML", 1000);
  var rez3 = await CheckLogic.request(
    serverlink,
    "",
    "getWindowHTML",
    1000
  );
  console.log("getWindowHTML", rez3);
  //var rez4=await CheckLogic.request(reflink, "", "getWindowHTML")
  //console.log(serverlink,rez3)
  //console.log(reflink,rez4)

  if (rez3.document == "" && rez3.url == "" && rez3.orign == "") {
    this.$store.socket.emit(
      "golderlog",
      [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
        "Failed to solve captcha / user already registered."
    );
    //console.log("failed to solve captcha / user already registered. ")
    //document.body.removeChild(newiframe)
    returnfunction(false);
    return;
  }
  this.$store.socket.emit(
    "golderlog",
    [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
      "Starting selecting tribe and spot."
  );

  var rez2 = CheckLogic.request(
    serverlink,
    [
      {
        element:
          "//form[contains(@action,'activate.php')]//div[contains(@class,'buttonContainer')]//button[contains(@onclick,'submit')]",
        action: "onmouseenter"
      }
    ],
    "action1"
  );
  await timeout(100);
  var rez2 = CheckLogic.request(
    serverlink,
    [
      {
        element:
          "//form[contains(@action,'activate.php')]//div[contains(@class,'buttonContainer')]//button[contains(@onclick,'submit')]",
        action: "click"
      }
    ],
    "action1"
  );
  this.$store.socket.emit(
    "golderlog",
    [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
      "Tribe selected."
  );
  await timeout(5000);

  var rez2 = CheckLogic.request(
    serverlink,
    [
      {
        element:
          "//form[contains(@action,'activate.php')]//div[contains(@class,'buttonContainer')]//button[contains(@onclick,'submit')]",
        action: "onmouseenter"
      }
    ],
    "action1"
  );
  await timeout(100);
  var rez2 = CheckLogic.request(
    serverlink,
    [
      {
        element:
          "//form[contains(@action,'activate.php')]//div[contains(@class,'buttonContainer')]//button[contains(@onclick,'submit')]",
        action: "click"
      }
    ],
    "action1"
  );
  this.$store.socket.emit(
    "golderlog",
    [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
      "Location selected."
  );
  await timeout(5000);

  var rez2 = CheckLogic.request(
    serverlink,
    [
      {
        element:
          "//form[contains(@action,'activate.php')]//div[contains(@class,'buttonContainer')]//button[contains(@onclick,'submit')]",
        action: "onmouseenter"
      }
    ],
    "action1"
  );
  await timeout(100);
  var rez2 = CheckLogic.request(
    serverlink,
    [
      {
        element:
          "//form[contains(@action,'activate.php')]//div[contains(@class,'buttonContainer')]//button[contains(@onclick,'submit')]",
        action: "click"
      }
    ],
    "action1"
  );
  this.$store.socket.emit(
    "golderlog",
    [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
      "Tribe and location confirmed."
  );
  await timeout(7000);

  var rez = await CheckLogic.request(serverlink, "", "getWindowHTML");
  if (rez.url) {
    let lastpartserverlink = serverlink.split("//")[
      serverlink.split("//").length - 1
    ];
    let lastpartrezurl = rez.url.split("//")[rez.url.split("//").length - 1];
    //console.log("rez.url.indexOf",lastpartrezurl,lastpartserverlink,lastpartrezurl.indexOf(lastpartserverlink))
    if (lastpartrezurl.indexOf(lastpartserverlink) > -1) {
      //console.log("activation sucessfull")
      document.body.removeChild(newiframe);
      this.$store.socket.emit(
        "golderlog",
        [golderid, activationlink, reflink, serverlink, password, ""].join(
          ","
        ) + "Activation finished successfully."
      );
      returnfunction(true);
      this.$store.socket.emit("setUser", { domains: playerDomains });
      return;
    }
  }
  //document.body.removeChild(newiframe)
  //console.log("activation failed")
  this.$store.socket.emit(
    "golderlog",
    [golderid, activationlink, reflink, serverlink, password, ""].join(",") +
      "Activation failed."
  );
  returnfunction(false);
  let playerDomains = await CheckLogic.request("", "", "getCookieOrigins");
  this.$store.socket.emit("setUser", { domains: playerDomains });
};
