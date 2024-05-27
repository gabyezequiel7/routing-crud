'use strict';

const fs = require('fs');
const Controller = require('../classes/controller');

function findController(pathController, modelName) {
    if (!fs.existsSync(pathController)) {
        throw new Error('Invalid Path Controller');
    }
    const controller = require(pathController)[modelName];
    if (!controller) {
        return new Controller();
    }
    return controller();
}

module.exports = findController;
