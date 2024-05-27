'use strict';

class Controller {
    #pathControler;
    #typeValid = ['getAll', 'getUnique', 'post', 'put', 'patch', 'delete'];
    middles = {};

    constructor(_pathControler) {
        if (!_pathControler) {
            this.status = false;
        }
        this.status = true;
        this.#pathControler = _pathControler;
    }

    add(name, ...args) {
        if (!this.#typeValid.includes(name)) {
            throw new Error(`Invalid name (${name}) of controller.`);
        }
        if (middles[name]){
            middles[name] = [];
        }
        middles[name].push(...args);
        return true;
    }

    getMiddle(name) {
        if (!this.#typeValid.includes(name)) {
            throw new Error(`Invalid name (${name}) of controller.`);
        }
        return (!this.middles[name] || this.middles[name].length === 0) ? [(...args) => args[2]()] : this.middles[name];
    }
}

module.exports = Controller;
