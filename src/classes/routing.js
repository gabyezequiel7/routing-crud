'use strict';

const checkLimitSkip = require('../middlewares/check-limit-skip');
const checkSort = require('../middlewares/check-sort');
const parseConditions = require('../middlewares/parse-conditions');
const validateBody = require('../middlewares/validate-body');
const ModelDB = require('./model-db');

class Routing {
    modelDB;
    constructor(_model) {
        this.modelDB = new ModelDB(_model);
    }

    _checkLimitAndSkip() {
        return checkLimitSkip;
    }

    _checkSort() {
        return checkSort;
    }

    _parseConditions() {
        return parseConditions;
    }

    _validateBody() {
        return validateBody;
    }

    _getMultiple() {
        return (req, res) => {
            const params = {
                limit: req.query.limit,
                skip: req.query.skip || 0,
                sort: req.query.sort,
                conditions: req.query.conditions
            };
            return this.modelDB._findAll(params.conditions)
                .limit(params.limit)
                .skip(params.skip)
                .sort(params.sort)
                .then((response) => {
                    return res.status(200).json(response);
                })
                .catch((err) => {
                    console.error(err.message);
                    return res.status(500).json({
                        code: 'internal_error',
                        message: 'Internal Error'
                    });
                });
        }
    }
    
    _getUnique() {
        return (req, res) => {
            return this.modelDB._findById(req.params.id)
            .then((response) => {
                return res.status(200).json(response);  
            })
            .catch((err) => {
                console.error(err.message);
                return res.status(500).json({
                    code: 'internal_error',
                    message: 'Internal Error'
                });
            });
        };
    }

    _post() {
        return (req, res) => {
            return this.modelDB._create(req.body)
            .then((response) => {
                return res.status(200).json(response);  
            })
            .catch((err) => {
                console.error(err.message);
                return res.status(500).json({
                    code: 'internal_error',
                    message: 'Internal Error'
                });
            });
        }
    }

    _put() {
        return (req, res) => {
            return this.modelDB._updateOne(req.params.id, req.body)
            .then((response) => {
                return res.status(200).json(response);  
            })
            .catch((err) => {
                console.error(err.message);
                return res.status(500).json({
                    code: 'internal_error',
                    message: 'Internal Error'
                });
            });
        }
    }

    _patch() {
        return (req, res) => {
            return this.modelDB._updateFields(req.params.id, req.body)
            .then((response) => {
                return res.status(200).json(response);  
            })
            .catch((err) => {
                console.error(err.message);
                return res.status(500).json({
                    code: 'internal_error',
                    message: 'Internal Error'
                });
            });
        }
    }

    _delete() {
        return (req, res) => {
            return this.modelDB._delete(req.params.id)
            .then((response) => {
                return res.status(200).json(response);  
            })
            .catch((err) => {
                console.error(err.message);
                return res.status(500).json({
                    code: 'internal_error',
                    message: 'Internal Error'
                });
            });
        }
    }
}

module.exports = Routing;