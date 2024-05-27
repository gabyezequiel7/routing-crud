'use strict';

class ModelDB {
    #model;
    constructor(_model) {
         this.#model = _model;
    }

    _findAll(params) {
        return this.#model.find(params.conditions)
            .limit(params.limit)
            .skip(params.skip)
            .sort(params.sort);
    }

    _findById(params) {
        return this.#model.findOne(params.conditions)
    }

    _create(body) {
        return this.#model.create(body);
    }

    _updateOne(id, body) {
        return this.#model.updateOne({
            _id: id
        }, body);
    }

    _updateFields(id, body) {
        return this.#model.updateOne({
            _id: id
        }, {
            $set: {
                body
            }
        })
            .then(() => {
                return this.#model._findById(id);
            });
    }

    _delete(id) {
        return this.#model.deleteOne({
            _id: id
        });
    }
}

module.exports = ModelDB;
