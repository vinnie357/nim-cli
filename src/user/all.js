const fs = require('fs');
const path = require('path');
const get = require('./get');
const config = require('./config');
const os = require('os');

// nim targets
class TargetNim {
  constructor(fqdn,auth){
    this.target = fqdn;
    this.auth = auth;
  }
}
var dataMany = { targets: [ { target: 'https://nim.vin-lab.com', auth: 'basic' }, { target: 'https://nim.mazzait.com', auth: 'okta' }, { target: 'https://nim.ves.dimensionc-132.com', auth: 'azuread' } ] }
config.store(dataMany);

// // example
// let nimTarget = new TargetNim('https://localhost:11000',"none");
// console.log(JSON.stringify(nimTarget));
//set data
var dataOne = { target: 'https://nim.mazzait.com', auth: 'basic' }
var dataMany = { targets: [ { target: 'https://nim.vin-lab.com', auth: 'basic' }, { target: 'https://nim.mazzait.com', auth: 'okta' }, { target: 'https://nim.ves.dimensionc-132.com', auth: 'azuread' } ] }
// persist data
homeDir = os.homedir();
folder = '/.nim-cli/'
fileName='user.json';
filePath= homeDir + folder;

// make folder
if(!fs.existsSync(filePath)){
  fs.mkdirSync(filePath)
}
// write data
fs.writeFileSync(filePath+fileName, JSON.stringify(dataMany, null, 2))
// read data
fs.readFile(filePath + fileName, {encoding: 'utf8'}, function(err, contents) {
  newData = JSON.parse(contents);
  console.log(JSON.stringify(newData));
});
