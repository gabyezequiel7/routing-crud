'use strict';

require('dotenv').config();
const {BuildRouting} = require('./src/classes');

function init(pathModels, pathController) {
    console.log(pathModels, pathController);
    let buildRouting = new BuildRouting(pathModels, pathController);
    buildRouting._findModels();
    return buildRouting._build();
}

module.exports = {
    init
};
