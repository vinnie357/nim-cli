const fs = require('fs');
const os = require('os');
const get = require('../get/get');

homeDir = os.homedir();
folder = '/.nim-cli/'
fileName='user.json';
filePath= homeDir + folder;

// nim targets
class TargetNim {
  constructor(fqdn,auth){
    this.target = fqdn;
    this.auth = auth;
  }
}

function defaultConfig (){
// make make folder/file if not present
if(!fs.existsSync(filePath)){
  fs.mkdirSync(filePath)
};
if(!fs.existsSync(filePath + fileName)){
  emptyConfig = {targets:[]}
  fs.writeFileSync(filePath + fileName, JSON.stringify(emptyConfig, null, 2));
};
}

function store (item){
// make folder/file if not present
defaultConfig();
// write new data
fs.writeFileSync(filePath + fileName, JSON.stringify(item, null, 2));
}

function addOne (instance) {
  // console.log("addone: ", instance);
  let data = get.targets();
  if (data.targets.length === 0) {
    // console.log("empty array");
    data.targets.push(instance);
    store(data);
  }
  data.targets.forEach(function(element, index, array) {
    // console.log(element,index,array)
    // console.log(element.target);
    if (element.target === undefined) {
        data.targets.push(instance);
        store(data);
    }
    if (element.target !== instance.target) {
      data.targets.push(instance);
      store(data);
    }
  });
  // console.log("adding:" + JSON.stringify(data));
}

function update (instance) {
  let data = get.targets();
  // console.log(JSON.stringify(data.targets));
  // console.log(JSON.stringify(instance.target));
  data.targets.forEach(function(element, index, array) {
    // console.log(element,index,array)
    // console.log(element.target);
    if (element.target === undefined) {
      console.log("no match");
      addOne(instance);
    }
    if (element.target === instance.target) {
        data.targets[index] = instance;
        console.log("match");
        store(data);
    }
    if (element.target !== instance.target) {
      console.log("new record", instance);
      addOne(instance);
    }
  });
  //console.log("updating:" + JSON.stringify(data));
}

function deleteOne (key) {

  return "done"
}

function deleteConfig () {
fs.unlink(filePath + fileName, (err) => {
  if (err) {
    console.error(err)
    return
  }
})
defaultConfig();
};


module.exports = { store, update, defaultConfig, addOne, deleteConfig, deleteOne };

{ targets: [ { target: "http://localhost:11000", auth: "basic" } ] }
