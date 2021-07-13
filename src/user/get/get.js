const fs = require('fs');
const os = require('os');
const internal = require('stream');

homeDir = os.homedir();
folder = '/.nim-cli/'
fileName='user.json';
filePath= homeDir + folder;

// get one target instance
function target(instance) {
  // console.log("target:", instance);
  let data = fs.readFileSync(filePath + fileName)
  list = JSON.parse(data);
  list.targets.forEach(function(element, index, array) {
    // console.log("target:", element.target);
    if (element.target === instance.target) {
      console.log("found", element);
      return element;
    }
  });
}

// get all the target instances
function targets() {
  let data = fs.readFileSync(filePath + fileName)
  list = JSON.parse(data);
  return list;
}
module.exports = { target, targets };
