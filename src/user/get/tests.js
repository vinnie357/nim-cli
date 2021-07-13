const get = require('./get');
// get tests
function getOne (instance) {
  // console.log(instance.target);
  // get one instance
  var item = get.target(instance);
    console.log("one: ", item);
    return item;
  };
function getMany () {
// get all instances
  var items = get.targets();
  console.log("many: " + JSON.stringify(items));
  return items;
}
var record = { target: "http://localhost:11000" }
getOne(record);
getMany();

module.exports = { getOne, getMany }
