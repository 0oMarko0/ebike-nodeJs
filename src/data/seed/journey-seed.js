const fs = require("fs");

const rawData = fs.readFileSync('./Pistes_cyclables.geojson');
const test = JSON.parse(rawData);
console.log(test.features);