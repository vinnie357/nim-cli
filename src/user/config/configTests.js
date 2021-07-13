const config = require('./config');
const get = require('../get/get');
// create
defaultRecord = { target: "https://localhost:11000", auth: "basic" }

function add(key,value) {
  config.addOne(key,value);
  get.targets();
}
// add key
add(defaultRecord.target,defaultRecord);


module.exports = { add };
