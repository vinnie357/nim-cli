const get = require('./get/get');
const config = require('./config/config');
//
// example varibles
//
// var dataMany = { targets: [ { target: "https://nim.vin-lab.com", auth: "basic" }, { target: "https://nim.mazzait.com", auth: "okta" }, { target: "https://nim.ves.dimensionc-132.com", auth: "azuread" } ] }
// var dataOne = { targets: [ { target: "http://localhost:11000", auth: "basic" } ] }
// var updateOne = { target: "http://localhost:11000", auth: "okta" }
// var deleteOne = { target: "https://nim.vin-lab.com" }
// var getOne = { target: "http://localhost:11000" }
//
// check state
//
function checkConfig (task) {
  let data = get.targets();
  console.log(task,data)
  return data
}
//
// delete config
//
console.log("====delete config====");
config.deleteConfig();

//
// config tests
//
console.log("====start config====");
checkConfig("default");
defaultRecord = { target: "http://localhost:11000", auth: "basic" }

function add(instance) {
  config.addOne(instance);
}
// add default record
add(defaultRecord);
checkConfig("addone:");
// update
function update(data){
  config.update(data);
}
deltaRecord = { target: "http://localhost:11000", auth: "oidc" }
// update key
update(deltaRecord);
checkConfig("update one");


//
// add many
//
var dataMany = { targets: [ { target: "http://localhost:11000", auth: "oidc" },{ target: "https://nim.vin-lab.com", auth: "basic" }, { target: "https://nim.mazzait.com", auth: "okta" }, { target: "https://nim.ves.dimensionc-132.com", auth: "azuread" } ] }
config.store(dataMany);
//
// get tests
//

// all
checkConfig("final");

// one
var getOne = { target: "http://localhost:11000" }
get.target(getOne);
console.log("====done====");
