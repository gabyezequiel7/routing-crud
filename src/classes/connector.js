'use strict';

const express = require('express');
const Routing = require('./routing');
const pluralize = require('pluralize');

class Connector extends Routing {
    #controller
    constructor(_model, _controller, _name) {
        super(_model);
        this.name = _name;
        this.router = express.Router();
        this.#controller = _controller;
    }

    _getRouter() {
        // Las rutas pueden retornarse en un funcion (Por si se cambia server web)
        const getAll = this.#controller.getMiddle('getAll');
        const getUnique = this.#controller.getMiddle('getUnique');
        const post = this.#controller.getMiddle('post');
        const put = this.#controller.getMiddle('put');
        const patch = this.#controller.getMiddle('patch');
        const deleteOne = this.#controller.getMiddle('delete');
        const namePath = pluralize.plural(this.name.toLowerCase());

        this.router.get(`/${namePath}`,
            ...getAll,
            super._checkLimitAndSkip(),
            super._checkSort(),
            super._parseConditions(),
            super._getMultiple()
        );
        this.router.get(`/${namePath}/:id`,
            ...getUnique,
            super._getUnique()
        );
        this.router.post(`/${namePath}`,
            ...post,
            super._validateBody(),
            super._post()
        );
        this.router.put(`/${namePath}/:id`,
            ...put,
            super._validateBody(),
            super._put()
        );
        this.router.patch(`/${namePath}/:id`,
            ...patch,
            super._validateBody(),
            super._patch()
        );
        this.router.delete(`/${namePath}/:id`,
            ...deleteOne,
            super._delete()
        );
        return this.router;
    }
}

module.exports = Connector;