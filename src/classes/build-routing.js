'use strict';

const fs = require('fs');
const express = require('express');
const router = express.Router();
const pluralize = require('pluralize');
const findController = require('../utils/read-controllers');
const Connector = require('./connector');

class BuildRouting {
    static name = 'BuildRouting';
    #pathModels;
    #pathController;
    #models;
    constructor(_pathModels, _pathController) {
        this.#pathModels = _pathModels;
        this.#pathController = _pathController;
    }

    _findModels() {
        if (!fs.existsSync(this.#pathModels)) {
            throw new Error('Invalid Dir');
        }
        const dir = fs.readdirSync(this.#pathModels);
        if (dir.length < 1) {
            throw new Error('Models not found');
        }
        // validate model mongoose
        this.#models = require(this.#pathModels);
        if (Object.keys(this.#models).length < 1) {
            throw new Error('Models not found in require');
        }
        return true;
    }

    _build() {
        const routers = [];
        for (const field of Object.keys(this.#models)) {
            const controller = findController(this.#pathController, field);
            const connector = new Connector(this.#models[field], controller, pluralize.plural(field));
            let router = connector._getRouter();
            routers.push(router);
        }
        return routers;
    }
}

module.exports = BuildRouting;
