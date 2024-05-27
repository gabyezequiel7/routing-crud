'use strict';

function parseConditions(req, res, next) {
    if (!req.query.conditions) {
        req.query.conditions = {};
        return next();
    }
    try {
        req.query.conditions = JSON.parse(req.query.conditions);
    } catch(e) {
        console.error(e.message);
        return res.status(500).json({
            code: 'invalid_conditions',
            message: 'Invalid Conditions'
        });
    }
    return next();
}

module.exports = parseConditions;
