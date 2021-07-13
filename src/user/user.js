const get = require('./get/get');
const config = require('./config/config');

// nim targets
class TargetNim {
  constructor(fqdn,auth){
    this.target = fqdn;
    this.auth = auth;
  }
}
// // default config
// config.defaultConfig();
// // make one
// config.store(dataOne);
// get all
// get.targets();
// get one
// get.target(getOne.target);

// // make many
// config.store(dataMany);
// // update one
// config.update(updateOne);
// // delete one
// config.deleteOne(deleteOne);
// delete all
// config.deleteConfig();
function store(item) {
  console.log("user store:", item);
  config.addOne(item);
}

function read(item) {
  console.log("user read:", item);
  get.target(item);
}
function listConfig(){
  // console.log("user list:");
  let data = get.targets();
  console.log(data)
  return data
}
function resetConfig() {
  console.log("user reset")
  config.deleteConfig();
}

module.exports = { store, read , resetConfig, listConfig}
