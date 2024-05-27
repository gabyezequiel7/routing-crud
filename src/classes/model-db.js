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
        }, body)
            .then(() => {
                return this.#model.findById(id);
            });
    }

    _updateFields(id, body) {
        return this.#model.findById(id)
            .then((doc) => {
                for (const field of Object.keys(body)) {
                    doc[field] = body[field];
                }
                return doc.save();
            });
    }

    _delete(id) {
        return this.#model.deleteOne({
            _id: id
        });
    }
}

module.exports = ModelDB;
